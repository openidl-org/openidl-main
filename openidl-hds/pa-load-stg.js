const config = require('./config/config.json');
const { Pool, Client } = require('pg');
const records =
	require('../../../con-data/Personal_Auto/pa_load_stg.json').records;
const credentials = {
	user: config.db.username,
	host: config.db.host,
	database: config.db.database,
	password: config.db.password,
	port: config.db.port
};

// Accounting Date Functions
function convertAccountingMonth(dateString) {
    return `${dateString.substring(0, 2)}`;
}
function convertAccountingYear(dateString) {
    return `${dateString.substring(2, 3)}`;
}

// Body Style and Body Size Functions
function convertBodyStyle(vehicleClass) {
    return `${vehicleClass.substring(0, 2)}`;
}
function convertBodySize(vehicleClass) {
    return `${vehicleClass.substring(2, 3)}`;
}

// Accident Date Functions
function convertAccidentMonth(dateString) {
    return `${dateString.substring(0, 2)}`;
}
function convertAccidentYear(dateString) {
    return `${dateString.substring(2, 4)}`;
}

function makeInsertQuery(record) {
    // console.log(record.vehicleClass)
    // console.log(`bodyStyle: ${bodyStyle}, bodySize: ${bodySize}`)

    accountingMonth = convertAccountingMonth(record.accountingDate)
    accountingYear = `202${convertAccountingYear(record.accountingDate)}`.slice(-1)  //db only has space for one character

    bodyStyle = convertBodyStyle(record.vehicleClass)
    bodySize = convertBodySize(record.vehicleClass)

    console.log(record.vehicleClass)
    console.log(`bodyStyle: ${bodyStyle}, bodySize: ${bodySize}`)
    console.log('exposure: ' + record.exposure)
    let query = ` 
    INSERT INTO openidl_base_9999.pa_stat_stg 
    (LINE,
    REP_MO,
    REP_YR,
    COMP,
    STATE,
    TERRITORY,
    TRANS,
    PREM_AMT,
    PROG_CD,
    COV_CODE,
    SUBLINE,
    AGE,
    SEX_MARITAL,
    VEHICLE_USE,
    VEHICLE_PERF,
    PENALTY_POINTS,
    LIA_LIM,
    DED_AMT,
    BODY_STYLE,
    BODY_SIZE,
    MODEL_YEAR,
    UM_UIM_MOTORIST,
    EXPOSURE,
    MOS_COV,
    TERRORISM,
    SING_MULT_CAR,
    PACKAGE_ID,
    POOL,
    POLICY_NUM,
    ZIP,
    ZIP_SUFF,
    UM_UIM_STACK_IND,
    SYMBOL,
    PASS_RESTRAINT,
    ANTI_LOCK,
    ANTI_THEFT,
    DEF_DRIVER,
    PIP_LIMIT_DED,
    NJ_PIP_LIMIT,
    NJ_PIP_DED,
    RAT_TERM_ZONE,
    EXP_RATING_MOD,
    EXCEPT_A,
    EXCEPT_B,
    EXCEPT_C,
    EXCEPT_D,
    OPT_ZIP_CD_IND
    )
     VALUES (
        '${record.lineOfInsurance}',
        '${accountingMonth}',
        '${accountingYear}',
        '${record.companyCode}',
        '${record.stateCode}',
        '${record.territory}',
        '${record.transactionCode}',
        '${record.premiumAmount}',
        '${record.program}',
        '${record.coverage}',
        '${record.subline}',
        '${record.operatorsAge}',
        '${record.sexAndMaritalStatus}',
        '${record.vehicleUse}',
        '${record.vehiclePerformance}',
        '${record.privatePassengerDriversTrainingGoodStudent}',
        '${record.privatePassengerPenaltyPoints}',
        '${record.liabilityLimitsAmount}',
        '${record.deductibleAmount}',
        '${bodyStyle}',
        '${bodySize}',
        '${record.modelYear}',
        '${record.uninsuredUnderinsuredMotorist}',
        '${record.exposure}',
        '${record.monthsCovered}',
        '${record.terrorismIndicator}',
        '${record.singleMultiCar}',
        '${record.packageCode}',
        '${record.poolAffiliation}',
        '${record.policyIdentification}',
        '${record.zipCode}',
        '${record.zipCodeSuffix}',
        '${record.umUimStackingIndicator}',
        '${record.symbolCode}',
        '${record.passiveRestraintDiscountCode}',
        '${record.antiLockBrakesDiscountCode}',
        '${record.antiTheftDeviceDiscountCode}',
        '${record.defensiveDriverDiscountCode}',
        '${record.pipLimitsDeductibleCode}',
        '${record.newJerseyPIPLimitsDeductibleCode}',
        '${record.newJerseyDeductible}',
        '${record.rateClassCode}',
        '${record.experienceRatingModificationFactor}',
        '${record.stateExceptionA}',
        '${record.stateExceptionB}',
        '${record.stateExceptionC}',
        '${record.stateExceptionD}',
        '${record.optionalZipCodeIndicator}');
    `;
	return query;
}

function makeLossQuery(record) {
	//LOSS
    
	//console.table(record)

    accountingMonth = convertAccountingMonth(record.accountingDate);
    accountingYear = `202${convertAccountingYear(record.accountingDate)}`.slice(-1);  //db only has space for one character

    bodyStyle = convertBodyStyle(record.vehicleClass);
    bodySize = convertBodySize(record.vehicleClass);

    accidentMonth = convertAccidentMonth(record.accidentDate);
    accidentYear = `202${convertAccidentYear(record.accidentDate)}`.slice(-2);   //db only has space for two characters
	//console.log(`accident_month: ${accidentMonth}, accident_yr: ${accidentYear}`)
    console.log(record.vehicleClass)
    console.log(`bodyStyle: ${bodyStyle}, bodySize: ${bodySize}`)
    console.log('claimCount: ' + record.claimCount)

    let query = `INSERT INTO openidl_base_9999.pa_stat_stg
    (LINE,
    REP_MO,
    REP_YR,
    COMP,
    STATE,
    TERRITORY,
    TRANS,
    LOSS_AMT,
    PROG_CD,
    COV_CODE,
    SUBLINE,
    AGE,
    SEX_MARITAL,
    VEHICLE_USE,
    VEHICLE_PERF,
    PENALTY_POINTS,
    LIA_LIM,
    DED_AMT,
    BODY_STYLE,
    BODY_SIZE,
    MODEL_YEAR,
    UM_UIM_MOTORIST,
    CLM_CNT,
    COL,
    TERRORISM,
    ACCIDENT_MON,
    ACCIDENT_YR,
    PACKAGE_ID,
    POOL,
    CLAIM_NUM,
    CLAIM_ID,
    ZIP,
    ZIP_SUFF,
    UM_UIM_STACK_IND,
    SYMBOL,
    PASS_RESTRAINT,
    ANTI_LOCK,
    ANTI_THEFT,
    DEF_DRIVER,
    PIP_LIMIT_DED,
    NJ_PIP_LIMIT,
    NJ_PIP_DED,
    RAT_TERM_ZONE,
    EXCEPT_A,
    EXCEPT_B,
    EXCEPT_C,
    EXCEPT_D,
    LIMIT_LOSS_CD_ID,
    OPT_ZIP_CD_IND
    )
     VALUES (
        '${record.lineOfInsurance}',
        '${accountingMonth}',
        '${accountingYear}',
        '${record.companyCode}',
        '${record.stateCode}',
        '${record.territory}',
        '${record.transactionCode}',
        '${record.lossAmount}',
        '${record.program}',
        '${record.coverage}',
        '${record.subline}',
        '${record.operatorsAge}',
        '${record.sexAndMaritalStatus}',
        '${record.vehicleUse}',
        '${record.vehiclePerformance}',
        '${record.privatePassengerDriversTrainingGoodStudent}',
        '${record.privatePassengerPenaltyPoints}',
        '${record.liabilityLimitsAmount}',
        '${record.deductibleAmount}',
        '${bodyStyle}',
        '${bodySize}',
        '${record.modelYear}',
        '${record.uninsuredUnderinsuredMotorist}',
        '${record.claimCount}',
        '${record.causeOfLoss}',
        '${record.terrorismIndicator}',
        '${accidentMonth}',
        '${accidentYear}',
        '${record.packageCode}',
        '${record.poolAffiliation}',
        '${record.occurrenceIdentification}',
        '${record.claimIdentifier}',
        '${record.zipCode}',
        '${record.zipCodeSuffix}',
        '${record.umUimStackingIndicator}',
        '${record.symbolCode}',
        '${record.passiveRestraintDiscountCode}',
        '${record.antiLockBrakesDiscountCode}',
        '${record.antiTheftDeviceDiscountCode}',
        '${record.defensiveDriverDiscountCode}',
        '${record.pipLimitsDeductibleCode}',
        '${record.newJerseyPIPLimitsDeductibleCode}',
        '${record.newJerseyDeductible}',
        '${record.rateClassCode}',
        '${record.stateExceptionA}',
        '${record.stateExceptionB}',
        '${record.stateExceptionC}',
        '${record.stateExceptionD}',
        '${record.limitedCodingLossTransaction}',
        '${record.optionalZipCodeIndicator}')
    `;
	return query;
}

async function insertPremium(client, record) {
	let query = makeInsertQuery(record);
	console.log(query);
	await client.query(query);
}

async function insertLoss(client, record) {
	let query = makeLossQuery(record);
	console.log(query);
	await client.query(query);
}


async function insertRecords(client, records) {
	for (let record of records) {
		//console.log(record);
		if (record.transactionCode == '1' || record.transactionCode == '8') {
			console.log('premium record');
			await insertPremium(client, record);
			//console.log('premium');
			// try{
			// await insertPremium(client,record)
			// console.log('premium record')
			// }
			// catch (e){
			//     console.log('error record')
			//     console.log(record)
			//     console.log('error')
			//     console.log(e)

			// }
		} else {
            console.log('loss record');
			await insertLoss(client,record);
			//console.log('loss');
		}
	}
}

async function main() {
	const client = new Client(credentials);
	await client.connect();
	await insertRecords(client, records);
	await client.end();
}

main();
// errorCheck();
