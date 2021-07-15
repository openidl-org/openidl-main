# openIDL UI

[![IBM Cloud](https://img.shields.io/badge/bluemix-powered-blue.svg)](https://bluemix.net)
[![Platform](https://img.shields.io/badge/platform-NODE-blue.svg?style=flat)](https://nodejs.org)

This repository contains the source code for the openIDL UI, which includes portals for regulators, multi-tenant carriers, and AAIS stat agents. Therefore, this is a multi-tenant application.

Regulators and carriers wanting to access the openIDL UI need to be on-boarded by AAIS. To do so, a corresponding identity (i.e. userid, role, and any necessary attributes) should be created in the IBM App ID of the **corresponding** environment.


## Running locally

### Installing Node.js
If you do not have Node.js installed already, [download](https://nodejs.org/en/download/releases/) and install Node.js v8.9.0 (please note that other Node.js versions may not be compatible with this codebase). Also, make sure that the npm version you have is v5.5.1. You can check your node and npm version anytime by executing the following commands:

    node -v
    npm -v

#### Angular version used
We used Angular version 6 for the development of this application (please note that other Angular versions may not be compatible with this codebase).

#### Installing Angular CLI
For development and maintenance of this component, we leverage the [Angular CLI](https://cli.angular.io/). The Angular CLI is a tool to initialize, develop, scaffold, and maintain Angular applications. Make sure to install @angular/cli, globally, using the following command:

##### Global Install
    npm install -g @angular/cli@6.0.8
    
##### Local Install    
    npm install @angular/cli@6.0.8

Pleae note that we used [Angular CLI](https://cli.angular.io/) v6.0.8. To install a different version of the CLI, you can just update the version locally within your project using the following command:

    npm install @angular/cli@<version>

However, please note that we only tested this application using v6.0.8.

## Get Repository code into local machine

* Open a command line terminal at the location of project has to be created
* git clone -b [branchname] [github clone with SSH or HTTP]
* Example of develop branch : git clone -b develop git@us-south.git.cloud.ibm.com:openIDL/openidl-ui.git

### Pulling Git private repositories
This application leverages the [openidl-common-ui](https://git.ng.bluemix.net/openIDL/openidl-common-ui) repository, which is private. 
To successfully install this dependency, you should replace `{GITHUB_TOKEN}` in `package.json` and `package-lock.json` with your own Git personal access token. For details on how to get an access token, please see [Personal access tokens](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html).

### Install common-UI libraries
* Remove the existing "lib" folder
* Inject common-ui lib into project - git submodule add -f git@git.ng.bluemix.net:openIDL/openidl-common-ui.git lib

### Configure Data Call App URL
* server/config/config.js
* exports.DATA_CALL_APP_URL = {Data Call App URL}
* If the Data Call App is running in local machine, then use "http://localhost:<PORT>/openidl/api". Replace <PORT> with the appropriate port of the running data call app.
* If the Data Call App is running in the IBM Cloud, then get the URL of that particular Data Call App of the environment(dev, demo, etc.). Follow the below steps:
    * Filter the services by selecting the desired Resource group on IBM cloud dashboard page. In "cluster" category, Click on the appropriate cluster which has middleware components
    * Click on "kubernetes dashboard" button at the right corner of the page.
    * On "kubernetes dashboard" page, select workspace as "openidl-aais-apps" from top left dropdown box
    * Click on "ingress" link under "service". On right hand side, you can see list of all ingresses
    * Click "3 vertical dots" aligned with "[PREFIX]-data-call-app-ingress". This represents the ingress of the Data Call Service
    * Click on Edit
    * On YAML tag of pop-up window, you can find the host key value which is data call app server URL. The value looks like -> [PREFIX]-data-call-app.[CLUSTERNAME].us-south.containers.appdomain.cloud
    * To the above URL, add prefix as "https://"" and suffix as "/openidl/api". Use this URL as "DATA_CALL_APP_URL" value.
    * Example of development environment => exports.DATA_CALL_APP_URL = 'https://dev-aais-openidl-data-call-app.dev-openidl-aais-ibp2-0-93fbc942734a2ff6b0991658d589b54e-0000.us-south.containers.appdomain.cloud/openidl/api';

### Configure local-appid-config.json

* Create local-appid-config.json file under server/config
* Get appid Service Credentials from respective node administrator or Clould administrator or follow the below steps:
    * Filter the services by selecting the desired Resource group on IBM cloud dashboard page.
    * Click on the AppId instance
    * Click Service Credentials
    * If service credential already exists, then copy the JSON or create a new Service Credential by clicking on "Create" and copy the generated JSON. Please use appropriate role.
* Paste the above JSON in 'local-appid-config.json' file and add a new attribute named `callerId`. Copy the `clientId` value and assign it to `callerId` element. You should then end up with the same value for both attributes 
* Add a new attribute as "version":"4" to this JSON.

### Configure local-cognito-config.json

* Create local-cognito-config.json file under server/config
* Get Cognito Credentials from respective node administrator or Clould administrator
* Paste the JSON in 'local-cognito-config.json' file

#### Port configuration to run the application locally
The port is configured in a file named `port-config.json` inside `server/config` folder in the following format:

    { "PORT":"4200" }
This file is then used by a module named [ IBM Cloud Environment ](https://github.com/ibm-developer/ibm-cloud-env) to configure the port for the local environment. This module gets installed as a dependency when you run the `npm install` command in the previous step.

#### Install npm packages
Go to the project root folder and run the following command in the shell:

    npm install

### Building and running the application
To build the application before running it locally, run the following command in the shell:

    ng build
    "dist" folder will be created on root path which contains all the files and folders which can be hosted in the server
    
This will create a dist folder at the root level. You may change the folder structure inside the dist folder by editing the build object inside `angular.json` present at the root level.

Once the application is built and you want to run it manually, run the following command in the shell:

    npm start

Open the URL "http://localhost:<PORT>"" in the browser

### Deployment to Server Environment

    Whenever user make changes and check-in the code then toolchain will take care of auto build and deployment.
    
### Project configuration
The configuration for this project is found in `angular.json`, which is the Angular CLI workspace file. For details on the schema for this file, see [Angular CLI workspace file](https://github.com/angular/angular-cli/wiki/angular-workspace).

### Environment configuration

Environment related configurations are defined in the [environment.ts](src/environments/environment.ts) and [environment.prod.ts](src/environments/environment.prod.ts) files (please note these files are found in the `src/environments` folder). When the application is built and deployed to the production environment, the `environment.ts` file is replaced with the `environment.prod.ts` file (hence, under such scenario, the configuration defined in `environment.prod.ts` is used by the application). Please see the [angular.json](angular.json) file for details on how these files are used for defining environment configurations (`angular.json` is the [Angular CLI workspace file](https://github.com/angular/angular-cli/wiki/angular-workspace)).

Enabling the reset world state functionality are defined in the `environment.ts` and `environment.prod.ts` files as follows:

* `RESET_WORLD_STATE: <boolean value for enabling the functionality>` - Resetting the world state functionality should not be available in a production environment. The automated DevOps pipeline, for the openIDL UI, assigns to this property the boolean value contained in the `RESET_WORLD_STATE` environment variable (please note that this envrionment variable must be defined in the deployment pipeline).

### Organization branding configuration
The [app.const.ts](src/app/const/app.const.ts) file found in the `src/app/const` folder contains the metadata that specifies the path to the image logo for each one of the organizations that are currently supported (i.e. organizations that have been on-boarded) in the openIDL network. Please note that the all image logos are placed inside the `src/assets/images` folder.

### Tips for development
To contribute to this code base, first, go to the `lib` folder which contains the [openidl-common-ui](https://git.ng.bluemix.net/openIDL/openidl-common-ui) repository which we have added initially as a Git submodule.
Please note that if you make changes to the openidl-common-ui codebase, then you'd have to commit the changes. To do so, use the following command to add the files that changed:

    git add <filenames>

Then commit the files using the following command:

    git commit -m '<commit message>'
    
Then push the code to the remote repository using the following command:

    git push

# Running in Local Kubernetes
- start minikube (only need to do if none already running or first two only needed if minikube was previously running)
````
minikube stop
minikube delete
minikube start
````
- set up minikube as docker registry
````
eval $(minikube -p minikube docker-env)
````
- build
````
docker build -t openidl/ui .
````
- get all the config files as described in running locally section
- update those files with the appropriate values replaced
- create secrets (if not already created) (must do if update any of the config files.)
````
make delete_appssecret
make create_appssecret
````
- deploy (if redeploying, run the delete first)
````
kubectl delete -f deployment.yml
kubectl apply -f deployment.yml
````
- open the dashboard
````
minikube dashboard
````

- test api with swagger
````
make swagger
````
