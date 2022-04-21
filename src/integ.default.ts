import { App, Stack, Tags } from "aws-cdk-lib";
import { Account, IamUserAccessToBilling } from "./account";
import { FeatureSet, Organization } from "./organization";
import { OrganizationalUnit } from "./organizational-unit";
import { Policy, PolicyType } from "./policy";

const app = new App();
const stack = new Stack(app);

// Create an organization
const organization = new Organization(stack, "Organization", {
  featureSet: FeatureSet.ALL, // It's recommended to enable all features. It's required for service control policies (SCP)
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

// Enable the service control policy (SCP) type within the organization
organization.enablePolicyType(PolicyType.SERVICE_CONTROL_POLICY);
// Create and attach Service Control Policy (SCP)
const s3Policy = new Policy(stack, "S3Policy", {
  content: '{\n"Version":"2012-10-17","Statement":{\n"Effect":"Allow","Action":"s3:*"\n}\n}',
  description: "Enables admins of attached accounts to delegate all S3 permissions",
  policyName: "AllowAllS3Actions",
  policyType: PolicyType.SERVICE_CONTROL_POLICY,
});
organization.attachPolicy(s3Policy);

// Enable the tag policy type within the organization
organization.enablePolicyType(PolicyType.TAG_POLICY);
// Create and attach tag Policy
const tagPolicy = new Policy(stack, "TagPolicy", {
  content: '{\n"tags":{\n"CostCenter":{\n"tag_key":{\n"@@assign":"CostCenter"\n}\n}\n}\n}',
  description: "Defines the CostCenter tag key",
  policyName: "CostCenterTag",
  policyType: PolicyType.TAG_POLICY,
});
// Attach policy to an organizational unit (OU)
projects.attachPolicy(tagPolicy);
// Attach policies to an account
account.attachPolicy(tagPolicy);
account.attachPolicy(s3Policy);

// Tagging AWS organization resources of this stack
Tags.of(stack).add("tagKey", "tagValue");

export { app, stack };
