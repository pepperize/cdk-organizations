import { Annotations, CustomResource, RemovalPolicy, TagManager, TagType } from "aws-cdk-lib";
import { Construct, IConstruct } from "constructs";
import { OrganizationalUnitProvider } from "./organizational-unit-provider/organizational-unit-provider";
import { IChild, IParent } from "./parent";
import { IPolicyAttachmentTarget } from "./policy-attachment";
import { ITaggableResource, TagResource } from "./tag-resource";
import { Validators } from "./validators";

export interface OrganizationalUnitProps {
  /**
   * The friendly name to assign to the new OU.
   */
  readonly organizationalUnitName: string;
  /**
   * The parent root or OU that you want to create the new OrganizationalUnit in.
   */
  readonly parent: IParent;
  /**
   * Whether to import, if a duplicate organizational unit with same name exists in the parent exists.
   *
   * @default true
   */
  readonly importOnDuplicate?: boolean;
  /**
   * If set to RemovalPolicy.DESTROY, the organizational unit will be deleted
   *
   * @default RemovalPolicy.Retain
   */
  readonly removalPolicy?: RemovalPolicy;
}

/**
 * A container for accounts within a root. An OU also can contain other OUs, enabling you to create a hierarchy that resembles an upside-down tree, with a root at the top and branches of OUs that reach down, ending in accounts that are the leaves of the tree. When you attach a policy to one of the nodes in the hierarchy, it flows down and affects all the branches (OUs) and leaves (accounts) beneath it. An OU can have exactly one parent, and currently each account can be a member of exactly one OU.
 *
 * <strong>You must first move all accounts out of the OU and any child OUs, and then you can delete the child OUs.</strong>
 */
export interface IOrganizationalUnit extends IPolicyAttachmentTarget, IParent, IChild, IConstruct {
  /**
   * The unique identifier (ID) associated with this OU. The regex pattern for an organizational unit ID string requires "ou-" followed by from 4 to 32 lowercase letters or digits (the ID of the root that contains the OU). This string is followed by a second "-" dash and from 8 to 32 additional lowercase letters or digits.
   */
  readonly organizationalUnitId: string;
  /**
   * The Amazon Resource Name (ARN) of this OU. For more information about ARNs in Organizations, see [ARN Formats Supported by Organizations](https://docs.aws.amazon.com/service-authorization/latest/reference/list_awsorganizations.html#awsorganizations-resources-for-iam-policies) in the AWS Service Authorization Reference.
   */
  readonly organizationalUnitArn: string;
  /**
   * The friendly name of this OU.
   */
  readonly organizationalUnitName: string;
}

export class OrganizationalUnit extends Construct implements IOrganizationalUnit, ITaggableResource {
  readonly organizationalUnitId: string;
  readonly organizationalUnitArn: string;
  readonly organizationalUnitName: string;
  readonly tags = new TagManager(TagType.KEY_VALUE, "Custom::Organizations_OrganizationalUnitProvider");

  public constructor(scope: Construct, id: string, props: OrganizationalUnitProps) {
    super(scope, id);

    const { organizationalUnitName, parent, importOnDuplicate, removalPolicy } = props;

    if (!Validators.of().organizationalUnitName(organizationalUnitName)) {
      Annotations.of(this).addError(
        "The organizational unit's name must be of type string and between 1 and 128 characters long."
      );
    }

    this.node.addDependency(parent);

    const organizationalUnitProvider = OrganizationalUnitProvider.getOrCreate(this);
    const organizationalUnit = new CustomResource(this, "OrganizationProvider", {
      serviceToken: organizationalUnitProvider.provider.serviceToken,
      resourceType: "Custom::Organizations_OrganizationalUnitProvider",
      properties: {
        Name: organizationalUnitName,
        ParentId: parent.identifier(),
        ImportOnDuplicate: String(importOnDuplicate ?? true),
        RemovalPolicy: removalPolicy ?? RemovalPolicy.RETAIN,
      },
    });

    this.organizationalUnitId = organizationalUnit.getAtt("Id").toString();
    this.organizationalUnitArn = organizationalUnit.getAtt("Arn").toString();
    this.organizationalUnitName = organizationalUnit.getAtt("Name").toString();

    const tagResource = new TagResource(this, "Tags", { resource: this });
    tagResource.node.addDependency(organizationalUnit);
  }

  identifier(): string {
    return this.organizationalUnitId;
  }
}
