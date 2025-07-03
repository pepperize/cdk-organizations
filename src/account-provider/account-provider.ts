import { Duration, NestedStack, NestedStackProps, Stack } from "aws-cdk-lib";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Function } from "aws-cdk-lib/aws-lambda";
import { LogLevel } from "aws-cdk-lib/aws-stepfunctions";
import { Provider } from "aws-cdk-lib/custom-resources";
import { Construct } from "constructs";
import { IsCompleteHandlerFunction } from "./is-complete-handler-function";
import { OnEventHandlerFunction } from "./on-event-handler-function";
export interface AccountProviderProps extends NestedStackProps {}

/**
 * Creates a custom resource provider to asynchronously create Accounts in AWS organization. <strong>Account deletion is currently not supported!</strong>
 *
 * @see https://docs.aws.amazon.com/cdk/api/v1/docs/custom-resources-readme.html#provider-framework
 */
export class AccountProvider extends NestedStack {
  /**
   * Retrieve AccountProvider as stack singleton resource.
   *
   * @see https://github.com/aws/aws-cdk/issues/5023
   */
  public static getOrCreate(scope: Construct): AccountProvider {
    const stack = Stack.of(scope);
    const id = "cdk-organizations.AccountProvider";
    const existing = stack.node.tryFindChild(id);
    return (existing as AccountProvider) || new AccountProvider(stack, id, {});
  }
  /**
   * Creates an Account and returns the CreateAccountStatus ID on Create. Passes the PhysicalResourceId on Update through. Fails on Delete.
   *
   * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#createAccount-property
   */
  public readonly onEventHandler: Function;
  /**
   * Describes the CreateAccountStatus and returns the completions status. Fails on Delete.
   *
   * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#describeCreateAccountStatus-property
   */
  public readonly isCompleteHandler: Function;
  /**
   * The asynchronuos provider to create or update an Account.
   *
   * @see https://docs.aws.amazon.com/cdk/api/v1/docs/custom-resources-readme.html#asynchronous-providers-iscomplete
   */
  public readonly provider: Provider;

  constructor(scope: Construct, id: string, props: AccountProviderProps) {
    super(scope, id, props);

    const organizationsRegion = process.env.CDK_AWS_PARTITION === "aws-cn" ? "cn-northwest-1" : "us-east-1";

    this.onEventHandler = new OnEventHandlerFunction(this, "OnEventHandlerFunction", {
      environment: {
        ORGANIZATIONS_ENDPOINT_REGION: organizationsRegion,
      },
      timeout: Duration.minutes(10),
      initialPolicy: [
        new PolicyStatement({
          actions: ["organizations:CreateAccount", "organizations:ListAccounts"],
          resources: ["*"],
        }),
      ],
    });

    this.isCompleteHandler = new IsCompleteHandlerFunction(this, "IsCompleteHandlerFunction", {
      environment: {
        ORGANIZATIONS_ENDPOINT_REGION: organizationsRegion,
      },
      timeout: Duration.minutes(1),
      initialPolicy: [
        new PolicyStatement({
          actions: [
            "organizations:DescribeCreateAccountStatus",
            "organizations:ListAccounts",
            "organizations:DescribeAccount",
            "organizations:ListParents",
            "organizations:ListRoots",
            "organizations:MoveAccount",
          ],
          resources: ["*"],
        }),
      ],
    });

    this.provider = new Provider(this, "Provider", {
      onEventHandler: this.onEventHandler,
      isCompleteHandler: this.isCompleteHandler,
      queryInterval: Duration.seconds(5),
      waiterStateMachineLogOptions: {
        level: LogLevel.ALL,
        includeExecutionData: false,
      },
    });
  }
}
