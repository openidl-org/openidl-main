SELECT 
	case when a.fk_transaction_code_id in (1,8) then 'Premium'
		when a.fk_transaction_code_id in (2,3,4,5,6) then  'Claim'
		else null end as record_type,
       concat('01-',a.accounting_month,'-',a.accounting_year)::date accounting_date,
       a.fk_transaction_code_id,
       a.fk_state_code_id,
       a.policy_identifier,
       a.months_covered,
       case when a.fk_transaction_code_id in (1,8) then round((a.premium_amount / a.months_covered)) end as monthly_premium_amount,
       (concat('01-',a.accounting_month,'-',a.accounting_year)::date + interval '1 month' * a.months_covered)::date accounting_term_expiration
FROM   pa_stat_vw a
LIMIT  10; 
