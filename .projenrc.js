const { AwsCdkConstructLibrary } = require("@pepperize/projen-awscdk-construct");
const { awscdk, cdk, javascript } = require("projen");
const project = new AwsCdkConstructLibrary({
  stability: cdk.Stability.EXPERIMENTAL,

  author: "Patrick Florek",
  authorAddress: "patrick.florek@gmail.com",
  license: "MIT",
  copyrightOwner: "Pepperize UG (haftungsbeschränkt)",
  cdkVersion: "2.8.0",
  name: "@pepperize/cdk-organizations",
  description: "This project provides a CDK construct managing AWS organizations, organizational units and accounts.",
  keywords: ["aws", "cdk", "organizations", "account", "account-management"],
  repositoryUrl: "https://github.com/pepperize/cdk-organizations.git",

  devDeps: [
    "@pepperize/projen-awscdk-construct@^0.0.8",
    "@types/aws-lambda",
    "@types/jest",
    "@types/sinon",
    "aws-lambda",
    "aws-sdk",
    "aws-sdk-mock",
    "cdk-nag@^2.0.0",
    "pascal-case",
    "sinon",
  ],

  lambdaOptions: {
    runtime: awscdk.LambdaRuntime.NODEJS_14_X,
    bundlingOptions: {
      sourcemap: true,
    },
  },

  autoApproveUpgrades: true,
  autoApproveOptions: { allowedUsernames: ["pflorek", "dependabot[bot]"], secret: "GITHUB_TOKEN" },
  depsUpgradeOptions: {
    workflowOptions: {
      secret: "PROJEN_GITHUB_TOKEN",
    },
  },

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

  gitpod: true,
});

project.gitpod.addCustomTask({
  name: "setup",
  init: "yarn install && npx projen build",
  command: "npx projen watch",
});

project.gitpod.addVscodeExtensions("dbaeumer.vscode-eslint");

project.synth();
