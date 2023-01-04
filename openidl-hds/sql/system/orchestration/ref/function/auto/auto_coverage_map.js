const getCarYears = require('./auto_cy_func');
const getEarnedPremium = require('./auto_ep_func')
const getIncurredCount = require('./auto_ic_func')
const getIncurredLoss = require('./auto_il_func')
const getPreTable = require('./auto_tmp_pc.js')
const getReportingTable = require('./auto_tmp_reporting_tbl.js')
const getTearDown = require('./auto_tear_down.js')
const getAutoOutstanding = require('./auto_outstanding.js')
const getRefTable = require('./auto_tmp_report_ref_tbl.js')





function getMap(companyId){
    sqlArray = []
    sqlArray.push(getTearDown(companyId))
    sqlArray.push(getPreTable(companyId))
    sqlArray.push(getReportingTable(companyId))
    sqlArray.push(getRefTable(companyId))
    sqlArray.push(getCarYears(companyId))
    sqlArray.push(getEarnedPremium(companyId))
    sqlArray.push(getAutoOutstanding(companyId))
    sqlArray.push(getIncurredLoss(companyId))
    sqlArray.push(getIncurredCount(companyId))
    //sqlArray.push(getCoverageReport(companyId))
    sqlString = sqlArray.join(' ') //join on what? 
    return sqlString    
}

module.exports = getMap