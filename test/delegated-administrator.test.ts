import { Stack } from "aws-cdk-lib";
import { Account, DelegatedAdministrator } from "../src";
import "jest-cdk-snapshot";

describe("DelegatedAdministrator", () => {
  it("Should match snapshot", () => {
    // Given
    const stack = new Stack(undefined, undefined, { env: { account: "123456789012", region: "us-east-1" } });
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
    expect(stack).toMatchCdkSnapshot({
      ignoreAssets: true,
      ignoreCurrentVersion: true,
      ignoreMetadata: true,
      ignoreTags: true,
    });
  });
});
