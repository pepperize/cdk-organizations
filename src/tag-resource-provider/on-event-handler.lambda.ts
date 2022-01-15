import { OnEventRequest, OnEventResponse } from "@aws-cdk/custom-resources/lib/provider-framework/types";
import { Organizations } from "aws-sdk";

const organizationsClient = new Organizations({ region: "us-east-1" });

/**
 * The onEvent handler is invoked whenever a resource lifecycle event for a TagResource occurs
 *
 * @see https://docs.aws.amazon.com/cdk/api/v1/docs/custom-resources-readme.html#handling-lifecycle-events-onevent
 */
export async function handler(event: OnEventRequest): Promise<OnEventResponse | undefined> {
  console.log(`Request of type ${event.RequestType} received`);

  // Get all AWS organizations service tags
  const listTagsForResourceResponse: Organizations.ListTagsForResourceResponse = await organizationsClient
    .listTagsForResource({
      ResourceId: event.ResourceProperties.ResourceId,
    })
    .promise();
  const oldTags: Organizations.Tag[] = listTagsForResourceResponse.Tags || [];
  const oldTagKeys: string[] = oldTags.map((tag) => tag.Key);
  const newTags: Organizations.Tag[] = event.ResourceProperties.Tags || [];
  const newTagKeys: string[] = newTags.map((tag) => tag.Key);

  // Remove AWS organizations service tags
  const tagKeysToRemove: string[] = oldTagKeys.filter((tagKey) => !newTagKeys.includes(tagKey));
  if (tagKeysToRemove.length) {
    await organizationsClient
      .untagResource({
        ResourceId: event.ResourceProperties.ResourceId,
        TagKeys: tagKeysToRemove,
      })
      .promise();
  }

  if (event.RequestType == "Delete") {
    return { PhysicalResourceId: event.PhysicalResourceId };
  }

  if (newTags.length) {
    // Update AWS organizations service tags
    await organizationsClient
      .tagResource({
        ResourceId: event.ResourceProperties.ResourceId,
        Tags: newTags,
      })
      .promise();
  }

  return { PhysicalResourceId: event.ResourceProperties.ResourceId, ResourceProperties: event.ResourceProperties };
}
