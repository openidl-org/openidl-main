
CREATE OR replace FUNCTION openidl_ep_9995.tmp_car_years(IN start_date date,IN end_date date, IN pv_reporting_code VARCHAR)
returns      numeric AS $$DECLARE cy numeric;
BEGIN
    select sum(a.cy)
    from (
        (SELECT 1 ggroup,            
            Datediff(accounting_date,accounting_term_expiration )/12*exposure cy
            FROM   openidl_ep_9995.tmp_au_coverage
            WHERE  accounting_date >= start_date
            AND accounting_term_expiration < end_date
            and transaction_code = '1'
            and reporting_code = pv_reporting_code) 
        union all
            (SELECT 2 ggroup,                                                                
            Datediff(start_date, accounting_term_expiration)/12*exposure cy
            FROM   openidl_ep_9995.tmp_au_coverage
            WHERE  accounting_date < start_date
            and accounting_term_expiration> start_date
            and accounting_term_expiration< end_date
            and transaction_code = '1'
            and reporting_code = pv_reporting_code)
        union all
            (select 3 ggroup,
            Datediff(accounting_date, end_date)/12*exposure cy
            FROM   openidl_ep_9995.tmp_au_coverage
            WHERE  accounting_date > start_date
            and accounting_date < end_date
            AND accounting_term_expiration > end_date
            and transaction_code = '1'
            and reporting_code = pv_reporting_code)
        union all
            (select 4 ggroup,       
            Datediff(start_date,end_date)/12*exposure cy
            FROM   openidl_ep_9995.tmp_au_coverage
            WHERE  accounting_date < start_date
            AND accounting_term_expiration > end_date
            and transaction_code = '1'
            and reporting_code = pv_reporting_code)
            ) a into cy;
    RETURN cy;
END$$ language plpgsql;

