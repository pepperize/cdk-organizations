import { Construct } from "@aws-cdk/core";
import { AwsCustomResource, AwsCustomResourcePolicy } from "@aws-cdk/custom-resources";

export enum IamUserAccessToBilling {
  ALLOW = "ALLOW",
  DENY = "DENY",
}

export interface AccountProps {
  /**
   * The email address of the owner to assign to the new member account. This email address must not already be associated with another AWS account. You must use a valid email address to complete account creation. You can't access the root user of the account or remove an account that was created with an invalid email address.
   */
  email: string;
  /**
   * The friendly name of the member account.
   */
  accountName: string;
  /**
   * The name of an IAM role that AWS Organizations automatically preconfigures in the new member account. This role trusts the management account, allowing users in the management account to assume the role, as permitted by the management account administrator. The role has administrator permissions in the new member account.
   *
   * If you don't specify this parameter, the role name defaults to OrganizationAccountAccessRole.
   */
  roleName?: string;
  /**
   * If set to ALLOW , the new account enables IAM users to access account billing information if they have the required permissions. If set to DENY , only the root user of the new account can access account billing information.
   *
   * @default ALLOW
   */
  iamUserAccessToBilling?: IamUserAccessToBilling;
  /**
   * A list of tags that you want to attach to the newly created account. For each tag in the list, you must specify both a tag key and a value. You can set the value to an empty string, but you can't set it to null.
   */
  tags: { [key: string]: string };
}

export class Account extends Construct {
  public constructor(scope: Construct, id: string, props: AccountProps) {
    super(scope, id);

    props;

    new AwsCustomResource(this, "AccCustomResource", {
      policy: AwsCustomResourcePolicy.fromSdkCalls({ resources: AwsCustomResourcePolicy.ANY_RESOURCE }),
    });
  }
}
