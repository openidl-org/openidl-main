function getRefTable(){
    sql = `
create table tmp_pa_coverage_ref as
select reporting_code, reporting_name 
from tmp_pa_coverage 
where reporting_code is not null
group by reporting_code, reporting_name 
order by reporting_name;
    `
    return sql
}

module.exports = getRefTable