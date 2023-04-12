function getRefTable(companyId){
    sql = `
CREATE TABLE openidl_ep_${companyId}.tmp_pa_coverage_ref as
SELECT reporting_code, reporting_name 
FROM openidl_ep_${companyId}.tmp_pa_coverage 
WHERE reporting_code IS NOT NULL
GROUP BY reporting_code, reporting_name 
ORDER BY reporting_code::numeric;

    `
    return sql
}

module.exports = getRefTable