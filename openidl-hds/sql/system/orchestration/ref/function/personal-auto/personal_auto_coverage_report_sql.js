const getCoverageReport = require('./personal_auto_coverage_report');
const getMap = require('./personal_auto_coverage_map')



function getSQLReport(companyId){

    extractionPattern = {}
    map = getMap(companyId,'|')
    reduce = getCoverageReport(companyId)
    
    extractionPattern = map+'|'+reduce
    return extractionPattern
}

module.exports = getSQLReport