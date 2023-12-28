const MongoDBManager = require("./service/mongo-database-manager");
const mongoDBManagerInstance = require('mongodb').MongoClient;
const Parser = require('json2csv')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

async function initializeDBConnection(local = true) {
    if (local) {
        connectionURL = "mongodb://localhost:27017"
        let dbManager = new MongoDBManager({ url: connectionURL });
        await dbManager.connect()
        return dbManager
    } else {
        const mongoconfig = JSON.parse(process.env.OFF_CHAIN_DB_CONFIG);
        const ca = mongoconfig.connection.mongodb.certificate.certificate_base64;
        console.log('ca ' + ca)

        const options = {
            ssl: true,
            sslValidate: false,
            sslCA: ca,
            useNewUrlParser: true,
            useUnifiedTopology: true
        };
        const connectionString = mongoconfig.connection.mongodb.composed[0];
        const mongoDBClient = await mongoDBManagerInstance.connect(connectionString, options);
        let dbManager = new MongoDBManager({ url: 'none' })
        dbManager.setClient(mongoDBClient)
        return dbManager
    }
}

async function generateCSV(dbName, collectionName, outputFileName, useLocal) {
    console.log("Connecting");
    try {
        let dbManager = await initializeDBConnection(useLocal);
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
let databaseName = "openidl-offchain-db-ppp-any-nr";
let collectionName = "insurance_trx_db_any";
let reductionName = 'any_covid_data_all';

let outputFile = 'covid-output/covid-output-any-ppp-all-nr.csv'

let useLocal = true

console.log("Generating CSV");
generateCSV(databaseName, reductionName, outputFile, useLocal).then(() => {
    process.exit(0);
});
