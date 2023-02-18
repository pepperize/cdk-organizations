import { CdkCustomResourceEvent as OnEventRequest, CdkCustomResourceResponse as OnEventResponse } from "aws-lambda";
import { Organizations } from "aws-sdk";

let organizationsClient: Organizations;

/**
 * The onEvent handler is invoked whenever a resource lifecycle event for an Account occurs
 *
 * @see https://docs.aws.amazon.com/cdk/api/v1/docs/custom-resources-readme.html#handling-lifecycle-events-onevent
 */
export async function handler(event: OnEventRequest): Promise<OnEventResponse> {
  console.log(`Request of type ${event.RequestType} received`);

  if (!organizationsClient) {
    organizationsClient = new Organizations({ region: "us-east-1" });
  }

  console.log("Payload: %j", event);

  const { Email, AccountName, RoleName, IamUserAccessToBilling } = event.ResourceProperties;

  if (event.RequestType == "Create") {
    const response: Organizations.CreateAccountResponse = await organizationsClient
      // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#createAccount-property
      .createAccount({
        Email: Email,
        AccountName: AccountName,
        RoleName: RoleName,
        IamUserAccessToBilling: IamUserAccessToBilling,
      })
      .promise();

    console.log("Creating account: %j", response);

    return {
      Data: { ...event.ResourceProperties, CreateAccountStatusId: response.CreateAccountStatus?.Id },
    };
  }

  return {
    ...event,
    Data: {
      ...event.ResourceProperties,
    },
  };
}
