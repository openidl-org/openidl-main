
    -- Tables

    drop table openidl_base_9998.personal_auto_policy;
    drop table openidl_base_9998.personal_auto_claim;

    --Functions (note should be torn down after each extraction);
    DROP FUNCTION IF EXISTS openidl_ep_9998.tmp_car_years;
    DROP FUNCTION IF EXISTS openidl_ep_9998.tmp_earned_premium;
    DROP FUNCTION IF EXISTS openidl_ep_9998.tmp_incurred_loss;
    DROP FUNCTION IF EXISTS openidl_ep_9998.tmp_incurred_count;
    