-- drop table openidl.tmp_auto_earned_premium;
drop table openidl.tmp_auto_earned_premium;
create table openidl.tmp_auto_earned_premium (
    ggroup numeric,
    AccountingDate Date,
    AccountingTermExpiration Date,
    mmonth numeric,
    yyear numeric,
    total numeric,
    monthlypremiumamount numeric,
    ep numeric
)

--ep group 1
insert into openidl.tmp_auto_earned_premium
Select 1 ggroup,
    AccountingDate, AccountingTermExpiration,
    (DATE_PART('month', AccountingTermExpiration::date) - DATE_PART('month', AccountingDate::date)) mmonth,
    (DATE_PART('year', AccountingTermExpiration::date) - DATE_PART('year', AccountingDate::date)) yyear,
    (DATE_PART('month', AccountingTermExpiration::date) - DATE_PART('month', AccountingDate::date)) + ((DATE_PART('year', AccountingTermExpiration::date) - DATE_PART('year', AccountingDate::date))*12) total,
    monthlypremiumamount,
    ((DATE_PART('month', AccountingTermExpiration::date) - DATE_PART('month', AccountingDate::date)) + ((DATE_PART('year', AccountingTermExpiration::date) - DATE_PART('year', AccountingDate::date))*12))*monthlypremiumamount ep
from openidl.au_premium
where AccountingDate >= '2000-02-01'
and AccountingTermExpiration < '2001-1-01';


--ep group 2, date part is start date
insert into openidl.tmp_auto_earned_premium
Select 2 ggroup,
    AccountingDate, AccountingTermExpiration,
    (DATE_PART('month', AccountingTermExpiration::date) - DATE_PART('month', '2000-02-01'::date)) mmonth,
    (DATE_PART('year', AccountingTermExpiration::date) - DATE_PART('year', '2000-02-01'::date)) yyear,
    (DATE_PART('month', AccountingTermExpiration::date) - DATE_PART('month', '2000-02-01'::date)) + ((DATE_PART('year', AccountingTermExpiration::date) - DATE_PART('year', '2000-02-01'::date))*12) total,
    monthlypremiumamount,
    ((DATE_PART('month', AccountingTermExpiration::date) - DATE_PART('month', '2000-02-01'::date)) + ((DATE_PART('year', AccountingTermExpiration::date) - DATE_PART('year', '2000-02-01'::date))*12))*monthlypremiumamount ep
from openidl.au_premium
where AccountingDate < '2000-02-01'
and AccountingTermExpiration < '2001-01-01';

--ep group3, date part is end date --review
insert into openidl.tmp_auto_earned_premium
Select 3 ggroup,
    AccountingDate, AccountingTermExpiration,
    (DATE_PART('month', AccountingTerm::date) - DATE_PART('month', '2001-01-01'::date)) mmonth,
    (DATE_PART('year', AccountingTerm::date) - DATE_PART('year', '2001-01-01'::date)) yyear,
    (DATE_PART('month', AccountingTerm::date) - DATE_PART('month', '2001-01-01'::date)) + ((DATE_PART('year', AccountingTerm::date) - DATE_PART('year', '2001-01-01'::date))*12) total,
    monthlypremiumamount,
    ((DATE_PART('month', AccountingTerm::date) - DATE_PART('month', '2001-01-01'::date)) + ((DATE_PART('year', AccountingTerm::date) - DATE_PART('year', '2001-01-01'::date))*12))*monthlypremiumamount ep
from openidl.au_premium
where AccountingDate > '2000-02-01'
and AccountingTermExpiration > '2001-01-01';

--ep group4 endDT-Start DT
insert into openidl.tmp_auto_earned_premium
Select
    4 ggroup,
    AccountingDate, AccountingTermExpiration,
    (DATE_PART('month', '2000-03-01'::date) - DATE_PART('month', '2000-02-01'::date)) mmonth,
    (DATE_PART('year', '2000-03-01'::date) - DATE_PART('year', '2000-02-01'::date)) yyear,
    (DATE_PART('month', '2000-03-01'::date) - DATE_PART('month', '2000-02-01'::date)) + ((DATE_PART('year', AccountingTermExpiration::date) - DATE_PART('year', '2000-02-01'::date))*12) total,
    monthlypremiumamount,
    ((DATE_PART('month', '2000-03-01'::date) - DATE_PART('month', '2000-02-01'::date)) + ((DATE_PART('year', '2000-03-01'::date) - DATE_PART('year', '2000-02-01'::date))*12))*monthlypremiumamount ep
from openidl.au_premium
where AccountingDate > '2000-02-01'
and AccountingTermExpiration > '2000-03-01';

select sum(ep) from openidl.tmp_auto_earned_premium;
drop table openidl.tmp_auto_earned_premium;

