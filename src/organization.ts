import { Construct } from "constructs";

/**
 * @see https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html#feature-set
 */
export enum FeatureSet {
  CONSOLIDATED_BILLING = "CONSOLIDATED_BILLING",
  ALL = "ALL",
}

export interface OrganizationProps {
  /**
   * Specifies the feature set supported by the new organization. Each feature set supports different levels of functionality.
   */
  featureSet?: FeatureSet;
}

/**
 * Creates an organization to consolidate your AWS accounts so that you can administer them as a single unit. An organization has one management account along with zero or more member accounts. You can organize the accounts in a hierarchical, tree-like structure with a root at the top and organizational units nested under the root. Each account can be directly in the root, or placed in one of the OUs in the hierarchy. An organization has the functionality that is determined by the feature set that you enable.
 *
 * @see https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_org_create.html#create-org
 */
export class Organization extends Construct {
  public constructor(scope: Construct, id: string, props: OrganizationProps) {
    super(scope, id);

    props;
  }
}
