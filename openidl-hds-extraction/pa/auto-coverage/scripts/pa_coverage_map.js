const getCarYears = require('./pa_car_years_func');
const getEarnedPremium = require('./pa_earned_premium_func')
const getIncurredCount = require('./pa_incurred_count_func')
const getIncurredLoss = require('./pa_incurred_loss_func')
const getPersonalAutoOutstanding = require('./pa_auto_outstanding_func.js')
const getTearDown = require('./pa_tear_down.js')
const getRefTable = require('./pa_coverage_ref_tbl.js')
const getReportingTable = require('./pa_coverage_tbl')
const getBasicLimitIl = require('./pa_basic_limit_il');
const getExcessLimitIl = require('./pa_excess_limit_il');







function getMap(companyId, delimiter, startDate, endDate){
    sqlArray = []
    sqlArray.push(getTearDown(companyId))
    sqlArray.push(getReportingTable(companyId,startDate, endDate))
    sqlArray.push(getRefTable(companyId))
    sqlArray.push(getCarYears(companyId))
    sqlArray.push(getEarnedPremium(companyId))
    sqlArray.push(getPersonalAutoOutstanding(companyId))
    sqlArray.push(getIncurredLoss(companyId))
    sqlArray.push(getIncurredCount(companyId))

    sqlArray.push(getBasicLimitIl(companyId))
    sqlArray.push(getExcessLimitIl(companyId))
    

    //sqlArray.push(getCoverageReport(companyId))
    sqlString = sqlArray.join(delimiter) 
    return sqlString    
}

module.exports = getMap