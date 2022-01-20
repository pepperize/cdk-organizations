const { AwsCdkConstructLibrary } = require("@pepperize/projen-awscdk-construct");
const { awscdk, javascript } = require("projen");
const project = new AwsCdkConstructLibrary({
  author: "Patrick Florek",
  authorAddress: "patrick.florek@gmail.com",
  license: "MIT",
  copyrightOwner: "Pepperize UG (haftungsbeschränkt)",
  cdkVersion: "2.8.0",
  name: "@pepperize/cdk-organizations",
  description: "This project provides a CDK construct creating AWS organizations.",
  keywords: ["AWS", "CDK", "Organizations"],
  repositoryUrl: "https://github.com/pepperize/cdk-organizations.git",

  bundledDeps: ["aws-lambda", "aws-sdk"],
  deps: ["aws-lambda", "aws-sdk"],
  devDeps: [
    "@pepperize/projen-awscdk-construct@^0.0.8",
    "@types/aws-lambda",
    "cdk-nag@^2.0.0",
    "aws-sdk-mock",
    "sinon",
    "@types/sinon",
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
});

project.synth();
