--ep group 1
select sum(premiumamount)
from openidl.au_premium
where AccountingDate >= '2000-02-01'
and AccountingTermExpiration < '2001-1-01';

--ep group 2, date part is start date

Select
    AccountingDate, AccountingTermExpiration,
    (DATE_PART('month', AccountingTermExpiration::date) - DATE_PART('month', '2000-02-01'::date)) mmonth,
    (DATE_PART('year', AccountingTermExpiration::date) - DATE_PART('year', '2000-02-01'::date)) yyear,
    (DATE_PART('month', AccountingTermExpiration::date) - DATE_PART('month', '2000-02-01'::date)) + ((DATE_PART('year', AccountingTermExpiration::date) - DATE_PART('year', '2000-02-01'::date))*12) total,
    monthlypremiumamount,
    ((DATE_PART('month', AccountingTermExpiration::date) - DATE_PART('month', '2000-02-01'::date)) + ((DATE_PART('year', AccountingTermExpiration::date) - DATE_PART('year', '2000-02-01'::date))*12))*monthlypremiumamount ep
from openidl.au_premium
where AccountingDate < '2000-02-01'
and AccountingTermExpiration < '2001-01-01';

--ep group3, date part is end date
Select
    AccountingDate, AccountingTermExpiration,
    (DATE_PART('month', AccountingTermExpiration::date) - DATE_PART('month', '2001-01-01'::date)) mmonth,
    (DATE_PART('year', AccountingTermExpiration::date) - DATE_PART('year', '2001-01-01'::date)) yyear,
    (DATE_PART('month', AccountingTermExpiration::date) - DATE_PART('month', '2001-01-01'::date)) + ((DATE_PART('year', AccountingTermExpiration::date) - DATE_PART('year', '2001-01-01'::date))*12) total,
    monthlypremiumamount,
    ((DATE_PART('month', AccountingTermExpiration::date) - DATE_PART('month', '2001-01-01'::date)) + ((DATE_PART('year', AccountingTermExpiration::date) - DATE_PART('year', '2001-01-01'::date))*12))*monthlypremiumamount ep
from openidl.au_premium
where AccountingDate > '2000-02-01'
and AccountingTermExpiration > '2001-01-01';

--ep group4 endDT-Start DT
Select
    AccountingDate, AccountingTermExpiration,
    (DATE_PART('month', '2000-03-01'::date) - DATE_PART('month', '2000-02-01'::date)) mmonth,
    (DATE_PART('year', '2000-03-01'::date) - DATE_PART('year', '2000-02-01'::date)) yyear,
    (DATE_PART('month', '2000-03-01'::date) - DATE_PART('month', '2000-02-01'::date)) + ((DATE_PART('year', AccountingTermExpiration::date) - DATE_PART('year', '2000-02-01'::date))*12) total,
    monthlypremiumamount,
    ((DATE_PART('month', '2000-03-01'::date) - DATE_PART('month', '2000-02-01'::date)) + ((DATE_PART('year', '2000-03-01'::date) - DATE_PART('year', '2000-02-01'::date))*12))*monthlypremiumamount ep
from openidl.au_premium
where AccountingDate > '2000-02-01'
and AccountingTermExpiration > '2000-03-01';
