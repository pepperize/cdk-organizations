import { App, Stack } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { Organization, OrganizationalUnit } from "../src";

describe("OrganizationalUnit", () => {
  it("Should match snapshot", () => {
    // Given
    const app = new App();
    const stack = new Stack(app, "Stack");
    const organization = new Organization(stack, "Organization", {});

    // When
    new OrganizationalUnit(stack, "OrganizationalUnit", {
      organizationalUnitName: "TestOrganization",
      parent: organization.root,
    });

    // Then
    const template = Template.fromStack(stack);
    expect(template).toMatchSnapshot();
  });
});
