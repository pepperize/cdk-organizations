import { OnEventHandler, OnEventRequest } from "aws-cdk-lib/custom-resources/lib/provider-framework/types";
import * as SDK from "aws-sdk";
import * as AWS from "aws-sdk-mock";
import * as sinon from "sinon";

describe("organization-provider.on-event-handler.lambda", () => {
  jest.setTimeout(60_000);
  console.log = jest.fn();

  let handler: OnEventHandler;
  beforeEach(async () => {
    //AWS.setSDKInstance(SDK);
    AWS.setSDK(require.resolve("aws-sdk"));
    handler = (await import("../../src/tag-resource-provider/on-event-handler.lambda")).handler;
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

  it("Should remove a tag", async () => {
    // Given
    const mock: SDK.Organizations.ListTagsForResourceResponse = {
      Tags: [
        {
          Key: "Name1",
          Value: "Tag1",
        },
      ],
    };
    const listTagsForResourceFake = sinon.fake.resolves(mock);
    AWS.mock("Organizations", "listTagsForResource", listTagsForResourceFake);

    const untagResourceFake = sinon.fake.resolves(undefined);
    AWS.mock("Organizations", "untagResource", untagResourceFake);

    const tagResourceFake = sinon.fake.resolves(undefined);
    AWS.mock("Organizations", "tagResource", tagResourceFake);

    const request = {
      ...event,
      RequestType: "Create",
      ResourceProperties: {
        ...event.ResourceProperties,
        ResourceId: "o-1234567890",
        Tags: [],
      },
    };
    // When
    const response = await handler(request as OnEventRequest);

    // Then
    expect(response).not.toBeUndefined();
    expect(response?.PhysicalResourceId).toEqual("o-1234567890");
    sinon.assert.called(listTagsForResourceFake);
    sinon.assert.called(untagResourceFake);
    sinon.assert.notCalled(tagResourceFake);
  });
  it("Should add a tag", async () => {
    // Given
    const mock: SDK.Organizations.ListTagsForResourceResponse = {
      Tags: [
        {
          Key: "Name1",
          Value: "Tag1",
        },
      ],
    };
    const listTagsForResourceFake = sinon.fake.resolves(mock);
    AWS.mock("Organizations", "listTagsForResource", listTagsForResourceFake);

    const untagResourceFake = sinon.fake.resolves(undefined);
    AWS.mock("Organizations", "untagResource", untagResourceFake);

    const tagResourceFake = sinon.fake.resolves(undefined);
    AWS.mock("Organizations", "tagResource", tagResourceFake);

    const request = {
      ...event,
      RequestType: "Create",
      ResourceProperties: {
        ...event.ResourceProperties,
        ResourceId: "o-1234567890",
        Tags: [
          {
            Key: "Name1",
            Value: "Tag1",
          },
          {
            Key: "Name2",
            Value: "Tag2",
          },
        ],
      },
    };
    // When
    const response = await handler(request as OnEventRequest);

    // Then
    expect(response).not.toBeUndefined();
    expect(response?.PhysicalResourceId).toEqual("o-1234567890");
    sinon.assert.called(listTagsForResourceFake);
    sinon.assert.notCalled(untagResourceFake);
    sinon.assert.called(tagResourceFake);
  });
});
