import { Annotations, CustomResource, RemovalPolicy, TagManager, TagType } from "aws-cdk-lib";
import { Construct, IConstruct } from "constructs";
import { pascalCase } from "pascal-case";
import { AccountProvider } from "./account-provider";
import { DelegatedAdministrator } from "./delegated-administrator";
import { IChild, IParent } from "./parent";
import { IPolicyAttachmentTarget } from "./policy-attachment";
import { IResource } from "./resource";
import { ITaggableResource, TagResource } from "./tag-resource";
import { Validators } from "./validators";

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
  /**
   * Whether to import, if a duplicate account with same name and email already exists.
   *
   * @default true
   */
  readonly importOnDuplicate?: boolean;
  /**
   * If set to RemovalPolicy.DESTROY, the account will be moved to the root.
   *
   * @default RemovalPolicy.Retain
   */
  readonly removalPolicy?: RemovalPolicy;
}

export interface IAccount extends IPolicyAttachmentTarget, IChild, IConstruct, IResource {
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
export class Account extends Construct implements IAccount, ITaggableResource {
  public readonly accountId: string;
  public readonly accountArn: string;
  public readonly accountName: string;
  public readonly email: string;

  protected readonly resource: CustomResource;

  readonly tags = new TagManager(TagType.KEY_VALUE, "Custom::Organizations_Account");

  public constructor(scope: Construct, id: string, props: AccountProps) {
    super(scope, id);

    const { email, accountName, roleName, iamUserAccessToBilling, parent, importOnDuplicate, removalPolicy } = props;

    if (!Validators.of().email(email)) {
      Annotations.of(this).addError("The account's email must be of type string and between 6 and 64 characters long.");
    }

    if (!Validators.of().accountName(accountName)) {
      Annotations.of(this).addError("The account's name must be of type string and between 1 and 50 characters long.");
    }

    const createAccountProvider = AccountProvider.getOrCreate(this);
    const account = new CustomResource(this, "CreateAccount", {
      serviceToken: createAccountProvider.provider.serviceToken,
      resourceType: "Custom::Organizations_Account",
      properties: {
        Email: email,
        AccountName: accountName,
        RoleName: roleName ?? "OrganizationAccountAccessRole",
        IamUserAccessToBilling: iamUserAccessToBilling ?? IamUserAccessToBilling.ALLOW,
        ParentId: parent?.identifier(),
        ImportOnDuplicate: String(importOnDuplicate ?? true),
        RemovalPolicy: removalPolicy ?? RemovalPolicy.RETAIN,
      },
    });

    this.accountId = account.getAtt("AccountId").toString();
    this.accountArn = account.getAtt("AccountArn").toString();
    this.accountName = account.getAtt("AccountName").toString();
    this.email = account.getAtt("Email").toString();

    this.resource = account;

    const tagResource = new TagResource(this, "Tags", { resource: this });
    tagResource.node.addDependency(account);
  }

  identifier(): string {
    return this.accountId;
  }

  /**
   * Enables trusted access for the AWS service (trusted service) as <strong>Delegated Administrator</strong>, which performs tasks in your organization and its accounts on your behalf.
   * @param servicePrincipal The supported AWS service that you specify
   */
  public delegateAdministrator(servicePrincipal: string) {
    const delegatedAdministrator = new DelegatedAdministrator(this, `Delegate${pascalCase(servicePrincipal)}`, {
      account: this,
      servicePrincipal: servicePrincipal,
    });
    delegatedAdministrator.node.addDependency(this.resource);
  }
}
