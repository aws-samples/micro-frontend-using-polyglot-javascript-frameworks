# Client-Side Rendering of Micro-Frontend on AWS using Polyglot JavaScript Frameworks
<dl><dd>

In modern application development, the demand of creating a feature-rich modern web application needs the frontend application to be divided into small reusable components and developed parallelly to reduce time to market.

Micro-Frontend enables us to use reusable components created using polyglot frameworks. This enabled us to create reusable components, managed by different teams in parallel, reducing time to market with a comparatively smaller codebase.  

Micro-Frontend helped us to achieve the following: 

- Reduce the time to market cost.
- Easier maintenance.
- Better fault tolerance.
- Increased Agility and Scalability.
- Independently Deployment. 

![Deployment](/additional-assets/microfrontend-deployment.svg)

</dd></dl>

## Table of Contents

<dl><dd>

#### 1. [Why Micro-Frontend](#1-why-micro-frontend-1)
#### 2. [Objective of the sample application](#2-objective-of-the-sample-application-1)
#### 3. [Micro-Frontend Key Concepts](#3-micro-frontend-key-concepts-1)
#### 4. [Sample Overview](#4-sample-overview-1)
#### 5. [Architecture Diagram](#5-architecture-diagram-1)
#### 6. [Requirements](#6-requirements-1)
#### 7. [Deployment of the Sample Application on AWS](#7-deployment-of-the-sample-application-on-aws-1)
#### 8. [Cleanup](#8-cleanup-1)
#### 9. [References](#9-references-1)
#### 10. [Security](#10-security-1)
#### 11. [License](#10-license-1)

</dd></dl>

## 1: Why Micro-Frontend <a name="WhyMicroFrontend"></a>
<dl><dd>

### a) Single Responsibility
Each Module/component could be built by an individual team. The individual would be responsible for all the development, testing, release and observability of the Module/component.

### b) Technology Agnostic
Modules/Components could be created in any preferred technology giving a chance to the development team to experiment and build the module optimally.

### c) Reduce Time to Market
Since the Modules/Components could be built by individual teams, multiple teams could focus and develop their isolated new features/changes and release them quickly.

### d) Maintainability
Micro-Frontend helps you to follow the divide and conquer approach. This ensures easily deployable, testable smaller features and the overall time for testing is reduced.

### e) Scalable development
Micro-Frontend teams are smaller and can work individually without disrupting other teams. We can have a new/additional team setup that could deliver additional/new components quickly without even knowing the complexity of the complete application.

</dd></dl>

## 2: Objective of the sample application <a name="Objective"></a>

<dl><dd>

Micro-Frontend Charts Application provides a sample way to implement Micro-Frontend using polyglot JavaScript Framework (React and Angular). The sample covers the deployment of the Micro-Frontend on AWS, including the sample backend Application. 

### Key Highlights of the sample Micro-Frontend App

- Micro-Frontend sample implementation with React and Angular frameworks
- Webpack5 and ModuleFederation for the Micro-Frontend
- AWS Amplify for Frontend application deployment along with CI/CD
- Amazon Cognito for the User Authentication using Amplify CLI.
- AWS CodeSuite for Backend Deployment
- Infrastructure automation using Cloud Development Kit (CDK)   

</dd></dl>

## 3: Micro-Frontend Key Concepts <a name="KeyConcepts"></a>

<dl><dd>

### a) <ins>Module Federation</ins>

We have leveraged Webpack 5 and the Module Federation plugin to implement our Micro-Frontend Sample.

Module Federation is a native plug-in for Webpack 5, that allows sharing chunks of JavaScript code between frontend applications at Run-Time. This helped the development to work in isolation on separate builds or application components. Multiple separate builds are loaded at runtime to form a single application. These separate builds act like containers and can expose and consume code between builds, creating a single, unified application.

![ModuleFederation](/additional-assets/webpack-modulefederation.png)

### b) <ins>Steps for importing React App in React Container</ins>
<dl><dd>

#### i: <ins> Expose the React APP Component</ins>

Expose the component from the <i>/react-charts-data-app/webpack.config.js</i> file

![react-charts-data-app-exposing-component](/additional-assets/react-charts-data-app-exposing-component.png)

#### ii: <ins> Add React App Microservice as a remote app in the React Container </ins>

React App Microservice remote in the <i>/react-container-app/webpack.config.js</i> file

![react-container-app-importing-react-component](/additional-assets/react-container-app-importing-react-component.png)

#### iii: <ins> Use the imported component in the React Container </ins>

Use the imported component within the container application in the <i>react-container-app/src/components/container/index.tsx</i> file

![react-charts-in-react-container](/additional-assets/react-charts-in-react-container.png)

</dd></dl>

### c) <ins>Steps for importing Angular App in React Container </ins>
<dl><dd>

#### i: <ins> Bootstrap the Angular App  </ins>

![bootstraping-angular-app](/additional-assets/bootstraping-angular-app.png)

#### ii: <ins> Expose the Angular APP Component </ins>

Expose the component from the <i>/angular-charts-app/webpack.config.js</i> file

![angular-app-exposing-component.png](/additional-assets/angular-app-exposing-component.png)

#### iii: <ins> Add Angular App Microservice as a remote app in the React Container </ins>

Angular App Microservice remote in the <i>/react-container-app/webpack.config.js</i> file

![react-container-app-importing-angular-component.png](/additional-assets/react-container-app-importing-angular-component.png)

#### iv: <ins> Mount Angular App Microservice in the React Container </ins>

Mount Angular App on <i>/react-container-app/src/utils/external-angular-app.jsx</i> file

![mount-angular-app-on-react-container-app.png](/additional-assets/mount-angular-app-on-react-container-app.png)

#### v: <ins> Use the mounted component in the React Container </ins>

Use the mounted component within the container application in the <i>/react-container-app/src/components/container/index.tsx</i> file

![angular-charts-app-in-react-container](/additional-assets/angular-charts-app-in-react-container.png)

</dd></dl>
</dd></dl>

## 4: Sample Overview <a name="SampleOverview"></a>

<dl><dd>

For the Micro-Frontend sample implementation on AWS, we have chosen Angular and React frameworks to build our frontend application. The backend application is created using the NodeJS framework. 

<dl><dd>

### a) <ins>Micro-Frontend Application</ins>

[AWS Amplify](https://aws.amazon.com/amplify/) is leveraged to automate the process of deployment on AWS. Using AWS Amplify, we were able to deploy and add authentication to the application just by using a few user-friendly commands.

Each Micro-Frontend Application is deployed using AWS Amplify which uses  [Amazon S3 bucket](https://aws.amazon.com/s3/) and [Amazon CloudFront Distribution](https://aws.amazon.com/cloudfront/) internally; and for authentication [Amazon Cognito](https://aws.amazon.com/cognito/) is being leveraged.

The sample consists of three applications:

Micro-Frontend Apps | Purpose |
|----------|-------------------------|
| Angular Charts App | Contains code for generation charts  |
| React Charts Data App | Contains charts fitters leveraged by Angular Charts App to create charts |
| React Container App | Container App containing React Charts Data App and Angular Charts App  |

### b) <ins>Backend Application</ins>

For the backend, we have leveraged NodeJS code deployed on [AWS Lambda functions](https://aws.amazon.com/lambda/) to persist and read data from the [AWS DynamoDB](https://aws.amazon.com/dynamodb/) leveraged as a NoSQL Database.

Backend infrastructure code is automated using AWS Cloud Development Kit (AWS CDK).

</dd></dl>

## 5: Architecture Diagram <a name="ArchitectureDiagram"></a> 

<dl><dd>

[AWS Amplify](https://aws.amazon.com/amplify/) is leveraged to host our "Client Side Rendering" Frontend Application. AWS Amplify uses internally uses AWS Serverless Services like [CloudFront](https://aws.amazon.com/cloudfront/) and [S3 Bucket](https://aws.amazon.com/s3/) to deploy the frontend application. 

![Deployment Architecture](/additional-assets/microfrontend-architecture.svg)

</dd></dl>

## 6: Requirements <a name="Requirements"></a>

<dl><dd>

Name | Version |
|-----------------------|----------------------------------|
| [NodeJS](https://nodejs.org/en/download) | 16.17.0 |
| [Typescript](https://www.typescriptlang.org/download) | 4.8.4 |
| [ReactJS](https://react-cn.github.io/react/downloads.html) | 18.2.0 |
| [Angular](https://angular.io/guide/setup-local) | 15.2.0 |
| [CDK CLI](https://www.npmjs.com/package/aws-cdk-lib) | 2.81.0 |
| [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) | 2.7.35 |
| [AMPLIFY CLI](https://docs.amplify.aws/cli/start/install/) | 10.7.1 |

### <ins>Prerequisite verification</ins>

Check if you have all the required prerequisites by executing the following commands, and they would return the versions. 

1: NodeJS

```console 
    node -v
```

2: Node
```console 
    cdk --version
```

3: AWS CLI
```console 
    aws --version
```

</dd></dl>

## 7: Deployment of the Sample Application on AWS  <a name="Deployment"></a>

<dl><dd>

In order to deploy the Micro-frontend application, you need to deploy the each applications one by one in the order mentioned below: 

`Note: For all the apps open new terminal and clone the repository as mentioned in the deployment of each of the below apps`
<dl><dd>

### a) [Backend App](/backend/README.md) ####
### b) [Angular Charts App](/angular-charts-app/README.md) ####
### c) [React Charts Data App](/react-charts-data-app/README.md) ####
### d) [React Container App](/react-container-app/README.md) ####

</dd></dl>

Once the above steps are performed, open React Container App's Domain URL and we will get the Micro-Frontend app.

![chart-app](/additional-assets/chart-app.png)

</dd></dl>

## 8: Cleanup <a name="Cleanup"></a>

<dl><dd>

Cleanup requires few commands to be executed for each of the applications deployed.

 a) Go to `backend` directory and use `cdk destroy --all` command.

 b) Go to `angular-charts-app` directory and use `amplify delete` command.

 c) Go to `react-charts-data-app` directory and use `amplify delete` command.

 d) Go to `react-container-app` directory and use `amplify delete` command.

 </dd></dl>

## 9: References <a name="References"></a>

<dl><dd>

- [Micro-frontends.org](https://micro-frontends.org/)
- [Buildingmicrofrontends.com](https://www.buildingmicrofrontends.com/)
 </dd></dl>

## 10: Security <a name="Security"></a>

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## 11: License <a name="License"></a>

<dl><dd>
This sample code is made available under the MIT-0 license. See the LICENSE file.
</dd></dl>