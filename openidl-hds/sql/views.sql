-- drop view openidl_base.au_coverage_vw;
create or replace view  openidl_base.au_coverage_vw as
select coverage_category, coverage, coverage_code 
from openidl_base.au_premium ap 
group by coverage_category , coverage , coverage_code ;

select coveragecategory, coverage, auto_ep('2000-01-01'::DATE, '2002-01-01'::DATE,coverageCode)
from openidl_base.au_coverage_vw;
