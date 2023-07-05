CREATE VIEW cp_stat_vw AS

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
		a.county			county_code,
		c.id				fk_area_indicator_code_id,
		a.territory			territory_code,
		d.id				fk_transaction_code_id,
		a.prem_amt			premium_amount,
		a.loss_amt			loss_amount,
		a.exposure			expsosure,
		a.clm_cnt			claim_count,
		e.id				fk_aslob_id,
		f.id				fk_program_code_id,
		g.id				fk_major_peril_code_id,
		h.id				fk_coverage_code_id,
		a.exception 		RES044, -- what do we do about this? 
		i.id				fk_terrorism_indicator_code_id,
		a.paoi				property_amount_of_insurance,
		j.id				fk_deductible_type_id,
		k.id				fk_deductible_amount_id,
		l.id				fk_wind_hail_deductible_code_id,
		m.id				fk_class_code_id,
		n.id				fk_construction_code_id,
		o.id				fk_fire_protection_code_id,
		a.theft_limit		theft_limit,
		--p.id				fk_rate_group_id,
		q.id				fk_rating_id,
		r.id				fk_large_area_modifier_id,
		s.id				fk_sprinkler_system_code_id,
		t.id				fk_package_identification_id,
		u.id				fk_pool_code_id,
		a.mos_cov::NUMERIC	months_covered,
		v.id				fk_cause_of_loss_id,
		a.accident_mon		accident_month,
		a.accident_day		accident_day,
		CASE
               WHEN a.accident_yr IS NULL THEN NULL
               WHEN a.accident_yr :: NUMERIC > 90 THEN Concat('19', a.accident_yr)
               ELSE Concat('20', a.accident_yr)
          END            	accident_year,
        a.zip				zip_code,
        a.zip_suff			zip_code_suffix,
        -- limited coding loss (RES125)?,
        -- w.id				fk_state_exception_id,
        a.policy_num		policy_number,
		a.claim_num			claim_number,
		a.claim_id			claim_id,
		a.co_use			company_use

FROM openidl_base_9999.cp_stat_stg a
	LEFT JOIN state_code b 
		ON a.state = b.code
	LEFT JOIN cp_area_indicator_code c 
		ON a.area = c.code
	LEFT JOIN cp_transaction_code d 
		ON a.trans = d.code
	LEFT JOIN cp_annual_statement_line_of_business_code e 
		ON a.aslob = e.code 
	LEFT JOIN cp_program_class_code f 
		ON a.prog_cd = f.code
	LEFT JOIN cp_major_peril_code g 
		ON a.major_peril = g.code 
	LEFT JOIN cp_coverage_code h
		ON a.cov_code = h.code
	LEFT JOIN cp_terrorism_indicator_code i 
		ON a.terrorism = i.code
	LEFT JOIN cp_deductible_type_code j 
		ON a.ded_type = j.code 
	LEFT JOIN cp_deductible_amount_code k 
		ON a.ded_amt = k.code
	LEFT JOIN cp_windstorm_or_hail_deductible_code l
		ON a.wind_ded = l.code
	LEFT JOIN cp_class_code m 
		ON a.class_code = m.code 
	LEFT JOIN cp_construction_code n
		ON a.construction = n.code
	LEFT JOIN cp_fire_protection_code o 
		ON a.fire_prot = o.code
--	LEFT JOIN cp_rate_group_code p
--		ON a.rate_group = p.code
	LEFT JOIN cp_rating_identification_code q
		ON a.rating_id = q.code
	LEFT JOIN cp_large_area_modifier_code r
		ON a.large_area_mod = r.code 
	LEFT JOIN cp_sprinkler_system_code s
		ON a.sprinkler = s.code
	LEFT JOIN cp_package_identification_code t
		ON a.package_id = t.code
	LEFT JOIN cp_pool_code u 
		ON a.pool = u.code
	LEFT JOIN cp_cause_of_loss_code v 
		ON a.col = v.code;
--	LEFT JOIN cp_state_exception_code w 
--		ON a.st_exc = w.code;