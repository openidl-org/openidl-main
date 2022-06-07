const MongoDBManager = require('./service/mongo-database-manager')
const conn = require('./connection.json')
const dbName = conn.dbName
const collectionName = conn.collectionName
const testData2 = require('../openidl-project-gamma/data/processed/idmPremiumRecords.json').records
//const testData = require('./test/data/trivialSampleData.json').records
//console.log(testData);

console.log(testData2);

async function loadData(dbManager, dbName, collectionName, data) {
    await dbManager.connect()
    await dbManager.useDatabase(dbName).catch((err) => { throw err })
    await dbManager.dropCollection(collectionName).catch((err) => { throw err })
    await dbManager.loadData(testData2, dbName, collectionName)
}

var manager = new MongoDBManager({ url: "mongodb://localhost:27017" })

loadData(manager, dbName, collectionName, testData2).then(() => {
    console.log("Done")
    process.exit()
})


