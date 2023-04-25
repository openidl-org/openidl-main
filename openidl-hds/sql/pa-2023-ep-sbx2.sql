create table tmp_debug_pka as 
select a.cov_code coverage_code, a.ded_amt deductible_code from pa_stat_stg a;

select 
case when a.coverage_code = '1' then 'Bodily Injury'
                  when a.coverage_code = '2' then 'Property Damage'
                  when a.coverage_code = '3' then 'Single BI/PD Limit'
                  when a.coverage_code = '4' then 'PIP'
                  when a.coverage_code = '5' then 'Medical Payments'
                  when a.coverage_code = '6' then 'Uninsured/underinsured'
                  when a.coverage_code = 'X' then 'Uninsured/underinsured'
                  when a.coverage_code = 'Y' then 'Uninsured/underinsured'
                  when a.coverage_code = '7' and a.deductible_code in ('0') then 'Phy Dam - Coll - FULL'
                  when a.coverage_code = '8' and a.deductible_code in ('0') then 'Phy Dam - Comp - FULL'
                  when a.coverage_code = 'T' and a.deductible_code in ('0') then 'Phy Dam - Comp - FULL'
                  when a.coverage_code = '7' and a.deductible_code in ('2') then 'Phy Dam - Coll - $100'
                  when a.coverage_code = '8' and a.deductible_code in ('2') then 'Phy Dam - Comp - $100'
                  when a.coverage_code = 'T' and a.deductible_code in ('2') then 'Phy Dam - Comp - $100'
                  when a.coverage_code = '7' and a.deductible_code in ('4') then 'Phy Dam - Coll - $250'
                  when a.coverage_code = '8' and a.deductible_code in ('4') then 'Phy Dam - Comp - $250'
                  when a.coverage_code = 'T' and a.deductible_code in ('4') then 'Phy Dam - Comp - $250'
                  when a.coverage_code = '7' and a.deductible_code in ('5') then 'Phy Dam - Coll - $500'
                  when a.coverage_code = '8' and a.deductible_code in ('5') then 'Phy Dam - Comp - $500'
                  when a.coverage_code = 'T' and a.deductible_code in ('5') then 'Phy Dam - Comp - $500'
                  when a.coverage_code = '7' and a.deductible_code in ('6') then 'Phy Dam - Coll - $1000'
                  when a.coverage_code = '8' and a.deductible_code in ('6') then 'Phy Dam - Comp - $1000'
                  when a.coverage_code = 'T' and a.deductible_code in ('6') then 'Phy Dam - Comp - $1000'
                  when a.coverage_code = '7' and a.deductible_code not in ('0', '2', '4', '5', '6') then 'Phy Dam - Coll - ALL OTHER'
                  when a.coverage_code = '8' and a.deductible_code not in ('0', '2', '4', '5', '6') then 'Phy Dam - Comp - ALL OTHER'
                  when a.coverage_code = 'T' and a.deductible_code not in ('0', '2', '4', '5', '6') then 'Phy Dam - Comp - ALL OTHER'              
                  when a.coverage_code = '9' then 'Bodily Injury'
                  else null end as reporting_name
                  from tmp_debug_pka a;