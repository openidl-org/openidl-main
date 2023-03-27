function getReportingTable(companyId){
    sql =  `
    create table openidl_ep_${companyId}.tmp_au_coverage as
    select 
           case when a.coverage_code = '1' then '1'
                  when a.coverage_code = '2' then '2'
                  when a.coverage_code = '3' then '3'
                  when a.coverage_code = '4' then '4'
                  when a.coverage_code = '5' then '5'
                  when a.coverage_code = '6' then '6'
                  when a.coverage_code = 'X' then '6'
                  when a.coverage_code = 'Y' then '6'
                  when a.coverage_code = '7' and a.deductible_code in ('0') then '7'
                  when a.coverage_code = '8' and a.deductible_code in ('0') then '8'
                  when a.coverage_code = 'T' and a.deductible_code in ('0') then '8'
                  when a.coverage_code = '7' and a.deductible_code in ('2') then '9'
                  when a.coverage_code = '8' and a.deductible_code in ('2') then '10'
                  when a.coverage_code = 'T' and a.deductible_code in ('2') then '10'
                  when a.coverage_code = '7' and a.deductible_code in ('4') then '11'
                  when a.coverage_code = '8' and a.deductible_code in ('4') then '12'
                  when a.coverage_code = 'T' and a.deductible_code in ('4') then '12'
                  when a.coverage_code = '7' and a.deductible_code in ('5') then '13'
                  when a.coverage_code = '8' and a.deductible_code in ('5') then '14'
                  when a.coverage_code = 'T' and a.deductible_code in ('5') then '14'
                  when a.coverage_code = '7' and a.deductible_code in ('6') then '15'
                  when a.coverage_code = '8' and a.deductible_code in ('6') then '16'
                  when a.coverage_code = 'T' and a.deductible_code in ('6') then '16'
                  when a.coverage_code = '7' and a.deductible_code not in ('0', '2', '4', '5', '6') then '17'
                  when a.coverage_code = '8' and a.deductible_code not in ('0', '2', '4', '5', '6') then '18'
                  when a.coverage_code = 'T' and a.deductible_code not in ('0', '2', '4', '5', '6') then '18'              
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
                  else null end as reporting_name,
                  a.*
    from openidl_ep_${companyId}.tmp_au_pc a;
    
    `
    return sql
}

module.exports = getReportingTable