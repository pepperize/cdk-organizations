import { Construct } from "@aws-cdk/core";
import {
  AwsCustomResource,
  AwsCustomResourcePolicy,
  PhysicalResourceId,
  PhysicalResourceIdReference,
} from "@aws-cdk/custom-resources";

export interface OrganizationalUnitProps {
  /**
   * The friendly name to assign to the new OU.
   */
  readonly organizationalUnitName: string;

  /**
   * The unique identifier (ID) of the parent root or OU that you want to create the new OU in.
   */
  readonly parentId: string;

  /**
   * A list of tags that you want to attach to the newly created organizational unit. For each tag in the list, you must specify both a tag key and a value. You can set the value to an empty string, but you can't set it to null.
   */
  readonly tags: { [key: string]: string };
}

/**
 * A container for accounts within a root. An OU also can contain other OUs, enabling you to create a hierarchy that resembles an upside-down tree, with a root at the top and branches of OUs that reach down, ending in accounts that are the leaves of the tree. When you attach a policy to one of the nodes in the hierarchy, it flows down and affects all the branches (OUs) and leaves (accounts) beneath it. An OU can have exactly one parent, and currently each account can be a member of exactly one OU.
 *
 * <strong>You must first move all accounts out of the OU and any child OUs, and then you can delete the child OUs.</strong>
 */
export class OrganizationalUnit extends Construct {
  public constructor(scope: Construct, id: string, props: OrganizationalUnitProps) {
    super(scope, id);

    const { organizationalUnitName, parentId } = props;

    const tags: { Key: string; Value: string }[] = [];
    for (const [key, value] of Object.entries(props.tags)) {
      tags.push({
        Key: key,
        Value: value,
      });
    }

    new AwsCustomResource(this, "OrganizationalUnitCustomResource", {
      resourceType: "Custom::Organization_OrganizationalUnit",
      onCreate: {
        service: "Organization",
        action: "createOrganizationalUnit", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#createOrganizationalUnit-property
        region: "us-east-1",
        parameters: {
          Name: organizationalUnitName,
          ParentId: parentId,
          Tags: tags,
        },
        physicalResourceId: PhysicalResourceId.fromResponse("OrganizationalUnit.Id"),
      },
      onUpdate: {
        service: "Organization",
        action: "updateOrganizationalUnit", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#updateOrganizationalUnit-property
        region: "us-east-1",
        parameters: {
          Name: organizationalUnitName,
          OrganizationalUnitId: new PhysicalResourceIdReference(),
        },
        physicalResourceId: PhysicalResourceId.fromResponse("OrganizationalUnit.Id"),
      },
      onDelete: {
        service: "Organization",
        action: "deleteOrganizationalUnit", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#deleteOrganizationalUnit-property
        region: "us-east-1",
        parameters: {
          OrganizationalUnitId: new PhysicalResourceIdReference(),
        },
      },
      policy: AwsCustomResourcePolicy.fromSdkCalls({ resources: AwsCustomResourcePolicy.ANY_RESOURCE }),
    });

    // TODO: https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_core.Tags.html
  }
}
