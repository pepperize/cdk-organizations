import { AwsCustomResource, AwsCustomResourcePolicy, PhysicalResourceId } from "aws-cdk-lib/custom-resources";
import { Construct } from "constructs";
import { Root } from "./organization";
import { PolicyType } from "./policy";

export interface EnablePolicyTypeProps {
  readonly root: Root;
  readonly policyType: PolicyType;
}

/**
 * Enables and disables Enables a policy type in a root. After you enable a policy type in a root, you can attach policies of that type to the root, any organizational unit (OU), or account in that root.
 *
 * @see https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_enable-disable.html
 */
export class EnablePolicyType extends Construct {
  public constructor(scope: Construct, id: string, props: EnablePolicyTypeProps) {
    super(scope, id);

    const { root, policyType } = props;

    new AwsCustomResource(this, "EnablePolicyTypeCustomResource", {
      onCreate: {
        service: "Organizations",
        action: "enablePolicyType", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#enablePolicyType-property
        region: "us-east-1",
        physicalResourceId: PhysicalResourceId.of(`${root.rootId}:${policyType}`),
        parameters: {
          RootId: root.rootId,
          PolicyType: policyType,
        },
      },
      onDelete: {
        service: "Organizations",
        action: "disablePolicyType", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#disablePolicyType-property
        region: "us-east-1",
        parameters: {
          RootId: root.rootId,
          PolicyType: policyType,
        },
      },
      policy: AwsCustomResourcePolicy.fromSdkCalls({
        resources: AwsCustomResourcePolicy.ANY_RESOURCE,
      }),
    });
  }
}
