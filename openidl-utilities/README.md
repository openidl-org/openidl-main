# openIDL utilities

[![Platform](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)

This repository contains scripts for:

* Creating users for the openIDL UI applications
* Creating identities for the Fabric client components (i.e. blockchain identities for application components)
* Generating an access token that can be used to authenticate with the Swagger UIs that are included in the REST API components.
* Resetting and configuring Cloudant database.

## Installing openidl-common-lib npm module 
This repository leverages common functionality from [openidl-common-lib](https://github.com/openidl-org/openidl-main/tree/main/openidl-common-lib) . To install this dependency, replace `{GITHUB_TOKEN}` in `.npmrc` with your own Git personal access token. For details on how to get an access token, please see [Personal access tokens](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token) on the GitHub site. Access Token should have at least `read:packages` permissions

# Pre-requisites
1. Clone this repository to your local system and navigate to the directory where the code was cloned.
2. This repository leverages common functionality from the [openidl-common-lib](https://github.com/openidl-org/openidl-main/tree/main/openidl-common-lib) repository.
3. If you do not have Node.js installed already, [download](https://nodejs.org/en/download/releases/) and install Node.js v14.17.x (please note that other Node.js versions may not be compatible with this codebase). Also, make sure that the npm version you have is v6.14.x.
4. Execute the following command to install the required Node.js dependencies:

		npm install


## Components

* ### [Creating users for the openIDL UI applications](/server/app/README.md)

* ### [Creating identities for the Fabric client components (registration and enrollment)](/server/fabric/README.md)

* ### [Resetting and configuring Cloudant databases](/server/cloudant/README.md)


