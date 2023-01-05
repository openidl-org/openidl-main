
 
    DROP TABLE  openidl_ep_9995.tmp_ho_pc;
    DROP TABLE  openidl_ep_9995.tmp_ho_reporting_ref;
    
    DROP FUNCTION IF EXISTS openidl_ep_9995.tmp_ho_earned_premium;
    DROP FUNCTION IF EXISTS openidl_ep_9995.tmp_ho_incurred_loss;
    DROP FUNCTION IF EXISTS openidl_ep_9995.tmp_ho_outstanding_loss;
    DROP FUNCTION IF EXISTS openidl_ep_9995.tmp_ho_paid_loss;
    DROP FUNCTION IF EXISTS openidl_ep_9995.tmp_ho_written_premium;
    
    |
    CREATE TABLE openidl_ep_9995.tmp_ho_pc as
    (SELECT reporting_category,
            reporting_form,
            policy_form,
            transaction_code,
            premium_amount,
            monthly_premium_amount,
            NULL AS loss_amount,
            accounting_date,
            accounting_term_expiration,
            months_covered
     FROM   openidl_base_9995.ho_policy a)
     UNION  ALL
    (SELECT reporting_category,
            reporting_form,
            policy_form,
            transaction_code,
            NULL AS premium_amount,
            NULL AS monthly_premium_amount,
            loss_amount,
            accounting_date,
            NULL AS accounting_term_expiration,
            NULL AS months_covered
     FROM   openidl_base_9995.ho_claim b);
    
    |
    CREATE TABLE openidl_ep_9995.tmp_ho_reporting_ref as
    SELECT reporting_category, reporting_form, policy_form
    FROM openidl_ep_9995.tmp_ho_pc
    GROUP BY reporting_category, reporting_form, policy_form;
    |
    CREATE OR replace FUNCTION openidl_ep_9995.tmp_ho_earned_premium(IN start_date date,IN end_date date, IN pv_policy_form VARCHAR)
    returns      numeric AS $$DECLARE ep numeric;
    BEGIN
        select sum(a.ep)
        from (
            (SELECT 1 ggroup,
                Datediff(accounting_term_expiration, accounting_date) * monthly_premium_amount ep
                FROM   openidl_ep_9995.tmp_ho_pc
                WHERE  accounting_date >= start_date
                AND accounting_term_expiration < end_date
                and transaction_code = '1'
                and policy_form = pv_policy_form) 
            union all 
                (SELECT 2 ggroup,                                                      
                Datediff(start_date, accounting_term_expiration) * monthly_premium_amount ep   
                FROM   openidl_ep_9995.tmp_ho_pc
                WHERE  accounting_date < start_date
                and accounting_term_expiration> start_date
                and accounting_term_expiration< end_date
                and transaction_code = '1'
                and policy_form = pv_policy_form)
            union all 
                (select 3 ggroup,
                Datediff(accounting_date, end_date) * monthly_premium_amount ep
                FROM   openidl_ep_9995.tmp_ho_pc
                WHERE  accounting_date > start_date
                and accounting_date < end_date
                AND accounting_term_expiration > end_date
                and transaction_code = '1'
                and policy_form = pv_policy_form)
            union all
                (select 4 ggroup,       
                Datediff(start_date, end_date) * monthly_premium_amount ep
                FROM   openidl_ep_9995.tmp_ho_pc
                WHERE  accounting_date < start_date
                AND accounting_term_expiration > end_date
                and transaction_code = '1'
                and policy_form = pv_policy_form)) a into ep;
        RETURN ep;
    END$$ language plpgsql;
    
    |
    CREATE OR replace FUNCTION openidl_ep_9995.tmp_ho_written_premium(in pv_policy_form VARCHAR)
    returns      numeric AS $$DECLARE pl numeric;
    begin
        SELECT sum(premium_amount) into pl
        FROM   openidl_base_9995.ho_policy
        where policy_form = pv_policy_form;
    RETURN pl;
    END$$ language plpgsql;
    
    |
    CREATE OR replace FUNCTION openidl_ep_9995.tmp_ho_paid_loss(in pv_policy_form VARCHAR)
    returns      numeric AS $$DECLARE pl numeric;
    begin
        SELECT sum(loss_amount) into pl
        FROM   openidl_base_9995.ho_claim
        where  transaction_code = '2'
        and policy_form = pv_policy_form;
    RETURN pl;
    END$$ language plpgsql;
    
    |
    CREATE OR replace FUNCTION openidl_ep_9995.tmp_ho_outstanding_loss(in pv_policy_form VARCHAR)
    returns      numeric AS $$DECLARE pl numeric;
    begin
        SELECT sum(loss_amount) into pl
        FROM   openidl_base_9995.ho_claim
        where  transaction_code = '3'
        and policy_form = pv_policy_form;
    RETURN pl;
    END$$ language plpgsql;
    
    |
    CREATE OR replace FUNCTION openidl_ep_9995.tmp_ho_incurred_loss(in pv_policy_form VARCHAR)
    returns      numeric AS $$DECLARE pl numeric;
    begin
        SELECT sum(openidl_ep_9995.tmp_ho_paid_loss(pv_policy_form) + openidl_ep_9995.tmp_ho_outstanding_loss(pv_policy_form)) into pl;
    
    RETURN pl;
    END$$ language plpgsql;
    
    |
    SELECT  reporting_category,
			policy_form,
     	    reporting_form,
        	openidl_ep_9995.Tmp_ho_written_premium(policy_form) written_premium,
        	openidl_ep_9995.Tmp_ho_paid_loss(policy_form) paid_loss,
        	round(openidl_ep_9995.Tmp_ho_paid_loss(policy_form) * 100 / openidl_ep_9995.Tmp_ho_written_premium(policy_form), 2) loss_ratio,
        	openidl_ep_9995.tmp_ho_earned_premium( '2002-08-15', '2003-08-15', policy_form) ep,
        	openidl_ep_9995.tmp_ho_incurred_loss(policy_form) incurred_loss,
        	round(openidl_ep_9995.tmp_ho_incurred_loss(policy_form) * 100 / openidl_ep_9995.tmp_ho_earned_premium( '2002-08-15', '2003-08-15', policy_form), 2) ep_loss_ratio
    FROM 	openidl_ep_9995.tmp_ho_reporting_ref order by reporting_category;
    