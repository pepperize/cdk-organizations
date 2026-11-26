import { CdkCustomResourceEvent as OnEventRequest, CdkCustomResourceResponse as OnEventResponse } from "aws-lambda";
import * as SDK from "aws-sdk";
import * as AWS from "aws-sdk-mock";
import * as sinon from "sinon";
import { IamUserAccessToBilling } from "../../src";

describe("account-provider.on-event-handler.lambda", () => {
  jest.setTimeout(60_000);
  console.log = jest.fn();

  let handler: (event: OnEventRequest) => Promise<OnEventResponse>;
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
    expect(response?.PhysicalResourceId).toBeUndefined();
    expect(response?.Data?.CreateAccountStatusId).toEqual("car-exampleaccountcreationrequestid");
    sinon.assert.calledOnce(createAccountFake);
  });

  it("Should return physical resource id", async () => {
    // Given
    const createAccountStatusFake = sinon.fake.resolves(undefined);
    AWS.mock("Organizations", "createAccount", createAccountStatusFake);
    const listAccountsFake = sinon.fake.resolves(undefined);
    AWS.mock("Organizations", "listAccounts", listAccountsFake);

    const properties = {
      ...event.ResourceProperties,
      Email: "info@pepperize.com",
      AccountName: "test",
      RoleName: "SomeRoleName",
      IamUserAccessToBilling: IamUserAccessToBilling.ALLOW,
      ImportOnDuplicate: String(true),
    };
    const request = {
      ...event,
      RequestType: "Update",
      ResourceProperties: properties,
      OldResourceProperties: properties,
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

  it.each([
    ["Email", "changed@pepperize.com"],
    ["AccountName", "changed"],
  ])("Should reject an update of %s", async (property, value) => {
    // Given
    const properties = {
      ...event.ResourceProperties,
      Email: "info@pepperize.com",
      AccountName: "test",
    };
    const request = {
      ...event,
      RequestType: "Update",
      ResourceProperties: { ...properties, [property]: value },
      OldResourceProperties: properties,
      PhysicalResourceId: "123456789012",
    };

    // When
    const response = handler(request as OnEventRequest);

    // Then
    await expect(response).rejects.toThrow(`Updating the ${property} of account 123456789012 is not supported`);
  });
});
