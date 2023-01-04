
    CREATE OR replace FUNCTION openidl_ep_1234.tmp_ho_earned_premium(IN start_date date,IN end_date date, IN pv_policy_form VARCHAR)
    returns      numeric AS $$DECLARE ep numeric;
    BEGIN
        select sum(a.ep)
        from (
            (SELECT 1 ggroup,
                Datediff(accounting_term_expiration, accounting_date) * monthly_premium_amount ep
                FROM   openidl_ep_1234.tmp_ho_pc
                WHERE  accounting_date >= start_date
                AND accounting_term_expiration < end_date
                and transaction_code = '1'
                and policy_form = pv_policy_form) 
            union all 
                (SELECT 2 ggroup,                                                      
                Datediff(start_date, accounting_term_expiration) * monthly_premium_amount ep   
                FROM   openidl_ep_1234.tmp_ho_pc
                WHERE  accounting_date < start_date
                and accounting_term_expiration> start_date
                and accounting_term_expiration< end_date
                and transaction_code = '1'
                and policy_form = pv_policy_form)
            union all 
                (select 3 ggroup,
                Datediff(accounting_date, end_date) * monthly_premium_amount ep
                FROM   openidl_ep_1234.tmp_ho_pc
                WHERE  accounting_date > start_date
                and accounting_date < end_date
                AND accounting_term_expiration > end_date
                and transaction_code = '1'
                and policy_form = pv_policy_form)
            union all
                (select 4 ggroup,       
                Datediff(start_date, end_date) * monthly_premium_amount ep
                FROM   openidl_ep_1234.tmp_ho_pc
                WHERE  accounting_date < start_date
                AND accounting_term_expiration > end_date
                and transaction_code = '1'
                and policy_form = pv_policy_form)) a into ep;
        RETURN ep;
    END$$ language plpgsql;
    
    