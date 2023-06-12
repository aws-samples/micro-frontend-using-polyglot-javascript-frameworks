import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {CodeBuildStep, CodePipeline, CodePipelineSource} from "aws-cdk-lib/pipelines";
import * as codecommit from 'aws-cdk-lib/aws-codecommit';
import * as iam from 'aws-cdk-lib/aws-iam'
import * as lambda from 'aws-cdk-lib/aws-lambda';

interface LambdaCICDStackProps extends StackProps {
  stackName?: string,
  repository?: codecommit.IRepository;
  lambdaFunction?: lambda.Function;
}

// Stack to setup CI/CD for Lambda function
export class LambdaCICDStack extends Stack {
  constructor(scope: Construct, id: string, props?: LambdaCICDStackProps) {
    super(scope, id, props);

    // Custom Policy for the CodeBuild
    const codeBuildPolicy = new iam.PolicyStatement()
    
    // Adding permissions to policy 
    codeBuildPolicy.addActions( "lambda:UpdateFunctionCode", "lambda:ListFunctions", "lambda:GetFunction")
    
    // Adding permissions to allow all the resources
    codeBuildPolicy.addResources(`${props?.lambdaFunction?.functionArn}`);

    // CI/CD Pipleline
    new CodePipeline(this, `${props?.stackName}-pipeline`, {
      pipelineName: `${props?.stackName}-pipeline`,
      selfMutation: false,
      synth: new CodeBuildStep('Deployment', {
            input: CodePipelineSource.codeCommit(props?.repository!, 'main'),
            installCommands: ['npm i'],
            commands: ['npm run build',
                  'zip -r -j function.zip dist/*',
                  `aws lambda update-function-code --function-name ${props?.lambdaFunction?.functionName} --zip-file fileb://function.zip`
              ],
            primaryOutputDirectory: '.',
            rolePolicyStatements: [codeBuildPolicy],
          }
        )
    });
  }
}