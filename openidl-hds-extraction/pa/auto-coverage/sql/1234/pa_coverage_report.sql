
SELECT a.reporting_code,
    a.reporting_name,
    ROUND(openidl_ep_1234.tmp_pa_earned_premium('2020-01-01' :: DATE,'2021-01-01' :: DATE, a.reporting_code)) earned_premium,
    ROUND(openidl_ep_1234.tmp_pa_car_years('2020-01-01' :: DATE, '2021-01-01' :: DATE, a.reporting_code)) car_years,
    ROUND(openidl_ep_1234.tmp_pa_incurred_loss('2020-01-01'::DATE, '2021-01-01'::DATE,a.reporting_code)) incurred_loss,
    ROUND(openidl_ep_1234.tmp_pa_incurred_count('2020-01-01'::DATE, '2021-01-01'::DATE,a.reporting_code)) incurred_count,
    ROUND(openidl_ep_1234.tmp_pa_basic_limit_il('2020-01-01'::DATE, '2021-01-01'::DATE,a.reporting_code)) basic_limit_il,
    ROUND(openidl_ep_1234.tmp_pa_excess_limit_il('2020-01-01'::DATE, '2021-01-01'::DATE,a.reporting_code)) excess_limit_il
FROM   openidl_ep_1234.tmp_pa_coverage_ref a; 

    