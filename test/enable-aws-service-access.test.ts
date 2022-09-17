import { Stack } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { EnableAwsServiceAccess } from "../src";

describe("EnableAwsServiceAccess", () => {
  it("Should match snapshot", () => {
    // Given
    const stack = new Stack(undefined, undefined, { env: { account: "123456789012", region: "us-east-1" } });

    // When
    new EnableAwsServiceAccess(stack, "EnableAwsServiceAccess", {
      servicePrincipal: "service-abbreviation.amazonaws.com",
    });

    // Then
    const template = Template.fromStack(stack);
    expect(template).toMatchSnapshot();
  });
});
