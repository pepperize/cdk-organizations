import {
  AwsCustomResource,
  AwsCustomResourcePolicy,
  PhysicalResourceId,
  PhysicalResourceIdReference,
} from "aws-cdk-lib/custom-resources";
import { Construct, IConstruct } from "constructs";
import { IChild, IParent } from "./parent";
import { IPolicyAttachmentTarget } from "./policy-attachment";

export interface OrganizationalUnitProps {
  /**
   * The friendly name to assign to the new OU.
   */
  readonly organizationalUnitName: string;

  /**
   * The parent root or OU that you want to create the new OrganizationalUnit in.
   */
  readonly parent: IParent;
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

export abstract class OrganizationalUnitBase extends Construct implements IOrganizationalUnit {
  abstract readonly organizationalUnitId: string;
  abstract readonly organizationalUnitArn: string;
  abstract readonly organizationalUnitName: string;

  identifier(): string {
    return this.organizationalUnitId;
  }
}

export interface OrganizationalUnitAttributes {
  readonly organizationalUnitId: string;
  readonly parent: IParent;
}

export class OrganizationalUnit extends OrganizationalUnitBase {
  public static fromOrganizationalUnitId(
    scope: Construct,
    id: string,
    attrs: OrganizationalUnitAttributes
  ): IOrganizationalUnit {
    class Import extends OrganizationalUnitBase {
      readonly organizationalUnitId: string;
      readonly organizationalUnitArn: string;
      readonly organizationalUnitName: string;
      public constructor() {
        super(scope, id);

        this.node.addDependency(attrs.parent);

        const organizationalUnit = new AwsCustomResource(this, "OrganizationalUnitCustomResource", {
          resourceType: "Custom::Organization_OrganizationalUnit",
          onCreate: {
            service: "Organizations",
            action: "describeOrganizationalUnit", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#describeOrganizationalUnit-property
            region: "us-east-1",
            parameters: {
              OrganizationalUnitId: attrs.organizationalUnitId,
            },
            physicalResourceId: PhysicalResourceId.fromResponse("OrganizationalUnit.Id"),
          },
          onUpdate: {
            service: "Organizations",
            action: "describeOrganizationalUnit", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#updateOrganizationalUnit-property
            region: "us-east-1",
            parameters: {
              OrganizationalUnitId: new PhysicalResourceIdReference(),
            },
            physicalResourceId: PhysicalResourceId.fromResponse("OrganizationalUnit.Id"),
          },
          onDelete: {
            service: "Organizations",
            action: "deleteOrganizationalUnit", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#deleteOrganizationalUnit-property
            region: "us-east-1",
            parameters: {
              OrganizationalUnitId: new PhysicalResourceIdReference(),
            },
          },
          installLatestAwsSdk: false,
          policy: AwsCustomResourcePolicy.fromSdkCalls({ resources: AwsCustomResourcePolicy.ANY_RESOURCE }),
        });
        this.organizationalUnitId = organizationalUnit.getResponseField("OrganizationalUnit.Id");
        this.organizationalUnitArn = organizationalUnit.getResponseField("OrganizationalUnit.Arn");
        this.organizationalUnitName = organizationalUnit.getResponseField("OrganizationalUnit.Name");
      }
    }

    return new Import();
  }
  readonly organizationalUnitId: string;
  readonly organizationalUnitArn: string;
  readonly organizationalUnitName: string;
  public constructor(scope: Construct, id: string, props: OrganizationalUnitProps) {
    super(scope, id);

    const { organizationalUnitName, parent } = props;
    this.node.addDependency(parent);

    const organizationalUnit = new AwsCustomResource(this, "OrganizationalUnitCustomResource", {
      resourceType: "Custom::Organization_OrganizationalUnit",
      onCreate: {
        service: "Organizations",
        action: "createOrganizationalUnit", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#createOrganizationalUnit-property
        region: "us-east-1",
        parameters: {
          Name: organizationalUnitName,
          ParentId: parent.identifier(),
        },
        physicalResourceId: PhysicalResourceId.fromResponse("OrganizationalUnit.Id"),
      },
      onUpdate: {
        service: "Organizations",
        action: "updateOrganizationalUnit", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#updateOrganizationalUnit-property
        region: "us-east-1",
        parameters: {
          Name: organizationalUnitName,
          OrganizationalUnitId: new PhysicalResourceIdReference(),
        },
        physicalResourceId: PhysicalResourceId.fromResponse("OrganizationalUnit.Id"),
      },
      onDelete: {
        service: "Organizations",
        action: "deleteOrganizationalUnit", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#deleteOrganizationalUnit-property
        region: "us-east-1",
        parameters: {
          OrganizationalUnitId: new PhysicalResourceIdReference(),
        },
      },
      installLatestAwsSdk: false,
      policy: AwsCustomResourcePolicy.fromSdkCalls({ resources: AwsCustomResourcePolicy.ANY_RESOURCE }),
    });
    this.organizationalUnitId = organizationalUnit.getResponseField("OrganizationalUnit.Id");
    this.organizationalUnitArn = organizationalUnit.getResponseField("OrganizationalUnit.Arn");
    this.organizationalUnitName = organizationalUnit.getResponseField("OrganizationalUnit.Name");

    // TODO: https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_core.Tags.html
  }

  identifier(): string {
    return this.organizationalUnitId;
  }
}
