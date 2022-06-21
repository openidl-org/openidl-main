const MongoDBManager = require('./service/mongo-database-manager')
const conn = require('./connection.json')
const dbName = conn.dbName
const collectionName = conn.collectionName
const testData2 = require('../../con-data/auto.json').records
//const testData = require('./test/data/trivialSampleData.json').records
//console.log(testData);

console.log(testData2);

function removeError(payload){
    let clean = []
    let count = 0
    for (let record of payload){
        if (!record['Error']){
            clean.push(record)
        }
        if (record['Error']){
            count=count+1
        }
    }
    console.log('removeError | Sucess: '+clean.length+' error count: '+count)
    return clean
}

async function loadData(dbManager, dbName, collectionName, data) {
    let clean = removeError(data)
    await dbManager.connect()
    await dbManager.useDatabase(dbName).catch((err) => { throw err })
    await dbManager.dropCollection(collectionName).catch((err) => { throw err })
    await dbManager.loadData(clean, dbName, collectionName)
}

var manager = new MongoDBManager({ url: "mongodb://localhost:27017" })

loadData(manager, dbName, collectionName, testData2).then(() => {
    console.log("Done")
    process.exit()
})


