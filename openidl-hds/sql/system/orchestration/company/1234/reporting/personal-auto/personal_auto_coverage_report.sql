
    select *, round(openidl_ep_1234.tmp_au_earned_premium('2000-01-01'::DATE, '2002-01-01'::DATE,a.reporting_code)) earned_premium 
    ,round(openidl_ep_1234.tmp_car_years('2000-01-01'::DATE, '2002-01-01'::DATE,a.reporting_code)) car_years
    ,round(openidl_ep_1234.tmp_au_incurred_count('2000-01-01'::DATE, '2002-01-01'::DATE,a.reporting_code)) incurred_count
    ,round(openidl_ep_1234.tmp_au_incurred_loss('2000-01-01'::DATE, '2002-01-01'::DATE,a.reporting_code)) incurred_loss
    from openidl_ep_1234.tmp_au_coverage_ref a; 
    
    