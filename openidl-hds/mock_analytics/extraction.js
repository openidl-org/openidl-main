const ep = require('./../sql/system/orchestration/ref/function/auto_build_extraction.js')
function getExtraction(){
    //sql = 'select count(1) from openidl_base_@comp.au_premium;|'
    sql = ep('@comp')
    return sql
}

module.exports = getExtraction