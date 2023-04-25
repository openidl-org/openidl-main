function getEarnedPremium(){
    let earnedPremium = `
CREATE OR REPLACE FUNCTION  openidl_ep_${companyId}.tmp_pa_earned_premium(IN start_date date,IN end_date date, IN pv_reporting_code VARCHAR)
RETURNS NUMERIC AS $$DECLARE ep numeric;
BEGIN
    SELECT sum(a.ep)
    from (
        (SELECT 1 ggroup,
            Datediff(accounting_date,accounting_term_expiration) * monthly_premium_amount ep
            FROM    openidl_ep_${companyId}.tmp_pa_coverage
            WHERE  accounting_date >= start_date
            AND accounting_term_expiration < end_date
            AND fk_transaction_code_id in (1,8)
            AND reporting_code = pv_reporting_code) 
        union all 
            (SELECT 2 ggroup,                                                      
            Datediff(accounting_date, end_date) * monthly_premium_amount  ep   
            FROM    openidl_ep_${companyId}.tmp_pa_coverage
            WHERE  accounting_date < start_date
            AND accounting_term_expiration> start_date
            AND accounting_term_expiration< end_date
            AND fk_transaction_code_id in (1,8)
            AND reporting_code = pv_reporting_code
            )
        union all 
            (SELECT 3 ggroup,
            Datediff(accounting_date, end_date) * monthly_premium_amount ep
            FROM    openidl_ep_${companyId}.tmp_pa_coverage
            WHERE  accounting_date > start_date
            AND accounting_date < end_date
            AND accounting_term_expiration > end_date
            AND fk_transaction_code_id in (1,8)
            AND reporting_code = pv_reporting_code)
        union all
            (SELECT 4 ggroup,       
            Datediff(start_date, end_date) *monthly_premium_amount ep
            FROM    openidl_ep_${companyId}.tmp_pa_coverage
            WHERE  accounting_date < start_date
            AND accounting_term_expiration > end_date
            AND fk_transaction_code_id in (1,8)
            AND reporting_code = pv_reporting_code)) a into ep;
    RETURN ep;
END$$ language plpgsql;

    `
    return earnedPremium
}

module.exports = getEarnedPremium