import {
  OnEventHandler,
  OnEventRequest,
  OnEventResponse,
} from "aws-cdk-lib/custom-resources/lib/provider-framework/types";
import { AWSError, Organizations } from "aws-sdk";

let organizationsClient: Organizations;

/**
 * The onEvent handler is invoked whenever a resource lifecycle event for an organizational unit occurs
 *
 * @see https://docs.aws.amazon.com/cdk/api/v1/docs/custom-resources-readme.html#handling-lifecycle-events-onevent
 */
export const handler: OnEventHandler = async (event: OnEventRequest): Promise<OnEventResponse | undefined> => {
  console.log(`Request of type ${event.RequestType} received`);

  if (!organizationsClient) {
    organizationsClient = new Organizations({ region: "us-east-1" });
  }

  console.log("Payload: %j", event);

  const { ParentId, Name, ImportOnDuplicate, RemovalPolicy } = event.ResourceProperties;

  if (event.RequestType == "Create") {
    try {
      const organizationalUnit = await createOrganizationalUnit(organizationsClient, ParentId, Name);
      return {
        PhysicalResourceId: organizationalUnit.Id,
        Data: {
          ...organizationalUnit,
        },
      };
    } catch (e) {
      const error = e as AWSError;
      console.log(error);
      console.log(ImportOnDuplicate);
      // https://docs.aws.amazon.com/organizations/latest/APIReference/API_CreateOrganizationalUnit.html#API_CreateOrganizationalUnit_Errors
      if (error.code == "DuplicateOrganizationalUnitException" && ImportOnDuplicate == "true") {
        console.log(`Organizational unit already created, trying to find existing one in parent.`);
        const organizationalUnit = await findOrganizationalUnitByParentAndName(organizationsClient, ParentId, Name);

        return {
          PhysicalResourceId: organizationalUnit.Id,
          Data: {
            ...organizationalUnit,
          },
        };
      } else {
        throw error;
      }
    }
  }

  if (event.RequestType == "Update") {
    const organizationalUnit = await updateOrganizationalUnit(organizationsClient, event.PhysicalResourceId!, Name);

    return {
      PhysicalResourceId: organizationalUnit.Id,
      Data: {
        ...organizationalUnit,
      },
    };
  }

  if (event.RequestType == "Delete" && RemovalPolicy == "destroy") {
    await deleteOrganizationalUnit(organizationsClient, event.PhysicalResourceId!);
  }

  return {
    PhysicalResourceId: event.PhysicalResourceId,
    Data: {
      ...event.ResourceProperties,
    },
  };
};

const findOrganizationalUnitByParentAndName = async (
  client: Organizations,
  parentId: string,
  name: string
): Promise<Organizations.OrganizationalUnit> => {
  let response: Organizations.ListOrganizationalUnitsForParentResponse = await client
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#listOrganizationalUnitsForParent-property
    .listOrganizationalUnitsForParent({ ParentId: parentId })
    .promise();
  for (const organizationalUnit of response.OrganizationalUnits ?? []) {
    if (organizationalUnit.Name == name) {
      return organizationalUnit;
    }
  }

  while (response.NextToken) {
    response = await client
      .listOrganizationalUnitsForParent({ ParentId: parentId, NextToken: response.NextToken })
      .promise();
    for (const organizationalUnit of response.OrganizationalUnits ?? []) {
      if (organizationalUnit.Name == name) {
        return organizationalUnit;
      }
    }
  }

  throw new Error(`Organizational unit '${name}' not found in '${parentId}'`);
};

const createOrganizationalUnit = async (
  client: Organizations,
  parentId: string,
  name: string
): Promise<Organizations.OrganizationalUnit> => {
  const response: Organizations.CreateOrganizationalUnitResponse = await client
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#createOrganizationalUnit-property
    .createOrganizationalUnit({
      ParentId: parentId,
      Name: name,
    })
    .promise();
  console.log("Creating organizational unit: %j", response);

  if (!response.OrganizationalUnit) {
    throw new Error("Could not create organizational unit, reason: empty response");
  }

  return response.OrganizationalUnit;
};

const updateOrganizationalUnit = async (
  client: Organizations,
  id: string,
  name: string
): Promise<Organizations.OrganizationalUnit> => {
  const response: Organizations.UpdateOrganizationalUnitResponse = await client
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#updateOrganizationalUnit-property
    .updateOrganizationalUnit({
      OrganizationalUnitId: id,
      Name: name,
    })
    .promise();
  console.log("Updating organizational unit: %j", response);

  if (!response.OrganizationalUnit) {
    throw new Error("Could not update organizational unit, reason: empty response");
  }

  return response.OrganizationalUnit;
};

const deleteOrganizationalUnit = async (client: Organizations, id: string): Promise<void> => {
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#deleteOrganizationalUnit-property
  await client
    .deleteOrganizationalUnit({
      OrganizationalUnitId: id,
    })
    .promise();
};
