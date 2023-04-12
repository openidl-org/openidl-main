function getReport(companyId, startDate, endDate){
    sql = `
SELECT a.reporting_code,
    a.reporting_name,
    ROUND(openidl_ep_${companyId}.tmp_pa_earned_premium('${startDate}' :: DATE,'${endDate}' :: DATE, a.reporting_code)) earned_premium,
    ROUND(openidl_ep_${companyId}.tmp_pa_car_years('${startDate}' :: DATE, '${endDate}' :: DATE, a.reporting_code)) car_years,
    ROUND(openidl_ep_${companyId}.tmp_pa_incurred_loss('${startDate}'::DATE, '${endDate}'::DATE,a.reporting_code)) incurred_loss,
    ROUND(openidl_ep_${companyId}.tmp_pa_incurred_count('${startDate}'::DATE, '${endDate}'::DATE,a.reporting_code)) incurred_count,
    ROUND(openidl_ep_${companyId}.tmp_pa_basic_limit_il('${startDate}'::DATE, '${endDate}'::DATE,a.reporting_code)) basic_limit_il,
    ROUND(openidl_ep_${companyId}.tmp_pa_excess_limit_il('${startDate}'::DATE, '${endDate}'::DATE,a.reporting_code)) excess_limit_il
FROM   openidl_ep_${companyId}.tmp_pa_coverage_ref a; 

    `
    return sql
}

module.exports = getReport