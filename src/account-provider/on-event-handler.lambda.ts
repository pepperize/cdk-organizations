import { OnEventRequest, OnEventResponse } from "@aws-cdk/custom-resources/lib/provider-framework/types";
import { Organizations } from "aws-sdk";

const organizationsClient = new Organizations({ region: "us-east-1" });

/**
 * The onEvent handler is invoked whenever a resource lifecycle event for an Account occurs
 *
 * @see https://docs.aws.amazon.com/cdk/api/v1/docs/custom-resources-readme.html#handling-lifecycle-events-onevent
 */
export async function handler(event: OnEventRequest): Promise<OnEventResponse | undefined> {
  console.log(`Request of type ${event.RequestType} received`);

  if (event.RequestType == "Create") {
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#createAccount-property
    const response: Organizations.CreateAccountResponse = await organizationsClient
      .createAccount({
        Email: event.ResourceProperties.Email,
        AccountName: event.ResourceProperties.AccountName,
      })
      .promise();
    console.log("Creating account: %j", response);
    return { PhysicalResourceId: response.CreateAccountStatus?.Id };
  }

  if (event.RequestType == "Update") {
    // No update for accounts available https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html
    return { PhysicalResourceId: event.PhysicalResourceId, ResourceProperties: event.ResourceProperties };
  }

  if (event.RequestType == "Delete") {
    // Deletion is not possible, only removal from organization if criteria are matching for standalone account: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#removeAccountFromOrganization-property
    throw new Error("Deletion is not a supported operation");
  }

  throw new Error(`${event.RequestType} is not a supported operation`);
}
