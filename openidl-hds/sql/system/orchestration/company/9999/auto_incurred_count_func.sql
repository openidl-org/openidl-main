CREATE OR replace FUNCTION openidl_ep_9999.tmp_au_incurred_count(IN start_date date,IN end_date date, IN pv_reporting_code VARCHAR)
    returns      numeric AS $$DECLARE ep numeric;
    BEGIN
        select count(distinct(occurrence_identifier)) incurred_count 
        from openidl_ep_9999.tmp_au_coverage
        where transaction_code in ('2','3','6','7')
        and reporting_code = pv_reporting_code
        and accident_date > start_date
        and accident_date < end_date into ep;
        RETURN ep;
    END$$ language plpgsql