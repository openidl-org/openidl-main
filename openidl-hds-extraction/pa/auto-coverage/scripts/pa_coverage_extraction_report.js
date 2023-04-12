function getReport(companyId){
    sql = `
SELECT a.reporting_code,
    a.reporting_name,
    ROUND(tmp_au_earned_premium('2020-01-01' :: DATE,'2021-01-01' :: DATE, a.reporting_code)) earned_premium,
    ROUND(tmp_car_years('2020-01-01' :: DATE, '2021-01-01' :: DATE, a.reporting_code)) car_years,
    ROUND(tmp_pa_incurred_loss('2020-01-01'::DATE, '2021-01-01'::DATE,a.reporting_code)) incurred_loss,
    ROUND(tmp_pa_incurred_count('2020-01-01'::DATE, '2021-01-01'::DATE,a.reporting_code)) incurred_count,
    ROUND(openidl_ep_9997.tmp_pa_basic_limit_il('2020-01-01'::DATE, '2021-01-01'::DATE,a.reporting_code) basic_limt_il
FROM   openidl_ep_${companyId}.tmp_pa_coverage_ref a; 

    `
    return sql
}

module.exports = getReport