
CREATE OR replace FUNCTION openidl_ep_9997.tmp_pa_basic_limit_il(IN start_date date,IN end_date date, IN pv_reporting_code varchar)
returns numeric AS $$declare il numeric;BEGIN
  SELECT
         CASE
                WHEN b.paid_loss + c.outstanding_loss >= 2500 THEN 2500
                ELSE b.paid_loss + c.outstanding_loss
         END AS basic_limit_il2
  FROM   (
                SELECT Sum(a.loss_amount) paid_loss
                FROM   openidl_ep_9997.tmp_pa_coverage a
                WHERE  a.reporting_code = pv_reporting_code
                AND    a.fk_transaction_code_id = 2
                AND    a.accounting_date >= start_date
                AND    a.accounting_date <= end_date) b,
         (
                SELECT openidl_ep_9997.tmp_pa_auto_outstanding(start_date, end_date,pv_reporting_code) outstanding_loss) c
  into   il;
  
  RETURN il;
  end$$ language plpgsql;