

CREATE OR REPLACE FUNCTION openidl_ep_1234.tmp_pa_incurred_loss(IN start_date date,IN end_date date, IN  pv_reporting_code VARCHAR)
RETURNS NUMERIC AS $$DECLARE ep NUMERIC;
BEGIN
    
    SELECT SUM(loss_amount) loss_amount
        FROM
        ((SELECT SUM(loss_amount) loss_amount FROM openidl_ep_1234.tmp_pa_coverage
        WHERE fk_transaction_code_id = 2
        AND reporting_code =  pv_reporting_code
        AND accident_date > start_date
        AND accident_date < end_date
        UNION
        (SELECT openidl_ep_1234.tmp_pa_auto_outstanding(start_date, end_date,pv_reporting_code) loss_amount))) a into ep; 
    RETURN ep;
END$$ language plpgsql;
    
    