CREATE OR replace FUNCTION openidl_ep_undefined.tmp_au_incurred_loss(IN start_date date,IN end_date date, IN  pv_reporting_code VARCHAR)
    returns      numeric AS $$DECLARE ep numeric;
    BEGIN
        
        select sum(loss_amount) loss_amount
            from 
            ((select sum(loss_amount) loss_amount from openidl_base.au_loss
            where transaction_code = '2'
            and reg_reporting_code =  pv_reporting_code
            and accident_date > start_date
            and accident_date < end_date
            union
            (select auto_outstanding(start_date, end_date,'1') loss_amount))) a into ep; 
        RETURN ep;
    END$$ language plpgsql