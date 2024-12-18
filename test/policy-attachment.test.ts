import { Stack } from "aws-cdk-lib";
import { Account, Policy, PolicyAttachment, PolicyType } from "../src";
import "jest-cdk-snapshot";

describe("PolicyAttachment", () => {
  it("Should match snapshot", () => {
    // Given
    const stack = new Stack(undefined, undefined, { env: { account: "123456789012", region: "us-east-1" } });
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

    expect(stack).toMatchCdkSnapshot({
      ignoreAssets: true,
      ignoreCurrentVersion: true,
      ignoreMetadata: true,
      ignoreTags: true,
    });
  });
});
