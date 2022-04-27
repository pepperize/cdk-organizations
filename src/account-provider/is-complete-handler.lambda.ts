import { IsCompleteRequest, IsCompleteResponse } from "aws-cdk-lib/custom-resources/lib/provider-framework/types";
import * as AWS from "aws-sdk";
import { Organizations } from "aws-sdk";

let organizationsClient: AWS.Organizations;

/**
 * The isComplete handler is repeatedly invoked checking CreateAccountStatus until SUCCEEDED or FAILED.
 * @see https://docs.aws.amazon.com/cdk/api/v1/docs/custom-resources-readme.html#asynchronous-providers-iscomplete
 */
export async function handler(event: IsCompleteRequest): Promise<IsCompleteResponse> {
  console.log(`Request of type ${event.RequestType} received`);

  if (!organizationsClient) {
    organizationsClient = new AWS.Organizations({ region: "us-east-1" });
  }

  console.log("Payload: %j", event);

  let accountId: string;
  if (event.RequestType == "Create" || isLegacyPhysicalResourceId(event)) {
    const response: AWS.Organizations.DescribeCreateAccountStatusResponse = await organizationsClient
      // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#describeCreateAccountStatus-property
      .describeCreateAccountStatus({
        CreateAccountRequestId: isLegacyPhysicalResourceId(event)
          ? event.PhysicalResourceId!
          : event.Data?.CreateAccountStatusId,
      })
      .promise();

    if (response.CreateAccountStatus?.State == "IN_PROGRESS") {
      return { IsComplete: false, Data: {} };
    }

    if (
      response.CreateAccountStatus?.State == "FAILED" &&
      response.CreateAccountStatus?.FailureReason != "EMAIL_ALREADY_EXISTS"
    ) {
      throw new Error(
        `Failed ${event.RequestType} Account ${response.CreateAccountStatus?.AccountName}, reason: ${response.CreateAccountStatus?.FailureReason}`
      );
    }

    if (
      response.CreateAccountStatus?.FailureReason == "EMAIL_ALREADY_EXISTS" &&
      event.ResourceProperties.ImportOnDuplicate
    ) {
      const account = await findAccountByEmail(organizationsClient, event.ResourceProperties.Email);

      accountId = account?.Id!;
    } else if (
      response.CreateAccountStatus?.FailureReason == "EMAIL_ALREADY_EXISTS" &&
      !event.ResourceProperties.ImportOnDuplicate
    ) {
      throw new Error(
        `Failed ${event.RequestType} Account ${response.CreateAccountStatus?.AccountName}, reason: ${response.CreateAccountStatus?.FailureReason}.`
      );
    } else {
      // State == SUCCEEDED
      accountId = response.CreateAccountStatus?.AccountId!;
    }
  } else {
    accountId = event.PhysicalResourceId!;
  }

  const response = await organizationsClient
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#describeAccount-property
    .describeAccount({ AccountId: accountId })
    .promise();

  // On update or create move account to destination parent
  if (event.RequestType == "Create" || event.RequestType == "Update") {
    await move(organizationsClient, accountId, event.ResourceProperties?.ParentId);
  }

  // On delete move account to root
  if (event.RequestType == "Delete" && event.ResourceProperties?.RemovalPolicy == "destroy") {
    const root = await findRoot(organizationsClient);

    await move(organizationsClient, accountId, root.Id);
  }

  return {
    IsComplete: true,
    PhysicalResourceId: accountId,
    Data: {
      ...event.ResourceProperties,
      ...event.Data,
      AccountId: accountId,
      AccountArn: response.Account?.Arn,
      AccountName: response.Account?.Name,
      Email: response.Account?.Email,
    },
  };
}

const findCurrentParent = async (client: Organizations, id: string): Promise<Organizations.Parent> => {
  const response: Organizations.ListParentsResponse = await client
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#listParents-property
    .listParents({
      ChildId: id,
    })
    .promise();

  if (response.Parents?.length) {
    return response.Parents[0];
  }

  throw new Error(`Could not find parent for id '${id}'`);
};

const findRoot = async (client: Organizations): Promise<Organizations.Root> => {
  const response: Organizations.ListRootsResponse = await client
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#listRoots-property
    .listRoots()
    .promise();

  if (response.Roots?.length) {
    return response.Roots[0];
  }

  throw new Error(`Could not find root`);
};

const move = async (
  client: Organizations,
  accountId: string,
  destinationParentId: string | undefined
): Promise<void> => {
  if (!destinationParentId) {
    return;
  }

  const currentParent = await findCurrentParent(organizationsClient, accountId);

  if (destinationParentId == currentParent.Id) {
    return;
  }

  await client
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#moveAccount-property
    .moveAccount({
      AccountId: accountId,
      SourceParentId: currentParent.Id!,
      DestinationParentId: destinationParentId,
    })
    .promise();
};

/**
 * Before aws-cdk-lib 2.15.0 the physical resource was determined in the onEventHandler and therefor the physical resource id was the account's CreateAccountStatusId.
 */
const isLegacyPhysicalResourceId = (event: IsCompleteRequest): boolean => {
  return !/\d{12}/.test(event.PhysicalResourceId!);
};

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
