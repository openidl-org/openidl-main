const MongoDBManager = require('../../openidl-extraction-pattern-developer/service/mongo-database-manager');
const conn = require('../../openidl-extraction-pattern-developer/connection.json');
var manager = new MongoDBManager({ url: 'mongodb://localhost:27017' });
const dbName = conn.dbName;

const ep = require('./earned-premium')
const cy = require('./car-years')
const iCount = require('./incurred-count')
const iLoss = require('./incurred-loss')

let start = "2020-02-01"
let end = "2021-01-01"
let covCode = "1"

async function getBodilyInjury(start,end,manager){
    let covCode = ["1","9"]
    earnedPremium = await ep.earnPremium(start,end,covCode, manager)
    carYears = await cy.getCarYears(start,end,covCode,manager)
    incurredCount = await iCount.getIncurredCount(start,end,covCode,manager)
    incurredLoss = await iLoss.getIncurredLoss(start,end,covCode,manager)
    let row = {"Earned Premium": earnedPremium, "Car Years": carYears, "Incurred Count": incurredCount, "Incurred Loss": incurredLoss}
    return row
    
}

async function getPropertyDamage(start,end,manager){
    const covCode = ["2"]
    earnedPremium = await ep.earnPremium(start,end,covCode, manager)
    carYears = await cy.getCarYears(start,end,covCode,manager)
    incurredCount = await iCount.getIncurredCount(start,end,covCode,manager)
    incurredLoss = await iLoss.getIncurredLoss(start,end,covCode,manager)
    let row = {"Earned Premium": earnedPremium, "Car Years": carYears, "Incurred Count": incurredCount, "Incurred Loss": incurredLoss}
    return row
    
}

async function getSingleBIPDLimit(start,end, manager){
    const covCode = ["3"]
    earnedPremium = await ep.earnPremium(start,end,covCode, manager)
    carYears = await cy.getCarYears(start,end,covCode,manager)
    incurredCount = await iCount.getIncurredCount(start,end,covCode,manager)
    incurredLoss = await iLoss.getIncurredLoss(start,end,covCode,manager)
    let row = {"Earned Premium": earnedPremium, "Car Years": carYears, "Incurred Count": incurredCount, "Incurred Loss": incurredLoss}
    return row  
}

async function getMedicalPayments(start,end, manager){
    const covCode = ["5"]
    earnedPremium = await ep.earnPremium(start,end,covCode, manager)
    carYears = await cy.getCarYears(start,end,covCode,manager)
    incurredCount = await iCount.getIncurredCount(start,end,covCode,manager)
    incurredLoss = await iLoss.getIncurredLoss(start,end,covCode,manager)
    let row = {"Earned Premium": earnedPremium, "Car Years": carYears, "Incurred Count": incurredCount, "Incurred Loss": incurredLoss}
    return row  
}

async function getUninsuredUnderinsured(start,end, manager){
    const covCode = ["6","X","Y"]
    earnedPremium = await ep.earnPremium(start,end,covCode, manager)
    carYears = await cy.getCarYears(start,end,covCode,manager)
    incurredCount = await iCount.getIncurredCount(start,end,covCode,manager)
    incurredLoss = await iLoss.getIncurredLoss(start,end,covCode,manager)
    let row = {"Earned Premium": earnedPremium, "Car Years": carYears, "Incurred Count": incurredCount, "Incurred Loss": incurredLoss}
    return row  
}

async function main(start,end){
    await manager.connect();
    let bodilyInjury = await getBodilyInjury(start,end,manager)
    // let propertyDamage = await getPropertyDamage(start,end,manager)
    // let singleBIPDLimit = await getSingleBIPDLimit(start,end, manager)
    // let medicalPayments = await getMedicalPayments(start,end,manager)
    // let uninsuredUnderinsured = await getUninsuredUnderinsured(start,end,manager)
    await manager.disconnect();
    console.log("Bodily Injury")
    console.table(bodilyInjury)
    // console.log("Property Damage")
    // console.table(propertyDamage)
    // console.log('Single BI/PD Limit')
    // console.table(singleBIPDLimit)
    // console.log('Medical Payments')
    // console.table(medicalPayments)
    // console.log("Uninsured/Underinsured")
    // console.table(uninsuredUnderinsured)
   
}


main(start,end)
