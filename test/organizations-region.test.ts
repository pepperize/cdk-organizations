import { organizationsEndpointRegion } from "../src/organizations-region";

describe("organizationsEndpointRegion", () => {
  const partition = process.env.CDK_AWS_PARTITION;

  afterEach(() => {
    process.env.CDK_AWS_PARTITION = partition;
  });

  it.each([
    [undefined, "us-east-1"],
    ["aws", "us-east-1"],
    ["aws-cn", "cn-northwest-1"],
    ["aws-us-gov", "us-gov-west-1"],
  ])("Should resolve the endpoint region of partition %s", (value, expected) => {
    // Given
    if (value === undefined) {
      delete process.env.CDK_AWS_PARTITION;
    } else {
      process.env.CDK_AWS_PARTITION = value;
    }

    // When
    const region = organizationsEndpointRegion();

    // Then
    expect(region).toBe(expected);
  });
});
