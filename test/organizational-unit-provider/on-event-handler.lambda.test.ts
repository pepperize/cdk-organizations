import { RemovalPolicy } from "aws-cdk-lib";
import { OnEventHandler, OnEventRequest } from "aws-cdk-lib/custom-resources/lib/provider-framework/types";
import * as SDK from "aws-sdk";
import * as AWS from "aws-sdk-mock";
import * as sinon from "sinon";

describe("organizational-unit-provider.on-event-handler.lambda", () => {
  jest.setTimeout(60_000);
  console.log = jest.fn();

  let handler: OnEventHandler;
  beforeEach(async () => {
    AWS.setSDK(require.resolve("aws-sdk"));
    handler = (await import("../../src/organizational-unit-provider/on-event-handler.lambda")).handler;
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

  it("Should create organizational unit", async () => {
    // Given
    const organizationalUnit = { Id: "ou-1234567890", Name: "example" };
    const mock: SDK.Organizations.CreateOrganizationalUnitResponse = {
      OrganizationalUnit: organizationalUnit,
    };
    const createOrganizationalUnitFake = sinon.fake.resolves(mock);
    AWS.mock("Organizations", "createOrganizationalUnit", createOrganizationalUnitFake);

    const request = {
      ...event,
      RequestType: "Create",
      ResourceProperties: {
        ...event.ResourceProperties,
        ParentId: "r-1234567890",
        Name: "example",
      },
    };

    // When
    const response = await handler(request as OnEventRequest);

    // Then
    expect(response).not.toBeUndefined();
    expect(response?.PhysicalResourceId).toEqual("ou-1234567890");
    expect(response?.Data).toEqual(organizationalUnit);
    sinon.assert.calledOnce(createOrganizationalUnitFake);
    sinon.assert.calledOnceWithMatch(createOrganizationalUnitFake, { ParentId: "r-1234567890", Name: "example" });
  });

  it("Should import organizational unit", async () => {
    // Given
    class AWSError extends Error {
      public constructor(readonly code: string) {
        super();
      }
    }
    const error = new AWSError("DuplicateOrganizationalUnitException");
    const createOrganizationalUnitFake = sinon.fake.throws(error);
    AWS.mock("Organizations", "createOrganizationalUnit", createOrganizationalUnitFake);

    const organizationalUnit = { Id: "ou-1234567890", Name: "example" };
    const mock: SDK.Organizations.ListOrganizationalUnitsForParentResponse = {
      OrganizationalUnits: [organizationalUnit],
    };
    const findOrganizationalUnitFake = sinon.fake.resolves(mock);
    AWS.mock("Organizations", "listOrganizationalUnitsForParent", findOrganizationalUnitFake);

    const request = {
      ...event,
      RequestType: "Create",
      ResourceProperties: {
        ...event.ResourceProperties,
        ParentId: "r-1234567890",
        Name: "example",
        ImportOnDuplicate: String(true),
      },
    };

    // When
    const response = await handler(request as OnEventRequest);

    // Then
    expect(response).not.toBeUndefined();
    expect(response?.PhysicalResourceId).toEqual("ou-1234567890");
    expect(response?.Data).toEqual(organizationalUnit);

    sinon.assert.calledOnce(createOrganizationalUnitFake);
    sinon.assert.calledOnceWithMatch(createOrganizationalUnitFake, { ParentId: "r-1234567890", Name: "example" });
    sinon.assert.calledOnce(findOrganizationalUnitFake);
  });

  it("Should update organizational unit", async () => {
    // Given
    const organizationalUnit = { Id: "ou-1234567890", Name: "example" };
    const mock: SDK.Organizations.UpdateOrganizationalUnitResponse = {
      OrganizationalUnit: organizationalUnit,
    };
    const updateOrganizationalUnitFake = sinon.fake.resolves(mock);
    AWS.mock("Organizations", "updateOrganizationalUnit", updateOrganizationalUnitFake);

    const request = {
      ...event,
      PhysicalResourceId: "ou-1234567890",
      RequestType: "Update",
      ResourceProperties: {
        ...event.ResourceProperties,
        ParentId: "r-1234567890",
        Name: "example",
      },
    };

    // When
    const response = await handler(request as OnEventRequest);

    // Then
    expect(response).not.toBeUndefined();
    expect(response?.PhysicalResourceId).toEqual("ou-1234567890");
    expect(response?.Data).toEqual(organizationalUnit);
    sinon.assert.calledOnce(updateOrganizationalUnitFake);
    sinon.assert.calledOnceWithMatch(updateOrganizationalUnitFake, {
      OrganizationalUnitId: "ou-1234567890",
      Name: "example",
    });
  });

  it("Should delete organizational unit", async () => {
    // Given
    const deleteOrganizationalUnitFake = sinon.fake.resolves(undefined);
    AWS.mock("Organizations", "deleteOrganizationalUnit", deleteOrganizationalUnitFake);

    const request = {
      ...event,
      RequestType: "Delete",
      PhysicalResourceId: "ou-1234567890",
      ResourceProperties: {
        ...event.ResourceProperties,
        ParentId: "r-1234567890",
        Name: "example",
        ImportOnDuplicate: String(true),
        RemovalPolicy: RemovalPolicy.DESTROY,
      },
    };

    // When
    const response = await handler(request as OnEventRequest);

    // Then
    expect(response).not.toBeUndefined();
    expect(response?.PhysicalResourceId).toEqual("ou-1234567890");
    sinon.assert.calledOnce(deleteOrganizationalUnitFake);
    sinon.assert.calledOnceWithMatch(deleteOrganizationalUnitFake, { OrganizationalUnitId: "ou-1234567890" });
  });
});
