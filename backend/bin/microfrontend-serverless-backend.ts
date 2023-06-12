import * as cdk from 'aws-cdk-lib';
import { LambdaDynamoDBApiStack } from '../src/lambda-dynamdb-api-stack';
import { CodeRepositoryStack } from '../src/code-commit-repository';
import { LambdaCICDStack } from '../src/lambda-ci-cd';

const app = new cdk.App();

// Backend Services for the Microfrontend App
// Services - AWS Lambda, Amazon API Gateway and Amazon Dynamodb
const lambdaFunction = new LambdaDynamoDBApiStack(app, 'Microfrontend-Backend', {
    stackName: 'Microfrontend-Backend',
    dynamoDBTable: 'microfrontend-charts'
});

// // Code Repository for the Microfrontend - React Container App
new CodeRepositoryStack(app, 'Microfrontend-Container-App-CodeRepository', {
    stackName: 'microfrontend-react-container-app',
    repositoryName: 'microfrontend-react-container-app',
    sourceCodePath: '../react-container-app/'
})

// Code Repository for the Microfrontend - React Charts Data App
new CodeRepositoryStack(app, 'Microfrontend-React-Charts-Data-App-CodeRepository', {
    stackName: 'microfrontend-react-charts-data-app',
    repositoryName: 'microfrontend-react-charts-data-app',
    sourceCodePath: '../react-charts-data-app/'
})

// Code Repository for the Microfrontend - Microfrontend Angular Charts App
new CodeRepositoryStack(app, 'Microfrontend-Angular-Charts-App-CodeRepository', {
    stackName: 'microfrontend-angular-charts-app',
    repositoryName: 'microfrontend-angular-charts-app',
    sourceCodePath: '../angular-charts-app/'
})

// Code Repository for the Backend Lambda function
const lambdaFunctionRepository = new CodeRepositoryStack(app, 'Microfrontend-Backend-Lambda-Function-CodeRepository', {
    stackName: 'microfrontend-backend-lambda-function',
    repositoryName: 'microfrontend-backend-lambda-function',
    sourceCodePath: './lambda/'
})

// Setting up the CI/CD for the Backend Lambda function using AWS Code Suite
new LambdaCICDStack(app, 'Microfrontend-Backend-Lambda-CICD', {
    stackName: 'microfrontend-backend-lambda-cicd',
    repository: lambdaFunctionRepository.repository,
    lambdaFunction: lambdaFunction.lambdaFunction,
})

app.synth();