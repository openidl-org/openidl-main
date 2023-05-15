CREATE VIEW ho_stat_vw AS 

SELECT 	a.id				openidl_id,
		a.line				lob, 
		a.rep_mo			accounting_month,
		CASE
           WHEN a.rep_yr IS NULL THEN NULL
           ELSE Concat(Substring(( Date_part('year',
                current_date) :: VARCHAR ), 1, 2), a.rep_yr)
         END            	accounting_year,
        CASE
           WHEN a.rep_yr IS NULL THEN NULL
           ELSE Concat(Substring(( Date_part('year',
                current_date) :: VARCHAR ), 1, 2), a.rep_yr,'-',a.rep_mo,'-15')::DATE
         END            	accounting_date,
		a.comp				company_code,
		b.id 				fk_state_code_id,
		a.county			county,
		c.id				fk_area_indiactor__code_id,
		a.territory 		territory_code,
		d.id 				fk_transaction_code_id,
		a.prem_amt			premium_amount,
		a.loss_amt			loss_amount,
		a.exposure			exposure,
		a.clm_cnt 			claim_count,
		e.id				fk_aslob_id,
		f.id				fk_program_code_id,
		g.id				fk_policy_form_code_id,
		h.id				fk_loss_settlement_indicator_id,
		a.paoi				primary_property_amount_of_insurance,
		i.id				fk_deductible_type_id,
		j.id				fk_deductible_amount_id,
		k.id				fk_wind_hail_deductible_id,
		l.id				fk_class_code_id,
		m.id				fk_construction_code_id,
		n.id 				fk_fire_protection_code_id,
		a.yr_con			year_of_construction,
		a.lia_lim			liability_limit,
		a.med_pay_lim		medical_payments_limit,
		o.id				fk_escaped_liquid_fuel_coverage_property_code_id,
		p.id				fk_escaped_liquid_fuel_and_lead_coverage_liability_code_id,
		q.id 				fk_occupancy_codes_id,
		r.id				fk_home_based_business_indicator_id,
		s.id				fk_number_of_families_code_id,
		t.id				fk_ordinance_or_law_coverage_id,
		u.id				fk_theft_deductible_amount_id,
		a.sec_paoi			secondary_property_amount_of_insurance,
		v.id				fk_nc_program_enhancement_indicator_id,
		w.id				fk_mold_damage_coverage_code_id,
		x.id				fk_pool_code_id,
		a.mos_cov::NUMERIC	months_covered,
		y.id				fk_cause_of_loss_id,
		a.accident_mon		accident_month,
		a.accident_day		accident_day,
		CASE
           WHEN a.accident_yr IS NULL THEN NULL
           WHEN a.accident_yr :: NUMERIC > 90 THEN Concat('19', a.accident_yr)
           ELSE Concat('20', a.accident_yr)
         END            	accident_year,
		a.zip				zip_code,
		a.zip_suff			zip_code_suffix,
		z.id				fk_building_code_effectiveness_grade_id,
		a.policy_num		policy_number,
		a.claim_num			claim_number,
		a.claim_id			claim_id,
		a.co_use			company_use,
		aa.id				fk_small_premium_indicator_code_id,
		ab.id				fk_limited_coding_loss_transaction_code_id	

FROM openidl_base_9999.ho_stat_stg a
	LEFT JOIN state_code b 
		ON a.state = b.code
	LEFT JOIN ho_area_indicator_code c
		ON a.area = c.code
	LEFT JOIN ho_transaction_code d 
		ON a.trans = d.code
	LEFT JOIN ho_annual_statement_line_of_business_code e 
		ON a.aslob = e.code
	LEFT JOIN ho_program_code f
		ON a.prog_cd = f.code
	LEFT JOIN ho_policy_form_code g 
		ON a.pol_frm = g.code
	LEFT JOIN ho_loss_settlement_indicator_code h 
		ON a.lsi = h.code
	LEFT JOIN ho_deductible_type_code i
		ON a.ded_type = i.code
	LEFT JOIN ho_deductible_amount_code j
		ON a.ded_amt = j.code
	LEFT JOIN ho_windstorm_or_hail_deductible_code k
		ON a.wind_ded = k.code
	LEFT JOIN ho_class_code l 
		ON a.class_code = l.code
	LEFT JOIN ho_construction_code m
		ON a.construction = m.code
	LEFT JOIN ho_fire_protection_code n 
		ON a.fire_prot = n.code
	LEFT JOIN ho_escaped_liquid_fuel_coverage_property_code o
		ON a.elf_prop = o.code
	LEFT JOIN ho_escaped_liquid_fuel_and_lead_coverage_liability_code p
		ON a.elf_liab = P.code 
	LEFT JOIN ho_occupancy_codes_code q
		ON a.occupancy = q.code
	LEFT JOIN ho_home_based_business_indicator_code r
		ON a.hbb_ind = r.code
	LEFT JOIN ho_number_of_families_code s
		ON a.num_fam = s.code
	LEFT JOIN ho_ordinance_or_law_coverage_code t
		ON a.ord_law = t.code
	LEFT JOIN ho_theft_deductible_amount_code u 
		ON a.ord_law = u.code 
	LEFT JOIN ho_nc_program_enhancement_indicator_code v 
		ON a.res090 = v.code 
	LEFT JOIN ho_mold_damage_coverage_code w 
		ON a.mold = w.code	
	LEFT JOIN ho_pool_code x 
		ON a.pool = x.code 
	LEFT JOIN ho_cause_of_loss_code y
		ON a.col = y.code	
	LEFT JOIN ho_building_effectiveness_grade_code z
		ON a.bceg = z.code	
	LEFT JOIN ho_small_premium_indicator_code aa 
		ON a.sm_prem_ind = aa.code
	LEFT JOIN ho_limited_coding_loss_transaction_code ab 
		ON a.res125 = ab.code;