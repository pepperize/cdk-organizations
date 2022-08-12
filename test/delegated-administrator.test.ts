import { Stack } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { Account, DelegatedAdministrator } from "../src";

describe("DelegatedAdministrator", () => {
  it("Should match snapshot", () => {
    // Given
    const stack = new Stack();
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
});
