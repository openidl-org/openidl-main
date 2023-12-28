# openidl local reference implementation

use this project to run the services for loading samples etc

1. setup the environment by installing dependencies and creating a proxy
1. set environments with `set-environment.js`
1. load insurance data with `load-insurance-data.js`
1. load data calls with `load-data-calls.js`
1. load extraction patterns with `load-extraction-patterns.js`

## Setup

change directory to the openidl-local-reference-implementation folder `cd openidl-local-reference-implementation`

install the javascript client `npm install @kubernetes/client-node`

install node fetch with `npm install node-fetch@2`

start the proxy to the minikube `kubectl proxy --port=9090 &`

the kubernetes api reference is here: https://kubernetes.io/docs/reference/

### setup for cognito

-   login as the root user in your account and create an access key and secret
    -   put these credentials into the config-secrets.json in the step below
-   create a user pool and starting user per the document: `Local Reference Implementation.docx`

update the cognito config files to point to your cognito

copy the config-secrets-template.json file to the .gitignore d file config-secrets.json in the config directory

fill out the values in that file

update the logins.json to point to your users in cognito

run `make copy_secrets`

go to `../` and start the reference implementation system with `./systemup.sh`

## Set environment

everytime you rebuild the minikube and reset the internals do this

then run `make set_environment`

this will create the config.json file in the config directory used by other scripts in this project

## Bootstrap the data

to add initial data, run `make bootstrap`

these con be don individually with the following

run `make load_insurance_data`

this will load data into the data store setup for the system

run `make load_data_calls`

this will load some sample data calls

run `make load_extraction_patterns`

this will load some sample extraction patterns

## Run the applications

go up to the base directory and run the make commands from there:

`make run_ui to open the aais ui`
`make run_analytics_ui to run analytics ui`
`make run_carrier_ui to run carrier ui`
