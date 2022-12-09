const getCoverageReport = require('./auto_coverage_report');
const getCarYears = require('./auto_cy_func');
const getEarnedPremium = require('./auto_ep_func')
const getIncurredCount = require('./auto_ic_func')
const getIncurredLoss = require('./auto_il_func')
const getPreTable = require('./auto_tmp_pre_tbl.js')
const getReportingTable = require('./auto_tmp_reporting_tbl.js')
const getTearDown = require('./auto_tear_down.js')
const getAutoOutstanding = require('./auto_outstanding.js')
const getRefTable = require('./auto_tmp_report_ref_tbl.js')


function getBuilder(companyId){

    sqlArray = []
    sqlArray.push(getPreTable(companyId))
    sqlArray.push(getReportingTable(companyId))
    sqlArray.push(getRefTable(companyId))
    sqlArray.push(getCarYears(companyId))
    sqlArray.push(getEarnedPremium(companyId))
    sqlArray.push(getAutoOutstanding(companyId))
    sqlArray.push(getIncurredLoss(companyId))
    sqlArray.push(getIncurredCount(companyId))
    sqlArray.push(getCoverageReport(companyId))
    sqlArray.push(getTearDown(companyId))
    sqlString = sqlArray.join('|')
    return sqlString
}

module.exports = getBuilder