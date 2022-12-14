const config = require('./config/config.json')
const { Pool, Client } = require("pg");
const records = require('../../../con-data/homeowner.json').records
const credentials = {
  user: config.db.username,
  host: config.db.host,
  database: config.db.database,
  password: config.db.password,
  port: config.db.port,
};




function makeInsertQuery(record){

    let query = `set datestyle to DMY; INSERT INTO ${config.db.schema.base}_${config.db.companyId}.ho_premium
    (line_of_business,
     accounting_date,
     company_code,
     annual_statement_line,
     state_code,
     county_code,
     area_indicator,
     territory,
     record_type,
     transaction_type,
     transaction_code,
     premium_amount,
     exposure,
     program,
     policy_category,
     policy_type,
     policy_form,
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
     construction_code,
     construction_code_name,
     construction_code_type,
     fire_code,
     fire_code_name,
     fire_code_type,
     year_of_construction,
     liability_limit,
     medical_payments,
     es_liq_fuel_prop,
     es_liq_fuel_prop_name,
     es_liq_fuel_prop_type,
     es_liq_fuel_liab,
     es_liq_fuel_liab_name,
     es_liq_fuel_liab_type,
     occupancy_code,
     occupancy_code_type,
     occupancy_code_name,
     hbb_indicator,
     number_of_families_code,
     number_of_families,
     dwelling_type,
     ordinance_or_law_coverage,
     theft_deductible_amount,
     sec_prop_amt_of_insurance,
     nc_program_enhancement,
     mold_damage_coverage,
     mold_damage_coverage_property,
     mold_damage_coverage_liability,
     mold_damage_coverage_notes,
     pool_code,
     months_covered,
     zip_code,
     zip_code_suffix,
     building_code_effect_grade_code,
     building_code_effect_grade,
     small_premium_indicator,
     policy_number)
     Values (
         '${record.Policy.LineOfBusiness}',
         '${record.Policy.AccountingDate}',
         '${record.Policy.CompanyCode}',
         '${record.Policy.AnnualStatementLineOfBusiness}',
         '${record.Policy.State}',
         '${record.Policy.CountyCode}',
         '${record.Policy.AreaIndicator}',
         '${record.Policy.Territory}',
         '${record.RecordType}',
         '${record.TransactionType}',
         '${record.TransactionCode}',
         '${record.Policy.PremiumAmount}',
         '${record.Coverage.Exposure}',
         '${record.Policy.Program}',
         '${record.Policy.PolicyCategory}',
         '${record.Policy.PolicyType}',
         '${record.Policy.PolicyFormCode}',
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
         '${record.Policy.ConstructionCode}',
         '${record.Policy.ConstructionCodeName}',
         '${record.Policy.ConstructionCodeType}',
         '${record.Policy.FireCode}',
         '${record.Policy.FireCodeName}',
         '${record.Policy.FireCodeType}',
         '${record.Dwelling.YearOfConstruction}',
         '${record.LiabilityLimit}',
         '${record.Coverage.MedicalPayments}',
         '${record.EsLiqFuelProperty}',
         '${record.EsLiqFuelPropertyName}',
         '${record.EsLiqFuelPropertyType}',
         '${record.EsLiqFuelLiability}',
         '${record.EsLiqFuelLiabilityName}',
         '${record.EsLiqFuelLiabilityType}',
         '${record.OccupancyCode}',
         '${record.OccupancyCodeType}',
         '${record.OccupancyCodeName}',
         '${record.Dwelling.HomeBasedBusinessIndicator}',
         '${record.Dwelling.NumberOfFamiliesCode}',
         '${record.Dwelling.NumberOfFamilies}',
         '${record.Dwelling.DwellingType}',
         '${record.Coverage.OrdinanceOrLawCoverage}',
         '${record.Coverage.TheftDeductibleAmount}',
         '${record.Coverage.SecondaryPropertyAmountOfInsurance}',
         '${record.Policy.NCProgramEnhancementIndicator}',
         '${record.Coverage.MoldDamageCoverageCode}',
         '${record.Coverage.MoldDamageCoverageProperty}',
         '${record.Coverage.MoldDamageCoverageLiability}',
         '${record.Coverage.MoldDamageCoverageNotes}',
         '${record.Coverage.PoolCode}',
         '${record.Coverage.MonthsCovered}',
         '${record.Policy.ZipCode}',
         '${record.Policy.ZipCodeSuffix}',
         '${record.Dwelling.BuildingCodeEffectivenessGradeCode}',
         '${record.Dwelling.BuildingCodeEffectivenessGrade}',
         '${record.Policy.SmallPremiumIndicator}',
         '${record.Policy.PolicyNumber}'
     )
 `
 return query
}

function makeLossQuery(record){

    let query = `set datestyle to DMY; INSERT INTO ${config.db.schema.base}_${config.db.companyId}.ho_loss
    (line_of_business,
    accounting_date,
    company_code,
    annual_statement_line,
    state_code,
    county_code,
    area_indicator,
    territory,
    record_type,
    transaction_type,
    transaction_code,
    loss_amount,
    claim_count,
    program,
    policy_category,
    policy_type,
    policy_form,
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
    construction_code,
    construction_code_name,
    construction_code_type,
    fire_code,
    fire_code_name,
    fire_code_type,
    year_of_construction,
    liability_limit,
    medical_payments,
    es_liq_fuel_prop,
    es_liq_fuel_prop_name,
    es_liq_fuel_prop_type,
    es_liq_fuel_liab,
    es_liq_fuel_liab_name,
    es_liq_fuel_liab_type,
    occupancy_code,
    occupancy_code_type,
    occupancy_code_name,
    hbb_indicator,
    number_of_families_code,
    number_of_families,
    dwelling_type,
    ordinance_or_law_coverage,
    theft_deductible_amount,
    sec_prop_amt_of_insurance,
    nc_program_enhancement,
    mold_damage_coverage,
    mold_damage_coverage_property,
    mold_damage_coverage_liability,
    mold_damage_coverage_notes,
    pool_code,
    cause_of_loss_code,
    cause_of_loss,
    cause_of_loss_type,
    accident_date,
    zip_code,
    zip_code_suffix,
    building_code_effect_grade_code,
    building_code_effect_grade,
    small_premium_indicator,
    claim_number,
    claim_identifier)
        Values (
            '${record.Policy.LineOfBusiness}',
            '${record.Policy.AccountingDate}',
            '${record.Policy.CompanyCode}',
            '${record.Policy.AnnualStatementLineOfBusiness}',
            '${record.Policy.State}',
            '${record.Policy.CountyCode}',
            '${record.Policy.AreaIndicator}',
            '${record.Policy.Territory}',
            '${record.RecordType}',
            '${record.TransactionType}',
            '${record.TransactionCode}',
            '${record.Claim.LossAmount}',
            '${record.Claim.ClaimCount}',
            '${record.Policy.Program}',
            '${record.Policy.PolicyCategory}',
            '${record.Policy.PolicyType}',
            '${record.Policy.PolicyFormCode}',
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
            '${record.Policy.ConstructionCode}',
            '${record.Policy.ConstructionCodeName}',
            '${record.Policy.ConstructionCodeType}',
            '${record.Policy.FireCode}',
            '${record.Policy.FireCodeName}',
            '${record.Policy.FireCodeType}',
            '${record.Dwelling.YearOfConstruction}',
            '${record.LiabilityLimit}',
            '${record.Coverage.MedicalPayments}',
            '${record.EsLiqFuelProperty}',
            '${record.EsLiqFuelPropertyName}',
            '${record.EsLiqFuelPropertyType}',
            '${record.EsLiqFuelLiability}',
            '${record.EsLiqFuelLiabilityName}',
            '${record.EsLiqFuelLiabilityType}',
            '${record.OccupancyCode}',
            '${record.OccupancyCodeType}',
            '${record.OccupancyCodeName}',
            '${record.Dwelling.HomeBasedBusinessIndicator}',
            '${record.Dwelling.NumberOfFamiliesCode}',
            '${record.Dwelling.NumberOfFamilies}',
            '${record.Dwelling.DwellingType}',
            '${record.Coverage.OrdinanceOrLawCoverage}',
            '${record.Coverage.TheftDeductibleAmount}',
            '${record.Coverage.SecondaryPropertyAmountOfInsurance}',
            '${record.Policy.NCProgramEnhancementIndicator}',
            '${record.Coverage.MoldDamageCoverageCode}',
            '${record.Coverage.MoldDamageCoverageProperty}',
            '${record.Coverage.MoldDamageCoverageLiability}',
            '${record.Coverage.MoldDamageCoverageNotes}',
            '${record.Coverage.PoolCode}',
            '${record.Coverage.CauseOfLossCode}',
            '${record.Coverage.CauseOfLoss}',
            '${record.Coverage.CauseOfLossType}',
            '${record.Claim.AccidentDate}',
            '${record.Policy.ZipCode}',
            '${record.Policy.ZipCodeSuffix}',
            '${record.Dwelling.BuildingCodeEffectivenessGradeCode}',
            '${record.Dwelling.BuildingCodeEffectivenessGrade}',
            '${record.Policy.SmallPremiumIndicator}',
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