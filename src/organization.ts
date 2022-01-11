import { Construct } from "@aws-cdk/core";
import { AwsCustomResource, AwsCustomResourcePolicy, PhysicalResourceId } from "@aws-cdk/custom-resources";

/**
 * Specifies the feature set supported by the new organization. Each feature set supports different levels of functionality.
 *
 * @see https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html#feature-set
 */
export enum FeatureSet {
  /**
   * All member accounts have their bills consolidated to and paid by the management account. For more information, see [Consolidated billing]{@link https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html#feature-set-cb-only} in the AWS Organizations User Guide. The consolidated billing feature subset isn’t available for organizations in the AWS GovCloud (US) Region.
   */
  CONSOLIDATED_BILLING = "CONSOLIDATED_BILLING",
  /**
   * In addition to all the features supported by the consolidated billing feature set, the management account can also apply any policy type to any member account in the organization. For more information, see [All features]{@link https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html#feature-set-all} in the AWS Organizations User Guide.
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
export class Organization extends Construct {
  /**
   * The unique identifier (ID) of an organization. The regex pattern for an organization ID string requires "o-" followed by from 10 to 32 lowercase letters or digits.
   */
  public readonly organizationId: string;
  /**
   * The unique identifier (ID) for the root. The regex pattern for a root ID string requires "r-" followed by from 4 to 32 lowercase letters or digits.
   */
  public readonly rootId: string;
  public constructor(scope: Construct, id: string, props: OrganizationProps) {
    super(scope, id);

    const featureSet = props.featureSet || FeatureSet.ALL;

    const organization = new AwsCustomResource(this, "OrganizationCustomResource", {
      resourceType: "Custom::Organization_Organization",
      onCreate: {
        service: "Organization",
        action: "createOrganization", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#createOrganization-property
        region: "us-east-1",
        parameters: {
          FeatureSet: featureSet,
        },
        physicalResourceId: PhysicalResourceId.fromResponse("Organization.Id"),
      },
      onUpdate: {
        service: "Organization",
        action: "describeOrganization", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#describeOrganization-property
        region: "us-east-1",
        physicalResourceId: PhysicalResourceId.fromResponse("Organization.Id"),
      },
      onDelete: {
        service: "Organization",
        action: "deleteOrganization", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#deleteOrganization-property
        region: "us-east-1",
      },
      policy: AwsCustomResourcePolicy.fromSdkCalls({ resources: AwsCustomResourcePolicy.ANY_RESOURCE }),
    });
    this.organizationId = organization.getResponseField("Organization.Id");

    const root = this.getRoot();
    root.node.addDependency(organization);
    this.rootId = root.getResponseField("Roots.0.Id"); // Returns first root id. It seems AWS Organizations doesn't contain multiple roots.
  }

  /**
   * The parent container for all the accounts for your organization. If you apply a policy to the root, it applies to all organizational units (OUs) and accounts in the organization.
   * <strong>Currently, you can have only one root. AWS Organizations automatically creates it for you when you create an organization.</strong>
   * @see https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html
   * @private
   */
  private getRoot(): AwsCustomResource {
    return new AwsCustomResource(this, "RootCustomResource", {
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
      policy: AwsCustomResourcePolicy.fromSdkCalls({
        resources: AwsCustomResourcePolicy.ANY_RESOURCE,
      }),
    });
  }
}
