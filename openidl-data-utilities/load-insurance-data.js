const login = require('./api-helper').login
const buildURL = require('./api-helper').buildURL
const fetch = require('node-fetch');
const logins = require('./config/logins.json')
const config = require('./config/config.json')
const fs = require('fs')

function buildPayload(records) {
    let payload = {
        "records": [],
        "sourceId": config.sourceId,
        "batchId": config.batchId,
        "chunkId": config.chunkId,
        "carrierId": config.carrierId,
        "policyNo": "91111111",
        "errFlg": false,
        "errrLst": [],
        "SquenceNum": 1001,
        "_id": "9sample"
    }
    for (record of records) {
        record.chunkId = config.chunkId
        record.chunkid = config.chunkId
        // console.log('new record')
        // console.log(JSON.stringify(record))
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

async function writeInsuranceDataToFileSystem(payload) {
    fs.writeFileSync('payload.json', JSON.stringify(payload))
}


let commandArgs = process.argv.slice(2)
let dryRunArg = commandArgs[0]
let dryRun = (dryRunArg && (dryRunArg === 'dry-run' || dryRunArg === 'true'))

console.log(commandArgs)
console.log('dryRun: ' + dryRun)

async function processRecords(dryRun) {
    let baseURL = buildURL(config, 'carrier', 'utilities')
    let userToken = await login(baseURL, logins.admin.username, logins.admin.password)
    // console.log(userToken)
    console.log(`File Name: ${config.loadDataPath}`)
    baseURL = buildURL(config, 'carrier', 'insurance-data-manager')
    let dataToLoad = JSON.parse(fs.readFileSync(config.loadDataPath))
    // console.log(JSON.stringify(dataToLoad))
    for (chunk of dataToLoad) {
        for (record of chunk.records) {
            record.chunkId = chunk.chunkId
            let payload = buildPayload(dataToLoad)
        }
        if (dryRun) {
            writeInsuranceDataToFileSystem(chunk)
        } else {
            await loadInsuranceData(baseURL, chunk, userToken)
        }
    }
}

processRecords(dryRun)
