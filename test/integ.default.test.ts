import { Template } from "aws-cdk-lib/assertions";
import { stack } from "../src/integ.default";
import "jest-cdk-snapshot";

describe("integ.default", () => {
  it("Should match snapshot", () => {
    // When
    expect(stack).toMatchCdkSnapshot({
      ignoreAssets: true,
      ignoreCurrentVersion: true,
      ignoreMetadata: true,
      ignoreTags: true,
    });
  });
  it("Should have 4 nested stacks", () => {
    // When
    const template = Template.fromStack(stack);
    template.resourceCountIs("AWS::CloudFormation::Stack", 4);
  });
});
