import { CdkCustomResourceEvent as OnEventRequest, CdkCustomResourceResponse as OnEventResponse } from "aws-lambda";
import { AWSError, Organizations } from "aws-sdk";

let organizationsClient: Organizations;
const organizationsRegion = process.env.ORGANIZATIONS_ENDPOINT_REGION ?? "us-east-1";

/**
 * The onEvent handler is invoked whenever a resource lifecycle event for an organization occurs
 *
 * @see https://docs.aws.amazon.com/cdk/api/v1/docs/custom-resources-readme.html#handling-lifecycle-events-onevent
 */
export async function handler(event: OnEventRequest): Promise<OnEventResponse> {
  console.log(`Request of type ${event.RequestType} received`);

  if (!organizationsClient) {
    organizationsClient = new Organizations({ region: organizationsRegion });
  }

  console.log("Payload: %j", event);

  if (event.RequestType == "Create") {
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#createOrganization-property
    try {
      const response: Organizations.CreateOrganizationResponse = await organizationsClient
        .createOrganization({
          FeatureSet: event.ResourceProperties.FeatureSet,
        })
        .promise();
      console.log("Creating organization: %j", response);
      return {
        PhysicalResourceId: response.Organization?.Id,
        Data: {
          ...response.Organization,
        },
      };
    } catch (e) {
      const error = e as AWSError;
      if (error.code == "AlreadyInOrganizationException") {
        // https://docs.aws.amazon.com/organizations/latest/APIReference/API_CreateOrganization.html#API_CreateOrganization_Errors
        console.log("Organization already created.");
      } else {
        throw error;
      }
    }
  }

  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#describeOrganization-property
  const response: Organizations.DescribeOrganizationResponse = await organizationsClient
    .describeOrganization()
    .promise();

  // TODO: Try to delete organization (RemovalPolicy)
  return {
    PhysicalResourceId: response.Organization?.Id,
    Data: {
      ...response.Organization,
    },
  };
}
