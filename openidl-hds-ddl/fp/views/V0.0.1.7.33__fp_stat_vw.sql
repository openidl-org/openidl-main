CREATE VIEW fp_stat_vw AS

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
		m.id				fk_class_code_id, --class code
		n.id				fk_construction_code_id, --construction code
		o.id				fk_fire_protection_code_id, -- fire protection code
		a.yr_con			year_of_construction, --year of construction
		p.id				fk_occupancy_code_id, --occupancy code
		q.id				fk_number_of_families_id, --number of families
		r.id				fk_risk_type_id, -- risk type
		s.id				fk_package_identification_id,-- package id
		t.id				fk_pool_code_id, --pool code
		a.mos_cov::NUMERIC	months_covered, -- months covered
		u.id				fk_cause_of_loss_id, --cause of loss
		a.accident_mon		accident_month,
		CASE
               WHEN a.accident_yr IS NULL THEN NULL
               WHEN a.accident_yr :: NUMERIC > 90 THEN Concat('19', a.accident_yr)
               ELSE Concat('20', a.accident_yr)
          END            	accident_year,
        a.zip				zip_code,
        a.zip_suff			zip_code_suffix,
        -- limited coding loss?
        a.policy_num		policy_number,
		a.claim_num			claim_number,
		a.claim_id			claim_id,
		a.co_use			company_use

FROM openidl_base_9999.fp_stat_stg a
	LEFT JOIN state_code b 
		ON a.state = b.code
	LEFT JOIN fp_area_indicator_code c 
		ON a.area = c.code
	LEFT JOIN fp_transaction_code d 
		ON a.trans = d.code
	LEFT JOIN fp_annual_statement_line_of_business_code e 
		ON a.aslob = e.code 
	LEFT JOIN fp_program_code f 
		ON a.prog_cd = f.code
	LEFT JOIN fp_major_peril_code g 
		ON a.major_peril = g.code 
	LEFT JOIN fp_coverage_code h
		ON a.cov_code = h.code
	LEFT JOIN fp_terrorism_indicator_code i 
		ON a.terrorism = i.code
	LEFT JOIN fp_deductible_type_code j 
		ON a.ded_type = j.code 
	LEFT JOIN fp_deductible_amount_code k 
		ON a.ded_amt = k.code
	LEFT JOIN fp_windstorm_or_hail_deductible_code l 
		ON a.wind_ded = l.code
	LEFT JOIN fp_class_code m 
		ON a.class_code = m.code 
	LEFT JOIN fp_construction_code n
		ON a.construction = n.code
	LEFT JOIN fp_fire_protection_code o 
		ON a.fire_prot = o.code 
	LEFT JOIN fp_occupancy_code p 
		ON a.occupancy = p.code 
	LEFT JOIN fp_number_of_families_code q 
		ON a.num_fam = q.code
	LEFT JOIN fp_risk_type_code r 
		ON a.risk_type = r.code 
	LEFT JOIN fp_package_identification_code s
		ON a.package_id = s.code
	LEFT JOIN fp_pool_code t 
		ON a.pool = t.code
	LEFT JOIN fp_cause_of_loss_code u 
		ON a.col = u.code;
