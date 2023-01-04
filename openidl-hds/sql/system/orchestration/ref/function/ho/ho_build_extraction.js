const getHoDoiReport = require('./ho_doi_report');
const getMap = require('./ho_doi_map')
const getTearDown = require('./ho_tear_down.js')




function getBuilder(companyId){

    extractionPattern = {}
    map = getMap(companyId, ' ')
    reduce = getHoDoiReport(companyId)
    clean = getTearDown(companyId)
    extractionPattern = {"map": map, "reduce": reduce, "clean": clean}
    return extractionPattern
}

module.exports = getBuilder