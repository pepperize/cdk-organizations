import { Template } from "@aws-cdk/assertions";
import { App, Aspects, Stack } from "@aws-cdk/core";
import { AwsSolutionsChecks } from "cdk-nag";
import { Account, IamUserAccessToBilling } from "../src";

describe("Organization", () => {
  it("Should match snapshot", () => {
    // Given
    const app = new App();
    const stack = new Stack(app, "Stack");

    // When
    new Account(stack, "Account", {
      email: "info@pepperize.com",
      accountName: "test",
      tags: {},
    });

    // Then
    const template = Template.fromStack(stack);
    expect(template).toMatchSnapshot();
  });

  it("Should comply to best practices", () => {
    // Given
    const app = new App();
    const stack = new Stack(app, "Stack");

    // When
    new Account(stack, "Account", {
      email: "info@pepperize.com",
      accountName: "test",
      roleName: "PreconfiguredRoleForNewMemberAccounts",
      iamUserAccessToBilling: IamUserAccessToBilling.DENY,
      tags: {},
    });

    // Then
    Aspects.of(app).add(new AwsSolutionsChecks({ verbose: true }));
  });
});
