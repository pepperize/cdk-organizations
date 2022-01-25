import { App, Stack } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
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
});
