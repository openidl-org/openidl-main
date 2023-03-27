drop function auto_cy;    
CREATE OR replace FUNCTION auto_cy_reporting(IN start_date date,IN end_date date, IN pv_reporting_code VARCHAR)
returns      numeric AS $$DECLARE cy numeric;
BEGIN
    select sum(a.cy)
    from (
        (SELECT 1 ggroup,            
            Datediff(accounting_term_expiration, accounting_date)/12*exposure cy
            FROM   openidl_base.au_premium
            WHERE  accounting_date >= start_date
            AND accounting_term_expiration < end_date
            and transaction_code = '1'
            and reg_reporting_code = pv_reporting_code) 
        union all
            (SELECT 2 ggroup,                                                                
            Datediff(accounting_term_expiration, start_date)/12*exposure cy
            FROM   openidl_base.au_premium
            WHERE  accounting_date < start_date
            and accounting_term_expiration> start_date
            and accounting_term_expiration< end_date
            and transaction_code = '1'
            and reg_reporting_code = pv_reporting_code)
        union all
            (select 3 ggroup,
            Datediff(accounting_date, end_date)/12*exposure cy
            FROM   openidl_base.au_premium
            WHERE  accounting_date > start_date
            and accounting_date < end_date
            AND accounting_term_expiration > end_date
            and transaction_code = '1'
            and reg_reporting_code = pv_reporting_code)
        union all
            (select 4 ggroup,       
            Datediff(end_date, start_date)/12*exposure cy
            FROM   openidl_base.au_premium
            WHERE  accounting_date < start_date
            AND accounting_term_expiration > end_date
            and transaction_code = '1'
            and reg_reporting_code = pv_reporting_code)
            ) a into cy;
    RETURN cy;
END$$ language plpgsql

select auto_cy('2000-01-01'::DATE, '2000-02-01'::DATE);