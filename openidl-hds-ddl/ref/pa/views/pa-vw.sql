create view 
SELECT a.id openidl_id,
       a.policy_num,
       a.claim_id,
       a.zip,
       a.zip_suff,
	   a.rep_mo monthh,
	   a.comp company,
	   a.territory territory,
	   a.prem_amt  premium_amount,
	   a.loss_amt loss_amount,
	   a.exposure,
	   a.clm_cnt claim_count,
	   a.mos_cov  months_covered,
	   a.accident_mon accident_month,
	   case 
	   		when a.accident_yr is null then null
	   		when a.accident_yr::numeric > 90 then concat('19',a.accident_yr)
			else concat('20',a.accident_yr)
		end accident_year,
	   concat(substring((date_part('year', CURRENT_DATE)::varchar),1,3),a.rep_yr) yearr, 
       a.id   openidl_id,
	   b.id   fk_openidl_lob_code_id,
       c.id   fk_subline_code_id,
       d.id   fk_state_code_id,
       e.id   fk_transaction_code_id,
       f.id   fk_program_code_id,
       g.coverage_id   fk_coverage_code_id,
       i.id fk_operator_age_code,
       j.id fk_sex_marital_status_code,
       k.id fk_vehicle_use_code,
       m.id fk_penalty_points_code,
       o.id fk_body_style_code,
       p.id fk_body_size_code,
       q.id fk_package_code,
       r.id fk_passive_restraint_discount_code,
       s.id fk_anti_lock_brakes_discount_code,
       t.id fk_defensive_driver_discount_code,
       a.lia_lim liability_limit_code,
       a.driv_train_good_student driver_train_good_student_code,
       a.ded_amt deductible_amount_code,
       a.col cause_of_loss_code,
       a.um_uim_motorist um_uim_motorist_code,
       a.um_uim_stack_ind um_uim_stack_ind_code,
       a.sing_mult_car sing_mult_car_code,
       a.symbol symbol_code,
       a.anti_theft  anti_theft_code
FROM   pa_stat_stg a,
       openidl_lob_code b,
       pa_subline_code c,
       state_code d,
       pa_transaction_code e,
       pa_program_code f,
       pa_state_coverage_code_vw g,
       pa_operator_age_code i,
       pa_sex_and_marital_status_code j,
       pa_vehicle_use_code k,
       pa_vehicle_performance_code l,
       pa_penalty_points_code m,
       pa_body_style_code o,
       pa_body_size_code p,
       pa_package_code q,
       pa_passive_restraint_discount_code r,
       pa_anti_lock_brakes_discount_code s,
       pa_defensive_driver_discount_code t
WHERE  a.line = b.code
and a.subline = '1'
and a.subline = c.code
and a.state = d.code
and a.trans = e.code
and a.prog_cd = f.code
and g.fk_state_id = d.id
and a.cov_code = g.coverage_code
and a.age = i.code
and a.sex_marital = j.code
and a.vehicle_use = k.code
and a.vehicle_perf = l.code
and a.penalty_points = m.code
and a.body_style = o.code
and a.body_size = p.code
and a.package_id = q.code
and a.pass_restraint  = r.code
and a.anti_lock = s.code
and a.def_driver = t.code; 