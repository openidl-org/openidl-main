SELECT 
    CASE WHEN a.fk_transaction_code_id in (1,6) then 'Premium'
        WHEN a.fk_transaction_code_id in (2,3,4,5) then  'Claim'
        ELSE null end as record_type,
        CONCAT('01-',a.accounting_month,'-',a.accounting_year)::date accounting_date,
        a.fk_transaction_code_id,
        a.fk_state_code_id,
        a.policy_identifier,
        a.occurrence_identifier,
        a.months_covered,
        a.fk_deductible_code_id,
        a.fk_coverage_code_id,
        a.exposure,
        a.loss_amount,
        CASE WHEN a.fk_transaction_code_id in (1,6) then round((a.premium_amount / a.months_covered)) end as monthly_premium_amount,
        (CONCAT('01-',a.accounting_month,'-',a.accounting_year)::date + interval '1 month' * a.months_covered)::date accounting_term_expiration,
       CASE WHEN a.fk_transaction_code_id in (2,3,4,5) THEN CONCAT('01-',a.accident_month,'-',a.accident_year)::date else null end as accident_date,

    case when a.fk_coverage_code_id in (7,8,12,18,19,30,31,35) then 'Physical Damage' else 'Liability' end as physical_or_liability,
case when a.fk_coverage_code_id not in (7,8,12,18,19,30,31,35) and a.fk_transaction_code_id in (2,3,4,5) then a.accident_year 
else a.accounting_year end as year,
case when a.fk_coverage_code_id in (7,18,30) then 'Collision'
when a.fk_coverage_code_id in (8,12,19,31,35) then 'Comprehensive'
when a.fk_coverage_code_id in (4) then 'No Fault'
else 'Liability' end as primary_coverage,
        CASE
          WHEN a.fk_coverage_code_id IN ( 1, 13, 26 ) THEN '1'
          WHEN a.fk_coverage_code_id IN ( 2, 14, 27 ) THEN '2'
          WHEN a.fk_coverage_code_id IN ( 3, 15, 28 ) THEN '3'
          WHEN a.fk_coverage_code_id = 4 THEN '4'
          WHEN a.fk_coverage_code_id IN ( 5, 16, 29 ) THEN '5'
          WHEN a.fk_coverage_code_id IN ( 6, 17, 10, 21, 33, 11, 22, 34 ) THEN '6'
          WHEN a.fk_coverage_code_id IN ( 7, 18, 30 ) AND a.fk_deductible_code_id = 1 THEN '7'
          WHEN a.fk_coverage_code_id IN ( 8,19,31) AND a.fk_deductible_code_id = 1 THEN '8'
          WHEN a.fk_coverage_code_id IN ( 12,35) AND a.fk_deductible_code_id = 1 THEN '8'
          WHEN a.fk_coverage_code_id IN ( 7,18,30) AND a.fk_deductible_code_id = 3 THEN '9'
          WHEN a.fk_coverage_code_id IN ( 8,19,31) AND a.fk_deductible_code_id = 3 THEN '10'
          WHEN a.fk_coverage_code_id IN ( 12,35) AND a.fk_deductible_code_id = 3 THEN '10'       
          WHEN a.fk_coverage_code_id IN (7,18,30) AND a.fk_deductible_code_id = 5 THEN '11'   
          WHEN a.fk_coverage_code_id IN ( 8,19,31) AND a.fk_deductible_code_id = 5 THEN '12'
          WHEN a.fk_coverage_code_id IN ( 12,35) AND a.fk_deductible_code_id = 5 THEN '12'     
          WHEN a.fk_coverage_code_id IN ( 7,18,30) AND a.fk_deductible_code_id = 6 THEN '13'       
          WHEN a.fk_coverage_code_id IN ( 8,19,31) AND a.fk_deductible_code_id = 6 THEN '14'
          WHEN a.fk_coverage_code_id IN ( 12,35) AND a.fk_deductible_code_id = 6 THEN '14'      
          WHEN a.fk_coverage_code_id IN (7,18,30) AND a.fk_deductible_code_id = 7 THEN '15'       
          WHEN a.fk_coverage_code_id IN (8,19,31) AND a.fk_deductible_code_id = 7 THEN '16'
          WHEN a.fk_coverage_code_id IN ( 12,35) AND a.fk_deductible_code_id = 7 THEN '16'       
          WHEN a.fk_coverage_code_id IN ( 7,18,30) AND a.fk_deductible_code_id not in (1,3,5,6,7) THEN '17'
          WHEN a.fk_coverage_code_id IN ( 8,19,31) AND a.fk_deductible_code_id not in (1,3,5,6,7) THEN '18'
          WHEN a.fk_coverage_code_id IN ( 12,35) AND a.fk_deductible_code_id not in (1,3,5,6,7) THEN '18'
          WHEN a.fk_coverage_code_id IN (9,20,32) AND a.fk_deductible_code_id = 7 THEN '16'
          ELSE NULL
        END AS reporting_code,
        CASE
          WHEN a.fk_coverage_code_id IN ( 1, 13, 26 ) THEN 'Bodily Injury'
          WHEN a.fk_coverage_code_id IN ( 2, 14, 27 ) THEN 'Property Damage'
          WHEN a.fk_coverage_code_id IN ( 3, 15, 28 ) and a.fk_transaction_code_id in (1,6) THEN 'Single BI/PD Limit'
          WHEN a.fk_coverage_code_id IN ( 3, 15, 28 ) and a.fk_transaction_code_id in (2,3,4,5) and a.fk_cause_of_loss_code_id in (4,91) THEN 'Single BI/PD Limit-BI'
          WHEN a.fk_coverage_code_id IN ( 3, 15, 28 ) and a.fk_transaction_code_id in (2,3,4,5) and a.fk_cause_of_loss_code_id in (5,92) THEN 'Single BI/PD Limit-PD'
          WHEN a.fk_coverage_code_id = 4 THEN 'PIP'
          WHEN a.fk_coverage_code_id IN ( 5, 16, 29 ) THEN 'Medical Payments'
          WHEN a.fk_coverage_code_id IN ( 6, 10, 11, 17,21,22,33,34) and a.fk_transaction_code_id in (1,6) THEN 'Uninsured/Underinsured'     
          WHEN a.fk_coverage_code_id IN ( 6,10,17,21,33 ) and a.fk_transaction_code_id in (2,3,4,5) and a.fk_cause_of_loss_code_id in (15,19,20,21,22,26,30,31,32,33,63) then 'UM-BI'
        
          WHEN a.fk_coverage_code_id IN ( 6, 11, 17, 22, 34 ) and a.fk_transaction_code_id in (2,3,4,5) and a.fk_cause_of_loss_code_id in (17,23,48,54,69) then 'UIM-BI'
          WHEN a.fk_coverage_code_id IN ( 6,10,17,21,33 ) and a.fk_transaction_code_id in (2,3,4,5) and a.fk_cause_of_loss_code_id in (16,27,64) then 'UM-PD'
          WHEN a.fk_coverage_code_id IN ( 6, 11, 17, 22, 34 ) and a.fk_transaction_code_id in (2,3,4,5) and a.fk_cause_of_loss_code_id in (18,48,70) then 'UIM-PD'
          
          
          WHEN a.fk_coverage_code_id IN ( 7, 18, 30 ) AND a.fk_deductible_code_id = 1 THEN 'Deductible - FULL'
          WHEN a.fk_coverage_code_id IN ( 8,19,31) AND a.fk_deductible_code_id = 1 THEN 'Deductible - FULL'       
          WHEN a.fk_coverage_code_id IN ( 12,35) AND a.fk_deductible_code_id = 1 THEN 'Deductible - FULL'
          
          
          WHEN a.fk_coverage_code_id IN ( 7,18,30) AND a.fk_deductible_code_id = 3 THEN 'Deductible - $100'
          WHEN a.fk_coverage_code_id IN ( 8,19,31) AND a.fk_deductible_code_id = 3 THEN 'Deductible - $100'
          WHEN a.fk_coverage_code_id IN ( 12,35) AND a.fk_deductible_code_id = 3 THEN 'Deductible - $100'
          
          WHEN a.fk_coverage_code_id IN (7,18,30) AND a.fk_deductible_code_id = 5 THEN 'Deductible - $250'
          WHEN a.fk_coverage_code_id IN ( 8,19,31) AND a.fk_deductible_code_id = 5 THEN 'Deductible - $250'
          WHEN a.fk_coverage_code_id IN ( 12,35) AND a.fk_deductible_code_id = 5 THEN 'Deductible - $250'
          
          WHEN a.fk_coverage_code_id IN ( 7,18,30) AND a.fk_deductible_code_id = 6 THEN 'Deductible - $500'         
          WHEN a.fk_coverage_code_id IN ( 8,19,31) AND a.fk_deductible_code_id = 6 THEN 'Deductible - $500'
          WHEN a.fk_coverage_code_id IN ( 12,35) AND a.fk_deductible_code_id = 6 THEN 'Deductible - $500'        
          
          WHEN a.fk_coverage_code_id IN (7,18,30) AND a.fk_deductible_code_id = 7 THEN 'Deductible - $1000'      
          WHEN a.fk_coverage_code_id IN (8,19,31) AND a.fk_deductible_code_id = 7 THEN 'Deductible - $1000'
          WHEN a.fk_coverage_code_id IN ( 12,35) AND a.fk_deductible_code_id = 7 THEN 'Deductible - $1000'
          
          WHEN a.fk_coverage_code_id IN ( 7,18,30) AND a.fk_deductible_code_id not in (1,3,5,6,7) THEN 'Deductible - All OTHER'        
          WHEN a.fk_coverage_code_id IN ( 8,19,31) AND a.fk_deductible_code_id not in (1,3,5,6,7) THEN 'Deductible - ALL OTHER'       
          WHEN a.fk_coverage_code_id IN ( 12,35) AND a.fk_deductible_code_id not in (1,3,5,6,7) THEN 'Deductible - ALL OTHER'
          WHEN a.fk_coverage_code_id IN (9,20,32) THEN 'All Other'
          ELSE NULL
        END AS reporting_name
FROM   openidl_base_1234.pa_stat_vw a,
      openidl_base_1234.pa_coverage_code b
WHERE  a.fk_coverage_code_id = b.id
AND CONCAT('01-',a.accounting_month,'-',a.accounting_year)::date >= '2020-01-01'::DATE
AND CONCAT('01-',a.accounting_month,'-',a.accounting_year)::date <= '2021-01-01'::DATE;