CREATE VIEW mho_stat_vw AS 

SELECT 	a.id				openidl_id,
		a.line			lob, 
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
          END                 accounting_date,
		a.comp			company_code,
		b.id 			fk_state_code_id,
		a.county			county_code,
		c.id				fk_area_indicator_code_id,
		a.territory		territory_code,
		d.id				fk_transaction_code_id,
		a.prem_amt		premium_amount,
		a.loss_amt		loss_amount,
		a.exposure		exposure,
		a.clm_cnt			claim_count,
		e.id				fk_aslob_id,
		f.id				k_program_code_id,
		g.id 			fk_policy_form_code_id,
		h.id				fk_loss_settlement_indicator_code_id,
		a.paoi			property_amount_of_insurance,
		i.id				fk_deductible_type_id,
		j.id				fk_deductible_amount_id,
		k.id				fk_wind_hail_deductible_code_id,
		l.id				fk_class_code_id,
		m.id				fk_fire_protection_code_id,
		a.yr_man			year_of_manufacture,
		a.lia_lim			liability_limit,
		a.med_pay_lim		medical_payments_limit,
		n.id				fk_es_liq_fuel_property_id,
		o.id				fk_es_liq_fuel_liability_id,
		p.id				fk_occupancy_code_id,
		q.id				fk_hbb_indicator_code_id,
		r.id				fk_tie_down_code_id,
		s.id				fk_ordinance_or_law_coverage_code_id,
		t.id				fk_theft_deductible_amount_id,
		a.sec_paoi		secondary_property_amount_of_insurance,
		u.id				fk_mold_damage_coverage_code_id,
		v.id				fk_pool_code_id,
		a.mos_cov::NUMERIC	months_covered,
		w.id				fk_cause_of_loss_code_id,
		a.accident_mon		accident_month,
		a.accident_day		accident_day,
		CASE
               WHEN a.accident_yr IS NULL THEN NULL
               WHEN a.accident_yr :: NUMERIC > 90 THEN Concat('19', a.accident_yr)
               ELSE Concat('20', a.accident_yr)
          END            	accident_year,
          a.zip			zip_code,
          a.zip_suff		zip_code_suffix,
          a.policy_num		policy_number,
		a.claim_num		claim_number,
		a.claim_id		claim_id,
		a.co_use			company_use
		-- limited coding loss ???
		
		
		
		
FROM openidl_base_9999.mho_stat_stg a
	LEFT JOIN state_code b 
		ON a.state = b.code
	LEFT JOIN mho_area_indicator_code c 
		ON a.area = c.code
	LEFT JOIN mho_transaction_code d
		ON a.trans = d.code
	LEFT JOIN mho_annual_statement_line_of_business_code e
		ON a.aslob = e.code
	LEFT JOIN mho_program_code f
		ON a.prog_cd = f.code
	LEFT JOIN mho_policy_form_code g
		ON a.pol_frm = g.code
	LEFT JOIN mho_loss_settlement_indicator_code h
		ON a.lsi = h.code
	LEFT JOIN mho_deductible_type_code i
		ON a.ded_type = i.code
	LEFT JOIN mho_deductible_amount_code j
		ON a.ded_amt = j.code
	LEFT JOIN mho_windstorm_or_hail_deductible_code k
		ON a.wind_ded = k.code
	LEFT JOIN mho_class_code l
		ON a.class_code = l.code
	LEFT JOIN mho_fire_protection_code m
		ON a.fire_prot = m.code
	LEFT JOIN mho_escaped_liquid_fuel_coverage_property_code n
		ON a.elf_prop = n.code
	LEFT JOIN mho_escaped_liquid_fuel_and_lead_coverage_liability_code o
		ON a.elf_liab = o.code
	LEFT JOIN mho_occupancy_code p
		ON a.occupancy = p.code
	LEFT JOIN mho_home_based_business_indicator_code q
		ON a.hbb_ind = q.code
	LEFT JOIN mho_tie_down_code r
		ON a.tie_down = r.code
	LEFT JOIN mho_ordinance_or_law_coverage_code s
		ON a.ord_law = s.code
	LEFT JOIN mho_theft_deductible_amount_code t 
		ON a.theft_ded = t.code
	LEFT JOIN mho_mold_damage_coverage_code u
		ON a.mold = u.code
	LEFT JOIN mho_pool_code v 
		ON a.pool = v.code
	LEFT JOIN mho_cause_of_loss_code w 
		ON a.col = w.code;