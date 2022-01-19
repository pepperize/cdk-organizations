import { Template } from "aws-cdk-lib/assertions";
import { App, Aspects, Stack } from "aws-cdk-lib";
import { AwsSolutionsChecks } from "cdk-nag";
import { Account, DelegatedAdministrator } from "../src";

describe("DelegatedAdministrator", () => {
  it("Should match snapshot", () => {
    // Given
    const app = new App();
    const stack = new Stack(app, "Stack");
    const account = new Account(stack, "Account", {
      accountName: "TestAccount",
      email: "info@pepperize.com",
    });

    // When
    new DelegatedAdministrator(stack, "DelegatedAdministrator", {
      account: account,
      servicePrincipal: "service-abbreviation.amazonaws.com",
    });

    // Then
    const template = Template.fromStack(stack);
    expect(template).toMatchSnapshot();
  });

  it("Should comply to best practices", () => {
    // Given
    const app = new App();
    const stack = new Stack(app, "Stack");
    const account = new Account(stack, "Account", {
      accountName: "TestAccount",
      email: "info@pepperize.com",
    });

    // When
    new DelegatedAdministrator(stack, "DelegatedAdministrator", {
      account: account,
      servicePrincipal: "service-abbreviation.amazonaws.com",
    });

    // Then
    Aspects.of(app).add(new AwsSolutionsChecks({ verbose: true }));
  });
});
