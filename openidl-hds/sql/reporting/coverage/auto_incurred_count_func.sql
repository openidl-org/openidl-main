drop function auto_ep;    

CREATE OR replace FUNCTION auto_incurred_count(IN start_date date,IN end_date date, IN pv_coverage_code VARCHAR)
returns      numeric AS $$DECLARE ep numeric;
BEGIN
    select count(distinct(occurrence_identifier)) incurred_count 
    from openidl_base.au_loss
    where transaction_code in ('2','3','6','7')
    and coverage_code = pv_coverage_code
    and accident_date > start_date
    and accident_date < end_date into ep;
    RETURN ep;
END$$ language plpgsql