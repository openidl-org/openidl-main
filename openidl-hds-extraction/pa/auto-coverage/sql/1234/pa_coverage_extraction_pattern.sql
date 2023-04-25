
DROP FUNCTION IF EXISTS openidl_ep_1234.tmp_pa_basic_limit_il;
DROP FUNCTION IF EXISTS openidl_ep_1234.tmp_pa_excess_limit_il;
DROP FUNCTION IF EXISTS openidl_ep_1234.tmp_pa_car_years;
DROP FUNCTION IF EXISTS openidl_ep_1234.tmp_pa_earned_premium;
DROP FUNCTION IF EXISTS openidl_ep_1234.tmp_pa_auto_outstanding;
DROP FUNCTION IF EXISTS openidl_ep_1234.tmp_pa_incurred_loss;
DROP FUNCTION IF EXISTS openidl_ep_1234.tmp_pa_incurred_count;
DROP TABLE IF EXISTS openidl_ep_1234.tmp_pa_coverage_ref;
DROP TABLE IF EXISTS openidl_ep_1234.tmp_pa_coverage;
    
     
CREATE TABLE openidl_ep_1234.tmp_pa_coverage as
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
          ELSE NULL
        END AS reporting_name
FROM   openidl_base_1234.pa_stat_vw a,
      openidl_base_1234.pa_coverage_code b
WHERE  a.fk_coverage_code_id = b.id
AND CONCAT('01-',a.accounting_month,'-',a.accounting_year)::date >= '2020-01-01'::DATE
AND CONCAT('01-',a.accounting_month,'-',a.accounting_year)::date <= '2021-01-01'::DATE;
    
     
CREATE TABLE openidl_ep_1234.tmp_pa_coverage_ref as
    SELECT reporting_code, reporting_name 
    FROM openidl_ep_1234.tmp_pa_coverage 
    WHERE reporting_code IS NOT NULL
    GROUP BY reporting_code, reporting_name 
    ORDER BY reporting_code::numeric;

     
CREATE OR replace FUNCTION  openidl_ep_1234.tmp_pa_car_years(IN start_date date,IN end_date date, IN pv_reporting_code VARCHAR)
returns      numeric AS $$DECLARE cy numeric;
BEGIN
    SELECT sum(a.cy)
    from (
        (SELECT 1 ggroup,            
            Datediff(accounting_date,accounting_term_expiration )/12*exposure cy
            FROM     openidl_ep_1234.tmp_pa_coverage
            WHERE  accounting_date >= start_date
            AND accounting_term_expiration < end_date
            AND fk_transaction_code_id in (1,8)
            AND reporting_code = pv_reporting_code) 
        union all
            (SELECT 2 ggroup,                                                                
            Datediff(start_date, accounting_term_expiration)/12*exposure cy
            FROM     openidl_ep_1234.tmp_pa_coverage
            WHERE  accounting_date < start_date
            AND accounting_term_expiration> start_date
            AND accounting_term_expiration< end_date
            AND fk_transaction_code_id in (1,8)
            AND reporting_code = pv_reporting_code)
        union all
            (SELECT 3 ggroup,
            Datediff(accounting_date, end_date)/12*exposure cy
            FROM     openidl_ep_1234.tmp_pa_coverage
            WHERE  accounting_date > start_date
            AND accounting_date < end_date
            AND accounting_term_expiration > end_date
            AND fk_transaction_code_id in (1,8)
            AND reporting_code = pv_reporting_code)
        union all
            (SELECT 4 ggroup,       
            Datediff(start_date,end_date)/12*exposure cy
            FROM     openidl_ep_1234.tmp_pa_coverage
            WHERE  accounting_date < start_date
            AND accounting_term_expiration > end_date
            AND fk_transaction_code_id in (1,8)
            AND reporting_code = pv_reporting_code)
            ) a into cy;
    RETURN cy;
END$$ language plpgsql;
     
CREATE OR REPLACE FUNCTION  openidl_ep_1234.tmp_pa_earned_premium(IN start_date date,IN end_date date, IN pv_reporting_code VARCHAR)
RETURNS NUMERIC AS $$DECLARE ep numeric;
BEGIN
    SELECT sum(a.ep)
    from (
        (SELECT 1 ggroup,
            Datediff(accounting_date,accounting_term_expiration) * monthly_premium_amount ep
            FROM    openidl_ep_1234.tmp_pa_coverage
            WHERE  accounting_date >= start_date
            AND accounting_term_expiration < end_date
            AND fk_transaction_code_id in (1,8)
            AND reporting_code = pv_reporting_code) 
        union all 
            (SELECT 2 ggroup,                                                      
            Datediff(accounting_date, end_date) * monthly_premium_amount  ep   
            FROM    openidl_ep_1234.tmp_pa_coverage
            WHERE  accounting_date < start_date
            AND accounting_term_expiration> start_date
            AND accounting_term_expiration< end_date
            AND fk_transaction_code_id in (1,8)
            AND reporting_code = pv_reporting_code
            )
        union all 
            (SELECT 3 ggroup,
            Datediff(accounting_date, end_date) * monthly_premium_amount ep
            FROM    openidl_ep_1234.tmp_pa_coverage
            WHERE  accounting_date > start_date
            AND accounting_date < end_date
            AND accounting_term_expiration > end_date
            AND fk_transaction_code_id in (1,8)
            AND reporting_code = pv_reporting_code)
        union all
            (SELECT 4 ggroup,       
            Datediff(start_date, end_date) *monthly_premium_amount ep
            FROM    openidl_ep_1234.tmp_pa_coverage
            WHERE  accounting_date < start_date
            AND accounting_term_expiration > end_date
            AND fk_transaction_code_id in (1,8)
            AND reporting_code = pv_reporting_code)) a into ep;
    RETURN ep;
END$$ language plpgsql;

     

CREATE OR replace FUNCTION openidl_ep_1234.tmp_pa_auto_outstanding(IN start_date date,IN end_date date, IN pv_coverage_code VARCHAR)
RETURNS      numeric AS $$DECLARE ep numeric;
BEGIN
SELECT Sum(x.loss_amount) outstanding_loss
    FROM  (SELECT t2.  reporting_code,
                t2.occurrence_identifier,
                Max(t2.loss_amount) loss_amount
        FROM   (SELECT   reporting_code,
                        occurrence_identifier,
                        Max(accounting_date) accounting_date
                FROM   openidl_ep_1234.tmp_pa_coverage
                WHERE  fk_transaction_code_id = 3
               AND   reporting_code = pv_coverage_code
               AND accounting_date >= start_date
               AND accounting_date <= end_date
                GROUP  BY   reporting_code,
                            occurrence_identifier) t,
                openidl_ep_1234.tmp_pa_coverage t2
        WHERE  t.  reporting_code = t2.  reporting_code
               AND t.occurrence_identifier = t2.occurrence_identifier
               AND t.accounting_date = t2.accounting_date
        GROUP  BY t2.  reporting_code,
                    t2.occurrence_identifier,
                    t2.accounting_date) x into ep; 
RETURN ep;
END$$ language plpgsql;
    
     

CREATE OR REPLACE FUNCTION openidl_ep_1234.tmp_pa_incurred_loss(IN start_date date,IN end_date date, IN  pv_reporting_code VARCHAR)
RETURNS NUMERIC AS $$DECLARE ep NUMERIC;
BEGIN
    
    SELECT SUM(loss_amount) loss_amount
        FROM
        ((SELECT SUM(loss_amount) loss_amount FROM openidl_ep_1234.tmp_pa_coverage
        WHERE fk_transaction_code_id = 2
        AND reporting_code =  pv_reporting_code
        AND accident_date > start_date
        AND accident_date < end_date
        UNION
        (SELECT openidl_ep_1234.tmp_pa_auto_outstanding(start_date, end_date,pv_reporting_code) loss_amount))) a into ep; 
    RETURN ep;
END$$ language plpgsql;
    
     
CREATE OR REPLACE FUNCTION openidl_ep_1234.tmp_pa_incurred_count(IN start_date date,IN end_date date, IN pv_reporting_code VARCHAR)
RETURNS NUMERIC AS $$DECLARE ep numeric;
BEGIN
    SELECT count(distinct(occurrence_identifier)) incurred_count 
    FROM openidl_ep_1234.tmp_pa_coverage
    WHERE fk_transaction_code_id in (2,3,4,5)
    AND reporting_code = pv_reporting_code
    AND accident_date > start_date
    AND accident_date < end_date into ep;
    RETURN ep;
END$$ language plpgsql;
    
     
CREATE OR replace FUNCTION openidl_ep_1234.tmp_pa_basic_limit_il(IN start_date date,IN end_date date, IN pv_reporting_code varchar)
returns numeric AS $$declare il numeric;BEGIN
SELECT
CASE
       WHEN b.paid_loss + c.outstanding_loss >= 2500 THEN 2500
       ELSE b.paid_loss + c.outstanding_loss
END AS basic_limit_il2
FROM   (
       SELECT Sum(a.loss_amount) paid_loss
       FROM   openidl_ep_1234.tmp_pa_coverage a
       WHERE  a.reporting_code = pv_reporting_code
       AND    a.fk_transaction_code_id = 2
       AND    a.accounting_date >= start_date
       AND    a.accounting_date <= end_date) b,
       ( SELECT openidl_ep_1234.tmp_pa_auto_outstanding(start_date, end_date,pv_reporting_code) outstanding_loss) c
       INTO   il;

RETURN il;
end$$ language plpgsql;

 
CREATE OR replace FUNCTION openidl_ep_9997.tmp_pa_excess_limit_il(IN start_date date,IN end_date date, IN pv_reporting_code varchar)
RETURNS NUMERIC AS $$declare ex numeric;BEGIN
SELECT
        CASE
            WHEN b.paid_loss + c.outstanding_loss <= 2500 THEN 0
            ELSE (b.paid_loss + c.outstanding_loss) - 2500
        END AS basic_limit_il2
FROM   (
            SELECT Sum(a.loss_amount) paid_loss
            FROM   openidl_ep_9997.tmp_pa_coverage a
            WHERE  a.reporting_code = pv_reporting_code
            AND    a.fk_transaction_code_id = 2
            AND    a.accounting_date >= start_date
            AND    a.accounting_date <= end_date) b,
        (
            SELECT openidl_ep_9997.tmp_pa_auto_outstanding(start_date, end_date,pv_reporting_code) outstanding_loss) c
INTO   ex;

RETURN ex;
end$$ language plpgsql;

 
SELECT a.reporting_code,
    a.reporting_name,
    ROUND(openidl_ep_1234.tmp_pa_earned_premium('2020-01-01' :: DATE,'2021-01-01' :: DATE, a.reporting_code)) earned_premium,
    ROUND(openidl_ep_1234.tmp_pa_car_years('2020-01-01' :: DATE, '2021-01-01' :: DATE, a.reporting_code)) car_years,
    ROUND(openidl_ep_1234.tmp_pa_incurred_loss('2020-01-01'::DATE, '2021-01-01'::DATE,a.reporting_code)) incurred_loss,
    ROUND(openidl_ep_1234.tmp_pa_incurred_count('2020-01-01'::DATE, '2021-01-01'::DATE,a.reporting_code)) incurred_count,
    ROUND(openidl_ep_1234.tmp_pa_basic_limit_il('2020-01-01'::DATE, '2021-01-01'::DATE,a.reporting_code)) basic_limit_il,
    ROUND(openidl_ep_1234.tmp_pa_excess_limit_il('2020-01-01'::DATE, '2021-01-01'::DATE,a.reporting_code)) excess_limit_il
FROM   openidl_ep_1234.tmp_pa_coverage_ref a; 

    