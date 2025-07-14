import { Aspects, assertions } from "aws-cdk-lib";
import { Match } from "aws-cdk-lib/assertions";
// eslint-disable-next-line import/no-extraneous-dependencies
import { AwsSolutionsChecks, NagSuppressions } from "cdk-nag";
import { stack } from "../src/integ.default";

describe("cdk-nag", () => {
  it("Should match snapshot", () => {
    // Given
    NagSuppressions.addStackSuppressions(
      stack,
      [
        {
          id: "AwsSolutions-IAM4",
          reason: "Custom resource providers are using managed AWSLambdaBasicExecutionRole by default",
        },
        {
          id: "AwsSolutions-IAM5",
          reason: "Custom resource providers are meant to modify * resources in the organizations api",
        },
        { id: "AwsSolutions-L1", reason: "Custom resource providers bundled with the sdk" },
        {
          id: "AwsSolutions-SF1",
          reason: "The Step Functions is not required to log all events to CloudWatch.",
        },
        {
          id: "AwsSolutions-SF2",
          reason: "The Step Functions does not require X-Ray tracing.",
        },
      ],
      true
    );

    // When
    Aspects.of(stack).add(new AwsSolutionsChecks());
    const annotations = assertions.Annotations.fromStack(stack);

    // Then
    annotations.hasNoError("*", Match.anyValue());
    annotations.hasNoWarning("*", Match.anyValue());
  });
});
