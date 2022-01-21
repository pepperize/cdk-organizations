import { App, Stack } from "aws-cdk-lib";
import { Account, IamUserAccessToBilling } from "../account";
import { DelegatedAdministrator } from "../delegated-administrator";
import { EnableAwsServiceAccess } from "../enable-aws-service-access";
import { EnablePolicyType } from "../enable-policy-type";
import { FeatureSet, Organization } from "../organization";
import { OrganizationalUnit } from "../organizational-unit";
import { Policy, PolicyType } from "../policy";
import { PolicyAttachment } from "../policy-attachment";

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

// Import an existing account
const account = Account.fromAccountId(stack, "ImportedAccount", {
  accountId: "123456789012",
  parent: organization.root,
});
// Enable a delegated admin account
new DelegatedAdministrator(stack, "DelegatedAdministrator", {
  account: account,
  servicePrincipal: "service-abbreviation.amazonaws.com",
});

const projects = OrganizationalUnit.fromOrganizationalUnitId(stack, "ProjectsOU", {
  organizationalUnitId: "ou-1234",
  parent: organization.root,
});
new Account(stack, "Project1Account", {
  accountName: "SharedAccount",
  email: "info+project1@pepperize.com",
  iamUserAccessToBilling: IamUserAccessToBilling.DENY,
  parent: projects,
});

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
