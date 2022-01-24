import { Aspects } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { AwsSolutionsChecks } from "cdk-nag";
import { app, stack } from "../src/integ.default";

describe("integ.default", () => {
  it("Should match snapshot", () => {
    // When
    const t = Template.fromStack(stack);
    expect(t).toMatchSnapshot();
  });
  it("Should comply to best practices", () => {
    // When
    Aspects.of(app).add(new AwsSolutionsChecks({ verbose: true }));
  });
});
