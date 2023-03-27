function getTearDown(companyId){
    sql = `
 
    DROP TABLE  openidl_ep_${companyId}.tmp_ho_pc;
    DROP TABLE  openidl_ep_${companyId}.tmp_ho_reporting_ref;
    
    DROP FUNCTION IF EXISTS openidl_ep_${companyId}.tmp_ho_earned_premium;
    DROP FUNCTION IF EXISTS openidl_ep_${companyId}.tmp_ho_incurred_loss;
    DROP FUNCTION IF EXISTS openidl_ep_${companyId}.tmp_ho_outstanding_loss;
    DROP FUNCTION IF EXISTS openidl_ep_${companyId}.tmp_ho_paid_loss;
    DROP FUNCTION IF EXISTS openidl_ep_${companyId}.tmp_ho_written_premium;
    
    `
    return sql
}

module.exports = getTearDown