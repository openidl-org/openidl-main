
    -- Tables
    DROP TABLE IF EXISTS openidl_base_9998.au_premium;
    DROP TABLE IF EXISTS openidl_base_9998.au_loss;

    DELETE FROM IF EXISTS openidl_base_9998.au_premium;
    DELETE FROM IF EXISTS TABLE openidl_base_9998.au_loss;

    -- Temp Tables
    DROP TABLE IF EXISTS openidl_ep_9998.tmp_pre_au_coverage;
    DROP TABLE IF EXISTS openidl_ep_9998.tmp_au_coverage;

    DELETE FROM IF EXISTS openidl_ep_9998.tmp_pre_au_coverage;
    DELETE FROM IF EXISTS openidl_ep_9998.tmp_au_coverage;

    --Functions (note should be torn down after each extraction);
    DROP FUNCTION IF EXISTS openidl_ep_9998.tmp_car_years;
    DROP FUNCTION IF EXISTS openidl_ep_9998.tmp_earned_premium;
    DROP FUNCTION IF EXISTS openidl_ep_9998.tmp_incurred_loss;
    DROP FUNCTION IF EXISTS openidl_ep_9998.tmp_incurred_count;
    