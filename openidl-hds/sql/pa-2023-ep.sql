drop table tmp_pa_coverage;
create table tmp_pa_coverage as
SELECT 
	case when a.fk_transaction_code_id in (1,8) then 'Premium'
		when a.fk_transaction_code_id in (2,3,4,5,6) then  'Claim'
		else null end as record_type,
       concat('01-',a.accounting_month,'-',a.accounting_year)::date accounting_date,
       a.fk_transaction_code_id,
       a.fk_state_code_id,
       a.policy_identifier,
       a.months_covered,
       a.fk_deductible_code_id,
       a.fk_coverage_code_id,
       a.exposure,
       case when a.fk_transaction_code_id in (1,8) then round((a.premium_amount / a.months_covered)) end as monthly_premium_amount,
       (concat('01-',a.accounting_month,'-',a.accounting_year)::date + interval '1 month' * a.months_covered)::date accounting_term_expiration,
       CASE
         WHEN a.fk_coverage_code_id IN ( 1, 13, 26 ) THEN b.code
         WHEN a.fk_coverage_code_id IN ( 2, 14, 27 ) THEN b.code
         WHEN a.fk_coverage_code_id IN ( 3, 15, 28 ) THEN b.code
         WHEN a.fk_coverage_code_id = 4 THEN '4'
         WHEN a.fk_coverage_code_id IN ( 5, 16, 29 ) THEN b.code
         WHEN a.fk_coverage_code_id IN ( 6, 17, 10, 21,
                                         33, 11, 22, 34 ) THEN b.code
         WHEN a.fk_coverage_code_id IN ( 7, 18, 30 )
              AND a.fk_deductible_code_id = 1 THEN '7'
         ELSE NULL
       END AS reporting_code,
       CASE
         WHEN a.fk_coverage_code_id IN ( 1, 13, 26 ) THEN 'Bodily Injury'
         WHEN a.fk_coverage_code_id IN ( 2, 14, 27 ) THEN 'Property Damage'
         WHEN a.fk_coverage_code_id IN ( 3, 15, 28 ) THEN 'Single BI/PD Limit'
         WHEN a.fk_coverage_code_id = 4 THEN 'PIP'
         WHEN a.fk_coverage_code_id IN ( 5, 16, 29 ) THEN 'Medical Payments'
         WHEN a.fk_coverage_code_id IN ( 6, 17, 10, 21,
                                         33, 11, 22, 34 ) THEN 'Uninsured/Underinsured'
         WHEN a.fk_coverage_code_id IN ( 7, 18, 30 )
              AND a.fk_deductible_code_id = 1 THEN 'Phy Dam - Coll - Full'
         ELSE NULL
       END AS reporting_name
FROM   pa_stat_vw a,
       pa_coverage_code b
WHERE  a.fk_coverage_code_id = b.id;


 create table tmp_pa_coverage_ref as
    select reporting_code, reporting_name 
    from tmp_pa_coverage 
    group by reporting_code, reporting_name 
    order by reporting_code::numeric ;

CREATE OR replace FUNCTION  tmp_car_years(IN start_date date,IN end_date date, IN pv_reporting_code VARCHAR)
returns      numeric AS $$DECLARE cy numeric;
BEGIN
    select sum(a.cy)
    from (
        (SELECT 1 ggroup,            
            Datediff(accounting_date,accounting_term_expiration )/12*exposure cy
            FROM     tmp_pa_coverage
            WHERE  accounting_date >= start_date
            AND accounting_term_expiration < end_date
            and fk_transaction_code_id in (1,8)
            and reporting_code = pv_reporting_code) 
        union all
            (SELECT 2 ggroup,                                                                
            Datediff(start_date, accounting_term_expiration)/12*exposure cy
            FROM     tmp_pa_coverage
            WHERE  accounting_date < start_date
            and accounting_term_expiration> start_date
            and accounting_term_expiration< end_date
            and fk_transaction_code_id in (1,8)
            and reporting_code = pv_reporting_code)
        union all
            (select 3 ggroup,
            Datediff(accounting_date, end_date)/12*exposure cy
            FROM     tmp_pa_coverage
            WHERE  accounting_date > start_date
            and accounting_date < end_date
            AND accounting_term_expiration > end_date
            and fk_transaction_code_id in (1,8)
            and reporting_code = pv_reporting_code)
        union all
            (select 4 ggroup,       
            Datediff(start_date,end_date)/12*exposure cy
            FROM     tmp_pa_coverage
            WHERE  accounting_date < start_date
            AND accounting_term_expiration > end_date
            and fk_transaction_code_id in (1,8)
            and reporting_code = pv_reporting_code)
            ) a into cy;
    RETURN cy;
END$$ language plpgsql;



    CREATE OR replace FUNCTION  tmp_au_earned_premium(IN start_date date,IN end_date date, IN pv_reporting_code VARCHAR)
    returns      numeric AS $$DECLARE ep numeric;
    BEGIN
        select sum(a.ep)
        from (
            (SELECT 1 ggroup,
                Datediff(accounting_date,accounting_term_expiration) * monthly_premium_amount ep
                FROM    tmp_pa_coverage
                WHERE  accounting_date >= start_date
                AND accounting_term_expiration < end_date
                and fk_transaction_code_id in (1,8)
                and reporting_code = pv_reporting_code) 
            union all 
                (SELECT 2 ggroup,                                                      
                Datediff(accounting_date, end_date) * monthly_premium_amount  ep   
                FROM    tmp_pa_coverage
                WHERE  accounting_date < start_date
                and accounting_term_expiration> start_date
                and accounting_term_expiration< end_date
                and fk_transaction_code_id in (1,8)
                and reporting_code = pv_reporting_code
                )
            union all 
                (select 3 ggroup,
                Datediff(accounting_date, end_date) * monthly_premium_amount ep
                FROM    tmp_pa_coverage
                WHERE  accounting_date > start_date
                and accounting_date < end_date
                AND accounting_term_expiration > end_date
                and fk_transaction_code_id in (1,8)
                and reporting_code = pv_reporting_code)
            union all
                (select 4 ggroup,       
                Datediff(start_date, end_date) *monthly_premium_amount ep
                FROM    tmp_pa_coverage
                WHERE  accounting_date < start_date
                AND accounting_term_expiration > end_date
                and fk_transaction_code_id in (1,8)
                and reporting_code = pv_reporting_code)) a into ep;
        RETURN ep;
END$$ language plpgsql;


SELECT a.reporting_code,
       a.reporting_name,
		Round(tmp_au_earned_premium('2020-01-01' :: DATE,'2021-01-01' :: DATE, a.reporting_code)) earned_premium,
		Round(tmp_car_years('2020-01-01' :: DATE, '2021-01-01' :: DATE, a.reporting_code)) car_years
FROM   tmp_pa_coverage_ref a; 