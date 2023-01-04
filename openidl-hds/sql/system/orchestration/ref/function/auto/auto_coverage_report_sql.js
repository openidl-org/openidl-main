const getCoverageReport = require('./auto_coverage_report');
const getMap = require('./auto_coverage_map')



function getBuilder(companyId){

    extractionPattern = {}
    map = getMap(companyId)
    reduce = getCoverageReport(companyId)
    
    extractionPattern = map+reduce
    return extractionPattern
}

module.exports = getBuilder