import { Construct } from "@aws-cdk/core";
import { IDependable } from "@aws-cdk/core/lib/dependency";
import { AwsCustomResource, AwsCustomResourcePolicy, PhysicalResourceId } from "@aws-cdk/custom-resources";
import { Policy } from "./policy";

export interface IPolicyAttachmentTarget extends IDependable {
  identifier(): string;
}

export interface PolicyAttachmentProps {
  /**
   * The root, OU, or account that you want to attach the policy to.
   */
  readonly target: IPolicyAttachmentTarget;
  /**
   * The policy that you want to attach to the target.
   */
  readonly policy: Policy;
}

/**
 * Attaches a policy to a root, an organizational unit (OU), or an individual account. How the policy affects accounts depends on the type of policy. Refer to the AWS Organizations User Guide for information about each policy type:
 */
export class PolicyAttachment extends Construct {
  public constructor(scope: Construct, id: string, props: PolicyAttachmentProps) {
    super(scope, id);

    const { target, policy } = props;
    this.node.addDependency(target, policy);

    new AwsCustomResource(this, "MoveAccountCustomResource", {
      onCreate: {
        service: "Organizations",
        action: "attachPolicy", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#attachPolicy-property
        region: "us-east-1",
        parameters: {
          PolicyId: policy.policyId,
          TargetId: target.identifier(),
        },
        physicalResourceId: PhysicalResourceId.of(`${policy.policyId}:${target.identifier()}`),
      },
      onDelete: {
        service: "Organizations",
        action: "detachPolicy", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#detachPolicy-property
        region: "us-east-1",
        parameters: {
          PolicyId: policy.policyId,
          TargetId: target.identifier(),
        },
        physicalResourceId: PhysicalResourceId.of(`${policy.policyId}:${target.identifier()}`),
      },
      policy: AwsCustomResourcePolicy.fromSdkCalls({
        resources: AwsCustomResourcePolicy.ANY_RESOURCE,
      }),
    });
  }
}
