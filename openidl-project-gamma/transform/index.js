const MongoDBManager = require('../../openidl-extraction-pattern-developer/service/mongo-database-manager');
const conn = require('../../openidl-extraction-pattern-developer/connection.json');
const { syncBuiltinESMExports } = require('module');
var manager = new MongoDBManager({ url: 'mongodb://localhost:27017' });
const fs = require('fs')

const dbName = conn.dbName;
//const filterPolicy = "A131 779" //big
const filterPolicy = 'A135 261'; //small
const collection = 'insurance';




async function find(dbManager, dbName, collection, query,) {
	let records = await dbManager.getRecords(dbName, collection, query);
	//console.log('records length: ' + records.length);
	return records;
}


async function checkPresentValue(dbManager, dbName, collection, query) {
	// console.log('check present query: ');
	//console.table(query)
	let records = await dbManager.getRecords(dbName, collection, query);
	//console.log('check records length: ' + records.length);
	if (records.length > 0) {
		return true;
	}
	return false;
}

async function checkPresentKey(dbManager, dbName, collection, key) {
    let query = {[key]: {$exists:true}}
	//console.table(query)
	let records = await dbManager.getRecords(dbName, collection, query);
	//console.log('check records length: ' + records.length);
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
	let val = await checkPresentValue(dbManager, dbName, collection, query);
	return val;
}


function checkPersonalAutoCoverage(policyRecord, coverageCode){
	console.table(policyRecord)
	let coverageCodes = policyRecord.PersonalAuto.Coverages.keys
	if (coverageCode in coverageCodes){
		return true
	}
	return false
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
	let target = {};
	target['PolicyIdentifier'] = idmPolicy.Policy.PolicyIdentifier;
	target['State'] = idmPolicy.Policy.State;

    personalAuto = makePersonalAuto(idmPolicy)
	target['PersonalAuto'] = personalAuto;
	//console.table(target)
	return target;
}

function makePersonalAuto(idmPolicy){
    let personalAuto = {
		ZipCode: idmPolicy.Policy.ZipCode,
		ZipCodeSuffix: idmPolicy.Policy.ZipCodeSuffix
	};
    personalAuto['Coverages'] = makeCoverage(idmPolicy);
    return personalAuto;
}

function makeCoverage(idmPolicy) {
	let coverageCode = idmPolicy.Coverage.CoverageCode;
    //console.log('coverage code: '+coverageCode) // 1
	let coverageCategory = idmPolicy.Coverage.CoverageCategory;
	let coverage = idmPolicy.Coverage.Coverage
    let record = makeCoverageRecord(idmPolicy)

	let coverages = { [coverageCode]: {"CoverageCategory": coverageCategory, "Coverage": coverage, "CoverageRecords": [record]}}
    // console.table(idmPolicy['Coverage'])
	// console.table(coverages);
    return coverages;
}

function makeCoverageRecord(idmPolicy){
    let target = {}
    target['AccountingDate'] = idmPolicy.Policy.AccountingDate
    target['PremiumAmount'] = idmPolicy.Policy.PremiumAmount
    target['LiabilityLimitsName'] = idmPolicy.Coverage.LiabilityLimitsName
    target['LiabilityLimitsAmount'] = idmPolicy.Coverage.LiabilityLimitsAmount
    target['Exposure'] = idmPolicy.Coverage.Exposure
    target['MonthsCovered'] = idmPolicy.Coverage.MonthsCovered
    target['SingleMultiCarRating'] = idmPolicy.Coverage.SingleMultiCarRating
    target['Terrorism'] = idmPolicy.Coverage.Terrorism
    target['Packaging'] = idmPolicy.Coverage.Packaging
    target['PoolAffiliation'] = idmPolicy.Coverage.PoolAffiliation 
    target['UMUIMStacking'] = idmPolicy.Coverage.UMUIMStacking
    target['PassiveRestraintDiscount'] = idmPolicy.Coverage.PassiveRestraintDiscount
    target['AntiLockBrakesDiscount'] = idmPolicy.Coverage.AntiLockBrakesDiscount
    target['DefensiveDriverDiscount'] = idmPolicy.Coverage.DefensiveDriverDiscount
    
    //console.table(target)
    return target
}

function checkPersonalAuto(idmRecord){
    //console.table(idmRecord.Coverage)

    let lineOfBusiness = idmRecord.Policy.LineOfBusiness
    let subline = idmRecord.Policy.Subline
    let sublineCategory = idmRecord.Policy.SublineCategory

    if (lineOfBusiness =='Auto') {
        //console.log('auto +')
        if (subline == "Private Passenger Auto"){
          //  console.log('subline')
            if (sublineCategory=="Personal") {
              //  console.log('Personal')
                return true
            }
        }
    } 
    return false
}

async function appendCoverage(dbManager, dbName, collection, idmRecord,policyRecord){

    let personalAutoPresent = checkPersonalAuto(idmRecord)
    //console.log('personal auto present: ' +personalAutoPresent)
    let new_coverage = idmRecord.Coverage.CoverageCode

    if (personalAutoPresent){
        console.log(idmRecord.Policy.PolicyIdentifier+' personal auto exists')
        //check coverage
        let coverage_present = checkPersonalAutoCoverage(dbManager,dbName,collection,policyRecord) //start from here, 
        //should be a simple check above db to see if its there. 
        let coverage = makeCoverage(idmRecord)
        if (coverage_present){
            console.log('append')
            policyRecord['Coverages'][coverageCode]['CoverageRecords'].push(coverage) 
        }
        if (!coverage_present){
            console.log('add new coverage')
            policyRecord['Coverages'][coverageCode]['CoverageRecords'] = [coverage]
        }
        console.log('before update')
        await dbManager.updateData(policyRecord,'PolicyIdentifier',policyRecord.PolicyIdentifier,'Policy')
    }
   
}

async function awaitFunction(dbManager, filterPolicy, dbName) {
	await dbManager.connect();
	let q1 = { 'Policy.PolicyIdentifier': filterPolicy };
    let records = await find(dbManager, dbName, 'insurance', q1);
	
    for (let idmRecord of records) {
		let policyIdentifier = idmRecord.Policy.PolicyIdentifier;
		const tgt_collection = 'policy';
        let policy = makePolicy(idmRecord)
        //console.table(policy)
        fs.writeFileSync('../../../con-data/policy.json', JSON.stringify(policy))

		let present = await checkTargetPolicy(
			dbManager,
			dbName,
			tgt_collection,
			policyIdentifier
		);
		console.log('Policy: ' + policyIdentifier + ' is present: ' + present);
		if (present) {
            //get new record from policy table
            console.log('append');
            query = { 'PolicyIdentifier': policyIdentifier };
            let policyRecord = await find(dbManager,dbName,'policy',query)

            console.table(policyRecord)
            console.log('^append')

            await appendCoverage(dbManager,dbName,'policy',idmRecord,policyRecord)
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
		// count = count + 1;
		// console.log('count ' + count);
		// if (count > 1) {
		// 	break;
		// }
        break
	}
	await dbManager.disconnect();
}

awaitFunction(manager, filterPolicy, dbName);
