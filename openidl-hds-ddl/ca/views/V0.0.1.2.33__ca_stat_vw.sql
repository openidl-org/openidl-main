  -- MIMICS PA VIEW, QUESTIONS FOR PETER 
  -- WHY CERTAIN COLUMNS ARE NOT SELECTED IN THE JOIN? PERHAPS TAILORED TO REPORT?
  
  CREATE VIEW ca_stat_vw AS
  
  SELECT a.id                      openidl_id,
         a.policy_num              policy_identifier,
         a.claim_id                claim_identifier,
         a.claim_num               occurrence_identifier,
         a.zip,
         a.zip_suff,
         a.rep_mo                  accounting_month,
         a.comp                    company,
         a.territory               territory,
         a.prem_amt                premium_amount,
         a.loss_amt                loss_amount,
         a.exposure,
         a.clm_cnt                 claim_count,
         a.mos_cov::numeric        months_covered,
         a.accident_mon            accident_month,
         CASE
           WHEN a.accident_yr IS NULL THEN NULL
           WHEN a.accident_yr :: NUMERIC > 90 THEN Concat('19', a.accident_yr)
           ELSE Concat('20', a.accident_yr)
         END                       accident_year,
         CASE
           WHEN a.rep_yr IS NULL THEN NULL
           ELSE Concat(Substring(( Date_part('year',
                current_date) :: VARCHAR ), 1, 3), a.rep_yr)
         END                       accounting_year,
         CASE
           WHEN a.rep_yr IS NULL THEN NULL
           ELSE Concat(Substring(( Date_part('year',
                current_date) :: VARCHAR ), 1, 3), a.rep_yr,'-',a.rep_mo,'-15')::DATE
         END                       accounting_date,
         b.id                      fk_openidl_lob_code_id,
         d.id                      fk_state_code_id,
         e.id                      fk_transaction_code_id,
         f.id                      fk_program_code_id,
         g.coverage_id             fk_coverage_code_id,
         i.id                      fk_operator_age_code_id,
         j.id                      fk_sex_marital_status_code_id,
         k.id                      fk_vehicle_use_code_id,
         m.id                      fk_commercial_automobile_use_code_id,
         o.id                      fk_body_style_code_id,
         p.id                      fk_body_size_code_id,
         q.id                      fk_package_code_id,
         r.id                      fk_passive_restraint_discount_code_id,
         s.id                      fk_anti_lock_brakes_discount_code_id,
         t.id                      fk_defensive_driver_discount_code_id,
         v.id					   fk_commercial_automobile_classification_code_id,
         w.id                      fk_deductible_code_id,
         x.id                      fk_cause_of_loss_code_id,
         y.id                      fk_um_uim_motorist_code_id,
         z.id                      fk_um_uim_stacking_code_id,
         aa.id                     fk_single_multi_car_code_id,
         ac.id                     fk_anti_theft_device_discount_code_id
  FROM   ca_stat_stg a
	join openidl_lob_code b
           ON a.line = b.aais_code
           		and a.subline = b.aais_subline
          		 and a.subline = '2'
         left join state_code d
                ON a.state = d.code
         left join ca_transaction_code e
                ON a.trans = e.code                
         left join ca_program_code f
                ON a.prog_cd = f.code
         left join ca_state_coverage_code_vw g
                ON a.cov_code = g.coverage_code
                   AND g.fk_state_id = d.id
         left join ca_operator_age_code i
                ON a.age = i.code
         left join ca_sex_and_marital_status_code j
                ON a.sex_marital = j.code
         left join ca_vehicle_use_code k
                ON a.vehicle_use = k.code
         left join ca_vehicle_performance_code l
                ON a.vehicle_perf = l.code
         left join ca_commercial_automobile_use_code m
                ON a.commercial_use = m.code
         left join ca_body_style_code o
                ON a.body_style = o.code
         left join ca_body_size_code p
                ON a.body_size = p.code
         left join ca_package_code q
                ON a.package_id = q.code
         left join ca_passive_restraint_discount_code r
                ON a.pass_restraint = r.code
         left join ca_anti_lock_brakes_discount_code s
                ON a.anti_lock = s.code
         left join ca_defensive_driver_discount_code t
                ON a.def_driver = t.code
         left join ca_liability_limit_code u
                ON a.lia_lim = u.code
                   AND u.fk_coverage_id = g.coverage_id
                   AND u.fk_state_id = d.id
          left join ca_commercial_automobile_classification_code v
                 ON a.commercial_class = v.code
         left join ca_deductible_amount_code w
                ON a.ded_amt = w.code
         left join ca_cause_of_loss_code x
                ON a.col = x.loss_code
                   AND x.fk_coverage_code_id = g.coverage_id
         left join ca_um_uim_motorist_code y
                ON a.um_uim_motorist = y.code
                   AND d.id = y.id
         left join ca_um_uim_stacking_code z
                ON a.um_uim_stack_ind = z.code
         left join ca_single_multi_car_code aa
                ON a.sing_mult_car = aa.code
         left join ca_anti_theft_device_discount_code ac
                ON a.anti_theft = ac.code
                   AND ac.fk_state_id = d.id;