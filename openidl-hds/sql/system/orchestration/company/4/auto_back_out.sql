
    -- Tables
    DROP TABLE openidl_base_4.au_premium;
    DROP TABLE openidl_base_4.au_loss;

    DELETE FROM openidl_base_4.au_premium;
    DELETE FROM TABLE openidl_base_4.au_loss;

    -- Temp Tables
    DROP TABLE openidl_ep_4.tmp_pre_au_coverage;
    DROP TABLE openidl_ep_4.tmp_au_coverage;

    DELETE FROM openidl_ep_4.tmp_pre_au_coverage;
    DELETE FROM openidl_ep_4.tmp_au_coverage;

    --Functions (note should be torn down after each extraction)
    DROP FUNCTION openidl_ep_4.tmp_car_years
    DROP FUNCTION openidl_ep_4.tmp_earned_premium
    DROP FUNCTION openidl_ep_4.tmp_incurred_loss
    DROP FUNCTION openidl_ep_4.tmp_incurred_count
    