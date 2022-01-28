import { App, Stack } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { FeatureSet, Organization, PolicyType } from "../src";

describe("Organization", () => {
  it("Should match snapshot", () => {
    // Given
    const app = new App();
    const stack = new Stack(app, "Stack");

    // When
    new Organization(stack, "Organization", {
      featureSet: FeatureSet.ALL,
    });

    // Then
    const template = Template.fromStack(stack);
    expect(template).toMatchSnapshot();
  });

  it("Should have trusted service enabled", () => {
    // Given
    const stack = new Stack();
    const organization = new Organization(stack, "Organization", {});

    // When
    organization.enableAwsServiceAccess("ssm.amazonaws.com");
    organization.enableAwsServiceAccess("config-multiaccountsetup.amazonaws.com");

    // Then
    const template = Template.fromStack(stack);
    template.resourceCountIs("Custom::Organizations_EnableAwsServiceAccess", 2);
  });

  it("Should have policy type enabled", () => {
    // Given
    const stack = new Stack();
    const organization = new Organization(stack, "Organization", {});

    // When
    organization.enablePolicyType(PolicyType.SERVICE_CONTROL_POLICY);
    organization.enablePolicyType(PolicyType.TAG_POLICY);
    organization.enablePolicyType(PolicyType.BACKUP_POLICY);
    organization.enablePolicyType(PolicyType.AISERVICES_OPT_OUT_POLICY);

    // Then
    const template = Template.fromStack(stack);
    template.resourceCountIs("Custom::Organizations_EnablePolicyType", 4);
  });
});
