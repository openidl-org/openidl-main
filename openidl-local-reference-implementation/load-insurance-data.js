const login = require('./api-helper').login
const buildURL = require('./api-helper').buildURL
const fetch = require('node-fetch');
const logins = require('./config/logins.json')
const config = require('./config/config.json')
const sampleData = require('./data/sampleInsuranceData.json')

function buildPayload(records) {
    let payload = {
        "records": [],
        "sourceId": "9sample_ks",
        "batchId": "91111",
        "chunkId": "911111001",
        "carrierId": "KS",
        "policyNo": "91111111",
        "errFlg": false,
        "errrLst": [],
        "SquenceNum": 1001,
        "_id": "9sample_ks"
    }
    for (record of records) {
        payload.records.push(record)
    }
    return payload;
}
async function loadInsuranceData(apiUrl, payload, token) {
    try {
        console.log("Calling API with batch: ", payload.batchId)
        let response = await fetch(apiUrl + "openidl/api/load-insurance-data", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer " + token,
            },
            body: JSON.stringify(payload),
        });
        if (response.status !== 200) {
            console.log(response)
            if (response.status !== 504) {
                process.exit(0)
            }
        }
    } catch (error) {
        console.log("Error with post of insurance data " + error);
        return;
    }
}

async function processRecords() {
    let baseURL = buildURL(config, 'openidl-aais-apps', 'utilities-service')
    let userToken = await login(baseURL, logins.statAgent.username, logins.statAgent.password)
    console.log(userToken)
    baseURL = buildURL(config, 'openidl-aais-apps', 'insurance-data-manager-service')
    let payload = buildPayload(sampleData.records)
    await loadInsuranceData(baseURL, payload, userToken)
}

processRecords()
