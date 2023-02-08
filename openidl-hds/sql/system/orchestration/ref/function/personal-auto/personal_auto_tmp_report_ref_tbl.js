function getRefTable(companyId){
    sql = `
    create table openidl_ep_${companyId}.tmp_au_coverage_ref as
    select reporting_code, reporting_name 
    from openidl_ep_${companyId}.tmp_au_coverage 
    group by reporting_code, reporting_name 
    order by reporting_code::numeric ;
    
    `
    return sql
}

module.exports = getRefTable