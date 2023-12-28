const login = require('./api-helper').login
const buildURL = require('./api-helper').buildURL
const fetch = require('node-fetch');
const logins = require('./config/logins.json')
const config = require('./config/config.json')
const extractionPatterns = require('./data/sampleExtractionPatterns.json')

async function loadExtractionPatterns(apiUrl, listOfPatterns, token) {
    for (extractionPattern of listOfPatterns) {
        try {
            console.log("Calling API to create extraction pattern")
            let response = await fetch(apiUrl + "openidl/api/create-extraction-pattern", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    authorization: "Bearer " + token,
                },
                body: JSON.stringify(extractionPattern),
            });
            if (response.status !== 200) {
                console.log(response)
                if (response.status !== 504) {
                    process.exit(0)
                }
            }
        } catch (error) {
            console.log("Error with post of extraction pattern " + error);
            return;
        }
    }
}

async function processDataCalls() {
    let baseURL = buildURL(config, 'openidl-aais-apps', 'utilities-service')
    let userToken = await login(baseURL, logins.statAgent.username, logins.statAgent.password)
    console.log(userToken)
    baseURL = buildURL(config, 'openidl-aais-apps', 'data-call-app-service')
    await loadExtractionPatterns(baseURL, extractionPatterns, userToken)
}

processDataCalls()
