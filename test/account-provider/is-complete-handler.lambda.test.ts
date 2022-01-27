import { IsCompleteHandler, IsCompleteRequest } from "aws-cdk-lib/custom-resources/lib/provider-framework/types";
import * as SDK from "aws-sdk";
import * as AWS from "aws-sdk-mock";
import * as sinon from "sinon";

describe("account-provider.is-complete-handler.lambda", () => {
  jest.setTimeout(60_000);
  console.log = jest.fn();

  let handler: IsCompleteHandler;
  beforeEach(async () => {
    //AWS.setSDKInstance(SDK);
    AWS.setSDK(require.resolve("aws-sdk"));
    handler = (await import("../../src/account-provider/is-complete-handler.lambda")).handler;
    jest.resetModules();
  });

  afterEach(() => {
    AWS.restore("Organizations");
  });

  xit("Should throw an error if failed", async () => {
    // Given
    const mock: SDK.Organizations.DescribeCreateAccountStatusResponse = {
      CreateAccountStatus: {
        Id: "car-exampleaccountcreationrequestid",
        State: "FAILED",
        FailureReason: "Some reason",
      },
    };
    const describeCreateAccountStatusFake = sinon.fake.resolves(mock);
    AWS.mock("Organizations", "describeCreateAccountStatus", describeCreateAccountStatusFake);

    const request: Partial<IsCompleteRequest> = {
      RequestType: "Create",
      PhysicalResourceId: "car-exampleaccountcreationrequestid",
    };

    // When
    const response = handler(request as IsCompleteRequest);

    // Then
    await expect(async () => {
      await response;
    }).rejects.toThrowError("Failed Create Account undefined with Id undefined, reason: Some reason");
    sinon.assert.called(describeCreateAccountStatusFake);
  });

  xit("Should be completed when succeeded", async () => {
    // Given
    const mock: SDK.Organizations.DescribeCreateAccountStatusResponse = {
      CreateAccountStatus: {
        Id: "car-exampleaccountcreationrequestid",
        State: "SUCCEEDED",
        AccountId: "123456789012",
        AccountName: "test",
        FailureReason: undefined,
      },
    };
    const describeCreateAccountStatusFake = sinon.fake.resolves(mock);
    AWS.mock("Organizations", "describeCreateAccountStatus", describeCreateAccountStatusFake);

    const request: Partial<IsCompleteRequest> = {
      RequestType: "Create",
      PhysicalResourceId: "car-exampleaccountcreationrequestid",
    };

    // When
    const response = await handler(request as IsCompleteRequest);

    // Then
    sinon.assert.called(describeCreateAccountStatusFake);
    expect(response.IsComplete).toBeTruthy();
    expect(response.Data).toEqual({ AccountId: "123456789012", AccountName: "test" });
  });

  xit("Should be not completed when in progress", async () => {
    // Given
    const mock: SDK.Organizations.DescribeCreateAccountStatusResponse = {
      CreateAccountStatus: {
        Id: "car-exampleaccountcreationrequestid",
        State: "IN_PROGRESS",
      },
    };
    const describeCreateAccountStatusFake = sinon.fake.resolves(mock);
    AWS.mock("Organizations", "describeCreateAccountStatus", describeCreateAccountStatusFake);

    const request: Partial<IsCompleteRequest> = {
      RequestType: "Create",
      PhysicalResourceId: "car-exampleaccountcreationrequestid",
    };

    // When
    const response = await handler(request as IsCompleteRequest);

    // Then
    sinon.assert.called(describeCreateAccountStatusFake);
    expect(response.IsComplete).toBeFalsy();
    expect(response.Data).toEqual({});
  });
});
