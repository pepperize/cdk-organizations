import { OnEventHandler, OnEventRequest } from "aws-cdk-lib/custom-resources/lib/provider-framework/types";
import * as SDK from "aws-sdk";
import * as AWS from "aws-sdk-mock";
import * as sinon from "sinon";
import { FeatureSet } from "../../src";

describe("organization-provider.on-event-handler.lambda", () => {
  jest.setTimeout(60_000);
  console.log = jest.fn();

  let handler: OnEventHandler;
  beforeEach(async () => {
    //AWS.setSDKInstance(SDK);
    AWS.setSDK(require.resolve("aws-sdk"));
    handler = (await import("../../src/organization-provider/on-event-handler.lambda")).handler;
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

  it("Should create organization and pass the id", async () => {
    // Given
    const mock: SDK.Organizations.CreateOrganizationResponse = {
      Organization: {
        Id: "o-1234567890",
        FeatureSet: FeatureSet.ALL,
      },
    };
    const createOrganizationFake = sinon.fake.resolves(mock);
    AWS.mock("Organizations", "createOrganization", createOrganizationFake);

    const request = {
      ...event,
      RequestType: "Create",
      ResourceProperties: {
        ...event.ResourceProperties,
        FeatureSet: FeatureSet.ALL,
      },
    };
    // When
    const response = await handler(request as OnEventRequest);

    // Then
    expect(response).not.toBeUndefined();
    expect(response?.PhysicalResourceId).toEqual("o-1234567890");
    expect(response?.Data?.FeatureSet).toEqual(FeatureSet.ALL);
    sinon.assert.called(createOrganizationFake);
  });

  it("Should describe the organization if already exists", async () => {
    // Given
    class AWSError extends Error {
      public constructor(readonly code: string) {
        super();
      }
    }
    const error = new AWSError("AlreadyInOrganizationException");
    const createOrganizationFake = sinon.fake.throws(error);
    AWS.mock("Organizations", "createOrganization", createOrganizationFake);

    const mock: SDK.Organizations.DescribeOrganizationResponse = {
      Organization: {
        Id: "o-1234567890",
        FeatureSet: FeatureSet.ALL,
      },
    };
    const describeOrganizationFake = sinon.fake.resolves(mock);
    AWS.mock("Organizations", "describeOrganization", describeOrganizationFake);

    const request = {
      ...event,
      RequestType: "Update",
      ResourceProperties: {
        ...event.ResourceProperties,
        Id: "o-1234567890",
        FeatureSet: FeatureSet.ALL,
      },
      PhysicalResourceId: "o-1234567890",
    };

    // When
    const response = await handler(request as OnEventRequest);

    // Then
    expect(response).not.toBeUndefined();
    expect(response).toEqual({
      PhysicalResourceId: "o-1234567890",
      Data: { Id: "o-1234567890", FeatureSet: FeatureSet.ALL },
    });
    sinon.assert.called(describeOrganizationFake);
  });
});
