import { Stack } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { Policy, PolicyType } from "../src";
import "jest-cdk-snapshot";

describe("Policy", () => {
  it("Should match snapshot", () => {
    // Given
    const stack = new Stack(undefined, undefined, { env: { account: "123456789012", region: "us-east-1" } });

    // When
    new Policy(stack, "Policy", {
      content: '{\\"Version\\":\\"2012-10-17\\",\\"Statement\\":{\\"Effect\\":\\"Allow\\",\\"Action\\":\\"s3:*\\"}}',
      description: "Enables admins of attached accounts to delegate all S3 permissions",
      policyName: "AllowAllS3Actions",
      policyType: PolicyType.SERVICE_CONTROL_POLICY,
    });

    // Then

    expect(stack).toMatchCdkSnapshot({
      ignoreAssets: true,
      ignoreCurrentVersion: true,
      ignoreMetadata: true,
      ignoreTags: true,
    });
  });

  it("Should default to an empty description", () => {
    // Given
    const stack = new Stack(undefined, undefined, { env: { account: "123456789012", region: "us-east-1" } });

    // When
    new Policy(stack, "Policy", {
      content: '{"Version":"2012-10-17","Statement":{"Effect":"Deny","Action":"s3:*","Resource":"*"}}',
      policyName: "DenyS3",
      policyType: PolicyType.SERVICE_CONTROL_POLICY,
    });

    // Then
    const [policy] = Object.values(Template.fromStack(stack).findResources("Custom::Organizations_Policy"));
    expect(JSON.parse(policy.Properties.Create).parameters.Description).toBe("");
    expect(JSON.parse(policy.Properties.Update).parameters.Description).toBe("");
  });
});
