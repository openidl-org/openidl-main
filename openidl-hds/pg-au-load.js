const config = require('./config/config.json')
const { Pool, Client } = require("pg");
const records = require('../../../con-data/openidl9999.json').records
const credentials = {
  user: config.db.username,
  host: config.db.host,
  database: config.db.database,
  password: config.db.password,
  port: config.db.port,
};




function makeInsertQuery(record){

    let query = `set datestyle to DMY; INSERT INTO ${config.db.schema.base}_${config.db.companyId}.au_premium
    (line_of_business,
     subline,
     record_type,
     transaction_type,
     transaction_code,
     subline_category,
     accounting_date,
     company_code,
     company_id,
     state,
     territory,
     optional_zip_code_indicator,
     premium_amount,
     program,
     policy_identifier,
     accounting_term_expiration,
     nc_program_enhancement,
     zip_code,
     zip_code_suffix,
     monthly_premium_amount,
     coverage_category,
     coverage,
     coverage_code,
     liability_limits_name,
     liability_limits_amount,
     deductible_code,
     deductible_amount,
     exposure,
     months_covered,
     single_multi_car_rating,
     terrorism,
     packaging,
     pool_affiliation,
     umuim_stacking,
     passive_restraint_discount,
     anti_lock_brakes_discount,
     defensive_driver_discount,
     operator_age,
     operator_age_code,
     gender,
     marital_status,
     marital_status_code,
     principal_secondary,
     drivers_training,
     good_student_discount,
     penalty_points,
     penalty_points_code,
     vehicle_use,
     vehicle_use_operator,
     commute_distance,
     annual_distance,
     vehicle_performance,
     body_style,
     body_size,
     model_year,
     symbol)
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
         '${record.Coverage.DeductibleAmount}',
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

function makeInsertQueryForLoss(record){

    let loss =record.Claim.LossAmount;
    if(loss==null){
        loss=0;
    }

    let query = `set datestyle to DMY; INSERT INTO ${config.db.schema.base}_${config.db.companyId}.au_loss
    (line_of_business,
	 subline,
	 subline_category,
	 accounting_date,
	 company_code,
	 company_id,
	 state,
	 territory,
	 optional_zip_code_indicator,
	 program,
	 nc_program_enhancement,
	 zip_code,
	 zip_code_suffix,
	 coverage_category,
	 coverage,
	 coverage_code,
	 deductible_amount,
	 deductible_code,
	 terrorism,
	 packaging,
	 pool_affiliation,
	 umuim_stacking,
	 passive_restraint_discount,
	 anti_lock_brakes_discount,
	 defensive_driver_discount,
	 operator_age,
	 operator_age_code,
	 gender,
	 marital_status,
	 marital_status_code,
	 principal_secondary,
	 drivers_training,
	 good_student_discount,
	 penalty_points,
	 vehicle_use,
	 vehicle_use_operator,
	 commute_distance,
	 annual_distance,
	 vehicle_performance,
	 model_year,
	 symbol,
	 loss_amount,
	 claim_count,
	 cause_of_loss,
	 accident_date,
	 occurrence_identifier,
	 claim_identifier,
	 limited_coding_loss_transaction,
	 created_time,
	 record_type,
	 transaction_type,
	 transaction_code,
	 chunk_id )
     Values (
         '${record.Policy.LineOfBusiness}',
         '${record.Policy.Subline}',
         '${record.Policy.SublineCategory}',
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
    console.log(query)
    await client.query(query)
}

async function insertLosses(client,record){
    let query = makeInsertQueryForLoss(record)
    console.log(query)
    await client.query(query)
}

async function insertRecords(client,records){
    for (let record of records){
        console.log(record)
        if (record.TransactionCode == '1') {
            //console.log('premium record')
            await insertPremium(client,record)
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

        } if (record.TransactionCode == '2' || record.TransactionCode == '3' || record.TransactionCode == '7'	|| record.TransactionCode == '8') {
            //console.log('Loss record')
            await insertLosses(client,record)
            // try{
            // await insertLosses(client,record)
            // console.log('Loss record')
            // }
			// catch (e){
            //     console.log('error record')
            //     console.log(record)
            //     console.log('error')
            //     console.log(e)
			// }
            }
    }
}

async function main(){
    const client = new Client(credentials);
    await client.connect();
    await insertRecords(client,records)
    await client.end();
}

main()