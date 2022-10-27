-- report 
select coveragecategory, coverage
       , auto_ep('2000-01-01'::DATE, '2002-01-01'::DATE,coverageCode)
from openidl.au_coverage_vw;

--report ep: 649045.1341
select sum(a.auto_ep)
from (select coveragecategory, coverage
        , auto_ep('2000-01-01'::DATE, '2002-01-01'::DATE,coverageCode)
from openidl.au_coverage_vw) as a;

