import { App, Stack } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { Account, Policy, PolicyAttachment, PolicyType } from "../src";

describe("PolicyAttachment", () => {
  it("Should match snapshot", () => {
    // Given
    const app = new App();
    const stack = new Stack(app, "Stack");
    const account = new Account(stack, "Account", {
      accountName: "Test Account",
      email: "info@pepperize.com",
    });
    const policy = new Policy(stack, "Policy", {
      content: '{\n"Version":"2012-10-17","Statement":{\n"Effect":"Allow","Action":"s3:*"\n}\n}',
      description: "Enables admins of attached accounts to delegate all S3 permissions",
      policyName: "AllowAllS3Actions",
      policyType: PolicyType.SERVICE_CONTROL_POLICY,
    });

    // When
    const policyAttachment = new PolicyAttachment(stack, "PolicyAttachment", {
      target: account,
      policy: policy,
    });
    policyAttachment.node.addDependency(account, policy);

    // Then
    const template = Template.fromStack(stack);
    expect(template).toMatchSnapshot();
  });
});
