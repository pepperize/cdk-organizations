import { Template } from "aws-cdk-lib/assertions";
import { stack } from "../src/integ.default";

describe("integ.default", () => {
  it("Should match snapshot", () => {
    // When
    const template = Template.fromStack(stack);
    expect(template).toMatchSnapshot();
  });
  it("Should have 4 nested stacks", () => {
    // When
    const template = Template.fromStack(stack);
    template.resourceCountIs("AWS::CloudFormation::Stack", 4);
  });
});
