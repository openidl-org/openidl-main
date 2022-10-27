drop function auto_ep;    

CREATE OR replace FUNCTION auto_ep(IN start_date date,IN end_date date, IN pv_coverage_code VARCHAR)
returns      numeric AS $$DECLARE ep numeric;
BEGIN
    select sum(a.ep)
    from (
        (SELECT 1 ggroup,
            Datediff(accounting_term_expiration, accounting_date) * monthly_premium_amount ep
            FROM   openidl_base.au_premium
            WHERE  accounting_date >= start_date
            AND accounting_term_expiration < end_date
            and transaction_code = '1'
            and coverage_code = pv_coverage_code) 
        union all 
            (SELECT 2 ggroup,                                                      
            Datediff(accounting_term_expiration, start_date) * monthly_premium_amount  ep   
            FROM   openidl_base.au_premium
            WHERE  accounting_date < start_date
            and accounting_term_expiration> start_date
            and accounting_term_expiration< end_date
            and transaction_code = '1'
            and coverage_code = pv_coverage_code
            )
        union all 
            (select 3 ggroup,
            Datediff(accounting_date, end_date) * monthly_premium_amount ep
            FROM   openidl_base.au_premium
            WHERE  accounting_date > start_date
            and accounting_date < end_date
            AND accounting_term_expiration > end_date
            and transaction_code = '1'
            and coverage_code = pv_coverage_code)
        union all
            (select 4 ggroup,       
            Datediff(end_date, start_date) *monthly_premium_amount ep
            FROM   openidl_base.au_premium
            WHERE  accounting_date < start_date
            AND accounting_term_expiration > end_date
            and transaction_code = '1'
            and coverage_code = pv_coverage_code)) a into ep;
    RETURN ep;
END$$ language plpgsql


select sum(a.auto_ep)
from (select coveragecategory, coverage
                , auto_ep('2000-01-01'::DATE, '2002-01-01'::DATE,coverageCode)
    from openidl_base.au_coverage_vw) as a;