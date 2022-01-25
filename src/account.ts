import { CustomResource, ITaggable, TagManager, TagType } from "aws-cdk-lib";
import { AwsCustomResource, AwsCustomResourcePolicy, PhysicalResourceId } from "aws-cdk-lib/custom-resources";
import { Construct, IConstruct } from "constructs";
import { AccountProvider } from "./account-provider";
import { DelegatedAdministrator } from "./delegated-administrator";
import { IChild, IParent, Parent } from "./parent";
import { IPolicyAttachmentTarget } from "./policy-attachment";
import { TagResource } from "./tag-resource";

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

export interface AccountBaseProps {
  readonly accountId?: string;
  readonly parent?: IParent;
  readonly email?: string;
  readonly accountName?: string;
  readonly roleName?: string;
  readonly iamUserAccessToBilling?: IamUserAccessToBilling;
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

export interface IAccount extends IChild, IConstruct {
  /**
   * If the account was created successfully, the unique identifier (ID) of the new account. Exactly 12 digits.
   */
  readonly accountId: string;
  /**
   * The Amazon Resource Name (ARN) of the account.
   */
  readonly accountArn: string;
  /**
   * The friendly name of the account.
   */
  readonly accountName: string;
  /**
   * The email address of the owner to assign to the new member account. This email address must not already be associated with another AWS account. You must use a valid email address to complete account creation. You can't access the root user of the account or remove an account that was created with an invalid email address.
   */
  readonly email: string;
}

/**
 * Creates or imports an AWS account that is automatically a member of the organization whose credentials made the request. AWS Organizations automatically copies the information from the management account to the new member account
 */
export abstract class AccountBase extends Construct implements IAccount, IPolicyAttachmentTarget, ITaggable {
  public readonly accountId: string;
  public readonly accountArn: string;
  public readonly accountName: string;
  public readonly email: string;

  protected readonly resource: AwsCustomResource;

  readonly tags = new TagManager(TagType.KEY_VALUE, "Custom::Organizations_CreateAccount");

  protected constructor(scope: Construct, id: string, props: AccountBaseProps) {
    super(scope, id);

    const { email, accountName, roleName, iamUserAccessToBilling, parent } = props;

    let accountId = props.accountId;
    let createAccount = undefined;
    if (!accountId) {
      const createAccountProvider = AccountProvider.getOrCreate(this);
      createAccount = new CustomResource(this, "CreateAccount", {
        serviceToken: createAccountProvider.provider.serviceToken,
        resourceType: "Custom::Organizations_CreateAccount",
        properties: {
          Email: email,
          AccountName: accountName,
          RoleName: roleName || "OrganizationAccountAccessRole",
          IamUserAccessToBilling: iamUserAccessToBilling || IamUserAccessToBilling.ALLOW,
        },
      });
      accountId = createAccount.getAtt("AccountId").toString();
    }

    const account = new AwsCustomResource(this, "DescribeAccount", {
      resourceType: "Custom::Organizations_Account",
      onCreate: {
        service: "Organizations",
        action: "describeAccount", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#describeAccount-property
        region: "us-east-1",
        physicalResourceId: PhysicalResourceId.of(accountId),
        parameters: {
          AccountId: accountId,
        },
      },
      onUpdate: {
        service: "Organizations",
        action: "describeAccount", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#describeAccount-property
        region: "us-east-1",
        physicalResourceId: PhysicalResourceId.of(accountId),
        parameters: {
          AccountId: accountId,
        },
      },
      onDelete: {
        service: "Organizations",
        action: "describeAccount", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#describeAccount-property
        region: "us-east-1",
        physicalResourceId: PhysicalResourceId.of(accountId),
        parameters: {
          AccountId: accountId,
        },
      },
      installLatestAwsSdk: false,
      policy: AwsCustomResourcePolicy.fromSdkCalls({
        resources: AwsCustomResourcePolicy.ANY_RESOURCE,
      }),
    });

    if (createAccount) {
      account.node.addDependency(createAccount);
    }

    this.resource = account;

    this.accountId = account.getResponseField("Account.Id");
    this.accountArn = account.getResponseField("Account.Arn");
    this.accountName = account.getResponseField("Account.Name");
    this.email = account.getResponseField("Account.Email");

    if (parent) {
      account.node.addDependency(parent);
      this.move(parent);
    }

    const tagResource = new TagResource(this, "Tags", { resource: this });
    tagResource.node.addDependency(account);
  }

  identifier(): string {
    return this.accountId;
  }

  protected currentParent(): IParent {
    const parent = Parent.fromChildId(this, "Parent", this.accountId);

    parent.node.addDependency(this.resource);

    return parent;
  }

  protected move(destinationParent: IParent): void {
    const sourceParent = this.currentParent();

    const move = new AwsCustomResource(this, "MoveAccount", {
      onUpdate: {
        service: "Organizations",
        action: "moveAccount", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#moveAccount-property
        region: "us-east-1",
        physicalResourceId: PhysicalResourceId.of(this.accountId),
        parameters: {
          AccountId: this.accountId,
          DestinationParentId: destinationParent.identifier(),
          SourceParentId: sourceParent.identifier(),
        },
        ignoreErrorCodesMatching: "DuplicateAccountException",
      },
      installLatestAwsSdk: false,
      policy: AwsCustomResourcePolicy.fromSdkCalls({
        resources: AwsCustomResourcePolicy.ANY_RESOURCE,
      }),
    });
    move.node.addDependency(destinationParent, sourceParent);
  }

  public delegateAdministrator(servicePrincipal: string) {
    const delegatedAdministrator = new DelegatedAdministrator(this, "DelegatedAdministrator", {
      account: this,
      servicePrincipal: servicePrincipal,
    });
    delegatedAdministrator.node.addDependency(this.resource);
  }
}

export interface AccountAttributes {
  readonly accountId: string;
  readonly parent?: IParent;
}

export class Account extends AccountBase {
  /**
   * Import an existing account from account id.
   */
  public static fromAccountId(scope: Construct, id: string, attrs: AccountAttributes): IAccount {
    class Import extends AccountBase {
      public constructor() {
        super(scope, id, { accountId: attrs.accountId, parent: attrs.parent });
      }
    }

    return new Import();
  }

  public constructor(scope: Construct, id: string, props: AccountProps) {
    super(scope, id, { ...props });
  }
}
