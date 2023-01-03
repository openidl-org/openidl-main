
    -- Tables
    DROP TABLE IF EXISTS openidl_base_1234.au_policy;
    DROP TABLE IF EXISTS openidl_base_1234.au_claim;

    DELETE FROM  openidl_base_1234.au_policy;
    DELETE FROM  TABLE openidl_base_1234.au_claim;

    -- Temp Tables
    DROP TABLE  openidl_ep_1234.tmp_au_coverage_ref;
    DROP TABLE  openidl_ep_1234.tmp_au_coverage;
    DROP TABLE  openidl_ep_1234.tmp_au_pc;

    DELETE FROM  openidl_ep_1234.tmp_pre_au_coverage;
    DELETE FROM  openidl_ep_1234.tmp_au_coverage;
    

    --Functions (note should be torn down after each extraction);
    DROP FUNCTION IF EXISTS openidl_ep_1234.tmp_car_years;
    DROP FUNCTION IF EXISTS openidl_ep_1234.tmp_earned_premium;
    DROP FUNCTION IF EXISTS openidl_ep_1234.tmp_incurred_loss;
    DROP FUNCTION IF EXISTS openidl_ep_1234.tmp_incurred_count;
    