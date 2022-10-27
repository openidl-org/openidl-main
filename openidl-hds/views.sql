create or replace view  openidl.au_coverage_vw as
select coveragecategory, coverage, coveragecode 
from openidl.au_premium ap 
group by coveragecategory , coverage , coveragecode ;

select coveragecategory, coverage, auto_ep('2000-01-01'::DATE, '2002-01-01'::DATE,coverageCode)
from openidl.au_coverage_vw;
