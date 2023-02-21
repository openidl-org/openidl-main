const config = require('./config/config.json')
const { Pool, Client } = require("pg");
const records = require('../../../con-data/Mobile_Homeowners/mobileHomeowner.json').records
const credentials = {
  user: config.db.username,
  host: config.db.host,
  database: config.db.database,
  password: config.db.password,
  port: config.db.port,
};




function makeInsertQuery(record){

    let query = `set datestyle to DMY; INSERT INTO ${config.db.schema.base}_${config.db.companyId}.mho_policy
    (line_of_insurance,
    accounting_date,
    company_code,
    company_ID,
    state_code,
    county_code,
    area_indicator,
    territory,
    record_type,
    transaction_type,
    transaction_code,
    premium_amount,
    monthly_premium_amount,
    exposure,
    annual_statement_line,
    program,
    policy_form,
    policy_category,
    policy_type,
    reporting_form,
    reporting_category,
    loss_settlement_indicator,
    loss_settlement_indicator_description,
    accounting_term_expiration,
    primary_property_amount,
    deductible_type,
    deductible_amount,
    wind_hail_deductible,
    class_code,
    class_code_name,
    class_code_type,
    class_code_category,
    class_code_subcategory,
    class_code_watercraft_size,
    class_code_engine_size,
    fire_code,
    fire_code_name,
    fire_code_type,
    fire_code_category,
    year_of_manufacture,
    liability_limit,
    medical_payments,
    es_liq_fuel_prop,
    es_liq_fuel_prop_name,
    es_liq_fuel_prop_type,
    es_liq_fuel_liab,
    es_liq_fuel_liab_name,
    es_liq_fuel_liab_type,
    occupancy_code,
    occupancy_code_name,
    occupancy_code_type,
    hbb_indicator,
    hbb_indicator_description,
    tie_down_code,
    tie_down,
    ordinance_or_law_coverage,
    theft_deductible_amount,
    sec_prop_amt_of_insurance,
    mold_damage_coverage,
    mold_damage_coverage_property,
    mold_damage_coverage_liability,
    mold_damage_coverage_notes,
    pool_code,
    pool_code_description,
    months_covered,
    zip_code,
    zip_code_suffix,
    policy_number)
     Values (
         '${record.Policy.LineOfInsurance}',
         '${record.Policy.AccountingDate}',
         '${record.Policy.CompanyCode}',
         '${record.Policy.CompanyID}',
         '${record.Policy.State}',
         '${record.Policy.CountyCode}',
         '${record.Policy.AreaIndicator}',
         '${record.Policy.Territory}',
         '${record.RecordType}',
         '${record.TransactionType}',
         '${record.TransactionCode}',
         '${record.Policy.PremiumAmount}',
         '${record.Coverage.MonthlyPremiumAmount}',
         '${record.Coverage.Exposure}',
         '${record.Policy.AnnualStatementLineOfBusiness}',
         '${record.Policy.Program}',
         '${record.Policy.PolicyFormCode}',
         '${record.Policy.PolicyCategory}',
         '${record.Policy.PolicyType}',
         '${record.Policy.ReportingForm}',
         '${record.Policy.ReportingCategory}',
         '${record.LossSettlementIndicator}',
         '${record.LossSettlementIndicatorDescription}',
         '${record.Policy.AccountingTermExpiration}',
         '${record.PrimaryPropertyAmountOfInsurance}',
         '${record.Policy.DeductibleType}',
         '${record.Policy.DeductibleAmount}',
         '${record.Policy.WindHailDeductible}',
         '${record.Policy.ClassCode}',
         '${record.Policy.ClassCodeName}',
         '${record.Policy.ClassCodeType}',
         '${record.Policy.ClassCodeCategory}',
         '${record.Dwelling.Subcategory}',
         '${record.Dwelling.WatercraftSize}',
         '${record.Dwelling.EngineSize}',
         '${record.Policy.FireCode}',
         '${record.Policy.FireCodeName}',
         '${record.Policy.FireCodeType}',
         '${record.Policy.FireCodeCategory}',
         '${record.Dwelling.YearOfManufacture}',
         '${record.LiabilityLimit}',
         '${record.Coverage.MedicalPayments}',
         '${record.EsLiqFuelProperty}',
         '${record.EsLiqFuelPropertyName}',
         '${record.EsLiqFuelPropertyType}',
         '${record.EsLiqFuelLiability}',
         '${record.EsLiqFuelLiabilityName}',
         '${record.EsLiqFuelLiabilityType}',
         '${record.OccupancyCode}',
         '${record.OccupancyCodeName}',
         '${record.OccupancyCodeType}',
         '${record.Dwelling.HomeBasedBusinessIndicator}',
         '${record.Dwelling.HBBIndicatorDescription}',
         '${record.Coverage.TieDownCode}',
         '${record.Coverage.TieDown}',
         '${record.Coverage.OrdinanceOrLawCoverage}',
         '${record.Coverage.TheftDeductibleAmount}',
         '${record.Coverage.SecondaryPropertyAmountOfInsurance}',
         '${record.Coverage.MoldDamageCoverageCode}',
         '${record.Coverage.MoldDamageCoverageProperty}',
         '${record.Coverage.MoldDamageCoverageLiability}',
         '${record.Coverage.MoldDamageCoverageNotes}',
         '${record.Coverage.PoolCode}',
         '${record.Coverage.PoolCodeDescription}',
         '${record.Coverage.MonthsCovered}',
         '${record.Policy.ZipCode}',
         '${record.Policy.ZipCodeSuffix}',
         '${record.Policy.PolicyNumber}'
     )
 `
 return query
}

function makeLossQuery(record){

    let query = `set datestyle to DMY; INSERT INTO ${config.db.schema.base}_${config.db.companyId}.mho_claim
    (line_of_insurance,
    accounting_date,
    company_code,
    company_ID,
    state_code,
    county_code,
    area_indicator,
    territory,
    record_type,
    transaction_type,
    transaction_code,
    loss_amount,
    claim_count,
    annual_statement_line,
    program,
    policy_form,
    policy_category,
    policy_type,
    reporting_form,
    reporting_category,
    loss_settlement_indicator,
    loss_settlement_indicator_description,
    primary_property_amount,
    deductible_type,
    deductible_amount,
    wind_hail_deductible,
    class_code,
    class_code_name,
    class_code_type,
    class_code_category,
    class_code_subcategory,
    class_code_watercraft_size,
    class_code_engine_size,
    fire_code,
    fire_code_name,
    fire_code_type,
    fire_code_category,
    year_of_manufacture,
    liability_limit,
    medical_payments,
    es_liq_fuel_prop,
    es_liq_fuel_prop_name,
    es_liq_fuel_prop_type,
    es_liq_fuel_liab,
    es_liq_fuel_liab_name,
    es_liq_fuel_liab_type,
    occupancy_code,
    occupancy_code_name,
    occupancy_code_type,
    hbb_indicator,
    hbb_indicator_description,
    tie_down_code,
    tie_down,
    ordinance_or_law_coverage,
    theft_deductible_amount,
    sec_prop_amt_of_insurance,
    mold_damage_coverage,
    mold_damage_coverage_property,
    mold_damage_coverage_liability,
    mold_damage_coverage_notes,
    pool_code,
    pool_code_description,
    cause_of_loss_code,
    cause_of_loss,
    cause_of_loss_type,
    accident_date,
    zip_code,
    zip_code_suffix,
    limited_coding_loss,
    claim_number,
    claim_identifier)
    Values (
        '${record.Policy.LineOfInsurance}',
        '${record.Policy.AccountingDate}',
        '${record.Policy.CompanyCode}',
        '${record.Policy.CompanyID}',
        '${record.Policy.State}',
        '${record.Policy.CountyCode}',
        '${record.Policy.AreaIndicator}',
        '${record.Policy.Territory}',
        '${record.RecordType}',
        '${record.TransactionType}',
        '${record.TransactionCode}',
        '${record.Claim.LossAmount}',
        '${record.Claim.ClaimCount}',
        '${record.Policy.AnnualStatementLineOfBusiness}',
        '${record.Policy.Program}',
        '${record.Policy.PolicyFormCode}',
        '${record.Policy.PolicyCategory}',
        '${record.Policy.PolicyType}',
        '${record.Policy.ReportingForm}',
        '${record.Policy.ReportingCategory}',
        '${record.LossSettlementIndicator}',
        '${record.LossSettlementIndicatorDescription}',
        '${record.PrimaryPropertyAmountOfInsurance}',
        '${record.Policy.DeductibleType}',
        '${record.Policy.DeductibleAmount}',
        '${record.Policy.WindHailDeductible}',
        '${record.Policy.ClassCode}',
        '${record.Policy.ClassCodeName}',
        '${record.Policy.ClassCodeType}',
        '${record.Policy.ClassCodeCategory}',
        '${record.Dwelling.Subcategory}',
        '${record.Dwelling.WatercraftSize}',
        '${record.Dwelling.EngineSize}',
        '${record.Policy.FireCode}',
        '${record.Policy.FireCodeName}',
        '${record.Policy.FireCodeType}',
        '${record.Policy.FireCodeCategory}',
        '${record.Dwelling.YearOfManufacture}',
        '${record.LiabilityLimit}',
        '${record.Coverage.MedicalPayments}',
        '${record.EsLiqFuelProperty}',
        '${record.EsLiqFuelPropertyName}',
        '${record.EsLiqFuelPropertyType}',
        '${record.EsLiqFuelLiability}',
        '${record.EsLiqFuelLiabilityName}',
        '${record.EsLiqFuelLiabilityType}',
        '${record.OccupancyCode}',
        '${record.OccupancyCodeName}',
        '${record.OccupancyCodeType}',
        '${record.Dwelling.HomeBasedBusinessIndicator}',
        '${record.Dwelling.HBBIndicatorDescription}',
        '${record.Coverage.TieDownCode}',
        '${record.Coverage.TieDown}',
        '${record.Coverage.OrdinanceOrLawCoverage}',
        '${record.Coverage.TheftDeductibleAmount}',
        '${record.Coverage.SecondaryPropertyAmountOfInsurance}',
        '${record.Coverage.MoldDamageCoverageCode}',
        '${record.Coverage.MoldDamageCoverageProperty}',
        '${record.Coverage.MoldDamageCoverageLiability}',
        '${record.Coverage.MoldDamageCoverageNotes}',
        '${record.Coverage.PoolCode}',
        '${record.Coverage.PoolCodeDescription}',
        '${record.Coverage.CauseOfLossCode}',
        '${record.Coverage.CauseOfLoss}',
        '${record.Coverage.CauseOfLossType}',
        '${record.Claim.AccidentDate}',
        '${record.Policy.ZipCode}',
        '${record.Policy.ZipCodeSuffix}',
        '${record.Policy.LimitedCodingLossTransaction}',
        '${record.Claim.ClaimNumber}',
        '${record.Claim.ClaimIdentifier}'
    )
`
 return query
}

async function insertPremium(client,record){
    let query = makeInsertQuery(record)
    console.log(query)
    await client.query(query)
}

async function insertLoss(client,record){
    let query = makeLossQuery(record)
    console.log(query)
    await client.query(query)
}

async function insertRecords(client,records){
    for (let record of records){
        console.log(record)
        if (record.TransactionCode == '1') {
            console.log('premium record')
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

        } else {
            await insertLoss(client,record)
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