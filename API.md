# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### Account <a name="Account" id="@pepperize/cdk-organizations.Account"></a>

- *Implements:* <a href="#@pepperize/cdk-organizations.IAccount">IAccount</a>, <a href="#@pepperize/cdk-organizations.ITaggableResource">ITaggableResource</a>

Creates or imports an AWS account that is automatically a member of the organization whose credentials made the request.

AWS Organizations automatically copies the information from the management account to the new member account

#### Initializers <a name="Initializers" id="@pepperize/cdk-organizations.Account.Initializer"></a>

```typescript
import { Account } from '@pepperize/cdk-organizations'

new Account(scope: Construct, id: string, props: AccountProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.Account.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@pepperize/cdk-organizations.Account.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@pepperize/cdk-organizations.Account.Initializer.parameter.props">props</a></code> | <code><a href="#@pepperize/cdk-organizations.AccountProps">AccountProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@pepperize/cdk-organizations.Account.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@pepperize/cdk-organizations.Account.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@pepperize/cdk-organizations.Account.Initializer.parameter.props"></a>

- *Type:* <a href="#@pepperize/cdk-organizations.AccountProps">AccountProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@pepperize/cdk-organizations.Account.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@pepperize/cdk-organizations.Account.attachPolicy">attachPolicy</a></code> | Attach a policy. |
| <code><a href="#@pepperize/cdk-organizations.Account.delegateAdministrator">delegateAdministrator</a></code> | Enables trusted access for the AWS service (trusted service) as <strong>Delegated Administrator</strong>, which performs tasks in your organization and its accounts on your behalf. |
| <code><a href="#@pepperize/cdk-organizations.Account.identifier">identifier</a></code> | The unique identifier (ID) of the parent root, organizational unit (OU), account, or policy that you want to create the new OU in. |

---

##### `toString` <a name="toString" id="@pepperize/cdk-organizations.Account.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `attachPolicy` <a name="attachPolicy" id="@pepperize/cdk-organizations.Account.attachPolicy"></a>

```typescript
public attachPolicy(policy: IPolicy): void
```

Attach a policy.

Before you can attach the policy, you must enable that policy type for use. You can use policies when you have all features enabled.

> [https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies.html](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies.html)

###### `policy`<sup>Required</sup> <a name="policy" id="@pepperize/cdk-organizations.Account.attachPolicy.parameter.policy"></a>

- *Type:* <a href="#@pepperize/cdk-organizations.IPolicy">IPolicy</a>

---

##### `delegateAdministrator` <a name="delegateAdministrator" id="@pepperize/cdk-organizations.Account.delegateAdministrator"></a>

```typescript
public delegateAdministrator(servicePrincipal: string): void
```

Enables trusted access for the AWS service (trusted service) as <strong>Delegated Administrator</strong>, which performs tasks in your organization and its accounts on your behalf.

###### `servicePrincipal`<sup>Required</sup> <a name="servicePrincipal" id="@pepperize/cdk-organizations.Account.delegateAdministrator.parameter.servicePrincipal"></a>

- *Type:* string

The supported AWS service that you specify.

---

##### `identifier` <a name="identifier" id="@pepperize/cdk-organizations.Account.identifier"></a>

```typescript
public identifier(): string
```

The unique identifier (ID) of the parent root, organizational unit (OU), account, or policy that you want to create the new OU in.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@pepperize/cdk-organizations.Account.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@pepperize/cdk-organizations.Account.isConstruct"></a>

```typescript
import { Account } from '@pepperize/cdk-organizations'

Account.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@pepperize/cdk-organizations.Account.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.Account.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@pepperize/cdk-organizations.Account.property.accountArn">accountArn</a></code> | <code>string</code> | The Amazon Resource Name (ARN) of the account. |
| <code><a href="#@pepperize/cdk-organizations.Account.property.accountId">accountId</a></code> | <code>string</code> | If the account was created successfully, the unique identifier (ID) of the new account. |
| <code><a href="#@pepperize/cdk-organizations.Account.property.accountName">accountName</a></code> | <code>string</code> | The friendly name of the account. |
| <code><a href="#@pepperize/cdk-organizations.Account.property.email">email</a></code> | <code>string</code> | The email address of the owner to assign to the new member account. |
| <code><a href="#@pepperize/cdk-organizations.Account.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | TagManager to set, remove and format tags. |

---

##### `node`<sup>Required</sup> <a name="node" id="@pepperize/cdk-organizations.Account.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `accountArn`<sup>Required</sup> <a name="accountArn" id="@pepperize/cdk-organizations.Account.property.accountArn"></a>

```typescript
public readonly accountArn: string;
```

- *Type:* string

The Amazon Resource Name (ARN) of the account.

---

##### `accountId`<sup>Required</sup> <a name="accountId" id="@pepperize/cdk-organizations.Account.property.accountId"></a>

```typescript
public readonly accountId: string;
```

- *Type:* string

If the account was created successfully, the unique identifier (ID) of the new account.

Exactly 12 digits.

---

##### `accountName`<sup>Required</sup> <a name="accountName" id="@pepperize/cdk-organizations.Account.property.accountName"></a>

```typescript
public readonly accountName: string;
```

- *Type:* string

The friendly name of the account.

---

##### `email`<sup>Required</sup> <a name="email" id="@pepperize/cdk-organizations.Account.property.email"></a>

```typescript
public readonly email: string;
```

- *Type:* string

The email address of the owner to assign to the new member account.

This email address must not already be associated with another AWS account. You must use a valid email address to complete account creation. You can't access the root user of the account or remove an account that was created with an invalid email address.

---

##### `tags`<sup>Required</sup> <a name="tags" id="@pepperize/cdk-organizations.Account.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

TagManager to set, remove and format tags.

---


### DelegatedAdministrator <a name="DelegatedAdministrator" id="@pepperize/cdk-organizations.DelegatedAdministrator"></a>

Enables the specified member account to administer the Organizations features of the specified AWS service.

It grants read-only access to AWS Organizations service data. The account still requires IAM permissions to access and administer the AWS service.

You can run this action only for AWS services that support this feature. For a current list of services that support it, see the column Supports Delegated Administrator in the table at AWS Services that you can use with AWS Organizations in the [AWS Organizations User Guide](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services_list.html).

> [https://docs.aws.amazon.com/accounts/latest/reference/using-orgs-delegated-admin.html](https://docs.aws.amazon.com/accounts/latest/reference/using-orgs-delegated-admin.html)

#### Initializers <a name="Initializers" id="@pepperize/cdk-organizations.DelegatedAdministrator.Initializer"></a>

```typescript
import { DelegatedAdministrator } from '@pepperize/cdk-organizations'

new DelegatedAdministrator(scope: Construct, id: string, props: DelegatedAdministratorProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.DelegatedAdministrator.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@pepperize/cdk-organizations.DelegatedAdministrator.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@pepperize/cdk-organizations.DelegatedAdministrator.Initializer.parameter.props">props</a></code> | <code><a href="#@pepperize/cdk-organizations.DelegatedAdministratorProps">DelegatedAdministratorProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@pepperize/cdk-organizations.DelegatedAdministrator.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@pepperize/cdk-organizations.DelegatedAdministrator.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@pepperize/cdk-organizations.DelegatedAdministrator.Initializer.parameter.props"></a>

- *Type:* <a href="#@pepperize/cdk-organizations.DelegatedAdministratorProps">DelegatedAdministratorProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@pepperize/cdk-organizations.DelegatedAdministrator.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@pepperize/cdk-organizations.DelegatedAdministrator.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@pepperize/cdk-organizations.DelegatedAdministrator.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@pepperize/cdk-organizations.DelegatedAdministrator.isConstruct"></a>

```typescript
import { DelegatedAdministrator } from '@pepperize/cdk-organizations'

DelegatedAdministrator.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@pepperize/cdk-organizations.DelegatedAdministrator.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.DelegatedAdministrator.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@pepperize/cdk-organizations.DelegatedAdministrator.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


### EnableAwsServiceAccess <a name="EnableAwsServiceAccess" id="@pepperize/cdk-organizations.EnableAwsServiceAccess"></a>

Enables the integration of an AWS service (the service that is specified by ServicePrincipal) with AWS Organizations.

When you enable integration, you allow the specified service to create a service-linked role in all the accounts in your organization. This allows the service to perform operations on your behalf in your organization and its accounts.

<strong>This operation can be called only from the organization's management account and only if the organization has enabled all features.</strong>

> [https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services.html#orgs_trusted_access_perms](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services.html#orgs_trusted_access_perms)

#### Initializers <a name="Initializers" id="@pepperize/cdk-organizations.EnableAwsServiceAccess.Initializer"></a>

```typescript
import { EnableAwsServiceAccess } from '@pepperize/cdk-organizations'

new EnableAwsServiceAccess(scope: Construct, id: string, props: EnableAwsServiceAccessProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.EnableAwsServiceAccess.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@pepperize/cdk-organizations.EnableAwsServiceAccess.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@pepperize/cdk-organizations.EnableAwsServiceAccess.Initializer.parameter.props">props</a></code> | <code><a href="#@pepperize/cdk-organizations.EnableAwsServiceAccessProps">EnableAwsServiceAccessProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@pepperize/cdk-organizations.EnableAwsServiceAccess.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@pepperize/cdk-organizations.EnableAwsServiceAccess.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@pepperize/cdk-organizations.EnableAwsServiceAccess.Initializer.parameter.props"></a>

- *Type:* <a href="#@pepperize/cdk-organizations.EnableAwsServiceAccessProps">EnableAwsServiceAccessProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@pepperize/cdk-organizations.EnableAwsServiceAccess.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@pepperize/cdk-organizations.EnableAwsServiceAccess.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@pepperize/cdk-organizations.EnableAwsServiceAccess.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@pepperize/cdk-organizations.EnableAwsServiceAccess.isConstruct"></a>

```typescript
import { EnableAwsServiceAccess } from '@pepperize/cdk-organizations'

EnableAwsServiceAccess.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@pepperize/cdk-organizations.EnableAwsServiceAccess.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.EnableAwsServiceAccess.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@pepperize/cdk-organizations.EnableAwsServiceAccess.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


### EnablePolicyType <a name="EnablePolicyType" id="@pepperize/cdk-organizations.EnablePolicyType"></a>

Enables and disables Enables a policy type in a root.

After you enable a policy type in a root, you can attach policies of that type to the root, any organizational unit (OU), or account in that root.

> [https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_enable-disable.html](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_enable-disable.html)

#### Initializers <a name="Initializers" id="@pepperize/cdk-organizations.EnablePolicyType.Initializer"></a>

```typescript
import { EnablePolicyType } from '@pepperize/cdk-organizations'

new EnablePolicyType(scope: Construct, id: string, props: EnablePolicyTypeProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.EnablePolicyType.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@pepperize/cdk-organizations.EnablePolicyType.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@pepperize/cdk-organizations.EnablePolicyType.Initializer.parameter.props">props</a></code> | <code><a href="#@pepperize/cdk-organizations.EnablePolicyTypeProps">EnablePolicyTypeProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@pepperize/cdk-organizations.EnablePolicyType.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@pepperize/cdk-organizations.EnablePolicyType.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@pepperize/cdk-organizations.EnablePolicyType.Initializer.parameter.props"></a>

- *Type:* <a href="#@pepperize/cdk-organizations.EnablePolicyTypeProps">EnablePolicyTypeProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@pepperize/cdk-organizations.EnablePolicyType.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@pepperize/cdk-organizations.EnablePolicyType.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@pepperize/cdk-organizations.EnablePolicyType.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@pepperize/cdk-organizations.EnablePolicyType.isConstruct"></a>

```typescript
import { EnablePolicyType } from '@pepperize/cdk-organizations'

EnablePolicyType.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@pepperize/cdk-organizations.EnablePolicyType.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.EnablePolicyType.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@pepperize/cdk-organizations.EnablePolicyType.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


### Organization <a name="Organization" id="@pepperize/cdk-organizations.Organization"></a>

- *Implements:* <a href="#@pepperize/cdk-organizations.IOrganization">IOrganization</a>

#### Initializers <a name="Initializers" id="@pepperize/cdk-organizations.Organization.Initializer"></a>

```typescript
import { Organization } from '@pepperize/cdk-organizations'

new Organization(scope: Construct, id: string, props?: OrganizationProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.Organization.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@pepperize/cdk-organizations.Organization.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@pepperize/cdk-organizations.Organization.Initializer.parameter.props">props</a></code> | <code><a href="#@pepperize/cdk-organizations.OrganizationProps">OrganizationProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@pepperize/cdk-organizations.Organization.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@pepperize/cdk-organizations.Organization.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="@pepperize/cdk-organizations.Organization.Initializer.parameter.props"></a>

- *Type:* <a href="#@pepperize/cdk-organizations.OrganizationProps">OrganizationProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@pepperize/cdk-organizations.Organization.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@pepperize/cdk-organizations.Organization.attachPolicy">attachPolicy</a></code> | Attach a policy. |
| <code><a href="#@pepperize/cdk-organizations.Organization.enableAwsServiceAccess">enableAwsServiceAccess</a></code> | Enables trusted access for a supported AWS service (trusted service), which performs tasks in your organization and its accounts on your behalf. |
| <code><a href="#@pepperize/cdk-organizations.Organization.enablePolicyType">enablePolicyType</a></code> | Enables policy types in the following two broad categories: Authorization policies and Management policies. |

---

##### `toString` <a name="toString" id="@pepperize/cdk-organizations.Organization.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `attachPolicy` <a name="attachPolicy" id="@pepperize/cdk-organizations.Organization.attachPolicy"></a>

```typescript
public attachPolicy(policy: IPolicy): void
```

Attach a policy.

Before you can attach the policy, you must enable that policy type for use. You can use policies when you have all features enabled.

> [https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies.html](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies.html)

###### `policy`<sup>Required</sup> <a name="policy" id="@pepperize/cdk-organizations.Organization.attachPolicy.parameter.policy"></a>

- *Type:* <a href="#@pepperize/cdk-organizations.IPolicy">IPolicy</a>

---

##### `enableAwsServiceAccess` <a name="enableAwsServiceAccess" id="@pepperize/cdk-organizations.Organization.enableAwsServiceAccess"></a>

```typescript
public enableAwsServiceAccess(servicePrincipal: string): void
```

Enables trusted access for a supported AWS service (trusted service), which performs tasks in your organization and its accounts on your behalf.

> [https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services_list.html](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services_list.html)

###### `servicePrincipal`<sup>Required</sup> <a name="servicePrincipal" id="@pepperize/cdk-organizations.Organization.enableAwsServiceAccess.parameter.servicePrincipal"></a>

- *Type:* string

The supported AWS service that you specify.

---

##### `enablePolicyType` <a name="enablePolicyType" id="@pepperize/cdk-organizations.Organization.enablePolicyType"></a>

```typescript
public enablePolicyType(policyType: PolicyType): void
```

Enables policy types in the following two broad categories: Authorization policies and Management policies.

> [https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies.html#orgs-policy-types](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies.html#orgs-policy-types)

###### `policyType`<sup>Required</sup> <a name="policyType" id="@pepperize/cdk-organizations.Organization.enablePolicyType.parameter.policyType"></a>

- *Type:* <a href="#@pepperize/cdk-organizations.PolicyType">PolicyType</a>

: the type of the policy that you specify.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@pepperize/cdk-organizations.Organization.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@pepperize/cdk-organizations.Organization.of">of</a></code> | Describe the organization that the current account belongs to. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@pepperize/cdk-organizations.Organization.isConstruct"></a>

```typescript
import { Organization } from '@pepperize/cdk-organizations'

Organization.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@pepperize/cdk-organizations.Organization.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `of` <a name="of" id="@pepperize/cdk-organizations.Organization.of"></a>

```typescript
import { Organization } from '@pepperize/cdk-organizations'

Organization.of(scope: Construct, id: string)
```

Describe the organization that the current account belongs to.

> [https://docs.aws.amazon.com/organizations/latest/APIReference/API_DescribeOrganization.html](https://docs.aws.amazon.com/organizations/latest/APIReference/API_DescribeOrganization.html)

###### `scope`<sup>Required</sup> <a name="scope" id="@pepperize/cdk-organizations.Organization.of.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="@pepperize/cdk-organizations.Organization.of.parameter.id"></a>

- *Type:* string

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.Organization.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@pepperize/cdk-organizations.Organization.property.featureSet">featureSet</a></code> | <code><a href="#@pepperize/cdk-organizations.FeatureSet">FeatureSet</a></code> | Specifies the functionality that currently is available to the organization. |
| <code><a href="#@pepperize/cdk-organizations.Organization.property.managementAccountArn">managementAccountArn</a></code> | <code>string</code> | The Amazon Resource Name (ARN) of the account that is designated as the management account for the organization. |
| <code><a href="#@pepperize/cdk-organizations.Organization.property.managementAccountEmail">managementAccountEmail</a></code> | <code>string</code> | The email address that is associated with the AWS account that is designated as the management account for the organization. |
| <code><a href="#@pepperize/cdk-organizations.Organization.property.managementAccountId">managementAccountId</a></code> | <code>string</code> | The unique identifier (ID) of the management account of an organization. |
| <code><a href="#@pepperize/cdk-organizations.Organization.property.organizationArn">organizationArn</a></code> | <code>string</code> | The Amazon Resource Name (ARN) of an organization. |
| <code><a href="#@pepperize/cdk-organizations.Organization.property.organizationId">organizationId</a></code> | <code>string</code> | The unique identifier (ID) of an organization. |
| <code><a href="#@pepperize/cdk-organizations.Organization.property.principal">principal</a></code> | <code>aws-cdk-lib.aws_iam.IPrincipal</code> | The principal that represents this AWS Organization. |
| <code><a href="#@pepperize/cdk-organizations.Organization.property.root">root</a></code> | <code><a href="#@pepperize/cdk-organizations.Root">Root</a></code> | The root of the current organization, which is automatically created. |

---

##### `node`<sup>Required</sup> <a name="node" id="@pepperize/cdk-organizations.Organization.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `featureSet`<sup>Required</sup> <a name="featureSet" id="@pepperize/cdk-organizations.Organization.property.featureSet"></a>

```typescript
public readonly featureSet: FeatureSet;
```

- *Type:* <a href="#@pepperize/cdk-organizations.FeatureSet">FeatureSet</a>

Specifies the functionality that currently is available to the organization.

If set to "ALL", then all features are enabled and policies can be applied to accounts in the organization. If set to "CONSOLIDATED_BILLING", then only consolidated billing functionality is available.

---

##### `managementAccountArn`<sup>Required</sup> <a name="managementAccountArn" id="@pepperize/cdk-organizations.Organization.property.managementAccountArn"></a>

```typescript
public readonly managementAccountArn: string;
```

- *Type:* string

The Amazon Resource Name (ARN) of the account that is designated as the management account for the organization.

---

##### `managementAccountEmail`<sup>Required</sup> <a name="managementAccountEmail" id="@pepperize/cdk-organizations.Organization.property.managementAccountEmail"></a>

```typescript
public readonly managementAccountEmail: string;
```

- *Type:* string

The email address that is associated with the AWS account that is designated as the management account for the organization.

---

##### `managementAccountId`<sup>Required</sup> <a name="managementAccountId" id="@pepperize/cdk-organizations.Organization.property.managementAccountId"></a>

```typescript
public readonly managementAccountId: string;
```

- *Type:* string

The unique identifier (ID) of the management account of an organization.

---

##### `organizationArn`<sup>Required</sup> <a name="organizationArn" id="@pepperize/cdk-organizations.Organization.property.organizationArn"></a>

```typescript
public readonly organizationArn: string;
```

- *Type:* string

The Amazon Resource Name (ARN) of an organization.

---

##### `organizationId`<sup>Required</sup> <a name="organizationId" id="@pepperize/cdk-organizations.Organization.property.organizationId"></a>

```typescript
public readonly organizationId: string;
```

- *Type:* string

The unique identifier (ID) of an organization.

The regex pattern for an organization ID string requires "o-" followed by from 10 to 32 lowercase letters or digits.

---

##### `principal`<sup>Required</sup> <a name="principal" id="@pepperize/cdk-organizations.Organization.property.principal"></a>

```typescript
public readonly principal: IPrincipal;
```

- *Type:* aws-cdk-lib.aws_iam.IPrincipal

The principal that represents this AWS Organization.

---

##### `root`<sup>Required</sup> <a name="root" id="@pepperize/cdk-organizations.Organization.property.root"></a>

```typescript
public readonly root: Root;
```

- *Type:* <a href="#@pepperize/cdk-organizations.Root">Root</a>

The root of the current organization, which is automatically created.

---


### OrganizationalUnit <a name="OrganizationalUnit" id="@pepperize/cdk-organizations.OrganizationalUnit"></a>

- *Implements:* <a href="#@pepperize/cdk-organizations.IOrganizationalUnit">IOrganizationalUnit</a>, <a href="#@pepperize/cdk-organizations.ITaggableResource">ITaggableResource</a>

#### Initializers <a name="Initializers" id="@pepperize/cdk-organizations.OrganizationalUnit.Initializer"></a>

```typescript
import { OrganizationalUnit } from '@pepperize/cdk-organizations'

new OrganizationalUnit(scope: Construct, id: string, props: OrganizationalUnitProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.OrganizationalUnit.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@pepperize/cdk-organizations.OrganizationalUnit.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@pepperize/cdk-organizations.OrganizationalUnit.Initializer.parameter.props">props</a></code> | <code><a href="#@pepperize/cdk-organizations.OrganizationalUnitProps">OrganizationalUnitProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@pepperize/cdk-organizations.OrganizationalUnit.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@pepperize/cdk-organizations.OrganizationalUnit.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@pepperize/cdk-organizations.OrganizationalUnit.Initializer.parameter.props"></a>

- *Type:* <a href="#@pepperize/cdk-organizations.OrganizationalUnitProps">OrganizationalUnitProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@pepperize/cdk-organizations.OrganizationalUnit.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@pepperize/cdk-organizations.OrganizationalUnit.attachPolicy">attachPolicy</a></code> | Attach a policy. |
| <code><a href="#@pepperize/cdk-organizations.OrganizationalUnit.identifier">identifier</a></code> | The unique identifier (ID) of the parent root, organizational unit (OU), account, or policy that you want to create the new OU in. |

---

##### `toString` <a name="toString" id="@pepperize/cdk-organizations.OrganizationalUnit.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `attachPolicy` <a name="attachPolicy" id="@pepperize/cdk-organizations.OrganizationalUnit.attachPolicy"></a>

```typescript
public attachPolicy(policy: IPolicy): void
```

Attach a policy.

Before you can attach the policy, you must enable that policy type for use. You can use policies when you have all features enabled.

> [https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies.html](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies.html)

###### `policy`<sup>Required</sup> <a name="policy" id="@pepperize/cdk-organizations.OrganizationalUnit.attachPolicy.parameter.policy"></a>

- *Type:* <a href="#@pepperize/cdk-organizations.IPolicy">IPolicy</a>

---

##### `identifier` <a name="identifier" id="@pepperize/cdk-organizations.OrganizationalUnit.identifier"></a>

```typescript
public identifier(): string
```

The unique identifier (ID) of the parent root, organizational unit (OU), account, or policy that you want to create the new OU in.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@pepperize/cdk-organizations.OrganizationalUnit.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@pepperize/cdk-organizations.OrganizationalUnit.isConstruct"></a>

```typescript
import { OrganizationalUnit } from '@pepperize/cdk-organizations'

OrganizationalUnit.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@pepperize/cdk-organizations.OrganizationalUnit.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.OrganizationalUnit.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@pepperize/cdk-organizations.OrganizationalUnit.property.organizationalUnitArn">organizationalUnitArn</a></code> | <code>string</code> | The Amazon Resource Name (ARN) of this OU. |
| <code><a href="#@pepperize/cdk-organizations.OrganizationalUnit.property.organizationalUnitId">organizationalUnitId</a></code> | <code>string</code> | The unique identifier (ID) associated with this OU. |
| <code><a href="#@pepperize/cdk-organizations.OrganizationalUnit.property.organizationalUnitName">organizationalUnitName</a></code> | <code>string</code> | The friendly name of this OU. |
| <code><a href="#@pepperize/cdk-organizations.OrganizationalUnit.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | TagManager to set, remove and format tags. |

---

##### `node`<sup>Required</sup> <a name="node" id="@pepperize/cdk-organizations.OrganizationalUnit.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `organizationalUnitArn`<sup>Required</sup> <a name="organizationalUnitArn" id="@pepperize/cdk-organizations.OrganizationalUnit.property.organizationalUnitArn"></a>

```typescript
public readonly organizationalUnitArn: string;
```

- *Type:* string

The Amazon Resource Name (ARN) of this OU.

For more information about ARNs in Organizations, see [ARN Formats Supported by Organizations](https://docs.aws.amazon.com/service-authorization/latest/reference/list_awsorganizations.html#awsorganizations-resources-for-iam-policies) in the AWS Service Authorization Reference.

---

##### `organizationalUnitId`<sup>Required</sup> <a name="organizationalUnitId" id="@pepperize/cdk-organizations.OrganizationalUnit.property.organizationalUnitId"></a>

```typescript
public readonly organizationalUnitId: string;
```

- *Type:* string

The unique identifier (ID) associated with this OU.

The regex pattern for an organizational unit ID string requires "ou-" followed by from 4 to 32 lowercase letters or digits (the ID of the root that contains the OU). This string is followed by a second "-" dash and from 8 to 32 additional lowercase letters or digits.

---

##### `organizationalUnitName`<sup>Required</sup> <a name="organizationalUnitName" id="@pepperize/cdk-organizations.OrganizationalUnit.property.organizationalUnitName"></a>

```typescript
public readonly organizationalUnitName: string;
```

- *Type:* string

The friendly name of this OU.

---

##### `tags`<sup>Required</sup> <a name="tags" id="@pepperize/cdk-organizations.OrganizationalUnit.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

TagManager to set, remove and format tags.

---


### Parent <a name="Parent" id="@pepperize/cdk-organizations.Parent"></a>

#### Initializers <a name="Initializers" id="@pepperize/cdk-organizations.Parent.Initializer"></a>

```typescript
import { Parent } from '@pepperize/cdk-organizations'

new Parent(scope: Construct, id: string, props: ParentProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.Parent.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@pepperize/cdk-organizations.Parent.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@pepperize/cdk-organizations.Parent.Initializer.parameter.props">props</a></code> | <code><a href="#@pepperize/cdk-organizations.ParentProps">ParentProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@pepperize/cdk-organizations.Parent.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@pepperize/cdk-organizations.Parent.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@pepperize/cdk-organizations.Parent.Initializer.parameter.props"></a>

- *Type:* <a href="#@pepperize/cdk-organizations.ParentProps">ParentProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@pepperize/cdk-organizations.Parent.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@pepperize/cdk-organizations.Parent.identifier">identifier</a></code> | The unique identifier (ID) of the parent root, organizational unit (OU), account, or policy that you want to create the new OU in. |

---

##### `toString` <a name="toString" id="@pepperize/cdk-organizations.Parent.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `identifier` <a name="identifier" id="@pepperize/cdk-organizations.Parent.identifier"></a>

```typescript
public identifier(): string
```

The unique identifier (ID) of the parent root, organizational unit (OU), account, or policy that you want to create the new OU in.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@pepperize/cdk-organizations.Parent.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@pepperize/cdk-organizations.Parent.fromChildId">fromChildId</a></code> | *No description.* |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@pepperize/cdk-organizations.Parent.isConstruct"></a>

```typescript
import { Parent } from '@pepperize/cdk-organizations'

Parent.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@pepperize/cdk-organizations.Parent.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `fromChildId` <a name="fromChildId" id="@pepperize/cdk-organizations.Parent.fromChildId"></a>

```typescript
import { Parent } from '@pepperize/cdk-organizations'

Parent.fromChildId(scope: Construct, id: string, childId: string)
```

###### `scope`<sup>Required</sup> <a name="scope" id="@pepperize/cdk-organizations.Parent.fromChildId.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="@pepperize/cdk-organizations.Parent.fromChildId.parameter.id"></a>

- *Type:* string

---

###### `childId`<sup>Required</sup> <a name="childId" id="@pepperize/cdk-organizations.Parent.fromChildId.parameter.childId"></a>

- *Type:* string

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.Parent.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@pepperize/cdk-organizations.Parent.property.parentId">parentId</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@pepperize/cdk-organizations.Parent.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `parentId`<sup>Required</sup> <a name="parentId" id="@pepperize/cdk-organizations.Parent.property.parentId"></a>

```typescript
public readonly parentId: string;
```

- *Type:* string

---


### ParentBase <a name="ParentBase" id="@pepperize/cdk-organizations.ParentBase"></a>

- *Implements:* <a href="#@pepperize/cdk-organizations.IParent">IParent</a>

#### Initializers <a name="Initializers" id="@pepperize/cdk-organizations.ParentBase.Initializer"></a>

```typescript
import { ParentBase } from '@pepperize/cdk-organizations'

new ParentBase(scope: Construct, id: string, props: ParentBaseProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.ParentBase.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@pepperize/cdk-organizations.ParentBase.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@pepperize/cdk-organizations.ParentBase.Initializer.parameter.props">props</a></code> | <code><a href="#@pepperize/cdk-organizations.ParentBaseProps">ParentBaseProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@pepperize/cdk-organizations.ParentBase.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@pepperize/cdk-organizations.ParentBase.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@pepperize/cdk-organizations.ParentBase.Initializer.parameter.props"></a>

- *Type:* <a href="#@pepperize/cdk-organizations.ParentBaseProps">ParentBaseProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@pepperize/cdk-organizations.ParentBase.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@pepperize/cdk-organizations.ParentBase.identifier">identifier</a></code> | The unique identifier (ID) of the parent root, organizational unit (OU), account, or policy that you want to create the new OU in. |

---

##### `toString` <a name="toString" id="@pepperize/cdk-organizations.ParentBase.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `identifier` <a name="identifier" id="@pepperize/cdk-organizations.ParentBase.identifier"></a>

```typescript
public identifier(): string
```

The unique identifier (ID) of the parent root, organizational unit (OU), account, or policy that you want to create the new OU in.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@pepperize/cdk-organizations.ParentBase.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@pepperize/cdk-organizations.ParentBase.isConstruct"></a>

```typescript
import { ParentBase } from '@pepperize/cdk-organizations'

ParentBase.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@pepperize/cdk-organizations.ParentBase.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.ParentBase.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@pepperize/cdk-organizations.ParentBase.property.parentId">parentId</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@pepperize/cdk-organizations.ParentBase.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `parentId`<sup>Required</sup> <a name="parentId" id="@pepperize/cdk-organizations.ParentBase.property.parentId"></a>

```typescript
public readonly parentId: string;
```

- *Type:* string

---


### Policy <a name="Policy" id="@pepperize/cdk-organizations.Policy"></a>

- *Implements:* <a href="#@pepperize/cdk-organizations.IPolicy">IPolicy</a>

#### Initializers <a name="Initializers" id="@pepperize/cdk-organizations.Policy.Initializer"></a>

```typescript
import { Policy } from '@pepperize/cdk-organizations'

new Policy(scope: Construct, id: string, props: PolicyProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.Policy.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@pepperize/cdk-organizations.Policy.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@pepperize/cdk-organizations.Policy.Initializer.parameter.props">props</a></code> | <code><a href="#@pepperize/cdk-organizations.PolicyProps">PolicyProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@pepperize/cdk-organizations.Policy.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@pepperize/cdk-organizations.Policy.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@pepperize/cdk-organizations.Policy.Initializer.parameter.props"></a>

- *Type:* <a href="#@pepperize/cdk-organizations.PolicyProps">PolicyProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@pepperize/cdk-organizations.Policy.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@pepperize/cdk-organizations.Policy.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |

---

##### `toString` <a name="toString" id="@pepperize/cdk-organizations.Policy.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="@pepperize/cdk-organizations.Policy.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy: RemovalPolicy): void
```

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

###### `policy`<sup>Required</sup> <a name="policy" id="@pepperize/cdk-organizations.Policy.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@pepperize/cdk-organizations.Policy.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@pepperize/cdk-organizations.Policy.isOwnedResource">isOwnedResource</a></code> | Returns true if the construct was created by CDK, and false otherwise. |
| <code><a href="#@pepperize/cdk-organizations.Policy.isResource">isResource</a></code> | Check whether the given construct is a Resource. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@pepperize/cdk-organizations.Policy.isConstruct"></a>

```typescript
import { Policy } from '@pepperize/cdk-organizations'

Policy.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@pepperize/cdk-organizations.Policy.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isOwnedResource` <a name="isOwnedResource" id="@pepperize/cdk-organizations.Policy.isOwnedResource"></a>

```typescript
import { Policy } from '@pepperize/cdk-organizations'

Policy.isOwnedResource(construct: IConstruct)
```

Returns true if the construct was created by CDK, and false otherwise.

###### `construct`<sup>Required</sup> <a name="construct" id="@pepperize/cdk-organizations.Policy.isOwnedResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `isResource` <a name="isResource" id="@pepperize/cdk-organizations.Policy.isResource"></a>

```typescript
import { Policy } from '@pepperize/cdk-organizations'

Policy.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="@pepperize/cdk-organizations.Policy.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.Policy.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@pepperize/cdk-organizations.Policy.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#@pepperize/cdk-organizations.Policy.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#@pepperize/cdk-organizations.Policy.property.policyId">policyId</a></code> | <code>string</code> | The unique identifier (ID) of the policy. |

---

##### `node`<sup>Required</sup> <a name="node" id="@pepperize/cdk-organizations.Policy.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="@pepperize/cdk-organizations.Policy.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="@pepperize/cdk-organizations.Policy.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `policyId`<sup>Required</sup> <a name="policyId" id="@pepperize/cdk-organizations.Policy.property.policyId"></a>

```typescript
public readonly policyId: string;
```

- *Type:* string

The unique identifier (ID) of the policy.

The regex pattern for a policy ID string requires "p-" followed by from 8 to 128 lowercase or uppercase letters, digits, or the underscore character (_).

---


### PolicyAttachment <a name="PolicyAttachment" id="@pepperize/cdk-organizations.PolicyAttachment"></a>

Attaches a policy to a root, an organizational unit (OU), or an individual account.

How the policy affects accounts depends on the type of policy. Refer to the AWS Organizations User Guide for information about each policy type:

#### Initializers <a name="Initializers" id="@pepperize/cdk-organizations.PolicyAttachment.Initializer"></a>

```typescript
import { PolicyAttachment } from '@pepperize/cdk-organizations'

new PolicyAttachment(scope: Construct, id: string, props: PolicyAttachmentProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.PolicyAttachment.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@pepperize/cdk-organizations.PolicyAttachment.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@pepperize/cdk-organizations.PolicyAttachment.Initializer.parameter.props">props</a></code> | <code><a href="#@pepperize/cdk-organizations.PolicyAttachmentProps">PolicyAttachmentProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@pepperize/cdk-organizations.PolicyAttachment.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@pepperize/cdk-organizations.PolicyAttachment.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@pepperize/cdk-organizations.PolicyAttachment.Initializer.parameter.props"></a>

- *Type:* <a href="#@pepperize/cdk-organizations.PolicyAttachmentProps">PolicyAttachmentProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@pepperize/cdk-organizations.PolicyAttachment.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@pepperize/cdk-organizations.PolicyAttachment.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@pepperize/cdk-organizations.PolicyAttachment.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@pepperize/cdk-organizations.PolicyAttachment.isConstruct"></a>

```typescript
import { PolicyAttachment } from '@pepperize/cdk-organizations'

PolicyAttachment.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@pepperize/cdk-organizations.PolicyAttachment.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.PolicyAttachment.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@pepperize/cdk-organizations.PolicyAttachment.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


### Root <a name="Root" id="@pepperize/cdk-organizations.Root"></a>

- *Implements:* <a href="#@pepperize/cdk-organizations.IParent">IParent</a>, <a href="#@pepperize/cdk-organizations.IPolicyAttachmentTarget">IPolicyAttachmentTarget</a>, <a href="#@pepperize/cdk-organizations.ITaggableResource">ITaggableResource</a>

The parent container for all the accounts for your organization.

If you apply a policy to the root, it applies to all organizational units (OUs) and accounts in the organization.
<strong>Currently, you can have only one root. AWS Organizations automatically creates it for you when you create an organization.</strong>

> [https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html)

#### Initializers <a name="Initializers" id="@pepperize/cdk-organizations.Root.Initializer"></a>

```typescript
import { Root } from '@pepperize/cdk-organizations'

new Root(scope: Construct, id: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.Root.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@pepperize/cdk-organizations.Root.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@pepperize/cdk-organizations.Root.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@pepperize/cdk-organizations.Root.Initializer.parameter.id"></a>

- *Type:* string

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@pepperize/cdk-organizations.Root.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@pepperize/cdk-organizations.Root.attachPolicy">attachPolicy</a></code> | Attach a policy. |
| <code><a href="#@pepperize/cdk-organizations.Root.enablePolicyType">enablePolicyType</a></code> | Enables and disables Enables a policy type. |
| <code><a href="#@pepperize/cdk-organizations.Root.identifier">identifier</a></code> | The unique identifier (ID) of the parent root, organizational unit (OU), account, or policy that you want to create the new OU in. |

---

##### `toString` <a name="toString" id="@pepperize/cdk-organizations.Root.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `attachPolicy` <a name="attachPolicy" id="@pepperize/cdk-organizations.Root.attachPolicy"></a>

```typescript
public attachPolicy(policy: IPolicy): void
```

Attach a policy.

Before you can attach the policy, you must enable that policy type for use. You can use policies when you have all features enabled.

> [https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies.html](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies.html)

###### `policy`<sup>Required</sup> <a name="policy" id="@pepperize/cdk-organizations.Root.attachPolicy.parameter.policy"></a>

- *Type:* <a href="#@pepperize/cdk-organizations.IPolicy">IPolicy</a>

---

##### `enablePolicyType` <a name="enablePolicyType" id="@pepperize/cdk-organizations.Root.enablePolicyType"></a>

```typescript
public enablePolicyType(policyType: PolicyType): void
```

Enables and disables Enables a policy type.

After you enable a policy type in a root, you can attach policies of that type to the root, any organizational unit (OU), or account in that root.

> [https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_enable-disable.html](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_enable-disable.html)

###### `policyType`<sup>Required</sup> <a name="policyType" id="@pepperize/cdk-organizations.Root.enablePolicyType.parameter.policyType"></a>

- *Type:* <a href="#@pepperize/cdk-organizations.PolicyType">PolicyType</a>

---

##### `identifier` <a name="identifier" id="@pepperize/cdk-organizations.Root.identifier"></a>

```typescript
public identifier(): string
```

The unique identifier (ID) of the parent root, organizational unit (OU), account, or policy that you want to create the new OU in.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@pepperize/cdk-organizations.Root.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@pepperize/cdk-organizations.Root.isConstruct"></a>

```typescript
import { Root } from '@pepperize/cdk-organizations'

Root.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@pepperize/cdk-organizations.Root.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.Root.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@pepperize/cdk-organizations.Root.property.rootId">rootId</a></code> | <code>string</code> | The unique identifier (ID) for the root. |
| <code><a href="#@pepperize/cdk-organizations.Root.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | TagManager to set, remove and format tags. |

---

##### `node`<sup>Required</sup> <a name="node" id="@pepperize/cdk-organizations.Root.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `rootId`<sup>Required</sup> <a name="rootId" id="@pepperize/cdk-organizations.Root.property.rootId"></a>

```typescript
public readonly rootId: string;
```

- *Type:* string

The unique identifier (ID) for the root.

The regex pattern for a root ID string requires "r-" followed by from 4 to 32 lowercase letters or digits.

---

##### `tags`<sup>Required</sup> <a name="tags" id="@pepperize/cdk-organizations.Root.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

TagManager to set, remove and format tags.

---


### TagResource <a name="TagResource" id="@pepperize/cdk-organizations.TagResource"></a>

Add tags to an AWS Organizations resource to make it easier to identify, organize, and search.

> [https://docs.aws.amazon.com/ARG/latest/APIReference/API_Tag.html](https://docs.aws.amazon.com/ARG/latest/APIReference/API_Tag.html)

#### Initializers <a name="Initializers" id="@pepperize/cdk-organizations.TagResource.Initializer"></a>

```typescript
import { TagResource } from '@pepperize/cdk-organizations'

new TagResource(scope: Construct, id: string, props: TagResourceProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.TagResource.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@pepperize/cdk-organizations.TagResource.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@pepperize/cdk-organizations.TagResource.Initializer.parameter.props">props</a></code> | <code><a href="#@pepperize/cdk-organizations.TagResourceProps">TagResourceProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@pepperize/cdk-organizations.TagResource.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@pepperize/cdk-organizations.TagResource.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@pepperize/cdk-organizations.TagResource.Initializer.parameter.props"></a>

- *Type:* <a href="#@pepperize/cdk-organizations.TagResourceProps">TagResourceProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@pepperize/cdk-organizations.TagResource.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@pepperize/cdk-organizations.TagResource.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@pepperize/cdk-organizations.TagResource.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@pepperize/cdk-organizations.TagResource.isConstruct"></a>

```typescript
import { TagResource } from '@pepperize/cdk-organizations'

TagResource.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@pepperize/cdk-organizations.TagResource.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.TagResource.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@pepperize/cdk-organizations.TagResource.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### AccountProps <a name="AccountProps" id="@pepperize/cdk-organizations.AccountProps"></a>

#### Initializer <a name="Initializer" id="@pepperize/cdk-organizations.AccountProps.Initializer"></a>

```typescript
import { AccountProps } from '@pepperize/cdk-organizations'

const accountProps: AccountProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.AccountProps.property.accountName">accountName</a></code> | <code>string</code> | The friendly name of the member account. |
| <code><a href="#@pepperize/cdk-organizations.AccountProps.property.email">email</a></code> | <code>string</code> | The email address of the owner to assign to the new member account. |
| <code><a href="#@pepperize/cdk-organizations.AccountProps.property.iamUserAccessToBilling">iamUserAccessToBilling</a></code> | <code><a href="#@pepperize/cdk-organizations.IamUserAccessToBilling">IamUserAccessToBilling</a></code> | If set to ALLOW , the new account enables IAM users to access account billing information if they have the required permissions. |
| <code><a href="#@pepperize/cdk-organizations.AccountProps.property.importOnDuplicate">importOnDuplicate</a></code> | <code>boolean</code> | Whether to import, if a duplicate account with same name and email already exists. |
| <code><a href="#@pepperize/cdk-organizations.AccountProps.property.parent">parent</a></code> | <code><a href="#@pepperize/cdk-organizations.IParent">IParent</a></code> | The parent root or OU that you want to create the new Account in. |
| <code><a href="#@pepperize/cdk-organizations.AccountProps.property.removalPolicy">removalPolicy</a></code> | <code>aws-cdk-lib.RemovalPolicy</code> | If set to RemovalPolicy.DESTROY, the account will be moved to the root. |
| <code><a href="#@pepperize/cdk-organizations.AccountProps.property.roleName">roleName</a></code> | <code>string</code> | The name of an IAM role that AWS Organizations automatically preconfigures in the new member account. |

---

##### `accountName`<sup>Required</sup> <a name="accountName" id="@pepperize/cdk-organizations.AccountProps.property.accountName"></a>

```typescript
public readonly accountName: string;
```

- *Type:* string

The friendly name of the member account.

---

##### `email`<sup>Required</sup> <a name="email" id="@pepperize/cdk-organizations.AccountProps.property.email"></a>

```typescript
public readonly email: string;
```

- *Type:* string

The email address of the owner to assign to the new member account.

This email address must not already be associated with another AWS account. You must use a valid email address to complete account creation. You can't access the root user of the account or remove an account that was created with an invalid email address.

---

##### `iamUserAccessToBilling`<sup>Optional</sup> <a name="iamUserAccessToBilling" id="@pepperize/cdk-organizations.AccountProps.property.iamUserAccessToBilling"></a>

```typescript
public readonly iamUserAccessToBilling: IamUserAccessToBilling;
```

- *Type:* <a href="#@pepperize/cdk-organizations.IamUserAccessToBilling">IamUserAccessToBilling</a>
- *Default:* ALLOW

If set to ALLOW , the new account enables IAM users to access account billing information if they have the required permissions.

If set to DENY , only the root user of the new account can access account billing information.

---

##### `importOnDuplicate`<sup>Optional</sup> <a name="importOnDuplicate" id="@pepperize/cdk-organizations.AccountProps.property.importOnDuplicate"></a>

```typescript
public readonly importOnDuplicate: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to import, if a duplicate account with same name and email already exists.

---

##### `parent`<sup>Optional</sup> <a name="parent" id="@pepperize/cdk-organizations.AccountProps.property.parent"></a>

```typescript
public readonly parent: IParent;
```

- *Type:* <a href="#@pepperize/cdk-organizations.IParent">IParent</a>

The parent root or OU that you want to create the new Account in.

---

##### `removalPolicy`<sup>Optional</sup> <a name="removalPolicy" id="@pepperize/cdk-organizations.AccountProps.property.removalPolicy"></a>

```typescript
public readonly removalPolicy: RemovalPolicy;
```

- *Type:* aws-cdk-lib.RemovalPolicy
- *Default:* RemovalPolicy.Retain

If set to RemovalPolicy.DESTROY, the account will be moved to the root.

---

##### `roleName`<sup>Optional</sup> <a name="roleName" id="@pepperize/cdk-organizations.AccountProps.property.roleName"></a>

```typescript
public readonly roleName: string;
```

- *Type:* string

The name of an IAM role that AWS Organizations automatically preconfigures in the new member account.

This role trusts the management account, allowing users in the management account to assume the role, as permitted by the management account administrator. The role has administrator permissions in the new member account.

If you don't specify this parameter, the role name defaults to OrganizationAccountAccessRole.

---

### DelegatedAdministratorProps <a name="DelegatedAdministratorProps" id="@pepperize/cdk-organizations.DelegatedAdministratorProps"></a>

#### Initializer <a name="Initializer" id="@pepperize/cdk-organizations.DelegatedAdministratorProps.Initializer"></a>

```typescript
import { DelegatedAdministratorProps } from '@pepperize/cdk-organizations'

const delegatedAdministratorProps: DelegatedAdministratorProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.DelegatedAdministratorProps.property.account">account</a></code> | <code><a href="#@pepperize/cdk-organizations.IAccount">IAccount</a></code> | The member account in the organization to register as a delegated administrator. |
| <code><a href="#@pepperize/cdk-organizations.DelegatedAdministratorProps.property.servicePrincipal">servicePrincipal</a></code> | <code>string</code> | The service principal of the AWS service for which you want to make the member account a delegated administrator. |

---

##### `account`<sup>Required</sup> <a name="account" id="@pepperize/cdk-organizations.DelegatedAdministratorProps.property.account"></a>

```typescript
public readonly account: IAccount;
```

- *Type:* <a href="#@pepperize/cdk-organizations.IAccount">IAccount</a>

The member account in the organization to register as a delegated administrator.

---

##### `servicePrincipal`<sup>Required</sup> <a name="servicePrincipal" id="@pepperize/cdk-organizations.DelegatedAdministratorProps.property.servicePrincipal"></a>

```typescript
public readonly servicePrincipal: string;
```

- *Type:* string

The service principal of the AWS service for which you want to make the member account a delegated administrator.

---

### EnableAwsServiceAccessProps <a name="EnableAwsServiceAccessProps" id="@pepperize/cdk-organizations.EnableAwsServiceAccessProps"></a>

#### Initializer <a name="Initializer" id="@pepperize/cdk-organizations.EnableAwsServiceAccessProps.Initializer"></a>

```typescript
import { EnableAwsServiceAccessProps } from '@pepperize/cdk-organizations'

const enableAwsServiceAccessProps: EnableAwsServiceAccessProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.EnableAwsServiceAccessProps.property.servicePrincipal">servicePrincipal</a></code> | <code>string</code> | The service principal name of the AWS service for which you want to enable integration with your organization. |

---

##### `servicePrincipal`<sup>Required</sup> <a name="servicePrincipal" id="@pepperize/cdk-organizations.EnableAwsServiceAccessProps.property.servicePrincipal"></a>

```typescript
public readonly servicePrincipal: string;
```

- *Type:* string

The service principal name of the AWS service for which you want to enable integration with your organization.

This is typically in the form of a URL, such as service-abbreviation.amazonaws.com.

---

### EnablePolicyTypeProps <a name="EnablePolicyTypeProps" id="@pepperize/cdk-organizations.EnablePolicyTypeProps"></a>

#### Initializer <a name="Initializer" id="@pepperize/cdk-organizations.EnablePolicyTypeProps.Initializer"></a>

```typescript
import { EnablePolicyTypeProps } from '@pepperize/cdk-organizations'

const enablePolicyTypeProps: EnablePolicyTypeProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.EnablePolicyTypeProps.property.policyType">policyType</a></code> | <code><a href="#@pepperize/cdk-organizations.PolicyType">PolicyType</a></code> | *No description.* |
| <code><a href="#@pepperize/cdk-organizations.EnablePolicyTypeProps.property.root">root</a></code> | <code><a href="#@pepperize/cdk-organizations.Root">Root</a></code> | *No description.* |

---

##### `policyType`<sup>Required</sup> <a name="policyType" id="@pepperize/cdk-organizations.EnablePolicyTypeProps.property.policyType"></a>

```typescript
public readonly policyType: PolicyType;
```

- *Type:* <a href="#@pepperize/cdk-organizations.PolicyType">PolicyType</a>

---

##### `root`<sup>Required</sup> <a name="root" id="@pepperize/cdk-organizations.EnablePolicyTypeProps.property.root"></a>

```typescript
public readonly root: Root;
```

- *Type:* <a href="#@pepperize/cdk-organizations.Root">Root</a>

---

### OrganizationalUnitProps <a name="OrganizationalUnitProps" id="@pepperize/cdk-organizations.OrganizationalUnitProps"></a>

#### Initializer <a name="Initializer" id="@pepperize/cdk-organizations.OrganizationalUnitProps.Initializer"></a>

```typescript
import { OrganizationalUnitProps } from '@pepperize/cdk-organizations'

const organizationalUnitProps: OrganizationalUnitProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.OrganizationalUnitProps.property.organizationalUnitName">organizationalUnitName</a></code> | <code>string</code> | The friendly name to assign to the new OU. |
| <code><a href="#@pepperize/cdk-organizations.OrganizationalUnitProps.property.parent">parent</a></code> | <code><a href="#@pepperize/cdk-organizations.IParent">IParent</a></code> | The parent root or OU that you want to create the new OrganizationalUnit in. |
| <code><a href="#@pepperize/cdk-organizations.OrganizationalUnitProps.property.importOnDuplicate">importOnDuplicate</a></code> | <code>boolean</code> | Whether to import, if a duplicate organizational unit with same name exists in the parent exists. |
| <code><a href="#@pepperize/cdk-organizations.OrganizationalUnitProps.property.removalPolicy">removalPolicy</a></code> | <code>aws-cdk-lib.RemovalPolicy</code> | If set to RemovalPolicy.DESTROY, the organizational unit will be deleted. |

---

##### `organizationalUnitName`<sup>Required</sup> <a name="organizationalUnitName" id="@pepperize/cdk-organizations.OrganizationalUnitProps.property.organizationalUnitName"></a>

```typescript
public readonly organizationalUnitName: string;
```

- *Type:* string

The friendly name to assign to the new OU.

---

##### `parent`<sup>Required</sup> <a name="parent" id="@pepperize/cdk-organizations.OrganizationalUnitProps.property.parent"></a>

```typescript
public readonly parent: IParent;
```

- *Type:* <a href="#@pepperize/cdk-organizations.IParent">IParent</a>

The parent root or OU that you want to create the new OrganizationalUnit in.

---

##### `importOnDuplicate`<sup>Optional</sup> <a name="importOnDuplicate" id="@pepperize/cdk-organizations.OrganizationalUnitProps.property.importOnDuplicate"></a>

```typescript
public readonly importOnDuplicate: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to import, if a duplicate organizational unit with same name exists in the parent exists.

---

##### `removalPolicy`<sup>Optional</sup> <a name="removalPolicy" id="@pepperize/cdk-organizations.OrganizationalUnitProps.property.removalPolicy"></a>

```typescript
public readonly removalPolicy: RemovalPolicy;
```

- *Type:* aws-cdk-lib.RemovalPolicy
- *Default:* RemovalPolicy.Retain

If set to RemovalPolicy.DESTROY, the organizational unit will be deleted.

---

### OrganizationProps <a name="OrganizationProps" id="@pepperize/cdk-organizations.OrganizationProps"></a>

#### Initializer <a name="Initializer" id="@pepperize/cdk-organizations.OrganizationProps.Initializer"></a>

```typescript
import { OrganizationProps } from '@pepperize/cdk-organizations'

const organizationProps: OrganizationProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.OrganizationProps.property.featureSet">featureSet</a></code> | <code><a href="#@pepperize/cdk-organizations.FeatureSet">FeatureSet</a></code> | Enabling features in your organization. |

---

##### `featureSet`<sup>Optional</sup> <a name="featureSet" id="@pepperize/cdk-organizations.OrganizationProps.property.featureSet"></a>

```typescript
public readonly featureSet: FeatureSet;
```

- *Type:* <a href="#@pepperize/cdk-organizations.FeatureSet">FeatureSet</a>
- *Default:* ALL

Enabling features in your organization.

> [https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_org_support-all-features.html](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_org_support-all-features.html)

---

### ParentBaseProps <a name="ParentBaseProps" id="@pepperize/cdk-organizations.ParentBaseProps"></a>

#### Initializer <a name="Initializer" id="@pepperize/cdk-organizations.ParentBaseProps.Initializer"></a>

```typescript
import { ParentBaseProps } from '@pepperize/cdk-organizations'

const parentBaseProps: ParentBaseProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.ParentBaseProps.property.childId">childId</a></code> | <code>string</code> | *No description.* |

---

##### `childId`<sup>Required</sup> <a name="childId" id="@pepperize/cdk-organizations.ParentBaseProps.property.childId"></a>

```typescript
public readonly childId: string;
```

- *Type:* string

---

### ParentProps <a name="ParentProps" id="@pepperize/cdk-organizations.ParentProps"></a>

#### Initializer <a name="Initializer" id="@pepperize/cdk-organizations.ParentProps.Initializer"></a>

```typescript
import { ParentProps } from '@pepperize/cdk-organizations'

const parentProps: ParentProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.ParentProps.property.child">child</a></code> | <code><a href="#@pepperize/cdk-organizations.IChild">IChild</a></code> | *No description.* |

---

##### `child`<sup>Required</sup> <a name="child" id="@pepperize/cdk-organizations.ParentProps.property.child"></a>

```typescript
public readonly child: IChild;
```

- *Type:* <a href="#@pepperize/cdk-organizations.IChild">IChild</a>

---

### PolicyAttachmentProps <a name="PolicyAttachmentProps" id="@pepperize/cdk-organizations.PolicyAttachmentProps"></a>

#### Initializer <a name="Initializer" id="@pepperize/cdk-organizations.PolicyAttachmentProps.Initializer"></a>

```typescript
import { PolicyAttachmentProps } from '@pepperize/cdk-organizations'

const policyAttachmentProps: PolicyAttachmentProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.PolicyAttachmentProps.property.policy">policy</a></code> | <code><a href="#@pepperize/cdk-organizations.IPolicy">IPolicy</a></code> | The policy that you want to attach to the target. |
| <code><a href="#@pepperize/cdk-organizations.PolicyAttachmentProps.property.target">target</a></code> | <code><a href="#@pepperize/cdk-organizations.IPolicyAttachmentTarget">IPolicyAttachmentTarget</a></code> | The root, OU, or account that you want to attach the policy to. |

---

##### `policy`<sup>Required</sup> <a name="policy" id="@pepperize/cdk-organizations.PolicyAttachmentProps.property.policy"></a>

```typescript
public readonly policy: IPolicy;
```

- *Type:* <a href="#@pepperize/cdk-organizations.IPolicy">IPolicy</a>

The policy that you want to attach to the target.

---

##### `target`<sup>Required</sup> <a name="target" id="@pepperize/cdk-organizations.PolicyAttachmentProps.property.target"></a>

```typescript
public readonly target: IPolicyAttachmentTarget;
```

- *Type:* <a href="#@pepperize/cdk-organizations.IPolicyAttachmentTarget">IPolicyAttachmentTarget</a>

The root, OU, or account that you want to attach the policy to.

---

### PolicyProps <a name="PolicyProps" id="@pepperize/cdk-organizations.PolicyProps"></a>

#### Initializer <a name="Initializer" id="@pepperize/cdk-organizations.PolicyProps.Initializer"></a>

```typescript
import { PolicyProps } from '@pepperize/cdk-organizations'

const policyProps: PolicyProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.PolicyProps.property.content">content</a></code> | <code>string</code> | The policy text content to add to the new policy. |
| <code><a href="#@pepperize/cdk-organizations.PolicyProps.property.policyName">policyName</a></code> | <code>string</code> | The friendly name to assign to the policy. |
| <code><a href="#@pepperize/cdk-organizations.PolicyProps.property.policyType">policyType</a></code> | <code><a href="#@pepperize/cdk-organizations.PolicyType">PolicyType</a></code> | The type of policy to create. |
| <code><a href="#@pepperize/cdk-organizations.PolicyProps.property.description">description</a></code> | <code>string</code> | An optional description to assign to the policy. |

---

##### `content`<sup>Required</sup> <a name="content" id="@pepperize/cdk-organizations.PolicyProps.property.content"></a>

```typescript
public readonly content: string;
```

- *Type:* string

The policy text content to add to the new policy.

The text that you supply must adhere to the rules of the policy type you specify in the Type parameter.

---

##### `policyName`<sup>Required</sup> <a name="policyName" id="@pepperize/cdk-organizations.PolicyProps.property.policyName"></a>

```typescript
public readonly policyName: string;
```

- *Type:* string

The friendly name to assign to the policy.

---

##### `policyType`<sup>Required</sup> <a name="policyType" id="@pepperize/cdk-organizations.PolicyProps.property.policyType"></a>

```typescript
public readonly policyType: PolicyType;
```

- *Type:* <a href="#@pepperize/cdk-organizations.PolicyType">PolicyType</a>

The type of policy to create.

You can specify one of the following values:

---

##### `description`<sup>Optional</sup> <a name="description" id="@pepperize/cdk-organizations.PolicyProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

An optional description to assign to the policy.

---

### TagResourceProps <a name="TagResourceProps" id="@pepperize/cdk-organizations.TagResourceProps"></a>

#### Initializer <a name="Initializer" id="@pepperize/cdk-organizations.TagResourceProps.Initializer"></a>

```typescript
import { TagResourceProps } from '@pepperize/cdk-organizations'

const tagResourceProps: TagResourceProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.TagResourceProps.property.resourceId">resourceId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@pepperize/cdk-organizations.TagResourceProps.property.tags">tags</a></code> | <code>aws-cdk-lib.IResolvable</code> | *No description.* |

---

##### `resourceId`<sup>Required</sup> <a name="resourceId" id="@pepperize/cdk-organizations.TagResourceProps.property.resourceId"></a>

```typescript
public readonly resourceId: string;
```

- *Type:* string

---

##### `tags`<sup>Required</sup> <a name="tags" id="@pepperize/cdk-organizations.TagResourceProps.property.tags"></a>

```typescript
public readonly tags: IResolvable;
```

- *Type:* aws-cdk-lib.IResolvable

---

## Classes <a name="Classes" id="Classes"></a>

### DependencyChain <a name="DependencyChain" id="@pepperize/cdk-organizations.DependencyChain"></a>

- *Implements:* aws-cdk-lib.IAspect

Aspect to create dependency chain of organization resource that needs to be deployed sequentially.

#### Initializers <a name="Initializers" id="@pepperize/cdk-organizations.DependencyChain.Initializer"></a>

```typescript
import { DependencyChain } from '@pepperize/cdk-organizations'

new DependencyChain()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@pepperize/cdk-organizations.DependencyChain.visit">visit</a></code> | All aspects can visit an IConstruct. |

---

##### `visit` <a name="visit" id="@pepperize/cdk-organizations.DependencyChain.visit"></a>

```typescript
public visit(current: IConstruct): void
```

All aspects can visit an IConstruct.

###### `current`<sup>Required</sup> <a name="current" id="@pepperize/cdk-organizations.DependencyChain.visit.parameter.current"></a>

- *Type:* constructs.IConstruct

---




### Validators <a name="Validators" id="@pepperize/cdk-organizations.Validators"></a>

#### Initializers <a name="Initializers" id="@pepperize/cdk-organizations.Validators.Initializer"></a>

```typescript
import { Validators } from '@pepperize/cdk-organizations'

new Validators()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@pepperize/cdk-organizations.Validators.accountId">accountId</a></code> | *No description.* |
| <code><a href="#@pepperize/cdk-organizations.Validators.accountName">accountName</a></code> | *No description.* |
| <code><a href="#@pepperize/cdk-organizations.Validators.email">email</a></code> | *No description.* |
| <code><a href="#@pepperize/cdk-organizations.Validators.organizationalUnitName">organizationalUnitName</a></code> | *No description.* |
| <code><a href="#@pepperize/cdk-organizations.Validators.policyContent">policyContent</a></code> | *No description.* |
| <code><a href="#@pepperize/cdk-organizations.Validators.servicePrincipal">servicePrincipal</a></code> | *No description.* |

---

##### `accountId` <a name="accountId" id="@pepperize/cdk-organizations.Validators.accountId"></a>

```typescript
public accountId(id: string): boolean
```

###### `id`<sup>Required</sup> <a name="id" id="@pepperize/cdk-organizations.Validators.accountId.parameter.id"></a>

- *Type:* string

---

##### `accountName` <a name="accountName" id="@pepperize/cdk-organizations.Validators.accountName"></a>

```typescript
public accountName(name: string): boolean
```

###### `name`<sup>Required</sup> <a name="name" id="@pepperize/cdk-organizations.Validators.accountName.parameter.name"></a>

- *Type:* string

---

##### `email` <a name="email" id="@pepperize/cdk-organizations.Validators.email"></a>

```typescript
public email(email: string): boolean
```

###### `email`<sup>Required</sup> <a name="email" id="@pepperize/cdk-organizations.Validators.email.parameter.email"></a>

- *Type:* string

---

##### `organizationalUnitName` <a name="organizationalUnitName" id="@pepperize/cdk-organizations.Validators.organizationalUnitName"></a>

```typescript
public organizationalUnitName(name: string): boolean
```

###### `name`<sup>Required</sup> <a name="name" id="@pepperize/cdk-organizations.Validators.organizationalUnitName.parameter.name"></a>

- *Type:* string

---

##### `policyContent` <a name="policyContent" id="@pepperize/cdk-organizations.Validators.policyContent"></a>

```typescript
public policyContent(content: string): boolean
```

###### `content`<sup>Required</sup> <a name="content" id="@pepperize/cdk-organizations.Validators.policyContent.parameter.content"></a>

- *Type:* string

---

##### `servicePrincipal` <a name="servicePrincipal" id="@pepperize/cdk-organizations.Validators.servicePrincipal"></a>

```typescript
public servicePrincipal(servicePrincipal: string): boolean
```

###### `servicePrincipal`<sup>Required</sup> <a name="servicePrincipal" id="@pepperize/cdk-organizations.Validators.servicePrincipal.parameter.servicePrincipal"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@pepperize/cdk-organizations.Validators.of">of</a></code> | *No description.* |

---

##### `of` <a name="of" id="@pepperize/cdk-organizations.Validators.of"></a>

```typescript
import { Validators } from '@pepperize/cdk-organizations'

Validators.of()
```



## Protocols <a name="Protocols" id="Protocols"></a>

### IAccount <a name="IAccount" id="@pepperize/cdk-organizations.IAccount"></a>

- *Extends:* <a href="#@pepperize/cdk-organizations.IPolicyAttachmentTarget">IPolicyAttachmentTarget</a>, <a href="#@pepperize/cdk-organizations.IChild">IChild</a>, constructs.IConstruct, <a href="#@pepperize/cdk-organizations.IResource">IResource</a>

- *Implemented By:* <a href="#@pepperize/cdk-organizations.Account">Account</a>, <a href="#@pepperize/cdk-organizations.IAccount">IAccount</a>

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@pepperize/cdk-organizations.IAccount.delegateAdministrator">delegateAdministrator</a></code> | Enables trusted access for the AWS service (trusted service) as <strong>Delegated Administrator</strong>, which performs tasks in your organization and its accounts on your behalf. |

---

##### `delegateAdministrator` <a name="delegateAdministrator" id="@pepperize/cdk-organizations.IAccount.delegateAdministrator"></a>

```typescript
public delegateAdministrator(servicePrincipal: string): void
```

Enables trusted access for the AWS service (trusted service) as <strong>Delegated Administrator</strong>, which performs tasks in your organization and its accounts on your behalf.

###### `servicePrincipal`<sup>Required</sup> <a name="servicePrincipal" id="@pepperize/cdk-organizations.IAccount.delegateAdministrator.parameter.servicePrincipal"></a>

- *Type:* string

The supported AWS service that you specify.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.IAccount.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@pepperize/cdk-organizations.IAccount.property.accountArn">accountArn</a></code> | <code>string</code> | The Amazon Resource Name (ARN) of the account. |
| <code><a href="#@pepperize/cdk-organizations.IAccount.property.accountId">accountId</a></code> | <code>string</code> | If the account was created successfully, the unique identifier (ID) of the new account. |
| <code><a href="#@pepperize/cdk-organizations.IAccount.property.accountName">accountName</a></code> | <code>string</code> | The friendly name of the account. |
| <code><a href="#@pepperize/cdk-organizations.IAccount.property.email">email</a></code> | <code>string</code> | The email address of the owner to assign to the new member account. |

---

##### `node`<sup>Required</sup> <a name="node" id="@pepperize/cdk-organizations.IAccount.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `accountArn`<sup>Required</sup> <a name="accountArn" id="@pepperize/cdk-organizations.IAccount.property.accountArn"></a>

```typescript
public readonly accountArn: string;
```

- *Type:* string

The Amazon Resource Name (ARN) of the account.

---

##### `accountId`<sup>Required</sup> <a name="accountId" id="@pepperize/cdk-organizations.IAccount.property.accountId"></a>

```typescript
public readonly accountId: string;
```

- *Type:* string

If the account was created successfully, the unique identifier (ID) of the new account.

Exactly 12 digits.

---

##### `accountName`<sup>Required</sup> <a name="accountName" id="@pepperize/cdk-organizations.IAccount.property.accountName"></a>

```typescript
public readonly accountName: string;
```

- *Type:* string

The friendly name of the account.

---

##### `email`<sup>Required</sup> <a name="email" id="@pepperize/cdk-organizations.IAccount.property.email"></a>

```typescript
public readonly email: string;
```

- *Type:* string

The email address of the owner to assign to the new member account.

This email address must not already be associated with another AWS account. You must use a valid email address to complete account creation. You can't access the root user of the account or remove an account that was created with an invalid email address.

---

### IChild <a name="IChild" id="@pepperize/cdk-organizations.IChild"></a>

- *Extends:* constructs.IConstruct, <a href="#@pepperize/cdk-organizations.IResource">IResource</a>

- *Implemented By:* <a href="#@pepperize/cdk-organizations.Account">Account</a>, <a href="#@pepperize/cdk-organizations.OrganizationalUnit">OrganizationalUnit</a>, <a href="#@pepperize/cdk-organizations.IAccount">IAccount</a>, <a href="#@pepperize/cdk-organizations.IChild">IChild</a>, <a href="#@pepperize/cdk-organizations.IOrganizationalUnit">IOrganizationalUnit</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.IChild.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@pepperize/cdk-organizations.IChild.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

### IOrganization <a name="IOrganization" id="@pepperize/cdk-organizations.IOrganization"></a>

- *Extends:* constructs.IConstruct

- *Implemented By:* <a href="#@pepperize/cdk-organizations.Organization">Organization</a>, <a href="#@pepperize/cdk-organizations.IOrganization">IOrganization</a>

Creates an organization to consolidate your AWS accounts so that you can administer them as a single unit.

An organization has one management account along with zero or more member accounts. You can organize the accounts in a hierarchical, tree-like structure with a root at the top and organizational units nested under the root. Each account can be directly in the root, or placed in one of the OUs in the hierarchy. An organization has the functionality that is determined by the feature set that you enable.

<strong>The account whose user is calling the CreateOrganization operation automatically becomes the management account of the new organization.</strong>

<strong>For deletion of an organization you must previously remove all the member accounts, OUs, and policies from the organization!</strong>

> [https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_org_create.html#create-org](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_org_create.html#create-org)


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.IOrganization.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@pepperize/cdk-organizations.IOrganization.property.featureSet">featureSet</a></code> | <code><a href="#@pepperize/cdk-organizations.FeatureSet">FeatureSet</a></code> | Specifies the functionality that currently is available to the organization. |
| <code><a href="#@pepperize/cdk-organizations.IOrganization.property.managementAccountArn">managementAccountArn</a></code> | <code>string</code> | The Amazon Resource Name (ARN) of the account that is designated as the management account for the organization. |
| <code><a href="#@pepperize/cdk-organizations.IOrganization.property.managementAccountEmail">managementAccountEmail</a></code> | <code>string</code> | The email address that is associated with the AWS account that is designated as the management account for the organization. |
| <code><a href="#@pepperize/cdk-organizations.IOrganization.property.managementAccountId">managementAccountId</a></code> | <code>string</code> | The unique identifier (ID) of the management account of an organization. |
| <code><a href="#@pepperize/cdk-organizations.IOrganization.property.organizationArn">organizationArn</a></code> | <code>string</code> | The Amazon Resource Name (ARN) of an organization. |
| <code><a href="#@pepperize/cdk-organizations.IOrganization.property.organizationId">organizationId</a></code> | <code>string</code> | The unique identifier (ID) of an organization. |
| <code><a href="#@pepperize/cdk-organizations.IOrganization.property.principal">principal</a></code> | <code>aws-cdk-lib.aws_iam.IPrincipal</code> | The principal that represents this AWS Organization. |

---

##### `node`<sup>Required</sup> <a name="node" id="@pepperize/cdk-organizations.IOrganization.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `featureSet`<sup>Required</sup> <a name="featureSet" id="@pepperize/cdk-organizations.IOrganization.property.featureSet"></a>

```typescript
public readonly featureSet: FeatureSet;
```

- *Type:* <a href="#@pepperize/cdk-organizations.FeatureSet">FeatureSet</a>

Specifies the functionality that currently is available to the organization.

If set to "ALL", then all features are enabled and policies can be applied to accounts in the organization. If set to "CONSOLIDATED_BILLING", then only consolidated billing functionality is available.

---

##### `managementAccountArn`<sup>Required</sup> <a name="managementAccountArn" id="@pepperize/cdk-organizations.IOrganization.property.managementAccountArn"></a>

```typescript
public readonly managementAccountArn: string;
```

- *Type:* string

The Amazon Resource Name (ARN) of the account that is designated as the management account for the organization.

---

##### `managementAccountEmail`<sup>Required</sup> <a name="managementAccountEmail" id="@pepperize/cdk-organizations.IOrganization.property.managementAccountEmail"></a>

```typescript
public readonly managementAccountEmail: string;
```

- *Type:* string

The email address that is associated with the AWS account that is designated as the management account for the organization.

---

##### `managementAccountId`<sup>Required</sup> <a name="managementAccountId" id="@pepperize/cdk-organizations.IOrganization.property.managementAccountId"></a>

```typescript
public readonly managementAccountId: string;
```

- *Type:* string

The unique identifier (ID) of the management account of an organization.

---

##### `organizationArn`<sup>Required</sup> <a name="organizationArn" id="@pepperize/cdk-organizations.IOrganization.property.organizationArn"></a>

```typescript
public readonly organizationArn: string;
```

- *Type:* string

The Amazon Resource Name (ARN) of an organization.

---

##### `organizationId`<sup>Required</sup> <a name="organizationId" id="@pepperize/cdk-organizations.IOrganization.property.organizationId"></a>

```typescript
public readonly organizationId: string;
```

- *Type:* string

The unique identifier (ID) of an organization.

The regex pattern for an organization ID string requires "o-" followed by from 10 to 32 lowercase letters or digits.

---

##### `principal`<sup>Required</sup> <a name="principal" id="@pepperize/cdk-organizations.IOrganization.property.principal"></a>

```typescript
public readonly principal: IPrincipal;
```

- *Type:* aws-cdk-lib.aws_iam.IPrincipal

The principal that represents this AWS Organization.

---

### IOrganizationalUnit <a name="IOrganizationalUnit" id="@pepperize/cdk-organizations.IOrganizationalUnit"></a>

- *Extends:* <a href="#@pepperize/cdk-organizations.IPolicyAttachmentTarget">IPolicyAttachmentTarget</a>, <a href="#@pepperize/cdk-organizations.IParent">IParent</a>, <a href="#@pepperize/cdk-organizations.IChild">IChild</a>, constructs.IConstruct

- *Implemented By:* <a href="#@pepperize/cdk-organizations.OrganizationalUnit">OrganizationalUnit</a>, <a href="#@pepperize/cdk-organizations.IOrganizationalUnit">IOrganizationalUnit</a>

A container for accounts within a root.

An OU also can contain other OUs, enabling you to create a hierarchy that resembles an upside-down tree, with a root at the top and branches of OUs that reach down, ending in accounts that are the leaves of the tree. When you attach a policy to one of the nodes in the hierarchy, it flows down and affects all the branches (OUs) and leaves (accounts) beneath it. An OU can have exactly one parent, and currently each account can be a member of exactly one OU.

<strong>You must first move all accounts out of the OU and any child OUs, and then you can delete the child OUs.</strong>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.IOrganizationalUnit.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@pepperize/cdk-organizations.IOrganizationalUnit.property.organizationalUnitArn">organizationalUnitArn</a></code> | <code>string</code> | The Amazon Resource Name (ARN) of this OU. |
| <code><a href="#@pepperize/cdk-organizations.IOrganizationalUnit.property.organizationalUnitId">organizationalUnitId</a></code> | <code>string</code> | The unique identifier (ID) associated with this OU. |
| <code><a href="#@pepperize/cdk-organizations.IOrganizationalUnit.property.organizationalUnitName">organizationalUnitName</a></code> | <code>string</code> | The friendly name of this OU. |

---

##### `node`<sup>Required</sup> <a name="node" id="@pepperize/cdk-organizations.IOrganizationalUnit.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `organizationalUnitArn`<sup>Required</sup> <a name="organizationalUnitArn" id="@pepperize/cdk-organizations.IOrganizationalUnit.property.organizationalUnitArn"></a>

```typescript
public readonly organizationalUnitArn: string;
```

- *Type:* string

The Amazon Resource Name (ARN) of this OU.

For more information about ARNs in Organizations, see [ARN Formats Supported by Organizations](https://docs.aws.amazon.com/service-authorization/latest/reference/list_awsorganizations.html#awsorganizations-resources-for-iam-policies) in the AWS Service Authorization Reference.

---

##### `organizationalUnitId`<sup>Required</sup> <a name="organizationalUnitId" id="@pepperize/cdk-organizations.IOrganizationalUnit.property.organizationalUnitId"></a>

```typescript
public readonly organizationalUnitId: string;
```

- *Type:* string

The unique identifier (ID) associated with this OU.

The regex pattern for an organizational unit ID string requires "ou-" followed by from 4 to 32 lowercase letters or digits (the ID of the root that contains the OU). This string is followed by a second "-" dash and from 8 to 32 additional lowercase letters or digits.

---

##### `organizationalUnitName`<sup>Required</sup> <a name="organizationalUnitName" id="@pepperize/cdk-organizations.IOrganizationalUnit.property.organizationalUnitName"></a>

```typescript
public readonly organizationalUnitName: string;
```

- *Type:* string

The friendly name of this OU.

---

### IParent <a name="IParent" id="@pepperize/cdk-organizations.IParent"></a>

- *Extends:* constructs.IConstruct, <a href="#@pepperize/cdk-organizations.IResource">IResource</a>

- *Implemented By:* <a href="#@pepperize/cdk-organizations.OrganizationalUnit">OrganizationalUnit</a>, <a href="#@pepperize/cdk-organizations.Parent">Parent</a>, <a href="#@pepperize/cdk-organizations.ParentBase">ParentBase</a>, <a href="#@pepperize/cdk-organizations.Root">Root</a>, <a href="#@pepperize/cdk-organizations.IOrganizationalUnit">IOrganizationalUnit</a>, <a href="#@pepperize/cdk-organizations.IParent">IParent</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.IParent.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@pepperize/cdk-organizations.IParent.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

### IPolicy <a name="IPolicy" id="@pepperize/cdk-organizations.IPolicy"></a>

- *Extends:* constructs.IConstruct

- *Implemented By:* <a href="#@pepperize/cdk-organizations.Policy">Policy</a>, <a href="#@pepperize/cdk-organizations.IPolicy">IPolicy</a>

Policies in AWS Organizations enable you to apply additional types of management to the AWS accounts in your organization.

<strong>You can use policies when all features are enabled in your organization.</strong>

<strong>Before you can create and attach a policy to your organization, you must enable that policy type for use.</strong>

> [FeatureSet](FeatureSet)


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.IPolicy.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@pepperize/cdk-organizations.IPolicy.property.policyId">policyId</a></code> | <code>string</code> | The unique identifier (ID) of the policy. |

---

##### `node`<sup>Required</sup> <a name="node" id="@pepperize/cdk-organizations.IPolicy.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `policyId`<sup>Required</sup> <a name="policyId" id="@pepperize/cdk-organizations.IPolicy.property.policyId"></a>

```typescript
public readonly policyId: string;
```

- *Type:* string

The unique identifier (ID) of the policy.

The regex pattern for a policy ID string requires "p-" followed by from 8 to 128 lowercase or uppercase letters, digits, or the underscore character (_).

---

### IPolicyAttachmentTarget <a name="IPolicyAttachmentTarget" id="@pepperize/cdk-organizations.IPolicyAttachmentTarget"></a>

- *Extends:* constructs.IDependable, <a href="#@pepperize/cdk-organizations.IResource">IResource</a>

- *Implemented By:* <a href="#@pepperize/cdk-organizations.Account">Account</a>, <a href="#@pepperize/cdk-organizations.OrganizationalUnit">OrganizationalUnit</a>, <a href="#@pepperize/cdk-organizations.Root">Root</a>, <a href="#@pepperize/cdk-organizations.IAccount">IAccount</a>, <a href="#@pepperize/cdk-organizations.IOrganizationalUnit">IOrganizationalUnit</a>, <a href="#@pepperize/cdk-organizations.IPolicyAttachmentTarget">IPolicyAttachmentTarget</a>



### IResource <a name="IResource" id="@pepperize/cdk-organizations.IResource"></a>

- *Implemented By:* <a href="#@pepperize/cdk-organizations.Account">Account</a>, <a href="#@pepperize/cdk-organizations.OrganizationalUnit">OrganizationalUnit</a>, <a href="#@pepperize/cdk-organizations.Parent">Parent</a>, <a href="#@pepperize/cdk-organizations.ParentBase">ParentBase</a>, <a href="#@pepperize/cdk-organizations.Root">Root</a>, <a href="#@pepperize/cdk-organizations.IAccount">IAccount</a>, <a href="#@pepperize/cdk-organizations.IChild">IChild</a>, <a href="#@pepperize/cdk-organizations.IOrganizationalUnit">IOrganizationalUnit</a>, <a href="#@pepperize/cdk-organizations.IParent">IParent</a>, <a href="#@pepperize/cdk-organizations.IPolicyAttachmentTarget">IPolicyAttachmentTarget</a>, <a href="#@pepperize/cdk-organizations.IResource">IResource</a>

Interface for an AWS Organizations resource.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@pepperize/cdk-organizations.IResource.identifier">identifier</a></code> | The unique identifier (ID) of the parent root, organizational unit (OU), account, or policy that you want to create the new OU in. |

---

##### `identifier` <a name="identifier" id="@pepperize/cdk-organizations.IResource.identifier"></a>

```typescript
public identifier(): string
```

The unique identifier (ID) of the parent root, organizational unit (OU), account, or policy that you want to create the new OU in.


### ITaggableResource <a name="ITaggableResource" id="@pepperize/cdk-organizations.ITaggableResource"></a>

- *Extends:* aws-cdk-lib.ITaggable

- *Implemented By:* <a href="#@pepperize/cdk-organizations.Account">Account</a>, <a href="#@pepperize/cdk-organizations.OrganizationalUnit">OrganizationalUnit</a>, <a href="#@pepperize/cdk-organizations.Root">Root</a>, <a href="#@pepperize/cdk-organizations.ITaggableResource">ITaggableResource</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pepperize/cdk-organizations.ITaggableResource.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | TagManager to set, remove and format tags. |

---

##### `tags`<sup>Required</sup> <a name="tags" id="@pepperize/cdk-organizations.ITaggableResource.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

TagManager to set, remove and format tags.

---

## Enums <a name="Enums" id="Enums"></a>

### FeatureSet <a name="FeatureSet" id="@pepperize/cdk-organizations.FeatureSet"></a>

Specifies the feature set supported by the new organization.

Each feature set supports different levels of functionality.

> [https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html#feature-set](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html#feature-set)

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@pepperize/cdk-organizations.FeatureSet.CONSOLIDATED_BILLING">CONSOLIDATED_BILLING</a></code> | All member accounts have their bills consolidated to and paid by the management account. |
| <code><a href="#@pepperize/cdk-organizations.FeatureSet.ALL">ALL</a></code> | In addition to all the features supported by the consolidated billing feature set, the management account can also apply any policy type to any member account in the organization. |

---

##### `CONSOLIDATED_BILLING` <a name="CONSOLIDATED_BILLING" id="@pepperize/cdk-organizations.FeatureSet.CONSOLIDATED_BILLING"></a>

All member accounts have their bills consolidated to and paid by the management account.

For more information, see [Consolidated billing](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html#feature-set-cb-only) in the AWS Organizations User Guide. The consolidated billing feature subset isn’t available for organizations in the AWS GovCloud (US) Region.

---


##### `ALL` <a name="ALL" id="@pepperize/cdk-organizations.FeatureSet.ALL"></a>

In addition to all the features supported by the consolidated billing feature set, the management account can also apply any policy type to any member account in the organization.

For more information, see [All features](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html#feature-set-all) in the AWS Organizations User Guide.

---


### IamUserAccessToBilling <a name="IamUserAccessToBilling" id="@pepperize/cdk-organizations.IamUserAccessToBilling"></a>

> [https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/control-access-billing.html#ControllingAccessWebsite-Activate](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/control-access-billing.html#ControllingAccessWebsite-Activate)

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@pepperize/cdk-organizations.IamUserAccessToBilling.ALLOW">ALLOW</a></code> | If set to ALLOW, the new account enables IAM users to access account billing information if they have the required permissions. |
| <code><a href="#@pepperize/cdk-organizations.IamUserAccessToBilling.DENY">DENY</a></code> | If set to DENY, only the root user of the new account can access account billing information. |

---

##### `ALLOW` <a name="ALLOW" id="@pepperize/cdk-organizations.IamUserAccessToBilling.ALLOW"></a>

If set to ALLOW, the new account enables IAM users to access account billing information if they have the required permissions.

---


##### `DENY` <a name="DENY" id="@pepperize/cdk-organizations.IamUserAccessToBilling.DENY"></a>

If set to DENY, only the root user of the new account can access account billing information.

---


### PolicyType <a name="PolicyType" id="@pepperize/cdk-organizations.PolicyType"></a>

Organizations offers policy types in the following two broad categories: <ol>      <li>Authorization policies help you to centrally manage the security of the AWS accounts in your organization.</li>      <li>Management policies enable you to centrally configure and manage AWS services and their features.</li> </ol>.

> [https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies.html#orgs-policy-types](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies.html#orgs-policy-types)

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@pepperize/cdk-organizations.PolicyType.SERVICE_CONTROL_POLICY">SERVICE_CONTROL_POLICY</a></code> | Service control policies (SCPs) offer central control over the maximum available permissions for all of the accounts in your organization. |
| <code><a href="#@pepperize/cdk-organizations.PolicyType.TAG_POLICY">TAG_POLICY</a></code> | Tag policies help you standardize the tags attached to the AWS resources in your organization's accounts. |
| <code><a href="#@pepperize/cdk-organizations.PolicyType.BACKUP_POLICY">BACKUP_POLICY</a></code> | Backup policies help you centrally manage and apply backup plans to the AWS resources across your organization's accounts. |
| <code><a href="#@pepperize/cdk-organizations.PolicyType.AISERVICES_OPT_OUT_POLICY">AISERVICES_OPT_OUT_POLICY</a></code> | Artificial Intelligence (AI) services opt-out policies enable you to control data collection for AWS AI services for all of your organization's accounts. |

---

##### `SERVICE_CONTROL_POLICY` <a name="SERVICE_CONTROL_POLICY" id="@pepperize/cdk-organizations.PolicyType.SERVICE_CONTROL_POLICY"></a>

Service control policies (SCPs) offer central control over the maximum available permissions for all of the accounts in your organization.

---


##### `TAG_POLICY` <a name="TAG_POLICY" id="@pepperize/cdk-organizations.PolicyType.TAG_POLICY"></a>

Tag policies help you standardize the tags attached to the AWS resources in your organization's accounts.

---


##### `BACKUP_POLICY` <a name="BACKUP_POLICY" id="@pepperize/cdk-organizations.PolicyType.BACKUP_POLICY"></a>

Backup policies help you centrally manage and apply backup plans to the AWS resources across your organization's accounts.

---


##### `AISERVICES_OPT_OUT_POLICY` <a name="AISERVICES_OPT_OUT_POLICY" id="@pepperize/cdk-organizations.PolicyType.AISERVICES_OPT_OUT_POLICY"></a>

Artificial Intelligence (AI) services opt-out policies enable you to control data collection for AWS AI services for all of your organization's accounts.

---

