function getReportingTable(){
    sql =  `
    create table openidl_ep_${companyId}.tmp_pa_coverage as
    SELECT 
        case when a.fk_transaction_code_id in (1,6) then 'Premium'
            when a.fk_transaction_code_id in (2,3,4,5) then  'Claim'
            else null end as record_type,
           concat('01-',a.accounting_month,'-',a.accounting_year)::date accounting_date,
           a.fk_transaction_code_id,
           a.fk_state_code_id,
           a.policy_identifier,
           a.occurrence_identifier,
           a.months_covered,
           a.fk_deductible_code_id,
           a.fk_coverage_code_id,
           a.exposure,
           a.loss_amount,
           case when a.fk_transaction_code_id in (1,6) then round((a.premium_amount / a.months_covered)) end as monthly_premium_amount,
           (concat('01-',a.accounting_month,'-',a.accounting_year)::date + interval '1 month' * a.months_covered)::date accounting_term_expiration,
           CASE when a.fk_transaction_code_id in (2,3,4,5) THEN concat('01-',a.accident_month,'-',a.accident_year)::date else null end as accident_date,
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
             WHEN a.fk_coverage_code_id IN (9,20,32) AND a.fk_deductible_code_id = 7 THEN 'Bodily Injury'
             else NULL
           END AS reporting_name
    FROM   openidl_base_${companyId}.pa_stat_vw a,
          openidl_base_${companyId}.pa_coverage_code b
    WHERE  a.fk_coverage_code_id = b.id;
    
    `
    return sql
}

module.exports = getReportingTable