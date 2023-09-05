# Backend for the Micro-Frontend Application

The Backend Application contains API code for the Micro-Frontend Application along the infrastructure as a code for creating AWS resources. 

API Code is written in NodeJS and deployed on AWS Lambda. APIs are responsible for creating and updating records on the DynamoDB Table. 

Infrastructure automation is performed using AWS CDK written in Typescript. CDK contains the code for AWS resources (AWS CodeCommit Repository for Backend app and Micro-Frontends, AWS CodeBuild, AWS CodePipeline, AWS DynamoDB).

## Essential Components 

### 1: API Definition

| API | HTTP Verb | Purpose |
|------------------------|----------------------|--------------------------------------|
| /charts/:id | GET | Leveraged to get chart data for a user |
| /charts | POST | Leveraged to update/create chart data for a user |

### 2: DynamoDB Table Definition

| Key | Data Type | 
|----------|-------------------------|
| userId | Sting(PK) |
| cameras | Number |
| chairs | Number |
| jeans | Number |
| mobilePhones | Number |
| shirts | Number |
| shoes | Number |
| tables | Number |
| wardrobes | Number |

### 3: CDK code for AWS Resources

| Resources | Purpose | 
|----------|-------------------------|
| AWS CodeCommit | Code Repository for Backend App and Micro-Frontend Apps |
| AWS Build | Leveraged for Building and Deploying code on AWS Lambda function |
| AWS CodePipeline | Leveraged to automate release pipeline |
| AWS Lambda Function | Leveraged to deploy backend code | 
| AWS API Gateway | Front door and trigger for Lambda Function |

## Deployment on AWS

![Backend Architecture](/additional-assets/microfrontend-backend.svg)

### Deployment of the above architecture on AWS
 
#### Step 1: Clone Repository

```console
git clone https://github.com/aws-samples/micro-frontend-using-polyglot-javascript-frameworks.git
cd micro-frontend-using-polyglot-javascript-frameworks/backend
```

#### Step 2: Install Dependencies 

```console
npm install
```

#### Step 3: Complie Lambda function code (TypeScript to Javascript) 

```console
npm run build:lambda
```

#### Step 4: Bootstrap Environment

If this is the first time you will be deploying the CDK stack on, you need to bootstrap the environment. Bootstrapping creates resources that may be needed to deploy your stack like an Amazon S3 bucket for storing files and IAM roles that grant permissions needed to perform deployments.

```console
cdk bootstrap
```

#### Step 5: Deploy infrastructure on AWS 

```console
npm run deploy
```

#### Step 6: Getting the Backend API URI 

Once the CDK deployment is successful, go to the *cdk-outputs.json* file present in the backend app, and copy the value of "APIGatewayURL". We would need API URL for the frontend apps. 

![CDK Output](/additional-assets/cdk-output.png)

After completing the Backend App deployment, we can proceed with the Frontend Applications deployment.

[Let's deploy our first Micro-Frontend app, Angular Charts App.](../angular-charts-app/README.md)

[Go Back.](../README.md)