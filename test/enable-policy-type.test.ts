import { App, Stack } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { EnablePolicyType, FeatureSet, Organization, PolicyType } from "../src";

describe("EnablePolicyType", () => {
  it("Should match snapshot", () => {
    // Given
    const app = new App();
    const stack = new Stack(app, "Stack");
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
