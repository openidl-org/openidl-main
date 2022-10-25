-- basic ep: 649045 
select sum(premiumamount)
from openidl.au_premium;

--ep calculated ep: 649045.1341
select sum(monthlypremiumamount*monthscovered)
from openidl.au_premium;

--ep v calculated
select a.basic, b.calculated
from
    (select sum(premiumamount) basic
    from openidl.au_premium) a,
    (select sum(monthlypremiumamount*monthscovered) calculated
    from openidl.au_premium ) b


-- report 
select coveragecategory, coverage, auto_ep('2000-01-01'::DATE, '2002-01-01'::DATE,coverageCode)
from openidl.au_coverage_vw;

--report ep: 649045.1341
select sum(a.auto_ep)
from (select coveragecategory, coverage, auto_ep('2000-01-01'::DATE, '2002-01-01'::DATE,coverageCode)
from openidl.au_coverage_vw) as a;

