import { App, Aspects, Stack } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { AwsSolutionsChecks } from "cdk-nag";
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

  it("Should have policy type eabled", () => {
    // Given
    const stack = new Stack();
    const organization = new Organization(stack, "Organization", {});

    // When
    organization.enablePolicyType(PolicyType.SERVICE_CONTROL_POLICY);

    // Then
    const template = Template.fromStack(stack);
    template.resourceCountIs("Custom::Organization_EnablePolicyType", 1);
  });

  it("Should comply to best practices", () => {
    // Given
    const app = new App();
    const stack = new Stack(app, "Stack");

    // When
    new Organization(stack, "Organization", {});

    // Then
    Aspects.of(app).add(new AwsSolutionsChecks({ verbose: true }));
  });
});
