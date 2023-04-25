
CREATE TABLE openidl_ep_9997.tmp_pa_coverage_ref as
    SELECT reporting_code, reporting_name 
    FROM openidl_ep_9997.tmp_pa_coverage 
    WHERE reporting_code IS NOT NULL
    GROUP BY reporting_code, reporting_name 
    ORDER BY reporting_code::numeric;

    