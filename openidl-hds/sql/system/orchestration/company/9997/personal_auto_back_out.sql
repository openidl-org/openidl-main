
    -- Tables

    drop table openidl_base_9997.personal_auto_policy;
    drop table openidl_base_9997.personal_auto_claim;

    --Functions (note should be torn down after each extraction);
    DROP FUNCTION IF EXISTS openidl_ep_9997.tmp_car_years;
    DROP FUNCTION IF EXISTS openidl_ep_9997.tmp_earned_premium;
    DROP FUNCTION IF EXISTS openidl_ep_9997.tmp_incurred_loss;
    DROP FUNCTION IF EXISTS openidl_ep_9997.tmp_incurred_count;
    