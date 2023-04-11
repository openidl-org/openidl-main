function getReport(companyId){
    sql = `
    SELECT a.reporting_code,
       a.reporting_name,
		Round(tmp_au_earned_premium('2020-01-01' :: DATE,'2021-01-01' :: DATE, a.reporting_code)) earned_premium,
		Round(tmp_car_years('2020-01-01' :: DATE, '2021-01-01' :: DATE, a.reporting_code)) car_years,
        Round(tmp_pa_incurred_loss('2020-01-01'::DATE, '2021-01-01'::DATE,a.reporting_code)) incurred_loss,
        round(tmp_pa_incurred_count('2020-01-01'::DATE, '2021-01-01'::DATE,a.reporting_code)) incurred_count
    FROM   openidl_ep_${companyId}.tmp_pa_coverage_ref a; 

    `
    return sql
}

module.exports = getReport