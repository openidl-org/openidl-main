# Angular 12 local development guide

## Introduction

The `openidl-ui-workspace` folder structure is based on the default **Angular Library** folder structure. The `openidl-common-ui` is the Angular Library project. The `openidl-ui` and `openidl-carrier-ui` are Angular Apps that consume the `openidl-common-ui` library.

More info is available here https://angular.io/guide/creating-libraries

# How to add new components or services to the openidl-common-ui library?

To generate new components or services in the library run the below command inside the `openidl-ui-workspace` folder.

```
ng generate component component-name --project openidl-common-ui
```

More info about code scaffolding is located under [`projects\openidl-common-ui\README.md`](/projects/openidl-common-ui/README.md) file.

# How to debug UI and Library projects locally?

The Angular UI projects like openidl-ui builds/dist are served as static resources via express js server and that runs on a different port `8080` whereas Angular dev server, by default, runs on `4200`.

All API request is first sent to express js server and then internally forwarded to Hosted APIs. To achieve a similar API flow during development we need to proxy app API requests from UI (4200) to the express js server (8080) port. Angular provides port forwarding and details can be found in the `proxy.conf.json` file of the root directory.

> Note: Inside `projects\openidl-ui\server\index.js` file there is logic to redirect all HTTP calls to HTTPS if `NODE_ENV` is set to `production`. To make this work we will need an `OpenSSL` certificate. To bypass this requirement for local development we have an npm package called `dotenv` which can load NODE environment variables from `.env` files. Inside the `openidl-ui-workspace` folder create a `.env` file and add the following `NODE_ENV='development'` for local development. If you are serving generated build from dist folder then use `NODE_ENV='qa'`. We don’t need this file in a production environment, hence this file is added in `.gitigonore`.

All commands must be executed from inside the `openidl-ui-workspace` folder.

NOTE: when testing as multiple users, use the firefox browser with the Multi-Account Containers plugin

Before doing anything, update .npmrc file with your github token

## How to debug openidl-ui locally?

Then run `npm install`

Be sure to provide all the necessary configuration files in the server/config directory. These can be retrieved from kubernetes secrets.

Execute the following commands.

1. Execute `npm run watch` command to run `openidl-common-ui` Angular Library in watch mode. Angular will detect any code changes and rebuild it while debugging.
2. Execute `npm run start:aais` command to launch an express server on `8080` port. If you want to use different port number then update port # in `openidl-ui-workspace\projects\openidl-ui\server\config\mappings.json` file.
    > If you are updating the port # from 8080 to something else then you need to update same port # in `openidl-ui-workspace\proxy.conf.json` file as well. Angular uses this file to proxy all API calls from 4200 to 8080.
3. Execute `npm run serve:aais` command to launch `openidl-ui` on port `4200` port.

## How to debug openidl-carrier-ui locally?

Execute the following commands.

1. Execute `npm run watch` command to run `openidl-common-ui` Angular Library in watch mode. Angular will detect any code changes and rebuild it while debugging.
2. Execute `npm run start:carrier` command to launch an express server on `8080` port. If you want to use different port number then update port # in `openidl-ui-workspace\projects\openidl-carrier-ui\server\config\mappings.json` file.
    > If you are updating the port # from 8080 to something else then you need to update same port # in `openidl-ui-workspace\proxy.conf.json` file as well. Angular uses this file to proxy all API calls from 4200 to 8080.
3. Execute `npm run serve:carrier` command to launch `openidl-carrier-ui` on port `4200` port.

# Production Release

To generate a production build, first we need to build the `openidl-common-ui` library and then build UI projects. We have below npm scripts in package.json to do so.

> Note: Set NODE_ENV to `production` in the .env file of root directory.

-   The `npm run build:common` will generate an openidl-common-ui library inside the `dist\openidl-common-ui` folder. This build folder will be used in other two UI projects while generating prod build.

## Building openidl-ui production build

1. The `npm run build:aais` command will generate the openidl-ui App inside the `dist\openidl-ui` folder.
2. Once the above steps are executed successfully now we can run `npm run start:regulator` to start node API on `8080` port. This will serve prod build from `dist\openidl-ui`.

## Building openidl-carrier-ui production build

1. The `npm run build:carrier` command will generate the openidl-carrier-ui App inside the `dist\openidl-carrier-ui` folder.
2. Once the above steps are executed successfully now we can run `npm run start:carrier` to start node API on `8080` port. This will serve prod build from `dist\openidl-carrier-ui`.
