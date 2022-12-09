--All Companies
select geo.state_code, cov.policy_form_code,	 
sum(coalesce(frs.written_premium, 0)) as written_premium,	 	 
sum(coalesce(frs.earned_premium, 0)) as earned_premium,	 	 
sum(coalesce(frs.paid_losses, 0)) as paid_losses,	 	 
sum(coalesce(frs.incurred_losses, 0)) as incurred_losses	 	 
from prod_integration.fact_frs_summary frs	 	 
join prod_integration.dim_geography geo on frs.geography_id = geo.geography_key
join prod_integration.dim_coverage cov on frs.coverage_id = cov.coverage_key
join prod_integration.dim_company com on frs.company_id = com.company_key
where frs.lob_number = '32'	 	 
and frs.year = 2020	 
group by geo.state_code,cov.policy_form_code;


