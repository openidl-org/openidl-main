const MongoDBManager = require('../../openidl-extraction-pattern-developer/service/mongo-database-manager')
const conn = require('../../openidl-extraction-pattern-developer/connection.json')

const dbName = conn.dbName

policy = "A131 779"

async function find(dbManager,policy){
    await dbManager.connect()
    query = '{"Policy.PolicyIdentifier": "'+policy+'}'
    const val = await dbManager.getRecords(dbName,'insurance',query)
    await dbManager.disconnect()
    console.log('val length: '+val.length)
    
}
var manager = new MongoDBManager({ url: "mongodb://localhost:27017" })
find(manager,policy)