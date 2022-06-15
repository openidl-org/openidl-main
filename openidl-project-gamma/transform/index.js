const MongoDBManager = require('../../openidl-extraction-pattern-developer/service/mongo-database-manager');
const conn = require('../../openidl-extraction-pattern-developer/connection.json');
const { syncBuiltinESMExports } = require('module');
var manager = new MongoDBManager({ url: 'mongodb://localhost:27017' });
const fs = require('fs')

const dbName = conn.dbName;
//const filterPolicy = "A131 779" //big
const filterPolicy = 'A135 261'; //small
const collection = 'insurance';
console.log('start');

async function find(dbManager, policyIdentifier, dbName, collection) {
	query = { 'Policy.PolicyIdentifier': policyIdentifier };
	let records = await dbManager.getRecords(dbName, collection, query);
	//console.log('records length: ' + records.length);
	return records;
}

async function checkPresent(dbManager, dbName, collection, query) {
	// console.log('check present query: ');
	// console.table(query)
	let records = await dbManager.getRecords(dbName, collection, query);
	console.log('check records length: ' + records.length);
	if (records.length > 0) {
		return true;
	}
	return false;
}

async function checkTargetPolicy(
	dbManager,
	dbName,
	collection,
	policyIdentifier
) {
	query = { PolicyIdentifier: policyIdentifier };
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
	let policy = makePolicy(idmPolicy);
	//console.table(policy)
	await dbManager.loadData([policy], dbName, collection);
}

function makePolicy(idmPolicy) {
	target = {};
	target['PolicyIdentifier'] = idmPolicy.Policy.PolicyIdentifier;
	target['State'] = idmPolicy.Policy.State;
	personalAuto = {
		ZipCode: idmPolicy.Policy.ZipCode,
		ZipCodeSuffix: idmPolicy.Policy.ZipCodeSuffix
	};
	personalAuto['Coverages'] = makeCoverage(idmPolicy);
	target['PersonalAuto'] = personalAuto;
	//console.table(target)
	return target;
}

function makeCoverage(idmPolicy) {
	coverageCode = idmPolicy.Coverage.CoverageCode;
    console.log('coverage code: '+coverageCode) // 1
	coverageCategory = idmPolicy.Coverage.CoverageCategory;
	coverage = idmPolicy.Coverage.Coverage
	coverages = { [coverageCode]: {"CoverageCategory": coverageCategory, "Coverage": coverage}};
    console.table(idmPolicy['Coverage'])
	console.table(coverages);
    return coverages;
}

function makeCoverageRecord(idmPolicy){
    coverageRecords = {}
    
}


async function awaitFunction(dbManager, policy, dbName, collection) {
	await dbManager.connect();
	let records = await find(dbManager, policy, dbName, collection);
	let count = 0;
	for (let idmRecord of records) {
		let policyIdentifier = idmRecord.Policy.PolicyIdentifier;
		const tgt_collection = 'policy';
        let policy = makePolicy(idmRecord)
        console.table(policy)
        fs.writeFileSync('policy.json', JSON.stringify(policy))


		// let present = await checkTargetPolicy(
		// 	dbManager,
		// 	dbName,
		// 	tgt_collection,
		// 	policyIdentifier
		// );
		console.log('Policy: ' + policyIdentifier + ' is present: ' + present);
		if (present) {
			console.log('append');
		}

		if (!present) {
			console.log('add');
			// await insertNewPersonalAutoPolicy(
			// 	dbManager,
			// 	dbName,
			// 	'policy',
			// 	record
			// );
		}
		// count = count + 1;
		// console.log('count ' + count);
		// if (count > 1) {
		// 	break;
		// }
        break
	}
	await dbManager.disconnect();
}

awaitFunction(manager, filterPolicy, dbName, collection);
