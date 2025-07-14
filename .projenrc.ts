import { AwsCdkConstructLibrary } from "@pepperize/projen-awscdk-construct";
import { awscdk, javascript } from "projen";
const project = new AwsCdkConstructLibrary({
  author: "Patrick Florek",
  authorAddress: "patrick.florek@gmail.com",
  license: "MIT",
  copyrightOwner: "Pepperize UG (haftungsbeschränkt)",
  cdkVersion: "2.204.0",
  name: "@rocketleap/cdk-organizations",
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
  repositoryUrl: "https://github.com/rocketleap/cdk-organizations.git",

  projenrcTs: true,
  packageManager: javascript.NodePackageManager.YARN_BERRY,
  yarnBerryOptions: {
    yarnRcOptions: {
      compressionLevel: "mixed",
      enableGlobalCache: true,
      nodeLinker: javascript.YarnNodeLinker.NODE_MODULES,
      npmRegistries: {
        "https://npm.pkg.github.com/": {
          npmAuthToken: "${GITHUB_TOKEN}",
        },
      },
      npmScopes: {
        rocketleap: {
          npmRegistryServer: "https://npm.pkg.github.com/",
          npmAlwaysAuth: true,
        },
      },
    },
  },

  deps: ["pascal-case"],
  bundledDeps: ["pascal-case"],
  devDeps: [
    "@pepperize/projen-awscdk-construct@~0.0.730",
    "@types/aws-lambda",
    "@types/jest",
    "@types/sinon",
    "aws-lambda",
    "aws-sdk",
    "aws-sdk-mock",
    "cdk-nag",
    "jest-cdk-snapshot",
    "sinon",
  ],

  versionrcOptions: {
    types: [{ type: "chore", section: "Chore", hidden: false }],
  },

  defaultReleaseBranch: "main",
  releaseToNpm: true,
  npmAccess: javascript.NpmAccess.PUBLIC,
  // publishToNuget: {
  //   dotNetNamespace: "Rocketleap.CDK",
  //   packageId: "Rocketleap.CDK.Organizations",
  // },
  // publishToPypi: {
  //   distName: "Rocketleap.cdk-organizations",
  //   module: "rocketleap_cdk_organizations",
  // },
  // publishToMaven: {
  //   mavenEndpoint: "https://s01.oss.sonatype.org",
  //   mavenGroupId: "com.rocketleap",
  //   mavenArtifactId: "cdk-organizations",
  //   javaPackage: "com.rocketleap.cdk.organizations",
  // },

  gitpod: true,

  lambdaOptions: {
    runtime: awscdk.LambdaRuntime.NODEJS_18_X,
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

project.synth();
