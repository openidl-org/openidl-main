function getExtraction(){
    sql = 'select count(1) from openidl_base_@comp.au_premium;|'
    return sql
}

module.exports = getExtraction