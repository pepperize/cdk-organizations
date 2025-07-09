r'''
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://makeapullrequest.com)
[![GitHub](https://img.shields.io/github/license/pepperize/cdk-organizations?style=flat-square)](https://github.com/pepperize/cdk-organizations/blob/main/LICENSE)
[![npm (scoped)](https://img.shields.io/npm/v/@pepperize/cdk-organizations?style=flat-square)](https://www.npmjs.com/package/@pepperize/cdk-organizations)
[![PyPI](https://img.shields.io/pypi/v/pepperize.cdk-organizations?style=flat-square)](https://pypi.org/project/pepperize.cdk-organizations/)
[![Nuget](https://img.shields.io/nuget/v/Pepperize.CDK.Organizations?style=flat-square)](https://www.nuget.org/packages/Pepperize.CDK.Organizations/)
[![Sonatype Nexus (Releases)](https://img.shields.io/nexus/r/com.pepperize/cdk-organizations?server=https%3A%2F%2Fs01.oss.sonatype.org%2F&style=flat-square)](https://s01.oss.sonatype.org/content/repositories/releases/com/pepperize/cdk-organizations/)
[![GitHub Workflow Status (branch)](https://img.shields.io/github/actions/workflow/status/pepperize/cdk-organizations/release.yml?branch=main&label=release&style=flat-square)](https://github.com/pepperize/cdk-organizations/actions/workflows/release.yml)
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/pepperize/cdk-organizations?sort=semver&style=flat-square)](https://github.com/pepperize/cdk-organizations/releases)
[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod&style=flat-square)](https://gitpod.io/#https://github.com/pepperize/cdk-organizations)

# CDK Organizations [![Mentioned in Awesome CDK](https://awesome.re/mentioned-badge.svg)](https://github.com/kolomied/awesome-cdk)

Manage AWS organizations, organizational units (OU), accounts and service control policies (SCP).

Features:

* [Organization](https://github.com/pepperize/cdk-organizations#organization)
* [Organizational Unit (OU)](https://github.com/pepperize/cdk-organizations#organizational-unit-ou)
* [Account](https://github.com/pepperize/cdk-organizations#account)
* [Delegated Administrator](https://github.com/pepperize/cdk-organizations#delegated-administrator)
* [Trusted Service](https://github.com/pepperize/cdk-organizations#enable-an-aws-service-trusted-service)
* [Policies](https://github.com/pepperize/cdk-organizations#policy), [PolicyTypes](https://github.com/pepperize/cdk-organizations#enable-a-policy-type), [PolicyAttachment](https://github.com/pepperize/cdk-organizations#policyattachment)
* [Tagging](https://github.com/pepperize/cdk-organizations#tagging-resources)

[![View on Construct Hub](https://constructs.dev/badge?package=%40pepperize%2Fcdk-organizations)](https://constructs.dev/packages/@pepperize/cdk-organizations)

## Install

### TypeScript

```shell
npm install @pepperize/cdk-organizations
```

or

```shell
yarn add @pepperize/cdk-organizations
```

### Python

```shell
pip install pepperize.cdk-organizations
```

### C# / .Net

```
dotnet add package Pepperize.CDK.Organizations
```

### Java

```xml
<dependency>
  <groupId>com.pepperize</groupId>
  <artifactId>cdk-organizations</artifactId>
  <version>${cdkOrganizations.version}</version>
</dependency>
```

## Contributing

Contributions of all kinds are welcome :rocket: Check out our [contributor's guide](https://github.com/pepperize/cdk-organizations/blob/main/CONTRIBUTING.md).

For a quick start, [check out](https://github.com/pepperize/cdk-organizations/fork) a development environment:

```shell
git clone git@github.com:pepperize/cdk-organizations
cd cdk-organizations
# install dependencies
yarn
# build with projen
yarn build
```

## Getting Started

1. Create a new account

   [Signup for AWS](https://portal.aws.amazon.com/billing/signup#/start)
2. Prepare an IAM User with `AdministratorAccess`

   To deploy your new organization, you have to create an Administrator with an AccessKey

   * [Creating your first IAM admin user and user group](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html)
   * [Managing access keys for IAM users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey)
3. Create a new CDK TypeScript App project with [projen](https://github.com/projen/projen)

   ```shell
   mkdir my-project
   cd my-project
   git init -b main
   npx projen new awscdk-app-ts
   ```
4. Add `@pepperize/cdk-organizations` to your dependencies in `.projenrc.js`

   ```python
   const project = new awscdk.AwsCdkTypeScriptApp({
     //...
     deps: ["@pepperize/cdk-organizations"],
   });
   ```
5. Install the dependency

   ```shell
   npx projen
   ```
6. Create a stack

   ```python
   import { Account, Organization, OrganizationalUnit } from "@pepperize/cdk-organizations";
   import { Stack } from "aws-cdk-lib";

   export class OrganizationStack extends Stack {
     constructor(scope: Construct, id: string, props: StackProps = {}) {
       super(scope, id, props);

       // Create your organization
       const organization = new Organization(stack, "Organization", {});

       // Create an organizational unit (OU)
       const organizationUnit = new OrganizationalUnit(stack, "OrganizationalUnit", {
         organizationalUnitName: "MyFirstOU",
         parent: organization.root,
       });

       // Create an account
       const account = new Account(stack, "Account", {
         accountName: "MyFirstAccount",
         email: "<your email for the member account>",
         parent: organizationUnit,
       });
     }
   }
   ```
7. Configure your AWS CLI to deploy

   * [Configuring the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)
   * [AWSume](https://awsu.me/)

   The easiest is to export your access key

   ```shell
   export AWS_ACCESS_KEY_ID=<your created access key id>
   export AWS_SECRET_ACCESS_KEY=<your created secret access key>
   ```
8. Deploy your first AWS organization

   ```shell
   export CDK_DEFAULT_REGION=<your AWS region>
   export CDK_DEFAULT_ACCOUNT=<your AWS account id>
   ```

   ```shell
   yarn deploy
   ```

## Usage

### Organization

To create a new organization or import an existing organization, add the following construct to your stack:

```python
const organization = new Organization(stack, "Organization", {
  featureSet: FeatureSet.ALL, // (default) required later on to enable SCPs, enable AWS services or delegate an administrator account
});
organization.root; // The organization's root is automatically created
```

* `FeatureSet.ALL` is required for advanced features like Service Control Policies (SCP) and is the [preferred way to work with AWS Organizations](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_org_support-all-features.html)
* The account which deploys the stack, will automatically become the management account of the new organization.
* If an organization already exists, it will be imported automatically. You can disable this behaviour by passing `importOnDuplicate: false` in the props.
* If the construct is removed from the stack, the organization will remain and must be deleted manually. For deletion of an organization you must previously remove all the member accounts, OUs, and policies from the organization. [Deleting the organization by removing the management account](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_org_delete.html)
* An organization root is automatically created for you when you create the new organization.

See [IOrganization](https://github.com/pepperize/cdk-organizations/blob/main/API.md#@pepperize/cdk-organizations.IOrganization)

### Organization Principal

To retrieve the AWS IAM organization principal in a member account, add the following to any construct:

```
const organization = Organization.of(scope, "Organization");
organization.principal; // The AWS IAM organization principal
```

* This helper construct can be used in any member account in the organization.

See [AWS Organization API Reference - DescribeOrganization](https://docs.aws.amazon.com/organizations/latest/APIReference/API_DescribeOrganization.html)

### Organizational Unit (OU)

To create a new organizational unit (OU), add the following construct to your stack:

```python
const organizationUnit = new OrganizationalUnit(stack, "Organization", {
  organizationalUnitName: "Project2",
  parent: organization.root,
});
```

* The parent of an organizational unit (OU) can be either the organization's root or another OU within the organization.
* An organizational unit (OU) can't be moved. You have to create a new OU first, move all the accounts and then delete the old OU.
* For deletion of an organizational unit (OU) you must first move all accounts out of the OU and any child OUs, and then you can delete the child OUs. [Deleting an organizational unit](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_ous.html#delete-ou)

See [IOrganizationalUnit](https://github.com/pepperize/cdk-organizations/blob/main/API.md#@pepperize/cdk-organizations.IOrganizationalUnit)

#### Organizational Unit (OU) Properties

* `importOnDuplicate` If an organizational unit (OU) with the name exists in the parent, it will be imported.
* `removalPolicy` Default `RemovalPolicy.Retain` If you set `removalPolicy` to `RemovalPolicy.destroy`, the organizational unit (OU) will be deleted on Cloudformation delete event.

See [OrganizationalUnitProps](https://github.com/pepperize/cdk-organizations/blob/main/API.md#@pepperize/cdk-organizations.OrganizationalUnitProps)

### Account

To create a new account, add the following construct to your stack:

```python
new Account(stack, "Account", {
  accountName: "MyAccount",
  email: "info@pepperize.com",
  parent: organization.root,
});
```

* The email address must not already be associated with another AWS account. You may suffix the email address, i.e. `info+account-123456789012@pepperize.com`.
* The AWS Organizations supports only a one account creation `IN_PROGRESS`. Ensure account creation by using `account2.node.addDependency(account1)` [dependency relationship](https://docs.aws.amazon.com/cdk/api/v1/docs/core-readme.html#dependencies).
* An account will be created and moved to the parent, if the parent is an organizational unit (OU).
* An account can only be created from within the management account.

See [IAccount](https://github.com/pepperize/cdk-organizations/blob/main/API.md#@pepperize/cdk-organizations.IAccount)

#### Account Properties

* `importOnDuplicate` If an account with the same email address exists in the organization, it will be imported.
* `removalPolicy` Default `RemovalPolicy.Retain` If you set `removalPolicy` to `RemovalPolicy.destroy`, the account will be closed. [Closing an AWS account](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_close.html)
* `iamUserAccessToBilling` Default `IamUserAccessToBilling.ALLOW` If you set `iamUserAccessToBilling` to `ALLOW`, IAM users and roles that have appropriate permissions can view billing information for the account.
* `roleName` Default `OrganizationAccountAccessRole` is preconfigures in the newly created account and grants users in the management account administrator permissions in the new member account.

See [AccountProps](https://github.com/pepperize/cdk-organizations/blob/main/API.md#@pepperize/cdk-organizations.AccountProps)

### Delegated Administrator

A compatible AWS service (trusted service) can register an AWS member account in the organization as an administrator in the organization on your behalf. To enable an AWS account as administrator of that trusted in your organization call `delegateAdministrator` on your account:

```python
const account = new Account(stack, "Account", {
  accountName: "StackSetsDelegatedAdministrator",
  email: "info@pepperize.com",
});
account.delegateAdministrator("stacksets.amazonaws.com");
```

* [AWS services that support Delegated Administrator](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services_list.html)
* To be able to use Delegated Administrator, your organization must have [all features](https://github.com/pepperize/cdk-organizations/blob/main/API.md#@pepperize/cdk-organizations.FeatureSet) enabled.

See [DelegatedAdministrator](https://github.com/pepperize/cdk-organizations/blob/main/API.md#@pepperize/cdk-organizations.DelegatedAdministrator)

### Enable an AWS Service (trusted service)

To enable trusted access for a supported AWS service (trusted service), which performs tasks in your organization and its accounts on your behalf, call `enableAwsService` on your organization:

```python
const organization = new Organization(stack, "Organization", {
  featureSet: FeatureSet.ALL, // (default) the organization must be created with all features enabled
});
organization.enableAwsServiceAccess("ssm.amazonaws.com");
```

* To enable trusted access, you must have [all features](https://github.com/pepperize/cdk-organizations/blob/main/API.md#@pepperize/cdk-organizations.FeatureSet) enabled.
* It's recommended to use only the trusted service's console [How to enable or disable trusted access](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services.html#orgs_how-to-enable-disable-trusted-access)
* [AWS services that you can use with AWS Organizations](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services_list.html)

See [EnableAwsServiceAccess](https://github.com/pepperize/cdk-organizations/blob/main/API.md#@pepperize/cdk-organizations.EnableAwsServiceAccess)

### Enable a Policy Type

To enable a policy type call `enablePolicyType` on your organization.

```python
const organization = new Organization(stack, "Organization", {
  featureSet: FeatureSet.ALL, // (default) the organization must be created with all features enabled
});
organization.enablePolicyType(PolicyType.SERVICE_CONTROL_POLICY);
organization.enablePolicyType(PolicyType.TAG_POLICY);
organization.enablePolicyType(PolicyType.BACKUP_POLICY);
organization.enablePolicyType(PolicyType.AISERVICES_OPT_OUT_POLICY);
```

* To create or attach policies later on, you have to [enable all features](https://github.com/pepperize/cdk-organizations/blob/main/API.md#@pepperize/cdk-organizations.FeatureSet) and the [policy type](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies.html#orgs-policy-types) .

See [EnablePolicyType](https://github.com/pepperize/cdk-organizations/blob/main/API.md#enablepolicytype-), [PolicyType](https://github.com/pepperize/cdk-organizations/blob/main/API.md#policytype-).

### Policy

To create a new policy add the following construct to your stack:

```python
new Policy(stack, "Policy", {
  content: '{\n"Version":"2012-10-17","Statement":{\n"Effect":"Allow","Action":"s3:*"\n}\n}',
  description: "Enables admins of attached accounts to delegate all S3 permissions",
  policyName: "AllowAllS3Actions",
  policyType: PolicyType.SERVICE_CONTROL_POLICY,
});
```

* To create or attach policies, you must have [all features](https://github.com/pepperize/cdk-organizations/blob/main/API.md#@pepperize/cdk-organizations.FeatureSet) and the [policy type](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies.html#orgs-policy-types) enabled.
* The [SCP Syntax](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_syntax.html) is quite similar to IAM policies, but way more limited.

See [Policy](https://github.com/pepperize/cdk-organizations/blob/main/API.md#@pepperize/cdk-organizations.Policy)

### PolicyAttachment

To attach a policy to a root, an organizational unit (OU), or an individual account call `attachPolicy` with the policy to attach:

```python
organization.enablePolicyType(PolicyType.TAG_POLICY);

const policy = new Policy(stack, "Policy", {
  content: '{\n"tags":{\n"CostCenter":{\n"tag_key":{\n"@@assign":"CostCenter"\n}\n}\n}\n}',
  description: "Defines the CostCenter tag key",
  policyName: "CostCenterTag",
  policyType: PolicyType.TAG_POLICY,
});

organization.attachPolicy(policy);
organizationalUnit.attachPolicy(policy);
account.attachPolicy(policy);
```

* To create or attach policies, you must have [all features](https://github.com/pepperize/cdk-organizations/blob/main/API.md#@pepperize/cdk-organizations.FeatureSet) and the [policy type](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies.html#orgs-policy-types) enabled.

### Tagging resources

To tag a resource you may follow the [AWS CDK Developer Guide - Tagging](https://docs.aws.amazon.com/cdk/v2/guide/tagging.html):

You can add one or more tags to the following resources in AWS Organizations.

* Account
* Organization root
* Organizational unit (OU)
* Policy

See [Tagging AWS Organizations resources](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_tagging.html), [ITaggableResource](https://github.com/pepperize/cdk-organizations/blob/main/API.md#@pepperize/cdk-organizations.ITaggableResource)

#### Tagging an organization's root

```python
import { Tags } from "aws-cdk-lib";

const organization = new Organization();
Tags.of(organization.root).add("key", "value");
```

#### Tagging an organizational unit (OU)

```python
import { Tags } from "aws-cdk-lib";

const organizationalUnit = new OrganizationalUnit();
Tags.of(organizationalUnit).add("key", "value");
```

#### Tagging an account

```python
import { Tags } from "aws-cdk-lib";

const account = new Account();
Tags.of(account).add("key", "value");
```

#### Tagging a policy

```python
import { Tags } from "aws-cdk-lib";

const policy = new Policy();
Tags.of(policy).add("key", "value");
```

## Limitations

AWS Organizations has some limitations:

* The stack's account must be the management account of an existing organization.
* The stack's account becomes the management account of the new organization.
* An account belongs to only one organization within a single root.
* [Quotas for AWS Organizations](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_reference_limits.html)

> AWS Organizations is a global service with service endpoints in `us-east-1`, `us-gov-west-1` and `cn-northwest-1`. Read also
> [Endpoint to call When using the AWS CLI or the AWS SDK](https://docs.aws.amazon.com/organizations/latest/APIReference/Welcome.html).
> Currently all custom resources of this library defaults to use `us-east-1`, but it can be configured to use `cn-northwest-1`
> with the environment variable `CDK_AWS_PARTITION` set to `aws-cn`.

## Example

See [example](https://github.com/pepperize/cdk-organizations-example/blob/main/src/example-stack.ts)

```python
import { App, Stack } from "aws-cdk-lib/core";
import {
  Account,
  DelegatedAdministrator,
  EnableAwsServiceAccess,
  EnablePolicyType,
  FeatureSet,
  IamUserAccessToBilling,
  Organization,
  OrganizationalUnit,
  Policy,
  PolicyAttachment,
  PolicyType,
} from "@pepperize/cdk-organizations";

const app = new App();
const stack = new Stack(app);

// Create an organization
const organization = new Organization(stack, "Organization", {
  featureSet: FeatureSet.ALL,
});
// Enable AWS Service Access (requires FeatureSet: ALL)
organization.enableAwsServiceAccess("service-abbreviation.amazonaws.com");

// Create an account
const account1 = new Account(stack, "SharedAccount", {
  accountName: "SharedAccount",
  email: "info+shared-account@pepperize.com",
  roleName: "OrganizationAccountAccessRole",
  iamUserAccessToBilling: IamUserAccessToBilling.ALLOW,
  parent: organization.root,
});
// Enable a delegated admin account
account1.delegateAdministrator("service-abbreviation.amazonaws.com");

// Create an OU in the current organizations root
const projects = new OrganizationalUnit(stack, "ProjectsOU", {
  organizationalUnitName: "Projects",
  parent: organization.root,
});
const account2 = new Account(stack, "Project1Account", {
  accountName: "SharedAccount",
  email: "info+project1@pepperize.com",
  parent: projects,
});
account2.node.addDependency(account1);

// Create a nested OU and attach two accounts
const project2 = new OrganizationalUnit(stack, "Project2OU", {
  organizationalUnitName: "Project2",
  parent: projects,
});
const account3 = new Account(stack, "Project2DevAccount", {
  accountName: "Project 2 Dev",
  email: "info+project2-dev@pepperize.com",
  parent: project2,
});
account3.node.addDependency(account2);
const account4 = new Account(stack, "Project2ProdAccount", {
  accountName: "Project 2 Prod",
  email: "info+project2-prod@pepperize.com",
  parent: project2,
});
account4.node.addDependency(account3);

// Enable the service control policy (SCP) type within the organization
organization.enablePolicyType(PolicyType.SERVICE_CONTROL_POLICY);
// Create and attach and Service Control Policy (SCP)
const policy = new Policy(stack, "Policy", {
  content: '{\n"Version":"2012-10-17","Statement":{\n"Effect":"Allow","Action":"s3:*"\n}\n}',
  description: "Enables admins of attached accounts to delegate all S3 permissions",
  policyName: "AllowAllS3Actions",
  policyType: PolicyType.SERVICE_CONTROL_POLICY,
});
organization.attachPolicy(policy);

// Tagging AWS organization resources of this stack
Tags.of(stack).add("tagKey", "tagValue");
```

## References

* [CDK Organizations API Reference](https://github.com/pepperize/cdk-organizations/blob/main/API.md)
* [AWS Account Management Reference Guide](https://docs.aws.amazon.com/accounts/latest/reference/accounts-welcome.html)
* [AWS Organizations User Guide](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html)
* [AWS API Reference](https://docs.aws.amazon.com/organizations/latest/APIReference/Welcome.html)
* [AWS CDK Custom Resources](https://docs.aws.amazon.com/cdk/api/v1/docs/custom-resources-readme.html#custom-resources-for-aws-apis)

## Alternatives

* [AWS Bootstrap Kit](https://github.com/awslabs/aws-bootstrap-kit)
* [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest)
* [AWS Deployment Framework (ADF)](https://github.com/awslabs/aws-deployment-framework)
* [AWS Organization Formation](https://github.com/org-formation)
* [AWS Control Tower Account Factory for Terraform (ATF)](https://github.com/aws-ia/terraform-aws-control_tower_account_factory)
'''
from pkgutil import extend_path
__path__ = extend_path(__path__, __name__)

import abc
import builtins
import datetime
import enum
import typing

import jsii
import publication
import typing_extensions

import typeguard
from importlib.metadata import version as _metadata_package_version
TYPEGUARD_MAJOR_VERSION = int(_metadata_package_version('typeguard').split('.')[0])

def check_type(argname: str, value: object, expected_type: typing.Any) -> typing.Any:
    if TYPEGUARD_MAJOR_VERSION <= 2:
        return typeguard.check_type(argname=argname, value=value, expected_type=expected_type) # type:ignore
    else:
        if isinstance(value, jsii._reference_map.InterfaceDynamicProxy): # pyright: ignore [reportAttributeAccessIssue]
           pass
        else:
            if TYPEGUARD_MAJOR_VERSION == 3:
                typeguard.config.collection_check_strategy = typeguard.CollectionCheckStrategy.ALL_ITEMS # type:ignore
                typeguard.check_type(value=value, expected_type=expected_type) # type:ignore
            else:
                typeguard.check_type(value=value, expected_type=expected_type, collection_check_strategy=typeguard.CollectionCheckStrategy.ALL_ITEMS) # type:ignore

from ._jsii import *

import aws_cdk as _aws_cdk_ceddda9d
import aws_cdk.aws_iam as _aws_cdk_aws_iam_ceddda9d
import aws_cdk.custom_resources as _aws_cdk_custom_resources_ceddda9d
import constructs as _constructs_77d1e7e8


@jsii.data_type(
    jsii_type="@pepperize/cdk-organizations.AccountProps",
    jsii_struct_bases=[],
    name_mapping={
        "account_name": "accountName",
        "email": "email",
        "iam_user_access_to_billing": "iamUserAccessToBilling",
        "import_on_duplicate": "importOnDuplicate",
        "parent": "parent",
        "removal_policy": "removalPolicy",
        "role_name": "roleName",
    },
)
class AccountProps:
    def __init__(
        self,
        *,
        account_name: builtins.str,
        email: builtins.str,
        iam_user_access_to_billing: typing.Optional["IamUserAccessToBilling"] = None,
        import_on_duplicate: typing.Optional[builtins.bool] = None,
        parent: typing.Optional["IParent"] = None,
        removal_policy: typing.Optional[_aws_cdk_ceddda9d.RemovalPolicy] = None,
        role_name: typing.Optional[builtins.str] = None,
    ) -> None:
        '''
        :param account_name: The friendly name of the member account.
        :param email: The email address of the owner to assign to the new member account. This email address must not already be associated with another AWS account. You must use a valid email address to complete account creation. You can't access the root user of the account or remove an account that was created with an invalid email address.
        :param iam_user_access_to_billing: If set to ALLOW , the new account enables IAM users to access account billing information if they have the required permissions. If set to DENY , only the root user of the new account can access account billing information. Default: ALLOW
        :param import_on_duplicate: Whether to import, if a duplicate account with same name and email already exists. Default: true
        :param parent: The parent root or OU that you want to create the new Account in.
        :param removal_policy: If set to RemovalPolicy.DESTROY, the account will be moved to the root. Default: RemovalPolicy.Retain
        :param role_name: The name of an IAM role that AWS Organizations automatically preconfigures in the new member account. This role trusts the management account, allowing users in the management account to assume the role, as permitted by the management account administrator. The role has administrator permissions in the new member account. If you don't specify this parameter, the role name defaults to OrganizationAccountAccessRole.
        '''
        if __debug__:
            type_hints = typing.get_type_hints(_typecheckingstub__2f2a8133c5dea4a5262ada226104f859039e01d3b90c45e47f8dba4c205b9fa4)
            check_type(argname="argument account_name", value=account_name, expected_type=type_hints["account_name"])
            check_type(argname="argument email", value=email, expected_type=type_hints["email"])
            check_type(argname="argument iam_user_access_to_billing", value=iam_user_access_to_billing, expected_type=type_hints["iam_user_access_to_billing"])
            check_type(argname="argument import_on_duplicate", value=import_on_duplicate, expected_type=type_hints["import_on_duplicate"])
            check_type(argname="argument parent", value=parent, expected_type=type_hints["parent"])
            check_type(argname="argument removal_policy", value=removal_policy, expected_type=type_hints["removal_policy"])
            check_type(argname="argument role_name", value=role_name, expected_type=type_hints["role_name"])
        self._values: typing.Dict[builtins.str, typing.Any] = {
            "account_name": account_name,
            "email": email,
        }
        if iam_user_access_to_billing is not None:
            self._values["iam_user_access_to_billing"] = iam_user_access_to_billing
        if import_on_duplicate is not None:
            self._values["import_on_duplicate"] = import_on_duplicate
        if parent is not None:
            self._values["parent"] = parent
        if removal_policy is not None:
            self._values["removal_policy"] = removal_policy
        if role_name is not None:
            self._values["role_name"] = role_name

    @builtins.property
    def account_name(self) -> builtins.str:
        '''The friendly name of the member account.'''
        result = self._values.get("account_name")
        assert result is not None, "Required property 'account_name' is missing"
        return typing.cast(builtins.str, result)

    @builtins.property
    def email(self) -> builtins.str:
        '''The email address of the owner to assign to the new member account.

        This email address must not already be associated with another AWS account. You must use a valid email address to complete account creation. You can't access the root user of the account or remove an account that was created with an invalid email address.
        '''
        result = self._values.get("email")
        assert result is not None, "Required property 'email' is missing"
        return typing.cast(builtins.str, result)

    @builtins.property
    def iam_user_access_to_billing(self) -> typing.Optional["IamUserAccessToBilling"]:
        '''If set to ALLOW , the new account enables IAM users to access account billing information if they have the required permissions.

        If set to DENY , only the root user of the new account can access account billing information.

        :default: ALLOW
        '''
        result = self._values.get("iam_user_access_to_billing")
        return typing.cast(typing.Optional["IamUserAccessToBilling"], result)

    @builtins.property
    def import_on_duplicate(self) -> typing.Optional[builtins.bool]:
        '''Whether to import, if a duplicate account with same name and email already exists.

        :default: true
        '''
        result = self._values.get("import_on_duplicate")
        return typing.cast(typing.Optional[builtins.bool], result)

    @builtins.property
    def parent(self) -> typing.Optional["IParent"]:
        '''The parent root or OU that you want to create the new Account in.'''
        result = self._values.get("parent")
        return typing.cast(typing.Optional["IParent"], result)

    @builtins.property
    def removal_policy(self) -> typing.Optional[_aws_cdk_ceddda9d.RemovalPolicy]:
        '''If set to RemovalPolicy.DESTROY, the account will be moved to the root.

        :default: RemovalPolicy.Retain
        '''
        result = self._values.get("removal_policy")
        return typing.cast(typing.Optional[_aws_cdk_ceddda9d.RemovalPolicy], result)

    @builtins.property
    def role_name(self) -> typing.Optional[builtins.str]:
        '''The name of an IAM role that AWS Organizations automatically preconfigures in the new member account.

        This role trusts the management account, allowing users in the management account to assume the role, as permitted by the management account administrator. The role has administrator permissions in the new member account.

        If you don't specify this parameter, the role name defaults to OrganizationAccountAccessRole.
        '''
        result = self._values.get("role_name")
        return typing.cast(typing.Optional[builtins.str], result)

    def __eq__(self, rhs: typing.Any) -> builtins.bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs: typing.Any) -> builtins.bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "AccountProps(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


class DelegatedAdministrator(
    _constructs_77d1e7e8.Construct,
    metaclass=jsii.JSIIMeta,
    jsii_type="@pepperize/cdk-organizations.DelegatedAdministrator",
):
    '''Enables the specified member account to administer the Organizations features of the specified AWS service.

    It grants read-only access to AWS Organizations service data. The account still requires IAM permissions to access and administer the AWS service.

    You can run this action only for AWS services that support this feature. For a current list of services that support it, see the column Supports Delegated Administrator in the table at AWS Services that you can use with AWS Organizations in the `AWS Organizations User Guide <https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services_list.html>`_.

    :see: https://docs.aws.amazon.com/accounts/latest/reference/using-orgs-delegated-admin.html
    '''

    def __init__(
        self,
        scope: _constructs_77d1e7e8.Construct,
        id: builtins.str,
        *,
        account: "IAccount",
        service_principal: builtins.str,
        region: typing.Optional[builtins.str] = None,
        removal_policy: typing.Optional[_aws_cdk_ceddda9d.RemovalPolicy] = None,
    ) -> None:
        '''
        :param scope: -
        :param id: -
        :param account: The member account in the organization to register as a delegated administrator.
        :param service_principal: The service principal of the AWS service for which you want to make the member account a delegated administrator.
        :param region: The region to delegate the administrator in.
        :param removal_policy: If set to RemovalPolicy.RETAIN, the delegation will not be removed. Default: RemovalPolicy.DESTROY
        '''
        if __debug__:
            type_hints = typing.get_type_hints(_typecheckingstub__8d31a0ea7abede2614013dc94c74476833f3cbbece0536a3ef8eebece0864b74)
            check_type(argname="argument scope", value=scope, expected_type=type_hints["scope"])
            check_type(argname="argument id", value=id, expected_type=type_hints["id"])
        props = DelegatedAdministratorProps(
            account=account,
            service_principal=service_principal,
            region=region,
            removal_policy=removal_policy,
        )

        jsii.create(self.__class__, self, [scope, id, props])


@jsii.data_type(
    jsii_type="@pepperize/cdk-organizations.DelegatedAdministratorProps",
    jsii_struct_bases=[],
    name_mapping={
        "account": "account",
        "service_principal": "servicePrincipal",
        "region": "region",
        "removal_policy": "removalPolicy",
    },
)
class DelegatedAdministratorProps:
    def __init__(
        self,
        *,
        account: "IAccount",
        service_principal: builtins.str,
        region: typing.Optional[builtins.str] = None,
        removal_policy: typing.Optional[_aws_cdk_ceddda9d.RemovalPolicy] = None,
    ) -> None:
        '''
        :param account: The member account in the organization to register as a delegated administrator.
        :param service_principal: The service principal of the AWS service for which you want to make the member account a delegated administrator.
        :param region: The region to delegate the administrator in.
        :param removal_policy: If set to RemovalPolicy.RETAIN, the delegation will not be removed. Default: RemovalPolicy.DESTROY
        '''
        if __debug__:
            type_hints = typing.get_type_hints(_typecheckingstub__3312e7dada1287aeae2e3140a605f57d74b631868a8394a90c6651909c9a70b6)
            check_type(argname="argument account", value=account, expected_type=type_hints["account"])
            check_type(argname="argument service_principal", value=service_principal, expected_type=type_hints["service_principal"])
            check_type(argname="argument region", value=region, expected_type=type_hints["region"])
            check_type(argname="argument removal_policy", value=removal_policy, expected_type=type_hints["removal_policy"])
        self._values: typing.Dict[builtins.str, typing.Any] = {
            "account": account,
            "service_principal": service_principal,
        }
        if region is not None:
            self._values["region"] = region
        if removal_policy is not None:
            self._values["removal_policy"] = removal_policy

    @builtins.property
    def account(self) -> "IAccount":
        '''The member account in the organization to register as a delegated administrator.'''
        result = self._values.get("account")
        assert result is not None, "Required property 'account' is missing"
        return typing.cast("IAccount", result)

    @builtins.property
    def service_principal(self) -> builtins.str:
        '''The service principal of the AWS service for which you want to make the member account a delegated administrator.'''
        result = self._values.get("service_principal")
        assert result is not None, "Required property 'service_principal' is missing"
        return typing.cast(builtins.str, result)

    @builtins.property
    def region(self) -> typing.Optional[builtins.str]:
        '''The region to delegate the administrator in.'''
        result = self._values.get("region")
        return typing.cast(typing.Optional[builtins.str], result)

    @builtins.property
    def removal_policy(self) -> typing.Optional[_aws_cdk_ceddda9d.RemovalPolicy]:
        '''If set to RemovalPolicy.RETAIN, the delegation will not be removed.

        :default: RemovalPolicy.DESTROY
        '''
        result = self._values.get("removal_policy")
        return typing.cast(typing.Optional[_aws_cdk_ceddda9d.RemovalPolicy], result)

    def __eq__(self, rhs: typing.Any) -> builtins.bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs: typing.Any) -> builtins.bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "DelegatedAdministratorProps(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


@jsii.implements(_aws_cdk_ceddda9d.IAspect)
class DependencyChain(
    metaclass=jsii.JSIIMeta,
    jsii_type="@pepperize/cdk-organizations.DependencyChain",
):
    '''(experimental) Aspect to create dependency chain of organization resource that needs to be deployed sequentially.

    :stability: experimental
    '''

    def __init__(self) -> None:
        jsii.create(self.__class__, self, [])

    @jsii.member(jsii_name="visit")
    def visit(self, current: _constructs_77d1e7e8.IConstruct) -> None:
        '''(experimental) All aspects can visit an IConstruct.

        :param current: -

        :stability: experimental
        '''
        if __debug__:
            type_hints = typing.get_type_hints(_typecheckingstub__bd1aadb979595763895016cdfd6e633077a7632c326454ee0460e562bed9e8a8)
            check_type(argname="argument current", value=current, expected_type=type_hints["current"])
        return typing.cast(None, jsii.invoke(self, "visit", [current]))


class EnableAwsServiceAccess(
    _constructs_77d1e7e8.Construct,
    metaclass=jsii.JSIIMeta,
    jsii_type="@pepperize/cdk-organizations.EnableAwsServiceAccess",
):
    '''Enables the integration of an AWS service (the service that is specified by ServicePrincipal) with AWS Organizations.

    When you enable integration, you allow the specified service to create a service-linked role in all the accounts in your organization. This allows the service to perform operations on your behalf in your organization and its accounts.

    This operation can be called only from the organization's management account and only if the organization has enabled all features.

    :see: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services.html#orgs_trusted_access_perms
    '''

    def __init__(
        self,
        scope: _constructs_77d1e7e8.Construct,
        id: builtins.str,
        *,
        service_principal: builtins.str,
    ) -> None:
        '''
        :param scope: -
        :param id: -
        :param service_principal: The service principal name of the AWS service for which you want to enable integration with your organization. This is typically in the form of a URL, such as service-abbreviation.amazonaws.com.
        '''
        if __debug__:
            type_hints = typing.get_type_hints(_typecheckingstub__4dbb87204f07a7fca34c7f76b92e79ed78998e39b01f070f38557db68112f782)
            check_type(argname="argument scope", value=scope, expected_type=type_hints["scope"])
            check_type(argname="argument id", value=id, expected_type=type_hints["id"])
        props = EnableAwsServiceAccessProps(service_principal=service_principal)

        jsii.create(self.__class__, self, [scope, id, props])


@jsii.data_type(
    jsii_type="@pepperize/cdk-organizations.EnableAwsServiceAccessProps",
    jsii_struct_bases=[],
    name_mapping={"service_principal": "servicePrincipal"},
)
class EnableAwsServiceAccessProps:
    def __init__(self, *, service_principal: builtins.str) -> None:
        '''
        :param service_principal: The service principal name of the AWS service for which you want to enable integration with your organization. This is typically in the form of a URL, such as service-abbreviation.amazonaws.com.
        '''
        if __debug__:
            type_hints = typing.get_type_hints(_typecheckingstub__0ff464f4c8cec42c00b06d7d2921db91e94a3e01afc853456dfa2a3074ffc992)
            check_type(argname="argument service_principal", value=service_principal, expected_type=type_hints["service_principal"])
        self._values: typing.Dict[builtins.str, typing.Any] = {
            "service_principal": service_principal,
        }

    @builtins.property
    def service_principal(self) -> builtins.str:
        '''The service principal name of the AWS service for which you want to enable integration with your organization.

        This is typically in the form of a URL, such as service-abbreviation.amazonaws.com.
        '''
        result = self._values.get("service_principal")
        assert result is not None, "Required property 'service_principal' is missing"
        return typing.cast(builtins.str, result)

    def __eq__(self, rhs: typing.Any) -> builtins.bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs: typing.Any) -> builtins.bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "EnableAwsServiceAccessProps(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


class EnablePolicyType(
    _constructs_77d1e7e8.Construct,
    metaclass=jsii.JSIIMeta,
    jsii_type="@pepperize/cdk-organizations.EnablePolicyType",
):
    '''Enables and disables Enables a policy type in a root.

    After you enable a policy type in a root, you can attach policies of that type to the root, any organizational unit (OU), or account in that root.

    :see: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_enable-disable.html
    '''

    def __init__(
        self,
        scope: _constructs_77d1e7e8.Construct,
        id: builtins.str,
        *,
        policy_type: "PolicyType",
        root: "Root",
    ) -> None:
        '''
        :param scope: -
        :param id: -
        :param policy_type: 
        :param root: 
        '''
        if __debug__:
            type_hints = typing.get_type_hints(_typecheckingstub__06187ec27307ece8e0eaa9afcf96a6e21328e6e9c622908b05926c2858492237)
            check_type(argname="argument scope", value=scope, expected_type=type_hints["scope"])
            check_type(argname="argument id", value=id, expected_type=type_hints["id"])
        props = EnablePolicyTypeProps(policy_type=policy_type, root=root)

        jsii.create(self.__class__, self, [scope, id, props])


@jsii.data_type(
    jsii_type="@pepperize/cdk-organizations.EnablePolicyTypeProps",
    jsii_struct_bases=[],
    name_mapping={"policy_type": "policyType", "root": "root"},
)
class EnablePolicyTypeProps:
    def __init__(self, *, policy_type: "PolicyType", root: "Root") -> None:
        '''
        :param policy_type: 
        :param root: 
        '''
        if __debug__:
            type_hints = typing.get_type_hints(_typecheckingstub__363ee6510cfe4270baceaf5737bc42e38996524ef67ee3dd9ddd3a88b2b8f783)
            check_type(argname="argument policy_type", value=policy_type, expected_type=type_hints["policy_type"])
            check_type(argname="argument root", value=root, expected_type=type_hints["root"])
        self._values: typing.Dict[builtins.str, typing.Any] = {
            "policy_type": policy_type,
            "root": root,
        }

    @builtins.property
    def policy_type(self) -> "PolicyType":
        result = self._values.get("policy_type")
        assert result is not None, "Required property 'policy_type' is missing"
        return typing.cast("PolicyType", result)

    @builtins.property
    def root(self) -> "Root":
        result = self._values.get("root")
        assert result is not None, "Required property 'root' is missing"
        return typing.cast("Root", result)

    def __eq__(self, rhs: typing.Any) -> builtins.bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs: typing.Any) -> builtins.bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "EnablePolicyTypeProps(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


@jsii.enum(jsii_type="@pepperize/cdk-organizations.FeatureSet")
class FeatureSet(enum.Enum):
    '''Specifies the feature set supported by the new organization.

    Each feature set supports different levels of functionality.

    :see: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html#feature-set
    '''

    CONSOLIDATED_BILLING = "CONSOLIDATED_BILLING"
    '''All member accounts have their bills consolidated to and paid by the management account.

    For more information, see `Consolidated billing <https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html#feature-set-cb-only>`_ in the AWS Organizations User Guide. The consolidated billing feature subset isn’t available for organizations in the AWS GovCloud (US) Region.
    '''
    ALL = "ALL"
    '''In addition to all the features supported by the consolidated billing feature set, the management account can also apply any policy type to any member account in the organization.

    For more information, see `All features <https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html#feature-set-all>`_ in the AWS Organizations User Guide.
    '''


@jsii.interface(jsii_type="@pepperize/cdk-organizations.IOrganization")
class IOrganization(_constructs_77d1e7e8.IConstruct, typing_extensions.Protocol):
    '''Creates an organization to consolidate your AWS accounts so that you can administer them as a single unit.

    An organization has one management account along with zero or more member accounts. You can organize the accounts in a hierarchical, tree-like structure with a root at the top and organizational units nested under the root. Each account can be directly in the root, or placed in one of the OUs in the hierarchy. An organization has the functionality that is determined by the feature set that you enable.

    The account whose user is calling the CreateOrganization operation automatically becomes the management account of the new organization.

    For deletion of an organization you must previously remove all the member accounts, OUs, and policies from the organization!

    :see: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_org_create.html#create-org
    '''

    @builtins.property
    @jsii.member(jsii_name="featureSet")
    def feature_set(self) -> FeatureSet:
        '''Specifies the functionality that currently is available to the organization.

        If set to "ALL", then all features are enabled and policies can be applied to accounts in the organization. If set to "CONSOLIDATED_BILLING", then only consolidated billing functionality is available.
        '''
        ...

    @builtins.property
    @jsii.member(jsii_name="managementAccountArn")
    def management_account_arn(self) -> builtins.str:
        '''The Amazon Resource Name (ARN) of the account that is designated as the management account for the organization.'''
        ...

    @builtins.property
    @jsii.member(jsii_name="managementAccountEmail")
    def management_account_email(self) -> builtins.str:
        '''The email address that is associated with the AWS account that is designated as the management account for the organization.'''
        ...

    @builtins.property
    @jsii.member(jsii_name="managementAccountId")
    def management_account_id(self) -> builtins.str:
        '''The unique identifier (ID) of the management account of an organization.'''
        ...

    @builtins.property
    @jsii.member(jsii_name="organizationArn")
    def organization_arn(self) -> builtins.str:
        '''The Amazon Resource Name (ARN) of an organization.'''
        ...

    @builtins.property
    @jsii.member(jsii_name="organizationId")
    def organization_id(self) -> builtins.str:
        '''The unique identifier (ID) of an organization.

        The regex pattern for an organization ID string requires "o-" followed by from 10 to 32 lowercase letters or digits.
        '''
        ...

    @builtins.property
    @jsii.member(jsii_name="principal")
    def principal(self) -> _aws_cdk_aws_iam_ceddda9d.IPrincipal:
        '''The principal that represents this AWS Organization.'''
        ...


class _IOrganizationProxy(
    jsii.proxy_for(_constructs_77d1e7e8.IConstruct), # type: ignore[misc]
):
    '''Creates an organization to consolidate your AWS accounts so that you can administer them as a single unit.

    An organization has one management account along with zero or more member accounts. You can organize the accounts in a hierarchical, tree-like structure with a root at the top and organizational units nested under the root. Each account can be directly in the root, or placed in one of the OUs in the hierarchy. An organization has the functionality that is determined by the feature set that you enable.

    The account whose user is calling the CreateOrganization operation automatically becomes the management account of the new organization.

    For deletion of an organization you must previously remove all the member accounts, OUs, and policies from the organization!

    :see: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_org_create.html#create-org
    '''

    __jsii_type__: typing.ClassVar[str] = "@pepperize/cdk-organizations.IOrganization"

    @builtins.property
    @jsii.member(jsii_name="featureSet")
    def feature_set(self) -> FeatureSet:
        '''Specifies the functionality that currently is available to the organization.

        If set to "ALL", then all features are enabled and policies can be applied to accounts in the organization. If set to "CONSOLIDATED_BILLING", then only consolidated billing functionality is available.
        '''
        return typing.cast(FeatureSet, jsii.get(self, "featureSet"))

    @builtins.property
    @jsii.member(jsii_name="managementAccountArn")
    def management_account_arn(self) -> builtins.str:
        '''The Amazon Resource Name (ARN) of the account that is designated as the management account for the organization.'''
        return typing.cast(builtins.str, jsii.get(self, "managementAccountArn"))

    @builtins.property
    @jsii.member(jsii_name="managementAccountEmail")
    def management_account_email(self) -> builtins.str:
        '''The email address that is associated with the AWS account that is designated as the management account for the organization.'''
        return typing.cast(builtins.str, jsii.get(self, "managementAccountEmail"))

    @builtins.property
    @jsii.member(jsii_name="managementAccountId")
    def management_account_id(self) -> builtins.str:
        '''The unique identifier (ID) of the management account of an organization.'''
        return typing.cast(builtins.str, jsii.get(self, "managementAccountId"))

    @builtins.property
    @jsii.member(jsii_name="organizationArn")
    def organization_arn(self) -> builtins.str:
        '''The Amazon Resource Name (ARN) of an organization.'''
        return typing.cast(builtins.str, jsii.get(self, "organizationArn"))

    @builtins.property
    @jsii.member(jsii_name="organizationId")
    def organization_id(self) -> builtins.str:
        '''The unique identifier (ID) of an organization.

        The regex pattern for an organization ID string requires "o-" followed by from 10 to 32 lowercase letters or digits.
        '''
        return typing.cast(builtins.str, jsii.get(self, "organizationId"))

    @builtins.property
    @jsii.member(jsii_name="principal")
    def principal(self) -> _aws_cdk_aws_iam_ceddda9d.IPrincipal:
        '''The principal that represents this AWS Organization.'''
        return typing.cast(_aws_cdk_aws_iam_ceddda9d.IPrincipal, jsii.get(self, "principal"))

# Adding a "__jsii_proxy_class__(): typing.Type" function to the interface
typing.cast(typing.Any, IOrganization).__jsii_proxy_class__ = lambda : _IOrganizationProxy


@jsii.interface(jsii_type="@pepperize/cdk-organizations.IPolicy")
class IPolicy(_constructs_77d1e7e8.IConstruct, typing_extensions.Protocol):
    '''Policies in AWS Organizations enable you to apply additional types of management to the AWS accounts in your organization.

    You can use policies when all features are enabled in your organization.

    Before you can create and attach a policy to your organization, you must enable that policy type for use.

    :see: FeatureSet
    '''

    @builtins.property
    @jsii.member(jsii_name="policyId")
    def policy_id(self) -> builtins.str:
        '''The unique identifier (ID) of the policy.

        The regex pattern for a policy ID string requires "p-" followed by from 8 to 128 lowercase or uppercase letters, digits, or the underscore character (_).
        '''
        ...


class _IPolicyProxy(
    jsii.proxy_for(_constructs_77d1e7e8.IConstruct), # type: ignore[misc]
):
    '''Policies in AWS Organizations enable you to apply additional types of management to the AWS accounts in your organization.

    You can use policies when all features are enabled in your organization.

    Before you can create and attach a policy to your organization, you must enable that policy type for use.

    :see: FeatureSet
    '''

    __jsii_type__: typing.ClassVar[str] = "@pepperize/cdk-organizations.IPolicy"

    @builtins.property
    @jsii.member(jsii_name="policyId")
    def policy_id(self) -> builtins.str:
        '''The unique identifier (ID) of the policy.

        The regex pattern for a policy ID string requires "p-" followed by from 8 to 128 lowercase or uppercase letters, digits, or the underscore character (_).
        '''
        return typing.cast(builtins.str, jsii.get(self, "policyId"))

# Adding a "__jsii_proxy_class__(): typing.Type" function to the interface
typing.cast(typing.Any, IPolicy).__jsii_proxy_class__ = lambda : _IPolicyProxy


@jsii.interface(jsii_type="@pepperize/cdk-organizations.IResource")
class IResource(typing_extensions.Protocol):
    '''Interface for an AWS Organizations resource.'''

    @jsii.member(jsii_name="identifier")
    def identifier(self) -> builtins.str:
        '''The unique identifier (ID) of the parent root, organizational unit (OU), account, or policy that you want to create the new OU in.'''
        ...


class _IResourceProxy:
    '''Interface for an AWS Organizations resource.'''

    __jsii_type__: typing.ClassVar[str] = "@pepperize/cdk-organizations.IResource"

    @jsii.member(jsii_name="identifier")
    def identifier(self) -> builtins.str:
        '''The unique identifier (ID) of the parent root, organizational unit (OU), account, or policy that you want to create the new OU in.'''
        return typing.cast(builtins.str, jsii.invoke(self, "identifier", []))

# Adding a "__jsii_proxy_class__(): typing.Type" function to the interface
typing.cast(typing.Any, IResource).__jsii_proxy_class__ = lambda : _IResourceProxy


@jsii.interface(jsii_type="@pepperize/cdk-organizations.ITaggableResource")
class ITaggableResource(_aws_cdk_ceddda9d.ITaggable, typing_extensions.Protocol):
    pass


class _ITaggableResourceProxy(
    jsii.proxy_for(_aws_cdk_ceddda9d.ITaggable), # type: ignore[misc]
):
    __jsii_type__: typing.ClassVar[str] = "@pepperize/cdk-organizations.ITaggableResource"
    pass

# Adding a "__jsii_proxy_class__(): typing.Type" function to the interface
typing.cast(typing.Any, ITaggableResource).__jsii_proxy_class__ = lambda : _ITaggableResourceProxy


@jsii.enum(jsii_type="@pepperize/cdk-organizations.IamUserAccessToBilling")
class IamUserAccessToBilling(enum.Enum):
    '''
    :see: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/control-access-billing.html#ControllingAccessWebsite-Activate
    '''

    ALLOW = "ALLOW"
    '''If set to ALLOW, the new account enables IAM users to access account billing information if they have the required permissions.'''
    DENY = "DENY"
    '''If set to DENY, only the root user of the new account can access account billing information.'''


@jsii.implements(IOrganization)
class Organization(
    _constructs_77d1e7e8.Construct,
    metaclass=jsii.JSIIMeta,
    jsii_type="@pepperize/cdk-organizations.Organization",
):
    def __init__(
        self,
        scope: _constructs_77d1e7e8.Construct,
        id: builtins.str,
        *,
        feature_set: typing.Optional[FeatureSet] = None,
    ) -> None:
        '''
        :param scope: -
        :param id: -
        :param feature_set: Enabling features in your organization. Default: ALL
        '''
        if __debug__:
            type_hints = typing.get_type_hints(_typecheckingstub__fe623ed232ddbbc82c5b721cb934c3f5f5e02983759e8d064db61facd11d2a71)
            check_type(argname="argument scope", value=scope, expected_type=type_hints["scope"])
            check_type(argname="argument id", value=id, expected_type=type_hints["id"])
        props = OrganizationProps(feature_set=feature_set)

        jsii.create(self.__class__, self, [scope, id, props])

    @jsii.member(jsii_name="of")
    @builtins.classmethod
    def of(
        cls,
        scope: _constructs_77d1e7e8.Construct,
        id: builtins.str,
    ) -> IOrganization:
        '''Describe the organization that the current account belongs to.

        :param scope: -
        :param id: -

        :see: https://docs.aws.amazon.com/organizations/latest/APIReference/API_DescribeOrganization.html
        '''
        if __debug__:
            type_hints = typing.get_type_hints(_typecheckingstub__5bc27a74dc16813e541228dac8b7afae9c3323036af2d0d35db2a0071d30f922)
            check_type(argname="argument scope", value=scope, expected_type=type_hints["scope"])
            check_type(argname="argument id", value=id, expected_type=type_hints["id"])
        return typing.cast(IOrganization, jsii.sinvoke(cls, "of", [scope, id]))

    @jsii.member(jsii_name="attachPolicy")
    def attach_policy(self, policy: IPolicy) -> None:
        '''Attach a policy.

        Before you can attach the policy, you must enable that policy type for use. You can use policies when you have all features enabled.

        :param policy: -

        :see: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies.html
        '''
        if __debug__:
            type_hints = typing.get_type_hints(_typecheckingstub__076117b1c8f111e9b5365071d526e9949d5befee27bf731bea7f7c0bdaa23634)
            check_type(argname="argument policy", value=policy, expected_type=type_hints["policy"])
        return typing.cast(None, jsii.invoke(self, "attachPolicy", [policy]))

    @jsii.member(jsii_name="enableAwsServiceAccess")
    def enable_aws_service_access(self, service_principal: builtins.str) -> None:
        '''Enables trusted access for a supported AWS service (trusted service), which performs tasks in your organization and its accounts on your behalf.

        :param service_principal: The supported AWS service that you specify.

        :see: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services_list.html
        '''
        if __debug__:
            type_hints = typing.get_type_hints(_typecheckingstub__73d9f4bd2bbcd6a3e2199d0c3cca84d624e92b80ed36ec4ae6d98a80a7143c31)
            check_type(argname="argument service_principal", value=service_principal, expected_type=type_hints["service_principal"])
        return typing.cast(None, jsii.invoke(self, "enableAwsServiceAccess", [service_principal]))

    @jsii.member(jsii_name="enablePolicyType")
    def enable_policy_type(self, policy_type: "PolicyType") -> None:
        '''Enables policy types in the following two broad categories: Authorization policies and Management policies.

        :param policy_type: : the type of the policy that you specify.

        :see: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies.html#orgs-policy-types
        '''
        if __debug__:
            type_hints = typing.get_type_hints(_typecheckingstub__2f2f50ae3498f91ab8a7521c5b4d9c4edc15495e30473d7d9995c95f96dac55d)
            check_type(argname="argument policy_type", value=policy_type, expected_type=type_hints["policy_type"])
        return typing.cast(None, jsii.invoke(self, "enablePolicyType", [policy_type]))

    @builtins.property
    @jsii.member(jsii_name="featureSet")
    def feature_set(self) -> FeatureSet:
        '''Specifies the functionality that currently is available to the organization.

        If set to "ALL", then all features are enabled and policies can be applied to accounts in the organization. If set to "CONSOLIDATED_BILLING", then only consolidated billing functionality is available.
        '''
        return typing.cast(FeatureSet, jsii.get(self, "featureSet"))

    @builtins.property
    @jsii.member(jsii_name="managementAccountArn")
    def management_account_arn(self) -> builtins.str:
        '''The Amazon Resource Name (ARN) of the account that is designated as the management account for the organization.'''
        return typing.cast(builtins.str, jsii.get(self, "managementAccountArn"))

    @builtins.property
    @jsii.member(jsii_name="managementAccountEmail")
    def management_account_email(self) -> builtins.str:
        '''The email address that is associated with the AWS account that is designated as the management account for the organization.'''
        return typing.cast(builtins.str, jsii.get(self, "managementAccountEmail"))

    @builtins.property
    @jsii.member(jsii_name="managementAccountId")
    def management_account_id(self) -> builtins.str:
        '''The unique identifier (ID) of the management account of an organization.'''
        return typing.cast(builtins.str, jsii.get(self, "managementAccountId"))

    @builtins.property
    @jsii.member(jsii_name="organizationArn")
    def organization_arn(self) -> builtins.str:
        '''The Amazon Resource Name (ARN) of an organization.'''
        return typing.cast(builtins.str, jsii.get(self, "organizationArn"))

    @builtins.property
    @jsii.member(jsii_name="organizationId")
    def organization_id(self) -> builtins.str:
        '''The unique identifier (ID) of an organization.

        The regex pattern for an organization ID string requires "o-" followed by from 10 to 32 lowercase letters or digits.
        '''
        return typing.cast(builtins.str, jsii.get(self, "organizationId"))

    @builtins.property
    @jsii.member(jsii_name="principal")
    def principal(self) -> _aws_cdk_aws_iam_ceddda9d.IPrincipal:
        '''The principal that represents this AWS Organization.'''
        return typing.cast(_aws_cdk_aws_iam_ceddda9d.IPrincipal, jsii.get(self, "principal"))

    @builtins.property
    @jsii.member(jsii_name="root")
    def root(self) -> "Root":
        '''The root of the current organization, which is automatically created.'''
        return typing.cast("Root", jsii.get(self, "root"))


@jsii.data_type(
    jsii_type="@pepperize/cdk-organizations.OrganizationProps",
    jsii_struct_bases=[],
    name_mapping={"feature_set": "featureSet"},
)
class OrganizationProps:
    def __init__(self, *, feature_set: typing.Optional[FeatureSet] = None) -> None:
        '''
        :param feature_set: Enabling features in your organization. Default: ALL
        '''
        if __debug__:
            type_hints = typing.get_type_hints(_typecheckingstub__8b7ef7201e4e0ace872c6f8a140f9804cdd7cffe32f615a048fef7c0fa37518a)
            check_type(argname="argument feature_set", value=feature_set, expected_type=type_hints["feature_set"])
        self._values: typing.Dict[builtins.str, typing.Any] = {}
        if feature_set is not None:
            self._values["feature_set"] = feature_set

    @builtins.property
    def feature_set(self) -> typing.Optional[FeatureSet]:
        '''Enabling features in your organization.

        :default: ALL

        :see: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_org_support-all-features.html
        '''
        result = self._values.get("feature_set")
        return typing.cast(typing.Optional[FeatureSet], result)

    def __eq__(self, rhs: typing.Any) -> builtins.bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs: typing.Any) -> builtins.bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "OrganizationProps(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


@jsii.data_type(
    jsii_type="@pepperize/cdk-organizations.OrganizationalUnitProps",
    jsii_struct_bases=[],
    name_mapping={
        "organizational_unit_name": "organizationalUnitName",
        "parent": "parent",
        "import_on_duplicate": "importOnDuplicate",
        "removal_policy": "removalPolicy",
    },
)
class OrganizationalUnitProps:
    def __init__(
        self,
        *,
        organizational_unit_name: builtins.str,
        parent: "IParent",
        import_on_duplicate: typing.Optional[builtins.bool] = None,
        removal_policy: typing.Optional[_aws_cdk_ceddda9d.RemovalPolicy] = None,
    ) -> None:
        '''
        :param organizational_unit_name: The friendly name to assign to the new OU.
        :param parent: The parent root or OU that you want to create the new OrganizationalUnit in.
        :param import_on_duplicate: Whether to import, if a duplicate organizational unit with same name exists in the parent exists. Default: true
        :param removal_policy: If set to RemovalPolicy.DESTROY, the organizational unit will be deleted. Default: RemovalPolicy.Retain
        '''
        if __debug__:
            type_hints = typing.get_type_hints(_typecheckingstub__fda6d7bb2e5e324b5407944d052924ed5bc1c0c150b7c4f11e58178c2799929c)
            check_type(argname="argument organizational_unit_name", value=organizational_unit_name, expected_type=type_hints["organizational_unit_name"])
            check_type(argname="argument parent", value=parent, expected_type=type_hints["parent"])
            check_type(argname="argument import_on_duplicate", value=import_on_duplicate, expected_type=type_hints["import_on_duplicate"])
            check_type(argname="argument removal_policy", value=removal_policy, expected_type=type_hints["removal_policy"])
        self._values: typing.Dict[builtins.str, typing.Any] = {
            "organizational_unit_name": organizational_unit_name,
            "parent": parent,
        }
        if import_on_duplicate is not None:
            self._values["import_on_duplicate"] = import_on_duplicate
        if removal_policy is not None:
            self._values["removal_policy"] = removal_policy

    @builtins.property
    def organizational_unit_name(self) -> builtins.str:
        '''The friendly name to assign to the new OU.'''
        result = self._values.get("organizational_unit_name")
        assert result is not None, "Required property 'organizational_unit_name' is missing"
        return typing.cast(builtins.str, result)

    @builtins.property
    def parent(self) -> "IParent":
        '''The parent root or OU that you want to create the new OrganizationalUnit in.'''
        result = self._values.get("parent")
        assert result is not None, "Required property 'parent' is missing"
        return typing.cast("IParent", result)

    @builtins.property
    def import_on_duplicate(self) -> typing.Optional[builtins.bool]:
        '''Whether to import, if a duplicate organizational unit with same name exists in the parent exists.

        :default: true
        '''
        result = self._values.get("import_on_duplicate")
        return typing.cast(typing.Optional[builtins.bool], result)

    @builtins.property
    def removal_policy(self) -> typing.Optional[_aws_cdk_ceddda9d.RemovalPolicy]:
        '''If set to RemovalPolicy.DESTROY, the organizational unit will be deleted.

        :default: RemovalPolicy.Retain
        '''
        result = self._values.get("removal_policy")
        return typing.cast(typing.Optional[_aws_cdk_ceddda9d.RemovalPolicy], result)

    def __eq__(self, rhs: typing.Any) -> builtins.bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs: typing.Any) -> builtins.bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "OrganizationalUnitProps(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


@jsii.data_type(
    jsii_type="@pepperize/cdk-organizations.ParentBaseProps",
    jsii_struct_bases=[],
    name_mapping={"child_id": "childId"},
)
class ParentBaseProps:
    def __init__(self, *, child_id: builtins.str) -> None:
        '''
        :param child_id: 
        '''
        if __debug__:
            type_hints = typing.get_type_hints(_typecheckingstub__d75b8d565e93bf488dc576e3175743c2851d036d1c81cc6e3659a0ce68424313)
            check_type(argname="argument child_id", value=child_id, expected_type=type_hints["child_id"])
        self._values: typing.Dict[builtins.str, typing.Any] = {
            "child_id": child_id,
        }

    @builtins.property
    def child_id(self) -> builtins.str:
        result = self._values.get("child_id")
        assert result is not None, "Required property 'child_id' is missing"
        return typing.cast(builtins.str, result)

    def __eq__(self, rhs: typing.Any) -> builtins.bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs: typing.Any) -> builtins.bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "ParentBaseProps(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


@jsii.data_type(
    jsii_type="@pepperize/cdk-organizations.ParentProps",
    jsii_struct_bases=[],
    name_mapping={"child": "child"},
)
class ParentProps:
    def __init__(self, *, child: "IChild") -> None:
        '''
        :param child: 
        '''
        if __debug__:
            type_hints = typing.get_type_hints(_typecheckingstub__6082c21bc1519af7eb52e988f4ef77e2bbca75ab4d154163c23a3ff053ad2012)
            check_type(argname="argument child", value=child, expected_type=type_hints["child"])
        self._values: typing.Dict[builtins.str, typing.Any] = {
            "child": child,
        }

    @builtins.property
    def child(self) -> "IChild":
        result = self._values.get("child")
        assert result is not None, "Required property 'child' is missing"
        return typing.cast("IChild", result)

    def __eq__(self, rhs: typing.Any) -> builtins.bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs: typing.Any) -> builtins.bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "ParentProps(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


@jsii.implements(IPolicy, ITaggableResource)
class Policy(
    _constructs_77d1e7e8.Construct,
    metaclass=jsii.JSIIMeta,
    jsii_type="@pepperize/cdk-organizations.Policy",
):
    def __init__(
        self,
        scope: _constructs_77d1e7e8.Construct,
        id: builtins.str,
        *,
        content: builtins.str,
        policy_name: builtins.str,
        policy_type: "PolicyType",
        description: typing.Optional[builtins.str] = None,
    ) -> None:
        '''
        :param scope: -
        :param id: -
        :param content: The policy text content to add to the new policy. The text that you supply must adhere to the rules of the policy type you specify in the Type parameter.
        :param policy_name: The friendly name to assign to the policy.
        :param policy_type: The type of policy to create. You can specify one of the following values:
        :param description: An optional description to assign to the policy.
        '''
        if __debug__:
            type_hints = typing.get_type_hints(_typecheckingstub__e2dbb2e3687c84e4f5836f26e63616981fb4d677b35edf2ba6674bd7f5f3ca2d)
            check_type(argname="argument scope", value=scope, expected_type=type_hints["scope"])
            check_type(argname="argument id", value=id, expected_type=type_hints["id"])
        props = PolicyProps(
            content=content,
            policy_name=policy_name,
            policy_type=policy_type,
            description=description,
        )

        jsii.create(self.__class__, self, [scope, id, props])

    @jsii.member(jsii_name="identifier")
    def identifier(self) -> builtins.str:
        return typing.cast(builtins.str, jsii.invoke(self, "identifier", []))

    @builtins.property
    @jsii.member(jsii_name="policyId")
    def policy_id(self) -> builtins.str:
        '''The unique identifier (ID) of the policy.

        The regex pattern for a policy ID string requires "p-" followed by from 8 to 128 lowercase or uppercase letters, digits, or the underscore character (_).
        '''
        return typing.cast(builtins.str, jsii.get(self, "policyId"))

    @builtins.property
    @jsii.member(jsii_name="tags")
    def tags(self) -> _aws_cdk_ceddda9d.TagManager:
        '''TagManager to set, remove and format tags.'''
        return typing.cast(_aws_cdk_ceddda9d.TagManager, jsii.get(self, "tags"))


class PolicyAttachment(
    _constructs_77d1e7e8.Construct,
    metaclass=jsii.JSIIMeta,
    jsii_type="@pepperize/cdk-organizations.PolicyAttachment",
):
    '''Attaches a policy to a root, an organizational unit (OU), or an individual account.

    How the policy affects accounts depends on the type of policy. Refer to the AWS Organizations User Guide for information about each policy type:
    '''

    def __init__(
        self,
        scope: _constructs_77d1e7e8.Construct,
        id: builtins.str,
        *,
        policy: IPolicy,
        target: "IPolicyAttachmentTarget",
    ) -> None:
        '''
        :param scope: -
        :param id: -
        :param policy: The policy that you want to attach to the target.
        :param target: The root, OU, or account that you want to attach the policy to.
        '''
        if __debug__:
            type_hints = typing.get_type_hints(_typecheckingstub__68fa6b5efca5695d06ccd38f4db2f322c2512bd9ebab09b1aed760a0b44e8e1b)
            check_type(argname="argument scope", value=scope, expected_type=type_hints["scope"])
            check_type(argname="argument id", value=id, expected_type=type_hints["id"])
        props = PolicyAttachmentProps(policy=policy, target=target)

        jsii.create(self.__class__, self, [scope, id, props])


@jsii.data_type(
    jsii_type="@pepperize/cdk-organizations.PolicyAttachmentProps",
    jsii_struct_bases=[],
    name_mapping={"policy": "policy", "target": "target"},
)
class PolicyAttachmentProps:
    def __init__(self, *, policy: IPolicy, target: "IPolicyAttachmentTarget") -> None:
        '''
        :param policy: The policy that you want to attach to the target.
        :param target: The root, OU, or account that you want to attach the policy to.
        '''
        if __debug__:
            type_hints = typing.get_type_hints(_typecheckingstub__66fb02085eafc8d53596d2bf7d580928c58468d0f81eced5cd6539fe3d96c265)
            check_type(argname="argument policy", value=policy, expected_type=type_hints["policy"])
            check_type(argname="argument target", value=target, expected_type=type_hints["target"])
        self._values: typing.Dict[builtins.str, typing.Any] = {
            "policy": policy,
            "target": target,
        }

    @builtins.property
    def policy(self) -> IPolicy:
        '''The policy that you want to attach to the target.'''
        result = self._values.get("policy")
        assert result is not None, "Required property 'policy' is missing"
        return typing.cast(IPolicy, result)

    @builtins.property
    def target(self) -> "IPolicyAttachmentTarget":
        '''The root, OU, or account that you want to attach the policy to.'''
        result = self._values.get("target")
        assert result is not None, "Required property 'target' is missing"
        return typing.cast("IPolicyAttachmentTarget", result)

    def __eq__(self, rhs: typing.Any) -> builtins.bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs: typing.Any) -> builtins.bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "PolicyAttachmentProps(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


@jsii.data_type(
    jsii_type="@pepperize/cdk-organizations.PolicyProps",
    jsii_struct_bases=[],
    name_mapping={
        "content": "content",
        "policy_name": "policyName",
        "policy_type": "policyType",
        "description": "description",
    },
)
class PolicyProps:
    def __init__(
        self,
        *,
        content: builtins.str,
        policy_name: builtins.str,
        policy_type: "PolicyType",
        description: typing.Optional[builtins.str] = None,
    ) -> None:
        '''
        :param content: The policy text content to add to the new policy. The text that you supply must adhere to the rules of the policy type you specify in the Type parameter.
        :param policy_name: The friendly name to assign to the policy.
        :param policy_type: The type of policy to create. You can specify one of the following values:
        :param description: An optional description to assign to the policy.
        '''
        if __debug__:
            type_hints = typing.get_type_hints(_typecheckingstub__ed363dc7bdfb605821291f3b9ba0f000aad1b42ce2e571a392f1be3979e1ac17)
            check_type(argname="argument content", value=content, expected_type=type_hints["content"])
            check_type(argname="argument policy_name", value=policy_name, expected_type=type_hints["policy_name"])
            check_type(argname="argument policy_type", value=policy_type, expected_type=type_hints["policy_type"])
            check_type(argname="argument description", value=description, expected_type=type_hints["description"])
        self._values: typing.Dict[builtins.str, typing.Any] = {
            "content": content,
            "policy_name": policy_name,
            "policy_type": policy_type,
        }
        if description is not None:
            self._values["description"] = description

    @builtins.property
    def content(self) -> builtins.str:
        '''The policy text content to add to the new policy.

        The text that you supply must adhere to the rules of the policy type you specify in the Type parameter.
        '''
        result = self._values.get("content")
        assert result is not None, "Required property 'content' is missing"
        return typing.cast(builtins.str, result)

    @builtins.property
    def policy_name(self) -> builtins.str:
        '''The friendly name to assign to the policy.'''
        result = self._values.get("policy_name")
        assert result is not None, "Required property 'policy_name' is missing"
        return typing.cast(builtins.str, result)

    @builtins.property
    def policy_type(self) -> "PolicyType":
        '''The type of policy to create.

        You can specify one of the following values:
        '''
        result = self._values.get("policy_type")
        assert result is not None, "Required property 'policy_type' is missing"
        return typing.cast("PolicyType", result)

    @builtins.property
    def description(self) -> typing.Optional[builtins.str]:
        '''An optional description to assign to the policy.'''
        result = self._values.get("description")
        return typing.cast(typing.Optional[builtins.str], result)

    def __eq__(self, rhs: typing.Any) -> builtins.bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs: typing.Any) -> builtins.bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "PolicyProps(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


@jsii.enum(jsii_type="@pepperize/cdk-organizations.PolicyType")
class PolicyType(enum.Enum):
    '''Organizations offers policy types in the following two broad categories:      Authorization policies help you to centrally manage the security of the AWS accounts in your organization.     Management policies enable you to centrally configure and manage AWS services and their features. .

    :see: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies.html#orgs-policy-types
    '''

    SERVICE_CONTROL_POLICY = "SERVICE_CONTROL_POLICY"
    '''Service control policies (SCPs) offer central control over the maximum available permissions for all of the accounts in your organization.'''
    TAG_POLICY = "TAG_POLICY"
    '''Tag policies help you standardize the tags attached to the AWS resources in your organization's accounts.'''
    BACKUP_POLICY = "BACKUP_POLICY"
    '''Backup policies help you centrally manage and apply backup plans to the AWS resources across your organization's accounts.'''
    AISERVICES_OPT_OUT_POLICY = "AISERVICES_OPT_OUT_POLICY"
    '''Artificial Intelligence (AI) services opt-out policies enable you to control data collection for AWS AI services for all of your organization's accounts.'''


class TagResource(
    _constructs_77d1e7e8.Construct,
    metaclass=jsii.JSIIMeta,
    jsii_type="@pepperize/cdk-organizations.TagResource",
):
    '''Add tags to an AWS Organizations resource to make it easier to identify, organize, and search.

    :see: https://docs.aws.amazon.com/ARG/latest/APIReference/API_Tag.html
    '''

    def __init__(
        self,
        scope: _constructs_77d1e7e8.Construct,
        id: builtins.str,
        *,
        resource_id: builtins.str,
        tags: _aws_cdk_ceddda9d.IResolvable,
    ) -> None:
        '''
        :param scope: -
        :param id: -
        :param resource_id: 
        :param tags: 
        '''
        if __debug__:
            type_hints = typing.get_type_hints(_typecheckingstub__e4438ab06e39f67c3b816639b6f7f7b095f48d153fbcecb5418c8d1cdfab72b2)
            check_type(argname="argument scope", value=scope, expected_type=type_hints["scope"])
            check_type(argname="argument id", value=id, expected_type=type_hints["id"])
        props = TagResourceProps(resource_id=resource_id, tags=tags)

        jsii.create(self.__class__, self, [scope, id, props])


@jsii.data_type(
    jsii_type="@pepperize/cdk-organizations.TagResourceProps",
    jsii_struct_bases=[],
    name_mapping={"resource_id": "resourceId", "tags": "tags"},
)
class TagResourceProps:
    def __init__(
        self,
        *,
        resource_id: builtins.str,
        tags: _aws_cdk_ceddda9d.IResolvable,
    ) -> None:
        '''
        :param resource_id: 
        :param tags: 
        '''
        if __debug__:
            type_hints = typing.get_type_hints(_typecheckingstub__319ef0a92368e6caafc815a036740e37c253cb44b8b279dafba4876bdb6059e1)
            check_type(argname="argument resource_id", value=resource_id, expected_type=type_hints["resource_id"])
            check_type(argname="argument tags", value=tags, expected_type=type_hints["tags"])
        self._values: typing.Dict[builtins.str, typing.Any] = {
            "resource_id": resource_id,
            "tags": tags,
        }

    @builtins.property
    def resource_id(self) -> builtins.str:
        result = self._values.get("resource_id")
        assert result is not None, "Required property 'resource_id' is missing"
        return typing.cast(builtins.str, result)

    @builtins.property
    def tags(self) -> _aws_cdk_ceddda9d.IResolvable:
        result = self._values.get("tags")
        assert result is not None, "Required property 'tags' is missing"
        return typing.cast(_aws_cdk_ceddda9d.IResolvable, result)

    def __eq__(self, rhs: typing.Any) -> builtins.bool:
        return isinstance(rhs, self.__class__) and rhs._values == self._values

    def __ne__(self, rhs: typing.Any) -> builtins.bool:
        return not (rhs == self)

    def __repr__(self) -> str:
        return "TagResourceProps(%s)" % ", ".join(
            k + "=" + repr(v) for k, v in self._values.items()
        )


class Validators(
    metaclass=jsii.JSIIMeta,
    jsii_type="@pepperize/cdk-organizations.Validators",
):
    def __init__(self) -> None:
        jsii.create(self.__class__, self, [])

    @jsii.member(jsii_name="of")
    @builtins.classmethod
    def of(cls) -> "Validators":
        return typing.cast("Validators", jsii.sinvoke(cls, "of", []))

    @jsii.member(jsii_name="accountId")
    def account_id(self, id: builtins.str) -> builtins.bool:
        '''
        :param id: -
        '''
        if __debug__:
            type_hints = typing.get_type_hints(_typecheckingstub__77a1e22c776e450d536cd6a01841c4c05bb9d0da4f8ff87495292ffa937633ff)
            check_type(argname="argument id", value=id, expected_type=type_hints["id"])
        return typing.cast(builtins.bool, jsii.invoke(self, "accountId", [id]))

    @jsii.member(jsii_name="accountName")
    def account_name(self, name: builtins.str) -> builtins.bool:
        '''
        :param name: -
        '''
        if __debug__:
            type_hints = typing.get_type_hints(_typecheckingstub__0f4c5fdea23a4105adf0040d694c8e78f9369880cc742762e7c86617f2d88bfc)
            check_type(argname="argument name", value=name, expected_type=type_hints["name"])
        return typing.cast(builtins.bool, jsii.invoke(self, "accountName", [name]))

    @jsii.member(jsii_name="email")
    def email(self, email: builtins.str) -> builtins.bool:
        '''
        :param email: -
        '''
        if __debug__:
            type_hints = typing.get_type_hints(_typecheckingstub__002964e0f76b9a874b0b833bcee68d284be4f9fd49b66e06214dc30a8e754212)
            check_type(argname="argument email", value=email, expected_type=type_hints["email"])
        return typing.cast(builtins.bool, jsii.invoke(self, "email", [email]))

    @jsii.member(jsii_name="organizationalUnitName")
    def organizational_unit_name(self, name: builtins.str) -> builtins.bool:
        '''
        :param name: -
        '''
        if __debug__:
            type_hints = typing.get_type_hints(_typecheckingstub__135fbabad9582a06cc292ffb3559f7881b2e3f05e219e96430049e79a4d441e1)
            check_type(argname="argument name", value=name, expected_type=type_hints["name"])
        return typing.cast(builtins.bool, jsii.invoke(self, "organizationalUnitName", [name]))

    @jsii.member(jsii_name="policyContent")
    def policy_content(self, content: builtins.str) -> builtins.bool:
        '''
        :param content: -
        '''
        if __debug__:
            type_hints = typing.get_type_hints(_typecheckingstub__1cb31cd047a70423f6e2e232cbcca9dd3bbe1dcd06c53009af3824820e5d5858)
            check_type(argname="argument content", value=content, expected_type=type_hints["content"])
        return typing.cast(builtins.bool, jsii.invoke(self, "policyContent", [content]))

    @jsii.member(jsii_name="servicePrincipal")
    def service_principal(self, service_principal: builtins.str) -> builtins.bool:
        '''
        :param service_principal: -
        '''
        if __debug__:
            type_hints = typing.get_type_hints(_typecheckingstub__d8721e616867cc96d7a916586b9049d387cd12c214a4cf92b62fca094a107d2f)
            check_type(argname="argument service_principal", value=service_principal, expected_type=type_hints["service_principal"])
        return typing.cast(builtins.bool, jsii.invoke(self, "servicePrincipal", [service_principal]))


@jsii.interface(jsii_type="@pepperize/cdk-organizations.IChild")
class IChild(_constructs_77d1e7e8.IConstruct, IResource, typing_extensions.Protocol):
    pass


class _IChildProxy(
    jsii.proxy_for(_constructs_77d1e7e8.IConstruct), # type: ignore[misc]
    jsii.proxy_for(IResource), # type: ignore[misc]
):
    __jsii_type__: typing.ClassVar[str] = "@pepperize/cdk-organizations.IChild"
    pass

# Adding a "__jsii_proxy_class__(): typing.Type" function to the interface
typing.cast(typing.Any, IChild).__jsii_proxy_class__ = lambda : _IChildProxy


@jsii.interface(jsii_type="@pepperize/cdk-organizations.IParent")
class IParent(_constructs_77d1e7e8.IConstruct, IResource, typing_extensions.Protocol):
    pass


class _IParentProxy(
    jsii.proxy_for(_constructs_77d1e7e8.IConstruct), # type: ignore[misc]
    jsii.proxy_for(IResource), # type: ignore[misc]
):
    __jsii_type__: typing.ClassVar[str] = "@pepperize/cdk-organizations.IParent"
    pass

# Adding a "__jsii_proxy_class__(): typing.Type" function to the interface
typing.cast(typing.Any, IParent).__jsii_proxy_class__ = lambda : _IParentProxy


@jsii.interface(jsii_type="@pepperize/cdk-organizations.IPolicyAttachmentTarget")
class IPolicyAttachmentTarget(
    _constructs_77d1e7e8.IDependable,
    IResource,
    typing_extensions.Protocol,
):
    pass


class _IPolicyAttachmentTargetProxy(
    jsii.proxy_for(_constructs_77d1e7e8.IDependable), # type: ignore[misc]
    jsii.proxy_for(IResource), # type: ignore[misc]
):
    __jsii_type__: typing.ClassVar[str] = "@pepperize/cdk-organizations.IPolicyAttachmentTarget"
    pass

# Adding a "__jsii_proxy_class__(): typing.Type" function to the interface
typing.cast(typing.Any, IPolicyAttachmentTarget).__jsii_proxy_class__ = lambda : _IPolicyAttachmentTargetProxy


@jsii.implements(IParent)
class ParentBase(
    _constructs_77d1e7e8.Construct,
    metaclass=jsii.JSIIAbstractClass,
    jsii_type="@pepperize/cdk-organizations.ParentBase",
):
    def __init__(
        self,
        scope: _constructs_77d1e7e8.Construct,
        id: builtins.str,
        *,
        child_id: builtins.str,
    ) -> None:
        '''
        :param scope: -
        :param id: -
        :param child_id: 
        '''
        if __debug__:
            type_hints = typing.get_type_hints(_typecheckingstub__2a7be112af4b0bad0ffd308798243b3a45da2c038b733f6ec52811596d7ad93e)
            check_type(argname="argument scope", value=scope, expected_type=type_hints["scope"])
            check_type(argname="argument id", value=id, expected_type=type_hints["id"])
        props = ParentBaseProps(child_id=child_id)

        jsii.create(self.__class__, self, [scope, id, props])

    @jsii.member(jsii_name="identifier")
    def identifier(self) -> builtins.str:
        '''The unique identifier (ID) of the parent root, organizational unit (OU), account, or policy that you want to create the new OU in.'''
        return typing.cast(builtins.str, jsii.invoke(self, "identifier", []))

    @builtins.property
    @jsii.member(jsii_name="parentId")
    def parent_id(self) -> builtins.str:
        return typing.cast(builtins.str, jsii.get(self, "parentId"))


class _ParentBaseProxy(ParentBase):
    pass

# Adding a "__jsii_proxy_class__(): typing.Type" function to the abstract class
typing.cast(typing.Any, ParentBase).__jsii_proxy_class__ = lambda : _ParentBaseProxy


@jsii.implements(IParent, IPolicyAttachmentTarget, ITaggableResource)
class Root(
    _constructs_77d1e7e8.Construct,
    metaclass=jsii.JSIIMeta,
    jsii_type="@pepperize/cdk-organizations.Root",
):
    '''The parent container for all the accounts for your organization.

    If you apply a policy to the root, it applies to all organizational units (OUs) and accounts in the organization.
    Currently, you can have only one root. AWS Organizations automatically creates it for you when you create an organization.

    :see: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html
    '''

    def __init__(self, scope: _constructs_77d1e7e8.Construct, id: builtins.str) -> None:
        '''
        :param scope: -
        :param id: -
        '''
        if __debug__:
            type_hints = typing.get_type_hints(_typecheckingstub__82f1d2def63ea6869806eac2bf0d0b9fc400dbe5757655cc098f29b351925a4e)
            check_type(argname="argument scope", value=scope, expected_type=type_hints["scope"])
            check_type(argname="argument id", value=id, expected_type=type_hints["id"])
        jsii.create(self.__class__, self, [scope, id])

    @jsii.member(jsii_name="attachPolicy")
    def attach_policy(self, policy: IPolicy) -> None:
        '''Attach a policy.

        Before you can attach the policy, you must enable that policy type for use. You can use policies when you have all features enabled.

        :param policy: -

        :see: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies.html
        '''
        if __debug__:
            type_hints = typing.get_type_hints(_typecheckingstub__75f9c32ebf0b2375c1310899ebb2929248be9e3704849a157049ee6fb6adf51b)
            check_type(argname="argument policy", value=policy, expected_type=type_hints["policy"])
        return typing.cast(None, jsii.invoke(self, "attachPolicy", [policy]))

    @jsii.member(jsii_name="enablePolicyType")
    def enable_policy_type(self, policy_type: PolicyType) -> None:
        '''Enables and disables Enables a policy type.

        After you enable a policy type in a root, you can attach policies of that type to the root, any organizational unit (OU), or account in that root.

        :param policy_type: -

        :see: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_enable-disable.html
        '''
        if __debug__:
            type_hints = typing.get_type_hints(_typecheckingstub__b0e1229c541b2aa4c6c8648607365e303c8833bd155f0417e6878a00f28e8c42)
            check_type(argname="argument policy_type", value=policy_type, expected_type=type_hints["policy_type"])
        return typing.cast(None, jsii.invoke(self, "enablePolicyType", [policy_type]))

    @jsii.member(jsii_name="identifier")
    def identifier(self) -> builtins.str:
        '''The unique identifier (ID) of the parent root, organizational unit (OU), account, or policy that you want to create the new OU in.'''
        return typing.cast(builtins.str, jsii.invoke(self, "identifier", []))

    @builtins.property
    @jsii.member(jsii_name="resource")
    def _resource(self) -> _aws_cdk_custom_resources_ceddda9d.AwsCustomResource:
        return typing.cast(_aws_cdk_custom_resources_ceddda9d.AwsCustomResource, jsii.get(self, "resource"))

    @builtins.property
    @jsii.member(jsii_name="rootId")
    def root_id(self) -> builtins.str:
        '''The unique identifier (ID) for the root.

        The regex pattern for a root ID string requires "r-" followed by from 4 to 32 lowercase letters or digits.
        '''
        return typing.cast(builtins.str, jsii.get(self, "rootId"))

    @builtins.property
    @jsii.member(jsii_name="tags")
    def tags(self) -> _aws_cdk_ceddda9d.TagManager:
        '''TagManager to set, remove and format tags.'''
        return typing.cast(_aws_cdk_ceddda9d.TagManager, jsii.get(self, "tags"))


@jsii.interface(jsii_type="@pepperize/cdk-organizations.IAccount")
class IAccount(
    IPolicyAttachmentTarget,
    IChild,
    _constructs_77d1e7e8.IConstruct,
    IResource,
    typing_extensions.Protocol,
):
    @builtins.property
    @jsii.member(jsii_name="accountArn")
    def account_arn(self) -> builtins.str:
        '''The Amazon Resource Name (ARN) of the account.'''
        ...

    @builtins.property
    @jsii.member(jsii_name="accountId")
    def account_id(self) -> builtins.str:
        '''If the account was created successfully, the unique identifier (ID) of the new account.

        Exactly 12 digits.
        '''
        ...

    @builtins.property
    @jsii.member(jsii_name="accountName")
    def account_name(self) -> builtins.str:
        '''The friendly name of the account.'''
        ...

    @builtins.property
    @jsii.member(jsii_name="email")
    def email(self) -> builtins.str:
        '''The email address of the owner to assign to the new member account.

        This email address must not already be associated with another AWS account. You must use a valid email address to complete account creation. You can't access the root user of the account or remove an account that was created with an invalid email address.
        '''
        ...

    @jsii.member(jsii_name="delegateAdministrator")
    def delegate_administrator(
        self,
        service_principal: builtins.str,
        region: typing.Optional[builtins.str] = None,
        props: typing.Optional[typing.Mapping[builtins.str, typing.Any]] = None,
    ) -> None:
        '''Enables trusted access for the AWS service (trusted service) as Delegated Administrator, which performs tasks in your organization and its accounts on your behalf.

        :param service_principal: The supported AWS service that you specify.
        :param region: The region to delegate in.
        :param props: additional DelegatedAdministrator props.
        '''
        ...


class _IAccountProxy(
    jsii.proxy_for(IPolicyAttachmentTarget), # type: ignore[misc]
    jsii.proxy_for(IChild), # type: ignore[misc]
    jsii.proxy_for(_constructs_77d1e7e8.IConstruct), # type: ignore[misc]
    jsii.proxy_for(IResource), # type: ignore[misc]
):
    __jsii_type__: typing.ClassVar[str] = "@pepperize/cdk-organizations.IAccount"

    @builtins.property
    @jsii.member(jsii_name="accountArn")
    def account_arn(self) -> builtins.str:
        '''The Amazon Resource Name (ARN) of the account.'''
        return typing.cast(builtins.str, jsii.get(self, "accountArn"))

    @builtins.property
    @jsii.member(jsii_name="accountId")
    def account_id(self) -> builtins.str:
        '''If the account was created successfully, the unique identifier (ID) of the new account.

        Exactly 12 digits.
        '''
        return typing.cast(builtins.str, jsii.get(self, "accountId"))

    @builtins.property
    @jsii.member(jsii_name="accountName")
    def account_name(self) -> builtins.str:
        '''The friendly name of the account.'''
        return typing.cast(builtins.str, jsii.get(self, "accountName"))

    @builtins.property
    @jsii.member(jsii_name="email")
    def email(self) -> builtins.str:
        '''The email address of the owner to assign to the new member account.

        This email address must not already be associated with another AWS account. You must use a valid email address to complete account creation. You can't access the root user of the account or remove an account that was created with an invalid email address.
        '''
        return typing.cast(builtins.str, jsii.get(self, "email"))

    @jsii.member(jsii_name="delegateAdministrator")
    def delegate_administrator(
        self,
        service_principal: builtins.str,
        region: typing.Optional[builtins.str] = None,
        props: typing.Optional[typing.Mapping[builtins.str, typing.Any]] = None,
    ) -> None:
        '''Enables trusted access for the AWS service (trusted service) as Delegated Administrator, which performs tasks in your organization and its accounts on your behalf.

        :param service_principal: The supported AWS service that you specify.
        :param region: The region to delegate in.
        :param props: additional DelegatedAdministrator props.
        '''
        if __debug__:
            type_hints = typing.get_type_hints(_typecheckingstub__3cc45c12c746fd1b455c7c3468d1490f1b2e696006ace7329bcce93a25ff50f4)
            check_type(argname="argument service_principal", value=service_principal, expected_type=type_hints["service_principal"])
            check_type(argname="argument region", value=region, expected_type=type_hints["region"])
            check_type(argname="argument props", value=props, expected_type=type_hints["props"])
        return typing.cast(None, jsii.invoke(self, "delegateAdministrator", [service_principal, region, props]))

# Adding a "__jsii_proxy_class__(): typing.Type" function to the interface
typing.cast(typing.Any, IAccount).__jsii_proxy_class__ = lambda : _IAccountProxy


@jsii.interface(jsii_type="@pepperize/cdk-organizations.IOrganizationalUnit")
class IOrganizationalUnit(
    IPolicyAttachmentTarget,
    IParent,
    IChild,
    _constructs_77d1e7e8.IConstruct,
    typing_extensions.Protocol,
):
    '''A container for accounts within a root.

    An OU also can contain other OUs, enabling you to create a hierarchy that resembles an upside-down tree, with a root at the top and branches of OUs that reach down, ending in accounts that are the leaves of the tree. When you attach a policy to one of the nodes in the hierarchy, it flows down and affects all the branches (OUs) and leaves (accounts) beneath it. An OU can have exactly one parent, and currently each account can be a member of exactly one OU.

    You must first move all accounts out of the OU and any child OUs, and then you can delete the child OUs.
    '''

    @builtins.property
    @jsii.member(jsii_name="organizationalUnitArn")
    def organizational_unit_arn(self) -> builtins.str:
        '''The Amazon Resource Name (ARN) of this OU.

        For more information about ARNs in Organizations, see `ARN Formats Supported by Organizations <https://docs.aws.amazon.com/service-authorization/latest/reference/list_awsorganizations.html#awsorganizations-resources-for-iam-policies>`_ in the AWS Service Authorization Reference.
        '''
        ...

    @builtins.property
    @jsii.member(jsii_name="organizationalUnitId")
    def organizational_unit_id(self) -> builtins.str:
        '''The unique identifier (ID) associated with this OU.

        The regex pattern for an organizational unit ID string requires "ou-" followed by from 4 to 32 lowercase letters or digits (the ID of the root that contains the OU). This string is followed by a second "-" dash and from 8 to 32 additional lowercase letters or digits.
        '''
        ...

    @builtins.property
    @jsii.member(jsii_name="organizationalUnitName")
    def organizational_unit_name(self) -> builtins.str:
        '''The friendly name of this OU.'''
        ...


class _IOrganizationalUnitProxy(
    jsii.proxy_for(IPolicyAttachmentTarget), # type: ignore[misc]
    jsii.proxy_for(IParent), # type: ignore[misc]
    jsii.proxy_for(IChild), # type: ignore[misc]
    jsii.proxy_for(_constructs_77d1e7e8.IConstruct), # type: ignore[misc]
):
    '''A container for accounts within a root.

    An OU also can contain other OUs, enabling you to create a hierarchy that resembles an upside-down tree, with a root at the top and branches of OUs that reach down, ending in accounts that are the leaves of the tree. When you attach a policy to one of the nodes in the hierarchy, it flows down and affects all the branches (OUs) and leaves (accounts) beneath it. An OU can have exactly one parent, and currently each account can be a member of exactly one OU.

    You must first move all accounts out of the OU and any child OUs, and then you can delete the child OUs.
    '''

    __jsii_type__: typing.ClassVar[str] = "@pepperize/cdk-organizations.IOrganizationalUnit"

    @builtins.property
    @jsii.member(jsii_name="organizationalUnitArn")
    def organizational_unit_arn(self) -> builtins.str:
        '''The Amazon Resource Name (ARN) of this OU.

        For more information about ARNs in Organizations, see `ARN Formats Supported by Organizations <https://docs.aws.amazon.com/service-authorization/latest/reference/list_awsorganizations.html#awsorganizations-resources-for-iam-policies>`_ in the AWS Service Authorization Reference.
        '''
        return typing.cast(builtins.str, jsii.get(self, "organizationalUnitArn"))

    @builtins.property
    @jsii.member(jsii_name="organizationalUnitId")
    def organizational_unit_id(self) -> builtins.str:
        '''The unique identifier (ID) associated with this OU.

        The regex pattern for an organizational unit ID string requires "ou-" followed by from 4 to 32 lowercase letters or digits (the ID of the root that contains the OU). This string is followed by a second "-" dash and from 8 to 32 additional lowercase letters or digits.
        '''
        return typing.cast(builtins.str, jsii.get(self, "organizationalUnitId"))

    @builtins.property
    @jsii.member(jsii_name="organizationalUnitName")
    def organizational_unit_name(self) -> builtins.str:
        '''The friendly name of this OU.'''
        return typing.cast(builtins.str, jsii.get(self, "organizationalUnitName"))

# Adding a "__jsii_proxy_class__(): typing.Type" function to the interface
typing.cast(typing.Any, IOrganizationalUnit).__jsii_proxy_class__ = lambda : _IOrganizationalUnitProxy


@jsii.implements(IOrganizationalUnit, ITaggableResource)
class OrganizationalUnit(
    _constructs_77d1e7e8.Construct,
    metaclass=jsii.JSIIMeta,
    jsii_type="@pepperize/cdk-organizations.OrganizationalUnit",
):
    def __init__(
        self,
        scope: _constructs_77d1e7e8.Construct,
        id: builtins.str,
        *,
        organizational_unit_name: builtins.str,
        parent: IParent,
        import_on_duplicate: typing.Optional[builtins.bool] = None,
        removal_policy: typing.Optional[_aws_cdk_ceddda9d.RemovalPolicy] = None,
    ) -> None:
        '''
        :param scope: -
        :param id: -
        :param organizational_unit_name: The friendly name to assign to the new OU.
        :param parent: The parent root or OU that you want to create the new OrganizationalUnit in.
        :param import_on_duplicate: Whether to import, if a duplicate organizational unit with same name exists in the parent exists. Default: true
        :param removal_policy: If set to RemovalPolicy.DESTROY, the organizational unit will be deleted. Default: RemovalPolicy.Retain
        '''
        if __debug__:
            type_hints = typing.get_type_hints(_typecheckingstub__8032ed3967de511e4025bd5fbfcc3b3bb8d79cfaf7a44e33545947a09d53cb91)
            check_type(argname="argument scope", value=scope, expected_type=type_hints["scope"])
            check_type(argname="argument id", value=id, expected_type=type_hints["id"])
        props = OrganizationalUnitProps(
            organizational_unit_name=organizational_unit_name,
            parent=parent,
            import_on_duplicate=import_on_duplicate,
            removal_policy=removal_policy,
        )

        jsii.create(self.__class__, self, [scope, id, props])

    @jsii.member(jsii_name="attachPolicy")
    def attach_policy(self, policy: IPolicy) -> None:
        '''Attach a policy.

        Before you can attach the policy, you must enable that policy type for use. You can use policies when you have all features enabled.

        :param policy: -

        :see: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies.html
        '''
        if __debug__:
            type_hints = typing.get_type_hints(_typecheckingstub__932cd9abed9566b99f45c027d94e28d66edc23047ea0535e98d0698749c14592)
            check_type(argname="argument policy", value=policy, expected_type=type_hints["policy"])
        return typing.cast(None, jsii.invoke(self, "attachPolicy", [policy]))

    @jsii.member(jsii_name="identifier")
    def identifier(self) -> builtins.str:
        '''The unique identifier (ID) of the parent root, organizational unit (OU), account, or policy that you want to create the new OU in.'''
        return typing.cast(builtins.str, jsii.invoke(self, "identifier", []))

    @builtins.property
    @jsii.member(jsii_name="organizationalUnitArn")
    def organizational_unit_arn(self) -> builtins.str:
        '''The Amazon Resource Name (ARN) of this OU.

        For more information about ARNs in Organizations, see `ARN Formats Supported by Organizations <https://docs.aws.amazon.com/service-authorization/latest/reference/list_awsorganizations.html#awsorganizations-resources-for-iam-policies>`_ in the AWS Service Authorization Reference.
        '''
        return typing.cast(builtins.str, jsii.get(self, "organizationalUnitArn"))

    @builtins.property
    @jsii.member(jsii_name="organizationalUnitId")
    def organizational_unit_id(self) -> builtins.str:
        '''The unique identifier (ID) associated with this OU.

        The regex pattern for an organizational unit ID string requires "ou-" followed by from 4 to 32 lowercase letters or digits (the ID of the root that contains the OU). This string is followed by a second "-" dash and from 8 to 32 additional lowercase letters or digits.
        '''
        return typing.cast(builtins.str, jsii.get(self, "organizationalUnitId"))

    @builtins.property
    @jsii.member(jsii_name="organizationalUnitName")
    def organizational_unit_name(self) -> builtins.str:
        '''The friendly name of this OU.'''
        return typing.cast(builtins.str, jsii.get(self, "organizationalUnitName"))

    @builtins.property
    @jsii.member(jsii_name="resource")
    def _resource(self) -> _aws_cdk_ceddda9d.CustomResource:
        return typing.cast(_aws_cdk_ceddda9d.CustomResource, jsii.get(self, "resource"))

    @builtins.property
    @jsii.member(jsii_name="tags")
    def tags(self) -> _aws_cdk_ceddda9d.TagManager:
        '''TagManager to set, remove and format tags.'''
        return typing.cast(_aws_cdk_ceddda9d.TagManager, jsii.get(self, "tags"))


class Parent(
    ParentBase,
    metaclass=jsii.JSIIMeta,
    jsii_type="@pepperize/cdk-organizations.Parent",
):
    def __init__(
        self,
        scope: _constructs_77d1e7e8.Construct,
        id: builtins.str,
        *,
        child: IChild,
    ) -> None:
        '''
        :param scope: -
        :param id: -
        :param child: 
        '''
        if __debug__:
            type_hints = typing.get_type_hints(_typecheckingstub__87a2652072071d839f166caeb4747eed3c79bc66fc6924ee089686265e6adfc3)
            check_type(argname="argument scope", value=scope, expected_type=type_hints["scope"])
            check_type(argname="argument id", value=id, expected_type=type_hints["id"])
        props = ParentProps(child=child)

        jsii.create(self.__class__, self, [scope, id, props])

    @jsii.member(jsii_name="fromChildId")
    @builtins.classmethod
    def from_child_id(
        cls,
        scope: _constructs_77d1e7e8.Construct,
        id: builtins.str,
        child_id: builtins.str,
    ) -> IParent:
        '''
        :param scope: -
        :param id: -
        :param child_id: -
        '''
        if __debug__:
            type_hints = typing.get_type_hints(_typecheckingstub__d0a78c3646522aa858b50b84f82977e826ae5ff1f37109de65a8b4658bbb5a9f)
            check_type(argname="argument scope", value=scope, expected_type=type_hints["scope"])
            check_type(argname="argument id", value=id, expected_type=type_hints["id"])
            check_type(argname="argument child_id", value=child_id, expected_type=type_hints["child_id"])
        return typing.cast(IParent, jsii.sinvoke(cls, "fromChildId", [scope, id, child_id]))


@jsii.implements(IAccount, ITaggableResource)
class Account(
    _constructs_77d1e7e8.Construct,
    metaclass=jsii.JSIIMeta,
    jsii_type="@pepperize/cdk-organizations.Account",
):
    '''Creates or imports an AWS account that is automatically a member of the organization whose credentials made the request.

    AWS Organizations automatically copies the information from the management account to the new member account
    '''

    def __init__(
        self,
        scope: _constructs_77d1e7e8.Construct,
        id: builtins.str,
        *,
        account_name: builtins.str,
        email: builtins.str,
        iam_user_access_to_billing: typing.Optional[IamUserAccessToBilling] = None,
        import_on_duplicate: typing.Optional[builtins.bool] = None,
        parent: typing.Optional[IParent] = None,
        removal_policy: typing.Optional[_aws_cdk_ceddda9d.RemovalPolicy] = None,
        role_name: typing.Optional[builtins.str] = None,
    ) -> None:
        '''
        :param scope: -
        :param id: -
        :param account_name: The friendly name of the member account.
        :param email: The email address of the owner to assign to the new member account. This email address must not already be associated with another AWS account. You must use a valid email address to complete account creation. You can't access the root user of the account or remove an account that was created with an invalid email address.
        :param iam_user_access_to_billing: If set to ALLOW , the new account enables IAM users to access account billing information if they have the required permissions. If set to DENY , only the root user of the new account can access account billing information. Default: ALLOW
        :param import_on_duplicate: Whether to import, if a duplicate account with same name and email already exists. Default: true
        :param parent: The parent root or OU that you want to create the new Account in.
        :param removal_policy: If set to RemovalPolicy.DESTROY, the account will be moved to the root. Default: RemovalPolicy.Retain
        :param role_name: The name of an IAM role that AWS Organizations automatically preconfigures in the new member account. This role trusts the management account, allowing users in the management account to assume the role, as permitted by the management account administrator. The role has administrator permissions in the new member account. If you don't specify this parameter, the role name defaults to OrganizationAccountAccessRole.
        '''
        if __debug__:
            type_hints = typing.get_type_hints(_typecheckingstub__10229c35276eac7147803c0ff8d83401ba4412435d3a8da1a10eb48092019780)
            check_type(argname="argument scope", value=scope, expected_type=type_hints["scope"])
            check_type(argname="argument id", value=id, expected_type=type_hints["id"])
        props = AccountProps(
            account_name=account_name,
            email=email,
            iam_user_access_to_billing=iam_user_access_to_billing,
            import_on_duplicate=import_on_duplicate,
            parent=parent,
            removal_policy=removal_policy,
            role_name=role_name,
        )

        jsii.create(self.__class__, self, [scope, id, props])

    @jsii.member(jsii_name="attachPolicy")
    def attach_policy(self, policy: IPolicy) -> None:
        '''Attach a policy.

        Before you can attach the policy, you must enable that policy type for use. You can use policies when you have all features enabled.

        :param policy: -

        :see: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies.html
        '''
        if __debug__:
            type_hints = typing.get_type_hints(_typecheckingstub__24e8572061db376a96b5ff6a2071fcf89cbac87b3f2ec509ef37ae5eb6b6e718)
            check_type(argname="argument policy", value=policy, expected_type=type_hints["policy"])
        return typing.cast(None, jsii.invoke(self, "attachPolicy", [policy]))

    @jsii.member(jsii_name="delegateAdministrator")
    def delegate_administrator(
        self,
        service_principal: builtins.str,
        region: typing.Optional[builtins.str] = None,
        props: typing.Optional[typing.Mapping[builtins.str, typing.Any]] = None,
    ) -> None:
        '''Enables trusted access for the AWS service (trusted service) as Delegated Administrator, which performs tasks in your organization and its accounts on your behalf.

        :param service_principal: The supported AWS service that you specify.
        :param region: The region to delegate in.
        :param props: additional DelegatedAdministrator props.
        '''
        if __debug__:
            type_hints = typing.get_type_hints(_typecheckingstub__6037a5a890e3ebd208b5251fef4b83001cd0ddbb8a26a347236ac833cb5b845f)
            check_type(argname="argument service_principal", value=service_principal, expected_type=type_hints["service_principal"])
            check_type(argname="argument region", value=region, expected_type=type_hints["region"])
            check_type(argname="argument props", value=props, expected_type=type_hints["props"])
        return typing.cast(None, jsii.invoke(self, "delegateAdministrator", [service_principal, region, props]))

    @jsii.member(jsii_name="identifier")
    def identifier(self) -> builtins.str:
        '''The unique identifier (ID) of the parent root, organizational unit (OU), account, or policy that you want to create the new OU in.'''
        return typing.cast(builtins.str, jsii.invoke(self, "identifier", []))

    @builtins.property
    @jsii.member(jsii_name="accountArn")
    def account_arn(self) -> builtins.str:
        '''The Amazon Resource Name (ARN) of the account.'''
        return typing.cast(builtins.str, jsii.get(self, "accountArn"))

    @builtins.property
    @jsii.member(jsii_name="accountId")
    def account_id(self) -> builtins.str:
        '''If the account was created successfully, the unique identifier (ID) of the new account.

        Exactly 12 digits.
        '''
        return typing.cast(builtins.str, jsii.get(self, "accountId"))

    @builtins.property
    @jsii.member(jsii_name="accountName")
    def account_name(self) -> builtins.str:
        '''The friendly name of the account.'''
        return typing.cast(builtins.str, jsii.get(self, "accountName"))

    @builtins.property
    @jsii.member(jsii_name="email")
    def email(self) -> builtins.str:
        '''The email address of the owner to assign to the new member account.

        This email address must not already be associated with another AWS account. You must use a valid email address to complete account creation. You can't access the root user of the account or remove an account that was created with an invalid email address.
        '''
        return typing.cast(builtins.str, jsii.get(self, "email"))

    @builtins.property
    @jsii.member(jsii_name="resource")
    def _resource(self) -> _aws_cdk_ceddda9d.CustomResource:
        return typing.cast(_aws_cdk_ceddda9d.CustomResource, jsii.get(self, "resource"))

    @builtins.property
    @jsii.member(jsii_name="tags")
    def tags(self) -> _aws_cdk_ceddda9d.TagManager:
        '''TagManager to set, remove and format tags.'''
        return typing.cast(_aws_cdk_ceddda9d.TagManager, jsii.get(self, "tags"))


__all__ = [
    "Account",
    "AccountProps",
    "DelegatedAdministrator",
    "DelegatedAdministratorProps",
    "DependencyChain",
    "EnableAwsServiceAccess",
    "EnableAwsServiceAccessProps",
    "EnablePolicyType",
    "EnablePolicyTypeProps",
    "FeatureSet",
    "IAccount",
    "IChild",
    "IOrganization",
    "IOrganizationalUnit",
    "IParent",
    "IPolicy",
    "IPolicyAttachmentTarget",
    "IResource",
    "ITaggableResource",
    "IamUserAccessToBilling",
    "Organization",
    "OrganizationProps",
    "OrganizationalUnit",
    "OrganizationalUnitProps",
    "Parent",
    "ParentBase",
    "ParentBaseProps",
    "ParentProps",
    "Policy",
    "PolicyAttachment",
    "PolicyAttachmentProps",
    "PolicyProps",
    "PolicyType",
    "Root",
    "TagResource",
    "TagResourceProps",
    "Validators",
]

publication.publish()

def _typecheckingstub__2f2a8133c5dea4a5262ada226104f859039e01d3b90c45e47f8dba4c205b9fa4(
    *,
    account_name: builtins.str,
    email: builtins.str,
    iam_user_access_to_billing: typing.Optional[IamUserAccessToBilling] = None,
    import_on_duplicate: typing.Optional[builtins.bool] = None,
    parent: typing.Optional[IParent] = None,
    removal_policy: typing.Optional[_aws_cdk_ceddda9d.RemovalPolicy] = None,
    role_name: typing.Optional[builtins.str] = None,
) -> None:
    """Type checking stubs"""
    pass

def _typecheckingstub__8d31a0ea7abede2614013dc94c74476833f3cbbece0536a3ef8eebece0864b74(
    scope: _constructs_77d1e7e8.Construct,
    id: builtins.str,
    *,
    account: IAccount,
    service_principal: builtins.str,
    region: typing.Optional[builtins.str] = None,
    removal_policy: typing.Optional[_aws_cdk_ceddda9d.RemovalPolicy] = None,
) -> None:
    """Type checking stubs"""
    pass

def _typecheckingstub__3312e7dada1287aeae2e3140a605f57d74b631868a8394a90c6651909c9a70b6(
    *,
    account: IAccount,
    service_principal: builtins.str,
    region: typing.Optional[builtins.str] = None,
    removal_policy: typing.Optional[_aws_cdk_ceddda9d.RemovalPolicy] = None,
) -> None:
    """Type checking stubs"""
    pass

def _typecheckingstub__bd1aadb979595763895016cdfd6e633077a7632c326454ee0460e562bed9e8a8(
    current: _constructs_77d1e7e8.IConstruct,
) -> None:
    """Type checking stubs"""
    pass

def _typecheckingstub__4dbb87204f07a7fca34c7f76b92e79ed78998e39b01f070f38557db68112f782(
    scope: _constructs_77d1e7e8.Construct,
    id: builtins.str,
    *,
    service_principal: builtins.str,
) -> None:
    """Type checking stubs"""
    pass

def _typecheckingstub__0ff464f4c8cec42c00b06d7d2921db91e94a3e01afc853456dfa2a3074ffc992(
    *,
    service_principal: builtins.str,
) -> None:
    """Type checking stubs"""
    pass

def _typecheckingstub__06187ec27307ece8e0eaa9afcf96a6e21328e6e9c622908b05926c2858492237(
    scope: _constructs_77d1e7e8.Construct,
    id: builtins.str,
    *,
    policy_type: PolicyType,
    root: Root,
) -> None:
    """Type checking stubs"""
    pass

def _typecheckingstub__363ee6510cfe4270baceaf5737bc42e38996524ef67ee3dd9ddd3a88b2b8f783(
    *,
    policy_type: PolicyType,
    root: Root,
) -> None:
    """Type checking stubs"""
    pass

def _typecheckingstub__fe623ed232ddbbc82c5b721cb934c3f5f5e02983759e8d064db61facd11d2a71(
    scope: _constructs_77d1e7e8.Construct,
    id: builtins.str,
    *,
    feature_set: typing.Optional[FeatureSet] = None,
) -> None:
    """Type checking stubs"""
    pass

def _typecheckingstub__5bc27a74dc16813e541228dac8b7afae9c3323036af2d0d35db2a0071d30f922(
    scope: _constructs_77d1e7e8.Construct,
    id: builtins.str,
) -> None:
    """Type checking stubs"""
    pass

def _typecheckingstub__076117b1c8f111e9b5365071d526e9949d5befee27bf731bea7f7c0bdaa23634(
    policy: IPolicy,
) -> None:
    """Type checking stubs"""
    pass

def _typecheckingstub__73d9f4bd2bbcd6a3e2199d0c3cca84d624e92b80ed36ec4ae6d98a80a7143c31(
    service_principal: builtins.str,
) -> None:
    """Type checking stubs"""
    pass

def _typecheckingstub__2f2f50ae3498f91ab8a7521c5b4d9c4edc15495e30473d7d9995c95f96dac55d(
    policy_type: PolicyType,
) -> None:
    """Type checking stubs"""
    pass

def _typecheckingstub__8b7ef7201e4e0ace872c6f8a140f9804cdd7cffe32f615a048fef7c0fa37518a(
    *,
    feature_set: typing.Optional[FeatureSet] = None,
) -> None:
    """Type checking stubs"""
    pass

def _typecheckingstub__fda6d7bb2e5e324b5407944d052924ed5bc1c0c150b7c4f11e58178c2799929c(
    *,
    organizational_unit_name: builtins.str,
    parent: IParent,
    import_on_duplicate: typing.Optional[builtins.bool] = None,
    removal_policy: typing.Optional[_aws_cdk_ceddda9d.RemovalPolicy] = None,
) -> None:
    """Type checking stubs"""
    pass

def _typecheckingstub__d75b8d565e93bf488dc576e3175743c2851d036d1c81cc6e3659a0ce68424313(
    *,
    child_id: builtins.str,
) -> None:
    """Type checking stubs"""
    pass

def _typecheckingstub__6082c21bc1519af7eb52e988f4ef77e2bbca75ab4d154163c23a3ff053ad2012(
    *,
    child: IChild,
) -> None:
    """Type checking stubs"""
    pass

def _typecheckingstub__e2dbb2e3687c84e4f5836f26e63616981fb4d677b35edf2ba6674bd7f5f3ca2d(
    scope: _constructs_77d1e7e8.Construct,
    id: builtins.str,
    *,
    content: builtins.str,
    policy_name: builtins.str,
    policy_type: PolicyType,
    description: typing.Optional[builtins.str] = None,
) -> None:
    """Type checking stubs"""
    pass

def _typecheckingstub__68fa6b5efca5695d06ccd38f4db2f322c2512bd9ebab09b1aed760a0b44e8e1b(
    scope: _constructs_77d1e7e8.Construct,
    id: builtins.str,
    *,
    policy: IPolicy,
    target: IPolicyAttachmentTarget,
) -> None:
    """Type checking stubs"""
    pass

def _typecheckingstub__66fb02085eafc8d53596d2bf7d580928c58468d0f81eced5cd6539fe3d96c265(
    *,
    policy: IPolicy,
    target: IPolicyAttachmentTarget,
) -> None:
    """Type checking stubs"""
    pass

def _typecheckingstub__ed363dc7bdfb605821291f3b9ba0f000aad1b42ce2e571a392f1be3979e1ac17(
    *,
    content: builtins.str,
    policy_name: builtins.str,
    policy_type: PolicyType,
    description: typing.Optional[builtins.str] = None,
) -> None:
    """Type checking stubs"""
    pass

def _typecheckingstub__e4438ab06e39f67c3b816639b6f7f7b095f48d153fbcecb5418c8d1cdfab72b2(
    scope: _constructs_77d1e7e8.Construct,
    id: builtins.str,
    *,
    resource_id: builtins.str,
    tags: _aws_cdk_ceddda9d.IResolvable,
) -> None:
    """Type checking stubs"""
    pass

def _typecheckingstub__319ef0a92368e6caafc815a036740e37c253cb44b8b279dafba4876bdb6059e1(
    *,
    resource_id: builtins.str,
    tags: _aws_cdk_ceddda9d.IResolvable,
) -> None:
    """Type checking stubs"""
    pass

def _typecheckingstub__77a1e22c776e450d536cd6a01841c4c05bb9d0da4f8ff87495292ffa937633ff(
    id: builtins.str,
) -> None:
    """Type checking stubs"""
    pass

def _typecheckingstub__0f4c5fdea23a4105adf0040d694c8e78f9369880cc742762e7c86617f2d88bfc(
    name: builtins.str,
) -> None:
    """Type checking stubs"""
    pass

def _typecheckingstub__002964e0f76b9a874b0b833bcee68d284be4f9fd49b66e06214dc30a8e754212(
    email: builtins.str,
) -> None:
    """Type checking stubs"""
    pass

def _typecheckingstub__135fbabad9582a06cc292ffb3559f7881b2e3f05e219e96430049e79a4d441e1(
    name: builtins.str,
) -> None:
    """Type checking stubs"""
    pass

def _typecheckingstub__1cb31cd047a70423f6e2e232cbcca9dd3bbe1dcd06c53009af3824820e5d5858(
    content: builtins.str,
) -> None:
    """Type checking stubs"""
    pass

def _typecheckingstub__d8721e616867cc96d7a916586b9049d387cd12c214a4cf92b62fca094a107d2f(
    service_principal: builtins.str,
) -> None:
    """Type checking stubs"""
    pass

def _typecheckingstub__2a7be112af4b0bad0ffd308798243b3a45da2c038b733f6ec52811596d7ad93e(
    scope: _constructs_77d1e7e8.Construct,
    id: builtins.str,
    *,
    child_id: builtins.str,
) -> None:
    """Type checking stubs"""
    pass

def _typecheckingstub__82f1d2def63ea6869806eac2bf0d0b9fc400dbe5757655cc098f29b351925a4e(
    scope: _constructs_77d1e7e8.Construct,
    id: builtins.str,
) -> None:
    """Type checking stubs"""
    pass

def _typecheckingstub__75f9c32ebf0b2375c1310899ebb2929248be9e3704849a157049ee6fb6adf51b(
    policy: IPolicy,
) -> None:
    """Type checking stubs"""
    pass

def _typecheckingstub__b0e1229c541b2aa4c6c8648607365e303c8833bd155f0417e6878a00f28e8c42(
    policy_type: PolicyType,
) -> None:
    """Type checking stubs"""
    pass

def _typecheckingstub__3cc45c12c746fd1b455c7c3468d1490f1b2e696006ace7329bcce93a25ff50f4(
    service_principal: builtins.str,
    region: typing.Optional[builtins.str] = None,
    props: typing.Optional[typing.Mapping[builtins.str, typing.Any]] = None,
) -> None:
    """Type checking stubs"""
    pass

def _typecheckingstub__8032ed3967de511e4025bd5fbfcc3b3bb8d79cfaf7a44e33545947a09d53cb91(
    scope: _constructs_77d1e7e8.Construct,
    id: builtins.str,
    *,
    organizational_unit_name: builtins.str,
    parent: IParent,
    import_on_duplicate: typing.Optional[builtins.bool] = None,
    removal_policy: typing.Optional[_aws_cdk_ceddda9d.RemovalPolicy] = None,
) -> None:
    """Type checking stubs"""
    pass

def _typecheckingstub__932cd9abed9566b99f45c027d94e28d66edc23047ea0535e98d0698749c14592(
    policy: IPolicy,
) -> None:
    """Type checking stubs"""
    pass

def _typecheckingstub__87a2652072071d839f166caeb4747eed3c79bc66fc6924ee089686265e6adfc3(
    scope: _constructs_77d1e7e8.Construct,
    id: builtins.str,
    *,
    child: IChild,
) -> None:
    """Type checking stubs"""
    pass

def _typecheckingstub__d0a78c3646522aa858b50b84f82977e826ae5ff1f37109de65a8b4658bbb5a9f(
    scope: _constructs_77d1e7e8.Construct,
    id: builtins.str,
    child_id: builtins.str,
) -> None:
    """Type checking stubs"""
    pass

def _typecheckingstub__10229c35276eac7147803c0ff8d83401ba4412435d3a8da1a10eb48092019780(
    scope: _constructs_77d1e7e8.Construct,
    id: builtins.str,
    *,
    account_name: builtins.str,
    email: builtins.str,
    iam_user_access_to_billing: typing.Optional[IamUserAccessToBilling] = None,
    import_on_duplicate: typing.Optional[builtins.bool] = None,
    parent: typing.Optional[IParent] = None,
    removal_policy: typing.Optional[_aws_cdk_ceddda9d.RemovalPolicy] = None,
    role_name: typing.Optional[builtins.str] = None,
) -> None:
    """Type checking stubs"""
    pass

def _typecheckingstub__24e8572061db376a96b5ff6a2071fcf89cbac87b3f2ec509ef37ae5eb6b6e718(
    policy: IPolicy,
) -> None:
    """Type checking stubs"""
    pass

def _typecheckingstub__6037a5a890e3ebd208b5251fef4b83001cd0ddbb8a26a347236ac833cb5b845f(
    service_principal: builtins.str,
    region: typing.Optional[builtins.str] = None,
    props: typing.Optional[typing.Mapping[builtins.str, typing.Any]] = None,
) -> None:
    """Type checking stubs"""
    pass
