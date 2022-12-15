function getTearDown(companyId){
    sql = `
 
    DROP TABLE IF EXISTS openidl_ep_${companyId}.tmp_au_coverage;
    DROP TABLE IF EXISTS openidl_ep_${companyId}.tmp_au_coverage_ref;
    DROP TABLE IF EXISTS openidl_ep_${companyId}.tmp_pre_au_coverage;
    
    DROP FUNCTION IF EXISTS openidl_ep_${companyId}.tmp_car_years;
    DROP FUNCTION IF EXISTS openidl_ep_${companyId}.tmp_earned_premium;
    DROP FUNCTION IF EXISTS openidl_ep_${companyId}.tmp_incurred_loss;
    DROP FUNCTION IF EXISTS openidl_ep_${companyId}.tmp_incurred_count;
    DROP FUNCTION IF EXISTS openidl_ep_${companyId}.tmp_auto_outstanding;
    
    `
    return sql
}

module.exports = getTearDown