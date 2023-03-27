/*
1. g̶e̶t̶ 1̶0̶0̶ p̶r̶e̶m̶i̶u̶m̶ a̶n̶d̶ 1̶0̶0̶ l̶o̶s̶s̶ r̶e̶c̶o̶r̶d̶s̶
2. m̶a̶k̶e̶ s̶u̶r̶e̶ t̶h̶a̶t̶ t̶h̶e̶y̶ a̶r̶e̶ s̶a̶n̶i̶t̶i̶z̶e̶d̶ (̶p̶u̶l̶l̶e̶d̶ f̶r̶o̶m̶ s̶a̶n̶i̶t̶i̶z̶e̶d̶ s̶e̶t̶)̶
3. t̶u̶r̶n̶ s̶a̶n̶i̶t̶i̶z̶e̶d̶ r̶e̶c̶o̶r̶d̶s̶ i̶n̶t̶o̶ j̶s̶o̶n̶
4. create stage table
5. write script to load stg table

-New Table 'pa_stat_vw
-Join the pa_stat_stg with all code tables
*/

const config = require('./config/config.json')
const { Pool, Client } = require("pg");
const records = require('../../../con-data/Personal_Auto/personalAuto.json').records
const credentials = {
  user: config.db.username,
  host: config.db.host,
  database: config.db.database,
  password: config.db.password,
  port: config.db.port,
};




function makeInsertQuery(record){

    let query = `set datestyle to DMY; INSERT INTO ${config.db.schema.base}_${config.db.companyId}.pa_load_stg_policy
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
     DRIV_TRAIN_GOOD_STUDENT,
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
     ASSIGN_RISK_RATE_CLASS,
     ASSIGN_RISK_PTS_SUR,
     EXP_RATING_MOD,
     EXCEPT_A,
     EXCEPT_B,
     EXCEPT_C,
     EXCEPT_D,
     OPT_ZIP_CD_IND)
     Values (
         '${record.Policy.LineOfBusinessCode}',
         '${record.Policy.AccountingMonth}',
         '${record.Policy.AccountingYear}',
         '${record.Policy.CompanyCode}',
         '${record.Policy.State}',
         '${record.Policy.Territory}',
         '${record.Policy.PremiumAmount}',
            '${record.Claim.LossAmount}',
         '${record.Policy.ProgramCode}',
         '${record.Coverage.CoverageCode}',
         '${record.Policy.SublineCode}',
         '${record.Driver.OperatorAgeCode}',
         '${record.Driver.MaritalStatusCode}',
         '${record.Vehicle.VehicleUseCode}',
         '${record.Vehicle.VehiclePerformanceCode}',
         '${record.Driver.DriversTrainingGoodStudentCode}',
         '${record.Driver.PenaltyPointsCode}',
         'need help on LIA_LIM',
         '${record.Coverage.DeductibleCode}',
         'need help on vehicle BODY_STYLE',
         'need help on vehicle BODY_SIZE',
         '${record.Vehicle.ModelYear}',
         'need help on UM_UIM_MOTORIST',
         '${record.Coverage.Exposure}',
         '${record.Claim.ClaimCount}',
         '${record.Claim.CauseOfLoss}',
         'need help with COL',
         '${record.Coverage.MonthsCovered}', '1-9 should be 01-09?'






         '${record.Policy.PolicyIdentifier}',
         '${record.Policy.AccountingTermExpiration}',
         '${record.Policy.NCProgramEnhancement}',
         '${record.Policy.ZipCode}',
         '${record.Policy.ZipCodeSuffix}',
         '${record.Coverage.MonthlyPremiumAmount}',
         '${record.Coverage.LiabilityLimitsName}',
         '${record.Coverage.LiabilityLimitsAmount}',
         '${record.Coverage.DeductibleCode}',
         '${record.Coverage.DeductibleAmount}',
         '${record.Coverage.SingleMultiCarRating}',
         '${record.Coverage.Terrorism}',
         '${record.Coverage.Packaging}',
         '${record.Coverage.PoolAffiliation}',
         '${record.Coverage.UMUIMStacking}',
         '${record.Coverage.PassiveRestraintDiscount}',
         '${record.Coverage.AntiLockBrakesDiscount}',
         '${record.Coverage.DefensiveDriverDiscount}',
         '${record.Driver.OperatorAge}',
         '${record.Driver.Gender}',
         '${record.Driver.MaritalStatus}',
         '${record.Driver.MaritalStatusCode}',
         '${record.Driver.PrincipalSecondary}',
         '${record.Driver.DriversTraining}',
         '${record.Driver.GoodStudentDiscount}',
         '${record.Driver.PenaltyPoints}',
         '${record.Driver.PenaltyPointsCode}',
         '${record.Vehicle.VehicleUseOperator}',
         '${record.Vehicle.CommuteDistance}',
         '${record.Vehicle.AnnualDistance}',
         '${record.Vehicle.VehiclePerformance}',
         
         
         '${record.Vehicle.Symbol}'
         '${record.Policy.OptionalZipCodeIndicator}'}'
     )
 `
 return query
}

function makeInsertQueryForLoss(record){

    let loss =record.Claim.LossAmount;
    if(loss==null){
        loss=0;
    }

    let query = `set datestyle to DMY; INSERT INTO ${config.db.schema.base}_${config.db.companyId}.pa_load_stg_claim
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
        DRIV_TRAIN_GOOD_STUDENT,
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
        ASSIGN_RISK_RATE_CLASS,
        ASSIGN_RISK_PTS_SUR,
        EXCEPT_A,
        EXCEPT_B,
        EXCEPT_C,
        EXCEPT_D,
        LIMIT_LOSS_CD_ID,
        OPT_ZIP_CD_IND)
     Values (
         '${record.Policy.LineOfBusiness}',
         '${record.Policy.Subline}',
         '${record.Policy.SublineCategory}',
         '${record.Policy.SublineCode}',
         '${record.Policy.AccountingDate}',
         '${record.Policy.CompanyCode}',
         '${record.Policy.CompanyID}',
         '${record.Policy.State}',
         '${record.Policy.Territory}',
         '${record.Policy.OptionalZipCodeIndicator}',
         '${record.Policy.Program}',
         '${record.Policy.NCProgramEnhancement}',
         '${record.Policy.ZipCode}',
         '${record.Policy.ZipCodeSuffix}',
         '${record.Coverage.CoverageCategory}',
         '${record.Coverage.Coverage}',
         '${record.Coverage.CoverageCode}',
         '${record.Coverage.DeductibleAmount}',
         '${record.Coverage.DeductibleCode}',
         '${record.Coverage.Terrorism}',
         '${record.Coverage.Packaging}',
         '${record.Coverage.PoolAffiliation}',
         '${record.Coverage.UMUIMStacking}',
         '${record.Coverage.PassiveRestraintDiscount}',
         '${record.Coverage.AntiLockBrakesDiscount}',
         '${record.Coverage.DefensiveDriverDiscount}',
         '${record.Driver.OperatorAge}',
         '${record.Driver.OperatorAgeCode}',
         '${record.Driver.Gender}',
         '${record.Driver.MaritalStatus}',
         '${record.Driver.MaritalStatusCode}',
         '${record.Driver.PrincipalSecondary}',
         '${record.Driver.DriversTraining}',
         '${record.Driver.GoodStudentDiscount}',
         '${record.Driver.PenaltyPoints}',
         '${record.Vehicle.VehicleUse}',
         '${record.Vehicle.VehicleUseOperator}',
         '${record.Vehicle.CommuteDistance}',
         '${record.Vehicle.AnnualDistance}',
         '${record.Vehicle.VehiclePerformance}',
         '${record.Vehicle.ModelYear}',
         '${record.Vehicle.Symbol}',
         '${loss}',
         '${record.Claim.ClaimCount}',
         '${record.Claim.CauseOfLoss}',
         '${record.Claim.AccidentDate}',
         '${record.Claim.OccurrenceIdentifier}',
         '${record.Claim.ClaimIdentifier}',
         '${record.Claim.LimitedCodingLossTransaction}',
         '${record.createdTime}',
         '${record.RecordType}',
         '${record.TransactionType}',
         '${record.TransactionCode}',
         '${record.chunkId}'
	 )   
 `
 return query
}

async function insertPremium(client,record){
    let query = makeInsertQuery(record)
    //console.log(query)
    await client.query(query)
}

async function insertLosses(client,record){
    let query = makeInsertQueryForLoss(record)
    //console.log(query)
    await client.query(query)
}

async function insertRecords(client,records){
    let premiumErrors = 0
    let lossErrors = 0
    let errorRecords = []
    let premiumLoad = 0
    let lossLoad = 0
    let recordCount = 0
    let uncountedRecords = 0
    for (let record of records){
        console.log(`Loading: ${recordCount}`)
        // console.log(record)

        if (record.Policy.SublineCode =='1'){
        recordCount += 1
        if (record.TransactionCode == '1'	|| record.TransactionCode == '8') {
            //console.log('premium record')
            //await insertPremium(client,record)
            try{
            await insertPremium(client,record)
            premiumLoad += 1
            //console.log('premium record')
            }
            catch (e){
                console.log('error record')
                //console.log(record)
                console.log('error')
                console.log(e)
                errorRecords.push(e)
                errorRecords.push(record)
                premiumErrors += 1
            }

        } else if (record.TransactionCode == '2' || record.TransactionCode == '3' || record.TransactionCode == '6'	|| record.TransactionCode == '7') {
            //console.log('Loss record')
            //await insertLosses(client,record)
            try{
            await insertLosses(client,record)
            lossLoad += 1
            //console.log('Loss record')
            }
			catch (e){
                console.log('error record')
                //console.log(record)
                console.log('error')
                console.log(e)
                lossErrors += 1
			}
            } else {
                console.log('WARNING! Uncounted Transaction Code: ' + record.TransactionCode)
                uncountedRecords += 1
            }}

    }
    console.log('Premium Load Errors: ' + premiumErrors)
    console.log('Loss Load Errors: ' + lossErrors)
    console.log('Total Records: ' + recordCount)
    console.log('Premium Count: ' + premiumLoad)
    console.log('Loss Load: ' + lossLoad)
    console.log('Uncounted Records: ' + uncountedRecords)
    console.log(errorRecords)
}

async function main(){
    const client = new Client(credentials);
    await client.connect();
    await insertRecords(client,records)
    await client.end();
}

main()