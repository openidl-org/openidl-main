
CREATE OR REPLACE FUNCTION openidl_ep_9997.tmp_pa_incurred_count(IN start_date date,IN end_date date, IN pv_reporting_code VARCHAR)
RETURNS NUMERIC AS $$DECLARE ep numeric;
BEGIN
    SELECT count(distinct(occurrence_identifier)) incurred_count 
    FROM openidl_ep_9997.tmp_pa_coverage
    WHERE fk_transaction_code_id in (2,3,4,5)
    AND reporting_code = pv_reporting_code
    AND accident_date > start_date
    AND accident_date < end_date into ep;
    RETURN ep;
END$$ language plpgsql;
    
    