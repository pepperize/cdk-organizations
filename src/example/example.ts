import { App, Stack } from "@aws-cdk/core";
import { Account, IamUserAccessToBilling } from "../account";
import { FeatureSet, Organization } from "../organization";
import { OrganizationalUnit } from "../organizational-unit";
import { Policy, PolicyType } from "../policy";
import { PolicyAttachment } from "../policy-attachment";

const app = new App();
const stack = new Stack(app);

const organization = new Organization(stack, "Organization", {
  featureSet: FeatureSet.ALL,
});
new Account(stack, "SharedAccount", {
  accountName: "SharedAccount",
  email: "info+shared-account@pepperize.com",
  roleName: "OrganizationAccountAccessRole",
  iamUserAccessToBilling: IamUserAccessToBilling.ALLOW,
  parent: organization.root,
});

const projects = new OrganizationalUnit(stack, "ProjectsOU", {
  organizationalUnitName: "Projects",
  parent: organization.root,
});
new Account(stack, "Project1Account", {
  accountName: "SharedAccount",
  email: "info+project1@pepperize.com",
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
