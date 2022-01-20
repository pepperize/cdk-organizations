import { AwsCustomResource, AwsCustomResourcePolicy, PhysicalResourceId } from "aws-cdk-lib/custom-resources";
import { Construct } from "constructs";
import { IAccount } from "./account";

export interface DelegatedAdministratorProps {
  /**
   * The member account in the organization to register as a delegated administrator.
   */
  readonly account: IAccount;
  /**
   * The service principal of the AWS service for which you want to make the member account a delegated administrator.
   */
  readonly servicePrincipal: string;
}

/**
 * Enables the specified member account to administer the Organizations features of the specified AWS service. It grants read-only access to AWS Organizations service data. The account still requires IAM permissions to access and administer the AWS service.
 *
 * You can run this action only for AWS services that support this feature. For a current list of services that support it, see the column Supports Delegated Administrator in the table at AWS Services that you can use with AWS Organizations in the [AWS Organizations User Guide](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services_list.html).
 *
 * @see https://docs.aws.amazon.com/accounts/latest/reference/using-orgs-delegated-admin.html
 */
export class DelegatedAdministrator extends Construct {
  public constructor(scope: Construct, id: string, props: DelegatedAdministratorProps) {
    super(scope, id);

    const { account, servicePrincipal } = props;
    this.node.addDependency(account);

    new AwsCustomResource(this, "DelegatedAdministratorCustomResource", {
      resourceType: "Custom::Organization_DelegatedAdministrator",
      onCreate: {
        service: "Organizations",
        action: "registerDelegatedAdministrator", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#registerDelegatedAdministrator-property
        region: "us-east-1",
        physicalResourceId: PhysicalResourceId.of(`${account.accountId}:${servicePrincipal}`),
        parameters: {
          AccountId: account.accountId,
          ServicePrincipal: servicePrincipal,
        },
      },
      onDelete: {
        service: "Organizations",
        action: "registerDelegatedAdministrator", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#deregisterDelegatedAdministrator-property
        region: "us-east-1",
        parameters: {
          AccountId: account.accountId,
          ServicePrincipal: servicePrincipal,
        },
      },
      installLatestAwsSdk: false,
      policy: AwsCustomResourcePolicy.fromSdkCalls({
        resources: AwsCustomResourcePolicy.ANY_RESOURCE,
      }),
    });
  }
}
