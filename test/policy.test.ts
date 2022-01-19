import { Template } from "aws-cdk-lib/assertions";
import { App, Aspects, Stack } from "aws-cdk-lib";
import { AwsSolutionsChecks } from "cdk-nag";
import { Policy, PolicyType } from "../src";

describe("Policy", () => {
  it("Should match snapshot", () => {
    // Given
    const app = new App();
    const stack = new Stack(app, "Stack");

    // When
    new Policy(stack, "Policy", {
      content: '{\\"Version\\":\\"2012-10-17\\",\\"Statement\\":{\\"Effect\\":\\"Allow\\",\\"Action\\":\\"s3:*\\"}}',
      description: "Enables admins of attached accounts to delegate all S3 permissions",
      policyName: "AllowAllS3Actions",
      policyType: PolicyType.SERVICE_CONTROL_POLICY,
    });

    // Then
    const template = Template.fromStack(stack);
    expect(template).toMatchSnapshot();
  });

  it("Should comply to best practices", () => {
    // Given
    const app = new App();
    const stack = new Stack(app, "Stack");

    // When
    new Policy(stack, "Policy", {
      content: '{\\"Version\\":\\"2012-10-17\\",\\"Statement\\":{\\"Effect\\":\\"Allow\\",\\"Action\\":\\"s3:*\\"}}',
      description: "Enables admins of attached accounts to delegate all S3 permissions",
      policyName: "AllowAllS3Actions",
      policyType: PolicyType.SERVICE_CONTROL_POLICY,
    });

    // Then
    Aspects.of(app).add(new AwsSolutionsChecks({ verbose: true }));
  });
});
