import { Stack } from "aws-cdk-lib";
import { Organization, OrganizationalUnit } from "../src";
import "jest-cdk-snapshot";

describe("OrganizationalUnit", () => {
  it("Should match snapshot", () => {
    // Given
    const stack = new Stack(undefined, undefined, { env: { account: "123456789012", region: "us-east-1" } });
    const organization = new Organization(stack, "Organization", {});

    // When
    new OrganizationalUnit(stack, "OrganizationalUnit", {
      organizationalUnitName: "TestOrganization",
      parent: organization.root,
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
