import { Template } from "aws-cdk-lib/assertions";
import { App, Aspects, Stack } from "aws-cdk-lib/core";
import { AwsSolutionsChecks } from "cdk-nag";
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
      content: '{\\"Version\\":\\"2012-10-17\\",\\"Statement\\":{\\"Effect\\":\\"Allow\\",\\"Action\\":\\"s3:*\\"}}',
      description: "Enables admins of attached accounts to delegate all S3 permissions",
      policyName: "AllowAllS3Actions",
      policyType: PolicyType.SERVICE_CONTROL_POLICY,
    });

    // When
    new PolicyAttachment(stack, "PolicyAttachment", {
      target: account,
      policy: policy,
    });

    // Then
    const template = Template.fromStack(stack);
    expect(template).toMatchSnapshot();
  });

  it("Should comply to best practices", () => {
    // Given
    const app = new App();
    const stack = new Stack(app, "Stack");
    const account = new Account(stack, "Account", {
      accountName: "Test Account",
      email: "info@pepperize.com",
    });
    const policy = new Policy(stack, "Policy", {
      content: '{\\"Version\\":\\"2012-10-17\\",\\"Statement\\":{\\"Effect\\":\\"Allow\\",\\"Action\\":\\"s3:*\\"}}',
      description: "Enables admins of attached accounts to delegate all S3 permissions",
      policyName: "AllowAllS3Actions",
      policyType: PolicyType.SERVICE_CONTROL_POLICY,
    });

    // When
    new PolicyAttachment(stack, "PolicyAttachment", {
      target: account,
      policy: policy,
    });

    // Then
    Aspects.of(app).add(new AwsSolutionsChecks({ verbose: true }));
  });
});
