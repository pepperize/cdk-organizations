import { Annotations, TagManager, TagType } from "aws-cdk-lib";
import {
  AwsCustomResource,
  AwsCustomResourcePolicy,
  PhysicalResourceId,
  PhysicalResourceIdReference,
} from "aws-cdk-lib/custom-resources";
import { Construct, IConstruct } from "constructs";
import { ITaggableResource, TagResource } from "./tag-resource";
import { Validators } from "./validators";

/**
 * Organizations offers policy types in the following two broad categories:
 * <ol>
 *     <li>Authorization policies help you to centrally manage the security of the AWS accounts in your organization.</li>
 *     <li>Management policies enable you to centrally configure and manage AWS services and their features.</li>
 * </ol>
 *
 * @see https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies.html#orgs-policy-types
 */
export enum PolicyType {
  /**
   * Service control policies (SCPs) offer central control over the maximum available permissions for all of the accounts in your organization.
   */
  SERVICE_CONTROL_POLICY = "SERVICE_CONTROL_POLICY",
  /**
   * Tag policies help you standardize the tags attached to the AWS resources in your organization's accounts.
   */
  TAG_POLICY = "TAG_POLICY",
  /**
   * Backup policies help you centrally manage and apply backup plans to the AWS resources across your organization's accounts.
   */
  BACKUP_POLICY = "BACKUP_POLICY",
  /**
   * Artificial Intelligence (AI) services opt-out policies enable you to control data collection for AWS AI services for all of your organization's accounts.
   */
  AISERVICES_OPT_OUT_POLICY = "AISERVICES_OPT_OUT_POLICY",
}

export interface PolicyProps {
  /**
   * The policy text content to add to the new policy. The text that you supply must adhere to the rules of the policy type you specify in the Type parameter.
   */
  readonly content: string;
  /**
   * An optional description to assign to the policy.
   */
  readonly description?: string;
  /**
   * The friendly name to assign to the policy.
   */
  readonly policyName: string;
  /**
   * The type of policy to create. You can specify one of the following values:
   */
  readonly policyType: PolicyType;
}

/**
 * Policies in AWS Organizations enable you to apply additional types of management to the AWS accounts in your organization. <strong>You can use policies when all features are enabled in your organization.</strong>
 *
 * <strong>Before you can create and attach a policy to your organization, you must enable that policy type for use.</strong>
 *
 * @see https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies.html
 * @see FeatureSet
 */
export interface IPolicy extends IConstruct {
  /**
   * The unique identifier (ID) of the policy. The regex pattern for a policy ID string requires "p-" followed by from 8 to 128 lowercase or uppercase letters, digits, or the underscore character (_).
   */
  readonly policyId: string;
}

export class Policy extends Construct implements IPolicy, ITaggableResource {
  public readonly policyId: string;

  readonly tags = new TagManager(TagType.KEY_VALUE, "Custom::Organizations_Policy");

  public constructor(scope: Construct, id: string, props: PolicyProps) {
    super(scope, id);

    const { content, description, policyName, policyType } = props;

    if (!Validators.of().policyContent(content)) {
      Annotations.of(this).addError(
        "The text content of the policy must be valid and between 1 and 1,000,000 characters long."
      );
    }

    const policy = new AwsCustomResource(this, "PolicyCustomResource", {
      resourceType: "Custom::Organizations_Policy",
      onCreate: {
        service: "Organizations",
        action: "createPolicy", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#createPolicy-property
        region: "us-east-1",
        parameters: {
          Content: content,
          Description: description,
          Name: policyName,
          Type: policyType,
        },
        physicalResourceId: PhysicalResourceId.fromResponse("Policy.PolicySummary.Id"),
      },
      onUpdate: {
        service: "Organizations",
        action: "updatePolicy", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#updatePolicy-property
        region: "us-east-1",
        parameters: {
          Content: content,
          Description: description,
          Name: policyName,
          PolicyId: new PhysicalResourceIdReference(),
        },
        physicalResourceId: PhysicalResourceId.fromResponse("Policy.PolicySummary.Id"),
      },
      onDelete: {
        service: "Organizations",
        action: "deletePolicy", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#deletePolicy-property
        region: "us-east-1",
        parameters: {
          PolicyId: this.policyId,
        },
      },
      installLatestAwsSdk: false,
      policy: AwsCustomResourcePolicy.fromSdkCalls({ resources: AwsCustomResourcePolicy.ANY_RESOURCE }),
    });
    this.policyId = policy.getResponseField("Policy.PolicySummary.Id");

    const tagResource = new TagResource(this, "Tags", { resourceId: this.policyId, tags: this.tags.renderedTags });
    tagResource.node.addDependency(policy);
  }

  identifier(): string {
    return this.policyId;
  }
}
