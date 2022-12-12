function getBackOut(companyId){
    sql = `
    -- Tables
    DROP TABLE IF EXISTS openidl_base_${companyId}.au_premium;
    DROP TABLE IF EXISTS openidl_base_${companyId}.au_loss;

    DELETE FROM  openidl_base_${companyId}.au_premium;
    DELETE FROM  TABLE openidl_base_${companyId}.au_loss;

    -- Temp Tables
    DROP TABLE  openidl_ep_${companyId}.tmp_au_coverage_ref;
    DROP TABLE  openidl_ep_${companyId}.tmp_au_coverage;
    DROP TABLE  openidl_ep_${companyId}.tmp_pre_au_coverage;

    DELETE FROM  openidl_ep_${companyId}.tmp_pre_au_coverage;
    DELETE FROM  openidl_ep_${companyId}.tmp_au_coverage;
    

    --Functions (note should be torn down after each extraction);
    DROP FUNCTION IF EXISTS openidl_ep_${companyId}.tmp_car_years;
    DROP FUNCTION IF EXISTS openidl_ep_${companyId}.tmp_earned_premium;
    DROP FUNCTION IF EXISTS openidl_ep_${companyId}.tmp_incurred_loss;
    DROP FUNCTION IF EXISTS openidl_ep_${companyId}.tmp_incurred_count;
    `
    return sql
}

module.exports = getBackOut