# openIDL Data Call mood listener


[![AWS Cloud](https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/)
[![Platform](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)

This repository contains the event listening and processing functionality for likes/dislikes and consents events created by [OpenIDL Data Call App](https://github.com/openidl-org/openidl-main/tree/main/openidl-data-call-app)repository. Please note that this service API layer is implemented as a Node.js application, which serves as a Hyperledger Fabric client for listening events and processing event as per business logic. Therefore, this application has a dependency on the [Hyperledger Fabric SDK for Node.js](https://fabric-sdk-node.github.io/). This application also has dependency on https://github.com/openidl-org/openidl-main/tree/main/openidl-common-lib which contains the common eventHandler engine.

The openIDL Data Call mood listener component provides functionality for:
* Listen to like/dislike/consent events emitted by openIDL Data Call App and OpenIDL Data Call Carrier App.
   * Listening and Target channels are configurable in /server/config/channel-config.json

## Running Mood Listener locally

For development, testing, and debugging purposes, it is very convenient to run this Node.js component locally on your system and have it connect to the corresponding Hyperledger Fabric Network.

## Installing Node.js
If you do not have Node.js installed already, [download](https://nodejs.org/en/download/releases/) and install Node.js v14.17.x (please note that other Node.js versions may not be compatible with this codebase). Also, make sure that the npm version you have is v6.14.x

## Get Repository code into local machine

* Open a command line terminal at the location of project has to be created : `git clone git@github.com:openidl-org/openidl-main.git `
* Example of develop branch : `git checkout -b develop`

## Installing openidl-common-lib npm module 
This repository leverages common functionality from [openidl-common-lib](https://github.com/openidl-org/openidl-main/tree/main/openidl-common-lib) . To install this dependency, replace `{GITHUB_TOKEN}` in `.npmrc` with your own Git personal access token. For details on how to get an access token, please see [Personal access tokens](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token) on the GitHub site. Access Token should have at least `read:packages` permissions

### Edit/Create Configuration files

The following configuration files are either to be created or edited(if already exists):

### 1. Configure connection-profile.json

* Run the `./start.sh` script in the `openidl-test-network` folder
* This will launch a Hyperledger Fabric Network with 3 Organizations (AAIS, Analytics & Carrier)
* Create connection-profile.json file under server/config
* Copy the contents from `openidl-test-network/organizations/peerOrganizations/aais.example.com/connection-aais.json` to connection-profile.json
* Replace `host.minikube.internal` with `localhost` in connection-profile.json

### 2. Configure local-db-config.json

* Update `local-db-config.json` file under `server/config`
* Paste the following JSON in `local-db-config.json` file
    ``` 
    {
        "persistentStore": "mongo",
        "mongodb": "openidl-offchain-db",
        "simpleURI": "mongodb://localhost:27017"
    }
    ```
* Application will be using local MongoDB running on port `27017` as the persistent data store

### 3. Configure listener-channel-config.json

* Update `listener-channel-config.json` file under `server/config`
* Below is an example of AAIS node

|   Config File Name      | Configured Value  |  Local Run Value|
|  --------------------- | ----------------- | --------------- |
|   `server/config/listener-channel-config.json` | `"listenerChannels": "${LISTENER_CHANNELS_EVENTS}"` | `"listenerChannels": [{"channelName":"analytics-aais","events":[{"ConsentedEvent":"ConsentedEvent"},{"ToggleLikeEvent":"ToggleLikeEvent"}]}]` |


### 4. Configure local-kvs-config.json

* Create `local-kvs-config.json` file under server/config
* Paste the following JSON in 'local-kvs-config.json' file
    ``` 
    {
        "walletType": "couchdb",
        "url": "http://admin:adminpw@localhost:9984"
    }
    ```
* Application will be using local CouchDB running on port `9984` as user certificate key value store

### Start the Node.js server
1. Run the `npm install` command and verify that there are no errors.
2. Run the `npm run dev` command.
3. Verify that the server has started successfully. The message `server - app listening on http://localhost:8080` should be present in the logs, and there should be no errors.

### Verify server is up and running
You can verify if server started successfully by browsing to http://localhost:8080/ 

### Execute unit test cases
Once the installation and application have been verified to work locally, test suites may be executed:

1. Ensure that the current app has been stopped (Ctrl+C on macOS/Unix machines).
2. Run the `npm run dev-test` command.
3. Ensure that output does not contain any errors.

If errors are present, see the [troubleshooting section](#troubleshooting).

### Troubleshooting
If there are errors, please inspect the logs carefully and debug accordingly. Common errors may relate to:

* Connection not being established to the local blockchain network.
* Node/NPM packages not being installed correctly.
* Multiple instances of the app running and trying to use the same network port.
### Sequence Diagram 

Sequence diagram [draw.io](https://github.com/openidl-org/openidl-main/tree/main/openidl-data-call-mood-listener/docs/data-call-mood-listener.drawio) file.

![Sequence diagram  image.](./docs/data-call-mood-listener.jpg)
