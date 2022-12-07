function getTearDown(companyId){
    sql = `
    -- Temp Tables
    DROP TABLE openidl_ep_${companyId}.tmp_pre_au_coverage;
    DROP TABLE openidl_ep_${companyId}.tmp_au_coverage;

    --Functions (note should be torn down after each extraction);
    DROP FUNCTION openidl_ep_${companyId}.tmp_car_years;
    DROP FUNCTION openidl_ep_${companyId}.tmp_earned_premium;
    DROP FUNCTION openidl_ep_${companyId}.tmp_incurred_loss;
    DROP FUNCTION openidl_ep_${companyId}.tmp_incurred_count;
    DROP FUNCTION openidl_ep_${companyId}.tmp_auto_outstanding;
    `
    return sql
}

module.exports = getTearDown