// const getHoDoiReport = require('./ho_doi_report');
const getEarnedPremium = require('./ho_ep_func')
const getIncurredLoss = require('./ho_il_func')
const getWrittenPremium = require('./ho_wp_func')
const getPaidLoss = require('./ho_pl_func')
const getPreTable = require('./ho_tmp_pc.js')
const getReportingRefTable = require('./tmp_ho_reporting_ref_tbl.js')
const getTearDown = require('./ho_tear_down.js')
const getHomeownerOutstandingLoss = require('./ho_ol_func.js')





function getMap(companyId){
    sqlArray = []
    sqlArray.push(getTearDown(companyId))
    sqlArray.push(getPreTable(companyId))
    sqlArray.push(getReportingRefTable(companyId))
    sqlArray.push(getEarnedPremium(companyId))
    sqlArray.push(getWrittenPremium(companyId))
    sqlArray.push(getPaidLoss(companyId))
    sqlArray.push(getHomeownerOutstandingLoss(companyId))
    sqlArray.push(getIncurredLoss(companyId))
    sqlString = sqlArray.join(' ') //join on what? 
    return sqlString    
}

module.exports = getMap