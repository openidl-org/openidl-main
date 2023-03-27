const getHoDoiReport = require('./ho_doi_report');
const getMap = require('./ho_doi_map')

function getBuilder(companyId){

    extractionPattern = {}
    map = getMap(companyId,'|')
    reduce = getHoDoiReport(companyId)
    
    extractionPattern = map +'|'+ reduce
    return extractionPattern
}

module.exports = getBuilder