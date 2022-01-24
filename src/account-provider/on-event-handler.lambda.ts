import { OnEventRequest, OnEventResponse } from "aws-cdk-lib/custom-resources/lib/provider-framework/types";
import { Organizations } from "aws-sdk";

let organizationsClient: Organizations;

/**
 * The onEvent handler is invoked whenever a resource lifecycle event for an Account occurs
 *
 * @see https://docs.aws.amazon.com/cdk/api/v1/docs/custom-resources-readme.html#handling-lifecycle-events-onevent
 */
export async function handler(event: OnEventRequest): Promise<OnEventResponse | undefined> {
  console.log(`Request of type ${event.RequestType} received`);

  if (!organizationsClient) {
    organizationsClient = new Organizations({ region: "us-east-1" });
  }

  console.log("Payload: %j", event);

  if (event.RequestType == "Create") {
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#createAccount-property
    const response: Organizations.CreateAccountResponse = await organizationsClient
      .createAccount({
        Email: event.ResourceProperties.Email,
        AccountName: event.ResourceProperties.AccountName,
        RoleName: event.ResourceProperties.RoleName,
        IamUserAccessToBilling: event.ResourceProperties.IamUserAccessToBilling,
      })
      .promise();
    console.log("Creating account: %j", response);
    return { PhysicalResourceId: response.CreateAccountStatus?.Id };
  }

  // On event.RequestType == "Update" or event.RequestType == "Delete"
  // No update for accounts available https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html
  // Deletion is not possible, only removal from organization if criteria are matching for standalone account: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#removeAccountFromOrganization-property
  // TODO: Try to delete account or move to Organization.Root (RemovalPolicy)
  return { PhysicalResourceId: event.PhysicalResourceId, Data: event.ResourceProperties };
}
