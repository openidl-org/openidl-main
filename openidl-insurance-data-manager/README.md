# openIDL Insurance Data Manager

[![AWS Cloud](https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/)
[![Platform](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)

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

## Installing Node.js
If you do not have Node.js installed already, [download](https://nodejs.org/en/download/releases/) and install Node.js v14.17.x (please note that other Node.js versions may not be compatible with this codebase). Also, make sure that the npm version you have is v6.14.x

## Get Repository code into local machine

* Open a command line terminal at the location of project has to be created : `git clone git@github.com:openidl-org/openidl-main.git `
* Example of develop branch : `git checkout -b develop`

## Installing openidl-common-lib npm module 
This repository leverages common functionality from [openidl-common-lib](https://github.com/openidl-org/openidl-main/tree/main/openidl-common-lib) . To install this dependency, replace `{GITHUB_TOKEN}` in `.npmrc` with your own Git personal access token. For details on how to get an access token, please see [Personal access tokens](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token) on the GitHub site. Access Token should have at least `read:packages` permissions

## Configure to Run locally

For development, testing, and debugging purposes, it is very convenient to run this Node.js component locally on your system and have it connect to the local blockchain network.

### 1. Configure connection-profile.json

* Run the `./start.sh` script in the `openidl-test-network` folder
* This will launch a Hyperledger Fabric Network with 3 Organizations (AAIS, Analytics & Carrier)
* Create connection-profile.json file under server/config
* Copy the contents from `openidl-test-network/organizations/peerOrganizations/aais.example.com/connection-aais.json` to connection-profile.json
* Replace `host.minikube.internal` with `localhost` in connection-profile.json

### 2. Configure the identity provider

Application currently supports both AWS Cognito and IBM App ID. You can go with either one of the providers.

##### a. Configure local-cognito-config.json - AWS Cognito Identity Provider

* Create `local-cognito-config.json` file under `server/config`
* Get Cognito Credentials from respective node administrator or cloud administrator
* Paste the JSON in 'local-cognito-config.json' file with following keys `userPoolId`, `clientId` & `region` 
* Update the file with key `idpType` and value `cognito`
* Final JSON would be
    ```
    {
        "idpType": "cognito",
        "userPoolId":"*****************************",
        "clientId":"*****************************",
        "region":"*****************************"
    }
    ```

##### b. Configure local-appid-config.json - IBM App ID Provider

* Create `local-appid-config.json` file under `server/config`
* Get  `apikey` and `instance_id` from respective node administrator or cloud administrator
* To obtain the `apikey` and `instance_id` attributes, log on to the IBM Cloud:
	  * `apikey` - For information on how to create an API Key for accessing IBM Certificate Manager, please see [Configuring IBM Certificate Manager as persistent store to store the Fabric credentials](https://git.ng.bluemix.net/openIDL/openidl-common-lib#configuring-ibm-certificate-manager-as-persistent-store-to-store-the-fabric-credentials) on the [openild-common-lib](https://git.ng.bluemix.net/openIDL/openidl-common-lib) repository. Please note that you should save the API Key value when it is created since you **won't** be able to obtain it after that time.	  
	  * `instance_id` - Log on to the IBM Cloud and access the **corresponding** IBM Certificate Manager instance and then click on `Settings` -> `Instance Info` and copy the `Service Instance CRN` value
* Update the file with key `idpType` and value `appid`
* Final JSON would be
    ```
    {
        "idpType": "cognito",
        "apikey":"*****************************",
        "clientId":"*****************************",
        "appidServiceEndpoint":"*****************************",
        "discoveryEndpoint":"*****************************",
        "iam_apikey_description":"*****************************",
        "iam_apikey_name":"*****************************",
        "iam_role_crn":"*****************************",
        "iam_serviceid_crn":"*****************************",
        "managementUrl":"*****************************",
        "oauthServerUrl":"*****************************",
        "profilesUrl":"*****************************",
        "secret":"*****************************",
        "tenantId":"*****************************",
        "version":4,
        "callerId":"*****************************",
    }
    ```
### 3. Configure local-db-config.json

* Edit `local-db-config.json` file under `server/config`
* Paste the following JSON in `local-db-config.json` file
    ``` 
    {
        "persistentStore": "mongo",
        "mongodb": "openidl-offchain-db",
        "simpleURI": "mongodb://localhost:27017"
    }
    ```
* Application will be using local MongoDB running on port `27017` as the persistent data store

### 4. Configure channel-config.json

* Change $HOST value with respective IBP node / organization name. Please check with AAIS cloud admin or node admin to get org name details. Below is an example of AAIS node

|   Config File Name      | Configured Value  |  Local Run Value|
| --------------------- | ----------------- | --------------- |
|   `server/config/channel-config.json` | `"channelName": "analytics-${HOST}"` | `"channelName": "analytics-aais"` |
|  `server/config/channel-config.json` | `"org": "${HOST}msp"` | `"org": "aaismsp"` |
|   `server/config/channel-config.json` | ` "user": "openidl-${HOST}-insurance-data-manager-ibp-2.0"` | ` "user": "openidl-aais-insurance-data-manager-ibp-2.0"` |
|   `server/config/channel-config.json` | `"channelName": "analytics-${HOST}"` | `"channelName": "analytics-aais"` |
|   `server/config/channel-config.json` | ` "mspId": "${HOST}msp"` | ` "mspId": "aaismsp"` |

### 5. Configure local-kvs-config.json

* Create `local-kvs-config.json` file under `server/config`
* Paste the following JSON in `local-kvs-config.json` file
    ``` 
    {
        "walletType": "couchdb",
        "url": "http://admin:adminpw@localhost:9984"
    }
    ```
* Application will be using local CouchDB running on port `9984` as user certificate key value store

### 6. Configure email.json

* Create `email.json` file under `server/config`
* TODO on how to get the JSON file

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

* Connection not being established to the local blockchain network.
* Node/npm packages not being installed correctly.
* Multiple instances of the application running and trying to use the same network port.

## How to generate API token
Open a postman tool and Create a new service request type of POST. Copy and past the below url 
http://localhost:8080/openidl/api/login

Use the following JSON as request body

```
{
    "username": "**********************",
    "password": "**********************"
}
```