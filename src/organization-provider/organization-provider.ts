import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Function } from "aws-cdk-lib/aws-lambda";
import { Duration, NestedStack, NestedStackProps, Stack } from "aws-cdk-lib/core";
import { Provider } from "aws-cdk-lib/custom-resources";
import { Construct } from "constructs";
import { OnEventHandlerFunction } from "./on-event-handler-function";

export interface OrganizationProviderProps extends NestedStackProps {}

/**
 * Creates a custom resource provider to create the organization in AWS organization.
 *
 * <strong>If the organization already exists, it will be just returned.</strong>
 * <strong>Organization deletion is currently not supported!</strong>
 *
 * @see https://docs.aws.amazon.com/cdk/api/v1/docs/custom-resources-readme.html#provider-framework
 */
export class OrganizationProvider extends NestedStack {
  /**
   * Retrieve OrganizationProvider as stack singleton resource.
   *
   * @see https://github.com/aws/aws-cdk/issues/5023
   */
  public static getOrCreate(scope: Construct): OrganizationProvider {
    const stack = Stack.of(scope);
    const id = "@pepperize/cdk-organizations.OrganizationProvider";
    const existing = stack.node.tryFindChild(id);
    return (existing as OrganizationProvider) || new OrganizationProvider(scope, id, {});
  }
  /**
   * Creates an Organization and returns the result from describeOrganization.
   *
   * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#createOrganization-property
   * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#describeOrganization-property
   */
  public readonly onEventHandler: Function;
  /**
   * The provider to create or describe an organization.
   *
   * @see https://docs.aws.amazon.com/cdk/api/v1/docs/custom-resources-readme.html#asynchronous-providers-iscomplete
   */
  public readonly provider: Provider;

  constructor(scope: Construct, id: string, props: OrganizationProviderProps) {
    super(scope, id, props);

    this.onEventHandler = new OnEventHandlerFunction(this, "OnEventHandlerFunction", {
      timeout: Duration.minutes(10),
      initialPolicy: [
        new PolicyStatement({
          actions: ["organizations:CreateOrganization", "organizations:DescribeOrganization"],
          resources: ["*"],
        }),
      ],
    });

    this.provider = new Provider(this, "Provider", {
      onEventHandler: this.onEventHandler,
    });
  }
}
