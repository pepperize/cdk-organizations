// ~~ Generated by projen. To modify, edit .projenrc.js and run "npx projen".
import * as path from 'path';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

/**
 * Props for OnEventHandlerFunction
 */
export interface OnEventHandlerFunctionProps extends lambda.FunctionOptions {
}

/**
 * An AWS Lambda function which executes src/tag-resource-provider/on-event-handler.
 */
export class OnEventHandlerFunction extends lambda.Function {
  constructor(scope: Construct, id: string, props?: OnEventHandlerFunctionProps) {
    super(scope, id, {
      description: 'src/tag-resource-provider/on-event-handler.lambda.ts',
      ...props,
      runtime: new lambda.Runtime('nodejs18.x', lambda.RuntimeFamily.NODEJS),
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../assets/tag-resource-provider/on-event-handler.lambda')),
    });
    this.addEnvironment('AWS_NODEJS_CONNECTION_REUSE_ENABLED', '1', { removeInEdge: true });
  }
}