import { Aspects, Stack } from "aws-cdk-lib";
import { Capture, Template } from "aws-cdk-lib/assertions";
import { Account, Organization } from "../src";
import { AccountSequence } from "../src/account-sequence";

describe("AccountSequence", () => {
  it("Should chain accounts of all stacks", () => {
    // Given
    const stack = new Stack();
    new Organization(stack, "Organization", {});
    new Account(stack, "Account1", {
      email: "account1@pepperize.com",
      accountName: "test1",
    });
    new Account(stack, "Account2", {
      email: "account2@pepperize.com",
      accountName: "test2",
    });

    // When
    Aspects.of(stack).add(new AccountSequence());

    // Then
    const capture = new Capture();
    const template = Template.fromStack(stack);
    template.hasResource("Custom::Organizations_Account", {
      Properties: { AccountName: "test2" },
      DependsOn: capture,
    });

    expect(capture.asArray()).toEqual(expect.arrayContaining([expect.stringContaining("Account1")]));
  });
});
