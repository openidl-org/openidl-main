drop table openidl.tmp_auto_earned_premium;
create table openidl.tmp_auto_earned_premium2 (
    ggroup numeric,
    AccountingDate Date,
    AccountingTermExpiration Date,
    total numeric,
    monthlypremiumamount numeric,
    ep numeric
)

--date diff function
drop function dateDiff;
create or replace function dateDiff(IN recentDT date,IN oldDT date) returns numeric as $$
declare diff numeric ;
begin
    --   declare fff int;
    select 
    (DATE_PART('month', recentDT::date) - DATE_PART('month', oldDT::date)) 
    + ((DATE_PART('year', recentDT::date) - DATE_PART('year', oldDT::date))*12) into diff;
    return diff;
end 
$$ language plpgsql


--setup
INSERT INTO openidl.tmp_auto_earned_premium2
SELECT 1 ggroup,
       accountingdate,
       accountingtermexpiration,
       Datediff(accountingtermexpiration, accountingdate)
       total,
       monthlypremiumamount,
       Datediff(accountingtermexpiration, accountingdate) * monthlypremiumamount
       ep
FROM   openidl.au_premium
WHERE  accountingdate >= '2000-02-01'
       AND accountingtermexpiration < '2001-1-01'; 


INSERT INTO openidl.tmp_auto_earned_premium2
SELECT 2 ggroup,                                                      
       accountingdate,
       accountingtermexpiration,
       Datediff(accountingtermexpiration, '2000-02-01' :: DATE)
       monthlypremiumamount,
       Datediff(accountingtermexpiration, '2000-02-01' :: DATE) *
       monthlypremiumamount
                                                                ep
FROM   openidl.au_premium
WHERE  accountingdate < '2000-02-01'
       AND accountingtermexpiration < '2001-01-01'; 


--ep group3, date part is end date --review
INSERT INTO openidl.tmp_auto_earned_premium2
SELECT 3 ggroup,
       accountingdate,
       accountingtermexpiration,
       Datediff(accountingterm, '2001-01-01' :: DATE),
       monthlypremiumamount,
       Datediff(accountingterm, '2001-01-01' :: DATE) * monthlypremiumamount ep
FROM   openidl.au_premium
WHERE  accountingdate > '2000-02-01'
       AND accountingtermexpiration > '2001-01-01'; 

--ep group4 endDT-Start DT
INSERT INTO openidl.tmp_auto_earned_premium2
SELECT 4 ggroup,
       accountingdate,
       accountingtermexpiration,
       Datediff('2000-03-01' :: DATE, '2000-02-01' :: DATE),
       monthlypremiumamount,
       Datediff('2000-03-01' :: DATE, '2000-02-01' :: DATE) *
       monthlypremiumamount ep
FROM   openidl.au_premium
WHERE  accountingdate > '2000-02-01'
       AND accountingtermexpiration > '2000-03-01'; 


select sum(ep) f
rom openidl.tmp_auto_earned_premium;

--tear down
drop table
openidl.tmp_auto_earned_premium;