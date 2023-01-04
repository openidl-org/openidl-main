function getHandTests(companyId){
    sql = `
    SELECT * from openidl_base_${companyId}.ho_policy;   
    SELECT * from openidl_base_${companyId}.ho_claim;

    SELECT policy_form
    FROM openidl_ep_${companyId}.tmp_ho_reporting_ref;

    SELECT reporting_form
    FROM openidl_ep_${companyId}.tmp_ho_reporting_ref;

    SELECT openidl_ep_${companyId}.Tmp_ho_written_premium(policy_form) written_premium
    FROM openidl_ep_${companyId}.tmp_ho_reporting_ref;

    SELECT openidl_ep_${companyId}.Tmp_ho_paid_loss(policy_form) paid_loss
    FROM openidl_ep_${companyId}.tmp_ho_reporting_ref;

    SELECT round(openidl_ep_${companyId}.Tmp_ho_paid_loss(policy_form) * 100 / openidl_ep_${companyId}.Tmp_ho_written_premium(policy_form), 2) loss_ratio
    FROM openidl_ep_${companyId}.tmp_ho_reporting_ref;

    SELECT openidl_ep_${companyId}.tmp_ho_earned_premium( '2002-08-15', '2003-08-15', policy_form) ep
    FROM openidl_ep_${companyId}.tmp_ho_reporting_ref;

    SELECT openidl_ep_${companyId}.tmp_ho_incurred_loss(policy_form) incurred_loss
    FROM openidl_ep_${companyId}.tmp_ho_reporting_ref;
       
    SELECT round(openidl_ep_${companyId}.tmp_ho_incurred_loss(policy_form) * 100 / openidl_ep_${companyId}.tmp_ho_earned_premium( '2002-08-15', '2003-08-15', policy_form), 2) ep_loss_ratio
    FROM openidl_ep_${companyId}.tmp_ho_reporting_ref;
        `
    return sql
}

module.exports = getHandTests