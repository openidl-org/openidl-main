function getBackOut(companyId){
    sql = `
    -- Tables
    DROP TABLE IF EXISTS openidl_base_${companyId}.ho_policy;
    DROP TABLE IF EXISTS openidl_base_${companyId}.ho_claim;
    DROP TABLE IF EXISTS openidl_ep_${companyId}.ho_final_report;

    DELETE FROM  openidl_base_${companyId}.ho_policy;
    DELETE FROM  TABLE openidl_base_${companyId}.ho_claim;
    DELETE FROM  openidl_ep_${companyId}.ho_final_report;


    -- Temp Tables
    DROP TABLE  openidl_ep_${companyId}.tmp_ho_pc;
    DROP TABLE  openidl_ep_${companyId}.tmp_ho_reporting_ref;
    
    DELETE FROM  openidl_ep_${companyId}.tmp_ho_pc;
    DELETE FROM  openidl_ep_${companyId}.tmp_ho_reporting_ref;

    
    --Functions (note should be torn down after each extraction);
    DROP FUNCTION IF EXISTS openidl_ep_${companyId}.tmp_ho_earned_premium;
    DROP FUNCTION IF EXISTS openidl_ep_${companyId}.tmp_ho_incurred_loss;
    DROP FUNCTION IF EXISTS openidl_ep_${companyId}.tmp_ho_outstanding_loss;
    DROP FUNCTION IF EXISTS openidl_ep_${companyId}.tmp_ho_paid_loss;
    DROP FUNCTION IF EXISTS openidl_ep_${companyId}.tmp_ho_written_premium;
    `
    return sql
}

module.exports = getBackOut