import { CustomResource } from "aws-cdk-lib";
import { AwsCustomResource, AwsCustomResourcePolicy, PhysicalResourceId } from "aws-cdk-lib/custom-resources";
import { Construct, IConstruct } from "constructs";
import { EnablePolicyType } from "./enable-policy-type";
import { OrganizationProvider } from "./organization-provider";
import { IParent } from "./parent";
import { PolicyType } from "./policy";
import { IPolicyAttachmentTarget } from "./policy-attachment";

/**
 * Specifies the feature set supported by the new organization. Each feature set supports different levels of functionality.
 *
 * @see https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html#feature-set
 */
export enum FeatureSet {
  /**
   * All member accounts have their bills consolidated to and paid by the management account. For more information, see [Consolidated billing](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html#feature-set-cb-only) in the AWS Organizations User Guide. The consolidated billing feature subset isn’t available for organizations in the AWS GovCloud (US) Region.
   */
  CONSOLIDATED_BILLING = "CONSOLIDATED_BILLING",
  /**
   * In addition to all the features supported by the consolidated billing feature set, the management account can also apply any policy type to any member account in the organization. For more information, see [All features](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html#feature-set-all) in the AWS Organizations User Guide.
   */
  ALL = "ALL",
}

export interface OrganizationProps {
  /**
   * Enabling features in your organization.
   *
   * @see https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_org_support-all-features.html
   *
   * @default ALL
   */
  readonly featureSet?: FeatureSet;
}

/**
 * Creates an organization to consolidate your AWS accounts so that you can administer them as a single unit. An organization has one management account along with zero or more member accounts. You can organize the accounts in a hierarchical, tree-like structure with a root at the top and organizational units nested under the root. Each account can be directly in the root, or placed in one of the OUs in the hierarchy. An organization has the functionality that is determined by the feature set that you enable.
 *
 * <strong>The account whose user is calling the CreateOrganization operation automatically becomes the management account of the new organization.</strong>
 *
 * <strong>For deletion of an organization you must previously remove all the member accounts, OUs, and policies from the organization!</strong>
 *
 * @see https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_org_create.html#create-org
 */
export interface IOrganization extends IConstruct {
  /**
   * The unique identifier (ID) of an organization. The regex pattern for an organization ID string requires "o-" followed by from 10 to 32 lowercase letters or digits.
   */
  readonly organizationId: string;
  /**
   * The Amazon Resource Name (ARN) of an organization.
   */
  readonly organizationArn: string;
  /**
   * Specifies the functionality that currently is available to the organization. If set to "ALL", then all features are enabled and policies can be applied to accounts in the organization. If set to "CONSOLIDATED_BILLING", then only consolidated billing functionality is available.
   */
  readonly featureSet: FeatureSet;
  /**
   * The Amazon Resource Name (ARN) of the account that is designated as the management account for the organization.
   */
  readonly managementAccountArn: string;
  /**
   * The unique identifier (ID) of the management account of an organization.
   */
  readonly managementAccountId: string;
  /**
   * The email address that is associated with the AWS account that is designated as the management account for the organization.
   */
  readonly managementAccountEmail: string;
  /**
   * The root of the current organization, which is automatically created.
   */
  readonly root: Root;
}

export class Organization extends Construct implements IOrganization {
  public readonly organizationId: string;
  public readonly organizationArn: string;
  public readonly featureSet: FeatureSet;
  public readonly managementAccountArn: string;
  public readonly managementAccountId: string;
  public readonly managementAccountEmail: string;
  public readonly root: Root;

  public constructor(scope: Construct, id: string, props: OrganizationProps) {
    super(scope, id);

    const featureSet = props.featureSet || FeatureSet.ALL;

    const organizationProvider = OrganizationProvider.getOrCreate(this);
    const organization = new CustomResource(this, "OrganizationProvider", {
      serviceToken: organizationProvider.provider.serviceToken,
      resourceType: "Custom::Organization_Organization",
      properties: {
        FeatureSet: featureSet,
      },
    });
    this.organizationId = organization.getAtt("Organization.Id").toString();
    this.organizationArn = organization.getAtt("Organization.Arn").toString();
    this.featureSet = organization.getAtt("Organization.FeatureSet").toString() as FeatureSet;
    this.managementAccountArn = organization.getAtt("Organization.MasterAccountArn").toString();
    this.managementAccountId = organization.getAtt("Organization.MasterAccountId").toString();
    this.managementAccountEmail = organization.getAtt("Organization.MasterAccountEmail").toString();

    this.root = new Root(this, "Root", { organization: this });
    this.root.node.addDependency(organization);
  }

  public enablePolicyType(policyType: PolicyType) {
    new EnablePolicyType(this, "EnablePolicyType", {
      root: this.root,
      policyType: policyType,
    });
  }
}

export interface RootProps {
  readonly organization: IOrganization;
}

/**
 * The parent container for all the accounts for your organization. If you apply a policy to the root, it applies to all organizational units (OUs) and accounts in the organization.
 * <strong>Currently, you can have only one root. AWS Organizations automatically creates it for you when you create an organization.</strong>
 * @see https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html
 */
export class Root extends Construct implements IParent, IPolicyAttachmentTarget {
  /**
   * The unique identifier (ID) for the root. The regex pattern for a root ID string requires "r-" followed by from 4 to 32 lowercase letters or digits.
   */
  public readonly rootId: string;
  public constructor(scope: Construct, id: string, props: RootProps) {
    super(scope, id);

    props;

    const root = new AwsCustomResource(this, "RootCustomResource", {
      resourceType: "Custom::Organization_Root",
      onCreate: {
        service: "Organizations",
        action: "listRoots", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#listRoots-property
        region: "us-east-1",
        physicalResourceId: PhysicalResourceId.fromResponse("Roots.0.Id"),
      },
      onUpdate: {
        service: "Organizations",
        action: "listRoots", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#listRoots-property
        region: "us-east-1",
        physicalResourceId: PhysicalResourceId.fromResponse("Roots.0.Id"),
      },
      onDelete: {
        service: "Organizations",
        action: "listRoots", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#listRoots-property
        region: "us-east-1",
      },
      installLatestAwsSdk: false,
      policy: AwsCustomResourcePolicy.fromSdkCalls({
        resources: AwsCustomResourcePolicy.ANY_RESOURCE,
      }),
    });

    this.rootId = root.getResponseField("Roots.0.Id"); // Returns first root id. It seems AWS Organizations doesn't contain multiple roots.
  }

  identifier(): string {
    return this.rootId;
  }
}
