const getHoDoiReport = require('./ho_doi_report');
const getEarnedPremium = require('./ho_ep_func')
// const getIncurredCount = require('./ho_ic_func')
const getIncurredLoss = require('./ho_il_func')
const getPreTable = require('./ho_tmp_pc.js')
//const getReportingTable = require('./tmp_ho_reporting_ref_tbl.js')
const getTearDown = require('./ho_tear_down.js')
const getHomeownerOutstandingLoss = require('./ho_ol_func.js')
const getRefTable = require('./tmp_ho_report_ref_tbl.js')


function getBuilder(companyId){

    extractionPattern = {}
    map = getMap(companyId)
    reduce = getHoDoiReport(companyId)
    clean = getTearDown(companyId)
    extractionPattern = {"map": map, "reduce": reduce, "clean": clean}
    extractionPattern = {"map": map, "reduce": reduce, "clean": clean}
    return extractionPattern
}

function getMap(companyId){
    sqlArray = []
    sqlArray.push(getTearDown(companyId))
    sqlArray.push(getPreTable(companyId))
    //sqlArray.push(getReportingTable(companyId))
    sqlArray.push(getRefTable(companyId))
    sqlArray.push(getEarnedPremium(companyId))
    sqlArray.push(getHomeownerOutstandingLoss(companyId))
    sqlArray.push(getIncurredLoss(companyId))
    // sqlArray.push(getIncurredCount(companyId))
    sqlArray.push(getHoDoiReport(companyId))
    sqlString = sqlArray.join(' ') //join on what? 
    return sqlString    
}



module.exports = getBuilder