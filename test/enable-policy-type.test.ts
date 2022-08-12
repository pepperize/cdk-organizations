import { Stack } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { EnablePolicyType, FeatureSet, Organization, PolicyType } from "../src";

describe("EnablePolicyType", () => {
  it("Should match snapshot", () => {
    // Given
    const stack = new Stack();
    const organization = new Organization(stack, "Organization", {
      featureSet: FeatureSet.ALL,
    });

    // When
    new EnablePolicyType(stack, "EnablePolicyType", {
      root: organization.root,
      policyType: PolicyType.SERVICE_CONTROL_POLICY,
    });

    // Then
    const template = Template.fromStack(stack);
    expect(template).toMatchSnapshot();
  });
});
