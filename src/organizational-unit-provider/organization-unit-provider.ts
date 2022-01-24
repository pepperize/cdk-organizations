import { Duration, NestedStack, NestedStackProps, Stack } from "aws-cdk-lib";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Function } from "aws-cdk-lib/aws-lambda";
import { Provider } from "aws-cdk-lib/custom-resources";
import { Construct } from "constructs";
import { OnEventHandlerFunction } from "./on-event-handler-function";

export interface OrganizationalUnitProviderProps extends NestedStackProps {}

/**
 * Creates a custom resource provider to create the organizational unit in AWS organization.
 *
 * <ul>
 *   <li><strong>If the organizational unit already exists, it will be imported if `ImportOnDuplicate` is true.</strong>
 *   <li><strong>Only an emptied organizational unit can be deleted!</strong></li>
 * </ul>
 *
 * @see https://docs.aws.amazon.com/cdk/api/v1/docs/custom-resources-readme.html#provider-framework
 */
export class OrganizationalUnitProvider extends NestedStack {
  /**
   * Retrieve OrganizationalUnitProvider as stack singleton resource.
   *
   * @see https://github.com/aws/aws-cdk/issues/5023
   */
  public static getOrCreate(scope: Construct): OrganizationalUnitProvider {
    const stack = Stack.of(scope);
    const id = "cdk-organizations.OrganizationalUnitProvider";
    const existing = stack.node.tryFindChild(id);
    return (existing as OrganizationalUnitProvider) || new OrganizationalUnitProvider(scope, id, {});
  }
  /**
   * Creates an Organizational Unit and returns the result.
   *
   * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#createOrganization-property
   * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#describeOrganization-property
   */
  public readonly onEventHandler: Function;
  /**
   * The provider to create, update or delete an organizational unit.
   *
   * @see https://docs.aws.amazon.com/cdk/api/v1/docs/custom-resources-readme.html#asynchronous-providers-iscomplete
   */
  public readonly provider: Provider;

  constructor(scope: Construct, id: string, props: OrganizationalUnitProviderProps) {
    super(scope, id, props);

    this.onEventHandler = new OnEventHandlerFunction(this, "OnEventHandlerFunction", {
      timeout: Duration.minutes(10),
      initialPolicy: [
        new PolicyStatement({
          actions: [
            "organizations:CreateOrganizationalUnit",
            "organizations:DescribeOrganizationalUnit",
            "organizations:UpdateOrganizationalUnit",
            "organizations:DeleteOrganizationalUnit",
            "organizations:ListOrganizationalUnitsForParent",
          ],
          resources: ["*"],
        }),
        // permit the creation of service-linked role https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_org_create.html#create-org
        new PolicyStatement({
          actions: ["iam:CreateServiceLinkedRole"],
          resources: ["arn:aws:iam::*:role/*"],
        }),
      ],
    });

    this.provider = new Provider(this, "Provider", {
      onEventHandler: this.onEventHandler,
    });
  }
}
