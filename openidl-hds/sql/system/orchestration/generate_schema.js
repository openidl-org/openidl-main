const fs = require('fs');
const masterFile = require('../../../../../../con-data/hds-chain.json');
const getCarYears = require('./ref/function/auto_cy_reporting');
const getEarnedPremium = require('./ref/function/auto_ep_reporting')
const getIncurredCount = require('./ref/function/auto_ic_reporting')
const getIncurredLoss = require('./ref/function/auto_il_reporting')
const getAutoLoss = require('./ref/function/auto_loss_table.js');
const getAutoPremium = require('./ref/function/auto_premium_table.js');


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

function createAutoPremium(companyId){
  sql = getAutoPremium(companyId)
  path = `./company/${companyId}/auto_premium.sql`
  if (!checkFileExists(path)){
    console.log(`Auto Premium Table ${companyId} not found. Creating now.`)
    write(path, sql)
  }else {
    console.log(`Auto Premium Table ${companyId} exists. Skipping Generation`)
  }
}

function createAutoLoss(companyId){
  sql = getAutoLoss(companyId)

  path = `./company/${companyId}/auto_loss.sql`
  if (!checkFileExists(path)){
    console.log(`Auto Loss Table ${companyId} not found. Creating now.`)
    write(path, sql)
  }else {
    console.log(`Auto Loss Table ${companyId} exists. Skipping Generation`)
  }
}

function initCompany(build){
  companyId = build.ID
  console.log('init company: '+companyId)
  createCompanyDirectory(companyId)
  createSchemas(companyId)
  createCarYears(companyId)
  createEarnedPremium(companyId)
  createIncurredCount(companyId)
  createIncurredLoss(companyId)
  createAutoLoss(companyId)
  createAutoPremium(companyId)

}

function main(buildObjects){
    for (object of buildObjects){
        console.table(object)
        initCompany(object)
    }    

}

buildObject = [{"Name": "Shepard Mutual",
 "ID": "3"},{"Name": "Lab Insurance Group",
 "ID": "4"},{"Name": "York Farmers INC",
 "ID": "5"}]
main(buildObject)