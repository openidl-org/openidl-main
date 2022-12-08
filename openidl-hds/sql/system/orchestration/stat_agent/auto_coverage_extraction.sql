create table openidl_ep_@comp.tmp_pre_au_coverage as
    (select a.accounting_date, a.transaction_code, a.accounting_term_expiration, a.exposure, a.monthly_premium_amount
    , null as occurrence_identifier, null as accident_date, null as loss_amount, a.deductible_amount, a.deductible_code, a.coverage_code
    from openidl_base_@comp.au_premium a)
    union all
    (select b.accounting_date::date, b.transaction_code, null as accounting_term_expiration, null as exposure, null as monthly_premium_amount,
    b.occurrence_identifier, b.accident_date, b.loss_amount, b.deductible_amount, b.deductible_code, b.coverage_code
    from openidl_base_@comp.au_loss b);|create table openidl_ep_@comp.tmp_au_coverage_ref as
    select reporting_code, reporting_name 
    from openidl_ep_@comp.tmp_au_coverage 
    group by reporting_code, reporting_name 
    order by reporting_code::numeric ;|create table openidl_ep_@comp.tmp_au_coverage as
    select 
           case when a.coverage_code = '1' then '1'
                  when a.coverage_code = '2' then '2'
                  when a.coverage_code = '3' then '3'
                  when a.coverage_code = '4' then '4'
                  when a.coverage_code = '5' then '5'
                  when a.coverage_code = '6' then '6'
                  when a.coverage_code = 'X' then '6'
                  when a.coverage_code = 'Y' then '6'
                  when a.coverage_code = '7' and a.deductible_amount in ('0') then '7'
                  when a.coverage_code = '8' and a.deductible_amount in ('0') then '8'
                  when a.coverage_code = 'T' and a.deductible_amount in ('0') then '8'
                  when a.coverage_code = '7' and a.deductible_amount in ('2') then '9'
                  when a.coverage_code = '8' and a.deductible_amount in ('2') then '10'
                  when a.coverage_code = 'T' and a.deductible_amount in ('2') then '10'
                  when a.coverage_code = '7' and a.deductible_amount in ('4') then '11'
                  when a.coverage_code = '8' and a.deductible_amount in ('4') then '12'
                  when a.coverage_code = 'T' and a.deductible_amount in ('4') then '12'
                  when a.coverage_code = '7' and a.deductible_amount in ('5') then '13'
                  when a.coverage_code = '8' and a.deductible_amount in ('5') then '14'
                  when a.coverage_code = 'T' and a.deductible_amount in ('5') then '14'
                  when a.coverage_code = '7' and a.deductible_amount in ('6') then '15'
                  when a.coverage_code = '8' and a.deductible_amount in ('6') then '16'
                  when a.coverage_code = 'T' and a.deductible_amount in ('6') then '16'
                  when a.coverage_code = '7' and a.deductible_amount not in ('0', '2', '4', '5', '6') then '17'
                  when a.coverage_code = '8' and a.deductible_amount not in ('0', '2', '4', '5', '6') then '18'
                  when a.coverage_code = 'T' and a.deductible_amount not in ('0', '2', '4', '5', '6') then '18'              
                  when a.coverage_code = '9' then '1'
                  else null end as reporting_code,
                  case when a.coverage_code = '1' then 'Bodily Injury'
                  when a.coverage_code = '2' then 'Property Damage'
                  when a.coverage_code = '3' then 'Single BI/PD Limit'
                  when a.coverage_code = '4' then 'PIP'
                  when a.coverage_code = '5' then 'Medical Payments'
                  when a.coverage_code = '6' then 'Uninsured/underinsured'
                  when a.coverage_code = 'X' then 'Uninsured/underinsured'
                  when a.coverage_code = 'Y' then 'Uninsured/underinsured'
                  when a.coverage_code = '7' and a.deductible_amount in ('0') then 'Phy Dam - Coll - FULL'
                  when a.coverage_code = '8' and a.deductible_amount in ('0') then 'Phy Dam - Comp - FULL'
                  when a.coverage_code = 'T' and a.deductible_amount in ('0') then 'Phy Dam - Comp - FULL'
                  when a.coverage_code = '7' and a.deductible_amount in ('2') then 'Phy Dam - Coll - $100'
                  when a.coverage_code = '8' and a.deductible_amount in ('2') then 'Phy Dam - Comp - $100'
                  when a.coverage_code = 'T' and a.deductible_amount in ('2') then 'Phy Dam - Comp - $100'
                  when a.coverage_code = '7' and a.deductible_amount in ('4') then 'Phy Dam - Coll - $250'
                  when a.coverage_code = '8' and a.deductible_amount in ('4') then 'Phy Dam - Comp - $250'
                  when a.coverage_code = 'T' and a.deductible_amount in ('4') then 'Phy Dam - Comp - $250'
                  when a.coverage_code = '7' and a.deductible_amount in ('5') then 'Phy Dam - Coll - $500'
                  when a.coverage_code = '8' and a.deductible_amount in ('5') then 'Phy Dam - Comp - $500'
                  when a.coverage_code = 'T' and a.deductible_amount in ('5') then 'Phy Dam - Comp - $500'
                  when a.coverage_code = '7' and a.deductible_amount in ('6') then 'Phy Dam - Coll - $1000'
                  when a.coverage_code = '8' and a.deductible_amount in ('6') then 'Phy Dam - Comp - $1000'
                  when a.coverage_code = 'T' and a.deductible_amount in ('6') then 'Phy Dam - Comp - $1000'
                  when a.coverage_code = '7' and a.deductible_amount not in ('0', '2', '4', '5', '6') then 'Phy Dam - Coll - ALL OTHER'
                  when a.coverage_code = '8' and a.deductible_amount not in ('0', '2', '4', '5', '6') then 'Phy Dam - Comp - ALL OTHER'
                  when a.coverage_code = 'T' and a.deductible_amount not in ('0', '2', '4', '5', '6') then 'Phy Dam - Comp - ALL OTHER'              
                  when a.coverage_code = '9' then 'Bodily Injury'
                  else null end as reporting_name,
                  a.*
    from openidl_ep_@comp.tmp_pre_au_coverage a;|CREATE OR replace FUNCTION openidl_ep_@comp.tmp_car_years(IN start_date date,IN end_date date, IN pv_reporting_code VARCHAR)
returns      numeric AS $$DECLARE cy numeric;
BEGIN
    select sum(a.cy)
    from (
        (SELECT 1 ggroup,            
            Datediff(accounting_term_expiration, accounting_date)/12*exposure cy
            FROM   openidl_ep_@comp.tmp_au_coverage
            WHERE  accounting_date >= start_date
            AND accounting_term_expiration < end_date
            and transaction_code = '1'
            and reporting_code = pv_reporting_code) 
        union all
            (SELECT 2 ggroup,                                                                
            Datediff(accounting_term_expiration, start_date)/12*exposure cy
            FROM   openidl_ep_@comp.tmp_au_coverage
            WHERE  accounting_date < start_date
            and accounting_term_expiration> start_date
            and accounting_term_expiration< end_date
            and transaction_code = '1'
            and reporting_code = pv_reporting_code)
        union all
            (select 3 ggroup,
            Datediff(accounting_date, end_date)/12*exposure cy
            FROM   openidl_ep_@comp.tmp_au_coverage
            WHERE  accounting_date > start_date
            and accounting_date < end_date
            AND accounting_term_expiration > end_date
            and transaction_code = '1'
            and reporting_code = pv_reporting_code)
        union all
            (select 4 ggroup,       
            Datediff(end_date, start_date)/12*exposure cy
            FROM   openidl_ep_@comp.tmp_au_coverage
            WHERE  accounting_date < start_date
            AND accounting_term_expiration > end_date
            and transaction_code = '1'
            and reporting_code = pv_reporting_code)
            ) a into cy;
    RETURN cy;
END$$ language plpgsql;|CREATE OR replace FUNCTION openidl_ep_@comp.tmp_au_earned_premium(IN start_date date,IN end_date date, IN pv_reporting_code VARCHAR)
    returns      numeric AS $$DECLARE ep numeric;
    BEGIN
        select sum(a.ep)
        from (
            (SELECT 1 ggroup,
                Datediff(accounting_term_expiration, accounting_date) * monthly_premium_amount ep
                FROM   openidl_ep_@comp.tmp_au_coverage
                WHERE  accounting_date >= start_date
                AND accounting_term_expiration < end_date
                and transaction_code = '1'
                and reporting_code = pv_reporting_code) 
            union all 
                (SELECT 2 ggroup,                                                      
                Datediff(accounting_term_expiration, start_date) * monthly_premium_amount  ep   
                FROM   openidl_ep_@comp.tmp_au_coverage
                WHERE  accounting_date < start_date
                and accounting_term_expiration> start_date
                and accounting_term_expiration< end_date
                and transaction_code = '1'
                and reporting_code = pv_reporting_code
                )
            union all 
                (select 3 ggroup,
                Datediff(accounting_date, end_date) * monthly_premium_amount ep
                FROM   openidl_ep_@comp.tmp_au_coverage
                WHERE  accounting_date > start_date
                and accounting_date < end_date
                AND accounting_term_expiration > end_date
                and transaction_code = '1'
                and reporting_code = pv_reporting_code)
            union all
                (select 4 ggroup,       
                Datediff(end_date, start_date) *monthly_premium_amount ep
                FROM   openidl_ep_@comp.tmp_au_coverage
                WHERE  accounting_date < start_date
                AND accounting_term_expiration > end_date
                and transaction_code = '1'
                and reporting_code = pv_reporting_code)) a into ep;
        RETURN ep;
    END$$ language plpgsql;|CREATE OR replace FUNCTION openidl_ep_@comp.auto_outstanding(IN start_date date,IN end_date date, IN pv_coverage_code VARCHAR)
    returns      numeric AS $$DECLARE ep numeric;
    BEGIN
        
        SELECT Sum(x.loss_amount) outstanding_loss
            FROM  (SELECT t2.coverage_code,
                        t2.occurrence_identifier,
                        Max(t2.loss_amount) loss_amount
                FROM   (SELECT coverage_code,
                                occurrence_identifier,
                                Max(accounting_date) accounting_date
                        FROM   openidl_ep_@comp.tmp_au_coverage
                        WHERE  transaction_code = '3'
                        and coverage_code = pv_coverage_code
                        and accident_date > start_date
                        and accident_date < end_date
                        GROUP  BY coverage_code,
                                    occurrence_identifier) t,
                        openidl_ep_@comp.tmp_au_coverage t2
                WHERE  t.coverage_code = t2.coverage_code
                        AND t.occurrence_identifier = t2.occurrence_identifier
                        AND t.accounting_date = t2.accounting_date
                GROUP  BY t2.coverage_code,
                            t2.occurrence_identifier,
                            t2.accounting_date) x into ep; 
        RETURN ep;
    END$$ language plpgsql;|CREATE OR replace FUNCTION openidl_ep_@comp.tmp_au_incurred_loss(IN start_date date,IN end_date date, IN  pv_reporting_code VARCHAR)
    returns      numeric AS $$DECLARE ep numeric;
    BEGIN
        
        select sum(loss_amount) loss_amount
            from 
            ((select sum(loss_amount) loss_amount from openidl_ep_@comp.tmp_au_coverage
            where transaction_code = '2'
            and reporting_code =  pv_reporting_code
            and accident_date > start_date
            and accident_date < end_date
            union
            (select auto_outstanding(start_date, end_date,'1') loss_amount))) a into ep; 
        RETURN ep;
    END$$ language plpgsql;|CREATE OR replace FUNCTION openidl_ep_@comp.tmp_au_incurred_count(IN start_date date,IN end_date date, IN pv_reporting_code VARCHAR)
    returns      numeric AS $$DECLARE ep numeric;
    BEGIN
        select count(distinct(occurrence_identifier)) incurred_count 
        from openidl_ep_@comp.tmp_au_coverage
        where transaction_code in ('2','3','6','7')
        and reporting_code = pv_reporting_code
        and accident_date > start_date
        and accident_date < end_date into ep;
        RETURN ep;
    END$$ language plpgsql;|select *, round(openidl_ep_@comp.tmp_au_earned_premium('2000-01-01'::DATE, '2002-01-01'::DATE,a.reg_reporting_code)) earned_premium 
    ,round(openidl_ep_@comp.tmp_car_years('2000-01-01'::DATE, '2002-01-01'::DATE,a.reg_reporting_code)) car_years
    ,round(openidl_ep_@comp.tmp_au_incurred_count('2000-01-01'::DATE, '2002-01-01'::DATE,a.reg_reporting_code)) incurred_count
    ,round(openidl_ep_@comp.tmp_au_incurred_loss('2000-01-01'::DATE, '2002-01-01'::DATE,a.reg_reporting_code)) incurred_loss
    from openidl_ep_@comp.au_reg_reporting_ref a; |
    -- Temp Tables
    DROP TABLE openidl_ep_@comp.tmp_pre_au_coverage;
    DROP TABLE openidl_ep_@comp.tmp_au_coverage;

    --Functions (note should be torn down after each extraction);
    DROP FUNCTION openidl_ep_@comp.tmp_car_years;
    DROP FUNCTION openidl_ep_@comp.tmp_earned_premium;
    DROP FUNCTION openidl_ep_@comp.tmp_incurred_loss;
    DROP FUNCTION openidl_ep_@comp.tmp_incurred_count;
    DROP FUNCTION openidl_ep_@comp.tmp_auto_outstanding;
    