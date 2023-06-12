import { Stack, StackProps, RemovalPolicy, CfnOutput, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import { join } from 'path'

interface LambdaDynamoDBApiProps extends StackProps {
  stackName?: string,
  dynamoDBTable?: string
}

// Stack to setup CI/CD for Lambda function
export class LambdaDynamoDBApiStack extends Stack {
  public readonly lambdaFunction: lambda.Function;
  public readonly restAPI: apigw.LambdaRestApi;
  constructor(scope: Construct, id: string, props?: LambdaDynamoDBApiProps) {
    super(scope, id, props);

    // AWS DynamoDB Table
    const dynamoTable = new Table(this, `${props?.dynamoDBTable}`, {
      partitionKey: {
        name: 'userId',
        type: AttributeType.STRING
      },
      tableName: props?.dynamoDBTable,
      removalPolicy: RemovalPolicy.DESTROY, // NOT recommended for production code, default removal policy is RETAIN
    });

    // AWS Lambda Function to do operations on Charts Data 
    this.lambdaFunction = new lambda.Function(this, `${this.stackName}-lambda`, {
      runtime: lambda.Runtime.NODEJS_16_X,                 // execution environment
      code: lambda.Code.fromAsset(join(__dirname, '../lambda-compiled-code')),  // code loaded from "lambda" directory
      handler: 'index.handler',                                                             // file is "index", function is "handler"
      environment: {                                                        // Envirnment Variables
        TABLE_NAME: `${props?.dynamoDBTable}`
      },
      memorySize: 512,
      timeout: Duration.seconds(300)
    })

    // Rest API to expose Lambda Function
    this.restAPI = new RestApi(this, `${this.stackName}-Endpoint`, {
      restApiName: `${this.stackName}-api`,
      defaultCorsPreflightOptions: { // 👇 set up CORS
        allowMethods: ['OPTIONS', 'GET', 'POST'],
        allowOrigins: ['*'],  // Just used as sample, should be replaced with frontend apps origins
      },
    });
  
    // REST Proxy resource on API Gateway 
    const charts = this.restAPI.root.addResource('{proxy+}');

    // Method to forward all the request to Lambda function
    charts.addMethod('ANY',  new LambdaIntegration(this.lambdaFunction));

    // Granting rights to Lambda function to perform read and write operations on DynamoDB
    dynamoTable.grantReadWriteData(this.lambdaFunction);

     // Exports GraphQL API URL Endpoint
    new CfnOutput(this, 'APIGatewayURL', {
      value: `https://${this.restAPI.restApiId}.execute-api.${this.region}.amazonaws.com/${this.restAPI.deploymentStage.stageName}`,
      description: 'API Gateway URL',
      exportName: 'apiGatewayURL',
    });
  }
}