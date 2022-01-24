import { Duration, NestedStack, NestedStackProps, Stack } from "aws-cdk-lib";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Function } from "aws-cdk-lib/aws-lambda";
import { Provider } from "aws-cdk-lib/custom-resources";
import { Construct } from "constructs";
import { OnEventHandlerFunction } from "./on-event-handler-function";
export interface TagResourceProviderProps extends NestedStackProps {}

/**
 * Creates a custom resource provider to asynchronously create Accounts in AWS organization. <strong>Account deletion is currently not supported!</strong>
 *
 * @see https://docs.aws.amazon.com/cdk/api/v1/docs/custom-resources-readme.html#provider-framework
 */
export class TagResourceProvider extends NestedStack {
  /**
   * Retrieve TagResourceProvider as stack singleton resource.
   *
   * @see https://github.com/aws/aws-cdk/issues/5023
   */
  public static getOrCreate(scope: Construct): TagResourceProvider {
    const stack = Stack.of(scope);
    const id = "cdk-organizations.TagResourceProvider";
    const existing = stack.node.tryFindChild(id);
    return (existing as TagResourceProvider) || new TagResourceProvider(scope, id, {});
  }
  /**
   * Creates an Account and returns the CreateAccountStatus ID on Create. Passes the PhysicalResourceId through.
   *
   * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#tagResource-property
   * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#untagResource-property
   */
  public readonly onEventHandler: Function;
  /**
   * The provider to create or update an Account.
   *
   * @see https://docs.aws.amazon.com/cdk/api/v1/docs/custom-resources-readme.html#handling-lifecycle-events-onevent
   */
  public readonly provider: Provider;

  constructor(scope: Construct, id: string, props: TagResourceProviderProps) {
    super(scope, id, props);

    this.onEventHandler = new OnEventHandlerFunction(this, "OnEventHandlerFunction", {
      timeout: Duration.minutes(10),
      initialPolicy: [
        new PolicyStatement({
          actions: ["organizations:ListTagsForResource", "organizations:TagResource", "organizations:UntagResource"],
          resources: ["*"],
        }),
      ],
    });

    this.provider = new Provider(this, "Provider", {
      onEventHandler: this.onEventHandler,
    });
  }
}
