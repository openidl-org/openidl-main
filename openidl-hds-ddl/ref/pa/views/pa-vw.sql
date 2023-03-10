set schema 'openidl_base_9999';
SELECT a.id openidl_id,
       a.policy_num,
       a.claim_id,
       a.zip,
       a.zip_suff,
	   a.rep_mo accounting_month,
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
		case 
	   		when a.rep_yr is null then null
			else concat(substring((date_part('year', CURRENT_DATE)::varchar),1,3),a.rep_yr)
		end accounting_year,   
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
       t.id fk_defensive_driver_discount_code
from pa_stat_stg a join openidl_lob_code b on a.line = b.code
left join pa_subline_code c on a.subline = c.code
left join state_code d on a.state = d.code
left join pa_transaction_code e  on a.trans = e.code
left join pa_program_code f on a.prog_cd  = f.code
left join pa_state_coverage_code_vw g on a.cov_code  = g.coverage_code and g.fk_state_id = d.id
left join pa_operator_age_code i on a.age = i.code
left join pa_sex_and_marital_status_code j on a.sex_marital = j.code
left join pa_vehicle_use_code k on a.vehicle_use = k.code
left join pa_vehicle_performance_code l on a.vehicle_perf = l.code
left join pa_penalty_points_code m on a.penalty_points = m.code
left join pa_body_style_code o on a.body_style = o.code
left join pa_body_size_code p on a.body_size  = p.code
left join pa_package_code q on a.package_id = q.code
left join pa_passive_restraint_discount_code r on a.pass_restraint = r.code
left join pa_anti_lock_brakes_discount_code s on a.anti_lock = s.code
left join pa_defensive_driver_discount_code t on a.def_driver = t.code
left join pa_liability_limit_code u on a.lia_lim = u.code and u.fk_coverage_id = g.coverage_id and u.fk_state_id = d.id
left join pa_private_passenger_drivers_training_good_student_code v on a.driv_train_good_student = v.code
left join pa_deductible_code w on a.ded_amt = w.code
left join pa_cause_of_loss_code x on a.col = x.loss_code and x.fk_coverage_code_id = g.coverage_id;