create table tmp_decode_test_tbl as 
select a.cov_code coverage_code, a.ded_amt deductible_code from pa_stat_stg a;


select c.reporting_name, c.knt decoded_count, d.knt coded_count, c.knt-d.knt count_difference
from (select b.reporting_name, count(1) knt
from (
select 
       CASE
         WHEN a.fk_coverage_code_id IN ( 1, 13, 26 ) THEN 'Bodily Injury'
         WHEN a.fk_coverage_code_id IN ( 2, 14, 27 ) THEN 'Property Damage'
         WHEN a.fk_coverage_code_id IN ( 3, 15, 28 ) THEN 'Single BI/PD Limit'
         WHEN a.fk_coverage_code_id = 4 THEN 'PIP'
         WHEN a.fk_coverage_code_id IN ( 5, 16, 29 ) THEN 'Medical Payments'
         WHEN a.fk_coverage_code_id IN ( 6, 17, 10, 21,  33, 11, 22, 34 ) THEN 'Uninsured/Underinsured'
         WHEN a.fk_coverage_code_id IN ( 7, 18, 30 ) AND a.fk_deductible_code_id = 1 THEN 'Phy Dam - Coll - Full'         
         WHEN a.fk_coverage_code_id IN ( 8,19,31) AND a.fk_deductible_code_id = 1 THEN 'Phy Dam - Comp - Full'
         WHEN a.fk_coverage_code_id IN ( 12,35) AND a.fk_deductible_code_id = 1 THEN 'Phy Dam - Comp - Full'  
         WHEN a.fk_coverage_code_id IN ( 7,18,30) AND a.fk_deductible_code_id = 3 THEN 'Phy Dam - Coll - $100'
         WHEN a.fk_coverage_code_id IN ( 8,19,31) AND a.fk_deductible_code_id = 3 THEN 'Phy Dam - Comp - $100'
         WHEN a.fk_coverage_code_id IN ( 12,35) AND a.fk_deductible_code_id = 3 THEN 'Phy Dam - Comp - $100'
         WHEN a.fk_coverage_code_id IN (7,18,30) AND a.fk_deductible_code_id = 5 THEN 'Phy Dam - Coll - $250'
         WHEN a.fk_coverage_code_id IN ( 8,19,31) AND a.fk_deductible_code_id = 5 THEN 'Phy Dam - Comp - $250'
         WHEN a.fk_coverage_code_id IN ( 12,35) AND a.fk_deductible_code_id = 5 THEN 'Phy Dam - Comp - $250'
         WHEN a.fk_coverage_code_id IN ( 7,18,30) AND a.fk_deductible_code_id = 6 THEN 'Phy Dam - Coll - $500'         
         WHEN a.fk_coverage_code_id IN ( 8,19,31) AND a.fk_deductible_code_id = 6 THEN 'Phy Dam - Comp - $500'
         WHEN a.fk_coverage_code_id IN ( 12,35) AND a.fk_deductible_code_id = 6 THEN 'Phy Dam - Comp - $500'  
         WHEN a.fk_coverage_code_id IN (7,18,30) AND a.fk_deductible_code_id = 7 THEN 'Phy Dam - Coll - $1000'      
         WHEN a.fk_coverage_code_id IN (8,19,31) AND a.fk_deductible_code_id = 7 THEN 'Phy Dam - Comp - $1000'
         WHEN a.fk_coverage_code_id IN ( 12,35) AND a.fk_deductible_code_id = 7 THEN 'Phy Dam - Comp - $1000'
         WHEN a.fk_coverage_code_id IN ( 7,18,30) AND a.fk_deductible_code_id not in (1,3,5,6,7) THEN 'Phy Dam - Coll - ALL OTHER'        
         WHEN a.fk_coverage_code_id IN ( 8,19,31) AND a.fk_deductible_code_id not in (1,3,5,6,7) THEN 'Phy Dam - Comp - ALL OTHER'       
         WHEN a.fk_coverage_code_id IN ( 12,35) AND a.fk_deductible_code_id not in (1,3,5,6,7) THEN 'Phy Dam - Comp - ALL OTHER'
         WHEN a.fk_coverage_code_id IN (9,20,32) THEN 'Bodily Injury'
         else NULL
       END AS reporting_name
FROM   pa_stat_vw a,
       pa_coverage_code b
WHERE  a.fk_coverage_code_id = b.id) b
group by b.reporting_name order by b.reporting_name) c,
(select b.reporting_name, count(1) knt
from (
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
                  from tmp_decode_test_tbl a) b
 group by b.reporting_name order by b.reporting_name) d
 where c.reporting_name = d.reporting_name;