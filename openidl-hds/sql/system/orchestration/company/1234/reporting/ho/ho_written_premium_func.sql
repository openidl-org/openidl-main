
    CREATE OR replace FUNCTION openidl_ep_1234.tmp_ho_written_premium(in pv_policy_form VARCHAR)
    returns      numeric AS $$DECLARE pl numeric;
    begin
        SELECT sum(premium_amount) into pl
        FROM   openidl_base_1234.ho_policy
        where policy_form = pv_policy_form;
    RETURN pl;
    END$$ language plpgsql;
    
    