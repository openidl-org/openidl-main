const config = require('./config/config.json')
const { Pool, Client } = require("pg");
const records = require('../../../con-data/auto.json').records
const credentials = {
  user: config.db.username,
  host: config.db.host,
  database: config.db.database,
  password: config.db.password,
  port: config.db.port,
};


async function clientDemo() {
    const client = new Client(credentials);
    await client.connect();
    const now = await client.query("SELECT NOW()");
    await client.end();
    ts = now.rows[0]
    return ts;
  }

async function getPremiums(client){
    
    await client.connect();
    
    const premiums = await client.query(`select * from ${config.db.schema}.au_premium ap ;`)
    await client.end();
  
    return premiums;
}

function makeInsertQuery(record){
    let query = `INSERT INTO ${config.db.schema}.au_premium
    (LineOfBusiness,
     Subline,
     RecordType,
     TransactionType,
     TransactionCode,
     SublineCategory,
     AccountingDate,
     CompanyCode,
     CompanyID,
     State,
     Territory,
     OptionalZipCodeIndicator,
     PremiumAmount,
     Program,
     PolicyIdentifier,
     AccountingTermExpiration,
     NCProgramEnhancement,
     ZipCode,
     ZipCodeSuffix,
     MonthlyPremiumAmount,
     CoverageCategory,
     Coverage,
     CoverageCode,
     LiabilityLimitsName,
     LiabilityLimitsAmount,
     DeductibleCode,
     Exposure,
     MonthsCovered,
     SingleMultiCarRating,
     Terrorism,
     Packaging,
     PoolAffiliation,
     UMUIMStacking,
     PassiveRestraintDiscount,
     AntiLockBrakesDiscount,
     DefensiveDriverDiscount,
     OperatorAge,
     OperatorAgeCode,
     Gender,
     MaritalStatus,
     MaritalStatusCode,
     PrincipalSecondary,
     DriversTraining,
     GoodStudentDiscount,
     PenaltyPoints,
     PenaltyPointsCode,
     VehicleUse,
     VehicleUseOperator,
     CommuteDistance,
     AnnualDistance,
     VehiclePerformance,
     BodyStyle,
     BodySize,
     ModelYear,
     Symbol)
     Values (
         '${record.Policy.LineOfBusiness}',
         '${record.Policy.Subline}',
         '${record.RecordType}',
         '${record.TransactionType}',
         '${record.TransactionCode}',
         '${record.Policy.SublineCategory}',
         '${record.Policy.AccountingDate}',
         '${record.Policy.CompanyCode}',
         '${record.Policy.CompanyID}',
         '${record.Policy.State}',
         '${record.Policy.Territory}',
         '${record.Policy.OptionalZipCodeIndicator}',
         '${record.Policy.PremiumAmount}',
         '${record.Policy.Program}',
         '${record.Policy.PolicyIdentifier}',
         '${record.Policy.AccountingTermExpiration}',
         '${record.Policy.NCProgramEnhancement}',
         '${record.Policy.ZipCode}',
         '${record.Policy.ZipCodeSuffix}',
         '${record.Coverage.MonthlyPremiumAmount}',
         '${record.Coverage.CoverageCategory}',
         '${record.Coverage.Coverage}',
         '${record.Coverage.CoverageCode}',
         '${record.Coverage.LiabilityLimitsName}',
         '${record.Coverage.LiabilityLimitsAmount}',
         '${record.Coverage.DeductibleCode}',
         '${record.Coverage.Exposure}',
         '${record.Coverage.MonthsCovered}',
         '${record.Coverage.SingleMultiCarRating}',
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
         '${record.Driver.PenaltyPointsCode}',
         '${record.Vehicle.VehicleUse}',
         '${record.Vehicle.VehicleUseOperator}',
         '${record.Vehicle.CommuteDistance}',
         '${record.Vehicle.AnnualDistance}',
         '${record.Vehicle.VehiclePerformance}',
         '${record.Vehicle.BodyStyle}',
         '${record.Vehicle.BodySize}',
         '${record.Vehicle.ModelYear}',
         '${record.Vehicle.Symbol}'
     )
 `
 return query
}

async function insertPremium(client,record){

    
    
    
    let query = makeInsertQuery(record)
    // console.log(query)
    await client.query(query)



}

async function insertRecords(client,records){
    for (let record of records){
        //console.log(record)
        if (record.TransactionCode == '1') {
            //console.log('premium record')
            try{
            await insertPremium(client,record)
            }
            catch (e){
                console.log('error record')
                console.log(record)
                console.log('error')
                console.log(e)
            }

        }
    }
}

async function main(){
    const client = new Client(credentials);
    //let response = await clientDemo(client)
    //console.log('response: '+response.now)    
    await client.connect();
    await insertRecords(client,records)
    await client.end();

    
    //let premiums = await getPremiums()

    //console.log(premiums[0])
}

main()