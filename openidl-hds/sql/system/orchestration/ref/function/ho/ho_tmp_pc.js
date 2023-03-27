
   function getPreTable(companyId){
    sql = `
    CREATE TABLE openidl_ep_${companyId}.tmp_ho_pc as
    (SELECT reporting_category,
            reporting_form,
            policy_form,
            transaction_code,
            premium_amount,
            monthly_premium_amount,
            NULL AS loss_amount,
            accounting_date,
            accounting_term_expiration,
            months_covered
     FROM   openidl_base_${companyId}.ho_policy a)
     UNION  ALL
    (SELECT reporting_category,
            reporting_form,
            policy_form,
            transaction_code,
            NULL AS premium_amount,
            NULL AS monthly_premium_amount,
            loss_amount,
            accounting_date,
            NULL AS accounting_term_expiration,
            NULL AS months_covered
     FROM   openidl_base_${companyId}.ho_claim b);
    
    `
    return sql
}

module.exports = getPreTable