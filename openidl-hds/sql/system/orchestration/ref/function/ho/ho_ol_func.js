//outstanding loss
function getOutstandingLoss(companyId) {
	sql = `
    CREATE OR replace FUNCTION openidl_ep_${companyId}.tmp_ho_outstanding_loss(in pv_policy_form VARCHAR)
    returns      numeric AS $$DECLARE pl numeric;
    begin
        SELECT sum(loss_amount) into pl
        FROM   openidl_base_${companyId}.ho_claim
        where  transaction_code = '3'
        and policy_form = pv_policy_form;
    RETURN pl;
    END$$ language plpgsql;
    
    `;
	return sql;
}

module.exports = getOutstandingLoss;