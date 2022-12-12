    n9999 = require("./example_data_9999.json").result
    rows9999 = (n9999[0].result.result.rows)

    n9998 = require("./example_data_9998.json").result
    rows9998 = (n9998[0].result.result.rows)

    n9997 = require("./example_data_9997.json").result
    rows9997 = (n9997[0].result.result.rows)

    report = []
for (index in rows9999){
    console.log(index)
    nine = rows9999[index]
    eight = rows9998[index]
    seven = rows9997[index]
    ep = nine['earned_premium'] + eight['earned_premium'] + seven['earned_premium']
    cy = nine['car_years'] +  eight['car_years'] + seven['car_years']
    il = nine['incurred_loss'] + eight['incurred_loss'] + seven['incurred_loss']
    ic = nine['incurred_count'] + eight['incurred_count'] + seven['incurred_count']
    final = {"ReportingCode": nine.reporting_code, "ReportingName" : nine.reporting_name, 
"EarnedPremium": ep, "CarYears": cy, "IncurredLoss": il, "IncurredCount": ic}
    console.table(final)
    report.push(final)
}
// console.log(report)
console.log(`Coverage                   | Earned Premium      | Car Years, Incurred Loss, Incurred Count`)
console.log('--------------------------------------------------------------------')
for (line of report){
             //Phy Dam - Coll - ALL OTHER,
    blank = `                           `.substring(0,27-line.ReportingName.length)
    reportName = line.ReportingName+blank
    ep = 20-line.EarnedPremium.toString().length
    blank2 = `                  `.substring(0,ep) 
    earnedPremium = line.EarnedPremium+blank2

    out = `${reportName}| ${earnedPremium}| ${line.CarYears}, ${line.IncurredLoss}, ${line.IncurredCount}`
    console.log(out)
    console.log('--------------------------------------------------------------------')
    // console.table(line)
}
//Phy Dam - Coll - ALL OTHER,