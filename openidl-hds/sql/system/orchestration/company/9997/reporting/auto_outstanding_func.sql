CREATE OR replace FUNCTION openidl_ep_9997.auto_outstanding(IN start_date date,IN end_date date, IN pv_coverage_code VARCHAR)
    returns      numeric AS $$DECLARE ep numeric;
    BEGIN
        
        SELECT Sum(x.loss_amount) outstanding_loss
            FROM  (SELECT t2.coverage_code,
                        t2.occurrence_identifier,
                        Max(t2.loss_amount) loss_amount
                FROM   (SELECT coverage_code,
                                occurrence_identifier,
                                Max(accounting_date) accounting_date
                        FROM   openidl_ep_9997.tmp_au_coverage
                        WHERE  transaction_code = '3'
                        and coverage_code = pv_coverage_code
                        and accident_date > start_date
                        and accident_date < end_date
                        GROUP  BY coverage_code,
                                    occurrence_identifier) t,
                        openidl_ep_9997.tmp_au_coverage t2
                WHERE  t.coverage_code = t2.coverage_code
                        AND t.occurrence_identifier = t2.occurrence_identifier
                        AND t.accounting_date = t2.accounting_date
                GROUP  BY t2.coverage_code,
                            t2.occurrence_identifier,
                            t2.accounting_date) x into ep; 
        RETURN ep;
    END$$ language plpgsql;