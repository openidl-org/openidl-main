create view im_stat_view as
select 	a.id			openidl_id,
		a.line			lob,
		a.rep_mo		accounting_month,
		a.rep_yr		accounting_year,
		a.comp			company_code,
		b.id			fk_state_code_id,
		a.county		county_code,
		a.territory		territory_code,
		c.code			fk_transaction_code_id,
		a.prem_amt		premium_amount,
		a.loss_amt		loss_amount,
		a.exposure		exposure,
		a.clm_cnt		claim_count,
		d.code			fk_aslob_id,
		e.code			fk_program_code_id,
		f.code			fk_policy_form_code_id,
		g.code			fk_terrorism_indicator_code_id,
		a.paoi			paoi_code,
		h.code			fk_deductible_type_code_id,
		i.code			fk_deductible_amount_code_id,
		j.code			fk_class_code_id,
		k.code			fk_construction_code_id,
		l.code			fk_fire_protection_code_id,
		m.code			fk_commodity_class_code_id,
		n.code			fk_commodity_index_code_id,
		o.code			fk_radius_operation_code_id,
		p.code			fk_premium_base_id,
		q.code			fk_type_of_policy_id,
		r.code			fk_package_id,
		s.code			fk_pool_id,
		a.mos_cov		months_covered,
		t.code			fk_cause_of_loss_id,
		a.accident_mon	accident_month,
		a.accident_day	accident_day,
		a.accident_yr	accident_year,
		a.zip			zip_code,
		a.zip_suff		zip_code_suffix,
		-- u.code			lim_code_loss,
		a.policy_num	policy_number,
		a.claim_num		claim_number,
		a.claim_id		claim_id,
		a.co_use		company_use,
		a.status		status,
		a.line_number	line_number,
		a.notes 		notes
from openidl_base_7777.im_stat_stg a
		left join im_state_code b
			on a.state = b.code
		left join im_transaction_code c 
			on a.trans = c.code
		left join im_annual_statement_line_of_business_code d 
			on a.aslob = d.code 
		left join im_program_class_code e 
			on a.prog_cd = e.code
		left join im_policy_form_code f
			on a.pol_frm = f.code 
		left join im_terrorism_indicator_code g
			on a.terrorism = g.code 
		left join im_deductible_type_code h 
			on a.ded_type = h.code 
		left join im_deductible_amount_code i
			on a.ded_amt = i.code
		left join im_class_code j 
			on a.class_code = j.code
		left join im_construction_code k 
			on a.construction = k.code 
		left join im_fire_protection_code l 
			on a.fire_prot = l.code 
		left join im_commodity_class_code m 
			on a.commodity_class = m.code
		left join im_commodity_classification_index_code n 
			on a.com_cls_index = n.code 
		left join im_radius_of_operations_code o 
			on a.radius_op = o.code 
		left join im_premium_base_code p
			on a.prem_base = p.code 
		left join im_type_of_policy_code q 
			on a.type_policy = q.code 
		left join im_package_identification_code r 
			on a.package_id  = r.code 
		left join im_pool_code s 
			on a.pool = s.code 
		left join im_cause_of_loss_code t 
			on a.col = t.code
		-- left join im_limited_coding_transaction_code u 
		--	on a.lim_code_loss = u.code  
;