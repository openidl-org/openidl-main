Physical Damage Coverage Code: '7','8','T' 
Physical Damage Coverage Code ID: 7,8,12,18,19,30,31,35


select a.fk_coverage_code_id,
case when a.fk_coverage_code_id in (7,8,12,18,19,30,31,35) then 'Physical Damage' else 'Liability' end as physical_or_liability,
case when a.fk_coverage_code_id not in (7,8,12,18,19,30,31,35) and a.fk_transaction_code_id in (2,3,4,5) then a.accident_year 
else a.accounting_year end as year
from pa_stat_vw a;

select a.fk_coverage_code_id,
case when a.fk_coverage_code_id in (7,8,12,18,19,30,31,35) then 'Physical Damage' else 'Liability' end as physical_or_liability,
case when a.fk_coverage_code_id not in (7,8,12,18,19,30,31,35) and a.fk_transaction_code_id in (2,3,4,5) then a.accident_year 
else a.accounting_year end as year,
case when a.fk_coverage_code_id in (7,18,30) then 'Collision'
when a.fk_coverage_code_id in (8,12,19,31,35) then 'Comprehensive'
when a.fk_coverage_code_id in (4) then 'No Fault'
else 'Liability' end as primary_coverage
from pa_stat_vw a;

LDF factors, can we make it a seperate table and just join in to it?




--single bi/pd LIMIT-BI
select * from pa_cause_of_loss_code where loss_code = '1' 
and fk_coverage_code_id in (3,15,28);

--single bi/pd LIMIT-PD
select * from pa_cause_of_loss_code where loss_code = '2' 
and fk_coverage_code_id in (3,15,28);


 CASE WHEN a.fk_transaction_code_id in (1,6) then 'Premium'
 WHEN a.fk_transaction_code_id in (2,3,4,5) then  'Claim'
 
 ;;
 
select * from pa_coverage_code
where code in ('6','X');


--UM-BI
select * from pa_cause_of_loss_code 
where loss_code in ('1','5','6','7','8') 
and fk_coverage_code_id in ( 6,10,17,21,33 );

--UIM-BI
select * from pa_coverage_code
where code in ('6','Y');

select * from pa_cause_of_loss_code 
where loss_code in ('3','9') 
and fk_coverage_code_id in ( 6, 11, 17, 22, 34 );

--UM-PD
select * from pa_cause_of_loss_code 
where loss_code in ('2') 
and fk_coverage_code_id in ( 6,10,17,21,33 );

--UIM-PD
select * from pa_cause_of_loss_code 
where loss_code in ('4') 
and fk_coverage_code_id in ( 6, 11, 17, 22, 34 );