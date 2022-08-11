
select geo.state_code, cov.policy_form_code,	 
sum(coalesce(frs.written_premium, 0)) as written_premium,	    --dne on stat record 	 
sum(coalesce(frs.earned_premium, 0)) as earned_premium,	 	    --dne on stat record
sum(coalesce(frs.paid_losses, 0)) as paid_losses,	 	        --dne on stat record
sum(coalesce(frs.incurred_losses, 0)) as incurred_losses	 	--dne on stat record
from prod_integration.fact_frs_summary frs	 	 
join prod_integration.dim_lob l on frs.lob_id = l.lob_key	 	 
join prod_integration.dim_date d on frs.date_id = d.date_key	 	 
join prod_integration.dim_transaction_type tt on frs.transaction_type_id = tt.transaction_type_key	 	 
join prod_integration.dim_geography_history geo on frs.geography_id = geo.geography_key	 	 
join prod_integration.dim_coverage_history cov on frs.coverage_id = cov.coverage_key	 	 
where l.lob_code = '32'	 	 
and d.year = 2020	 	 
group by geo.state_code,cov.policy_form_code 	 


