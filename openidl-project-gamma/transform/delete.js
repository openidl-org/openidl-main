const MongoDBManager = require('../../openidl-extraction-pattern-developer/service/mongo-database-manager');
const conn = require('../../openidl-extraction-pattern-developer/connection.json');
const { syncBuiltinESMExports } = require('module');
var dbManager = new MongoDBManager({ url: 'mongodb://localhost:27017' });

const dbName = conn.dbName;
//const filterPolicy = "A131 779" //big
const filterPolicy = 'A135 261'; //small
const collection = 'insurance';




async function awaitFunction() {
	await dbManager.connect()
	await dbManager.useDatabase(dbName)
	await dbManager.dropCollection('policy')
	await dbManager.disconnect()
}

awaitFunction();
