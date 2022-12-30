function getHandTests(companyId){
    sql = `
    select * from openidl_base_${companyId}.au_policy;   
    select * from openidl_base_${companyId}.au_claim;
    
    select * from openidl_ep_${companyId}.tmp_au_coverage;
    select round(openidl_ep_${companyId}.tmp_car_years('2000-01-01'::DATE, '2002-01-01'::DATE,a.reporting_code)) car_years
        from openidl_ep_${companyId}.tmp_au_coverage a;

    select round(openidl_ep_${companyId}.tmp_au_earned_premium('2000-01-01'::DATE, '2002-01-01'::DATE,a.reporting_code)) earned_premium
        from openidl_ep_${companyId}.tmp_au_coverage a;

    select round(openidl_ep_${companyId}.tmp_au_incurred_count('1995-01-01'::DATE, '2002-01-01'::DATE,a.reporting_code)) incurred_count
        from openidl_ep_${companyId}.tmp_au_coverage a;
        
    select round(openidl_ep_${companyId}.tmp_au_incurred_loss('1995-01-01'::DATE, '2002-01-01'::DATE,a.reporting_code)) incurred_loss
        from openidl_ep_${companyId}.tmp_au_coverage a;
    
        `
    return sql
}

module.exports = getHandTests