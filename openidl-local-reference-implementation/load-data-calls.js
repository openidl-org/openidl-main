const login = require('./api-helper').login
const buildURL = require('./api-helper').buildURL
const fetch = require('node-fetch');
const logins = require('./config/logins.json')
const config = require('./config/config.json')
const dataCalls = require('./data/sampleDataCalls.json')

async function loadDataCalls(apiUrl, listOfCalls, token) {
    for (dataCall of listOfCalls) {
        try {
            console.log("Calling API to create data call")
            let response = await fetch(apiUrl + "openidl/api/data-call", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    authorization: "Bearer " + token,
                },
                body: JSON.stringify(dataCall),
            });
            if (response.status !== 200) {
                console.log(response)
                if (response.status !== 504) {
                    process.exit(0)
                }
            }
        } catch (error) {
            console.log("Error with post of datat call " + error);
            return;
        }
    }
}

async function processDataCalls() {
    let baseURL = buildURL(config, 'openidl-aais-apps', 'utilities-service')
    let userToken = await login(baseURL, logins.regulator.username, logins.regulator.password)
    console.log(userToken)
    baseURL = buildURL(config, 'openidl-aais-apps', 'data-call-app-service')
    await loadDataCalls(baseURL, dataCalls, userToken)
}

processDataCalls()
