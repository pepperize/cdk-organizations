import { AwsCustomResource, AwsCustomResourcePolicy, PhysicalResourceId } from "@aws-cdk/custom-resources";
import { Construct } from "constructs";

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
 * <strong>For deletion of an organization you must previously remove all the member accounts, OUs, and policies from the organization!</strong>
 *
 * @see https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_org_create.html#create-org
 */
export class Organization extends Construct {
  public constructor(scope: Construct, id: string, props: OrganizationProps) {
    super(scope, id);

    const featureSet = props.featureSet || FeatureSet.ALL;

    new AwsCustomResource(this, "OrganizationCustomResource", {
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
  }
}
