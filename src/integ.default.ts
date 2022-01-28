import { App, Stack } from "aws-cdk-lib";
import { Account, IamUserAccessToBilling } from "./account";
import { EnablePolicyType } from "./enable-policy-type";
import { FeatureSet, Organization } from "./organization";
import { OrganizationalUnit } from "./organizational-unit";
import { Policy, PolicyType } from "./policy";
import { PolicyAttachment } from "./policy-attachment";

const app = new App();
const stack = new Stack(app);

// Create an organization
const organization = new Organization(stack, "Organization", {
  featureSet: FeatureSet.ALL,
});
// Enable AWS Service Access (requires FeatureSet: ALL)
organization.enableAwsServiceAccess("service-abbreviation.amazonaws.com");
organization.enableAwsServiceAccess("ssm.amazonaws.com");
organization.enableAwsServiceAccess("config-multiaccountsetup.amazonaws.com");

// Import an existing account
const account = new Account(stack, "ImportedAccount", {
  accountName: "test",
  email: "info+integ-test@pepperize.com",
  parent: organization.root,
});
// Enable a delegated admin account
account.delegateAdministrator("service-abbreviation.amazonaws.com");
account.delegateAdministrator("stacksets.cloudformation.amazonaws.com");
account.delegateAdministrator("config.amazonaws.com");

const projects = new OrganizationalUnit(stack, "ProjectsOU", {
  organizationalUnitName: "Projects",
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

export { app, stack };
