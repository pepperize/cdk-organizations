import { OnEventHandler, OnEventRequest } from "aws-cdk-lib/custom-resources/lib/provider-framework/types";
import * as SDK from "aws-sdk";
import * as AWS from "aws-sdk-mock";
import * as sinon from "sinon";
import { IamUserAccessToBilling } from "../../src";

describe("account-provider.is-complete-handler.lambda", () => {
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

  it("Should create account status and pass the id", async () => {
    // Given
    const mock: SDK.Organizations.CreateAccountResponse = {
      CreateAccountStatus: {
        Id: "car-exampleaccountcreationrequestid",
        State: "FAILED",
        FailureReason: "Some reason",
      },
    };
    const createAccountStatusFake = sinon.fake.resolves(mock);
    AWS.mock("Organizations", "createAccount", createAccountStatusFake);

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
    expect(response).toEqual({ PhysicalResourceId: "car-exampleaccountcreationrequestid" });
    sinon.assert.called(createAccountStatusFake);
  });

  it("Should pass through the create account id", async () => {
    // Given
    const mock: SDK.Organizations.CreateAccountResponse = {
      CreateAccountStatus: {
        Id: "car-exampleaccountcreationrequestid",
        State: "FAILED",
        FailureReason: "Some reason",
      },
    };
    const createAccountStatusFake = sinon.fake.resolves(mock);
    AWS.mock("Organizations", "createAccount", createAccountStatusFake);

    const request = {
      ...event,
      RequestType: "Update",
      ResourceProperties: {
        ...event.ResourceProperties,
        Email: "info@pepperize.com",
        AccountName: "test",
        RoleName: "SomeRoleName",
        IamUserAccessToBilling: IamUserAccessToBilling.ALLOW,
      },
      PhysicalResourceId: "car-exampleaccountcreationrequestid",
    };

    // When
    const response = await handler(request as OnEventRequest);

    // Then
    expect(response).not.toBeUndefined();
    expect(response).toEqual({
      PhysicalResourceId: "car-exampleaccountcreationrequestid",
      Data: request.ResourceProperties,
    });
    sinon.assert.notCalled(createAccountStatusFake);
  });
});
