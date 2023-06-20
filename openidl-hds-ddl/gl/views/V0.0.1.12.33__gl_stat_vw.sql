CREATE VIEW gl_stat_vw AS

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
		a.territory			territory_code,
		c.id				fk_transaction_code_id,
		a.prem_amt			premium_amount,
		a.loss_amt			loss_amount,
		a.exposure			expsosure,
		a.clm_cnt			claim_count,
		d.id				fk_aslob_id,
		e.id				fk_program_class_code_id,
		f.id				fk_sub_line_code_id,
		g.id				fk_coverage_code_id,
		h.id				fk_terrorism_indicator_code_id,
		i.id				fk_class_code_id,
		a.ent_yr_clm_made	entry_year_into_claims_made_program, --entry YEAR INTO claims made program
		a.lia_lim			liability_limit, -- liability limit
		a.med_pay_lim		medical_payments_limit, --medical payments
		j.id				fk_annual_aggregate_limit_id, --annual aggregate limit
		k.id				fk_rating_identification_id, -- rating identification
		l.id				fk_statistical_exposure_base_id, -- statistical exposure base
		m.id				fk_rating_basis_id,-- rating basis
		n.id				fk_type_of_policy_id, -- TYPE OF POLICY
		o.id				fk_package_identification_id, -- package identification 
		a.pol_eff_mo		policy_effective_term_month,
		CASE
           WHEN a.pol_eff_yr IS NULL THEN NULL
           ELSE Concat(Substring(( Date_part('year',
                current_date) :: VARCHAR ), 1, 2), a.pol_eff_yr)
         END            	policy_effective_term_year,
        CASE
           WHEN a.pol_eff_yr IS NULL THEN NULL
           ELSE Concat(Substring(( Date_part('year',
                current_date) :: VARCHAR ), 1, 2), a.pol_eff_yr,'-',a.pol_eff_mo,'-15')::DATE
         END            	policy_effective_term_date, -- POLICY term effective date
		a.mos_cov::NUMERIC	months_covered, -- months covered
		p.id				fk_type_of_loss_id,
		a.accident_mon		accident_month,
		a.accident_day		accident_day,
		CASE
               WHEN a.accident_yr IS NULL THEN NULL
               WHEN a.accident_yr :: NUMERIC > 90 THEN Concat('19', a.accident_yr)
               ELSE Concat('20', a.accident_yr)
          END            	accident_year,
        a.zip				zip_code,
        a.zip_suff			zip_code_suffix,
        q.id				fk_limited_coding_loss_transaction_id,
        a.policy_num		policy_number,
		a.claim_num			claim_number,
		a.claim_id			claim_id,
		a.co_use			company_use

FROM openidl_base_9999.gl_stat_stg a
	LEFT JOIN state_code b 
		ON a.state = b.code
	LEFT JOIN gl_transaction_code c 
		ON a.trans = c.code
	LEFT JOIN gl_annual_statement_line_of_business_code d 
		ON a.aslob = d.code 
	LEFT JOIN gl_program_class_code e 
		ON a.prog_cd = e.code
	LEFT JOIN gl_sub_line_code f 
		ON a.subline = f.code 
	LEFT JOIN gl_coverage_code g
		ON a.cov_code = g.code
	LEFT JOIN gl_terrorism_indicator_code h 
		ON a.terrorism = h.code
	LEFT JOIN gl_class_code i 
		ON a.class_code = i.code 
	LEFT JOIN gl_annual_aggregate_limit_code j
		ON a.ann_agg_lim = j.code
	LEFT JOIN gl_rating_identification_code k 
		ON a.rating_id = k.code 
	LEFT JOIN gl_statistical_exposure_base_code l 
		ON a.stat_exp_base = l.code 
	LEFT JOIN gl_rating_basis_code m 
		ON a.rating_basis = m.code
	LEFT JOIN gl_type_of_policy_code n 
		ON a.type_policy = n.code 
	LEFT JOIN gl_package_identification_code o
		ON a.package_id = o.code
	LEFT JOIN gl_type_of_loss_code p 
		ON a.col = p.code
	LEFT JOIN gl_limited_coding_loss_transaction_code q 
		ON a.limit_loss_cd_id = q.code;