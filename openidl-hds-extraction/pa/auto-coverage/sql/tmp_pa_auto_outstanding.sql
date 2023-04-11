

CREATE OR replace FUNCTION openidl_ep_9997.tmp_pa_auto_outstanding(IN start_date date,IN end_date date, IN pv_coverage_code VARCHAR)
    returns      numeric AS $$DECLARE ep numeric;
    BEGIN
        SELECT Sum(x.loss_amount) outstanding_loss
            FROM  (SELECT t2.  reporting_code,
                        t2.occurrence_identifier,
                        Max(t2.loss_amount) loss_amount
                FROM   (SELECT   reporting_code,
                                occurrence_identifier,
                                Max(accounting_date) accounting_date
                        FROM   openidl_ep_9997.tmp_pa_coverage
                        WHERE  fk_transaction_code_id = 3
                        and   reporting_code = pv_coverage_code
                        and accident_date > start_date
                        and accident_date < end_date
                        GROUP  BY   reporting_code,
                                    occurrence_identifier) t,
                        openidl_ep_9997.tmp_pa_coverage t2
                WHERE  t.  reporting_code = t2.  reporting_code
                        AND t.occurrence_identifier = t2.occurrence_identifier
                        AND t.accounting_date = t2.accounting_date
                GROUP  BY t2.  reporting_code,
                            t2.occurrence_identifier,
                            t2.accounting_date) x into ep; 
        RETURN ep;
    END$$ language plpgsql;
    
    