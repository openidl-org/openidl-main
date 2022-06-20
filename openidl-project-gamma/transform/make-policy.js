const MongoDBManager = require('../../openidl-extraction-pattern-developer/service/mongo-database-manager');
const conn = require('../../openidl-extraction-pattern-developer/connection.json');
const { syncBuiltinESMExports } = require('module');
var manager = new MongoDBManager({ url: 'mongodb://localhost:27017' });
const fs = require('fs');
const util = require('util');
var help = require('./helper')

const dbName = conn.dbName;
//const filterPolicy = "A131 779" //big
const filterPolicy = 'A135 261'; //small
const collection = 'insurance';


async function find(dbManager, dbName, collection, query) {
	let records = await dbManager.getRecords(dbName, collection, query);
	//console.log('records length: ' + records.length);
	return records;
}


function makeVehicle(idmPolicy){
	let val= help.makeVehicle(idmPolicy)
	return val
}

function makeCoverageIDM(idmPolicy) {
	return help.makeCoverageIDM(idmPolicy)
}

// function makeCoverageRecord(idmPolicy) {
// 	return help.makeCoverageRecord(idmPolicy)
// }

function makeAutoPolicy(idmPolicy) {
	let target = {};
	target['PolicyIdentifier'] = idmPolicy.Policy.PolicyIdentifier;
	target['State'] = idmPolicy.Policy.State;
	target["LineOfBusiness"]= idmPolicy.Policy.LineOfBusiness
    target["Subline"]= idmPolicy.Policy.Subline
    target["SublineCategory"]= idmPolicy.Policy.SublineCategory,
	
	target['Vehicle'] = makeVehicle(idmPolicy)
	target['Coverages'] = makeCoverageIDM(idmPolicy)
	// console.log('target')
	// console.table(target)
	// console.log('coverages')
	// console.table(target['Coverages'])

	return target;
}


async function awaitFunction(dbManager, filterPolicy, dbName) {
	await dbManager.connect();
	let q1 = { 'Policy.PolicyIdentifier': filterPolicy,  'Policy.LineOfBusiness': 'Auto', 'Policy.Subline': 'Private Passenger Auto', 'Policy.SublineCategory': 'Personal'};
	//let q1 = { };
	let records = await find(dbManager, dbName, 'insurance',q1);
	
	count = 0;
	console.log('records length: '+records.length+' q1: ')
	console.table(q1)
	for (let idmRecord of records) {
		let policyIdentifier = idmRecord.Policy.PolicyIdentifier;
		const tgt_collection = 'policy';
		let policy = makeAutoPolicy(idmRecord);
		console.table(policy)
		fs.writeFileSync(
			'../../../con-data/idm2.json',
			JSON.stringify(policy)
		);
		

		let present = await checkTargetPolicy(
			dbManager,
			dbName,
			tgt_collection,
			policyIdentifier
		);
		console.log('Policy: ' + policyIdentifier + ' is present: ' + present);
		if (present) {
			//get new record from policy table
			// console.log('append')
			// console.table;
			// query = { 'PolicyIdentifier': policyIdentifier };
			let policyRecords = await find(dbManager, dbName, 'policy', query);
			let policyRecord = policyRecords[0];
			// console.table(policyRecord)
			// console.log(policyRecord._id)

			await appendCoverage(dbManager, idmRecord, policyRecord);
		}

		if (!present) {
			console.log('add');
			await insertNewPersonalAutoPolicy(
				dbManager,
				dbName,
				'policy',
				idmRecord
			);
		}

		count = count + 1;
		// if (count == 2){
		//     break
		// }
	}
	await dbManager.disconnect();
}

awaitFunction(manager, filterPolicy, dbName);
