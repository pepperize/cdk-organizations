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
  if (event.Data?.CreateAccountStatusId) {
    const response: AWS.Organizations.DescribeCreateAccountStatusResponse = await organizationsClient
      // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#describeCreateAccountStatus-property
      .describeCreateAccountStatus({ CreateAccountRequestId: event.Data.CreateAccountStatusId })
      .promise();

    if (response.CreateAccountStatus?.State == "IN_PROGRESS") {
      return { IsComplete: false, Data: {} };
    }

    if (response.CreateAccountStatus?.State == "FAILED") {
      throw new Error(
        `Failed ${event.RequestType} Account ${response.CreateAccountStatus?.AccountName}, reason: ${response?.CreateAccountStatus?.FailureReason}`
      );
    }

    // State == SUCCEEDED
    accountId = response.CreateAccountStatus?.AccountId!;
  } else {
    accountId = event.Data?.AccountId;
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
    Data: {
      ...event.ResourceProperties,
      ...event.Data,
      AccountId: accountId,
      AccountArn: response.Account?.Arn,
      AccountName: response.Account?.Name,
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
