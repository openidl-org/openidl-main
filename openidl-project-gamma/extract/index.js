const ep = require('./earned-premium')
const cy = require('./car-years')
const iCount = require('./incurred-count')
const iLoss = require('./incurred-loss')

let start = "2020-02-01"
let end = "2021-01-01"
let covCode = "1"
earnedPremium = ep.earnPremium(start,end,covCode)
console.log('after ep')
// carYears = cy.getCarYears(start,end,covCode)
// incurredCount = iCount.getIncurredCount(start,end,covCode)
// incurredLoss = iLoss.getIncurredLoss(start,end,covCode)
