
    create table openidl_ep_1234.tmp_au_pc as
    (select a.accounting_date, a.transaction_code, a.accounting_term_expiration, a.exposure, a.monthly_premium_amount
    , null as occurrence_identifier, null as accident_date, null as loss_amount, a.deductible_amount, a.deductible_code, a.coverage_code
    from openidl_base_1234.personal_auto_policy a)
    union all
    (select b.accounting_date::date, b.transaction_code, null as accounting_term_expiration, null as exposure, null as monthly_premium_amount,
    b.occurrence_identifier, b.accident_date, b.loss_amount, b.deductible_amount, b.deductible_code, b.coverage_code
    from openidl_base_1234.personal_auto_claim b);
    
    