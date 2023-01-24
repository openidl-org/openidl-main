
    -- Tables

    drop table openidl_base_9990.personal_auto_policy;
    drop table openidl_base_9990.personal_auto_claim;

    --Functions (note should be torn down after each extraction);
    DROP FUNCTION IF EXISTS openidl_ep_9990.tmp_car_years;
    DROP FUNCTION IF EXISTS openidl_ep_9990.tmp_earned_premium;
    DROP FUNCTION IF EXISTS openidl_ep_9990.tmp_incurred_loss;
    DROP FUNCTION IF EXISTS openidl_ep_9990.tmp_incurred_count;
    