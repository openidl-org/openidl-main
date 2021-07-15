# openIDL Insurance Data Manager

[![IBM Cloud](https://img.shields.io/badge/bluemix-powered-blue.svg)](https://bluemix.net)
[![Platform](https://img.shields.io/badge/platform-NODE-blue.svg?style=flat)](https://nodejs.org)

This repository contains the component responsible for ingesting transactional insurance data into a Harmonized Data  storage (HDS) using MongoDB/cloudantDB. In addition to storing such records into HDS, this component is responsible for computing the SHA256 hash value for the insurance records that are received as input (i.e. a batch of transactional insurance records) and storing that hash value on the corresponding blockchain ledger. Please note that component is implemented as a Node.js application, which also serves as a Hyperledger Fabric client for submitting transactions to blockchain ledger. Therefore, this application has a dependency on the [Hyperledger Fabric SDK for Node.js](https://fabric-sdk-node.github.io/).

The openIDL Insurance Data Manager provides functionality for:
* Storing transactional insurance data into CloudantDB/MongoDB (off-chain database)
* Storing, in the blockchain ledger, a computed hash value for the insurance records that are received as input.


## Insurance Data Load Flow

* ETL can invoke blockchain hashing API
* API can validate API access token
* Insurance data will be inserted into HDS
* Hash the insurance data with SHA256 algoritham
* Commit the insurance data into ledger

 | HTTP Status Code | Transaction Status | 
| ------------ | ---------------------  |
| 200 | Transaction Success
| 401 | Unauthorized Error (invalid token)
| 500 | Partial transaction success or Fail to fetch the documents for hashing
| 503 | Database connection error
| 512 | MongoDB Execution Error

## Running locally

## Installing NodeJS
If you do not have Node.js installed already, [download](https://nodejs.org/en/download/releases/) and install Node.js v8.9.0 (please note that other Node.js versions may not be compatible with this codebase). Also, make sure that the npm version you have is v5.5.1.

## Get Repository code into local machine

* Open a command line terminal at the location of project has to be created
* git clone -b [branchname] [github clone with SSH or HTTP]
* Example of develop branch : git clone -b develop git@us-south.git.cloud.ibm.com:openIDL/openidl-insurance-data-manager.git

## Pulling Git private repositories
This repository leverages common functionality from the [openidl-common-lib](https://git.ng.bluemix.net/openIDL/openidl-common-lib.git) repository. To install this dependency, replace `{GITHUB_TOKEN}` in `package.json` and `package-lock.json` with your own Git personal access token. For details on how to get an access token, please see [Personal access tokens](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html) on the GitLab site.

## Configure to Run locally

For development, testing, and debugging purposes, it is very convenient to run this Node.js component locally on your system and have it connect to the corresponding IBM Blockchain Platform instance that is running on the IBM Cloud.

### 1. Configure local-appid-config.json

* Create local-appid-config.json file under server/config
* Get appid Service Credentials from respective node administrator or Clould administrator or follow the below steps:
    * Filter the services by selecting the desired Resource group on IBM cloud dashboard page.
    * Click on the AppId instance
    * Click Service Credentials
    * If service credential already exists, then copy the JSON or create a new Service Credential by clicking on "Create" and copy the generated JSON. Please use appropriate role.
* Paste the above JSON in 'local-appid-config.json' file and add a new attribute named `callerId`. Copy the `clientId` value and assign it to `callerId` element. You should then end up with the same value for both attributes 
* Add a new attribute as "version":"4" to this JSON.

### 1. Configure local-cognito-config.json

* Create local-cognito-config.json file under server/config
* Get Cognito Credentials from respective node administrator or Clould administrator
* Paste the JSON in 'local-cognito-config.json' file

### 2. Configure local-certmanager-config.json

* Get  `apikey` and `instance_id` from respective node administrator or Clould administrator

`json	
    {
      "apikey": "****************",
      "instance_id":"*****************************"
    }`
    
    To obtain the `apikey` and `instance_id` attributes, log on to the IBM Cloud:
		
	  * `apikey` - For information on how to create an API Key for accessing IBM Certificate Manager, please see [Configuring IBM Certificate Manager as persistent store to store the Fabric credentials](https://git.ng.bluemix.net/openIDL/openidl-common-lib#configuring-ibm-certificate-manager-as-persistent-store-to-store-the-fabric-credentials) on the [openild-common-lib](https://git.ng.bluemix.net/openIDL/openidl-common-lib) repository. Please note that you should save the API Key value when it is created since you **won't** be able to obtain it after that time.	  
	  * `instance_id` - Log on to the IBM Cloud and access the **corresponding** IBM Certificate Manager instance and then click on `Settings` -> `Instance Info` and copy the `Service Instance CRN` value.

### 3. Configure local-mongo-config.json

* Create local-mongo-config.json file under server/config
* Get Mongodb Service Credentials from respective node administrator or Clould administrator or follow the below steps:
    * Filter the services by selecting the desired Resource group on IBM cloud dashboard page.
    * Click on the Mongodb instance
    * Click Service Credentials
    * If service credential already exists, then copy the JSON or create a new Service Credential by clicking on "Create" and copy the generated JSON. Please use appropriate role.
* Paste the above JSON in 'local-mongo-config.json' file


### 4. Configure connection-profile.json

* Create connection-profile.json file under server/config
* Get IBP connection profile from respective node administrator or Clould administrator or follow the below steps:
    * Login to IBM Cloud account
    * Filter the services by selecting the desired Resource group on IBM cloud dashboard page.
    * Click on the IBP instance
    * Click on "Launch the IBM Blockchain Platform console"
    * In IBP console, click on Organizations icon in the left vertical panel. A list of Organizations will be displayed
    * Select the Organization MSP for which the connection profile is required, usually of the Peers like aais, analytics, etc
    * Select "Create Connection Profile" in the Organization panel.
    * In the pop up window, select the peer(s) and click on Download Connection profile
    * Save this file as connection-profile.json in the above mentioned server/config directory


### 5. DBConfig.json

| Config File Name      | Configured Value  |  Local Run Value|
| --------------------- | ----------------- | --------------- |
| `server/config/DBConfig.json` | ` "persistentStore":"env_target_db""` | ` "persistentStore":"mongo"` |

### 6.channel-config.json

* Change $HOST value with respective IBP node / organization name. Please check with AAIS cloud admin or node admin to get org name details. Below is an example of AAIS node

|   Config File Name      | Configured Value  |  Local Run Value|
| --------------------- | ----------------- | --------------- |
|   `server/config/channel-config.json` | `"channelName": "analytics-${HOST}"` | `"channelName": "analytics-aais"` |
|  `server/config/channel-config.json` | `"org": "${HOST}msp"` | `"org": "aaismsp"` |
|   `server/config/channel-config.json` | ` "user": "openidl-${HOST}-insurance-data-manager-ibp-2.0"` | ` "user": "openidl-aais-insurance-data-manager-ibp-2.0"` |
|   `server/config/channel-config.json` | `"channelName": "analytics-${HOST}"` | `"channelName": "analytics-aais"` |
|   `server/config/channel-config.json` | ` "mspId": "${HOST}msp"` | ` "mspId": "aaismsp"` |

## Start the NodeJS Server
1. Run the `npm install` command and verify that there are no errors.
2. Run the `npm run dev` command.
3. Verify that the server has started successfully. The message `[2018-11-26 16:34:00.581] [INFO] server - app listening on http://localhost:8080` should be present in the logs, and there should be no errors.

## Verify server is up and running
You can access the OpenAPI (aka Swagger) documentation locally at http://localhost:8080/api-docs for information on the different endpoints and how to access them so you can validate the server is up and running as expected. Please note that you will need to generate an authentication token before you can invoke any of the endpoints.
 
### Execute functional test cases
Once the installation and application have been verified to work locally, test suites may be executed:

1. Ensure that the current app has been stopped (Ctrl+C on macOS/Unix machines).
2. Run the `npm run dev-test` command.
3. Ensure that output does not contain any errors.

If errors are present, see the [troubleshooting section](#troubleshooting).

### Troubleshooting
If there are errors, please inspect the logs carefully and debug accordingly. Common errors may relate to:

* Connection not being established to the IBM Blockchain Platform service.
* Node/npm packages not being installed correctly.
* Multiple instances of the application running and trying to use the same network port.

## How to generate API token
Open a postman tool and Create a new service request type is POST. Copy and past the below url

https://us-south.appid.cloud.ibm.com/oauth/v4/(tenantId)/token

1. (tenantId) - Get the value from APPID config file
2. Choose body header as "x-www-form-urlencoded"
3. Select the respective key value from  APPID Config file

 | Key | Value | 
| ------------ | ---------------------  |
| client_id | value from respective environment and node of APPID
| client_secret | value from respective environment and node of APPID
| grant_type | client_credentials

 
 # Deploy to local kubernetes
 - switch to node 8.9.0
 ````
 nvm use 8.9.0
 ````
 - build into minikube
 ````
 eval $(minikube -p minikube docker-env)
 docker build . -t openidl/insurance-data-manager
 ````