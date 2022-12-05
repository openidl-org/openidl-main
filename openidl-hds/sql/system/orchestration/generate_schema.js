const fs = require('fs');
const carYears = require('./ref/function/auto_cy_reporting')
const masterFile = require('../../../../../../con-data/hds-chain.json');
const getCarYears = require('./ref/function/auto_cy_reporting');

function write(path, value){
  fs.writeFile(path, value, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 
}

function checkDirExists(path){
    try {
        if (fs.existsSync(path)) {
          console.log("Directory exists.")
          return true
        } else {
          console.log("Directory does not exist.")
          return false
        }
      } catch(e) {
        console.log("An error occurred.")
      }
}
function checkFileExists(path){
  //console.log('file path: '+path)
  try {
    if (fs.existsSync(path)) {
      //file exists
      return true
    }
    else {
      return false}
  } catch(err) {
    //console.error(err)
  }
}

function createCompanyDirectory(companyId){
  if (!checkDirExists(`./company/${companyId}`)){
    //console.log('Company DNE')
    fs.mkdirSync(`./company/${companyId}`)
  } else {
    //console.log('Company Exists')
    
  }
}

function createSchemas(companyId){

  sql = `CREATE SCHEMA openidl_base_${companyId};\nCREATE SCHEMA openidl_ep_${companyId};`
  path = `./company/${companyId}/schemas.sql`
  if (!checkFileExists(path)){
    console.log(`Schema ${companyId} not found. Creating now.`)
    write(path, sql)
  }else {
    console.log(`Schema ${companyId} exists. Skipping Generation`)
  }
  
}

function generateTables(companyId){
  generateAULoss(companyId)
  generateAUPremium(companyId)
}

function generateAUPremium(companyId){
  sql = `create table openidl_base_${companyId}.au_premium
  (
  id SERIAL PRIMARY KEY,
  annual_statement_line VARCHAR,
  line_of_business VARCHAR,
  subline VARCHAR,
  record_type VARCHAR,
  transaction_type VARCHAR,
  transaction_code  VARCHAR,
  subline_category VARCHAR,
  accounting_date DATE,
  company_code VARCHAR,
  company_id VARCHAR,
  state VARCHAR,
  territory VARCHAR,
  optional_zip_code_indicator VARCHAR,
  premium_amount Numeric (20,6),
  program VARCHAR,
  effective_date DATE,
  expiration_date DATE,
  policy_identifier VARCHAR,
  accounting_term_expiration DATE,
  nc_program_enhancement VARCHAR,
  zip_code VARCHAR,
  zip_code_suffix VARCHAR,
  monthly_premium_amount Numeric (20,6),
  coverage_category VARCHAR,
  coverage VARCHAR,
  coverage_code VARCHAR,
  liability_limits_name VARCHAR,
  liability_limits_amount VARCHAR ,
  deductible_code VARCHAR,
  exposure Numeric (20,6),
  months_covered Numeric (20,6),
  single_multi_car_rating VARCHAR,
  terrorism VARCHAR,
  packaging VARCHAR,
  pool_affiliation VARCHAR,
  umuim_stacking VARCHAR,
  passive_restraint_discount VARCHAR,
  anti_lock_brakes_discount VARCHAR,
  defensive_driver_discount VARCHAR,
  operator_age VARCHAR,
  operator_age_code VARCHAR,
  gender VARCHAR,
  marital_status VARCHAR,
  marital_status_code VARCHAR,
  principal_secondary VARCHAR,
  drivers_training VARCHAR,
  good_student_discount VARCHAR,
  penalty_points VARCHAR,
  penalty_points_code Varchar,
  vehicle_use VARCHAR,
  vehicle_use_operator VARCHAR,
  commute_distance VARCHAR,
  annual_distance VARCHAR,
  vehicle_performance VARCHAR,
  body_style VARCHAR,
  body_size VARCHAR,
  model_year Numeric (20,6),
  symbol VARCHAR,
  reg_reporting_code varchar,
  reg_reporting_name varchar 
  );`

  path = `./company/${companyId}/au_premium.sql`
  if (!checkFileExists(path)){
    console.log(`AU Premium table ${companyId} not found. Creating now.`)
    write(path, sql)
  }else {
    console.log(`AU Premium table ${companyId} exists. Skipping Generation`)
  }
}

function generateAULoss(companyId){

sql = `create table openidl_base_${companyId}.au_loss
(
id SERIAL PRIMARY KEY,
line_of_business VARCHAR ,
subline VARCHAR ,
subline_category VARCHAR ,
accounting_date VARCHAR ,
company_code VARCHAR ,
company_id VARCHAR ,
state VARCHAR ,
territory VARCHAR ,
optional_zip_code_indicator VARCHAR ,
program VARCHAR ,
effective_date DATE,
expiration_date DATE,
nc_program_enhancement VARCHAR ,
zip_code VARCHAR ,
zip_code_suffix VARCHAR ,
coverage_category VARCHAR ,
coverage VARCHAR ,
coverage_code VARCHAR ,
deductible_amount VARCHAR ,
deductible_code VARCHAR ,
terrorism VARCHAR ,
packaging VARCHAR ,
pool_affiliation VARCHAR ,
umuim_stacking VARCHAR ,
passive_restraint_discount VARCHAR ,
anti_lock_brakes_discount VARCHAR ,
defensive_driver_discount VARCHAR ,
operator_age VARCHAR ,
operator_age_code VARCHAR ,
gender VARCHAR ,
marital_status VARCHAR ,
marital_status_code VARCHAR ,
principal_secondary VARCHAR ,
drivers_training VARCHAR ,
good_student_discount VARCHAR ,
penalty_points varchar,
vehicle_use VARCHAR ,
vehicle_use_operator VARCHAR ,
commute_distance VARCHAR ,
annual_distance VARCHAR ,
vehicle_performance VARCHAR ,
model_year VARCHAR ,
symbol VARCHAR ,
loss_amount Numeric (20,6),
claim_count Numeric (20,6),
cause_of_loss VARCHAR ,
accident_date DATE,
occurrence_identifier VARCHAR ,
claim_identifier VARCHAR ,
limited_coding_loss_transaction VARCHAR ,
created_time VARCHAR ,
record_type VARCHAR ,
transaction_type VARCHAR ,
transaction_code VARCHAR ,
chunk_id VARCHAR,
reg_reporting_code varchar,
reg_reporting_name varchar 
);`

path = `./company/${companyId}/au_loss.sql`
if (!checkFileExists(path)){
  console.log(`AU Loss table ${companyId} not found. Creating now.`)
  write(path, sql)
}else {
  console.log(`AU Loss table ${companyId} exists. Skipping Generation`)
}

}

function createCarYears(companyId){
  sql = getCarYears(companyId)
  path = `./company/${companyId}/car_years_function.sql`
  if (!checkFileExists(path)){
    console.log(`Car Years Function ${companyId} not found. Creating now.`)
    write(path, sql)
  }else {
    console.log(`Car Years Function ${companyId} exists. Skipping Generation`)
  }
}

function main(buildObject){
    let name = buildObject.name
    final = masterFile.records[masterFile.records.length-1]
    finalId = parseInt(final.ID)
    companyId = null
    if (!'id' in buildObject){
      final = masterFile.records[masterFile.records.length-1]
      finalId = parseInt(final.ID)
      companyId = (finalId+=1).toString()
    } else {
      companyId = buildObject.ID
    }
    companyId = (finalId+=1).toString()
    console.log(`name: ${name} id: ${companyId}`)
    
    createCompanyDirectory(companyId)
    createSchemas(companyId)
    generateTables(companyId)
    createCarYears(companyId)





}

buildObject = {"Name": "Shepard Mutual", "Lines": ["AU", "HO"]}
main(buildObject)