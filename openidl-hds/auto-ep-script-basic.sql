-- basic ep
select sum(premiumamount)
from openidl.au_premium;

--ep calculated
select sum(monthlypremiumamount*monthscovered)
from openidl.au_premium;

--ep v calculated
select a.basic, b.calculated
(select sum(premiumamount) basic
from openidl.au_premium) a,
(select sum(monthlypremiumamount*monthscovered) calculated
from openidl.au_premium ) b