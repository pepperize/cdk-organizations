import { Stack } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { EnablePolicyType, FeatureSet, Organization, PolicyType } from "../src";
import "jest-cdk-snapshot";

describe("EnablePolicyType", () => {
  it("Should match snapshot", () => {
    // Given
    const stack = new Stack(undefined, undefined, { env: { account: "123456789012", region: "us-east-1" } });
    const organization = new Organization(stack, "Organization", {
      featureSet: FeatureSet.ALL,
    });

    // When
    new EnablePolicyType(stack, "EnablePolicyType", {
      root: organization.root,
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

  it("Should enable resource control policies", () => {
    // Given
    const stack = new Stack(undefined, undefined, { env: { account: "123456789012", region: "us-east-1" } });
    const organization = new Organization(stack, "Organization", {
      featureSet: FeatureSet.ALL,
    });

    // When
    organization.enablePolicyType(PolicyType.RESOURCE_CONTROL_POLICY);

    // Then
    const [policyType] = Object.values(
      Template.fromStack(stack).findResources("Custom::Organizations_EnablePolicyType"),
    );
    expect(JSON.stringify(policyType.Properties.Create)).toContain('\\"PolicyType\\":\\"RESOURCE_CONTROL_POLICY\\"');
  });
});
