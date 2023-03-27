const getCoverageReport = require('./personal_auto_coverage_report');
const getMap = require('./personal_auto_coverage_map')
const getTearDown = require('./personal_auto_tear_down.js')

function getBuilder(companyId){

    extractionPattern = {}
    map = getMap(companyId,' ')
    reduce = getCoverageReport(companyId)
    clean = getTearDown(companyId)
    extractionPattern = {"map": map, "reduce": reduce, "clean": clean}
    return extractionPattern
}


module.exports = getBuilder