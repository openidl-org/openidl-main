const getHoDoiReport = require('./ho_doi_report');
// const getCarYears = require('./ho_cy_func');
const getEarnedPremium = require('./ho_ep_func')
const getIncurredCount = require('./ho_ic_func')
const getIncurredLoss = require('./ho_il_func')
const getPreTable = require('./ho_tmp_pc.js')
const getReportingTable = require('./ho_tmp_reporting_tbl.js')
const getTearDown = require('./ho_tear_down.js')
const getHomeownerOutstanding = require('./ho_outstanding.js')
const getRefTable = require('./ho_tmp_report_ref_tbl.js')


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
    sqlArray.push(getReportingTable(companyId))
    sqlArray.push(getRefTable(companyId))
    sqlArray.push(getCarYears(companyId))
    sqlArray.push(getEarnedPremium(companyId))
    sqlArray.push(getHomeownerOutstanding(companyId))
    sqlArray.push(getIncurredLoss(companyId))
    sqlArray.push(getIncurredCount(companyId))
    sqlArray.push(getHoDoiReport(companyId))
    sqlString = sqlArray.join(' ') //join on what? 
    return sqlString    
}



module.exports = getBuilder