select q.state_code, q.state_name, q.territory_key,q.zip_code, q.year, 
       case when q.coverage_code = '1' then 'Bodily Injury'
              when q.coverage_code = '2' then 'Property Damage'
              when q.coverage_code = '3' then 'Single BI/PD Limit'
              when q.coverage_code = '4' then 'PIP'
              when q.coverage_code = '5' then 'Medical Payments'
              when q.coverage_code = '6' then 'Uninsured/underinsured'
              when q.coverage_code = 'X' then 'Uninsured/underinsured'
              when q.coverage_code = 'Y' then 'Uninsured/underinsured'
              when q.coverage_code = '7' and q.deductible_amount in ('0') then 'Phy Dam - Coll - FULL'
              when q.coverage_code = '8' and q.deductible_amount in ('0') then 'Phy Dam - Comp - FULL'
              when q.coverage_code = 'T' and q.deductible_amount in ('0') then 'Phy Dam - Comp - FULL'
              when q.coverage_code = '7' and q.deductible_amount in ('2') then 'Phy Dam - Coll - $100'
              when q.coverage_code = '8' and q.deductible_amount in ('2') then 'Phy Dam - Comp - $100'
              when q.coverage_code = 'T' and q.deductible_amount in ('2') then 'Phy Dam - Comp - $100'
              when q.coverage_code = '7' and q.deductible_amount in ('4') then 'Phy Dam - Coll - $250'
              when q.coverage_code = '8' and q.deductible_amount in ('4') then 'Phy Dam - Comp - $250'
              when q.coverage_code = 'T' and q.deductible_amount in ('4') then 'Phy Dam - Comp - $250'
              when q.coverage_code = '7' and q.deductible_amount in ('5') then 'Phy Dam - Coll - $500'
              when q.coverage_code = '8' and q.deductible_amount in ('5') then 'Phy Dam - Comp - $500'
              when q.coverage_code = 'T' and q.deductible_amount in ('5') then 'Phy Dam - Comp - $500'
              when q.coverage_code = '7' and q.deductible_amount in ('6') then 'Phy Dam - Coll - $1000'
              when q.coverage_code = '8' and q.deductible_amount in ('6') then 'Phy Dam - Comp - $1000'
              when q.coverage_code = 'T' and q.deductible_amount in ('6') then 'Phy Dam - Comp - $1000'
              when q.coverage_code = '7' and q.deductible_amount not in ('0', '2', '4', '5', '6') then 'Phy Dam - Coll - ALL OTHER'
              when q.coverage_code = '8' and q.deductible_amount not in ('0', '2', '4', '5', '6') then 'Phy Dam - Comp - ALL OTHER'
              when q.coverage_code = 'T' and q.deductible_amount not in ('0', '2', '4', '5', '6') then 'Phy Dam - Comp - ALL OTHER'              
              when q.coverage_code = '9' then 'Bodily Injury'
              else null end as coverage,
       sum(coalesce(q.earned_premium, 0)) as earned_premium, 
       sum(coalesce(q.paid_losses, 0)) as paid_losses, 
       sum(coalesce(q.paid_losses, 0) + coalesce(q.outstanding_losses, 0)) as incurred_losses, 
       sum(coalesce(q.outstanding_losses, 0)) as outstanding_losses, 
       sum(coalesce(q.earned_exposures, 0))/24 as earned_exposures,
       sum(coalesce(q.paid_claim_counts, 0)) as paid_claim_counts, 
       sum(coalesce(q.incurred_claim_counts, 0)) as incurred_claim_counts, 
       sum(coalesce(q.outstanding_claim_counts, 0)) as oustanding_claim_counts,
       sum(case when (coalesce(q.paid_losses, 0) + coalesce(q.outstanding_losses, 0)) > 25000 then 25000 else (coalesce(q.paid_losses, 0) + coalesce(q.outstanding_losses, 0)) end) as basic_limit_il,
       sum(case when (coalesce(q.paid_losses, 0) + coalesce(q.outstanding_losses, 0)) <= 25000 then 0 else (coalesce(q.paid_losses, 0) + coalesce(q.outstanding_losses, 0)) - 25000 end) as excess_limit_il,
       (sum(case when (coalesce(q.paid_losses, 0) + coalesce(q.outstanding_losses, 0)) > 25000 then 25000 else (coalesce(q.paid_losses, 0) + coalesce(q.outstanding_losses, 0)) end) * 1.06 * 1.20) as LDBL,
       (sum(case when (coalesce(q.paid_losses, 0) + coalesce(q.outstanding_losses, 0)) <= 25000 then 0 else (coalesce(q.paid_losses, 0) + coalesce(q.outstanding_losses, 0)) - 25000 end) * 1.06 * 1.20) as LDEL      

from (
select geo.state_code, geo.state_name, frs.territory_key, geo.zip_code, cov.coverage_code, ded.deductible_amount, ad.year, d.year as accounting_year,
         frs.earned_premium, frs.paid_losses, frs.incurred_losses, frs.outstanding_losses, frs.earned_exposures, frs.paid_claim_counts,
         frs.incurred_claim_counts, frs.outstanding_claim_counts
  from prod_integration.fact_frs_summary frs
  left join prod_integration.dim_coverage cov on frs.coverage_id = cov.coverage_key
  left join prod_integration.dim_deductible ded on frs.deductible_id = ded.deductible_key
  left join prod_integration.dim_geography geo on frs.geography_id = geo.geography_key
  left join prod_integration.dim_date d on frs.date_id = d.date_key
  left join prod_integration.dim_date ad on frs.accident_date_id = ad.date_key
  left semi join prod_integration.dim_lob dm_lob on frs.lob_id = dm_lob.lob_key and dm_lob.lob_name_short = 'AU'
  left semi join prod_integration.dim_transaction_type dmt on frs.transaction_type_id = dmt.transaction_type_key and dmt.transaction_code in ('1','2','3','6','7')
  where 
  cov.lob_code = '56' and 
  cov.subline_code = '1' and
  cov.coverage_code in ('1','2','3','4','5','6','X','Y','7','8','T','9') and
  ad.year in (2016,2017, 2018, 2019,2020)
)  q
group by q.state_code, q.state_name, q.territory_key, q.zip_code, q.year, 
         case when q.coverage_code = '1' then 'Bodily Injury'
              when q.coverage_code = '2' then 'Property Damage'
              when q.coverage_code = '3' then 'Single BI/PD Limit'
              when q.coverage_code = '4' then 'PIP'
              when q.coverage_code = '5' then 'Medical Payments'
              when q.coverage_code = '6' then 'Uninsured/underinsured'
              when q.coverage_code = 'X' then 'Uninsured/underinsured'
              when q.coverage_code = 'Y' then 'Uninsured/underinsured'
              when q.coverage_code = '7' and q.deductible_amount in ('0') then 'Phy Dam - Coll - FULL'
              when q.coverage_code = '8' and q.deductible_amount in ('0') then 'Phy Dam - Comp - FULL'
              when q.coverage_code = 'T' and q.deductible_amount in ('0') then 'Phy Dam - Comp - FULL'
              when q.coverage_code = '7' and q.deductible_amount in ('2') then 'Phy Dam - Coll - $100'
              when q.coverage_code = '8' and q.deductible_amount in ('2') then 'Phy Dam - Comp - $100'
              when q.coverage_code = 'T' and q.deductible_amount in ('2') then 'Phy Dam - Comp - $100'
              when q.coverage_code = '7' and q.deductible_amount in ('4') then 'Phy Dam - Coll - $250'
              when q.coverage_code = '8' and q.deductible_amount in ('4') then 'Phy Dam - Comp - $250'
              when q.coverage_code = 'T' and q.deductible_amount in ('4') then 'Phy Dam - Comp - $250'
              when q.coverage_code = '7' and q.deductible_amount in ('5') then 'Phy Dam - Coll - $500'
              when q.coverage_code = '8' and q.deductible_amount in ('5') then 'Phy Dam - Comp - $500'
              when q.coverage_code = 'T' and q.deductible_amount in ('5') then 'Phy Dam - Comp - $500'
              when q.coverage_code = '7' and q.deductible_amount in ('6') then 'Phy Dam - Coll - $1000'
              when q.coverage_code = '8' and q.deductible_amount in ('6') then 'Phy Dam - Comp - $1000'
              when q.coverage_code = 'T' and q.deductible_amount in ('6') then 'Phy Dam - Comp - $1000'
              when q.coverage_code = '7' and q.deductible_amount not in ('0', '2', '4', '5', '6') then 'Phy Dam - Coll - ALL OTHER'
              when q.coverage_code = '8' and q.deductible_amount not in ('0', '2', '4', '5', '6') then 'Phy Dam - Comp - ALL OTHER'
              when q.coverage_code = 'T' and q.deductible_amount not in ('0', '2', '4', '5', '6') then 'Phy Dam - Comp - ALL OTHER'              
              when q.coverage_code = '9' then 'Bodily Injury'
              else null end
