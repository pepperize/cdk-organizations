import { Template } from "aws-cdk-lib/assertions";
import { App, Aspects, Stack } from "aws-cdk-lib";
import { AwsSolutionsChecks } from "cdk-nag";
import { EnableAwsServiceAccess } from "../src";

describe("EnableAwsServiceAccess", () => {
  it("Should match snapshot", () => {
    // Given
    const app = new App();
    const stack = new Stack(app, "Stack");

    // When
    new EnableAwsServiceAccess(stack, "EnableAwsServiceAccess", {
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

    // When
    new EnableAwsServiceAccess(stack, "EnableAwsServiceAccess", {
      servicePrincipal: "service-abbreviation.amazonaws.com",
    });

    // Then
    Aspects.of(app).add(new AwsSolutionsChecks({ verbose: true }));
  });
});
