
    CREATE OR replace FUNCTION openidl_ep_1234.tmp_au_incurred_loss(IN start_date date,IN end_date date, IN  pv_reporting_code VARCHAR)
    returns      numeric AS $$DECLARE ep numeric;
    BEGIN
        
        select sum(loss_amount) loss_amount
            from 
            ((select sum(loss_amount) loss_amount from openidl_ep_1234.tmp_au_coverage
            where transaction_code = '2'
            and reporting_code =  pv_reporting_code
            and accident_date > start_date
            and accident_date < end_date
            union
            (select openidl_ep_1234.tmp_auto_outstanding(start_date, end_date,'1') loss_amount))) a into ep; 
        RETURN ep;
    END$$ language plpgsql;
    
    