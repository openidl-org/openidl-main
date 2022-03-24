/**
 * Generate ND Report
 * 
 * Get all the insured vins from the result of the extraction patterns.
 * Compare them with the vins that are registered.
 * The vins are compared in their hash version.
 */
 const crypto = require('crypto')
 const MongoDBManager = require("./service/mongo-database-manager");
const mongoDBManagerInstance = require('mongodb').MongoClient;
const Parser = require('json2csv')
const fs = require('fs')
const config = require('./config/config.json')
const registeredVINs = require('./test/data/registered-vins.json')

async function initializeDBConnection(local = true) {
    connectionURL = config.dbURL
    let dbManager = new MongoDBManager({ url: connectionURL });
    await dbManager.connect()
    return dbManager
}

async function collectInsuredVINs(dbManager, dbName, collectionName, outputFileName, useLocal) {
    console.log("Connecting");
    let reducedVINs = []
    try {
        // let dbManager = await initializeDBConnection(useLocal);
        // no need to connect when using ibm cloud connection
        // await dbManager.connect();
        console.log("Using database: " + dbName);
        await dbManager.useDatabase(dbName).catch((err) => {
            throw err;
        });
        let reduced = await dbManager.getAllRecords(dbName, collectionName);
        
        // console.log(reduced)
        for (reducedObject of reduced) {
            reducedVINs.push(reducedObject['_id'].vin)
        }
        // fs.writeFileSync('./test/' + collectionName + '.json', JSON.stringify(reduced), (err) => {
        //     if (err) {
        //         console.log('Error writing reduced file: ' + err)
        //     }
        // })

    } catch (err) {
        throw err;
    }
    return reducedVINs
}

function hashString(text) {
    let shasum = crypto.createHash('sha1')
    shasum.update(text)
    return shasum.digest('hex')
};

function convertToCSV(json) {
    let rows = []
    for (let item of json) {
        let row = {}
        for (let field in item) {
            row[field] = item[field]
        }
        rows.push(row)
    }
    console.log('rows ' + rows.length)
    const fields = Object.keys(rows[0])
    console.log('fields ' + fields.length)
    const opts = { fields }

    let csv = null
    try {
        const parser = new Parser.Parser(opts)
        csv = parser.parse(rows)
    } catch (err) {
        console.error(err);
    }
    return csv
}

let allInsuredVINs = []

async function processThem() {
    let dbManager = await initializeDBConnection(false);
    let databaseName = config.dbName
    let carrierNames = ['trvi','car1','car2']
    for (carrierName of carrierNames) {
        let carrierConfig = config[carrierName]
        let collectionName = carrierConfig.collectionName;
        let reductionName = carrierConfig.reductionName;
        
        let outputFile = 'test/' + carrierConfig.reductionName + '.csv'
        
        let useLocal = true
        
        console.log("Generating CSV");
        let insuredVINs = await collectInsuredVINs(dbManager, databaseName, reductionName, outputFile, useLocal)
        for (insuredVIN of insuredVINs) {
            allInsuredVINs.push(insuredVIN)
        }

    }
    console.log(allInsuredVINs)
    fs.writeFileSync('./test/allInsuredVINs.json', JSON.stringify(allInsuredVINs), (err) => {
        if (err) {
            console.log('Error writing all insured VINs file: ' + err)
        }
    })

    let report = []
    for (registeredVIN of registeredVINs) {
        let registeredVINHash = hashString(registeredVIN)
        if (allInsuredVINs.includes(registeredVINHash)) {
            report.push({"insured":"Yes","vin":registeredVIN})
        } else {
            report.push({"insured":"No","vin":registeredVIN})
        }
    }

    let csv = convertToCSV(report)

    fs.writeFileSync('./test/report.csv', csv, (err) => {
        if (err) {
            console.log('Error writing report file: ' + err)
        }
    })

    process.exit(0)
}

processThem()

