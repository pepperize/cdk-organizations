import { Stack } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { Account, Organization } from "../src";

describe("Account", () => {
  it("Should match snapshot", () => {
    // Given
    const stack = new Stack(undefined, undefined, { env: { account: "123456789012", region: "us-east-1" } });
    const organization = new Organization(stack, "Organization", {});

    // When
    new Account(stack, "Account", {
      email: "info@pepperize.com",
      accountName: "test",
      parent: organization.root,
    });

    // Then
    const template = Template.fromStack(stack);
    expect(template).toMatchSnapshot();
  });

  it("Should have delegated administrator", () => {
    // Given
    const stack = new Stack();
    const organization = new Organization(stack, "Organization", {});
    const account = new Account(stack, "Account", {
      email: "info@pepperize.com",
      accountName: "test",
      parent: organization.root,
    });

    // When
    account.delegateAdministrator("service-abbreviation.amazonaws.com");

    // Then
    const template = Template.fromStack(stack);
    template.resourceCountIs("Custom::Organizations_DelegatedAdministrator", 1);
  });

  it("Should have delegated region administrator", () => {
    // Given
    const stack = new Stack();
    const organization = new Organization(stack, "Organization", {});
    const account = new Account(stack, "Account", {
      email: "info@pepperize.com",
      accountName: "test",
      parent: organization.root,
    });

    // When
    account.delegateAdministrator("service-abbreviation.amazonaws.com", "eu-west-1");

    // Then
    const template = Template.fromStack(stack);
    template.resourceCountIs("Custom::Organizations_DelegatedAdministrator", 1);
  });
});
