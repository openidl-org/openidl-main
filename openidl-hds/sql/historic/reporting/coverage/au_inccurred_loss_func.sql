CREATE OR replace FUNCTION auto_incurred_loss(IN start_date date,IN end_date date, IN pv_coverage_code VARCHAR)
returns      numeric AS $$DECLARE ep numeric;
BEGIN
    
    select sum(loss_amount) loss_amount
        from 
        ((select sum(loss_amount) loss_amount from openidl_base.au_loss
        where transaction_code = '2'
        and coverage_code = pv_coverage_code
        and accident_date > start_date
        and accident_date < end_date
        union
        (select auto_outstanding(start_date, end_date,'1') loss_amount))) a into ep;
    RETURN ep;
END$$ language plpgsql