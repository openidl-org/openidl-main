const fs = require('fs');
const masterFile = require('../../../../../../con-data/hds-chain.json');
const getCarYears = require('./ref/function/auto_cy_reporting');
const getEarnedPremium = require('./ref/function/auto_ep_reporting')
const getIncurredCount = require('./ref/function/auto_ic_reporting')
const getIncurredLoss = require('./ref/function/auto_il_reporting')

function write(path, value){
  // console.log(`write, path: ${path}\n value: ${value}`)
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
  console.log('create dir: '+companyId)
  if (!checkDirExists(`./company/${companyId}`)){
    console.log('Company DNE')
    fs.mkdirSync(`./company/${companyId}`)
  } else {
    console.log('Company Exists')
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
  sql = getEarnedPremium(companyId)
  path = `./company/${companyId}/au_premium.sql`
  if (!checkFileExists(path)){
    console.log(`AU Premium table ${companyId} not found. Creating now.`)
    write(path, sql)
  }else {
    console.log(`AU Premium table ${companyId} exists. Skipping Generation`)
  }
}

function generateAULoss(companyId){

sql = getIncurredLoss(companyId)

path = `./company/${companyId}/au_loss.sql`
if (!checkFileExists(path)){
  console.log(`AU Loss table ${companyId} not found. Creating now.`)
  write(path, sql)
}else {
  console.log(`AU Loss table ${companyId} exists. Skipping Generation`)
}

}

function getCompanyId(buildObject){
  
  let name = buildObject.Name
  console.log('name: '+name+' ID: '+buildObject.ID)
  companyId = null
  if (!('ID' in buildObject)){

    companyId = Math.round(Date.now())
    buildObject.id = companyId
  } else {
    companyId = buildObject.id
  }
  console.log(`name: ${name} id: ${companyId}`)
  return buildObject
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

function createEarnedPremium(companyId){
  sql = getEarnedPremium(companyId)
  path = `./company/${companyId}/earned_premium.sql`
  if (!checkFileExists(path)){
    console.log(`Earned Premium Function ${companyId} not found. Creating now.`)
    write(path, sql)
  }else {
    console.log(`Earned Premium Function ${companyId} exists. Skipping Generation`)
  }
}

function createIncurredCount(companyId){
  sql = getIncurredCount(companyId)
  path = `./company/${companyId}/incurred_count.sql`
  if (!checkFileExists(path)){
    console.log(`Incurred Count Function ${companyId} not found. Creating now.`)
    write(path, sql)
  }else {
    console.log(`Incurred Count Function ${companyId} exists. Skipping Generation`)
  }
}

function createIncurredLoss(companyId){
  sql = getIncurredCount(companyId)
  path = `./company/${companyId}/incurred_loss.sql`
  if (!checkFileExists(path)){
    console.log(`Incurred Loss Function ${companyId} not found. Creating now.`)
    write(path, sql)
  }else {
    console.log(`Incurred Loss Function ${companyId} exists. Skipping Generation`)
  }
}



function initCompany(build){
  companyId = build.id
  createCompanyDirectory(companyId)
  createSchemas(companyId)
  generateTables(companyId)
  createCarYears(companyId)
  createEarnedPremium(companyId)
  createIncurredCount(companyId)
  createIncurredLoss(companyId)

}

function main(buildObject){
    completeBuildObject = getCompanyId(buildObject)
    console.table(completeBuildObject)
    initCompany(completeBuildObject)
    

}

buildObject = {"Name": "Shepard Mutual",
 "Lines": ["AU", "HO"],"ID":"3"}
main(buildObject)