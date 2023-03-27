const ep = require('./../../sql/system/orchestration/ref/function/ho/ho_doi_report_sql.js')

function getExtraction(){
    sql = ep('@comp')
    return sql
}

module.exports = getExtraction