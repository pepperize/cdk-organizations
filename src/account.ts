import { CustomResource } from "aws-cdk-lib/core";
import { AwsCustomResource, AwsCustomResourcePolicy, PhysicalResourceId } from "aws-cdk-lib/custom-resources";
import { Construct } from "constructs";
import { AccountProvider } from "./account-provider";
import { IParent } from "./parent";
import { IPolicyAttachmentTarget } from "./policy-attachment";
/**
 * @see https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/control-access-billing.html#ControllingAccessWebsite-Activate
 */
export enum IamUserAccessToBilling {
  /**
   * If set to ALLOW, the new account enables IAM users to access account billing information if they have the required permissions.
   */
  ALLOW = "ALLOW",
  /**
   * If set to DENY, only the root user of the new account can access account billing information.
   */
  DENY = "DENY",
}

export interface AccountProps {
  /**
   * The email address of the owner to assign to the new member account. This email address must not already be associated with another AWS account. You must use a valid email address to complete account creation. You can't access the root user of the account or remove an account that was created with an invalid email address.
   */
  readonly email: string;
  /**
   * The friendly name of the member account.
   */
  readonly accountName: string;
  /**
   * The name of an IAM role that AWS Organizations automatically preconfigures in the new member account. This role trusts the management account, allowing users in the management account to assume the role, as permitted by the management account administrator. The role has administrator permissions in the new member account.
   *
   * If you don't specify this parameter, the role name defaults to OrganizationAccountAccessRole.
   */
  readonly roleName?: string;
  /**
   * If set to ALLOW , the new account enables IAM users to access account billing information if they have the required permissions. If set to DENY , only the root user of the new account can access account billing information.
   *
   * @default ALLOW
   */
  readonly iamUserAccessToBilling?: IamUserAccessToBilling;

  /**
   * The parent root or OU that you want to create the new Account in.
   */
  readonly parent?: IParent;
}

export class Account extends Construct implements IPolicyAttachmentTarget {
  /**
   * If the account was created successfully, the unique identifier (ID) of the new account. Exactly 12 digits.
   */
  public readonly accountId: string;

  public constructor(scope: Construct, id: string, props: AccountProps) {
    super(scope, id);

    const { email, accountName, roleName, iamUserAccessToBilling, parent } = props;

    const accountProvider = AccountProvider.getOrCreate(this);
    const account = new CustomResource(this, `AccountProvider-${accountName}`, {
      serviceToken: accountProvider.provider.serviceToken,
      resourceType: "Custom::Organization_Account",
      properties: {
        Email: email,
        AccountName: accountName,
        RoleName: roleName || "OrganizationAccountAccessRole",
        IamUserAccessToBilling: iamUserAccessToBilling || IamUserAccessToBilling.ALLOW,
      },
    });
    this.accountId = account.getAtt("AccountId").toString();

    if (parent) {
      const sourceParentId = this.currentParentId();
      const targetParentId = parent.identifier();
      this.move(targetParentId, sourceParentId);
    }
  }

  currentParentId(): string {
    const parent = new AwsCustomResource(this, "ListParentsCustomResource", {
      onCreate: {
        service: "Organizations",
        action: "listParents", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#listParents-property
        region: "us-east-1",
        physicalResourceId: PhysicalResourceId.fromResponse("Parents.0.Id"),
        parameters: {
          ChildId: this.accountId,
        },
      },
      onUpdate: {
        service: "Organizations",
        action: "listParents", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#listParents-property
        region: "us-east-1",
        physicalResourceId: PhysicalResourceId.fromResponse("Parents.0.Id"),
        parameters: {
          ChildId: this.accountId,
        },
      },
      onDelete: {
        service: "Organizations",
        action: "listParents", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#listParents-property
        region: "us-east-1",
        physicalResourceId: PhysicalResourceId.fromResponse("Parents.0.Id"),
        parameters: {
          ChildId: this.accountId,
        },
      },
      policy: AwsCustomResourcePolicy.fromSdkCalls({
        resources: AwsCustomResourcePolicy.ANY_RESOURCE,
      }),
    });

    return parent.getResponseField("Parents.0.Id");
  }

  move(destinationParentId: string, sourceParentId: string): void {
    if (destinationParentId == sourceParentId) {
      return;
    }

    new AwsCustomResource(this, "MoveAccountCustomResource", {
      onUpdate: {
        service: "Organizations",
        action: "moveAccount", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#moveAccount-property
        region: "us-east-1",
        physicalResourceId: PhysicalResourceId.of(this.accountId),
        parameters: {
          AccountId: this.accountId,
          DestinationParentId: destinationParentId,
          SourceParentId: sourceParentId,
        },
      },
      policy: AwsCustomResourcePolicy.fromSdkCalls({
        resources: AwsCustomResourcePolicy.ANY_RESOURCE,
      }),
    });
  }

  identifier(): string {
    return this.accountId;
  }
}
