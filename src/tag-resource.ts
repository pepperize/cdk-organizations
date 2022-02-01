import { CustomResource, ITaggable } from "aws-cdk-lib";
import { IResolvable } from "aws-cdk-lib/core/lib/resolvable";
import { Construct } from "constructs";
import { TagResourceProvider } from "./tag-resource-provider";

export interface ITaggableResource extends ITaggable {}

export interface TagResourceProps {
  readonly resourceId: string;
  readonly tags: IResolvable;
}

/**
 * Add tags to an AWS Organizations resource to make it easier to identify, organize, and search.
 *
 * @see https://docs.aws.amazon.com/organizations/latest/userguide/orgs_tagging.html
 * @see https://docs.aws.amazon.com/ARG/latest/APIReference/API_Tag.html
 */
export class TagResource extends Construct {
  public constructor(scope: Construct, id: string, props: TagResourceProps) {
    super(scope, id);

    const { resourceId, tags } = props;

    const tagResourceProvider = TagResourceProvider.getOrCreate(this);
    new CustomResource(this, "TagResource", {
      serviceToken: tagResourceProvider.provider.serviceToken,
      resourceType: "Custom::Organizations_TagResource",
      properties: {
        ResourceId: resourceId,
        Tags: tags,
      },
    });
  }
}
