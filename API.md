# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="constructs"></a>

### Account <a name="@pepperize/cdk-organizations.Account" id="pepperizecdkorganizationsaccount"></a>

- *Implements:* [`@pepperize/cdk-organizations.IAccount`](#@pepperize/cdk-organizations.IAccount), [`@pepperize/cdk-organizations.ITaggableResource`](#@pepperize/cdk-organizations.ITaggableResource)

Creates or imports an AWS account that is automatically a member of the organization whose credentials made the request.

AWS Organizations automatically copies the information from the management account to the new member account

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

#### Methods <a name="Methods" id="methods"></a>

| **Name** | **Description** |
| --- | --- |
| [`delegateAdministrator`](#pepperizecdkorganizationsaccountdelegateadministrator) | Enables trusted access for the AWS service (trusted service) as <strong>Delegated Administrator</strong>, which performs tasks in your organization and its accounts on your behalf. |
| [`identifier`](#pepperizecdkorganizationsaccountidentifier) | The unique identifier (ID) of the parent root, organizational unit (OU), account, or policy that you want to create the new OU in. |

---

##### `delegateAdministrator` <a name="@pepperize/cdk-organizations.Account.delegateAdministrator" id="pepperizecdkorganizationsaccountdelegateadministrator"></a>

```typescript
public delegateAdministrator(servicePrincipal: string)
```

###### `servicePrincipal`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Account.parameter.servicePrincipal" id="pepperizecdkorganizationsaccountparameterserviceprincipal"></a>

- *Type:* `string`

The supported AWS service that you specify.

---

##### `identifier` <a name="@pepperize/cdk-organizations.Account.identifier" id="pepperizecdkorganizationsaccountidentifier"></a>

```typescript
public identifier()
```


#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`accountArn`](#pepperizecdkorganizationsaccountpropertyaccountarn)<span title="Required">*</span> | `string` | The Amazon Resource Name (ARN) of the account. |
| [`accountId`](#pepperizecdkorganizationsaccountpropertyaccountid)<span title="Required">*</span> | `string` | If the account was created successfully, the unique identifier (ID) of the new account. |
| [`accountName`](#pepperizecdkorganizationsaccountpropertyaccountname)<span title="Required">*</span> | `string` | The friendly name of the account. |
| [`email`](#pepperizecdkorganizationsaccountpropertyemail)<span title="Required">*</span> | `string` | The email address of the owner to assign to the new member account. |
| [`tags`](#pepperizecdkorganizationsaccountpropertytags)<span title="Required">*</span> | [`aws-cdk-lib.TagManager`](#aws-cdk-lib.TagManager) | TagManager to set, remove and format tags. |

---

##### `accountArn`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Account.property.accountArn" id="pepperizecdkorganizationsaccountpropertyaccountarn"></a>

```typescript
public readonly accountArn: string;
```

- *Type:* `string`

The Amazon Resource Name (ARN) of the account.

---

##### `accountId`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Account.property.accountId" id="pepperizecdkorganizationsaccountpropertyaccountid"></a>

```typescript
public readonly accountId: string;
```

- *Type:* `string`

If the account was created successfully, the unique identifier (ID) of the new account.

Exactly 12 digits.

---

##### `accountName`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Account.property.accountName" id="pepperizecdkorganizationsaccountpropertyaccountname"></a>

```typescript
public readonly accountName: string;
```

- *Type:* `string`

The friendly name of the account.

---

##### `email`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Account.property.email" id="pepperizecdkorganizationsaccountpropertyemail"></a>

```typescript
public readonly email: string;
```

- *Type:* `string`

The email address of the owner to assign to the new member account.

This email address must not already be associated with another AWS account. You must use a valid email address to complete account creation. You can't access the root user of the account or remove an account that was created with an invalid email address.

---

##### `tags`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Account.property.tags" id="pepperizecdkorganizationsaccountpropertytags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* [`aws-cdk-lib.TagManager`](#aws-cdk-lib.TagManager)

TagManager to set, remove and format tags.

---


### DelegatedAdministrator <a name="@pepperize/cdk-organizations.DelegatedAdministrator" id="pepperizecdkorganizationsdelegatedadministrator"></a>

Enables the specified member account to administer the Organizations features of the specified AWS service.

It grants read-only access to AWS Organizations service data. The account still requires IAM permissions to access and administer the AWS service.  You can run this action only for AWS services that support this feature. For a current list of services that support it, see the column Supports Delegated Administrator in the table at AWS Services that you can use with AWS Organizations in the [AWS Organizations User Guide](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services_list.html).

> https://docs.aws.amazon.com/accounts/latest/reference/using-orgs-delegated-admin.html

#### Initializers <a name="@pepperize/cdk-organizations.DelegatedAdministrator.Initializer" id="pepperizecdkorganizationsdelegatedadministratorinitializer"></a>

```typescript
import { DelegatedAdministrator } from '@pepperize/cdk-organizations'

new DelegatedAdministrator(scope: Construct, id: string, props: DelegatedAdministratorProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`scope`](#pepperizecdkorganizationsdelegatedadministratorparameterscope)<span title="Required">*</span> | [`constructs.Construct`](#constructs.Construct) | *No description.* |
| [`id`](#pepperizecdkorganizationsdelegatedadministratorparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`props`](#pepperizecdkorganizationsdelegatedadministratorparameterprops)<span title="Required">*</span> | [`@pepperize/cdk-organizations.DelegatedAdministratorProps`](#@pepperize/cdk-organizations.DelegatedAdministratorProps) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="@pepperize/cdk-organizations.DelegatedAdministrator.parameter.scope" id="pepperizecdkorganizationsdelegatedadministratorparameterscope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

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
| [`scope`](#pepperizecdkorganizationsenableawsserviceaccessparameterscope)<span title="Required">*</span> | [`constructs.Construct`](#constructs.Construct) | *No description.* |
| [`id`](#pepperizecdkorganizationsenableawsserviceaccessparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`props`](#pepperizecdkorganizationsenableawsserviceaccessparameterprops)<span title="Required">*</span> | [`@pepperize/cdk-organizations.EnableAwsServiceAccessProps`](#@pepperize/cdk-organizations.EnableAwsServiceAccessProps) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="@pepperize/cdk-organizations.EnableAwsServiceAccess.parameter.scope" id="pepperizecdkorganizationsenableawsserviceaccessparameterscope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

##### `id`<sup>Required</sup> <a name="@pepperize/cdk-organizations.EnableAwsServiceAccess.parameter.id" id="pepperizecdkorganizationsenableawsserviceaccessparameterid"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@pepperize/cdk-organizations.EnableAwsServiceAccess.parameter.props" id="pepperizecdkorganizationsenableawsserviceaccessparameterprops"></a>

- *Type:* [`@pepperize/cdk-organizations.EnableAwsServiceAccessProps`](#@pepperize/cdk-organizations.EnableAwsServiceAccessProps)

---





### EnablePolicyType <a name="@pepperize/cdk-organizations.EnablePolicyType" id="pepperizecdkorganizationsenablepolicytype"></a>

Enables and disables Enables a policy type in a root.

After you enable a policy type in a root, you can attach policies of that type to the root, any organizational unit (OU), or account in that root.

> https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_enable-disable.html

#### Initializers <a name="@pepperize/cdk-organizations.EnablePolicyType.Initializer" id="pepperizecdkorganizationsenablepolicytypeinitializer"></a>

```typescript
import { EnablePolicyType } from '@pepperize/cdk-organizations'

new EnablePolicyType(scope: Construct, id: string, props: EnablePolicyTypeProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`scope`](#pepperizecdkorganizationsenablepolicytypeparameterscope)<span title="Required">*</span> | [`constructs.Construct`](#constructs.Construct) | *No description.* |
| [`id`](#pepperizecdkorganizationsenablepolicytypeparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`props`](#pepperizecdkorganizationsenablepolicytypeparameterprops)<span title="Required">*</span> | [`@pepperize/cdk-organizations.EnablePolicyTypeProps`](#@pepperize/cdk-organizations.EnablePolicyTypeProps) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="@pepperize/cdk-organizations.EnablePolicyType.parameter.scope" id="pepperizecdkorganizationsenablepolicytypeparameterscope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

##### `id`<sup>Required</sup> <a name="@pepperize/cdk-organizations.EnablePolicyType.parameter.id" id="pepperizecdkorganizationsenablepolicytypeparameterid"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@pepperize/cdk-organizations.EnablePolicyType.parameter.props" id="pepperizecdkorganizationsenablepolicytypeparameterprops"></a>

- *Type:* [`@pepperize/cdk-organizations.EnablePolicyTypeProps`](#@pepperize/cdk-organizations.EnablePolicyTypeProps)

---





### Organization <a name="@pepperize/cdk-organizations.Organization" id="pepperizecdkorganizationsorganization"></a>

- *Implements:* [`@pepperize/cdk-organizations.IOrganization`](#@pepperize/cdk-organizations.IOrganization)

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

#### Methods <a name="Methods" id="methods"></a>

| **Name** | **Description** |
| --- | --- |
| [`enableAwsServiceAccess`](#pepperizecdkorganizationsorganizationenableawsserviceaccess) | Enables trusted access for a supported AWS service (trusted service), which performs tasks in your organization and its accounts on your behalf. |
| [`enablePolicyType`](#pepperizecdkorganizationsorganizationenablepolicytype) | Enables policy types in the following two broad categories: Authorization policies and Management policies. |

---

##### `enableAwsServiceAccess` <a name="@pepperize/cdk-organizations.Organization.enableAwsServiceAccess" id="pepperizecdkorganizationsorganizationenableawsserviceaccess"></a>

```typescript
public enableAwsServiceAccess(servicePrincipal: string)
```

###### `servicePrincipal`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Organization.parameter.servicePrincipal" id="pepperizecdkorganizationsorganizationparameterserviceprincipal"></a>

- *Type:* `string`

The supported AWS service that you specify.

---

##### `enablePolicyType` <a name="@pepperize/cdk-organizations.Organization.enablePolicyType" id="pepperizecdkorganizationsorganizationenablepolicytype"></a>

```typescript
public enablePolicyType(policyType: PolicyType)
```

###### `policyType`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Organization.parameter.policyType" id="pepperizecdkorganizationsorganizationparameterpolicytype"></a>

- *Type:* [`@pepperize/cdk-organizations.PolicyType`](#@pepperize/cdk-organizations.PolicyType)

: the type of the policy that you specify.

---


#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`featureSet`](#pepperizecdkorganizationsorganizationpropertyfeatureset)<span title="Required">*</span> | [`@pepperize/cdk-organizations.FeatureSet`](#@pepperize/cdk-organizations.FeatureSet) | Specifies the functionality that currently is available to the organization. |
| [`managementAccountArn`](#pepperizecdkorganizationsorganizationpropertymanagementaccountarn)<span title="Required">*</span> | `string` | The Amazon Resource Name (ARN) of the account that is designated as the management account for the organization. |
| [`managementAccountEmail`](#pepperizecdkorganizationsorganizationpropertymanagementaccountemail)<span title="Required">*</span> | `string` | The email address that is associated with the AWS account that is designated as the management account for the organization. |
| [`managementAccountId`](#pepperizecdkorganizationsorganizationpropertymanagementaccountid)<span title="Required">*</span> | `string` | The unique identifier (ID) of the management account of an organization. |
| [`organizationArn`](#pepperizecdkorganizationsorganizationpropertyorganizationarn)<span title="Required">*</span> | `string` | The Amazon Resource Name (ARN) of an organization. |
| [`organizationId`](#pepperizecdkorganizationsorganizationpropertyorganizationid)<span title="Required">*</span> | `string` | The unique identifier (ID) of an organization. |
| [`root`](#pepperizecdkorganizationsorganizationpropertyroot)<span title="Required">*</span> | [`@pepperize/cdk-organizations.Root`](#@pepperize/cdk-organizations.Root) | The root of the current organization, which is automatically created. |

---

##### `featureSet`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Organization.property.featureSet" id="pepperizecdkorganizationsorganizationpropertyfeatureset"></a>

```typescript
public readonly featureSet: FeatureSet;
```

- *Type:* [`@pepperize/cdk-organizations.FeatureSet`](#@pepperize/cdk-organizations.FeatureSet)

Specifies the functionality that currently is available to the organization.

If set to "ALL", then all features are enabled and policies can be applied to accounts in the organization. If set to "CONSOLIDATED_BILLING", then only consolidated billing functionality is available.

---

##### `managementAccountArn`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Organization.property.managementAccountArn" id="pepperizecdkorganizationsorganizationpropertymanagementaccountarn"></a>

```typescript
public readonly managementAccountArn: string;
```

- *Type:* `string`

The Amazon Resource Name (ARN) of the account that is designated as the management account for the organization.

---

##### `managementAccountEmail`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Organization.property.managementAccountEmail" id="pepperizecdkorganizationsorganizationpropertymanagementaccountemail"></a>

```typescript
public readonly managementAccountEmail: string;
```

- *Type:* `string`

The email address that is associated with the AWS account that is designated as the management account for the organization.

---

##### `managementAccountId`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Organization.property.managementAccountId" id="pepperizecdkorganizationsorganizationpropertymanagementaccountid"></a>

```typescript
public readonly managementAccountId: string;
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

- *Implements:* [`@pepperize/cdk-organizations.IOrganizationalUnit`](#@pepperize/cdk-organizations.IOrganizationalUnit), [`@pepperize/cdk-organizations.ITaggableResource`](#@pepperize/cdk-organizations.ITaggableResource)

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

#### Methods <a name="Methods" id="methods"></a>

| **Name** | **Description** |
| --- | --- |
| [`identifier`](#pepperizecdkorganizationsorganizationalunitidentifier) | The unique identifier (ID) of the parent root, organizational unit (OU), account, or policy that you want to create the new OU in. |

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
| [`tags`](#pepperizecdkorganizationsorganizationalunitpropertytags)<span title="Required">*</span> | [`aws-cdk-lib.TagManager`](#aws-cdk-lib.TagManager) | TagManager to set, remove and format tags. |

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

##### `tags`<sup>Required</sup> <a name="@pepperize/cdk-organizations.OrganizationalUnit.property.tags" id="pepperizecdkorganizationsorganizationalunitpropertytags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* [`aws-cdk-lib.TagManager`](#aws-cdk-lib.TagManager)

TagManager to set, remove and format tags.

---


### Parent <a name="@pepperize/cdk-organizations.Parent" id="pepperizecdkorganizationsparent"></a>

#### Initializers <a name="@pepperize/cdk-organizations.Parent.Initializer" id="pepperizecdkorganizationsparentinitializer"></a>

```typescript
import { Parent } from '@pepperize/cdk-organizations'

new Parent(scope: Construct, id: string, props: ParentProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`scope`](#pepperizecdkorganizationsparentparameterscope)<span title="Required">*</span> | [`constructs.Construct`](#constructs.Construct) | *No description.* |
| [`id`](#pepperizecdkorganizationsparentparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`props`](#pepperizecdkorganizationsparentparameterprops)<span title="Required">*</span> | [`@pepperize/cdk-organizations.ParentProps`](#@pepperize/cdk-organizations.ParentProps) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Parent.parameter.scope" id="pepperizecdkorganizationsparentparameterscope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

##### `id`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Parent.parameter.id" id="pepperizecdkorganizationsparentparameterid"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Parent.parameter.props" id="pepperizecdkorganizationsparentparameterprops"></a>

- *Type:* [`@pepperize/cdk-organizations.ParentProps`](#@pepperize/cdk-organizations.ParentProps)

---


#### Static Functions <a name="Static Functions" id="static-functions"></a>

| **Name** | **Description** |
| --- | --- |
| [`fromChildId`](#pepperizecdkorganizationsparentfromchildid) | *No description.* |

---

##### `fromChildId` <a name="@pepperize/cdk-organizations.Parent.fromChildId" id="pepperizecdkorganizationsparentfromchildid"></a>

```typescript
import { Parent } from '@pepperize/cdk-organizations'

Parent.fromChildId(scope: Construct, id: string, childId: string)
```

###### `scope`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Parent.parameter.scope" id="pepperizecdkorganizationsparentparameterscope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

###### `id`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Parent.parameter.id" id="pepperizecdkorganizationsparentparameterid"></a>

- *Type:* `string`

---

###### `childId`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Parent.parameter.childId" id="pepperizecdkorganizationsparentparameterchildid"></a>

- *Type:* `string`

---



### ParentBase <a name="@pepperize/cdk-organizations.ParentBase" id="pepperizecdkorganizationsparentbase"></a>

- *Implements:* [`@pepperize/cdk-organizations.IParent`](#@pepperize/cdk-organizations.IParent)

#### Initializers <a name="@pepperize/cdk-organizations.ParentBase.Initializer" id="pepperizecdkorganizationsparentbaseinitializer"></a>

```typescript
import { ParentBase } from '@pepperize/cdk-organizations'

new ParentBase(scope: Construct, id: string, props: ParentBaseProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`scope`](#pepperizecdkorganizationsparentbaseparameterscope)<span title="Required">*</span> | [`constructs.Construct`](#constructs.Construct) | *No description.* |
| [`id`](#pepperizecdkorganizationsparentbaseparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`props`](#pepperizecdkorganizationsparentbaseparameterprops)<span title="Required">*</span> | [`@pepperize/cdk-organizations.ParentBaseProps`](#@pepperize/cdk-organizations.ParentBaseProps) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="@pepperize/cdk-organizations.ParentBase.parameter.scope" id="pepperizecdkorganizationsparentbaseparameterscope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

##### `id`<sup>Required</sup> <a name="@pepperize/cdk-organizations.ParentBase.parameter.id" id="pepperizecdkorganizationsparentbaseparameterid"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@pepperize/cdk-organizations.ParentBase.parameter.props" id="pepperizecdkorganizationsparentbaseparameterprops"></a>

- *Type:* [`@pepperize/cdk-organizations.ParentBaseProps`](#@pepperize/cdk-organizations.ParentBaseProps)

---

#### Methods <a name="Methods" id="methods"></a>

| **Name** | **Description** |
| --- | --- |
| [`identifier`](#pepperizecdkorganizationsparentbaseidentifier) | The unique identifier (ID) of the parent root, organizational unit (OU), account, or policy that you want to create the new OU in. |

---

##### `identifier` <a name="@pepperize/cdk-organizations.ParentBase.identifier" id="pepperizecdkorganizationsparentbaseidentifier"></a>

```typescript
public identifier()
```


#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`parentId`](#pepperizecdkorganizationsparentbasepropertyparentid)<span title="Required">*</span> | `string` | *No description.* |

---

##### `parentId`<sup>Required</sup> <a name="@pepperize/cdk-organizations.ParentBase.property.parentId" id="pepperizecdkorganizationsparentbasepropertyparentid"></a>

```typescript
public readonly parentId: string;
```

- *Type:* `string`

---


### Policy <a name="@pepperize/cdk-organizations.Policy" id="pepperizecdkorganizationspolicy"></a>

- *Implements:* [`@pepperize/cdk-organizations.IPolicy`](#@pepperize/cdk-organizations.IPolicy), [`@pepperize/cdk-organizations.ITaggableResource`](#@pepperize/cdk-organizations.ITaggableResource)

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

#### Methods <a name="Methods" id="methods"></a>

| **Name** | **Description** |
| --- | --- |
| [`identifier`](#pepperizecdkorganizationspolicyidentifier) | *No description.* |

---

##### `identifier` <a name="@pepperize/cdk-organizations.Policy.identifier" id="pepperizecdkorganizationspolicyidentifier"></a>

```typescript
public identifier()
```


#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`policyId`](#pepperizecdkorganizationspolicypropertypolicyid)<span title="Required">*</span> | `string` | The unique identifier (ID) of the policy. |
| [`tags`](#pepperizecdkorganizationspolicypropertytags)<span title="Required">*</span> | [`aws-cdk-lib.TagManager`](#aws-cdk-lib.TagManager) | TagManager to set, remove and format tags. |

---

##### `policyId`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Policy.property.policyId" id="pepperizecdkorganizationspolicypropertypolicyid"></a>

```typescript
public readonly policyId: string;
```

- *Type:* `string`

The unique identifier (ID) of the policy.

The regex pattern for a policy ID string requires "p-" followed by from 8 to 128 lowercase or uppercase letters, digits, or the underscore character (_).

---

##### `tags`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Policy.property.tags" id="pepperizecdkorganizationspolicypropertytags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* [`aws-cdk-lib.TagManager`](#aws-cdk-lib.TagManager)

TagManager to set, remove and format tags.

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
| [`scope`](#pepperizecdkorganizationspolicyattachmentparameterscope)<span title="Required">*</span> | [`constructs.Construct`](#constructs.Construct) | *No description.* |
| [`id`](#pepperizecdkorganizationspolicyattachmentparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`props`](#pepperizecdkorganizationspolicyattachmentparameterprops)<span title="Required">*</span> | [`@pepperize/cdk-organizations.PolicyAttachmentProps`](#@pepperize/cdk-organizations.PolicyAttachmentProps) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="@pepperize/cdk-organizations.PolicyAttachment.parameter.scope" id="pepperizecdkorganizationspolicyattachmentparameterscope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

##### `id`<sup>Required</sup> <a name="@pepperize/cdk-organizations.PolicyAttachment.parameter.id" id="pepperizecdkorganizationspolicyattachmentparameterid"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@pepperize/cdk-organizations.PolicyAttachment.parameter.props" id="pepperizecdkorganizationspolicyattachmentparameterprops"></a>

- *Type:* [`@pepperize/cdk-organizations.PolicyAttachmentProps`](#@pepperize/cdk-organizations.PolicyAttachmentProps)

---





### Root <a name="@pepperize/cdk-organizations.Root" id="pepperizecdkorganizationsroot"></a>

- *Implements:* [`@pepperize/cdk-organizations.IParent`](#@pepperize/cdk-organizations.IParent), [`@pepperize/cdk-organizations.IPolicyAttachmentTarget`](#@pepperize/cdk-organizations.IPolicyAttachmentTarget), [`@pepperize/cdk-organizations.ITaggableResource`](#@pepperize/cdk-organizations.ITaggableResource)

The parent container for all the accounts for your organization.

If you apply a policy to the root, it applies to all organizational units (OUs) and accounts in the organization. <strong>Currently, you can have only one root. AWS Organizations automatically creates it for you when you create an organization.</strong>

> https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html

#### Initializers <a name="@pepperize/cdk-organizations.Root.Initializer" id="pepperizecdkorganizationsrootinitializer"></a>

```typescript
import { Root } from '@pepperize/cdk-organizations'

new Root(scope: Construct, id: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`scope`](#pepperizecdkorganizationsrootparameterscope)<span title="Required">*</span> | [`constructs.Construct`](#constructs.Construct) | *No description.* |
| [`id`](#pepperizecdkorganizationsrootparameterid)<span title="Required">*</span> | `string` | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Root.parameter.scope" id="pepperizecdkorganizationsrootparameterscope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

##### `id`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Root.parameter.id" id="pepperizecdkorganizationsrootparameterid"></a>

- *Type:* `string`

---

#### Methods <a name="Methods" id="methods"></a>

| **Name** | **Description** |
| --- | --- |
| [`identifier`](#pepperizecdkorganizationsrootidentifier) | The unique identifier (ID) of the parent root, organizational unit (OU), account, or policy that you want to create the new OU in. |

---

##### `identifier` <a name="@pepperize/cdk-organizations.Root.identifier" id="pepperizecdkorganizationsrootidentifier"></a>

```typescript
public identifier()
```


#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`rootId`](#pepperizecdkorganizationsrootpropertyrootid)<span title="Required">*</span> | `string` | The unique identifier (ID) for the root. |
| [`tags`](#pepperizecdkorganizationsrootpropertytags)<span title="Required">*</span> | [`aws-cdk-lib.TagManager`](#aws-cdk-lib.TagManager) | TagManager to set, remove and format tags. |

---

##### `rootId`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Root.property.rootId" id="pepperizecdkorganizationsrootpropertyrootid"></a>

```typescript
public readonly rootId: string;
```

- *Type:* `string`

The unique identifier (ID) for the root.

The regex pattern for a root ID string requires "r-" followed by from 4 to 32 lowercase letters or digits.

---

##### `tags`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Root.property.tags" id="pepperizecdkorganizationsrootpropertytags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* [`aws-cdk-lib.TagManager`](#aws-cdk-lib.TagManager)

TagManager to set, remove and format tags.

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
| [`scope`](#pepperizecdkorganizationstagresourceparameterscope)<span title="Required">*</span> | [`constructs.Construct`](#constructs.Construct) | *No description.* |
| [`id`](#pepperizecdkorganizationstagresourceparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`props`](#pepperizecdkorganizationstagresourceparameterprops)<span title="Required">*</span> | [`@pepperize/cdk-organizations.TagResourceProps`](#@pepperize/cdk-organizations.TagResourceProps) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="@pepperize/cdk-organizations.TagResource.parameter.scope" id="pepperizecdkorganizationstagresourceparameterscope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

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
| [`importOnDuplicate`](#pepperizecdkorganizationsaccountpropspropertyimportonduplicate) | `boolean` | Whether to import, if a duplicate account with same name and email already exists. |
| [`parent`](#pepperizecdkorganizationsaccountpropspropertyparent) | [`@pepperize/cdk-organizations.IParent`](#@pepperize/cdk-organizations.IParent) | The parent root or OU that you want to create the new Account in. |
| [`removalPolicy`](#pepperizecdkorganizationsaccountpropspropertyremovalpolicy) | [`aws-cdk-lib.RemovalPolicy`](#aws-cdk-lib.RemovalPolicy) | If set to RemovalPolicy.DESTROY, the account will be moved to the root. |
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

##### `importOnDuplicate`<sup>Optional</sup> <a name="@pepperize/cdk-organizations.AccountProps.property.importOnDuplicate" id="pepperizecdkorganizationsaccountpropspropertyimportonduplicate"></a>

```typescript
public readonly importOnDuplicate: boolean;
```

- *Type:* `boolean`
- *Default:* true

Whether to import, if a duplicate account with same name and email already exists.

---

##### `parent`<sup>Optional</sup> <a name="@pepperize/cdk-organizations.AccountProps.property.parent" id="pepperizecdkorganizationsaccountpropspropertyparent"></a>

```typescript
public readonly parent: IParent;
```

- *Type:* [`@pepperize/cdk-organizations.IParent`](#@pepperize/cdk-organizations.IParent)

The parent root or OU that you want to create the new Account in.

---

##### `removalPolicy`<sup>Optional</sup> <a name="@pepperize/cdk-organizations.AccountProps.property.removalPolicy" id="pepperizecdkorganizationsaccountpropspropertyremovalpolicy"></a>

```typescript
public readonly removalPolicy: RemovalPolicy;
```

- *Type:* [`aws-cdk-lib.RemovalPolicy`](#aws-cdk-lib.RemovalPolicy)
- *Default:* RemovalPolicy.Retain

If set to RemovalPolicy.DESTROY, the account will be moved to the root.

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
| [`account`](#pepperizecdkorganizationsdelegatedadministratorpropspropertyaccount)<span title="Required">*</span> | [`@pepperize/cdk-organizations.IAccount`](#@pepperize/cdk-organizations.IAccount) | The member account in the organization to register as a delegated administrator. |
| [`servicePrincipal`](#pepperizecdkorganizationsdelegatedadministratorpropspropertyserviceprincipal)<span title="Required">*</span> | `string` | The service principal of the AWS service for which you want to make the member account a delegated administrator. |

---

##### `account`<sup>Required</sup> <a name="@pepperize/cdk-organizations.DelegatedAdministratorProps.property.account" id="pepperizecdkorganizationsdelegatedadministratorpropspropertyaccount"></a>

```typescript
public readonly account: IAccount;
```

- *Type:* [`@pepperize/cdk-organizations.IAccount`](#@pepperize/cdk-organizations.IAccount)

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

### EnablePolicyTypeProps <a name="@pepperize/cdk-organizations.EnablePolicyTypeProps" id="pepperizecdkorganizationsenablepolicytypeprops"></a>

#### Initializer <a name="[object Object].Initializer" id="object-objectinitializer"></a>

```typescript
import { EnablePolicyTypeProps } from '@pepperize/cdk-organizations'

const enablePolicyTypeProps: EnablePolicyTypeProps = { ... }
```

#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`policyType`](#pepperizecdkorganizationsenablepolicytypepropspropertypolicytype)<span title="Required">*</span> | [`@pepperize/cdk-organizations.PolicyType`](#@pepperize/cdk-organizations.PolicyType) | *No description.* |
| [`root`](#pepperizecdkorganizationsenablepolicytypepropspropertyroot)<span title="Required">*</span> | [`@pepperize/cdk-organizations.Root`](#@pepperize/cdk-organizations.Root) | *No description.* |

---

##### `policyType`<sup>Required</sup> <a name="@pepperize/cdk-organizations.EnablePolicyTypeProps.property.policyType" id="pepperizecdkorganizationsenablepolicytypepropspropertypolicytype"></a>

```typescript
public readonly policyType: PolicyType;
```

- *Type:* [`@pepperize/cdk-organizations.PolicyType`](#@pepperize/cdk-organizations.PolicyType)

---

##### `root`<sup>Required</sup> <a name="@pepperize/cdk-organizations.EnablePolicyTypeProps.property.root" id="pepperizecdkorganizationsenablepolicytypepropspropertyroot"></a>

```typescript
public readonly root: Root;
```

- *Type:* [`@pepperize/cdk-organizations.Root`](#@pepperize/cdk-organizations.Root)

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
| [`importOnDuplicate`](#pepperizecdkorganizationsorganizationalunitpropspropertyimportonduplicate) | `boolean` | Whether to import, if a duplicate organizational unit with same name exists in the parent exists. |
| [`removalPolicy`](#pepperizecdkorganizationsorganizationalunitpropspropertyremovalpolicy) | [`aws-cdk-lib.RemovalPolicy`](#aws-cdk-lib.RemovalPolicy) | If set to RemovalPolicy.DESTROY, the organizational unit will be deleted. |

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

##### `importOnDuplicate`<sup>Optional</sup> <a name="@pepperize/cdk-organizations.OrganizationalUnitProps.property.importOnDuplicate" id="pepperizecdkorganizationsorganizationalunitpropspropertyimportonduplicate"></a>

```typescript
public readonly importOnDuplicate: boolean;
```

- *Type:* `boolean`
- *Default:* true

Whether to import, if a duplicate organizational unit with same name exists in the parent exists.

---

##### `removalPolicy`<sup>Optional</sup> <a name="@pepperize/cdk-organizations.OrganizationalUnitProps.property.removalPolicy" id="pepperizecdkorganizationsorganizationalunitpropspropertyremovalpolicy"></a>

```typescript
public readonly removalPolicy: RemovalPolicy;
```

- *Type:* [`aws-cdk-lib.RemovalPolicy`](#aws-cdk-lib.RemovalPolicy)
- *Default:* RemovalPolicy.Retain

If set to RemovalPolicy.DESTROY, the organizational unit will be deleted.

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

### ParentBaseProps <a name="@pepperize/cdk-organizations.ParentBaseProps" id="pepperizecdkorganizationsparentbaseprops"></a>

#### Initializer <a name="[object Object].Initializer" id="object-objectinitializer"></a>

```typescript
import { ParentBaseProps } from '@pepperize/cdk-organizations'

const parentBaseProps: ParentBaseProps = { ... }
```

#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`childId`](#pepperizecdkorganizationsparentbasepropspropertychildid)<span title="Required">*</span> | `string` | *No description.* |

---

##### `childId`<sup>Required</sup> <a name="@pepperize/cdk-organizations.ParentBaseProps.property.childId" id="pepperizecdkorganizationsparentbasepropspropertychildid"></a>

```typescript
public readonly childId: string;
```

- *Type:* `string`

---

### ParentProps <a name="@pepperize/cdk-organizations.ParentProps" id="pepperizecdkorganizationsparentprops"></a>

#### Initializer <a name="[object Object].Initializer" id="object-objectinitializer"></a>

```typescript
import { ParentProps } from '@pepperize/cdk-organizations'

const parentProps: ParentProps = { ... }
```

#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`child`](#pepperizecdkorganizationsparentpropspropertychild)<span title="Required">*</span> | [`@pepperize/cdk-organizations.IChild`](#@pepperize/cdk-organizations.IChild) | *No description.* |

---

##### `child`<sup>Required</sup> <a name="@pepperize/cdk-organizations.ParentProps.property.child" id="pepperizecdkorganizationsparentpropspropertychild"></a>

```typescript
public readonly child: IChild;
```

- *Type:* [`@pepperize/cdk-organizations.IChild`](#@pepperize/cdk-organizations.IChild)

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
| [`policy`](#pepperizecdkorganizationspolicyattachmentpropspropertypolicy)<span title="Required">*</span> | [`@pepperize/cdk-organizations.IPolicy`](#@pepperize/cdk-organizations.IPolicy) | The policy that you want to attach to the target. |
| [`target`](#pepperizecdkorganizationspolicyattachmentpropspropertytarget)<span title="Required">*</span> | [`@pepperize/cdk-organizations.IPolicyAttachmentTarget`](#@pepperize/cdk-organizations.IPolicyAttachmentTarget) | The root, OU, or account that you want to attach the policy to. |

---

##### `policy`<sup>Required</sup> <a name="@pepperize/cdk-organizations.PolicyAttachmentProps.property.policy" id="pepperizecdkorganizationspolicyattachmentpropspropertypolicy"></a>

```typescript
public readonly policy: IPolicy;
```

- *Type:* [`@pepperize/cdk-organizations.IPolicy`](#@pepperize/cdk-organizations.IPolicy)

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

### TagResourceProps <a name="@pepperize/cdk-organizations.TagResourceProps" id="pepperizecdkorganizationstagresourceprops"></a>

#### Initializer <a name="[object Object].Initializer" id="object-objectinitializer"></a>

```typescript
import { TagResourceProps } from '@pepperize/cdk-organizations'

const tagResourceProps: TagResourceProps = { ... }
```

#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`resourceId`](#pepperizecdkorganizationstagresourcepropspropertyresourceid)<span title="Required">*</span> | `string` | *No description.* |
| [`tags`](#pepperizecdkorganizationstagresourcepropspropertytags)<span title="Required">*</span> | [`aws-cdk-lib.IResolvable`](#aws-cdk-lib.IResolvable) | *No description.* |

---

##### `resourceId`<sup>Required</sup> <a name="@pepperize/cdk-organizations.TagResourceProps.property.resourceId" id="pepperizecdkorganizationstagresourcepropspropertyresourceid"></a>

```typescript
public readonly resourceId: string;
```

- *Type:* `string`

---

##### `tags`<sup>Required</sup> <a name="@pepperize/cdk-organizations.TagResourceProps.property.tags" id="pepperizecdkorganizationstagresourcepropspropertytags"></a>

```typescript
public readonly tags: IResolvable;
```

- *Type:* [`aws-cdk-lib.IResolvable`](#aws-cdk-lib.IResolvable)

---

## Classes <a name="Classes" id="classes"></a>

### Validators <a name="@pepperize/cdk-organizations.Validators" id="pepperizecdkorganizationsvalidators"></a>

#### Initializers <a name="@pepperize/cdk-organizations.Validators.Initializer" id="pepperizecdkorganizationsvalidatorsinitializer"></a>

```typescript
import { Validators } from '@pepperize/cdk-organizations'

new Validators()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="methods"></a>

| **Name** | **Description** |
| --- | --- |
| [`accountId`](#pepperizecdkorganizationsvalidatorsaccountid) | *No description.* |
| [`accountName`](#pepperizecdkorganizationsvalidatorsaccountname) | *No description.* |
| [`email`](#pepperizecdkorganizationsvalidatorsemail) | *No description.* |
| [`organizationalUnitName`](#pepperizecdkorganizationsvalidatorsorganizationalunitname) | *No description.* |
| [`policyContent`](#pepperizecdkorganizationsvalidatorspolicycontent) | *No description.* |
| [`servicePrincipal`](#pepperizecdkorganizationsvalidatorsserviceprincipal) | *No description.* |

---

##### `accountId` <a name="@pepperize/cdk-organizations.Validators.accountId" id="pepperizecdkorganizationsvalidatorsaccountid"></a>

```typescript
public accountId(id: string)
```

###### `id`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Validators.parameter.id" id="pepperizecdkorganizationsvalidatorsparameterid"></a>

- *Type:* `string`

---

##### `accountName` <a name="@pepperize/cdk-organizations.Validators.accountName" id="pepperizecdkorganizationsvalidatorsaccountname"></a>

```typescript
public accountName(name: string)
```

###### `name`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Validators.parameter.name" id="pepperizecdkorganizationsvalidatorsparametername"></a>

- *Type:* `string`

---

##### `email` <a name="@pepperize/cdk-organizations.Validators.email" id="pepperizecdkorganizationsvalidatorsemail"></a>

```typescript
public email(email: string)
```

###### `email`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Validators.parameter.email" id="pepperizecdkorganizationsvalidatorsparameteremail"></a>

- *Type:* `string`

---

##### `organizationalUnitName` <a name="@pepperize/cdk-organizations.Validators.organizationalUnitName" id="pepperizecdkorganizationsvalidatorsorganizationalunitname"></a>

```typescript
public organizationalUnitName(name: string)
```

###### `name`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Validators.parameter.name" id="pepperizecdkorganizationsvalidatorsparametername"></a>

- *Type:* `string`

---

##### `policyContent` <a name="@pepperize/cdk-organizations.Validators.policyContent" id="pepperizecdkorganizationsvalidatorspolicycontent"></a>

```typescript
public policyContent(content: string)
```

###### `content`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Validators.parameter.content" id="pepperizecdkorganizationsvalidatorsparametercontent"></a>

- *Type:* `string`

---

##### `servicePrincipal` <a name="@pepperize/cdk-organizations.Validators.servicePrincipal" id="pepperizecdkorganizationsvalidatorsserviceprincipal"></a>

```typescript
public servicePrincipal(servicePrincipal: string)
```

###### `servicePrincipal`<sup>Required</sup> <a name="@pepperize/cdk-organizations.Validators.parameter.servicePrincipal" id="pepperizecdkorganizationsvalidatorsparameterserviceprincipal"></a>

- *Type:* `string`

---

#### Static Functions <a name="Static Functions" id="static-functions"></a>

| **Name** | **Description** |
| --- | --- |
| [`of`](#pepperizecdkorganizationsvalidatorsof) | *No description.* |

---

##### `of` <a name="@pepperize/cdk-organizations.Validators.of" id="pepperizecdkorganizationsvalidatorsof"></a>

```typescript
import { Validators } from '@pepperize/cdk-organizations'

Validators.of()
```



## Protocols <a name="Protocols" id="protocols"></a>

### IAccount <a name="@pepperize/cdk-organizations.IAccount" id="pepperizecdkorganizationsiaccount"></a>

- *Extends:* [`@pepperize/cdk-organizations.IPolicyAttachmentTarget`](#@pepperize/cdk-organizations.IPolicyAttachmentTarget), [`@pepperize/cdk-organizations.IChild`](#@pepperize/cdk-organizations.IChild), [`constructs.IConstruct`](#constructs.IConstruct), [`@pepperize/cdk-organizations.IResource`](#@pepperize/cdk-organizations.IResource)

- *Implemented By:* [`@pepperize/cdk-organizations.Account`](#@pepperize/cdk-organizations.Account), [`@pepperize/cdk-organizations.IAccount`](#@pepperize/cdk-organizations.IAccount)

#### Methods <a name="Methods" id="methods"></a>

| **Name** | **Description** |
| --- | --- |
| [`delegateAdministrator`](#pepperizecdkorganizationsiaccountdelegateadministrator) | Enables trusted access for the AWS service (trusted service) as <strong>Delegated Administrator</strong>, which performs tasks in your organization and its accounts on your behalf. |

---

##### `delegateAdministrator` <a name="@pepperize/cdk-organizations.IAccount.delegateAdministrator" id="pepperizecdkorganizationsiaccountdelegateadministrator"></a>

```typescript
public delegateAdministrator(servicePrincipal: string)
```

###### `servicePrincipal`<sup>Required</sup> <a name="@pepperize/cdk-organizations.IAccount.parameter.servicePrincipal" id="pepperizecdkorganizationsiaccountparameterserviceprincipal"></a>

- *Type:* `string`

The supported AWS service that you specify.

---

#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`node`](#pepperizecdkorganizationsiaccountpropertynode)<span title="Required">*</span> | [`constructs.Node`](#constructs.Node) | The tree node. |
| [`accountArn`](#pepperizecdkorganizationsiaccountpropertyaccountarn)<span title="Required">*</span> | `string` | The Amazon Resource Name (ARN) of the account. |
| [`accountId`](#pepperizecdkorganizationsiaccountpropertyaccountid)<span title="Required">*</span> | `string` | If the account was created successfully, the unique identifier (ID) of the new account. |
| [`accountName`](#pepperizecdkorganizationsiaccountpropertyaccountname)<span title="Required">*</span> | `string` | The friendly name of the account. |
| [`email`](#pepperizecdkorganizationsiaccountpropertyemail)<span title="Required">*</span> | `string` | The email address of the owner to assign to the new member account. |

---

##### `node`<sup>Required</sup> <a name="@pepperize/cdk-organizations.IAccount.property.node" id="pepperizecdkorganizationsiaccountpropertynode"></a>

```typescript
public readonly node: Node;
```

- *Type:* [`constructs.Node`](#constructs.Node)

The tree node.

---

##### `accountArn`<sup>Required</sup> <a name="@pepperize/cdk-organizations.IAccount.property.accountArn" id="pepperizecdkorganizationsiaccountpropertyaccountarn"></a>

```typescript
public readonly accountArn: string;
```

- *Type:* `string`

The Amazon Resource Name (ARN) of the account.

---

##### `accountId`<sup>Required</sup> <a name="@pepperize/cdk-organizations.IAccount.property.accountId" id="pepperizecdkorganizationsiaccountpropertyaccountid"></a>

```typescript
public readonly accountId: string;
```

- *Type:* `string`

If the account was created successfully, the unique identifier (ID) of the new account.

Exactly 12 digits.

---

##### `accountName`<sup>Required</sup> <a name="@pepperize/cdk-organizations.IAccount.property.accountName" id="pepperizecdkorganizationsiaccountpropertyaccountname"></a>

```typescript
public readonly accountName: string;
```

- *Type:* `string`

The friendly name of the account.

---

##### `email`<sup>Required</sup> <a name="@pepperize/cdk-organizations.IAccount.property.email" id="pepperizecdkorganizationsiaccountpropertyemail"></a>

```typescript
public readonly email: string;
```

- *Type:* `string`

The email address of the owner to assign to the new member account.

This email address must not already be associated with another AWS account. You must use a valid email address to complete account creation. You can't access the root user of the account or remove an account that was created with an invalid email address.

---

### IChild <a name="@pepperize/cdk-organizations.IChild" id="pepperizecdkorganizationsichild"></a>

- *Extends:* [`constructs.IConstruct`](#constructs.IConstruct), [`@pepperize/cdk-organizations.IResource`](#@pepperize/cdk-organizations.IResource)

- *Implemented By:* [`@pepperize/cdk-organizations.Account`](#@pepperize/cdk-organizations.Account), [`@pepperize/cdk-organizations.OrganizationalUnit`](#@pepperize/cdk-organizations.OrganizationalUnit), [`@pepperize/cdk-organizations.IAccount`](#@pepperize/cdk-organizations.IAccount), [`@pepperize/cdk-organizations.IChild`](#@pepperize/cdk-organizations.IChild), [`@pepperize/cdk-organizations.IOrganizationalUnit`](#@pepperize/cdk-organizations.IOrganizationalUnit)


#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`node`](#pepperizecdkorganizationsichildpropertynode)<span title="Required">*</span> | [`constructs.Node`](#constructs.Node) | The tree node. |

---

##### `node`<sup>Required</sup> <a name="@pepperize/cdk-organizations.IChild.property.node" id="pepperizecdkorganizationsichildpropertynode"></a>

```typescript
public readonly node: Node;
```

- *Type:* [`constructs.Node`](#constructs.Node)

The tree node.

---

### IOrganization <a name="@pepperize/cdk-organizations.IOrganization" id="pepperizecdkorganizationsiorganization"></a>

- *Extends:* [`constructs.IConstruct`](#constructs.IConstruct)

- *Implemented By:* [`@pepperize/cdk-organizations.Organization`](#@pepperize/cdk-organizations.Organization), [`@pepperize/cdk-organizations.IOrganization`](#@pepperize/cdk-organizations.IOrganization)

Creates an organization to consolidate your AWS accounts so that you can administer them as a single unit.

An organization has one management account along with zero or more member accounts. You can organize the accounts in a hierarchical, tree-like structure with a root at the top and organizational units nested under the root. Each account can be directly in the root, or placed in one of the OUs in the hierarchy. An organization has the functionality that is determined by the feature set that you enable.  <strong>The account whose user is calling the CreateOrganization operation automatically becomes the management account of the new organization.</strong>  <strong>For deletion of an organization you must previously remove all the member accounts, OUs, and policies from the organization!</strong>

> https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_org_create.html#create-org

#### Methods <a name="Methods" id="methods"></a>

| **Name** | **Description** |
| --- | --- |
| [`enableAwsServiceAccess`](#pepperizecdkorganizationsiorganizationenableawsserviceaccess) | Enables trusted access for a supported AWS service (trusted service), which performs tasks in your organization and its accounts on your behalf. |
| [`enablePolicyType`](#pepperizecdkorganizationsiorganizationenablepolicytype) | Enables policy types in the following two broad categories: Authorization policies and Management policies. |

---

##### `enableAwsServiceAccess` <a name="@pepperize/cdk-organizations.IOrganization.enableAwsServiceAccess" id="pepperizecdkorganizationsiorganizationenableawsserviceaccess"></a>

```typescript
public enableAwsServiceAccess(servicePrincipal: string)
```

###### `servicePrincipal`<sup>Required</sup> <a name="@pepperize/cdk-organizations.IOrganization.parameter.servicePrincipal" id="pepperizecdkorganizationsiorganizationparameterserviceprincipal"></a>

- *Type:* `string`

The supported AWS service that you specify.

---

##### `enablePolicyType` <a name="@pepperize/cdk-organizations.IOrganization.enablePolicyType" id="pepperizecdkorganizationsiorganizationenablepolicytype"></a>

```typescript
public enablePolicyType(policyType: PolicyType)
```

###### `policyType`<sup>Required</sup> <a name="@pepperize/cdk-organizations.IOrganization.parameter.policyType" id="pepperizecdkorganizationsiorganizationparameterpolicytype"></a>

- *Type:* [`@pepperize/cdk-organizations.PolicyType`](#@pepperize/cdk-organizations.PolicyType)

: the type of the policy that you specify.

---

#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`node`](#pepperizecdkorganizationsiorganizationpropertynode)<span title="Required">*</span> | [`constructs.Node`](#constructs.Node) | The tree node. |
| [`featureSet`](#pepperizecdkorganizationsiorganizationpropertyfeatureset)<span title="Required">*</span> | [`@pepperize/cdk-organizations.FeatureSet`](#@pepperize/cdk-organizations.FeatureSet) | Specifies the functionality that currently is available to the organization. |
| [`managementAccountArn`](#pepperizecdkorganizationsiorganizationpropertymanagementaccountarn)<span title="Required">*</span> | `string` | The Amazon Resource Name (ARN) of the account that is designated as the management account for the organization. |
| [`managementAccountEmail`](#pepperizecdkorganizationsiorganizationpropertymanagementaccountemail)<span title="Required">*</span> | `string` | The email address that is associated with the AWS account that is designated as the management account for the organization. |
| [`managementAccountId`](#pepperizecdkorganizationsiorganizationpropertymanagementaccountid)<span title="Required">*</span> | `string` | The unique identifier (ID) of the management account of an organization. |
| [`organizationArn`](#pepperizecdkorganizationsiorganizationpropertyorganizationarn)<span title="Required">*</span> | `string` | The Amazon Resource Name (ARN) of an organization. |
| [`organizationId`](#pepperizecdkorganizationsiorganizationpropertyorganizationid)<span title="Required">*</span> | `string` | The unique identifier (ID) of an organization. |
| [`root`](#pepperizecdkorganizationsiorganizationpropertyroot)<span title="Required">*</span> | [`@pepperize/cdk-organizations.Root`](#@pepperize/cdk-organizations.Root) | The root of the current organization, which is automatically created. |

---

##### `node`<sup>Required</sup> <a name="@pepperize/cdk-organizations.IOrganization.property.node" id="pepperizecdkorganizationsiorganizationpropertynode"></a>

```typescript
public readonly node: Node;
```

- *Type:* [`constructs.Node`](#constructs.Node)

The tree node.

---

##### `featureSet`<sup>Required</sup> <a name="@pepperize/cdk-organizations.IOrganization.property.featureSet" id="pepperizecdkorganizationsiorganizationpropertyfeatureset"></a>

```typescript
public readonly featureSet: FeatureSet;
```

- *Type:* [`@pepperize/cdk-organizations.FeatureSet`](#@pepperize/cdk-organizations.FeatureSet)

Specifies the functionality that currently is available to the organization.

If set to "ALL", then all features are enabled and policies can be applied to accounts in the organization. If set to "CONSOLIDATED_BILLING", then only consolidated billing functionality is available.

---

##### `managementAccountArn`<sup>Required</sup> <a name="@pepperize/cdk-organizations.IOrganization.property.managementAccountArn" id="pepperizecdkorganizationsiorganizationpropertymanagementaccountarn"></a>

```typescript
public readonly managementAccountArn: string;
```

- *Type:* `string`

The Amazon Resource Name (ARN) of the account that is designated as the management account for the organization.

---

##### `managementAccountEmail`<sup>Required</sup> <a name="@pepperize/cdk-organizations.IOrganization.property.managementAccountEmail" id="pepperizecdkorganizationsiorganizationpropertymanagementaccountemail"></a>

```typescript
public readonly managementAccountEmail: string;
```

- *Type:* `string`

The email address that is associated with the AWS account that is designated as the management account for the organization.

---

##### `managementAccountId`<sup>Required</sup> <a name="@pepperize/cdk-organizations.IOrganization.property.managementAccountId" id="pepperizecdkorganizationsiorganizationpropertymanagementaccountid"></a>

```typescript
public readonly managementAccountId: string;
```

- *Type:* `string`

The unique identifier (ID) of the management account of an organization.

---

##### `organizationArn`<sup>Required</sup> <a name="@pepperize/cdk-organizations.IOrganization.property.organizationArn" id="pepperizecdkorganizationsiorganizationpropertyorganizationarn"></a>

```typescript
public readonly organizationArn: string;
```

- *Type:* `string`

The Amazon Resource Name (ARN) of an organization.

---

##### `organizationId`<sup>Required</sup> <a name="@pepperize/cdk-organizations.IOrganization.property.organizationId" id="pepperizecdkorganizationsiorganizationpropertyorganizationid"></a>

```typescript
public readonly organizationId: string;
```

- *Type:* `string`

The unique identifier (ID) of an organization.

The regex pattern for an organization ID string requires "o-" followed by from 10 to 32 lowercase letters or digits.

---

##### `root`<sup>Required</sup> <a name="@pepperize/cdk-organizations.IOrganization.property.root" id="pepperizecdkorganizationsiorganizationpropertyroot"></a>

```typescript
public readonly root: Root;
```

- *Type:* [`@pepperize/cdk-organizations.Root`](#@pepperize/cdk-organizations.Root)

The root of the current organization, which is automatically created.

---

### IOrganizationalUnit <a name="@pepperize/cdk-organizations.IOrganizationalUnit" id="pepperizecdkorganizationsiorganizationalunit"></a>

- *Extends:* [`@pepperize/cdk-organizations.IPolicyAttachmentTarget`](#@pepperize/cdk-organizations.IPolicyAttachmentTarget), [`@pepperize/cdk-organizations.IParent`](#@pepperize/cdk-organizations.IParent), [`@pepperize/cdk-organizations.IChild`](#@pepperize/cdk-organizations.IChild), [`constructs.IConstruct`](#constructs.IConstruct)

- *Implemented By:* [`@pepperize/cdk-organizations.OrganizationalUnit`](#@pepperize/cdk-organizations.OrganizationalUnit), [`@pepperize/cdk-organizations.IOrganizationalUnit`](#@pepperize/cdk-organizations.IOrganizationalUnit)

A container for accounts within a root.

An OU also can contain other OUs, enabling you to create a hierarchy that resembles an upside-down tree, with a root at the top and branches of OUs that reach down, ending in accounts that are the leaves of the tree. When you attach a policy to one of the nodes in the hierarchy, it flows down and affects all the branches (OUs) and leaves (accounts) beneath it. An OU can have exactly one parent, and currently each account can be a member of exactly one OU.  <strong>You must first move all accounts out of the OU and any child OUs, and then you can delete the child OUs.</strong>


#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`node`](#pepperizecdkorganizationsiorganizationalunitpropertynode)<span title="Required">*</span> | [`constructs.Node`](#constructs.Node) | The tree node. |
| [`organizationalUnitArn`](#pepperizecdkorganizationsiorganizationalunitpropertyorganizationalunitarn)<span title="Required">*</span> | `string` | The Amazon Resource Name (ARN) of this OU. |
| [`organizationalUnitId`](#pepperizecdkorganizationsiorganizationalunitpropertyorganizationalunitid)<span title="Required">*</span> | `string` | The unique identifier (ID) associated with this OU. |
| [`organizationalUnitName`](#pepperizecdkorganizationsiorganizationalunitpropertyorganizationalunitname)<span title="Required">*</span> | `string` | The friendly name of this OU. |

---

##### `node`<sup>Required</sup> <a name="@pepperize/cdk-organizations.IOrganizationalUnit.property.node" id="pepperizecdkorganizationsiorganizationalunitpropertynode"></a>

```typescript
public readonly node: Node;
```

- *Type:* [`constructs.Node`](#constructs.Node)

The tree node.

---

##### `organizationalUnitArn`<sup>Required</sup> <a name="@pepperize/cdk-organizations.IOrganizationalUnit.property.organizationalUnitArn" id="pepperizecdkorganizationsiorganizationalunitpropertyorganizationalunitarn"></a>

```typescript
public readonly organizationalUnitArn: string;
```

- *Type:* `string`

The Amazon Resource Name (ARN) of this OU.

For more information about ARNs in Organizations, see [ARN Formats Supported by Organizations](https://docs.aws.amazon.com/service-authorization/latest/reference/list_awsorganizations.html#awsorganizations-resources-for-iam-policies) in the AWS Service Authorization Reference.

---

##### `organizationalUnitId`<sup>Required</sup> <a name="@pepperize/cdk-organizations.IOrganizationalUnit.property.organizationalUnitId" id="pepperizecdkorganizationsiorganizationalunitpropertyorganizationalunitid"></a>

```typescript
public readonly organizationalUnitId: string;
```

- *Type:* `string`

The unique identifier (ID) associated with this OU.

The regex pattern for an organizational unit ID string requires "ou-" followed by from 4 to 32 lowercase letters or digits (the ID of the root that contains the OU). This string is followed by a second "-" dash and from 8 to 32 additional lowercase letters or digits.

---

##### `organizationalUnitName`<sup>Required</sup> <a name="@pepperize/cdk-organizations.IOrganizationalUnit.property.organizationalUnitName" id="pepperizecdkorganizationsiorganizationalunitpropertyorganizationalunitname"></a>

```typescript
public readonly organizationalUnitName: string;
```

- *Type:* `string`

The friendly name of this OU.

---

### IParent <a name="@pepperize/cdk-organizations.IParent" id="pepperizecdkorganizationsiparent"></a>

- *Extends:* [`constructs.IConstruct`](#constructs.IConstruct), [`@pepperize/cdk-organizations.IResource`](#@pepperize/cdk-organizations.IResource)

- *Implemented By:* [`@pepperize/cdk-organizations.OrganizationalUnit`](#@pepperize/cdk-organizations.OrganizationalUnit), [`@pepperize/cdk-organizations.Parent`](#@pepperize/cdk-organizations.Parent), [`@pepperize/cdk-organizations.ParentBase`](#@pepperize/cdk-organizations.ParentBase), [`@pepperize/cdk-organizations.Root`](#@pepperize/cdk-organizations.Root), [`@pepperize/cdk-organizations.IOrganizationalUnit`](#@pepperize/cdk-organizations.IOrganizationalUnit), [`@pepperize/cdk-organizations.IParent`](#@pepperize/cdk-organizations.IParent)


#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`node`](#pepperizecdkorganizationsiparentpropertynode)<span title="Required">*</span> | [`constructs.Node`](#constructs.Node) | The tree node. |

---

##### `node`<sup>Required</sup> <a name="@pepperize/cdk-organizations.IParent.property.node" id="pepperizecdkorganizationsiparentpropertynode"></a>

```typescript
public readonly node: Node;
```

- *Type:* [`constructs.Node`](#constructs.Node)

The tree node.

---

### IPolicy <a name="@pepperize/cdk-organizations.IPolicy" id="pepperizecdkorganizationsipolicy"></a>

- *Extends:* [`constructs.IConstruct`](#constructs.IConstruct)

- *Implemented By:* [`@pepperize/cdk-organizations.Policy`](#@pepperize/cdk-organizations.Policy), [`@pepperize/cdk-organizations.IPolicy`](#@pepperize/cdk-organizations.IPolicy)

Policies in AWS Organizations enable you to apply additional types of management to the AWS accounts in your organization.

<strong>You can use policies when all features are enabled in your organization.</strong>  <strong>Before you can create and attach a policy to your organization, you must enable that policy type for use.</strong>

> FeatureSet


#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`node`](#pepperizecdkorganizationsipolicypropertynode)<span title="Required">*</span> | [`constructs.Node`](#constructs.Node) | The tree node. |
| [`policyId`](#pepperizecdkorganizationsipolicypropertypolicyid)<span title="Required">*</span> | `string` | The unique identifier (ID) of the policy. |

---

##### `node`<sup>Required</sup> <a name="@pepperize/cdk-organizations.IPolicy.property.node" id="pepperizecdkorganizationsipolicypropertynode"></a>

```typescript
public readonly node: Node;
```

- *Type:* [`constructs.Node`](#constructs.Node)

The tree node.

---

##### `policyId`<sup>Required</sup> <a name="@pepperize/cdk-organizations.IPolicy.property.policyId" id="pepperizecdkorganizationsipolicypropertypolicyid"></a>

```typescript
public readonly policyId: string;
```

- *Type:* `string`

The unique identifier (ID) of the policy.

The regex pattern for a policy ID string requires "p-" followed by from 8 to 128 lowercase or uppercase letters, digits, or the underscore character (_).

---

### IPolicyAttachmentTarget <a name="@pepperize/cdk-organizations.IPolicyAttachmentTarget" id="pepperizecdkorganizationsipolicyattachmenttarget"></a>

- *Extends:* [`constructs.IDependable`](#constructs.IDependable), [`@pepperize/cdk-organizations.IResource`](#@pepperize/cdk-organizations.IResource)

- *Implemented By:* [`@pepperize/cdk-organizations.Account`](#@pepperize/cdk-organizations.Account), [`@pepperize/cdk-organizations.OrganizationalUnit`](#@pepperize/cdk-organizations.OrganizationalUnit), [`@pepperize/cdk-organizations.Root`](#@pepperize/cdk-organizations.Root), [`@pepperize/cdk-organizations.IAccount`](#@pepperize/cdk-organizations.IAccount), [`@pepperize/cdk-organizations.IOrganizationalUnit`](#@pepperize/cdk-organizations.IOrganizationalUnit), [`@pepperize/cdk-organizations.IPolicyAttachmentTarget`](#@pepperize/cdk-organizations.IPolicyAttachmentTarget)



### IResource <a name="@pepperize/cdk-organizations.IResource" id="pepperizecdkorganizationsiresource"></a>

- *Implemented By:* [`@pepperize/cdk-organizations.Account`](#@pepperize/cdk-organizations.Account), [`@pepperize/cdk-organizations.OrganizationalUnit`](#@pepperize/cdk-organizations.OrganizationalUnit), [`@pepperize/cdk-organizations.Parent`](#@pepperize/cdk-organizations.Parent), [`@pepperize/cdk-organizations.ParentBase`](#@pepperize/cdk-organizations.ParentBase), [`@pepperize/cdk-organizations.Root`](#@pepperize/cdk-organizations.Root), [`@pepperize/cdk-organizations.IAccount`](#@pepperize/cdk-organizations.IAccount), [`@pepperize/cdk-organizations.IChild`](#@pepperize/cdk-organizations.IChild), [`@pepperize/cdk-organizations.IOrganizationalUnit`](#@pepperize/cdk-organizations.IOrganizationalUnit), [`@pepperize/cdk-organizations.IParent`](#@pepperize/cdk-organizations.IParent), [`@pepperize/cdk-organizations.IPolicyAttachmentTarget`](#@pepperize/cdk-organizations.IPolicyAttachmentTarget), [`@pepperize/cdk-organizations.IResource`](#@pepperize/cdk-organizations.IResource)

Interface for an AWS Organizations resource.

#### Methods <a name="Methods" id="methods"></a>

| **Name** | **Description** |
| --- | --- |
| [`identifier`](#pepperizecdkorganizationsiresourceidentifier) | The unique identifier (ID) of the parent root, organizational unit (OU), account, or policy that you want to create the new OU in. |

---

##### `identifier` <a name="@pepperize/cdk-organizations.IResource.identifier" id="pepperizecdkorganizationsiresourceidentifier"></a>

```typescript
public identifier()
```


### ITaggableResource <a name="@pepperize/cdk-organizations.ITaggableResource" id="pepperizecdkorganizationsitaggableresource"></a>

- *Extends:* [`aws-cdk-lib.ITaggable`](#aws-cdk-lib.ITaggable)

- *Implemented By:* [`@pepperize/cdk-organizations.Account`](#@pepperize/cdk-organizations.Account), [`@pepperize/cdk-organizations.OrganizationalUnit`](#@pepperize/cdk-organizations.OrganizationalUnit), [`@pepperize/cdk-organizations.Policy`](#@pepperize/cdk-organizations.Policy), [`@pepperize/cdk-organizations.Root`](#@pepperize/cdk-organizations.Root), [`@pepperize/cdk-organizations.ITaggableResource`](#@pepperize/cdk-organizations.ITaggableResource)


#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`tags`](#pepperizecdkorganizationsitaggableresourcepropertytags)<span title="Required">*</span> | [`aws-cdk-lib.TagManager`](#aws-cdk-lib.TagManager) | TagManager to set, remove and format tags. |

---

##### `tags`<sup>Required</sup> <a name="@pepperize/cdk-organizations.ITaggableResource.property.tags" id="pepperizecdkorganizationsitaggableresourcepropertytags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* [`aws-cdk-lib.TagManager`](#aws-cdk-lib.TagManager)

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

