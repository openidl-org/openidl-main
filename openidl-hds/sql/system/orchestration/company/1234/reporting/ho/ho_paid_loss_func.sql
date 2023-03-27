
    CREATE OR replace FUNCTION openidl_ep_1234.tmp_ho_paid_loss(in pv_policy_form VARCHAR)
    returns      numeric AS $$DECLARE pl numeric;
    begin
        SELECT sum(loss_amount) into pl
        FROM   openidl_base_1234.ho_claim
        where  transaction_code = '2'
        and policy_form = pv_policy_form;
    RETURN pl;
    END$$ language plpgsql;
    
    