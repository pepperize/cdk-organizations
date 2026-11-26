/**
 * Resolves the region of the AWS Organizations endpoint for the partition in `CDK_AWS_PARTITION`.
 *
 * @see https://docs.aws.amazon.com/general/latest/gr/ao.html
 */
export const organizationsEndpointRegion = (): string => {
  switch (process.env.CDK_AWS_PARTITION) {
    case "aws-cn":
      return "cn-northwest-1";
    case "aws-us-gov":
      return "us-gov-west-1";
    default:
      return "us-east-1";
  }
};
