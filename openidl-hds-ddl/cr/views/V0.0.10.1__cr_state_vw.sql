create view cr_stat_view as
select	a.id				openidl_id,
		a.line				lob,
		a.rep_mo			accounting_month,
		a.rep_yr			accounting_year,
		a.comp				company_code,
		b.id				fk_state_code_id,
		a.county			county_code,
		a.territory			territory_code,
		c.code				fk_transaction_code_id,
		a.prem_amt			premium_amount,
		a.exposure			exposure,
		a.loss_amt			loss_amount,
		a.clm_cnt			claim_count,
		d.code				fk_aslob_id,
		e.code				fk_program_code_id,
		f.code				fk_policy_form_code_id,
		g.code				fk_coverage_code_id,
		h.code				fk_terrorism_indicator_id,
		a.paoi				property_amount_insurance,
		i.code				fk_deductible_type_id,
		j.code				fk_deductible_amount_id,
		a.class_code		fk_class_code_id,
		a.num_prem			number_of_premises,
		k.code				fk_rate_group_id,
		l.code				fk_type_of_policy_id,
		m.code				fk_protective_device_id,
		n.code				fk_package_identification_id,
		o.code				fk_pool_code_id,
		a.mos_cov			months_covered,
		p.code				fk_cause_of_loss_id,
		a.accident_mon		accident_month,
		a.accident_day		accident_day,
		a.accident_yr		accident_year,
		a.zip				zip_code,
		a.zip_suff			zip_code_suffix,
		a.policy_num		policy_number,
		a.claim_num			claim_number,
		a.claim_id			claim_id,
		a.co_use			company_use,
		a.status			status,
		a.line_number		line_number,
		a.notes				notes
		
from openidl_base_7777.cr_stat_stg a
		left join cr_state_code b 
			on a.state = b.code
		left join cr_transaction_code c 
			on a.trans = c.code 
		left join cr_annual_statement_line_of_business_code d
			on a.aslob = d.code
		left join cr_program_class_code e 
			on a.prog_cd = e.code
		left join cr_policy_form_code f 
			on a.pol_frm = f.code 
		left join cr_coverage_code g 
			on a.cov_code = g.code
		left join cr_terrorism_indicator_code h 
			on a.terrorism = h.code 
		left join cr_deductible_type_code i 
			on a.ded_type = i.code
		left join cr_deductible_amount_code j 
			on a.ded_amt = j.code 
		left join cr_rate_group_code k 
			on a.rate_group = k.code 
		left join cr_type_of_policy_code l 
			on a.type_policy = l.code
		left join cr_protective_device_code m 
			on a.prot_devices = m.code
		left join cr_package_identification_code n
			on a.package_id = n.code
		left join cr_pool_code o
			on a.pool = o.code
		left join cr_cause_of_loss_code p 
			on a.col = p.code
;		