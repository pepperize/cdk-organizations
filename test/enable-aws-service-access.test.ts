import { Stack } from "aws-cdk-lib";
import { EnableAwsServiceAccess } from "../src";
import "jest-cdk-snapshot";

describe("EnableAwsServiceAccess", () => {
  it("Should match snapshot", () => {
    // Given
    const stack = new Stack(undefined, undefined, { env: { account: "123456789012", region: "us-east-1" } });

    // When
    new EnableAwsServiceAccess(stack, "EnableAwsServiceAccess", {
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
