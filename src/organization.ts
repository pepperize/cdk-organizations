import { Aspects, CustomResource, Names, Stack, TagManager, TagType } from "aws-cdk-lib";
import * as aws_iam from "aws-cdk-lib/aws-iam";
import * as custom_resources from "aws-cdk-lib/custom-resources";
import { Construct, IConstruct } from "constructs";
import { pascalCase } from "pascal-case";
import { EnableAwsServiceAccess } from "./enable-aws-service-access";
import { EnablePolicyType } from "./enable-policy-type";
import { OrganizationProvider } from "./organization-provider";
import { IParent } from "./parent";
import { IPolicy, PolicyType } from "./policy";
import { IPolicyAttachmentTarget, PolicyAttachment } from "./policy-attachment";
import { ITaggableResource, TagResource } from "./tag-resource";
import { DependencyChain } from "./dependency-chain";

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
   * The principal that represents this AWS Organization
   */
  readonly principal: aws_iam.IPrincipal;
}

export class Organization extends Construct implements IOrganization {
  /**
   * Describe the organization that the current account belongs to.
   *
   * @see https://docs.aws.amazon.com/organizations/latest/APIReference/API_DescribeOrganization.html
   */
  public static of(scope: Construct, id: string): IOrganization {
    class Import extends Construct implements IOrganization {
      readonly featureSet: FeatureSet;
      readonly managementAccountArn: string;
      readonly managementAccountEmail: string;
      readonly managementAccountId: string;
      readonly organizationArn: string;
      readonly organizationId: string;
      readonly principal: aws_iam.IPrincipal;

      public constructor() {
        super(scope, id);

        const resource = new custom_resources.AwsCustomResource(scope, "CustomResource", {
          resourceType: "Custom::Organizations_ImportOrganization",
          onCreate: {
            service: "Organizations",
            action: "describeOrganization", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#describeOrganization-property
            region: "us-east-1",
            parameters: {},
            physicalResourceId: custom_resources.PhysicalResourceId.fromResponse("Organization.Id"),
          },
          onUpdate: {
            service: "Organizations",
            action: "describeOrganization", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#describeOrganization-property
            region: "us-east-1",
            parameters: {},
            physicalResourceId: custom_resources.PhysicalResourceId.fromResponse("Organization.Id"),
          },
          installLatestAwsSdk: false,
          policy: custom_resources.AwsCustomResourcePolicy.fromSdkCalls({
            resources: custom_resources.AwsCustomResourcePolicy.ANY_RESOURCE,
          }),
        });

        this.featureSet = resource.getResponseField("Organization.FeatureSet") as FeatureSet;
        this.managementAccountArn = resource.getResponseField("Organization.MasterAccountArn");
        this.managementAccountEmail = resource.getResponseField("Organization.MasterAccountEmail");
        this.managementAccountId = resource.getResponseField("Organization.MasterAccountId");
        this.organizationArn = resource.getResponseField("Organization.Arn");
        this.organizationId = resource.getResponseField("Organization.Id");
        this.principal = new aws_iam.OrganizationPrincipal(this.organizationId);
      }
    }

    return new Import();
  }

  public readonly organizationId: string;
  public readonly organizationArn: string;
  public readonly featureSet: FeatureSet;
  public readonly managementAccountArn: string;
  public readonly managementAccountId: string;
  public readonly managementAccountEmail: string;
  readonly principal: aws_iam.IPrincipal;
  /**
   * The root of the current organization, which is automatically created.
   */
  readonly root: Root;

  private readonly resource: CustomResource;

  public constructor(scope: Construct, id: string, props: OrganizationProps = {}) {
    super(scope, id);

    const featureSet = props.featureSet || FeatureSet.ALL;

    const organizationProvider = OrganizationProvider.getOrCreate(this);
    this.resource = new CustomResource(this, "Organization", {
      serviceToken: organizationProvider.provider.serviceToken,
      resourceType: "Custom::Organizations_Organization",
      properties: {
        FeatureSet: featureSet,
      },
    });

    this.organizationId = this.resource.getAtt("Id").toString();
    this.organizationArn = this.resource.getAtt("Arn").toString();
    this.featureSet = this.resource.getAtt("FeatureSet").toString() as FeatureSet;
    this.managementAccountArn = this.resource.getAtt("MasterAccountArn").toString();
    this.managementAccountId = this.resource.getAtt("MasterAccountId").toString();
    this.managementAccountEmail = this.resource.getAtt("MasterAccountEmail").toString();
    this.principal = new aws_iam.OrganizationPrincipal(this.organizationId);

    this.root = new Root(this, "Root");
    this.root.node.addDependency(this.resource);
  }

  /**
   * Enables trusted access for a supported AWS service (trusted service), which performs tasks in your organization and its accounts on your behalf.
   * @param servicePrincipal The supported AWS service that you specify
   *
   * @see https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services_list.html
   */
  public enableAwsServiceAccess(servicePrincipal: string) {
    const enableAwsServiceAccess = new EnableAwsServiceAccess(this, `Enable${pascalCase(servicePrincipal)}`, {
      servicePrincipal: servicePrincipal,
    });
    enableAwsServiceAccess.node.addDependency(this.resource);
  }

  /**
   * Enables policy types in the following two broad categories: Authorization policies and Management policies.
   * @param policyType: the type of the policy that you specify
   *
   * @see https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies.html#orgs-policy-types
   */
  public enablePolicyType(policyType: PolicyType) {
    this.root.enablePolicyType(policyType);
  }

  /**
   * Attach a policy. Before you can attach the policy, you must enable that policy type for use. You can use policies when you have all features enabled.
   *
   * @see https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies.html
   */
  public attachPolicy(policy: IPolicy) {
    this.root.attachPolicy(policy);
  }
}

/**
 * The parent container for all the accounts for your organization. If you apply a policy to the root, it applies to all organizational units (OUs) and accounts in the organization.
 * <strong>Currently, you can have only one root. AWS Organizations automatically creates it for you when you create an organization.</strong>
 * @see https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html
 */
export class Root extends Construct implements IParent, IPolicyAttachmentTarget, ITaggableResource {
  /**
   * The unique identifier (ID) for the root. The regex pattern for a root ID string requires "r-" followed by from 4 to 32 lowercase letters or digits.
   */
  public readonly rootId: string;

  protected readonly resource: custom_resources.AwsCustomResource;

  private readonly scope: Construct;

  readonly tags = new TagManager(TagType.KEY_VALUE, "Custom::Organizations_Root");

  public constructor(scope: Construct, id: string) {
    super(scope, id);
    this.scope = scope;

    this.resource = new custom_resources.AwsCustomResource(this, "RootCustomResource", {
      resourceType: "Custom::Organizations_Root",
      onCreate: {
        service: "Organizations",
        action: "listRoots", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#listRoots-property
        region: "us-east-1",
        physicalResourceId: custom_resources.PhysicalResourceId.fromResponse("Roots.0.Id"),
      },
      onUpdate: {
        service: "Organizations",
        action: "listRoots", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#listRoots-property
        region: "us-east-1",
        physicalResourceId: custom_resources.PhysicalResourceId.fromResponse("Roots.0.Id"),
      },
      onDelete: {
        service: "Organizations",
        action: "listRoots", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#listRoots-property
        region: "us-east-1",
      },
      installLatestAwsSdk: false,
      policy: custom_resources.AwsCustomResourcePolicy.fromSdkCalls({
        resources: custom_resources.AwsCustomResourcePolicy.ANY_RESOURCE,
      }),
    });

    this.rootId = this.resource.getResponseField("Roots.0.Id"); // Returns first root id. It seems AWS Organizations doesn't contain multiple roots.

    const stack = Stack.of(this);
    Aspects.of(stack).add(new DependencyChain()); // sequentially chain organization resources which can't be deployed in parallel

    const tagResource = new TagResource(this, "Tags", { resourceId: this.rootId, tags: this.tags.renderedTags });
    tagResource.node.addDependency(this.resource);
  }

  public identifier(): string {
    return this.rootId;
  }

  /**
   * Attach a policy. Before you can attach the policy, you must enable that policy type for use. You can use policies when you have all features enabled.
   *
   * @see https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies.html
   */
  public attachPolicy(policy: IPolicy) {
    const policyAttachment = new PolicyAttachment(
      this.scope,
      `PolicyAttachment-${Names.nodeUniqueId(this.node)}-${Names.nodeUniqueId(policy.node)}`,
      {
        target: this,
        policy: policy,
      }
    );
    policyAttachment.node.addDependency(this.resource, policy);
  }

  /**
   * Enables and disables Enables a policy type. After you enable a policy type in a root, you can attach policies of that type to the root, any organizational unit (OU), or account in that root.
   *
   * @see https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_enable-disable.html
   */
  public enablePolicyType(policyType: PolicyType) {
    const enablePolicyType = new EnablePolicyType(this.scope, `Enable${pascalCase(policyType)}`, {
      root: this,
      policyType: policyType,
    });
    enablePolicyType.node.addDependency(this.resource);
  }
}
