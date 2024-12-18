import { Stack, Token } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import * as aws_iam from "aws-cdk-lib/aws-iam";
import { FeatureSet, Organization, PolicyType } from "../src";
import "jest-cdk-snapshot";

describe("Organization", () => {
  it("Should match snapshot", () => {
    // Given
    const stack = new Stack(undefined, undefined, { env: { account: "123456789012", region: "us-east-1" } });

    // When
    new Organization(stack, "Organization", {
      featureSet: FeatureSet.ALL,
    });

    // Then

    expect(stack).toMatchCdkSnapshot({
      ignoreAssets: true,
      ignoreCurrentVersion: true,
      ignoreMetadata: true,
      ignoreTags: true,
    });
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

  it("Should describe current organization", () => {
    // Given
    const stack = new Stack();

    // When
    const organization = Organization.of(stack, "Organization");

    // Then
    const template = Template.fromStack(stack);
    template.resourceCountIs("Custom::Organizations_ImportOrganization", 1);

    expect(Token.isUnresolved(organization.organizationId)).toBeTruthy();
    expect(organization.principal).toBeInstanceOf(aws_iam.OrganizationPrincipal);
  });
});
