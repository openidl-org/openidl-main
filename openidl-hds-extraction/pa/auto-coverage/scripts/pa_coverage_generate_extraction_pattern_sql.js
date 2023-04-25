const getCoverageReport = require('./pa_coverage_extraction_report');
const getMap = require('./pa_coverage_map')



function getSQLReport(companyId, startDate, endDate){

    extractionPattern = {}
    map = getMap(companyId,' ', startDate, endDate)
    reduce = getCoverageReport(companyId, startDate, endDate)
    
    extractionPattern = map+' '+reduce
    return extractionPattern
}

module.exports = getSQLReport