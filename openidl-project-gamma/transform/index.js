const MongoDBManager = require('../../openidl-extraction-pattern-developer/service/mongo-database-manager');
const conn = require('../../openidl-extraction-pattern-developer/connection.json');
var manager = new MongoDBManager({ url: 'mongodb://localhost:27017' });

const dbName = conn.dbName;
//const filterPolicy = "A131 779" //big
const filterPolicy = 'A135 261'; //small
const collection = 'insurance';

async function find(dbManager, policyIdentifier, dbName, collection) {
	await dbManager.connect();
	query = { 'Policy.PolicyIdentifier': policyIdentifier };
	let records = await dbManager.getRecords(dbName, collection, query);
	await dbManager.disconnect();
	console.log('records length: ' + records.length);
	return records;
}

async function checkPresent(dbManager, dbName, collection, query) {
	await dbManager.connect();
	console.log('check present query: ' + query);
	let records = await dbManager.getRecords(dbName, collection, query);
	await dbManager.disconnect();
	if (records.length > 0) {
		return true;
	}
	return false;
}

async function checkPolicy(dbManager, dbName, collection, policyIdentifier) {
	query = { 'Policy.PolicyIdentifier': policyIdentifier };
	let val = await checkPresent(dbManager, dbName, collection, query);
	return val;
}

async function checkPersonalAutoCoverage(
	dbManager,
	dbName,
	collection,
	coverageCode
) {
	query = { 'PersonalAuto.Coverages': coverageCode };
	let val = await checkPresent(dbManager, dbName, collection, query);
	return val;
}

async function insertNewPersonalAutoPolicy(
	dbManager,
	dbName,
	collection,
	idmPolicy
) {
    let policy = makePolicy(idmPolicy)
	await dbManager.connect()
	await dbManager.loadData(policy,dbName,collection)
    await dbManager.disconnect()
}

function makePolicy(idmPolicy){
    target = {};
	target['PolicyIdentifier'] = idmPolicy.Policy.PolicyIdentifier;
	target['State'] = idmPolicy.Policy.State;
	personalAuto = {
		ZipCode: idmPolicy.Policy.ZipCode,
		ZipCodeSuffix: idmPolicy.Policy.ZipCodeSuffix
	};
	personalAuto['Coverages'] = makeCoverage(idmPolicy);
	target['PersonalAuto'] = personalAuto;
    console.table(target)
    return target;
}

function makeCoverage(idmPolicy){
    coverageCode = idmPolicy.Coverage.CoverageCode;
	coverageCategory = idmPolicy.Coverage.CoverageCategory;
	coverage = idmPolicy.Coverage.Coverage;
	coverages = { coverageCode: coverageCategory, Coverage: coverage };
    return coverages

}

async function awaitFunction(dbManager, policy, dbName, collection) {
	let records = await find(dbManager, policy, dbName, collection);
	for (let record of records) {
		let target = {};
		let policyIdentifier = record.Policy.PolicyIdentifier;

		const tgt_collection = 'policy';
		let present = await checkPolicy(
			dbManager,
			dbName,
			tgt_collection,
			policyIdentifier
		);
		if (present) {
			console.log('append');
		}

		if (!present) {
			insertNewPersonalAutoPolicy(dbManager, dbName, 'policy', record);
		}
	}
}

awaitFunction(manager, filterPolicy, dbName, collection);
