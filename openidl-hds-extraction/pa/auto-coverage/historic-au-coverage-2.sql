-- Parameters
-- Data Call Year = year in which the report is being generated and submitted
-- Need to change LDF factors in lines 117 thru 126 based on year. Need to put this in a table and change the sql later.

----------------------------------------------------------------------------------------------------
-- AUTO CALENDAR/ACCIDENT YEAR NAIC STATE EXPERIENCE REPORT
-- AU-56
------------------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS ${env | type:raw}_actuarial.rr_naic_state_auto_${data_call_year | type:raw} PURGE;  

CREATE TABLE ${env | type:raw}_actuarial.rr_naic_state_auto_${data_call_year | type:raw}
as

-- set the "current" year here; the other years will be determined from it
with max_year as 
(
	select 	${data_call_year | type:raw} - 2 as year
)

-- if required, update the factors for the years here
, year_factors as
(
-- PERSONAL AUTO
-- see   \\AAIS-FS02.AAISonline.com\Actuarial-ASG\Lines\!Multi-Lines or Multi-State\2023 NAIC Personal Auto Data Call\Personal LDF triangles and selection_data through 2021.xlsb
	select my.year - 2 as year, '1' as subline_code, 'Liability' as Liab_or_PhysDam, cast(1.009 as decimal(5,3)) LDF, cast(1.000 as decimal(5,3)) ulae_factor from max_year my
  union all
	select my.year - 1 as year, '1' as subline_code, 'Liability' as Liab_or_PhysDam, cast(1.031 as decimal(5,3)) LDF, cast(1.000 as decimal(5,3)) ulae_factor from max_year my
	union all
	select my.year,             '1' as subline_code, 'Liability' as Liab_or_PhysDam, cast(1.122 as decimal(5,3)) LDF, cast(1.000 as decimal(5,3)) ulae_factor from max_year my
	
	union all
	
	select my.year - 2 as year, '1' as subline_code, 'Physical Damage' as Liab_or_PhysDam, cast(0.999 as decimal(5,3)) LDF, cast(1.000 as decimal(5,3)) ulae_factor from max_year my
  union all
	select my.year - 1 as year, '1' as subline_code, 'Physical Damage' as Liab_or_PhysDam, cast(0.997 as decimal(5,3)) LDF, cast(1.000 as decimal(5,3)) ulae_factor from max_year my
	union all
	select my.year,             '1' as subline_code, 'Physical Damage' as Liab_or_PhysDam, cast(0.989 as decimal(5,3)) LDF, cast(1.000 as decimal(5,3)) ulae_factor from max_year my
	
	union all

-- COMMERCIAL AUTO
-- see   \\AAIS-FS02.AAISonline.com\Actuarial-ASG\Lines\!Multi-Lines or Multi-State\2023 NAIC Commercial Auto Data Call\Commercial LDF triangles and selection_data through 2021.xlsb
	select my.year - 2 as year, '2' as subline_code, 'Liability' as Liab_or_PhysDam, cast(1.047 as decimal(5,3)) LDF, cast(1.000 as decimal(5,3)) ulae_factor from max_year my
  union all
	select my.year - 1 as year, '2' as subline_code, 'Liability' as Liab_or_PhysDam, cast(1.094 as decimal(5,3)) LDF, cast(1.000 as decimal(5,3)) ulae_factor from max_year my
	union all
	select my.year,             '2' as subline_code, 'Liability' as Liab_or_PhysDam, cast(1.228 as decimal(5,3)) LDF, cast(1.000 as decimal(5,3)) ulae_factor from max_year my
	
	union all
	
	select my.year - 2 as year, '2' as subline_code, 'Physical Damage' as Liab_or_PhysDam, cast(1.000 as decimal(5,3)) LDF, cast(1.000 as decimal(5,3)) ulae_factor from max_year my
  union all
	select my.year - 1 as year, '2' as subline_code, 'Physical Damage' as Liab_or_PhysDam, cast(1.000 as decimal(5,3)) LDF, cast(1.000 as decimal(5,3)) ulae_factor from max_year my
	union all
	select my.year,             '2' as subline_code, 'Physical Damage' as Liab_or_PhysDam, cast(1.000 as decimal(5,3)) LDF, cast(1.000 as decimal(5,3)) ulae_factor from max_year my
)



, core as

(

-- ------------------------------------------------------------------------------------------------------------------------------------------------------
-- --   AGGREGATE TO CLAIM LEVEL BEFORE CALCULATING BASIC AND EXCESS
-- ------------------------------------------------------------------------------------------------------------------------------------------------------

select d.subline_code, d.Liab_or_PhysDam, d.state_code, d.state_name, d.zip_code, d.coverage_code, d.deductible_amount, d.ad_year, d.cal_acc_year, d.transaction_type,
      d.report_year, d.company_group, d.company_code, d.nonreporters, d.cause_of_loss_code, d.commercial_class_name,
      sum(earned_premium)  as earned_premium, 
      sum(earned_exposures)/24 as earned_exposures,
      sum(paid_losses)+sum(paid_alae) as paid_losses_incl_alae,
      sum(paid_losses)+sum(paid_alae)+sum(outstanding_losses)+sum(outstanding_alae) as incurred_loss_incl_alae,
      sum(incurred_dev_losses_excl_alae)+sum(incurred_dev_alae) as dev_incurred_loss_incl_alae,
      sum(paid_claim_counts) as paid_claim_counts,
      sum(incurred_claim_counts) as incurred_claim_counts,
      sum(incurred_claim_counts) as incurred_claim_counts_calc,
      sum(incurred_dev_basic_loss) as incurred_dev_basic_loss,
      sum(incurred_dev_excess_loss) as incurred_dev_excess_loss
      
      
from ( 
    select c.subline_code, c.Liab_or_PhysDam, c.state_code, c.state_name, c.zip_code, c.coverage_code, c.deductible_amount, c.ad_year, c.cal_acc_year, c.transaction_type,
            c.claim_number, c.report_year, c.company_group, c.company_code, c.nonreporters, c.cause_of_loss_code, c.commercial_class_name, 
        
            earned_premium,
            earned_exposures,
            paid_losses,
            paid_alae,
            outstanding_losses,
            outstanding_alae,
            incurred_losses_excl_alae,
            paid_claim_counts,
            outstanding_claim_counts,
            incurred_claim_counts,
            incurred_claim_counts_calc,
          
            ----- APPLY BASIC LIMITS
            incurred_dev_losses_excl_alae,
            incurred_dev_alae,
            incurred_dev_basic_loss_excl_ulae,
            incurred_dev_excess_loss_excl_ulae,
            
            ---- APPLY ULAE FACTORS
            round(incurred_dev_basic_loss_excl_ulae * yf.ulae_factor) as incurred_dev_basic_loss,
                                              
            round(incurred_dev_excess_loss_excl_ulae * yf.ulae_factor) as incurred_dev_excess_loss
    
    from(
        select
            b.subline_code, b.Liab_or_PhysDam, b.state_code, b.state_name, b.zip_code, b.coverage_code, b.deductible_amount, b.ad_year, b.cal_acc_year, b.transaction_type,
            b.claim_number, b.report_year, b.company_group, b.company_code, b.nonreporters, b.cause_of_loss_code, b.commercial_class_name, 
        
            earned_premium,
            earned_exposures,
            paid_losses,
            paid_alae,
            outstanding_losses,
            outstanding_alae,
            incurred_losses_excl_alae,
            paid_claim_counts,
            outstanding_claim_counts,
            incurred_claim_counts,
            case when b.incurred_claim_counts < 0 then 0 else b.incurred_claim_counts end as incurred_claim_counts_min_0,  -- remove negatives, replace with 0
            case when b.incurred_claim_counts > 1 then 1 else b.incurred_claim_counts end as incurred_claim_counts_max_1,  -- remove anything greater than 1, replace with 1
            case when b.incurred_claim_counts < 0 then 0 
                 when b.incurred_claim_counts > 1 then 1 else b.incurred_claim_counts end as incurred_claim_counts_calc,   -- apply both caps so value is either 0 or 1 at the claim level
            
            incurred_dev_losses_excl_alae,
            incurred_dev_alae,
            ----- APPLY BASIC LIMITS
            --  ALAE is to be included as Basic Limts and added to the pure losses capped at the appropriate limit
            incurred_dev_alae + case when b.incurred_dev_losses_excl_alae > 25000 then 25000 else b.incurred_dev_losses_excl_alae end as incurred_dev_basic_loss_excl_ulae,
            
            --  Remove the Basic Limit from the pure losses; ALAE is completely excluded in Excess Losses
            case when b.incurred_dev_losses_excl_alae < 25000 then 0 else b.incurred_dev_losses_excl_alae - 25000 end as incurred_dev_excess_loss_excl_ulae
        
        from (
        -------------------------------------------------
        ------  Aggregate to claim level and apply LDF's
        -------------------------------------------------
            select a.subline_code, a.Liab_or_PhysDam, a.state_code, a.state_name, a.zip_code, a.coverage_code, a.deductible_amount, a.ad_year, a.cal_acc_year,a.transaction_type,
                  a.claim_number, a.report_year, company_group,
                  a.company_code, a.nonreporters, a.cause_of_loss_code, a.commercial_class_name,
            
                  SUM(coalesce(earned_premium,0)) as earned_premium,
                  SUM(coalesce(earned_exposures,0)) as earned_exposures,
                  sum(coalesce(paid_losses,0)) as paid_losses,
                  sum(coalesce(paid_alae,0)) as paid_alae,
                  sum(coalesce(outstanding_losses,0)) as outstanding_losses,
                  sum(coalesce(outstanding_alae,0)) as outstanding_alae,
                  sum(coalesce(paid_losses,0) + coalesce(outstanding_losses,0)) as incurred_losses_excl_alae,
                  sum(coalesce(paid_claim_counts,0)) as paid_claim_counts,
                  sum(coalesce(outstanding_claim_counts,0)) as outstanding_claim_counts,
                  sum(coalesce(paid_claim_counts,0) + coalesce(outstanding_claim_counts,0)) as incurred_claim_counts,
                
                  ----- APPLY LDFS
                  sum((coalesce(paid_losses,0) + coalesce(outstanding_losses,0)) * yf.ldf) as incurred_dev_losses_excl_alae,
                        
                  sum((coalesce(paid_alae,0) + coalesce(outstanding_alae,0)) * yf.ldf) as incurred_dev_alae
            from
                  (
                  -------------------------------------------------------------------------------------
                  ------------ PULL ONLY THE RECORDS NEEDED FOR THE REPORT FROM FRS_SUMMARY -----------
                  -------------------------------------------------------------------------------------
                  SELECT cov.subline_code, case when cov.coverage_code in ('7','8','T') then 'Physical Damage' else 'Liability' end as Liab_or_PhysDam, geo.state_code, geo.state_name, case when cov.subline_code in ('1') then geo.zip_code else null end as zip_code, cov.coverage_code, ded.deductible_amount, ad.year AS ad_year, case when transaction_code in ('2','3','6','7') then ad.year else frs.year end as cal_acc_year, case when transaction_code in ('2','3','6','7') then 'Loss' when transaction_code in ('1') then 'Premium' else 'Other' end as transaction_type,
                    frs.claim_number, frs.year as report_year, clm.cause_of_loss_code,  
                    case when dv.commercial_class_name like '%Unknown%' then 'All Other' else coalesce(dv.commercial_class_name, 'All Other') end as commercial_class_name, 
                    Case  WHEN  comp.company_code in ('1013','1237','1238','1239','1351','2154','2598','3441','3498','3664','4928','5524','5525','5526','5527','6758','6799') THEN 'HIG'
                          WHEN comp.company_code in ('0087','1001','1006','1037','1234','1235','1325','1760','2032','2033','2056','2321','2493','2494','2649','2745','2837', '3005','3021',                             '3059','3733','4412','4456','5006','5136','5356','5459','5825','5826','5879','6767','6806','6818','6832',
                                                     '6918','6919','6975','6976','6977') THEN 'TRV'
                          WHEN frs.company_code in ('5654') then 'HDI'
                          ELSE 'Other' END as company_group,
                    Case WHEN  frs.company_code in ('5775','5962','6063') THEN 'Non-reporter'   -- Narran Bay, Southern Mutual, Southern Insurance
                          ELSE null END as nonreporters,
                    comp.company_code, tt.transaction_code as transaction_code,
                    case when tt.transaction_code in ('1') then coalesce(frs.earned_premium, 0) else 0 end as earned_premium,      
                    case when tt.transaction_code in ('1') then coalesce(frs.earned_exposures, 0) else 0 end as earned_exposures,      
                    case when tt.transaction_code in ('2') then coalesce(paid_losses,0) else 0 end as paid_losses,
                    case when tt.transaction_code in ('6') then coalesce(paid_losses,0) else 0 end as paid_alae,
                    0 as outstanding_losses,      -- only found in frs_summary_q1 in the union below
                    0 as outstanding_alae,        -- only found in frs_summary_q1 in the union below
                    case when tt.transaction_code in ('2','6') then coalesce(frs.paid_claim_counts, 0) else 0 end as paid_claim_counts,	  -- based on stat plan, should include paid claim counts from entire experience period
                    case when tt.transaction_code in ('3','7') then coalesce(frs.outstanding_claim_counts, 0) else 0 end as outstanding_claim_counts  	  -- based on stat plan, should include OS claim counts from entire experience period
                    
                from prod_integration.fact_frs_summary frs
                  left join prod_integration.dim_date ad on frs.accident_date_id = ad.date_key
                  left join prod_integration.dim_company comp on frs.company_id = comp.company_key
                  left join prod_integration.dim_deductible ded on frs.deductible_id = ded.deductible_key 
                  left join prod_integration.dim_coverage cov on frs.coverage_id = cov.coverage_key and cov.lob_code = '56'
                  left join prod_integration.dim_transaction_type tt on frs.transaction_type_id = tt.transaction_type_key 
                  left join prod_integration.dim_geography geo on frs.geography_id = geo.geography_key
                  left join prod_integration.dim_claim clm ON frs.claim_id = clm.claim_key
                  left join prod_integration.fact_auto fa on frs.auto_id = fa.auto_key
                  left join prod_integration.dim_vehicle dv on dv.vehicle_key = fa.vehicle_id
                 
             
                where frs.lob_number = '56'
                and cov.coverage_code in ('1','2','3','4','5','6','X','Y','7','8','T','9')  
                -- and cov.subline_code in ('2') --Commercial Auto 
                and tt.transaction_code in ('1','2','3','6','7')
                and ded.lob_code='56' 
                --and geo.state_code = '54'
                and frs.company_code not in ('3278','2964','5856','5895','6124','6261','6628')  -- Manual exclusions for companies reporting in AAIS stats format but NOT using AAIS as stat agent (Security First, Nationwide companies)
                and (
                -- Premium transactions and physical damage loss transactions:  Past 3 calendar years
                ((${data_call_year | type:raw} - 2) - frs.year in (0,1,2))  
                  or
                -- Loss transactions for liability:  Past 3 accident years evaluated 3 months after last report year ends
                (tt.transaction_code in ('2','3','6','7') and ((${data_call_year | type:raw} - 2) - coalesce(ad.year, 0) in (0,1,2))
                    and ((${data_call_year | type:raw} - 2) - frs.year in (0,1,2)) or (frs.year = ${data_call_year | type:raw} - 1 and frs.quarter = 'Q1'))
                    )
                    


                  -------------------------------------------------------------------------------------
                  ------------ PULL ONLY THE RECORDS NEEDED FOR THE REPORT FROM FRS_SUMMARY_Q1
                  ------------ outstanding losses as of Q1 are NOT in frs_summary, only frs_summary q1
                  -------------------------------------------------------------------------------------
                  
                  UNION ALL
                  
                  
                  SELECT cov.subline_code, case when cov.coverage_code in ('7','8','T') then 'Physical Damage' else 'Liability' end as Liab_or_PhysDam, geo.state_code, geo.state_name, case when cov.subline_code in ('1') then geo.zip_code else null end as zip_code, cov.coverage_code, ded.deductible_amount, ad.year AS ad_year, case when transaction_code in ('2','3','6','7') then ad.year else frs.year end as cal_acc_year, case when transaction_code in ('2','3','6','7') then 'Loss' when transaction_code in ('1') then 'Premium' else 'Other' end as transaction_type,
                    frs.claim_number, frs.year as report_year, clm.cause_of_loss_code, 
                    case when dv.commercial_class_name like '%Unknown%' then 'All Other' else coalesce(dv.commercial_class_name, 'All Other') end as commercial_class_name, 
                    Case  WHEN  comp.company_code in ('1013','1237','1238','1239','1351','2154','2598','3441','3498','3664','4928','5524','5525','5526','5527','6758','6799') THEN 'HIG'
                          WHEN comp.company_code in ('0087','1001','1006','1037','1234','1235','1325','1760','2032','2033','2056','2321','2493','2494','2649','2745','2837', '3005','3021',                             '3059','3733','4412','4456','5006','5136','5356','5459','5825','5826','5879','6767','6806','6818','6832',
                                                     '6918','6919','6975','6976','6977') THEN 'TRV'
                          WHEN frs.company_code in ('5654') then 'HDI'
                          ELSE 'Other' END as company_group,
                    Case WHEN  frs.company_code in ('5775','5962','6063') THEN 'Non-reporter'   -- Narran Bay, Southern Mutual, Southern Insurance
                          ELSE null END as nonreporters,
                    comp.company_code, tt.transaction_code as transaction_code,
                    0 as earned_premium,          -- already included in the union above
                    0 as earned_exposures,        -- already included in the union above
                    0 as paid_losses,             -- already included in the union above
                    0 as paid_alae,               -- already included in the union above
                    case when tt.transaction_code in ('3') then coalesce(outstanding_losses,0) else 0 end as outstanding_losses,   -- only include OS losses from the most recent eval Q1
                    case when tt.transaction_code in ('7') then coalesce(outstanding_losses,0) else 0 end as outstanding_alae,   -- only include OS alae from the most recent eval Q1
                    0 as paid_claim_counts,	          -- already included in the union above
                    0 as outstanding_claim_counts  	  -- already included in the union above
                    
                from prod_integration.fact_frs_summary_q1 frs
                  left join prod_integration.dim_date ad on frs.accident_date_id = ad.date_key
                  left join prod_integration.dim_company comp on frs.company_id = comp.company_key
                  left join prod_integration.dim_deductible ded on frs.deductible_id = ded.deductible_key 
                  left join prod_integration.dim_coverage cov on frs.coverage_id = cov.coverage_key and cov.lob_code = '56'
                  left join prod_integration.dim_transaction_type tt on frs.transaction_type_id = tt.transaction_type_key 
                  left join prod_integration.dim_geography geo on frs.geography_id = geo.geography_key
                  left join prod_integration.dim_claim clm ON frs.claim_id = clm.claim_key
                  left join prod_integration.fact_auto fa on frs.auto_id = fa.auto_key
                  left join prod_integration.dim_vehicle dv on dv.vehicle_key = fa.vehicle_id
                  
                where frs.lob_number = '56'
                and  cov.coverage_code in ('1','2','3','4','5','6','X','Y','7','8','T','9')  
                and tt.transaction_code in ('3','7')
                -- and cov.subline_code in ('2') --Commercial Auto 
                and ded.lob_code='56'
                --and geo.state_code = '54'
                and frs.company_code not in ('3278','2964','5856','5895','6124','6261','6628')  -- Manual exclusions for companies reporting in AAIS stats format but NOT using AAIS as stat agent (Security First, Nationwide companies)
                and (
                -- Premium transactions and physical damage loss transactions:  Past 3 calendar years
                ((${data_call_year | type:raw} - 2) - frs.year in (0,1,2))  
                  or
                -- Loss transactions for liability:  Past 3 accident years evaluated 15 months after last report year ends
                (tt.transaction_code in ('2','3','6','7') and ((${data_call_year | type:raw} - 2) - coalesce(ad.year, 0) in (0,1,2))
                    and ((${data_call_year | type:raw} - 2) - frs.year in (0,1,2)) or (frs.year = ${data_call_year | type:raw} - 1 and frs.quarter = 'Q1'))
                    )
        /*     and ( 
                --physical damage loss transactions:  Past 3 calendar years
                (frs.year in (2019,2020,2021))  
                  or
                -- Loss transactions for liability:  Past 3 accident years evaluated 15 months after last report year ends
                (tt.transaction_code in ('2','3','6','7') and ad.year in (2019,2020,2021) and (frs.year in (2019,2020,2021) or  (frs.year = 2022 and frs.quarter = 'Q1')))
                    ) 
        */

            ) a
            join year_factors yf on yf.year = a.cal_acc_year and yf.subline_code = a.subline_code and yf.liab_or_physdam = a.liab_or_physdam
            group by a.subline_code, a.Liab_or_PhysDam, a.state_code, a.state_name, a.zip_code, a.coverage_code, a.deductible_amount, a.ad_year, a.cal_acc_year, a.transaction_type,
                   a.claim_number, a.report_year, company_group,
                    a.company_code, a.nonreporters, a.cause_of_loss_code, a.commercial_class_name
            
        ) b
    ) c 
        join year_factors yf on yf.year = c.cal_acc_year and yf.subline_code = c.subline_code and yf.liab_or_physdam = c.liab_or_physdam
) d      

group by d.subline_code, d.Liab_or_PhysDam, d.state_code, d.state_name, d.zip_code, d.coverage_code, d.deductible_amount, d.ad_year, d.cal_acc_year, d.transaction_type,
      d.report_year, d.company_group, d.company_code, d.nonreporters, d.cause_of_loss_code, d.commercial_class_name
      
)      
--------------------------------------------------------------------------------------------------------- 
-------------------------------------------- END CORE ---------------------------------------------------
---------------------------------------------------------------------------------------------------------




select c.subline_code,
        c.state_code,  
        c.zip_code,
        case when coverage_code not in ('7','8','T') and transaction_type in ('Loss') then c.ad_year 
             else c.report_year end as year,
        c.report_year,
        c.cal_acc_year,
        c.company_group,
        c.nonreporters,
        c.commercial_class_name, 
        case when coverage_code in ('7') then 'Collision'
             when coverage_code in ('8','T') then 'Comprehensive'
             when coverage_code in ('4') then 'No Fault'
            else 'Liability'
            end as primary_coverage,
        case  when c.coverage_code = '1' then 'Bodily Injury'
              when c.coverage_code = '2' then 'Property Damage'
              when c.coverage_code = '3' AND transaction_type in ('Premium') then 'Single BI/PD Limit'
              when c.coverage_code = '3' and transaction_type in ('Loss') and cause_of_loss_code in ('1') then 'Single BI/PD Limit-BI'
              when c.coverage_code = '3' and transaction_type in ('Loss') and cause_of_loss_code in ('2') then 'Single BI/PD Limit-PD'
              when c.coverage_code = '4' then 'PIP'
              when c.coverage_code = '5' then 'Medical Payments'
              when c.coverage_code in ('6','X','Y') and transaction_type in ('Premium') then 'Uninsured/Underinsured'
              when c.coverage_code in ('6','X') and transaction_type in ('Loss') and cause_of_loss_code in ('1','5','6','7','8') then 'UM-BI'
              when c.coverage_code in ('6','Y') and transaction_type in ('Loss') and cause_of_loss_code in ('3','9') then 'UIM-BI'
              when c.coverage_code in ('6','X') and transaction_type in ('Loss') and cause_of_loss_code in ('2') then 'UM-PD'
              when c.coverage_code in ('6','Y') and transaction_type in ('Loss') and cause_of_loss_code in ('4') then 'UIM-PD'
              when c.coverage_code = '7' and c.deductible_amount in ('0') then 'Deductible - FULL'
              when c.coverage_code = '8' and c.deductible_amount in ('0') then 'Deductible - FULL'
              when c.coverage_code = 'T' and c.deductible_amount in ('0') then 'Deductible - FULL'
              when c.coverage_code = '7' and c.deductible_amount in ('2') then 'Deductible - $100'
              when c.coverage_code = '8' and c.deductible_amount in ('2') then 'Deductible - $100'
              when c.coverage_code = 'T' and c.deductible_amount in ('2') then 'Deductible - $100'
              when c.coverage_code = '7' and c.deductible_amount in ('4') then 'Deductible - $250'
              when c.coverage_code = '8' and c.deductible_amount in ('4') then 'Deductible - $250'
              when c.coverage_code = 'T' and c.deductible_amount in ('4') then 'Deductible - $250'
              when c.coverage_code = '7' and c.deductible_amount in ('5') then 'Deductible - $500'
              when c.coverage_code = '8' and c.deductible_amount in ('5') then 'Deductible - $500'
              when c.coverage_code = 'T' and c.deductible_amount in ('5') then 'Deductible - $500'
              when c.coverage_code = '7' and c.deductible_amount in ('6') then 'Deductible - $1000'
              when c.coverage_code = '8' and c.deductible_amount in ('6') then 'Deductible - $1000'
              when c.coverage_code = 'T' and c.deductible_amount in ('6') then 'Deductible - $1000'
              when c.coverage_code = '7' and c.deductible_amount not in ('0', '2', '4', '5', '6') then 'Deductible - ALL OTHER'
              when c.coverage_code = '8' and c.deductible_amount not in ('0', '2', '4', '5', '6') then 'Deductible - ALL OTHER'
              when c.coverage_code = 'T' and c.deductible_amount not in ('0', '2', '4', '5', '6') then 'Deductible - ALL OTHER'         
              when c.coverage_code = '9' then 'All Other' 
              else 'All Other'  end as coverage, 
        sum(earned_premium) as earned_premium, 
        sum(earned_exposures) as earned_car_years,
        -- sum(case when coverage_code in ('7','8','T') then round(paid_losses_incl_alae) 
        --         when coverage_code not in ('7','8','T') then round(dev_incurred_loss_incl_alae)
                -- else 0 end) as total_losses,
        sum(round(paid_losses_incl_alae)) as paid_losses,
        sum(round(dev_incurred_loss_incl_alae)) as dev_incurred_losses,
        -- sum(case when coverage_code in ('7','8','T') then paid_claim_counts 
        --         when coverage_code not in ('7','8','T') then total_claim_counts
        --         else 0 end) as total_claim_counts,
        sum(paid_claim_counts) as paid_claim_counts,
        sum(incurred_claim_counts) as incurred_claim_counts,
        -- sum(case when coverage_code in ('7','8','T') then paid_claim_counts 
        --         when coverage_code not in ('7','8','T') then claim_counts_calc
        --         else 0 end) as total_claim_counts_calc,
        sum(incurred_claim_counts_calc) as incurred_claim_counts_calc,
        -- sum(case when coverage_code not in ('7','8','T') then dev_basic_loss
        --         else 0 end) as developed_basic_limit_loss,
        -- sum(case when coverage_code not in ('7','8','T') then dev_excess_loss
        --         else 0 end) as developed_excess_limit_loss
        sum(case when coverage_code not in ('7','8','T') and transaction_type in ('Loss') then incurred_dev_basic_loss else 0 end) as incurred_developed_basic_limit_loss,
        sum(case when coverage_code not in ('7','8','T') and transaction_type in ('Loss') then incurred_dev_excess_loss else 0 end) as incurred_developed_excess_limit_loss

              
 from core c
 
 where 
  -- case when coverage_code not in ('7','8','T') and transaction_code in ('2','3','6','7') then c.ad_year 
  --           else c.report_year end in (2019,2020,2021)
      
     (${data_call_year | type:raw} - 2) - 
          (case when coverage_code not in ('7','8','T') and transaction_type in ('Loss') then c.ad_year else c.report_year end)
          in (0,1,2)
             
             
 
 group by 
        c.subline_code, 
        c.state_code, 
        c.zip_code,
        year,
        c.cal_acc_year,
        c.report_year,
        c.company_group, 
        c.nonreporters,
        c.commercial_class_name, 
        primary_coverage,
        coverage
;
