# openIDL Data Call Processor

[![AWS Cloud](https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/)
[![Platform](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)

The Data Call Processor component is responsible for processing consented events and extraction pattern specified events. This component processes such events by extracting the corresponding data from the HDS (mongo/cloudant) database and ingesting it into corresponding channel (e.g. `AAIS-Carriers`, `AAIS-Carrier1`, etc.). This component is implemented as a Node.js application that receives and processes live consented events and extraction pattern specified events and ensures that any previously missed consented events and extraction pattern specified events are also processed.
The codebase for this component is capable of supporting a single carrier (i.e. running under the control of a carrier) and also capable of supporting multiple carriers (i.e. running under the control of an advisory organization such as AAIS). Therefore, the same codebase is deployed to both types of environments (though with different configuration).

## Data Processing Flow

* Singletenant or Multitenant user will provide a consent on their UI
* Data call can be updated into the ledger of default channel
* After successful commit into the ledger, blockchain emit an event is "ConsentedEvent"
* Data call processor is a microservice where "ConsentedEvent" listener is up and running
* ConsentedEvent can perform the extraction pattern which mapped with data call, load the data into mongodb collection and push the data into Private data collection (PDC) between Analytics and carrier node. 

## Running locally

## Installing NodeJS
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

### 4. Configure listener-channel-config.json

* Change $HOST value with respective organization name. Below is an example of AAIS node

| Config File Name      | Configured Value  |  Local Run Value|
| --------------------- | ----------------- | --------------- |
| `server/config/listener-channel-config.json` | `"channelName": "analytics-${HOST}"` | `"channelName": "analytics-aais"` |
|  `server/config/target-channel-config.json` | `"org": "${HOST}"` | `"org": "aais"` |
| `server/config/listener-channel-config.json` | ` "user": "openidl-${HOST}-data-call-processor-ibp-2.0","` | ` "user": "openidl-aais-data-call-processor-ibp-2.0","` |


### 5. Configure unique-identifiers-config.json

* Create `unique-identifiers-config.json` file under `server/config`
* Add the carriername and company code value in the config file with below format
* {
    "identifiers": [{
            "carrierName": "The Hartford",
            "uniqueIdentifier": "12345"
        } 
    ]
}

### 6. Configure local-kvs-config.json

* Create `local-kvs-config.json` file under `server/config`
* Paste the following JSON in `local-kvs-config.json` file
    ``` 
    {
        "walletType": "couchdb",
        "url": "http://admin:adminpw@localhost:9984"
    }
    ```
* Application will be using local CouchDB running on port `9984` as user certificate key value store

### 7. Configure s3-bucket-config.json

* Create `s3-bucket-config.json` file under `server/config`
* Paste the following JSON. Getting the `accessKeyId`, `secretAccessKey` abd `roleParams` from AWS is beyond the scope of this document. (for further details, please see AWS's [documentation](
https://aws.amazon.com/premiumsupport/knowledge-center/create-access-key/)).
    ```
    {
        "accessKeyId": "***********************",
        "secretAccessKey": "***********************",
        "bucketName": "openidl-analytics",
        "roleParams": {
          "RoleArn": "******************************",
          "RoleSessionName": "openidl",
          "DurationSeconds": "900",
          "ExternalId": "******"
    }
    }
    ```
### 8. Configure email.json

* Create `email.json` file under `server/config`
* (Please ask your system administrator for this file)

## Start the Node.js server
1. Run the `npm install` command and verify that there are no errors.
2. Run the `npm start` command.
3. Verify that the server has started successfully. The message `[2018-11-26 16:34:00.581] [INFO] server - app listening on http://localhost:8000` should be present in the logs, and there should be no errors.

### Verify server is up and running
You can access the OpenAPI  locally at http://localhost:8000/health so you can validate the server is up and running as expected.

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
 

### Sequence Diagram.
Sequence diagram [draw.io](./docs/datacall-processor.drawio) file.

![](./docs/datacall-processor.jpg)

