const getCoverageReport = require('./pa_coverage_extraction_report');
const getMap = require('./pa_coverage_map')
const getTearDown = require('./pa_tear_down')

function getBuilder(companyId, startDate, endDate){

    extractionPattern = {}
    map = getMap(companyId,' ', startDate, endDate)
    reduce = getCoverageReport(companyId, startDate, endDate)
    clean = getTearDown(companyId)
    extractionPattern = {"map": map, "reduce": reduce, "clean": clean}
    return extractionPattern
}


module.exports = getBuilder