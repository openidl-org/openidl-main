
    CREATE OR replace FUNCTION openidl_ep_9990.tmp_ho_written_premium(in pv_policy_form VARCHAR)
    returns      numeric AS $$DECLARE pl numeric;
    begin
        SELECT sum(premium_amount) into pl
        FROM   openidl_base_9990.ho_policy
        where policy_form = pv_policy_form;
    RETURN pl;
    END$$ language plpgsql;
    
    