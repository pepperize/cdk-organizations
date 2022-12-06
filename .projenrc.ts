import { AwsCdkConstructLibrary } from "@pepperize/projen-awscdk-construct";
import { javascript } from "projen";
const project = new AwsCdkConstructLibrary({
  author: "Patrick Florek",
  authorAddress: "patrick.florek@gmail.com",
  license: "MIT",
  copyrightOwner: "Pepperize UG (haftungsbeschränkt)",
  cdkVersion: "2.51.1",
  name: "@pepperize/cdk-organizations",
  description: "Manage AWS organizations, organizational units (OU), accounts and service control policies (SCP).",
  keywords: [
    "aws",
    "cdk",
    "organizations",
    "organization-principal",
    "organizational-unit",
    "account",
    "account-management",
    "policies",
    "service-control-policy",
    "delegated-administrator",
    "trusted-service",
    "trusted-access",
    "tag-resources",
  ],
  repositoryUrl: "https://github.com/pepperize/cdk-organizations.git",

  projenrcTs: true,

  deps: ["pascal-case"],
  bundledDeps: ["pascal-case"],
  devDeps: [
    "@pepperize/projen-awscdk-construct",
    "@types/aws-lambda",
    "@types/jest",
    "@types/sinon",
    "aws-lambda",
    "aws-sdk",
    "aws-sdk-mock",
    "sinon",
  ],

  versionrcOptions: {
    types: [{ type: "chore", section: "Chore", hidden: false }],
  },

  defaultReleaseBranch: "main",
  releaseToNpm: true,
  npmAccess: javascript.NpmAccess.PUBLIC,
  publishToNuget: {
    dotNetNamespace: "Pepperize.CDK",
    packageId: "Pepperize.CDK.Organizations",
  },
  publishToPypi: {
    distName: "pepperize.cdk-organizations",
    module: "pepperize_cdk_organizations",
  },
  publishToMaven: {
    mavenEndpoint: "https://s01.oss.sonatype.org",
    mavenGroupId: "com.pepperize",
    mavenArtifactId: "cdk-organizations",
    javaPackage: "com.pepperize.cdk.organizations",
  },

  gitpod: true,
});

project.gitpod?.addCustomTask({
  name: "setup",
  init: "yarn install && npx projen build",
  command: "npx projen watch",
});

project.gitpod?.addVscodeExtensions("dbaeumer.vscode-eslint");

project.synth();
