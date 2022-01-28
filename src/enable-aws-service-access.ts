import { AwsCustomResource, AwsCustomResourcePolicy, PhysicalResourceId } from "aws-cdk-lib/custom-resources";
import { Construct } from "constructs";

export interface EnableAwsServiceAccessProps {
  /**
   * The service principal name of the AWS service for which you want to enable integration with your organization. This is typically in the form of a URL, such as service-abbreviation.amazonaws.com.
   */
  readonly servicePrincipal: string;
}

/**
 * Enables the integration of an AWS service (the service that is specified by ServicePrincipal) with AWS Organizations. When you enable integration, you allow the specified service to create a service-linked role in all the accounts in your organization. This allows the service to perform operations on your behalf in your organization and its accounts.
 *
 * <strong>This operation can be called only from the organization's management account and only if the organization has enabled all features.</strong>
 *
 * @see https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services.html#orgs_trusted_access_perms
 */
export class EnableAwsServiceAccess extends Construct {
  public constructor(scope: Construct, id: string, props: EnableAwsServiceAccessProps) {
    super(scope, id);

    const { servicePrincipal } = props;

    new AwsCustomResource(this, "EnableAwsServiceAccessCustomResource", {
      resourceType: "Custom::Organizations_EnableAwsServiceAccess",
      onCreate: {
        service: "Organizations",
        action: "enableAWSServiceAccess", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#enableAWSServiceAccess-property
        region: "us-east-1",
        physicalResourceId: PhysicalResourceId.of(`${servicePrincipal}`),
        parameters: {
          ServicePrincipal: servicePrincipal,
        },
      },
      onDelete: {
        service: "Organizations",
        action: "disableAWSServiceAccess", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#disableAWSServiceAccess-property
        region: "us-east-1",
        parameters: {
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
