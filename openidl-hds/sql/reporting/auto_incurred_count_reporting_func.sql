drop function auto_incurred_count;    

CREATE OR replace FUNCTION auto_incurred_count_reporting(IN start_date date,IN end_date date, IN pv_reporting_code VARCHAR)
returns      numeric AS $$DECLARE ep numeric;
BEGIN
    select count(distinct(occurrence_identifier)) incurred_count 
    from openidl_base.au_loss
    where transaction_code in ('2','3','6','7')
    and reg_reporting_code = pv_reporting_code
    and accident_date > start_date
    and accident_date < end_date into ep;
    RETURN ep;
END$$ language plpgsql