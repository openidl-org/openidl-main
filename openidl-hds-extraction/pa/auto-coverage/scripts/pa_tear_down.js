function getTearDown(companyId){
    let sql = `
DROP FUNCTION IF EXISTS openidl_ep_${companyId}.tmp_pa_basic_limit_il;
DROP FUNCTION IF EXISTS openidl_ep_${companyId}.tmp_pa_excess_limit_il;
DROP FUNCTION IF EXISTS openidl_ep_${companyId}.tmp_pa_car_years;
DROP FUNCTION IF EXISTS openidl_ep_${companyId}.tmp_pa_earned_premium;
DROP FUNCTION IF EXISTS openidl_ep_${companyId}.tmp_pa_auto_outstanding;
DROP FUNCTION IF EXISTS openidl_ep_${companyId}.tmp_pa_incurred_loss;
DROP FUNCTION IF EXISTS openidl_ep_${companyId}.tmp_pa_incurred_count;
DROP TABLE IF EXISTS openidl_ep_${companyId}.tmp_pa_coverage_ref;
DROP TABLE IF EXISTS openidl_ep_${companyId}.tmp_pa_coverage;
    
    `
    return sql
}

module.exports = getTearDown