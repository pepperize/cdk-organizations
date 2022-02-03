[![GitHub](https://img.shields.io/github/license/pepperize/cdk-organizations?style=flat-square)](https://github.com/pepperize/cdk-organizations/blob/main/LICENSE)
[![npm (scoped)](https://img.shields.io/npm/v/@pepperize/cdk-organizations?style=flat-square)](https://www.npmjs.com/package/@pepperize/cdk-organizations)
[![PyPI](https://img.shields.io/pypi/v/pepperize.cdk-organizations?style=flat-square)](https://pypi.org/project/pepperize.cdk-organizations/)
[![Nuget](https://img.shields.io/nuget/v/Pepperize.CDK.Organizations?style=flat-square)](https://www.nuget.org/packages/Pepperize.CDK.Organizations/)
[![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/pepperize/cdk-organizations/release/main?label=release&style=flat-square)](https://github.com/pepperize/cdk-organizations/actions/workflows/release.yml)
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/pepperize/cdk-organizations?sort=semver&style=flat-square)](https://github.com/pepperize/cdk-organizations/releases)
[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod&style=flat-square)](https://gitpod.io/#https://github.com/pepperize/cdk-organizations)

# CDK Organizations

Manage AWS organizations, organizational units (OU), accounts and service control policies (SCP).

Motivation:

> Currently, there is no `aws-cdk-lib/organizations` available. See this [Issue on AWS CDK](https://github.com/aws/aws-cdk/issues/2877).

## References

- [CDK Organizations API Reference](https://github.com/pepperize/cdk-organizations/blob/main/API.md)
- [AWS Account Management Reference Guide](https://docs.aws.amazon.com/accounts/latest/reference/accounts-welcome.html)
- [AWS Organizations User Guide](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html)
- [AWS API Reference](https://docs.aws.amazon.com/organizations/latest/APIReference/Welcome.html)
- [AWS CDK Custom Resources](https://docs.aws.amazon.com/cdk/api/v1/docs/custom-resources-readme.html#custom-resources-for-aws-apis)

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

### C\# / .Net

```
dotnet add package Pepperize.CDK.Organizations
```

## Getting Started

1. Create a new account

   [Signup for AWS](https://portal.aws.amazon.com/billing/signup#/start)

2. Prepare an IAM User with `AdministratorAccess`

   To deploy your new organization, you have to create an Administrator with an Access Key

   - [Creating your first IAM admin user and user group](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html)
   - [Managing access keys for IAM users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey)

3. Create a new CDK TypeScript App project with [projen](https://github.com/projen/projen)

   ```shell
   mkdir my-project
   cd my-project
   git init -b main
   npx projen new awscdk-app-ts
   ```

4. Add `@pepperize/cdk-organizations` to your dependencies in `.projenrc.js`

   ```typescript
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

   ```typescript
   import { Account, Organization, OrganizationalUnit } from "@pepperize/cdk-organizations";
   import { Stack } from "aws-cdk-lib";

   export class OrganizationStack extends Stack {
     constructor(scope: Construct, id: string, props: StackProps = {}) {
       super(scope, id, { ...props, env: { ...props.env, region: "us-east-1" } }); // AWS Organizations API is only available in region us-east-1

       // Create your organization
       const organization = new Organization(stack, "Organization", {});

       // Create an organizational unit (OU)
       const organizationUnit = new OrganizationalUnit(stack, "OrganizationalUnit", {
         organizationalUnitName: "MyFirstOU",
         parent: organisation.root,
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

   - [Configuring the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)
   - [AWSume](https://awsu.me/)

   The easiest is to export your access key

   ```shell
   export AWS_ACCESS_KEY_ID=<your created access key id>
   export AWS_SECRET_ACCESS_KEY=<your created secret access key>
   ```

8. Deploy your first AWS organization

   ```shell
   export CDK_DEFAULT_REGION=us-east-1
   export CDK_DEFAULT_ACCOUNT=<your AWS account id>
   ```

   ```shell
   yarn deploy
   ```

## Usage

### Organization

To create a new organization or import an existing organization, add the following construct to your stack:

```typescript
const organization = new Organization(stack, "Organization", {
  featureSet: FeatureSet.ALL, // (default) required later on to enable SCPs, enable AWS services or delegate an adminsitrator account
});
organization.root; // The organization's root is automatically created
```

- `FeatureSet.ALL` is required for advanced features like Service Control Policies (SCP) and is the [preferred way to work with AWS Organizations](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_org_support-all-features.html)
- The account which deploys the stack, will automatically become the management account of the new organization.
- If an organization already exists, it will be imported automatically. You can disable this behaviour by passing `importOnDuplicate: false` in the props.
- If the construct is removed from the stack, the organization will remain and must be deleted manually. For deletion of an organization you must previously remove all the member accounts, OUs, and policies from the organization. [Deleting the organization by removing the management account](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_org_delete.html)
- An organization root is automatically created for you when you create the new organization.

See [IOrganization](https://github.com/pepperize/cdk-organizations/blob/main/API.md#@pepperize/cdk-organizations.IOrganization)

### Organizational Unit (OU)

To create a new organizational unit (OU), add the following construct to your stack:

```typescript
const organizationUnit = new OrganizationalUnit(stack, "Organization", {
  organizationalUnitName: "Project2",
  parent: organisation.root,
});
```

- The parent of an organizational unit (OU) can be either the organization's root or another OU within the organization.
- An organizational unit (OU) can't be moved. You have to create a new OU first, move all the accounts and then delete the old OU.
- For deletion of an organizational unit (OU) you must first move all accounts out of the OU and any child OUs, and then you can delete the child OUs. [Deleting an organizational unit](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_ous.html#delete-ou)

See [IOrganizationalUnit](https://github.com/pepperize/cdk-organizations/blob/main/API.md#@pepperize/cdk-organizations.IOrganizationalUnit)

#### Organizational Unit (OU) Properties

- `importOnDuplicate` If an organizational unit (OU) with the name exists in the parent, it will be imported.
- `removalPolicy` Default `RemovalPolicy.Retain` If you set `removalPolicy` to `RemovalPolicy.destroy`, the organizational unit (OU) will be deleted on Cloudformation delete event.

See [OrganizationalUnitProps](https://github.com/pepperize/cdk-organizations/blob/main/API.md#@pepperize/cdk-organizations.OrganizationalUnitProps)

### Account

To create a new account, add the following construct to your stack:

```typescript
new Account(stack, "Account", {
  accountName: "MyAccount",
  email: "info@pepperize.com",
  parent: organization.root,
});
```

- The email address must not already be associated with another AWS account. You may suffix the email address, i.e. `info+account-123456789012@pepperize.com`.
- An account will be created and moved to the parent, if the parent is an organizational unit (OU).
- An account can only be created from within the management account in the `us-east-1` region.
- An account can't be deleted easily, if the construct gets removed from the stack the account still remains. [Closing an AWS account](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_close.html)

See [IAccount](https://github.com/pepperize/cdk-organizations/blob/main/API.md#@pepperize/cdk-organizations.IAccount)

#### Account Properties

- `importOnDuplicate` If an account with the same email address exists in the organization, it will be imported.
- `removalPolicy` Default `RemovalPolicy.Retain` If you set `removalPolicy` to `RemovalPolicy.destroy`, the account will be moved to the root on Cloudformation delete event.
- `iamUserAccessToBilling` Default `IamUserAccessToBilling.ALLOW` If you set `iamUserAccessToBilling` to `ALLOW`, IAM users and roles that have appropriate permissions can view billing information for the account.
- `roleName` Default `OrganizationAccountAccessRole` is preconfigures in the newly created account and grants users in the management account administrator permissions in the new member account.

See [AccountProps](https://github.com/pepperize/cdk-organizations/blob/main/API.md#@pepperize/cdk-organizations.AccountProps)

### Delegated Administrator

A compatible AWS service can register an AWS member account in the organization as an administrator for the organization's accounts in that service, using `delegateAdministrator` on your account:

```typescript
const account = new Account(stack, "Account", {
  accountName: "StackSetsDelegatedAdministrator",
  email: "info@pepperize.com",
});
account.delegateAdministrator("stacksets.amazonaws.com");
```

- [AWS services that support Delegated Administrator](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services_list.html)
- To be able to use Delegated Administrator, your organization must have all [all features](https://github.com/pepperize/cdk-organizations/blob/main/API.md#@pepperize/cdk-organizations.FeatureSet) enabled.
- You must have enabled trusted access for Management Account in your organization.

See [DelegatedAdministrator](https://github.com/pepperize/cdk-organizations/blob/main/API.md#@pepperize/cdk-organizations.DelegatedAdministrator)

### Enable an AWS Service (trusted service)

To enable trusted access for a supported AWS service (trusted service), which performs tasks in your organization and its accounts on your behalf, call `enableAwsService` on your organization:

```typescript
const organization = new Organization(stack, "Organization", {
  featureSet: FeatureSet.ALL, // (default) the organization must be created with all features enabled
});
organization.enableAwsServiceAccess("ssm.amazonaws.com");
```

- To enable trusted access, you must have [all features](https://github.com/pepperize/cdk-organizations/blob/main/API.md#@pepperize/cdk-organizations.FeatureSet) enabled.
- It's recommended to use only the trusted service's console [How to enable or disable trusted access](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services.html#orgs_how-to-enable-disable-trusted-access)
- [AWS services that you can use with AWS Organizations](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services_list.html)

See [EnableAwsServiceAccess](https://github.com/pepperize/cdk-organizations/blob/main/API.md#@pepperize/cdk-organizations.EnableAwsServiceAccess)

### Enable a Policy Type

To enable a policy type call `enablePolicyType` on your organization.

```typescript
const organization = new Organization(stack, "Organization", {
  featureSet: FeatureSet.ALL, // (default) the organization must be created with all features enabled
});
organization.enablePolicyType(PolicyType.SERVICE_CONTROL_POLICY);
```

- To create or attach policies later on, you have to [enable all features](https://github.com/pepperize/cdk-organizations/blob/main/API.md#@pepperize/cdk-organizations.FeatureSet) and the [policy type](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies.html#orgs-policy-types) .

See [EnablePolicyType](https://github.com/pepperize/cdk-organizations/blob/main/API.md#enablepolicytype-), [PolicyType](https://github.com/pepperize/cdk-organizations/blob/main/API.md#policytype-).

### Policy

To create a new policy add the following construct to your stack:

```typescript
new Policy(stack, "Policy", {
  content: '{\\"Version\\":\\"2012-10-17\\",\\"Statement\\":{\\"Effect\\":\\"Allow\\",\\"Action\\":\\"s3:*\\"}}',
  description: "Enables admins of attached accounts to delegate all S3 permissions",
  policyName: "AllowAllS3Actions",
  policyType: PolicyType.SERVICE_CONTROL_POLICY,
});
```

- To create or attach policies, you must have [all features](https://github.com/pepperize/cdk-organizations/blob/main/API.md#@pepperize/cdk-organizations.FeatureSet) and the [policy type](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies.html#orgs-policy-types) enabled.
- The [SCP Syntax](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_syntax.html) is quite similar to IAM policies, but way more limited.

See [Policy](https://github.com/pepperize/cdk-organizations/blob/main/API.md#@pepperize/cdk-organizations.Policy)

### Tagging resources

To tag a resource you may follow the [AWS CDK Developer Guide - Tagging](https://docs.aws.amazon.com/cdk/v2/guide/tagging.html):

You can add one or more tags to the following resources in AWS Organizations.

- Account
- Organization root
- Organizational unit (OU)
- Policy

See [Tagging AWS Organizations resources](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_tagging.html), [ITaggableResource](https://github.com/pepperize/cdk-organizations/blob/main/API.md#@pepperize/cdk-organizations.ITaggableResource)

#### Tagging an organization's root

```typescript
import { Tags } from "aws-cdk-lib";

const organization = new Organization();
Tags.of(organization.root).add("key", "value");
```

#### Tagging an organizational unit (OU)

```typescript
import { Tags } from "aws-cdk-lib";

const organizationalUnit = new OrganizationalUnit();
Tags.of(organization.root).add("key", "value");
```

#### Tagging an account

```typescript
import { Tags } from "aws-cdk-lib";

const account = new Account();
Tags.of(organization.root).add("key", "value");
```

#### Tagging a policy

```typescript
import { Tags } from "aws-cdk-lib";

const policy = new Policy();
Tags.of(policy).add("key", "value");
```

## Limitations

AWS Organizations has some limitations:

- The stack can only be deployed in the `us-east-1` region.
- The stack's account must be the management account of an existing organization.
- The stack's account becomes the management account of the new organization.
- An account belongs to only one organization within a single root.
- [Quotas for AWS Organizations](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_reference_limits.html)

# Contributing

Contributions of all kinds are welcome :rocket: Check out our [contributor's guide](https://github.com/pepperize/cdk-organizations/blob/main/CONTRIBUTING.md).

For a quick start, check out a development environment:

```shell
git clone git@github.com:pepperize/cdk-organizations
cd cdk-organizations
 # install dependencies
yarn
# build with projen
yarn build
```

# Example

See [example](https://github.com/pepperize/cdk-organizations-example/blob/main/src/example-stack.ts)

```typescript
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
new EnableAwsServiceAccess(stack, "EnableAwsServiceAccess", {
  servicePrincipal: "service-abbreviation.amazonaws.com",
});

// Create an account
const account = new Account(stack, "SharedAccount", {
  accountName: "SharedAccount",
  email: "info+shared-account@pepperize.com",
  roleName: "OrganizationAccountAccessRole",
  iamUserAccessToBilling: IamUserAccessToBilling.ALLOW,
  parent: organization.root,
});
// Enable a delegated admin account
new DelegatedAdministrator(stack, "DelegatedAdministrator", {
  account: account,
  servicePrincipal: "service-abbreviation.amazonaws.com",
});

// Create an OU in the current organizations root
const projects = new OrganizationalUnit(stack, "ProjectsOU", {
  organizationalUnitName: "Projects",
  parent: organization.root,
});
new Account(stack, "Project1Account", {
  accountName: "SharedAccount",
  email: "info+project1@pepperize.com",
  parent: projects,
});

// Create a nested OU and attach two accounts
const project2 = new OrganizationalUnit(stack, "Project2OU", {
  organizationalUnitName: "Project2",
  parent: projects,
});
new Account(stack, "Project2DevAccount", {
  accountName: "Project 2 Dev",
  email: "info+project2-dev@pepperize.com",
  parent: project2,
});
new Account(stack, "Project2ProdAccount", {
  accountName: "Project 2 Prod",
  email: "info+project2-prod@pepperize.com",
  parent: project2,
});

// Enable the service control policy (SCP) type within the organization
new EnablePolicyType(stack, "EnablePolicyType", {
  root: organization.root,
  policyType: PolicyType.SERVICE_CONTROL_POLICY,
});
// Create and attach and Service Control Policy (SCP)
const policy = new Policy(stack, "Policy", {
  content: '{\\"Version\\":\\"2012-10-17\\",\\"Statement\\":{\\"Effect\\":\\"Allow\\",\\"Action\\":\\"s3:*\\"}}',
  description: "Enables admins of attached accounts to delegate all S3 permissions",
  policyName: "AllowAllS3Actions",
  policyType: PolicyType.SERVICE_CONTROL_POLICY,
});
new PolicyAttachment(stack, "PolicyAttachment", {
  target: organization.root,
  policy: policy,
});
```

# Alternatives

- [AWS Bootstrap Kit](https://github.com/awslabs/aws-bootstrap-kit)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest)
- [AWS Deployment Framework (ADF)](https://github.com/awslabs/aws-deployment-framework)
- [AWS Organization Formation](https://github.com/org-formation)
- [AWS Control Tower Account Factory for Terraform (ATF)](https://github.com/aws-ia/terraform-aws-control_tower_account_factory)
