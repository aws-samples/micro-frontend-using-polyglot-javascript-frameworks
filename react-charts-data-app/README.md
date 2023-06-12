### React Charts Data App Deployment

React Charts Data App is the App containing filters for the Charts and is deployed on AWS using AWS Amplify.

CI/CD pipeline is configured using AWS Amplify.

#### Prerequisite

Make sure we have Amplify CLI up and running, and for installation use the [Amplify Official Website](https://docs.amplify.aws/cli/start/install/)

## Deployment on AWS

![React Charts Data App Architecture](/additional-assets/react-charts-data-app-architecture.svg)

### Deployment of the above architecture on AWS
 
#### Step 1: Clone Repository

```console
git clone
cd opensource-microfrontend/react-charts-data-app
```

#### Step 2: Install Dependencies 

```console
npm install
```

### Step 3: Initialize AWS Amplify

```console
amplify init
```

![react-charts-data-app-init](../additional-assets/react-charts-data-app-amplify-init.png)

### Step 4: Add CI/CD and Deploy App

```console
amplify add hosting
```

Amplify hosting will ask a few questions, select the answers as present in the screenshot:

![react-charts-data-app-add-hosting](../additional-assets/react-charts-data-app-add-hosting.png)

*After selecting the options, Amplify CLI would open Amplify console on the default web browser.*

#### Step 4a: Setting up Hosting Environment

Click on *Hosting environments* and Select *AWS CodeCommit*. Click "Connect Branch"

![react-charts-data-app-hosting-environments](../additional-assets/react-charts-data-app-hosting-environments.png)

#### Step 4b: Setting up Repository

Select *microfrontend-react-charts-data-app* repository from the drop down and select *main* branch.

![react-data-app-amplify-setting-repository](../additional-assets/react-data-app-amplify-setting-repository.png)

#### Step 4c: Configure the Build Setting

- Select *Environment* as **Dev** from the drop down
- Select an existing service role or create a new one so Amplify Hosting may access your resources.
- Click on *Advanced settings* drop down and set the environment variable **CHARTS_BACKEND_API** (Copy the value of ***APIGatewayURL***) *[(can get from Step 3 in the backend app deployment)](../backend/README.md)*)

![react-data-app-amplify-build-setting-1](../additional-assets/react-data-app-amplify-build-setting-1.png)
![react-data-app-amplify-build-setting-2](../additional-assets/react-data-app-amplify-build-setting-2.png)

#### Step 4d: Review the CI/CD and Build Setting

Review the setting and click on *Save and Deploy*

![react-data-app-amplify-review-and-save](../additional-assets/react-data-app-amplify-review-and-save.png)

### Step 5: Getting the React Charts Data App endpoint

After completing *Step 4d*, come back to the existing terminal and hit enter. You can see the Frontend App Domain. Save this Domain in a text editor, we would be need with when deploying the React Container App.

![react-data-app-amplify-app-domain](../additional-assets/react-data-app-amplify-app-domain.png)

[Lets' deploy our React Container App.](../react-container-app/README.md)

[Go Back.](../README.md)