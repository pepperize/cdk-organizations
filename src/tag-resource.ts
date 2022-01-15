import { Construct, CustomResource, ITaggable } from "@aws-cdk/core";
import { TagResourceProvider } from "./tag-resource-provider";

export interface ITaggableResource extends ITaggable {
  /**
   * The unique identifier (ID) of the account, Organizational unit (OU), parent root or Policy (any type) that you want to tag.
   */
  identifier(): string;
}

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
    new CustomResource(this, `TagResourceProvider`, {
      serviceToken: tagResourceProvider.provider.serviceToken,
      resourceType: "Custom::Organization_TagResource",
      properties: {
        ResourceId: resource.identifier(),
        Tags: resource.tags.renderedTags,
      },
    });
  }
}
