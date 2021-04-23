//
// SPDX-License-Identifier: Apache-2.0
//
const MongoDBManager = require('./service/mongo-database-manager')
const dbName = 'covid-report'
const collectionName = 'hds-data'
const testData = require('./test/data/testCovidDataSDMA.json')

async function loadData(dbManager, dbName, collectionName, data) {
    await dbManager.connect()
    await dbManager.useDatabase(dbName).catch((err) => { throw err})
    await dbManager.dropCollection(collectionName).catch((err) => { throw err })
    await dbManager.loadData(testData, dbName, collectionName)
}

var manager = new MongoDBManager({url:"mongodb://localhost:27017"})

loadData(manager, dbName, collectionName, testData).then(() => {
    console.log("Done")
    process.exit()
})


