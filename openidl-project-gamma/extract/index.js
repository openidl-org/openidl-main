
var r1 = require('../data/processed/idmPremiumRecord.json')
var Records = require('../data/processed/idmPremiumRecords.json')
//console.table(premium)
//Object.keys(r1).forEach(el => console.log(el));

//Object.keys(r1).forEach(el => console.log(r1[el])) 

// var p1 = r1['Policy']['PremiumAmount']
// console.log(p1)

//Object.keys(records).forEach(el => console.log(records[el])) 

// for (var record in records.records){   
//     console.log('15 '+record['Policy']) 
//     var lcl_premium = record['Policy']['PremiumAmount']
//     var lcl_policy = record['Policy']['PolicyIdentifier']
//     console.log(lcl_policy+' '+lcl_premium)
// }

let earned_premium = 0
Records.records.forEach(
    function(records){
        //console.log(records.Policy.PolicyIdentifier+' '+records.Policy.PremiumAmount)
        earned_premium+=records.Policy.PremiumAmount
    }
)
console.log('Earned Premium: '+earned_premium)