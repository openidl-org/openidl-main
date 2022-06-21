const MongoDBManager = require('../../openidl-extraction-pattern-developer/service/mongo-database-manager');
const conn = require('../../openidl-extraction-pattern-developer/connection.json');
const { syncBuiltinESMExports } = require('module');
var manager = new MongoDBManager({ url: 'mongodb://localhost:27017' });
const fs = require('fs');
const util = require('util');
var help = require('./helper');

const dbName = conn.dbName;
//const filterPolicy = "A131 779" //big
const filterPolicy = 'A135 261'; //small
const collection = 'insurance';

async function find(dbManager, dbName, collection, query) {
	let records = await dbManager.getRecords(dbName, collection, query);
	//console.log('records length: ' + records.length);
	return records;
}

async function checkPresentRecord(dbManager, dbName, collection, query) {
	// console.log('check present query: ');
	//console.table(query)
	let records = await dbManager.getRecords(dbName, collection, query);
	//console.log('check records length: ' + records.length);
	if (records.length > 0) {
		return true;
	}
	return false;
}

function makeAutoPolicy(idmPolicy) {
	return help.makeAutoPolicy(idmPolicy)
}

function makeCoverageRecord(idmRecord) {
	return help.makeCoverageRecord(idmRecord);
}

async function appendAutoCoverage(dbManager, idmRecord, policyRecord) {
	let newCoverageCode = idmRecord.Coverage.CoverageCode;
	let coverageRecord = makeCoverageRecord(idmRecord);
	let acted = false;
	let present = false

	if (policyRecord['Coverages'][newCoverageCode]) {
		console.log('---existing coverage found: '+newCoverageCode)
		let policyCoverageRecords =policyRecord.Coverages[newCoverageCode]['CoverageRecords'];

		console.log('acted: '+acted)
		// fs.writeFileSync(
		// '../../../con-data/policy-coverage-records.json',
		// JSON.stringify(policyRecord));
		
		
		console.log('coverage record')
		console.table(coverageRecord)
		for (let lcl_coverage of policyCoverageRecords) {
			//console.log('lcl coverage')
			//console.table(lcl_coverage)
			if (
				JSON.stringify(lcl_coverage) ==
				JSON.stringify(coverageRecord)
			) {
				present = true;
				//console.log('	coverage found!')
			}
		}
		if (!present) {
			//console.log('record not present, adding')
			policyRecord['Coverages'][newCoverageCode][
				'CoverageRecords'
			].push(coverageRecord);
			acted = true;
		}
			
		
	}
	
	// fs.writeFileSync(
	// 	'../../../con-data/policy-format.json',
	// 	JSON.stringify(policyRecord)
	// );


	if (!acted) {
		console.log('	New Coverage');

		let newCoverageRecord = {}
		newCoverageRecord['CoverageCategory'] = idmRecord.Coverage.CoverageCategory
		newCoverageRecord['Coverage'] = idmRecord.Coverage.Coverage
		newCoverageRecord['CoverageRecords'] = [coverageRecord]

		policyRecord['Coverages'][newCoverageCode] = newCoverageRecord;
	}
	

	await dbManager.replacePolicyData(
		policyRecord,
		policyRecord.PolicyIdentifier,
		'policy'
	);
}

async function insertNewPersonalAutoPolicy(
	dbManager,
	dbName,
	collection,
	policyRecord
) {

	await dbManager.loadData([policyRecord], dbName, collection);
}

async function awaitFunction(dbManager, filterPolicy, dbName) {
	await dbManager.connect();
	let q1 = {
		'Policy.PolicyIdentifier': filterPolicy,
		'Policy.LineOfBusiness': 'Auto',
		'Policy.Subline': 'Private Passenger Auto',
		'Policy.SublineCategory': 'Personal'
	};
	q1 = { };
	let records = await find(dbManager, dbName, 'insurance', q1);

	count = 0;

	for (let idmRecord of records) {
		let policyIdentifier = idmRecord.Policy.PolicyIdentifier;
		//let coverageCode = idmRecord.Coverage.CoverageCode;
		const tgt_collection = 'policy';
		let policy = makeAutoPolicy(idmRecord);

		let q2 = {
			PolicyIdentifier: policyIdentifier,
			LineOfBusiness: 'Auto',
			Subline: 'Private Passenger Auto',
			SublineCategory: 'Personal'
		};

		let present = await checkPresentRecord(
			dbManager,
			dbName,
			tgt_collection,
			q2
		);

		if (present) {
			let policyRecords = await find(dbManager, dbName, 'policy', q2); //TODO: combine this call with check present
			let policyRecord = policyRecords[0]; //TODO: handle for bad data

			await appendAutoCoverage(dbManager, idmRecord, policyRecord);
		}

		if (!present) {
			console.log('add');
			//v()
			await insertNewPersonalAutoPolicy(
				dbManager,
				dbName,
				'policy',
				policy
			);
		}

		count = count + 1;
		// if (count == 7) {
		// 	break;
		// }
		console.log('\n')
	}
	await dbManager.disconnect();
}

awaitFunction(manager, filterPolicy, dbName);
