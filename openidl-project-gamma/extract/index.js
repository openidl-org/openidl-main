const ep = require('./earned-premium')

let start = "2020-02-01"
let end = "2021-01-01"
let covCode = "1"
earnedPremium = ep.earnPremium(start,end,covCode)
