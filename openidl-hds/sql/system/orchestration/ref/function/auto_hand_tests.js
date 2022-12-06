function getTests(companyId){
    sql = `
    select * from openidl_base_${companyId}.au_premium;   
    select * from openidl_base_${companyId}.au_loss;
    select * from openidl_ep_${companyId}.tmp_pre_au_coverage;
    `
}