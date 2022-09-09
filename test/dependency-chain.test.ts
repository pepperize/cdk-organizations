import { Aspects, Stack } from "aws-cdk-lib";
import { Capture, Template } from "aws-cdk-lib/assertions";
import { Account, Organization, OrganizationalUnit, Policy, PolicyAttachment, PolicyType } from "../src";
import { DependencyChain } from "../src/dependency-chain";

describe("DependencyChain", () => {
  it("Should chain accounts", () => {
    // Given
    const stack = new Stack();
    new Organization(stack, "Organization", {});
    const account1 = new Account(stack, "Account1", {
      email: "account1@pepperize.com",
      accountName: "test1",
    });
    new Account(stack, "Account2", {
      email: "account2@pepperize.com",
      accountName: "test2",
    });

    // When
    Aspects.of(stack).add(new DependencyChain());

    // Then
    const capture = new Capture();
    const template = Template.fromStack(stack);
    template.hasResource("Custom::Organizations_Account", {
      Properties: { AccountName: "test2" },
      DependsOn: capture,
    });

    expect(capture.asArray()).toEqual(expect.arrayContaining([expect.stringMatching(account1.node.id)]));
  });
  it("Should chain organizational units", () => {
    // Given
    const stack = new Stack();
    const organization = new Organization(stack, "Organization", {});
    const ou1 = new OrganizationalUnit(stack, "OU1", { parent: organization.root, organizationalUnitName: "test1" });
    new OrganizationalUnit(stack, "OU2", { parent: organization.root, organizationalUnitName: "test2" });

    // When
    Aspects.of(stack).add(new DependencyChain());

    // Then
    const capture = new Capture();
    const template = Template.fromStack(stack);
    template.hasResource("Custom::Organizations_OrganizationalUnitProvider", {
      Properties: { Name: "test2" },
      DependsOn: capture,
    });

    expect(capture.asArray()).toEqual(expect.arrayContaining([expect.stringMatching(ou1.node.id)]));
  });
  it("Should chain policy attachments", () => {
    // Given
    const stack = new Stack();
    const organization = new Organization(stack, "Organization", {});
    const policy1 = new Policy(stack, "Policy1", {
      content: '{\n"Version":"2012-10-17","Statement":{\n"Effect":"Allow","Action":"s3:*"\n}\n}',
      policyName: "AllowAllS3Actions",
      policyType: PolicyType.SERVICE_CONTROL_POLICY,
    });
    const policyAttachment1 = new PolicyAttachment(stack, "PolicyAttachment1", {
      target: organization.root,
      policy: policy1,
    });
    const policy2 = new Policy(stack, "Policy2", {
      content:
        '{\n"Version":"2012-10-17","Statement":{\n"Effect":"Deny","Action":"*:*","Resource":"*","Condition":\n{\n"StringNotEquals":{"aws:RequestedRegion":["us-east-1"]}\n}\n}\n}',
      policyName: "DenyAllNotUsEast1",
      policyType: PolicyType.SERVICE_CONTROL_POLICY,
    });
    const policyAttachment2 = new PolicyAttachment(stack, "PolicyAttachment2", {
      target: organization.root,
      policy: policy2,
    });

    // When
    Aspects.of(stack).add(new DependencyChain());

    // Then
    const capture = new Capture();
    const template = Template.fromStack(stack);
    template.resourceCountIs("Custom::Organizations_PolicyAttachment", 2);
    template.hasResource("Custom::Organizations_PolicyAttachment", {
      DependsOn: capture,
    });

    expect(capture.asArray()).toEqual(expect.arrayContaining([expect.stringMatching(policyAttachment1.node.id)]));
    expect(capture.asArray()).toEqual(expect.not.arrayContaining([expect.stringMatching(policyAttachment2.node.id)]));
  });
});
