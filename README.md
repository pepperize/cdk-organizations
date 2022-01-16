[![GitHub](https://img.shields.io/github/license/pepperize/cdk-organizations?style=flat-square)](https://github.com/pepperize/cdk-organizations/blob/main/LICENSE)
[![npm (scoped)](https://img.shields.io/npm/v/@pepperize/cdk-organizations?style=flat-square)](https://www.npmjs.com/package/@pepperize/cdk-organizations)
[![PyPI](https://img.shields.io/pypi/v/pepperize.cdk-organizations?style=flat-square)](https://pypi.org/project/pepperize.cdk-organizations/)
[![Nuget](https://img.shields.io/nuget/v/Pepperize.CDK.Organizations?style=flat-square)](https://www.nuget.org/packages/Pepperize.CDK.Organizations/)
[![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/pepperize/cdk-organizations/release/main?label=release&style=flat-square)](https://github.com/pepperize/cdk-organizations/actions/workflows/release.yml)
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/pepperize/cdk-organizations?sort=semver&style=flat-square)](https://github.com/pepperize/cdk-organizations/releases)

# AWS Organizations

This project provides a CDK construct creating AWS organizations.

> Currently, there is no `@aws-cdk/aws-organizations` available. See this [Issue on AWS CDK](https://github.com/aws/aws-cdk/issues/2877).

- [AWS Account Management Reference Guide](https://docs.aws.amazon.com/accounts/latest/reference/accounts-welcome.html)
- [AWS Organizations User Guide](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html)
- [AWS API Reference](https://docs.aws.amazon.com/organizations/latest/APIReference/Welcome.html)
- [AWS CDK Custom Resources](https://docs.aws.amazon.com/cdk/api/v1/docs/custom-resources-readme.html#custom-resources-for-aws-apis)

## API Reference

See [API.md](https://github.com/pepperize/cdk-organizations/blob/main/API.md)

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

## Restrictions

- The stack can only be deployed in the `us-east-1` region.
- The stack's account must be the management account of an existing organization.
- The stack's account becomes the management account of the new organization.
- An account belongs only to one organization with a single root.

## Organization

To create a new organization or import an existing organization, add the following construct to your stack:

```typescript
const organization = new Organization(stack, "Organization", {
  featureSet: FeatureSet.ALL,
});
```

- The account which deploys the stack automatically becomes the management account of the new organization.
- If an organization already exists, it will be automatically imported. The account which deploys the stacks must be the management account.
- If the construct gets removed from the stack the organization still remains and must be manually deleted.
- For deletion of an organization you must previously remove all the member accounts, OUs, and policies from the organization.
- Currently, you can have only one root. AWS Organizations automatically creates it for you when you create the new organization.
- It can only be used from within the management account in the us-east-1 region.

## Organizational Unit (OU)

To create a new organizational unit (OU), add the following construct to your stack:

```typescript
const organizationUnit = new OrganizationalUnit(stack, "Organization", {
  organizationalUnitName: "Project2",
  parent: organisation.root,
});
```

To import an existing organizational unit (OU), add the following to your stack:

```typescript
const organizationUnit = OrganizationalUnit.fromOrganizationalUnitId(stack, "Organization", {
  organizationalUnitId: "ou-1234",
  organizationalUnitName: "Project2",
  parent: organisation.root,
});
```

- The parent of an organizational unit (OU) can be either the organization's root or another OU within the organization.
- An organizational unit (OU) can't be moved. You have to create a new one and move all the accounts.
- For deletion of an organizational unit (OU) you must first move all accounts out of the OU and any child OUs, and then you can delete the child OUs.
- It can only be used from within the management account in the us-east-1 region.

# Account

To create a new account, add the following construct to your stack:

```typescript
new Account(stack, "Account", {
  accountName: "MyAccount",
  email: "info@pepperize.com",
  iamUserAccessToBilling: IamUserAccessToBilling.ALLOW,
  parent: organization.root,
});
```

To import an existing organizational unit (OU), add the following to your stack:

```typescript
Account.fromAccountId(stack, "ImportedAccount", {
  accountId: "123456789012",
  parent: organization.root,
});
```

- The email address must not already be associated with another AWS account. You may suffix the email address, i.e. `info+account-123456789012@pepperize.com`.
- An account will be created and then moved to the parent, if the parent is an organizational unit (OU).
- It can only be used from within the management account in the us-east-1 region.
- An account can't be deleted easily, if the construct gets removed from the stack the account still remains. [Closing an AWS account](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_close.html)

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

See [example.ts](./src/example/example.ts)

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
