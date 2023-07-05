select	a.id			openidl_id,
		a.line			lob,
		a.rep_mo		accounting_month,
		a.rep_yr		accounting_year,
		a.comp			company_code,
		b.id			fk_state_code_id,
		a.county		county_code,
		c.code			fk_area_indicator_id,
		a.territory		territory_code,
		d.code			fk_transaction_code,
		a.prem_amt		premium_amount,
		a.loss_amt		loss_amount,
		a.exposure		exposure,
		a.clm_cnt		claim_count,
		e.code			fk_aslob_id,
		f.code			fk_program_code_id,
		g.code			fk_policy_code_id,
		a.exception		exception,
		h.code			fk_terrorism_indicator_code_id,
		a.paoi			property_amount_of_insurance,
		i.code			fk_deductible_type_code_id,
		j.code			fk_deductible_type_amount_id,
		k.code			fk_wind_hail_deductible_code_id,
		l.code			fk_class_code_id,
		m.code			fk_construction_code_id,
		n.code			fk_fire_protection_code_id,
		a.yr_con		construction_year,
		a.lia_lim		liability_limit,
		a.med_pay_lim	medical_payments,
		o.code			fk_occupancy_code_id,
		p.code			fk_hbb_indicator_id,
		q.code			fk_number_of_families_id,
		r.code			fk_size_of_farm_id,
		s.code			fk_risk_type_id,
		t.code			fk_type_of_policy_id,
		u.code			fk_pool_code_id,
		a.mos_cov		months_covered,
		v.code			fk_cause_of_loss_id,
		a.accident_mon	accident_month,
		a.accident_day	accident_day,
		a.accident_yr	accident_year,
		a.zip			zip_code,
		a.zip_suff		zip_code_suffix,
		-- w.code			fk_state_exception_code finish this part asap
		a.policy_num	policy_number,
		a.claim_num		claim_number,
		a.co_use		company_use,
		a.status		status,
		a.line_number	line_number
		-- ask if we need to get the version number and val_ver
		
from openidl_base_7777.fo_stat_stg a
	left join state_code b
		on a.state = b.code
	left join fo_area_indicator_code c
		on a.area = c.code 
	left join fo_transaction_code d 
		on a.trans = d.code
	left join fo_annual_statement_line_of_business e
		on a.aslob = e.code
	left join fo_program_code f 
		on a.prog_cd = f.code
	left join fo_policy_form_code g
		on a.pol_frm = g.code 
	left join fo_terrorism_indicator_code h
		on a.terrorism = h.code
	left join fo_deductible_type_code i 
		on a.ded_type = i.code 
	left join fo_deductible_amount_code j
		on a.ded_amt = j.code 
	left join fo_windstorm_or_hail_deductible_code k
		on a.wind_ded = k.code 
	left join fo_class_code l 
		on a.class_code =  l.code
	left join fo_construction_code m
		on a.construction = m.code
	left join fo_fire_protection_code n 
		on a.fire_prot = n.code 
	left join fo_occupancy_codes_code o 
		on a.occupancy = o.code 
	left join fo_home_based_business_indicator_code p 
		on a.hbb_ind = p.code 
	left join fo_number_of_families_code q 
		on a.num_fam = q.code
	left join fo_size_of_farm_code r 
		on a.size_farm = r.code
	left join fo_risk_type_code s 
		on a.risk_type = s.code 
	left join fo_type_of_policy_code t
		on a.type_policy = t.code
	left join fo_pool_code u 
		on a.pool = u.code
	left join fo_cause_of_loss_code v 
		on a.col = v.code
;