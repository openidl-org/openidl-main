const getCoverageReport = require('./pa_coverage_extraction_report');
const getMap = require('./pa_coverage_map')



function getSQLReport(companyId){

    extractionPattern = {}
    map = getMap(companyId,'|')
    reduce = getCoverageReport(companyId)
    
    extractionPattern = map+' '+reduce
    return extractionPattern
}

module.exports = getSQLReport