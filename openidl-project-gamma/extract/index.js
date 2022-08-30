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

async function main(){
    await manager.connect();
    earnedPremium = await ep.earnPremium(start,end,covCode, manager)
    carYears = await cy.getCarYears(start,end,covCode,manager)
    incurredCount = await iCount.getIncurredCount(start,end,covCode,manager)
    incurredLoss = await iLoss.getIncurredLoss(start,end,covCode,manager)
    await manager.disconnect();
}

main()
