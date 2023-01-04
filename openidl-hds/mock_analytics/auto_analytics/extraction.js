const ep = require('./../../sql/system/orchestration/ref/function/auto/auto_coverage_report_sql.js')
function getExtraction(){
    //sql = 'select count(1) from openidl_base_@comp.au_premium;|'
    sql = ep('@comp')
    return sql
}

module.exports = getExtraction