## Creating users for the openIDL UI applications
openIDL UI applications can either use IBM Cloud's App ID service or AWS Cognito Service for user management. 

## Creating users using AWS Cognito Service

Please note that the setup and configuration of the Cognito service on the AWS Cloud is beyond the scope of this document (for further details, please see Cognito's [documentation](
https://aws.amazon.com/cognito/getting-started/).

### Running the script
1. Create `local-cognito-config.json` under `server/app/config` folder. Paste the following JSON
    ```
    {
        "idpType": "cognito"
    }
    ```
2. Log on to the AWS Cloud and access your Cognito Service; go to the `Manage User Pools` section. Select the User Pool that you want to configure.
2. Open `General Settings` and copy the `Pool Id`
3. Open `App Clients` and copy the `App client Id`
4. Final JSON in  `local-cognito-config.json` would be
    ```
    {
        "idpType": "cognito",
        "userPoolId":"*****************************",
        "clientId":"*****************************",
        "region":"*****************************"
    }
    ```
5. Create `local-cognito-admin-config.json` under `server/config` folder. Paste the following JSON. Getting the `accessKeyId` and `secretAccessKey` from AWS is beyond the scope of this document. (for further details, please see AWS's [documentation](
https://aws.amazon.com/premiumsupport/knowledge-center/create-access-key/)).
    ```
    {
        "accessKeyId": "*****************************",
        "secretAccessKey": "*****************************",
        "region": "*****************************"
    }
    ```

 6. Create `local-kvs-config.json` file under `server/config`
Paste the following JSON in `local-kvs-config.json` file
    ``` 
    {
        "walletType": "couchdb",
        "url": "http://admin:adminpw@localhost:9984"
    }
    ```
* Application will be using local CouchDB running on port `9984` as user certificate key value store

7. . Configure local-db-config.json

Edit `local-db-config.json` file under `server/config`
Paste the following JSON in `local-db-config.json` file
    ``` 
    {
        "persistentStore": "mongo",
        "mongodb": "openidl-offchain-db",
        "simpleURI": "mongodb://localhost:27017"
    }
    ```
* Application will be using local MongoDB running on port `27017` as the persistent data store

## Creating users using IBM App ID Service

The App ID service instances (for openIDL) use the out-of-the box Cloud Directory storage as the user repository. Please note that the setup and configuration of the IBM App ID service on the IBM Cloud is beyond the scope of this document (for further details, please see App ID's [documentation](
https://console.bluemix.net/docs/services/appid/index.html#gettingstarted).

### Running the script
1. Log on to the IBM Cloud and access your App ID's dashboard; go to the `Service credentials` section.
2. Open credentials section and copy the JSON content.
3. Save the JSON content into a local JSON file and name it `app-id-credentials.json`. Place this file under the `server/app/config` folder.
4. Please look at the `multicarrier-users.json` file; it contains the details of users and their attributes. Create a similar file and named it `user-config.json` and place it under the `server/app` folder.
5. Log on to the [IBM Cloud CLI](https://console.bluemix.net/docs/cli/reference/ibmcloud/download_cli.html#install_use) and generate a bearer token as follows:
    ```
    ibmcloud iam oauth-tokens
    ```
6. Copy the token and create a new entry with key `authkey` in `user-config.json` as follows (make sure to leave out the `Bearer` string from the token you just generated):
    ```
    "authKey":"<Token Value>"
    ```
7. Execute the script as follows:
    ```
    node server/app/app-user-registration-cli.js app-id-credentials.json user-config.json <option>
    ```
    where option can be either `-c` to create users or `-u` to update user attributes of existing users.
8. Start the Node.js server
    * Run the `npm run dev` command.
    * Verify that the server has started successfully. The message `[2018-11-26 16:34:00.581] [INFO] server - app listening on http://localhost:3000` should be present in the logs, and there should be no errors.
    * Select endpoint for api  `app-user-creation` and click `try it out`. Make appropriate changes in the payload.
    ```
    	{
			"directory": "cloud_directory",
			"authKey": "wiueewruwq-eueuuwiueiw",
			"users": [
				{
				"name": {
					"givenName": "john",
					"familyName": "blockchain"
				},
				"emails": [
					{
					"value": "john@email.com",
					"primary": true
					}
				],
				"userName": "john@email.com",
				"password": "john@blockchain",
				"status": "CONFIRMED",
				"profile": {
					"attributes": {
					"role": "carrier",
					"organizationId": "67856"
					}
				}
				}
			]
		}
	```
	where `authKey` should be obtained by running `ibmcloud iam oauth-tokens`. 
	role can be `carrier` or `advisory` based on type of organisation. `organizationId` should be the *corresponding* organization Id. provide appropriate `userName`, `emails` and `password`
9. Open  swagger docs at http://localhost:8080/api-docs.
10. `app-user-login` route on swagger can be used to generate authentication token.

