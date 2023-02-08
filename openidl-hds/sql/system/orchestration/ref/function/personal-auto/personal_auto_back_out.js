function getBackOut(companyId){
    sql = `
    -- Tables

    drop table openidl_base_${companyId}.personal_auto_policy;
    drop table openidl_base_${companyId}.personal_auto_claim;

    --Functions (note should be torn down after each extraction);
    DROP FUNCTION IF EXISTS openidl_ep_${companyId}.tmp_car_years;
    DROP FUNCTION IF EXISTS openidl_ep_${companyId}.tmp_earned_premium;
    DROP FUNCTION IF EXISTS openidl_ep_${companyId}.tmp_incurred_loss;
    DROP FUNCTION IF EXISTS openidl_ep_${companyId}.tmp_incurred_count;
    `
    return sql
}

module.exports = getBackOut