import { OnEventHandler, OnEventRequest } from "aws-cdk-lib/custom-resources/lib/provider-framework/types";
import * as SDK from "aws-sdk";
import * as AWS from "aws-sdk-mock";
import * as sinon from "sinon";
import { IamUserAccessToBilling } from "../../src";

describe("account-provider.on-event-handler.lambda", () => {
  jest.setTimeout(60_000);
  console.log = jest.fn();

  let handler: OnEventHandler;
  beforeEach(async () => {
    //AWS.setSDKInstance(SDK);
    AWS.setSDK(require.resolve("aws-sdk"));
    handler = (await import("../../src/account-provider/on-event-handler.lambda")).handler;
    jest.resetModules();
  });

  afterEach(() => {
    AWS.restore("Organizations");
  });

  const event: Partial<OnEventRequest> = {
    ServiceToken: "serviceToken",
    ResponseURL: "https://localhost",
    StackId: "stackId",
    RequestId: "requestId",
    LogicalResourceId: "logicalResourceId",
    ResourceType: "Custom::AWS",
    ResourceProperties: {
      ServiceToken: "serviceToken",
    },
  };

  it("Should create account status", async () => {
    // Given
    const mock: SDK.Organizations.CreateAccountResponse = {
      CreateAccountStatus: {
        Id: "car-exampleaccountcreationrequestid",
        State: "IN_PROGRESS",
        FailureReason: "Some reason",
      },
    };
    const createAccountFake = sinon.fake.resolves(mock);
    AWS.mock("Organizations", "createAccount", createAccountFake);

    const request = {
      ...event,
      RequestType: "Create",
      ResourceProperties: {
        ...event.ResourceProperties,
        Email: "info@pepperize.com",
        AccountName: "test",
        RoleName: "SomeRoleName",
        IamUserAccessToBilling: IamUserAccessToBilling.ALLOW,
      },
    };
    // When
    const response = await handler(request as OnEventRequest);

    // Then
    expect(response).not.toBeUndefined();
    expect(response?.PhysicalResourceId).toEqual("car-exampleaccountcreationrequestid");
    expect(response?.Data?.CreateAccountStatusId).toEqual("car-exampleaccountcreationrequestid");
    sinon.assert.calledOnce(createAccountFake);
  });

  it("Should find existing account by name and email on create request type", async () => {
    // Given
    const createAccountMock: SDK.Organizations.CreateAccountResponse = {
      CreateAccountStatus: {
        Id: "car-exampleaccountcreationrequestid",
        State: "FAILED",
        FailureReason: "EMAIL_ALREADY_EXISTS",
      },
    };
    const createAccountStatusFake = sinon.fake.resolves(createAccountMock);
    AWS.mock("Organizations", "createAccount", createAccountStatusFake);

    const listAccountsMock: SDK.Organizations.ListAccountsResponse = {
      Accounts: [
        {
          Id: "123456789012",
          Name: "test",
          Email: "info@pepperize.com",
        },
      ],
    };
    const listAccountsFake = sinon.fake.resolves(listAccountsMock);
    AWS.mock("Organizations", "listAccounts", listAccountsFake);

    const request = {
      ...event,
      RequestType: "Create",
      ResourceProperties: {
        ...event.ResourceProperties,
        Email: "info@pepperize.com",
        AccountName: "test",
        RoleName: "SomeRoleName",
        IamUserAccessToBilling: IamUserAccessToBilling.ALLOW,
        ImportOnDuplicate: String(true),
      },
      PhysicalResourceId: "car-exampleaccountcreationrequestid",
    };

    // When
    const response = await handler(request as OnEventRequest);

    // Then
    expect(response).not.toBeUndefined();
    expect(response?.PhysicalResourceId).toEqual("123456789012");
    sinon.assert.notCalled(createAccountStatusFake);
    sinon.assert.calledOnce(listAccountsFake);
  });

  it("Should return physical resource id", async () => {
    // Given
    const createAccountStatusFake = sinon.fake.resolves(undefined);
    AWS.mock("Organizations", "createAccount", createAccountStatusFake);
    const listAccountsFake = sinon.fake.resolves(undefined);
    AWS.mock("Organizations", "listAccounts", listAccountsFake);

    const request = {
      ...event,
      RequestType: "Update",
      ResourceProperties: {
        ...event.ResourceProperties,
        Email: "info@pepperize.com",
        AccountName: "test",
        RoleName: "SomeRoleName",
        IamUserAccessToBilling: IamUserAccessToBilling.ALLOW,
        ImportOnDuplicate: String(true),
      },
      PhysicalResourceId: "car-exampleaccountcreationrequestid",
    };

    // When
    const response = await handler(request as OnEventRequest);

    // Then
    expect(response).not.toBeUndefined();
    expect(response?.PhysicalResourceId).toEqual("car-exampleaccountcreationrequestid");
    sinon.assert.notCalled(createAccountStatusFake);
    sinon.assert.notCalled(listAccountsFake);
  });
});
