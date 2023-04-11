function getEarnedPremium(){
    let earnedPremium = `
CREATE OR replace FUNCTION  tmp_pa_earned_premium(IN start_date date,IN end_date date, IN pv_reporting_code VARCHAR)
returns      numeric AS $$DECLARE ep numeric;
BEGIN
    select sum(a.ep)
    from (
        (SELECT 1 ggroup,
            Datediff(accounting_date,accounting_term_expiration) * monthly_premium_amount ep
            FROM    tmp_pa_coverage
            WHERE  accounting_date >= start_date
            AND accounting_term_expiration < end_date
            and fk_transaction_code_id in (1,8)
            and reporting_code = pv_reporting_code) 
        union all 
            (SELECT 2 ggroup,                                                      
            Datediff(accounting_date, end_date) * monthly_premium_amount  ep   
            FROM    tmp_pa_coverage
            WHERE  accounting_date < start_date
            and accounting_term_expiration> start_date
            and accounting_term_expiration< end_date
            and fk_transaction_code_id in (1,8)
            and reporting_code = pv_reporting_code
            )
        union all 
            (select 3 ggroup,
            Datediff(accounting_date, end_date) * monthly_premium_amount ep
            FROM    tmp_pa_coverage
            WHERE  accounting_date > start_date
            and accounting_date < end_date
            AND accounting_term_expiration > end_date
            and fk_transaction_code_id in (1,8)
            and reporting_code = pv_reporting_code)
        union all
            (select 4 ggroup,       
            Datediff(start_date, end_date) *monthly_premium_amount ep
            FROM    tmp_pa_coverage
            WHERE  accounting_date < start_date
            AND accounting_term_expiration > end_date
            and fk_transaction_code_id in (1,8)
            and reporting_code = pv_reporting_code)) a into ep;
    RETURN ep;
END$$ language plpgsql;

    `
    return earnedPremium
}

module.exports = getEarnedPremium