
    CREATE OR replace FUNCTION openidl_ep_9996.tmp_ho_incurred_loss(in pv_policy_form VARCHAR)
    returns      numeric AS $$DECLARE pl numeric;
    begin
        SELECT sum(openidl_ep_9996.tmp_ho_paid_loss(pv_policy_form) + openidl_ep_9996.tmp_ho_outstanding_loss(pv_policy_form)) into pl;
    
    RETURN pl;
    END$$ language plpgsql;
    
    