CREATE OR replace FUNCTION openidl_ep_9999.tmp_au_earned_premium(IN start_date date,IN end_date date, IN pv_reporting_code VARCHAR)
    returns      numeric AS $$DECLARE ep numeric;
    BEGIN
        select sum(a.ep)
        from (
            (SELECT 1 ggroup,
                Datediff(accounting_term_expiration, accounting_date) * monthly_premium_amount ep
                FROM   openidl_ep_9999.tmp_au_coverage
                WHERE  accounting_date >= start_date
                AND accounting_term_expiration < end_date
                and transaction_code = '1'
                and reporting_code = pv_reporting_code) 
            union all 
                (SELECT 2 ggroup,                                                      
                Datediff(accounting_term_expiration, start_date) * monthly_premium_amount  ep   
                FROM   openidl_ep_9999.tmp_au_coverage
                WHERE  accounting_date < start_date
                and accounting_term_expiration> start_date
                and accounting_term_expiration< end_date
                and transaction_code = '1'
                and reporting_code = pv_reporting_code
                )
            union all 
                (select 3 ggroup,
                Datediff(accounting_date, end_date) * monthly_premium_amount ep
                FROM   openidl_ep_9999.tmp_au_coverage
                WHERE  accounting_date > start_date
                and accounting_date < end_date
                AND accounting_term_expiration > end_date
                and transaction_code = '1'
                and reporting_code = pv_reporting_code)
            union all
                (select 4 ggroup,       
                Datediff(end_date, start_date) *monthly_premium_amount ep
                FROM   openidl_ep_9999.tmp_au_coverage
                WHERE  accounting_date < start_date
                AND accounting_term_expiration > end_date
                and transaction_code = '1'
                and reporting_code = pv_reporting_code)) a into ep;
        RETURN ep;
    END$$ language plpgsql