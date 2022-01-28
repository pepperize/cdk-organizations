import { CustomResource, ITaggable } from "aws-cdk-lib";
import { Construct } from "constructs";
import { IResource } from "./resource";
import { TagResourceProvider } from "./tag-resource-provider";

export interface ITaggableResource extends ITaggable, IResource {}

export interface TagResourceProps {
  readonly resource: ITaggableResource;
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

    const { resource } = props;

    const tagResourceProvider = TagResourceProvider.getOrCreate(this);
    new CustomResource(this, "TagResource", {
      serviceToken: tagResourceProvider.provider.serviceToken,
      resourceType: "Custom::Organizations_TagResource",
      properties: {
        ResourceId: resource.identifier(),
        Tags: resource.tags.renderedTags,
      },
    });
  }
}
