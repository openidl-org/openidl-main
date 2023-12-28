## Creating identities for the Fabric client components (registration and enrollment)
The Fabric identity registration and enrollment script, `fabric-user-enrollment.js`, relies on two pre-requisites:

1. A running blockchain network
    * On your local machine. Refer to the documentation in `openidl-test-network` folder for setting up a blockchain network.
    * On the AWS/IBM Cloud. Request access from respective node administrator or cloud administrator.
2. A key value store for user credentials. Following are the 3 available options
    * CouchDB running on port `9984` which gets created when setting up local blockchain network. Refer to the documentation in `openidl-test-network` for setting up a network. 
    * Hashicorp Vault running on AWS Cloud.
    * IBM Certificate Manager running on IBM Cloud.

The `fabric-user-enrollment-cli.js` script registers and enrolls users in the blockchain network and can stores their certificates in the respective key value store.

## Configure to Run locally

For development, testing, and debugging purposes, it is very convenient to run this Node.js component locally on your system.

### 1. Configure connection-profile.json
* Run the `./start.sh` script in the `openidl-test-network` folder.
* This will launch a Hyperledger Fabric Network with 3 Organizations (AAIS, Analytics & Carrier).
* Create `connection-profile.json` file under `server/config`.
* Copy the contents from `openidl-test-network/organizations/peerOrganizations/aais.example.com/connection-aais.json` to connection-profile.json.
* Replace `host.minikube.internal` with `localhost` in `connection-profile.json`.

### 2. Configure admin-config.json
* Create `admin-config.json` file under `server/config`.
* Paste the following JSON
    ```
    {
        "adminlist": [
            {
                "user": "*********",
                "secret": "***********",
                "org": "aais"
            }
        ]
    }
    ```
* Replace `user` and `secret` Org's Fabric CA Admin Username and Secret. This will be `admin` & `adminpw` if you are using local blockchain network.
### 3. Configure fabric-config.json
* Create `fabric-config.json` file under `server/config`.
* Paste the following JSON
```
{
    "logLevel": "debug",
    "connectionProfile": "connection-profile.json",
    "adminConfigFile": "admin-config.json"
}
```

### 4. Configure the identity provider (Cognito / IBM App ID)
Application currently supports both AWS Cognito and IBM App ID. You can go with either one of the providers.

##### a. Configure local-cognito-config.json - AWS Cognito Identity Provider

* Create `local-cognito-config.json file` under `server/config`
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
        "idpType": "appid",
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

### 5. Configure Key Value Store (CouchDB / HashiCorp Vault / IBM Certificate Manager)
Application currently supports CouchDB, HashiCorp Vault & IBM Certificate Manager as the Key Value Stores. You can go with either one of the providers.

##### a. Configure local-kvs-config.json - CouchDB
* Create local-db-config.json file under server/config
* Paste the following JSON in 'local-kvs-config.json' file
    ``` 
    {
        "walletType": "couchdb",
        "url": "http://admin:adminpw@localhost:9984"
    }
    ```
* Application will be using local CouchDB running on port `9984` as user certificate key value store

##### b. Configure local-certmanager-config.json - IBM Certificate Manager
* If using IBM Certificate Manager as persistent store, then:
	* Create a file named `local-certmanager-config.json` and place this file under the `server/fabric/config` folder. This file will contain an `apikey` and `instance_id` attributes (see following point).
		```
		{
		  "walletType": "certificate_manager",
		  "apikey": "*****************",
		  "instance_id":"***********************"
		}
		```

	* To obtain the `apikey` and `instance_id` attributes, log on to the IBM Cloud:
		
	  * `apikey` - For information on how to create an API Key for accessing IBM Certificate Manager, please see [Configuring IBM Certificate Manager as persistent store to store the Fabric credentials](https://git.ng.bluemix.net/openIDL/openidl-common-lib#configuring-ibm-certificate-manager-as-persistent-store-to-store-the-fabric-credentials) on the [openild-common-lib](https://git.ng.bluemix.net/openIDL/openidl-common-lib) repository. Please note that you should save the API Key value when it is created since you **won't** be able to obtain it after that time.	  
	  * `instance_id` - Log on to the IBM Cloud and access the **corresponding** IBM Certificate Manager instance and then click on `Settings` -> `Instance Info` and copy the `Service Instance CRN` value.
	  

### Start the Node.js server
1. Run the `npm install` command and verify that there are no errors.
2. Run the `npm start` command.
3. Verify that the server has started successfully. The message `[2018-11-26 16:34:00.581] [INFO] server - app listening on http://localhost:8080` should be present in the logs, and there should be no errors.

### Verify server is up and running
You can access the OpenAPI (aka Swagger) documentation locally at http://localhost:8080/api-docs for information on the different endpoints and how to access them so you can validate the server is up and running as expected. Please note that you will need to generate an authentication token before you can invoke any of the endpoints.

### Register & Enroll Users

* Open Swagger documentation at http://localhost:8080/api-docs
* Generate authentication token using `app-user-login` route. Make sure the credentials you provide is for a registered user on the respective identity provider (Cognito or IBM App ID)
* Copy the generated `userToken` and Authorize it on Swagger.
* User can be registered on `fabric-user-enrollment` route with `options` set to `register`
    ```
    {
        "options": "register",
        "users": [
            {
                "org": "aais",
                "user": "openidl-aais-data-call-processor-ibp-2.1",
                "pw": "password",
                "affiliation": "aais",
                "role": "client",
                "attrs": [
                    {
                        "name": "orgType",
                        "value": "advisory",
                        "ecert": true
                    }
                ] 
            }
        ]
    }
    ```
* After registering, user can be enrolled on `fabric-user-enrollment` route with `options` set to `enroll`
    ```
    {
        "options": "enroll",
        "users": [
            {
                "org": "aais",
                "user": "openidl-aais-data-call-processor-ibp-2.1",
                "pw": "password",
                "affiliation": "aais",
                "role": "client",
                "attrs": [
                    {
                        "name": "orgType",
                        "value": "advisory",
                        "ecert": true
                    }
                ] 
            }
        ]
    }
    ```

### Troubleshooting
1. Fabric-ca request register failed with errors [[{"code":20,"message":"Authorization failure"}]]

	First make sure the connection profile is correct. Also, note that this error appears when there has been a previous run of the script against a different connection profile. In such case, remove previously downloaded certificates from the project's root directory:
   	* Files ending with `-priv`
   	* Files ending with `-pub`
   	* Files with name of admin identity; generally this will be a file with name `admin`

2.  Registration of user failed with affiliation validation

	Ensure the affiliation section is populated correctly (inspect the connection profile file and the contents of the `users.json` file).