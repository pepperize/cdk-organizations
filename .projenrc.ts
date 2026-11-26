import { AwsCdkConstructLibrary } from "@pepperize/projen-awscdk-construct";
import { awscdk, javascript } from "projen";
const project = new AwsCdkConstructLibrary({
  author: "Patrick Florek",
  authorAddress: "patrick.florek@gmail.com",
  license: "MIT",
  copyrightOwner: "Pepperize UG (haftungsbeschränkt)",
  cdkVersion: "2.278.0",
  jsiiVersion: "~6.0.0",
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
  minNodeVersion: "22.13.0",
  workflowNodeVersion: "24.x",
  jestOptions: {
    jestVersion: "^30",
  },
  packageManager: javascript.NodePackageManager.YARN_CLASSIC,

  deps: ["pascal-case@^3"],
  bundledDeps: ["pascal-case@^3"],
  devDeps: [
    "@pepperize/projen-awscdk-construct@~0.1.1",
    "@types/node@^22",
    "typescript@~6.0",
    "@types/aws-lambda",
    "@types/jest",
    "@types/sinon",
    "aws-lambda",
    "aws-sdk",
    "aws-sdk-mock",
    "cdk-nag@^2",
    "jest-cdk-snapshot",
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
    mavenGroupId: "com.pepperize",
    mavenArtifactId: "cdk-organizations",
    javaPackage: "com.pepperize.cdk.organizations",
  },

  gitpod: true,

  lambdaOptions: {
    runtime: awscdk.LambdaRuntime.NODEJS_26_X,
    bundlingOptions: {
      externals: [],
    },
  },
});

project.gitpod?.addCustomTask({
  name: "setup",
  init: "yarn install && npx projen build",
  command: "npx projen watch",
});

project.gitpod?.addVscodeExtensions("dbaeumer.vscode-eslint");

// handler tests use dynamic import(); jest needs vm modules for that
project.testTask.env("NODE_OPTIONS", "--experimental-vm-modules");

project.synth();
