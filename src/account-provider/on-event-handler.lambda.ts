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

  const { Email, AccountName, RoleName, IamUserAccessToBilling, ImportOnDuplicate } = event.ResourceProperties;

  if (event.RequestType == "Create" && ImportOnDuplicate == "true") {
    const account = await findAccountByEmail(organizationsClient, Email);

    if (account) {
      return {
        PhysicalResourceId: account.Id,
        Data: { ...event.ResourceProperties, AccountId: account.Id },
      };
    }
  }

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
      PhysicalResourceId: response.CreateAccountStatus?.Id,
      Data: { ...event.ResourceProperties, CreateAccountStatusId: response.CreateAccountStatus?.Id },
    };
  }

  let data;
  if (/\d{12}/.test(event.PhysicalResourceId!)) {
    data = { AccountId: event.PhysicalResourceId };
  } else {
    data = { CreateAccountStatusId: event.PhysicalResourceId };
  }

  return {
    ...event,
    Data: {
      ...event.ResourceProperties,
      ...data,
    },
  };
}

const findAccountByEmail = async (client: Organizations, email: string): Promise<Organizations.Account | undefined> => {
  let response: Organizations.ListAccountsResponse = await client
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#listAccounts-property
    .listAccounts()
    .promise();
  for (const account of response.Accounts ?? []) {
    if (account.Email == email) {
      return account;
    }
  }

  while (response.NextToken) {
    response = await client
      // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#listAccounts-property
      .listAccounts()
      .promise();
    for (const account of response.Accounts ?? []) {
      if (account.Email == email) {
        return account;
      }
    }
  }

  return undefined;
};
