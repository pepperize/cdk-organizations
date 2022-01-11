# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="constructs"></a>

### Account <a name="@pepperize/cdk-organizations.Account" id="pepperizecdkorganizationsaccount"></a>

#### Initializers <a name="@pepperize/cdk-organizations.Account.Initializer" id="pepperizecdkorganizationsaccountinitializer"></a>

```typescript
import { Account } from '@pepperize/cdk-organizations'

new Account(scope: Construct, id: string, props: AccountProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`scope`](#pepperizecdkorganizationsaccountparameterscope)<span title="Required">*</span> | [`constructs.Construct`](#constructs.Construct) | *No description.* |
| [`id`](#pepperizecdkorganizationsaccountparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`props`](#pepperizecdkorganizationsaccountparameterprops)<span title="Required">*</span> | [`@pepperize/cdk-organizations.AccountProps`](#@pepperize/cdk-organizations.AccountProps) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Account.parameter.scope" id="pepperizecdkorganizationsaccountparameterscope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

##### `id`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Account.parameter.id" id="pepperizecdkorganizationsaccountparameterid"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Account.parameter.props" id="pepperizecdkorganizationsaccountparameterprops"></a>

- *Type:* [`@pepperize/cdk-organizations.AccountProps`](#@pepperize/cdk-organizations.AccountProps)

---





### Organization <a name="@pepperize/cdk-organizations.Organization" id="pepperizecdkorganizationsorganization"></a>

Creates an organization to consolidate your AWS accounts so that you can administer them as a single unit.

An organization has one management account along with zero or more member accounts. You can organize the accounts in a hierarchical, tree-like structure with a root at the top and organizational units nested under the root. Each account can be directly in the root, or placed in one of the OUs in the hierarchy. An organization has the functionality that is determined by the feature set that you enable.  <strong>For deletion of an organization you must previously remove all the member accounts, OUs, and policies from the organization!</strong>

> https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_org_create.html#create-org

#### Initializers <a name="@pepperize/cdk-organizations.Organization.Initializer" id="pepperizecdkorganizationsorganizationinitializer"></a>

```typescript
import { Organization } from '@pepperize/cdk-organizations'

new Organization(scope: Construct, id: string, props: OrganizationProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`scope`](#pepperizecdkorganizationsorganizationparameterscope)<span title="Required">*</span> | [`constructs.Construct`](#constructs.Construct) | *No description.* |
| [`id`](#pepperizecdkorganizationsorganizationparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`props`](#pepperizecdkorganizationsorganizationparameterprops)<span title="Required">*</span> | [`@pepperize/cdk-organizations.OrganizationProps`](#@pepperize/cdk-organizations.OrganizationProps) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Organization.parameter.scope" id="pepperizecdkorganizationsorganizationparameterscope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

##### `id`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Organization.parameter.id" id="pepperizecdkorganizationsorganizationparameterid"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Organization.parameter.props" id="pepperizecdkorganizationsorganizationparameterprops"></a>

- *Type:* [`@pepperize/cdk-organizations.OrganizationProps`](#@pepperize/cdk-organizations.OrganizationProps)

---





### OrganizationalUnit <a name="@pepperize/cdk-organizations.OrganizationalUnit" id="pepperizecdkorganizationsorganizationalunit"></a>

A container for accounts within a root.

An OU also can contain other OUs, enabling you to create a hierarchy that resembles an upside-down tree, with a root at the top and branches of OUs that reach down, ending in accounts that are the leaves of the tree. When you attach a policy to one of the nodes in the hierarchy, it flows down and affects all the branches (OUs) and leaves (accounts) beneath it. An OU can have exactly one parent, and currently each account can be a member of exactly one OU.  <strong>You must first move all accounts out of the OU and any child OUs, and then you can delete the child OUs.</strong>

#### Initializers <a name="@pepperize/cdk-organizations.OrganizationalUnit.Initializer" id="pepperizecdkorganizationsorganizationalunitinitializer"></a>

```typescript
import { OrganizationalUnit } from '@pepperize/cdk-organizations'

new OrganizationalUnit(scope: Construct, id: string, props: OrganizationalUnitProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`scope`](#pepperizecdkorganizationsorganizationalunitparameterscope)<span title="Required">*</span> | [`constructs.Construct`](#constructs.Construct) | *No description.* |
| [`id`](#pepperizecdkorganizationsorganizationalunitparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`props`](#pepperizecdkorganizationsorganizationalunitparameterprops)<span title="Required">*</span> | [`@pepperize/cdk-organizations.OrganizationalUnitProps`](#@pepperize/cdk-organizations.OrganizationalUnitProps) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="@pepperize/cdk-organizations.OrganizationalUnit.parameter.scope" id="pepperizecdkorganizationsorganizationalunitparameterscope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

##### `id`<sup>Required</sup> <a name="@pepperize/cdk-organizations.OrganizationalUnit.parameter.id" id="pepperizecdkorganizationsorganizationalunitparameterid"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@pepperize/cdk-organizations.OrganizationalUnit.parameter.props" id="pepperizecdkorganizationsorganizationalunitparameterprops"></a>

- *Type:* [`@pepperize/cdk-organizations.OrganizationalUnitProps`](#@pepperize/cdk-organizations.OrganizationalUnitProps)

---





### Policy <a name="@pepperize/cdk-organizations.Policy" id="pepperizecdkorganizationspolicy"></a>

Policies in AWS Organizations enable you to apply additional types of management to the AWS accounts in your organization.

<strong>You can use policies when all features are enabled in your organization.</strong>

> FeatureSet

#### Initializers <a name="@pepperize/cdk-organizations.Policy.Initializer" id="pepperizecdkorganizationspolicyinitializer"></a>

```typescript
import { Policy } from '@pepperize/cdk-organizations'

new Policy(scope: Construct, id: string, props: PolicyProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`scope`](#pepperizecdkorganizationspolicyparameterscope)<span title="Required">*</span> | [`constructs.Construct`](#constructs.Construct) | *No description.* |
| [`id`](#pepperizecdkorganizationspolicyparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`props`](#pepperizecdkorganizationspolicyparameterprops)<span title="Required">*</span> | [`@pepperize/cdk-organizations.PolicyProps`](#@pepperize/cdk-organizations.PolicyProps) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Policy.parameter.scope" id="pepperizecdkorganizationspolicyparameterscope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

##### `id`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Policy.parameter.id" id="pepperizecdkorganizationspolicyparameterid"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Policy.parameter.props" id="pepperizecdkorganizationspolicyparameterprops"></a>

- *Type:* [`@pepperize/cdk-organizations.PolicyProps`](#@pepperize/cdk-organizations.PolicyProps)

---





## Structs <a name="Structs" id="structs"></a>

### AccountProps <a name="@pepperize/cdk-organizations.AccountProps" id="pepperizecdkorganizationsaccountprops"></a>

#### Initializer <a name="[object Object].Initializer" id="object-objectinitializer"></a>

```typescript
import { AccountProps } from '@pepperize/cdk-organizations'

const accountProps: AccountProps = { ... }
```

#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`accountName`](#pepperizecdkorganizationsaccountpropspropertyaccountname)<span title="Required">*</span> | `string` | The friendly name of the member account. |
| [`email`](#pepperizecdkorganizationsaccountpropspropertyemail)<span title="Required">*</span> | `string` | The email address of the owner to assign to the new member account. |
| [`tags`](#pepperizecdkorganizationsaccountpropspropertytags)<span title="Required">*</span> | {[ key: string ]: `string`} | A list of tags that you want to attach to the newly created account. |
| [`iamUserAccessToBilling`](#pepperizecdkorganizationsaccountpropspropertyiamuseraccesstobilling) | [`@pepperize/cdk-organizations.IamUserAccessToBilling`](#@pepperize/cdk-organizations.IamUserAccessToBilling) | If set to ALLOW , the new account enables IAM users to access account billing information if they have the required permissions. |
| [`roleName`](#pepperizecdkorganizationsaccountpropspropertyrolename) | `string` | The name of an IAM role that AWS Organizations automatically preconfigures in the new member account. |

---

##### `accountName`<sup>Required</sup> <a name="@pepperize/cdk-organizations.AccountProps.property.accountName" id="pepperizecdkorganizationsaccountpropspropertyaccountname"></a>

```typescript
public readonly accountName: string;
```

- *Type:* `string`

The friendly name of the member account.

---

##### `email`<sup>Required</sup> <a name="@pepperize/cdk-organizations.AccountProps.property.email" id="pepperizecdkorganizationsaccountpropspropertyemail"></a>

```typescript
public readonly email: string;
```

- *Type:* `string`

The email address of the owner to assign to the new member account.

This email address must not already be associated with another AWS account. You must use a valid email address to complete account creation. You can't access the root user of the account or remove an account that was created with an invalid email address.

---

##### `tags`<sup>Required</sup> <a name="@pepperize/cdk-organizations.AccountProps.property.tags" id="pepperizecdkorganizationsaccountpropspropertytags"></a>

```typescript
public readonly tags: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: `string`}

A list of tags that you want to attach to the newly created account.

For each tag in the list, you must specify both a tag key and a value. You can set the value to an empty string, but you can't set it to null.

---

##### `iamUserAccessToBilling`<sup>Optional</sup> <a name="@pepperize/cdk-organizations.AccountProps.property.iamUserAccessToBilling" id="pepperizecdkorganizationsaccountpropspropertyiamuseraccesstobilling"></a>

```typescript
public readonly iamUserAccessToBilling: IamUserAccessToBilling;
```

- *Type:* [`@pepperize/cdk-organizations.IamUserAccessToBilling`](#@pepperize/cdk-organizations.IamUserAccessToBilling)
- *Default:* ALLOW

If set to ALLOW , the new account enables IAM users to access account billing information if they have the required permissions.

If set to DENY , only the root user of the new account can access account billing information.

---

##### `roleName`<sup>Optional</sup> <a name="@pepperize/cdk-organizations.AccountProps.property.roleName" id="pepperizecdkorganizationsaccountpropspropertyrolename"></a>

```typescript
public readonly roleName: string;
```

- *Type:* `string`

The name of an IAM role that AWS Organizations automatically preconfigures in the new member account.

This role trusts the management account, allowing users in the management account to assume the role, as permitted by the management account administrator. The role has administrator permissions in the new member account.  If you don't specify this parameter, the role name defaults to OrganizationAccountAccessRole.

---

### OrganizationalUnitProps <a name="@pepperize/cdk-organizations.OrganizationalUnitProps" id="pepperizecdkorganizationsorganizationalunitprops"></a>

#### Initializer <a name="[object Object].Initializer" id="object-objectinitializer"></a>

```typescript
import { OrganizationalUnitProps } from '@pepperize/cdk-organizations'

const organizationalUnitProps: OrganizationalUnitProps = { ... }
```

#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`organizationalUnitName`](#pepperizecdkorganizationsorganizationalunitpropspropertyorganizationalunitname)<span title="Required">*</span> | `string` | The friendly name to assign to the new OU. |
| [`parentId`](#pepperizecdkorganizationsorganizationalunitpropspropertyparentid)<span title="Required">*</span> | `string` | The unique identifier (ID) of the parent root or OU that you want to create the new OU in. |
| [`tags`](#pepperizecdkorganizationsorganizationalunitpropspropertytags)<span title="Required">*</span> | {[ key: string ]: `string`} | A list of tags that you want to attach to the newly created organizational unit. |

---

##### `organizationalUnitName`<sup>Required</sup> <a name="@pepperize/cdk-organizations.OrganizationalUnitProps.property.organizationalUnitName" id="pepperizecdkorganizationsorganizationalunitpropspropertyorganizationalunitname"></a>

```typescript
public readonly organizationalUnitName: string;
```

- *Type:* `string`

The friendly name to assign to the new OU.

---

##### `parentId`<sup>Required</sup> <a name="@pepperize/cdk-organizations.OrganizationalUnitProps.property.parentId" id="pepperizecdkorganizationsorganizationalunitpropspropertyparentid"></a>

```typescript
public readonly parentId: string;
```

- *Type:* `string`

The unique identifier (ID) of the parent root or OU that you want to create the new OU in.

---

##### `tags`<sup>Required</sup> <a name="@pepperize/cdk-organizations.OrganizationalUnitProps.property.tags" id="pepperizecdkorganizationsorganizationalunitpropspropertytags"></a>

```typescript
public readonly tags: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: `string`}

A list of tags that you want to attach to the newly created organizational unit.

For each tag in the list, you must specify both a tag key and a value. You can set the value to an empty string, but you can't set it to null.

---

### OrganizationProps <a name="@pepperize/cdk-organizations.OrganizationProps" id="pepperizecdkorganizationsorganizationprops"></a>

#### Initializer <a name="[object Object].Initializer" id="object-objectinitializer"></a>

```typescript
import { OrganizationProps } from '@pepperize/cdk-organizations'

const organizationProps: OrganizationProps = { ... }
```

#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`featureSet`](#pepperizecdkorganizationsorganizationpropspropertyfeatureset) | [`@pepperize/cdk-organizations.FeatureSet`](#@pepperize/cdk-organizations.FeatureSet) | Enabling features in your organization. |

---

##### `featureSet`<sup>Optional</sup> <a name="@pepperize/cdk-organizations.OrganizationProps.property.featureSet" id="pepperizecdkorganizationsorganizationpropspropertyfeatureset"></a>

```typescript
public readonly featureSet: FeatureSet;
```

- *Type:* [`@pepperize/cdk-organizations.FeatureSet`](#@pepperize/cdk-organizations.FeatureSet)
- *Default:* ALL

Enabling features in your organization.

> https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_org_support-all-features.html

---

### PolicyProps <a name="@pepperize/cdk-organizations.PolicyProps" id="pepperizecdkorganizationspolicyprops"></a>

#### Initializer <a name="[object Object].Initializer" id="object-objectinitializer"></a>

```typescript
import { PolicyProps } from '@pepperize/cdk-organizations'

const policyProps: PolicyProps = { ... }
```

#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`content`](#pepperizecdkorganizationspolicypropspropertycontent)<span title="Required">*</span> | `string` | The policy text content to add to the new policy. |
| [`policyName`](#pepperizecdkorganizationspolicypropspropertypolicyname)<span title="Required">*</span> | `string` | The friendly name to assign to the policy. |
| [`policyType`](#pepperizecdkorganizationspolicypropspropertypolicytype)<span title="Required">*</span> | [`@pepperize/cdk-organizations.PolicyType`](#@pepperize/cdk-organizations.PolicyType) | The type of policy to create. |
| [`tags`](#pepperizecdkorganizationspolicypropspropertytags)<span title="Required">*</span> | {[ key: string ]: `string`} | A list of tags that you want to attach to the newly created policy. |
| [`description`](#pepperizecdkorganizationspolicypropspropertydescription) | `string` | An optional description to assign to the policy. |

---

##### `content`<sup>Required</sup> <a name="@pepperize/cdk-organizations.PolicyProps.property.content" id="pepperizecdkorganizationspolicypropspropertycontent"></a>

```typescript
public readonly content: string;
```

- *Type:* `string`

The policy text content to add to the new policy.

The text that you supply must adhere to the rules of the policy type you specify in the Type parameter.

---

##### `policyName`<sup>Required</sup> <a name="@pepperize/cdk-organizations.PolicyProps.property.policyName" id="pepperizecdkorganizationspolicypropspropertypolicyname"></a>

```typescript
public readonly policyName: string;
```

- *Type:* `string`

The friendly name to assign to the policy.

---

##### `policyType`<sup>Required</sup> <a name="@pepperize/cdk-organizations.PolicyProps.property.policyType" id="pepperizecdkorganizationspolicypropspropertypolicytype"></a>

```typescript
public readonly policyType: PolicyType;
```

- *Type:* [`@pepperize/cdk-organizations.PolicyType`](#@pepperize/cdk-organizations.PolicyType)

The type of policy to create.

You can specify one of the following values:

---

##### `tags`<sup>Required</sup> <a name="@pepperize/cdk-organizations.PolicyProps.property.tags" id="pepperizecdkorganizationspolicypropspropertytags"></a>

```typescript
public readonly tags: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: `string`}

A list of tags that you want to attach to the newly created policy.

For each tag in the list, you must specify both a tag key and a value. You can set the value to an empty string, but you can't set it to null.

---

##### `description`<sup>Optional</sup> <a name="@pepperize/cdk-organizations.PolicyProps.property.description" id="pepperizecdkorganizationspolicypropspropertydescription"></a>

```typescript
public readonly description: string;
```

- *Type:* `string`

An optional description to assign to the policy.

---



## Enums <a name="Enums" id="enums"></a>

### FeatureSet <a name="FeatureSet" id="featureset"></a>

| **Name** | **Description** |
| --- | --- |
| [`CONSOLIDATED_BILLING`](#pepperizecdkorganizationsfeaturesetconsolidatedbilling) | All member accounts have their bills consolidated to and paid by the management account. |
| [`ALL`](#pepperizecdkorganizationsfeaturesetall) | In addition to all the features supported by the consolidated billing feature set, the management account can also apply any policy type to any member account in the organization. |

---

Specifies the feature set supported by the new organization.

Each feature set supports different levels of functionality.

> https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html#feature-set

#### `CONSOLIDATED_BILLING` <a name="@pepperize/cdk-organizations.FeatureSet.CONSOLIDATED_BILLING" id="pepperizecdkorganizationsfeaturesetconsolidatedbilling"></a>

All member accounts have their bills consolidated to and paid by the management account.

For more information, see [Consolidated billing]{@link https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html#feature-set-cb-only} in the AWS Organizations User Guide. The consolidated billing feature subset isn’t available for organizations in the AWS GovCloud (US) Region.

---


#### `ALL` <a name="@pepperize/cdk-organizations.FeatureSet.ALL" id="pepperizecdkorganizationsfeaturesetall"></a>

In addition to all the features supported by the consolidated billing feature set, the management account can also apply any policy type to any member account in the organization.

For more information, see [All features]{@link https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html#feature-set-all} in the AWS Organizations User Guide.

---


### IamUserAccessToBilling <a name="IamUserAccessToBilling" id="iamuseraccesstobilling"></a>

| **Name** | **Description** |
| --- | --- |
| [`ALLOW`](#pepperizecdkorganizationsiamuseraccesstobillingallow) | *No description.* |
| [`DENY`](#pepperizecdkorganizationsiamuseraccesstobillingdeny) | *No description.* |

---

#### `ALLOW` <a name="@pepperize/cdk-organizations.IamUserAccessToBilling.ALLOW" id="pepperizecdkorganizationsiamuseraccesstobillingallow"></a>

---


#### `DENY` <a name="@pepperize/cdk-organizations.IamUserAccessToBilling.DENY" id="pepperizecdkorganizationsiamuseraccesstobillingdeny"></a>

---


### PolicyType <a name="PolicyType" id="policytype"></a>

| **Name** | **Description** |
| --- | --- |
| [`SERVICE_CONTROL_POLICY`](#pepperizecdkorganizationspolicytypeservicecontrolpolicy) | Service control policies (SCPs) offer central control over the maximum available permissions for all of the accounts in your organization. |
| [`TAG_POLICY`](#pepperizecdkorganizationspolicytypetagpolicy) | Tag policies help you standardize the tags attached to the AWS resources in your organization's accounts. |
| [`BACKUP_POLICY`](#pepperizecdkorganizationspolicytypebackuppolicy) | Backup policies help you centrally manage and apply backup plans to the AWS resources across your organization's accounts. |
| [`AISERVICES_OPT_OUT_POLICY`](#pepperizecdkorganizationspolicytypeaiservicesoptoutpolicy) | Artificial Intelligence (AI) services opt-out policies enable you to control data collection for AWS AI services for all of your organization's accounts. |

---

Organizations offers policy types in the following two broad categories: <ol>      <li>Authorization policies help you to centrally manage the security of the AWS accounts in your organization.</li>      <li>Management policies enable you to centrally configure and manage AWS services and their features.</li> </ol>.

> https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies.html#orgs-policy-types

#### `SERVICE_CONTROL_POLICY` <a name="@pepperize/cdk-organizations.PolicyType.SERVICE_CONTROL_POLICY" id="pepperizecdkorganizationspolicytypeservicecontrolpolicy"></a>

Service control policies (SCPs) offer central control over the maximum available permissions for all of the accounts in your organization.

---


#### `TAG_POLICY` <a name="@pepperize/cdk-organizations.PolicyType.TAG_POLICY" id="pepperizecdkorganizationspolicytypetagpolicy"></a>

Tag policies help you standardize the tags attached to the AWS resources in your organization's accounts.

---


#### `BACKUP_POLICY` <a name="@pepperize/cdk-organizations.PolicyType.BACKUP_POLICY" id="pepperizecdkorganizationspolicytypebackuppolicy"></a>

Backup policies help you centrally manage and apply backup plans to the AWS resources across your organization's accounts.

---


#### `AISERVICES_OPT_OUT_POLICY` <a name="@pepperize/cdk-organizations.PolicyType.AISERVICES_OPT_OUT_POLICY" id="pepperizecdkorganizationspolicytypeaiservicesoptoutpolicy"></a>

Artificial Intelligence (AI) services opt-out policies enable you to control data collection for AWS AI services for all of your organization's accounts.

---

