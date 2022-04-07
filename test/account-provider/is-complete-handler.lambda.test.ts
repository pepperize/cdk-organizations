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

  const event: Partial<IsCompleteRequest> = {
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

  it("Should throw an error if failed", async () => {
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
    const describeAccountFake = sinon.fake.resolves(undefined);
    AWS.mock("Organizations", "describeAccount", describeAccountFake);

    const request: Partial<IsCompleteRequest> = {
      RequestType: "Create",
      PhysicalResourceId: "car-exampleaccountcreationrequestid",
      Data: {
        CreateAccountStatusId: "car-exampleaccountcreationrequestid",
      },
    };

    // When
    const response = handler(request as IsCompleteRequest);

    // Then
    await expect(async () => {
      await response;
    }).rejects.toThrowError("Failed Create Account undefined, reason: Some reason");
    sinon.assert.called(describeCreateAccountStatusFake);
    sinon.assert.notCalled(describeAccountFake);
  });

  it("Should be completed when succeeded", async () => {
    // Given
    const describeCreateAccountStatusMock: SDK.Organizations.DescribeCreateAccountStatusResponse = {
      CreateAccountStatus: {
        Id: "car-exampleaccountcreationrequestid",
        State: "SUCCEEDED",
        AccountId: "123456789012",
        AccountName: "test",
        FailureReason: undefined,
      },
    };
    const describeCreateAccountStatusFake = sinon.fake.resolves(describeCreateAccountStatusMock);
    AWS.mock("Organizations", "describeCreateAccountStatus", describeCreateAccountStatusFake);
    const describeAccountResponseMock: SDK.Organizations.DescribeAccountResponse = {
      Account: {
        Id: "123456789012",
        Arn: "arn:aws:organizations::123456789012:account/o-i0example/123456789012",
        Name: "test",
        Email: "info@pepperize.com",
      },
    };
    const describeAccountFake = sinon.fake.resolves(describeAccountResponseMock);
    AWS.mock("Organizations", "describeAccount", describeAccountFake);
    const moveAccountFake = sinon.fake.resolves(undefined);
    AWS.mock("Organizations", "moveAccount", moveAccountFake);

    const request: Partial<IsCompleteRequest> = {
      ...event,
      RequestType: "Create",
      PhysicalResourceId: "car-exampleaccountcreationrequestid",
      Data: {
        CreateAccountStatusId: "car-exampleaccountcreationrequestid",
      },
    };

    // When
    const response = await handler(request as IsCompleteRequest);

    // Then
    sinon.assert.called(describeCreateAccountStatusFake);
    sinon.assert.called(describeAccountFake);
    sinon.assert.notCalled(moveAccountFake);
    expect(response.IsComplete).toBeTruthy();
    expect(response.PhysicalResourceId).toEqual("123456789012");
    expect(response.Data?.AccountId).toEqual("123456789012");
    expect(response.Data?.AccountName).toEqual("test");
  });

  it("Should be not completed when in progress", async () => {
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
      ...event,
      RequestType: "Create",
      PhysicalResourceId: "car-exampleaccountcreationrequestid",
      Data: {
        CreateAccountStatusId: "car-exampleaccountcreationrequestid",
      },
    };

    // When
    const response = await handler(request as IsCompleteRequest);

    // Then
    sinon.assert.called(describeCreateAccountStatusFake);
    expect(response.IsComplete).toBeFalsy();
    expect(response.Data).toEqual({});
  });

  it("Should be moved to parent", async () => {
    // Given
    const mock: SDK.Organizations.DescribeCreateAccountStatusResponse = {
      CreateAccountStatus: {
        Id: "car-exampleaccountcreationrequestid",
        AccountId: "123456789012",
        State: "SUCCEEDED",
      },
    };
    const describeCreateAccountStatusFake = sinon.fake.resolves(mock);
    AWS.mock("Organizations", "describeCreateAccountStatus", describeCreateAccountStatusFake);
    const describeAccountResponseMock: SDK.Organizations.DescribeAccountResponse = {
      Account: {
        Id: "123456789012",
        Arn: "arn:aws:organizations::123456789012:account/o-i0example/123456789012",
        Name: "test",
        Email: "info@pepperize.com",
      },
    };
    const describeAccountFake = sinon.fake.resolves(describeAccountResponseMock);
    AWS.mock("Organizations", "describeAccount", describeAccountFake);
    const listParentsMock: SDK.Organizations.ListParentsResponse = {
      Parents: [{ Id: "r-i0example" }],
    };
    const listParentsFake = sinon.fake.resolves(listParentsMock);
    AWS.mock("Organizations", "listParents", listParentsFake);
    const moveAccountFake = sinon.fake.resolves(undefined);
    AWS.mock("Organizations", "moveAccount", moveAccountFake);

    const request: Partial<IsCompleteRequest> = {
      ...event,
      RequestType: "Update",
      PhysicalResourceId: "car-exampleaccountcreationrequestid",
      Data: {
        AccountId: "123456789012",
      },
      ResourceProperties: {
        ServiceToken: "serviceToken",
        ParentId: "ou-i0example",
      },
    };

    // When
    const response = await handler(request as IsCompleteRequest);

    // Then
    sinon.assert.called(describeCreateAccountStatusFake);
    sinon.assert.called(describeAccountFake);
    sinon.assert.called(listParentsFake);
    sinon.assert.called(moveAccountFake);
    expect(response.IsComplete).toBeTruthy();
    expect(response.Data?.AccountId).toEqual("123456789012");
    expect(response.Data?.AccountName).toEqual("test");
  });

  it("Should be moved to root", async () => {
    // Given
    const describeCreateAccountStatusFake = sinon.fake.resolves(undefined);
    AWS.mock("Organizations", "describeCreateAccountStatus", describeCreateAccountStatusFake);
    const describeAccountResponseMock: SDK.Organizations.DescribeAccountResponse = {
      Account: {
        Id: "123456789012",
        Arn: "arn:aws:organizations::123456789012:account/o-i0example/123456789012",
        Name: "test",
        Email: "info@pepperize.com",
      },
    };
    const describeAccountFake = sinon.fake.resolves(describeAccountResponseMock);
    AWS.mock("Organizations", "describeAccount", describeAccountFake);
    const listRootsMock: SDK.Organizations.ListRootsResponse = {
      Roots: [{ Id: "r-i0example" }],
    };
    const listRootsFake = sinon.fake.resolves(listRootsMock);
    AWS.mock("Organizations", "listRoots", listRootsFake);
    const listParentsMock: SDK.Organizations.ListParentsResponse = {
      Parents: [{ Id: "ou-i0example" }],
    };
    const listParentsFake = sinon.fake.resolves(listParentsMock);
    AWS.mock("Organizations", "listParents", listParentsFake);
    const moveAccountFake = sinon.fake.resolves(undefined);
    AWS.mock("Organizations", "moveAccount", moveAccountFake);

    const request: Partial<IsCompleteRequest> = {
      ...event,
      RequestType: "Delete",
      PhysicalResourceId: "123456789012",
      Data: {
        AccountId: "123456789012",
      },
      ResourceProperties: {
        ServiceToken: "serviceToken",
        ParentId: "ou-i0example",
        RemovalPolicy: "destroy",
      },
    };

    // When
    const response = await handler(request as IsCompleteRequest);

    // Then
    sinon.assert.notCalled(describeCreateAccountStatusFake);
    sinon.assert.called(describeAccountFake);
    sinon.assert.called(listRootsFake);
    sinon.assert.called(listParentsFake);
    sinon.assert.called(moveAccountFake);
    expect(response.IsComplete).toBeTruthy();
    expect(response.PhysicalResourceId).toEqual("123456789012");
    expect(response.Data?.AccountId).toEqual("123456789012");
    expect(response.Data?.AccountName).toEqual("test");
  });
});
