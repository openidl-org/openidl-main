-- report 
select coverage_category, coverage
       , auto_ep('2000-01-01'::DATE, '2002-01-01'::DATE,coverage_code) earned_premium
       , auto_cy('2000-01-01'::DATE, '2002-01-01'::DATE,coverage_code) car_years
       , auto_incurred_count('2000-01-01'::DATE, '2002-01-01'::DATE,coverage_code) incurred_count
       , auto_incurred_loss('2000-01-01'::DATE, '2002-01-01'::DATE,coverage_code) incurred_loss
from openidl_base.au_coverage_vw
order by coverage_category;



select *, auto_ep_reporting('2000-01-01'::DATE, '2002-01-01'::DATE,a.reg_reporting_code) 
from openidl_base.au_reg_reporting_ref a; 






--report ep: 649045.1341
select sum(a.auto_ep)
from (select coveragecategory, coverage
        , auto_ep('2000-01-01'::DATE, '2001-03-01'::DATE,coverageCode)
        from openidl.au_coverage_vw) as a;

