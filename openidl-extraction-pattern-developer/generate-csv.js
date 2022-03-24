const MongoDBManager = require("./service/mongo-database-manager");
const mongoDBManagerInstance = require('mongodb').MongoClient;
const Parser = require('json2csv')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const config = require('./config/config.json')

async function initializeDBConnection(local = true) {
    connectionURL = config.dbURL
    let dbManager = new MongoDBManager({ url: connectionURL });
    await dbManager.connect()
    return dbManager
}

async function generateCSV(dbManager, dbName, collectionName, outputFileName, useLocal) {
    console.log("Connecting");
    try {
        // let dbManager = await initializeDBConnection(useLocal);
        // no need to connect when using ibm cloud connection
        // await dbManager.connect();
        console.log("Using database: " + dbName);
        await dbManager.useDatabase(dbName).catch((err) => {
            throw err;
        });
        let reduced = await dbManager.getAllRecords(dbName, collectionName);

        let csv = ''
        let increment = 100000
        if (reduced.length < increment) {
            csv = convertToCSV(reduced)
            fs.writeFileSync(outputFileName, csv, (err) => {
                if (err) {
                    console.log('Error writing csv file: ' + err)
                }
            })
        } else {
            let i = 0
            do {
                let increments = reduced.length / increment
                csv = convertToCSV(reduced.slice(i * increment, (i + 1) * increment))
                i++
                fs.writeFileSync(`${outputFileName}.${i.toString()}.csv`, csv, (err) => {
                    if (err) {
                        console.log('Error writing csv file: ' + err)
                    }
                })
            } while (i * increment < reduced.length)
        }

    } catch (err) {
        throw err;
    }
}

function convertToCSV(json) {
    let rows = []
    for (let item of json) {
        let row = {}
        for (let field in item['_id']) {
            row[field] = item['_id'][field]
        }
        for (let field in item.value) {
            row[field] = item.value[field]
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

// let dbName = "covid-report";
// let collectionName = "hds-data";
// let reductionName = "hds-report-input";
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
        await generateCSV(dbManager, databaseName, reductionName, outputFile, useLocal)
    }
    process.exit(0)
}

processThem()

