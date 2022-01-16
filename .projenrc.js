const { awscdk, javascript } = require("projen");
const project = new awscdk.AwsCdkConstructLibrary({
  author: "Patrick Florek",
  authorAddress: "patrick.florek@gmail.com",
  authorOrganization: true,
  license: "MIT",
  copyrightOwner: "Pepperize UG (haftungsbeschränkt)",
  cdkVersion: "2.8.0",
  defaultReleaseBranch: "main",
  name: "@pepperize/cdk-organizations",
  description: "This project provides a CDK construct creating AWS organizations.",
  keywords: ["AWS", "CDK", "Organizations"],
  repositoryUrl: "https://github.com/pepperize/cdk-organizations.git",

  bundledDeps: ["aws-lambda", "aws-sdk"],
  deps: ["aws-lambda", "aws-sdk"],
  devDeps: ["@types/aws-lambda", "cdk-nag@^2.0.0"],

  lambdaOptions: {
    runtime: awscdk.LambdaRuntime.NODEJS_14_X,
    bundlingOptions: {
      sourcemap: true,
    },
  },

  autoApproveUpgrades: true,
  autoApproveOptions: { allowedUsernames: ["pflorek"], secret: "GITHUB_TOKEN" },
  depsUpgradeOptions: {
    workflowOptions: {
      secret: "PROJEN_GITHUB_TOKEN",
    },
  },

  dependabot: true,

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

  eslint: true,
  prettier: true,
  prettierOptions: {
    settings: {
      printWidth: 120,
    },
  },

  gitignore: [".idea"],
});

project.setScript("format", "prettier --write 'src/**/*.ts' test/**/*.ts '.projenrc.js' 'README.md' CONTRIBUTING.md");

project.synth();
