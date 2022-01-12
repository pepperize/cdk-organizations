import { Template } from "@aws-cdk/assertions";
import { App, Aspects, Stack } from "@aws-cdk/core";
import { AwsSolutionsChecks } from "cdk-nag";
import { Organization, OrganizationalUnit } from "../src";

describe("Organization", () => {
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

  it("Should comply to best practices", () => {
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
    Aspects.of(app).add(new AwsSolutionsChecks({ verbose: true }));
  });
});
