
    CREATE OR replace FUNCTION openidl_ep_9990.tmp_ho_outstanding_loss(in pv_policy_form VARCHAR)
    returns      numeric AS $$DECLARE pl numeric;
    begin
        SELECT sum(loss_amount) into pl
        FROM   openidl_base_9990.ho_claim
        where  transaction_code = '3'
        and policy_form = pv_policy_form;
    RETURN pl;
    END$$ language plpgsql;
    
    