import { Aspects } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { AwsSolutionsChecks } from "cdk-nag";
import { app, stack } from "../src/integ.default";

describe("integ.default", () => {
  it("Should match snapshot", () => {
    // When
    const template = Template.fromStack(stack);
    expect(template).toMatchSnapshot();
  });
  it("Should comply to best practices", () => {
    // When
    Aspects.of(app).add(new AwsSolutionsChecks({ verbose: true }));
  });
  it("Should have 4 nested stacks", () => {
    // When
    const template = Template.fromStack(stack);
    template.resourceCountIs("AWS::CloudFormation::Stack", 4);
  });
});
