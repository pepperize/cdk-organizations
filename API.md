# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="constructs"></a>

### Account <a name="@pepperize/cdk-organizations.Account" id="pepperizecdkorganizationsaccount"></a>

- *Implements:* [`@pepperize/cdk-organizations.IPolicyAttachmentTarget`](#@pepperize/cdk-organizations.IPolicyAttachmentTarget)

#### Initializers <a name="@pepperize/cdk-organizations.Account.Initializer" id="pepperizecdkorganizationsaccountinitializer"></a>

```typescript
import { Account } from '@pepperize/cdk-organizations'

new Account(scope: Construct, id: string, props: AccountProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`scope`](#pepperizecdkorganizationsaccountparameterscope)<span title="Required">*</span> | [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct) | *No description.* |
| [`id`](#pepperizecdkorganizationsaccountparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`props`](#pepperizecdkorganizationsaccountparameterprops)<span title="Required">*</span> | [`@pepperize/cdk-organizations.AccountProps`](#@pepperize/cdk-organizations.AccountProps) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Account.parameter.scope" id="pepperizecdkorganizationsaccountparameterscope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Account.parameter.id" id="pepperizecdkorganizationsaccountparameterid"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Account.parameter.props" id="pepperizecdkorganizationsaccountparameterprops"></a>

- *Type:* [`@pepperize/cdk-organizations.AccountProps`](#@pepperize/cdk-organizations.AccountProps)

---

#### Methods <a name="Methods" id="methods"></a>

| **Name** | **Description** |
| --- | --- |
| [`currentParentId`](#pepperizecdkorganizationsaccountcurrentparentid) | *No description.* |
| [`identifier`](#pepperizecdkorganizationsaccountidentifier) | *No description.* |
| [`move`](#pepperizecdkorganizationsaccountmove) | *No description.* |

---

##### `currentParentId` <a name="@pepperize/cdk-organizations.Account.currentParentId" id="pepperizecdkorganizationsaccountcurrentparentid"></a>

```typescript
public currentParentId()
```

##### `identifier` <a name="@pepperize/cdk-organizations.Account.identifier" id="pepperizecdkorganizationsaccountidentifier"></a>

```typescript
public identifier()
```

##### `move` <a name="@pepperize/cdk-organizations.Account.move" id="pepperizecdkorganizationsaccountmove"></a>

```typescript
public move(destinationParentId: string, sourceParentId: string)
```

###### `destinationParentId`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Account.parameter.destinationParentId" id="pepperizecdkorganizationsaccountparameterdestinationparentid"></a>

- *Type:* `string`

---

###### `sourceParentId`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Account.parameter.sourceParentId" id="pepperizecdkorganizationsaccountparametersourceparentid"></a>

- *Type:* `string`

---


#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`accountId`](#pepperizecdkorganizationsaccountpropertyaccountid)<span title="Required">*</span> | `string` | If the account was created successfully, the unique identifier (ID) of the new account. |

---

##### `accountId`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Account.property.accountId" id="pepperizecdkorganizationsaccountpropertyaccountid"></a>

```typescript
public readonly accountId: string;
```

- *Type:* `string`

If the account was created successfully, the unique identifier (ID) of the new account.

Exactly 12 digits.

---


### DelegatedAdministrator <a name="@pepperize/cdk-organizations.DelegatedAdministrator" id="pepperizecdkorganizationsdelegatedadministrator"></a>

Enables the specified member account to administer the Organizations features of the specified AWS service.

It grants read-only access to AWS Organizations service data. The account still requires IAM permissions to access and administer the AWS service.  You can run this action only for AWS services that support this feature. For a current list of services that support it, see the column Supports Delegated Administrator in the table at AWS Services that you can use with AWS Organizations in the AWS Organizations User Guide.

#### Initializers <a name="@pepperize/cdk-organizations.DelegatedAdministrator.Initializer" id="pepperizecdkorganizationsdelegatedadministratorinitializer"></a>

```typescript
import { DelegatedAdministrator } from '@pepperize/cdk-organizations'

new DelegatedAdministrator(scope: Construct, id: string, props: DelegatedAdministratorProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`scope`](#pepperizecdkorganizationsdelegatedadministratorparameterscope)<span title="Required">*</span> | [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct) | *No description.* |
| [`id`](#pepperizecdkorganizationsdelegatedadministratorparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`props`](#pepperizecdkorganizationsdelegatedadministratorparameterprops)<span title="Required">*</span> | [`@pepperize/cdk-organizations.DelegatedAdministratorProps`](#@pepperize/cdk-organizations.DelegatedAdministratorProps) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="@pepperize/cdk-organizations.DelegatedAdministrator.parameter.scope" id="pepperizecdkorganizationsdelegatedadministratorparameterscope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@pepperize/cdk-organizations.DelegatedAdministrator.parameter.id" id="pepperizecdkorganizationsdelegatedadministratorparameterid"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@pepperize/cdk-organizations.DelegatedAdministrator.parameter.props" id="pepperizecdkorganizationsdelegatedadministratorparameterprops"></a>

- *Type:* [`@pepperize/cdk-organizations.DelegatedAdministratorProps`](#@pepperize/cdk-organizations.DelegatedAdministratorProps)

---





### EnableAwsServiceAccess <a name="@pepperize/cdk-organizations.EnableAwsServiceAccess" id="pepperizecdkorganizationsenableawsserviceaccess"></a>

Enables the integration of an AWS service (the service that is specified by ServicePrincipal) with AWS Organizations.

When you enable integration, you allow the specified service to create a service-linked role in all the accounts in your organization. This allows the service to perform operations on your behalf in your organization and its accounts.  <strong>This operation can be called only from the organization's management account and only if the organization has enabled all features.</strong>

> https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services.html#orgs_trusted_access_perms

#### Initializers <a name="@pepperize/cdk-organizations.EnableAwsServiceAccess.Initializer" id="pepperizecdkorganizationsenableawsserviceaccessinitializer"></a>

```typescript
import { EnableAwsServiceAccess } from '@pepperize/cdk-organizations'

new EnableAwsServiceAccess(scope: Construct, id: string, props: EnableAwsServiceAccessProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`scope`](#pepperizecdkorganizationsenableawsserviceaccessparameterscope)<span title="Required">*</span> | [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct) | *No description.* |
| [`id`](#pepperizecdkorganizationsenableawsserviceaccessparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`props`](#pepperizecdkorganizationsenableawsserviceaccessparameterprops)<span title="Required">*</span> | [`@pepperize/cdk-organizations.EnableAwsServiceAccessProps`](#@pepperize/cdk-organizations.EnableAwsServiceAccessProps) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="@pepperize/cdk-organizations.EnableAwsServiceAccess.parameter.scope" id="pepperizecdkorganizationsenableawsserviceaccessparameterscope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@pepperize/cdk-organizations.EnableAwsServiceAccess.parameter.id" id="pepperizecdkorganizationsenableawsserviceaccessparameterid"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@pepperize/cdk-organizations.EnableAwsServiceAccess.parameter.props" id="pepperizecdkorganizationsenableawsserviceaccessparameterprops"></a>

- *Type:* [`@pepperize/cdk-organizations.EnableAwsServiceAccessProps`](#@pepperize/cdk-organizations.EnableAwsServiceAccessProps)

---





### Organization <a name="@pepperize/cdk-organizations.Organization" id="pepperizecdkorganizationsorganization"></a>

Creates an organization to consolidate your AWS accounts so that you can administer them as a single unit.

An organization has one management account along with zero or more member accounts. You can organize the accounts in a hierarchical, tree-like structure with a root at the top and organizational units nested under the root. Each account can be directly in the root, or placed in one of the OUs in the hierarchy. An organization has the functionality that is determined by the feature set that you enable.  <strong>The account whose user is calling the CreateOrganization operation automatically becomes the management account of the new organization.</strong>  <strong>For deletion of an organization you must previously remove all the member accounts, OUs, and policies from the organization!</strong>

> https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_org_create.html#create-org

#### Initializers <a name="@pepperize/cdk-organizations.Organization.Initializer" id="pepperizecdkorganizationsorganizationinitializer"></a>

```typescript
import { Organization } from '@pepperize/cdk-organizations'

new Organization(scope: Construct, id: string, props: OrganizationProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`scope`](#pepperizecdkorganizationsorganizationparameterscope)<span title="Required">*</span> | [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct) | *No description.* |
| [`id`](#pepperizecdkorganizationsorganizationparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`props`](#pepperizecdkorganizationsorganizationparameterprops)<span title="Required">*</span> | [`@pepperize/cdk-organizations.OrganizationProps`](#@pepperize/cdk-organizations.OrganizationProps) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Organization.parameter.scope" id="pepperizecdkorganizationsorganizationparameterscope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Organization.parameter.id" id="pepperizecdkorganizationsorganizationparameterid"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Organization.parameter.props" id="pepperizecdkorganizationsorganizationparameterprops"></a>

- *Type:* [`@pepperize/cdk-organizations.OrganizationProps`](#@pepperize/cdk-organizations.OrganizationProps)

---



#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`masterAccountArn`](#pepperizecdkorganizationsorganizationpropertymasteraccountarn)<span title="Required">*</span> | `string` | The Amazon Resource Name (ARN) of the account that is designated as the management account for the organization. |
| [`masterAccountEmail`](#pepperizecdkorganizationsorganizationpropertymasteraccountemail)<span title="Required">*</span> | `string` | The email address that is associated with the AWS account that is designated as the management account for the organization. |
| [`masterAccountId`](#pepperizecdkorganizationsorganizationpropertymasteraccountid)<span title="Required">*</span> | `string` | The unique identifier (ID) of the management account of an organization. |
| [`organizationArn`](#pepperizecdkorganizationsorganizationpropertyorganizationarn)<span title="Required">*</span> | `string` | The Amazon Resource Name (ARN) of an organization. |
| [`organizationId`](#pepperizecdkorganizationsorganizationpropertyorganizationid)<span title="Required">*</span> | `string` | The unique identifier (ID) of an organization. |
| [`root`](#pepperizecdkorganizationsorganizationpropertyroot)<span title="Required">*</span> | [`@pepperize/cdk-organizations.Root`](#@pepperize/cdk-organizations.Root) | The root of the current organization, which is automatically created. |

---

##### `masterAccountArn`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Organization.property.masterAccountArn" id="pepperizecdkorganizationsorganizationpropertymasteraccountarn"></a>

```typescript
public readonly masterAccountArn: string;
```

- *Type:* `string`

The Amazon Resource Name (ARN) of the account that is designated as the management account for the organization.

---

##### `masterAccountEmail`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Organization.property.masterAccountEmail" id="pepperizecdkorganizationsorganizationpropertymasteraccountemail"></a>

```typescript
public readonly masterAccountEmail: string;
```

- *Type:* `string`

The email address that is associated with the AWS account that is designated as the management account for the organization.

---

##### `masterAccountId`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Organization.property.masterAccountId" id="pepperizecdkorganizationsorganizationpropertymasteraccountid"></a>

```typescript
public readonly masterAccountId: string;
```

- *Type:* `string`

The unique identifier (ID) of the management account of an organization.

---

##### `organizationArn`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Organization.property.organizationArn" id="pepperizecdkorganizationsorganizationpropertyorganizationarn"></a>

```typescript
public readonly organizationArn: string;
```

- *Type:* `string`

The Amazon Resource Name (ARN) of an organization.

---

##### `organizationId`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Organization.property.organizationId" id="pepperizecdkorganizationsorganizationpropertyorganizationid"></a>

```typescript
public readonly organizationId: string;
```

- *Type:* `string`

The unique identifier (ID) of an organization.

The regex pattern for an organization ID string requires "o-" followed by from 10 to 32 lowercase letters or digits.

---

##### `root`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Organization.property.root" id="pepperizecdkorganizationsorganizationpropertyroot"></a>

```typescript
public readonly root: Root;
```

- *Type:* [`@pepperize/cdk-organizations.Root`](#@pepperize/cdk-organizations.Root)

The root of the current organization, which is automatically created.

---


### OrganizationalUnit <a name="@pepperize/cdk-organizations.OrganizationalUnit" id="pepperizecdkorganizationsorganizationalunit"></a>

- *Implements:* [`@pepperize/cdk-organizations.IParent`](#@pepperize/cdk-organizations.IParent), [`@pepperize/cdk-organizations.IPolicyAttachmentTarget`](#@pepperize/cdk-organizations.IPolicyAttachmentTarget)

A container for accounts within a root.

An OU also can contain other OUs, enabling you to create a hierarchy that resembles an upside-down tree, with a root at the top and branches of OUs that reach down, ending in accounts that are the leaves of the tree. When you attach a policy to one of the nodes in the hierarchy, it flows down and affects all the branches (OUs) and leaves (accounts) beneath it. An OU can have exactly one parent, and currently each account can be a member of exactly one OU.  <strong>You must first move all accounts out of the OU and any child OUs, and then you can delete the child OUs.</strong>

#### Initializers <a name="@pepperize/cdk-organizations.OrganizationalUnit.Initializer" id="pepperizecdkorganizationsorganizationalunitinitializer"></a>

```typescript
import { OrganizationalUnit } from '@pepperize/cdk-organizations'

new OrganizationalUnit(scope: Construct, id: string, props: OrganizationalUnitProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`scope`](#pepperizecdkorganizationsorganizationalunitparameterscope)<span title="Required">*</span> | [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct) | *No description.* |
| [`id`](#pepperizecdkorganizationsorganizationalunitparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`props`](#pepperizecdkorganizationsorganizationalunitparameterprops)<span title="Required">*</span> | [`@pepperize/cdk-organizations.OrganizationalUnitProps`](#@pepperize/cdk-organizations.OrganizationalUnitProps) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="@pepperize/cdk-organizations.OrganizationalUnit.parameter.scope" id="pepperizecdkorganizationsorganizationalunitparameterscope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@pepperize/cdk-organizations.OrganizationalUnit.parameter.id" id="pepperizecdkorganizationsorganizationalunitparameterid"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@pepperize/cdk-organizations.OrganizationalUnit.parameter.props" id="pepperizecdkorganizationsorganizationalunitparameterprops"></a>

- *Type:* [`@pepperize/cdk-organizations.OrganizationalUnitProps`](#@pepperize/cdk-organizations.OrganizationalUnitProps)

---

#### Methods <a name="Methods" id="methods"></a>

| **Name** | **Description** |
| --- | --- |
| [`identifier`](#pepperizecdkorganizationsorganizationalunitidentifier) | The unique identifier (ID) of the parent root or OU that you want to create the new OU in. |

---

##### `identifier` <a name="@pepperize/cdk-organizations.OrganizationalUnit.identifier" id="pepperizecdkorganizationsorganizationalunitidentifier"></a>

```typescript
public identifier()
```


#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`organizationalUnitArn`](#pepperizecdkorganizationsorganizationalunitpropertyorganizationalunitarn)<span title="Required">*</span> | `string` | The Amazon Resource Name (ARN) of this OU. |
| [`organizationalUnitId`](#pepperizecdkorganizationsorganizationalunitpropertyorganizationalunitid)<span title="Required">*</span> | `string` | The unique identifier (ID) associated with this OU. |
| [`organizationalUnitName`](#pepperizecdkorganizationsorganizationalunitpropertyorganizationalunitname)<span title="Required">*</span> | `string` | The friendly name of this OU. |

---

##### `organizationalUnitArn`<sup>Required</sup> <a name="@pepperize/cdk-organizations.OrganizationalUnit.property.organizationalUnitArn" id="pepperizecdkorganizationsorganizationalunitpropertyorganizationalunitarn"></a>

```typescript
public readonly organizationalUnitArn: string;
```

- *Type:* `string`

The Amazon Resource Name (ARN) of this OU.

For more information about ARNs in Organizations, see [ARN Formats Supported by Organizations](https://docs.aws.amazon.com/service-authorization/latest/reference/list_awsorganizations.html#awsorganizations-resources-for-iam-policies) in the AWS Service Authorization Reference.

---

##### `organizationalUnitId`<sup>Required</sup> <a name="@pepperize/cdk-organizations.OrganizationalUnit.property.organizationalUnitId" id="pepperizecdkorganizationsorganizationalunitpropertyorganizationalunitid"></a>

```typescript
public readonly organizationalUnitId: string;
```

- *Type:* `string`

The unique identifier (ID) associated with this OU.

The regex pattern for an organizational unit ID string requires "ou-" followed by from 4 to 32 lowercase letters or digits (the ID of the root that contains the OU). This string is followed by a second "-" dash and from 8 to 32 additional lowercase letters or digits.

---

##### `organizationalUnitName`<sup>Required</sup> <a name="@pepperize/cdk-organizations.OrganizationalUnit.property.organizationalUnitName" id="pepperizecdkorganizationsorganizationalunitpropertyorganizationalunitname"></a>

```typescript
public readonly organizationalUnitName: string;
```

- *Type:* `string`

The friendly name of this OU.

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
| [`scope`](#pepperizecdkorganizationspolicyparameterscope)<span title="Required">*</span> | [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct) | *No description.* |
| [`id`](#pepperizecdkorganizationspolicyparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`props`](#pepperizecdkorganizationspolicyparameterprops)<span title="Required">*</span> | [`@pepperize/cdk-organizations.PolicyProps`](#@pepperize/cdk-organizations.PolicyProps) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Policy.parameter.scope" id="pepperizecdkorganizationspolicyparameterscope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Policy.parameter.id" id="pepperizecdkorganizationspolicyparameterid"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Policy.parameter.props" id="pepperizecdkorganizationspolicyparameterprops"></a>

- *Type:* [`@pepperize/cdk-organizations.PolicyProps`](#@pepperize/cdk-organizations.PolicyProps)

---



#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`policyId`](#pepperizecdkorganizationspolicypropertypolicyid)<span title="Required">*</span> | `string` | The unique identifier (ID) of the policy. |

---

##### `policyId`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Policy.property.policyId" id="pepperizecdkorganizationspolicypropertypolicyid"></a>

```typescript
public readonly policyId: string;
```

- *Type:* `string`

The unique identifier (ID) of the policy.

The regex pattern for a policy ID string requires "p-" followed by from 8 to 128 lowercase or uppercase letters, digits, or the underscore character (_).

---


### PolicyAttachment <a name="@pepperize/cdk-organizations.PolicyAttachment" id="pepperizecdkorganizationspolicyattachment"></a>

Attaches a policy to a root, an organizational unit (OU), or an individual account.

How the policy affects accounts depends on the type of policy. Refer to the AWS Organizations User Guide for information about each policy type:

#### Initializers <a name="@pepperize/cdk-organizations.PolicyAttachment.Initializer" id="pepperizecdkorganizationspolicyattachmentinitializer"></a>

```typescript
import { PolicyAttachment } from '@pepperize/cdk-organizations'

new PolicyAttachment(scope: Construct, id: string, props: PolicyAttachmentProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`scope`](#pepperizecdkorganizationspolicyattachmentparameterscope)<span title="Required">*</span> | [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct) | *No description.* |
| [`id`](#pepperizecdkorganizationspolicyattachmentparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`props`](#pepperizecdkorganizationspolicyattachmentparameterprops)<span title="Required">*</span> | [`@pepperize/cdk-organizations.PolicyAttachmentProps`](#@pepperize/cdk-organizations.PolicyAttachmentProps) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="@pepperize/cdk-organizations.PolicyAttachment.parameter.scope" id="pepperizecdkorganizationspolicyattachmentparameterscope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@pepperize/cdk-organizations.PolicyAttachment.parameter.id" id="pepperizecdkorganizationspolicyattachmentparameterid"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@pepperize/cdk-organizations.PolicyAttachment.parameter.props" id="pepperizecdkorganizationspolicyattachmentparameterprops"></a>

- *Type:* [`@pepperize/cdk-organizations.PolicyAttachmentProps`](#@pepperize/cdk-organizations.PolicyAttachmentProps)

---





### Root <a name="@pepperize/cdk-organizations.Root" id="pepperizecdkorganizationsroot"></a>

- *Implements:* [`@pepperize/cdk-organizations.IParent`](#@pepperize/cdk-organizations.IParent), [`@pepperize/cdk-organizations.IPolicyAttachmentTarget`](#@pepperize/cdk-organizations.IPolicyAttachmentTarget)

The parent container for all the accounts for your organization.

If you apply a policy to the root, it applies to all organizational units (OUs) and accounts in the organization. <strong>Currently, you can have only one root. AWS Organizations automatically creates it for you when you create an organization.</strong>

> https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html

#### Initializers <a name="@pepperize/cdk-organizations.Root.Initializer" id="pepperizecdkorganizationsrootinitializer"></a>

```typescript
import { Root } from '@pepperize/cdk-organizations'

new Root(scope: Construct, id: string, props: RootProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`scope`](#pepperizecdkorganizationsrootparameterscope)<span title="Required">*</span> | [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct) | *No description.* |
| [`id`](#pepperizecdkorganizationsrootparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`props`](#pepperizecdkorganizationsrootparameterprops)<span title="Required">*</span> | [`@pepperize/cdk-organizations.RootProps`](#@pepperize/cdk-organizations.RootProps) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Root.parameter.scope" id="pepperizecdkorganizationsrootparameterscope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Root.parameter.id" id="pepperizecdkorganizationsrootparameterid"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Root.parameter.props" id="pepperizecdkorganizationsrootparameterprops"></a>

- *Type:* [`@pepperize/cdk-organizations.RootProps`](#@pepperize/cdk-organizations.RootProps)

---

#### Methods <a name="Methods" id="methods"></a>

| **Name** | **Description** |
| --- | --- |
| [`identifier`](#pepperizecdkorganizationsrootidentifier) | The unique identifier (ID) of the parent root or OU that you want to create the new OU in. |

---

##### `identifier` <a name="@pepperize/cdk-organizations.Root.identifier" id="pepperizecdkorganizationsrootidentifier"></a>

```typescript
public identifier()
```


#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`rootId`](#pepperizecdkorganizationsrootpropertyrootid)<span title="Required">*</span> | `string` | The unique identifier (ID) for the root. |

---

##### `rootId`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Root.property.rootId" id="pepperizecdkorganizationsrootpropertyrootid"></a>

```typescript
public readonly rootId: string;
```

- *Type:* `string`

The unique identifier (ID) for the root.

The regex pattern for a root ID string requires "r-" followed by from 4 to 32 lowercase letters or digits.

---


### TagResource <a name="@pepperize/cdk-organizations.TagResource" id="pepperizecdkorganizationstagresource"></a>

Add tags to an AWS Organizations resource to make it easier to identify, organize, and search.

> https://docs.aws.amazon.com/ARG/latest/APIReference/API_Tag.html

#### Initializers <a name="@pepperize/cdk-organizations.TagResource.Initializer" id="pepperizecdkorganizationstagresourceinitializer"></a>

```typescript
import { TagResource } from '@pepperize/cdk-organizations'

new TagResource(scope: Construct, id: string, props: TagResourceProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`scope`](#pepperizecdkorganizationstagresourceparameterscope)<span title="Required">*</span> | [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct) | *No description.* |
| [`id`](#pepperizecdkorganizationstagresourceparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`props`](#pepperizecdkorganizationstagresourceparameterprops)<span title="Required">*</span> | [`@pepperize/cdk-organizations.TagResourceProps`](#@pepperize/cdk-organizations.TagResourceProps) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="@pepperize/cdk-organizations.TagResource.parameter.scope" id="pepperizecdkorganizationstagresourceparameterscope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@pepperize/cdk-organizations.TagResource.parameter.id" id="pepperizecdkorganizationstagresourceparameterid"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@pepperize/cdk-organizations.TagResource.parameter.props" id="pepperizecdkorganizationstagresourceparameterprops"></a>

- *Type:* [`@pepperize/cdk-organizations.TagResourceProps`](#@pepperize/cdk-organizations.TagResourceProps)

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
| [`iamUserAccessToBilling`](#pepperizecdkorganizationsaccountpropspropertyiamuseraccesstobilling) | [`@pepperize/cdk-organizations.IamUserAccessToBilling`](#@pepperize/cdk-organizations.IamUserAccessToBilling) | If set to ALLOW , the new account enables IAM users to access account billing information if they have the required permissions. |
| [`parent`](#pepperizecdkorganizationsaccountpropspropertyparent) | [`@pepperize/cdk-organizations.IParent`](#@pepperize/cdk-organizations.IParent) | The parent root or OU that you want to create the new Account in. |
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

##### `iamUserAccessToBilling`<sup>Optional</sup> <a name="@pepperize/cdk-organizations.AccountProps.property.iamUserAccessToBilling" id="pepperizecdkorganizationsaccountpropspropertyiamuseraccesstobilling"></a>

```typescript
public readonly iamUserAccessToBilling: IamUserAccessToBilling;
```

- *Type:* [`@pepperize/cdk-organizations.IamUserAccessToBilling`](#@pepperize/cdk-organizations.IamUserAccessToBilling)
- *Default:* ALLOW

If set to ALLOW , the new account enables IAM users to access account billing information if they have the required permissions.

If set to DENY , only the root user of the new account can access account billing information.

---

##### `parent`<sup>Optional</sup> <a name="@pepperize/cdk-organizations.AccountProps.property.parent" id="pepperizecdkorganizationsaccountpropspropertyparent"></a>

```typescript
public readonly parent: IParent;
```

- *Type:* [`@pepperize/cdk-organizations.IParent`](#@pepperize/cdk-organizations.IParent)

The parent root or OU that you want to create the new Account in.

---

##### `roleName`<sup>Optional</sup> <a name="@pepperize/cdk-organizations.AccountProps.property.roleName" id="pepperizecdkorganizationsaccountpropspropertyrolename"></a>

```typescript
public readonly roleName: string;
```

- *Type:* `string`

The name of an IAM role that AWS Organizations automatically preconfigures in the new member account.

This role trusts the management account, allowing users in the management account to assume the role, as permitted by the management account administrator. The role has administrator permissions in the new member account.  If you don't specify this parameter, the role name defaults to OrganizationAccountAccessRole.

---

### DelegatedAdministratorProps <a name="@pepperize/cdk-organizations.DelegatedAdministratorProps" id="pepperizecdkorganizationsdelegatedadministratorprops"></a>

#### Initializer <a name="[object Object].Initializer" id="object-objectinitializer"></a>

```typescript
import { DelegatedAdministratorProps } from '@pepperize/cdk-organizations'

const delegatedAdministratorProps: DelegatedAdministratorProps = { ... }
```

#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`account`](#pepperizecdkorganizationsdelegatedadministratorpropspropertyaccount)<span title="Required">*</span> | [`@pepperize/cdk-organizations.Account`](#@pepperize/cdk-organizations.Account) | The member account in the organization to register as a delegated administrator. |
| [`servicePrincipal`](#pepperizecdkorganizationsdelegatedadministratorpropspropertyserviceprincipal)<span title="Required">*</span> | `string` | The service principal of the AWS service for which you want to make the member account a delegated administrator. |

---

##### `account`<sup>Required</sup> <a name="@pepperize/cdk-organizations.DelegatedAdministratorProps.property.account" id="pepperizecdkorganizationsdelegatedadministratorpropspropertyaccount"></a>

```typescript
public readonly account: Account;
```

- *Type:* [`@pepperize/cdk-organizations.Account`](#@pepperize/cdk-organizations.Account)

The member account in the organization to register as a delegated administrator.

---

##### `servicePrincipal`<sup>Required</sup> <a name="@pepperize/cdk-organizations.DelegatedAdministratorProps.property.servicePrincipal" id="pepperizecdkorganizationsdelegatedadministratorpropspropertyserviceprincipal"></a>

```typescript
public readonly servicePrincipal: string;
```

- *Type:* `string`

The service principal of the AWS service for which you want to make the member account a delegated administrator.

---

### EnableAwsServiceAccessProps <a name="@pepperize/cdk-organizations.EnableAwsServiceAccessProps" id="pepperizecdkorganizationsenableawsserviceaccessprops"></a>

#### Initializer <a name="[object Object].Initializer" id="object-objectinitializer"></a>

```typescript
import { EnableAwsServiceAccessProps } from '@pepperize/cdk-organizations'

const enableAwsServiceAccessProps: EnableAwsServiceAccessProps = { ... }
```

#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`servicePrincipal`](#pepperizecdkorganizationsenableawsserviceaccesspropspropertyserviceprincipal)<span title="Required">*</span> | `string` | The service principal name of the AWS service for which you want to enable integration with your organization. |

---

##### `servicePrincipal`<sup>Required</sup> <a name="@pepperize/cdk-organizations.EnableAwsServiceAccessProps.property.servicePrincipal" id="pepperizecdkorganizationsenableawsserviceaccesspropspropertyserviceprincipal"></a>

```typescript
public readonly servicePrincipal: string;
```

- *Type:* `string`

The service principal name of the AWS service for which you want to enable integration with your organization.

This is typically in the form of a URL, such as service-abbreviation.amazonaws.com.

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
| [`parent`](#pepperizecdkorganizationsorganizationalunitpropspropertyparent)<span title="Required">*</span> | [`@pepperize/cdk-organizations.IParent`](#@pepperize/cdk-organizations.IParent) | The parent root or OU that you want to create the new OrganizationalUnit in. |

---

##### `organizationalUnitName`<sup>Required</sup> <a name="@pepperize/cdk-organizations.OrganizationalUnitProps.property.organizationalUnitName" id="pepperizecdkorganizationsorganizationalunitpropspropertyorganizationalunitname"></a>

```typescript
public readonly organizationalUnitName: string;
```

- *Type:* `string`

The friendly name to assign to the new OU.

---

##### `parent`<sup>Required</sup> <a name="@pepperize/cdk-organizations.OrganizationalUnitProps.property.parent" id="pepperizecdkorganizationsorganizationalunitpropspropertyparent"></a>

```typescript
public readonly parent: IParent;
```

- *Type:* [`@pepperize/cdk-organizations.IParent`](#@pepperize/cdk-organizations.IParent)

The parent root or OU that you want to create the new OrganizationalUnit in.

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

### PolicyAttachmentProps <a name="@pepperize/cdk-organizations.PolicyAttachmentProps" id="pepperizecdkorganizationspolicyattachmentprops"></a>

#### Initializer <a name="[object Object].Initializer" id="object-objectinitializer"></a>

```typescript
import { PolicyAttachmentProps } from '@pepperize/cdk-organizations'

const policyAttachmentProps: PolicyAttachmentProps = { ... }
```

#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`policy`](#pepperizecdkorganizationspolicyattachmentpropspropertypolicy)<span title="Required">*</span> | [`@pepperize/cdk-organizations.Policy`](#@pepperize/cdk-organizations.Policy) | The policy that you want to attach to the target. |
| [`target`](#pepperizecdkorganizationspolicyattachmentpropspropertytarget)<span title="Required">*</span> | [`@pepperize/cdk-organizations.IPolicyAttachmentTarget`](#@pepperize/cdk-organizations.IPolicyAttachmentTarget) | The root, OU, or account that you want to attach the policy to. |

---

##### `policy`<sup>Required</sup> <a name="@pepperize/cdk-organizations.PolicyAttachmentProps.property.policy" id="pepperizecdkorganizationspolicyattachmentpropspropertypolicy"></a>

```typescript
public readonly policy: Policy;
```

- *Type:* [`@pepperize/cdk-organizations.Policy`](#@pepperize/cdk-organizations.Policy)

The policy that you want to attach to the target.

---

##### `target`<sup>Required</sup> <a name="@pepperize/cdk-organizations.PolicyAttachmentProps.property.target" id="pepperizecdkorganizationspolicyattachmentpropspropertytarget"></a>

```typescript
public readonly target: IPolicyAttachmentTarget;
```

- *Type:* [`@pepperize/cdk-organizations.IPolicyAttachmentTarget`](#@pepperize/cdk-organizations.IPolicyAttachmentTarget)

The root, OU, or account that you want to attach the policy to.

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

##### `description`<sup>Optional</sup> <a name="@pepperize/cdk-organizations.PolicyProps.property.description" id="pepperizecdkorganizationspolicypropspropertydescription"></a>

```typescript
public readonly description: string;
```

- *Type:* `string`

An optional description to assign to the policy.

---

### RootProps <a name="@pepperize/cdk-organizations.RootProps" id="pepperizecdkorganizationsrootprops"></a>

#### Initializer <a name="[object Object].Initializer" id="object-objectinitializer"></a>

```typescript
import { RootProps } from '@pepperize/cdk-organizations'

const rootProps: RootProps = { ... }
```

#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`organization`](#pepperizecdkorganizationsrootpropspropertyorganization)<span title="Required">*</span> | [`@pepperize/cdk-organizations.Organization`](#@pepperize/cdk-organizations.Organization) | *No description.* |

---

##### `organization`<sup>Required</sup> <a name="@pepperize/cdk-organizations.RootProps.property.organization" id="pepperizecdkorganizationsrootpropspropertyorganization"></a>

```typescript
public readonly organization: Organization;
```

- *Type:* [`@pepperize/cdk-organizations.Organization`](#@pepperize/cdk-organizations.Organization)

---

### TagResourceProps <a name="@pepperize/cdk-organizations.TagResourceProps" id="pepperizecdkorganizationstagresourceprops"></a>

#### Initializer <a name="[object Object].Initializer" id="object-objectinitializer"></a>

```typescript
import { TagResourceProps } from '@pepperize/cdk-organizations'

const tagResourceProps: TagResourceProps = { ... }
```

#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`resource`](#pepperizecdkorganizationstagresourcepropspropertyresource)<span title="Required">*</span> | [`@pepperize/cdk-organizations.ITaggableResource`](#@pepperize/cdk-organizations.ITaggableResource) | *No description.* |

---

##### `resource`<sup>Required</sup> <a name="@pepperize/cdk-organizations.TagResourceProps.property.resource" id="pepperizecdkorganizationstagresourcepropspropertyresource"></a>

```typescript
public readonly resource: ITaggableResource;
```

- *Type:* [`@pepperize/cdk-organizations.ITaggableResource`](#@pepperize/cdk-organizations.ITaggableResource)

---


## Protocols <a name="Protocols" id="protocols"></a>

### IParent <a name="@pepperize/cdk-organizations.IParent" id="pepperizecdkorganizationsiparent"></a>

- *Extends:* [`@aws-cdk/core.IDependable`](#@aws-cdk/core.IDependable)

- *Implemented By:* [`@pepperize/cdk-organizations.OrganizationalUnit`](#@pepperize/cdk-organizations.OrganizationalUnit), [`@pepperize/cdk-organizations.Root`](#@pepperize/cdk-organizations.Root), [`@pepperize/cdk-organizations.IParent`](#@pepperize/cdk-organizations.IParent)

#### Methods <a name="Methods" id="methods"></a>

| **Name** | **Description** |
| --- | --- |
| [`identifier`](#pepperizecdkorganizationsiparentidentifier) | The unique identifier (ID) of the parent root or OU that you want to create the new OU in. |

---

##### `identifier` <a name="@pepperize/cdk-organizations.IParent.identifier" id="pepperizecdkorganizationsiparentidentifier"></a>

```typescript
public identifier()
```


### IPolicyAttachmentTarget <a name="@pepperize/cdk-organizations.IPolicyAttachmentTarget" id="pepperizecdkorganizationsipolicyattachmenttarget"></a>

- *Extends:* [`@aws-cdk/core.IDependable`](#@aws-cdk/core.IDependable)

- *Implemented By:* [`@pepperize/cdk-organizations.Account`](#@pepperize/cdk-organizations.Account), [`@pepperize/cdk-organizations.OrganizationalUnit`](#@pepperize/cdk-organizations.OrganizationalUnit), [`@pepperize/cdk-organizations.Root`](#@pepperize/cdk-organizations.Root), [`@pepperize/cdk-organizations.IPolicyAttachmentTarget`](#@pepperize/cdk-organizations.IPolicyAttachmentTarget)

#### Methods <a name="Methods" id="methods"></a>

| **Name** | **Description** |
| --- | --- |
| [`identifier`](#pepperizecdkorganizationsipolicyattachmenttargetidentifier) | *No description.* |

---

##### `identifier` <a name="@pepperize/cdk-organizations.IPolicyAttachmentTarget.identifier" id="pepperizecdkorganizationsipolicyattachmenttargetidentifier"></a>

```typescript
public identifier()
```


### ITaggableResource <a name="@pepperize/cdk-organizations.ITaggableResource" id="pepperizecdkorganizationsitaggableresource"></a>

- *Extends:* [`@aws-cdk/core.ITaggable`](#@aws-cdk/core.ITaggable)

- *Implemented By:* [`@pepperize/cdk-organizations.ITaggableResource`](#@pepperize/cdk-organizations.ITaggableResource)

#### Methods <a name="Methods" id="methods"></a>

| **Name** | **Description** |
| --- | --- |
| [`identifier`](#pepperizecdkorganizationsitaggableresourceidentifier) | The unique identifier (ID) of the account, Organizational unit (OU), parent root or Policy (any type) that you want to tag. |

---

##### `identifier` <a name="@pepperize/cdk-organizations.ITaggableResource.identifier" id="pepperizecdkorganizationsitaggableresourceidentifier"></a>

```typescript
public identifier()
```

#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`tags`](#pepperizecdkorganizationsitaggableresourcepropertytags)<span title="Required">*</span> | [`@aws-cdk/core.TagManager`](#@aws-cdk/core.TagManager) | TagManager to set, remove and format tags. |

---

##### `tags`<sup>Required</sup> <a name="@pepperize/cdk-organizations.ITaggableResource.property.tags" id="pepperizecdkorganizationsitaggableresourcepropertytags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* [`@aws-cdk/core.TagManager`](#@aws-cdk/core.TagManager)

TagManager to set, remove and format tags.

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

For more information, see [Consolidated billing](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html#feature-set-cb-only) in the AWS Organizations User Guide. The consolidated billing feature subset isn’t available for organizations in the AWS GovCloud (US) Region.

---


#### `ALL` <a name="@pepperize/cdk-organizations.FeatureSet.ALL" id="pepperizecdkorganizationsfeaturesetall"></a>

In addition to all the features supported by the consolidated billing feature set, the management account can also apply any policy type to any member account in the organization.

For more information, see [All features](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html#feature-set-all) in the AWS Organizations User Guide.

---


### IamUserAccessToBilling <a name="IamUserAccessToBilling" id="iamuseraccesstobilling"></a>

| **Name** | **Description** |
| --- | --- |
| [`ALLOW`](#pepperizecdkorganizationsiamuseraccesstobillingallow) | If set to ALLOW, the new account enables IAM users to access account billing information if they have the required permissions. |
| [`DENY`](#pepperizecdkorganizationsiamuseraccesstobillingdeny) | If set to DENY, only the root user of the new account can access account billing information. |

---

> https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/control-access-billing.html#ControllingAccessWebsite-Activate

#### `ALLOW` <a name="@pepperize/cdk-organizations.IamUserAccessToBilling.ALLOW" id="pepperizecdkorganizationsiamuseraccesstobillingallow"></a>

If set to ALLOW, the new account enables IAM users to access account billing information if they have the required permissions.

---


#### `DENY` <a name="@pepperize/cdk-organizations.IamUserAccessToBilling.DENY" id="pepperizecdkorganizationsiamuseraccesstobillingdeny"></a>

If set to DENY, only the root user of the new account can access account billing information.

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

