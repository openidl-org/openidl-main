-- notes ---------------------------------
-- string dates would be parameter
-- currently this is returning valid result
-- this does not break out by coverage code
-- this is only the first column of the 8 column report.

-- start date = '2000-01-01'
-- end date = '2001-01-01'



--set up
CREATE TABLE openidl.tmp_auto_ep AS
    SELECT 1
            ggroup,
            Datediff(accountingtermexpiration, accountingdate) * monthlypremiumamount ep
    FROM   openidl.au_premium
    WHERE  accountingdate >= '2000-01-01'
            AND accountingtermexpiration < '2001-01-01' 


--set up
INSERT INTO openidl.tmp_auto_ep
SELECT 2 ggroup,
       Datediff(accountingtermexpiration, '2000-01-01') * monthlypremiumamount ep
FROM   openidl.au_premium
WHERE  accountingdate < '2000-01-01'
       AND accountingtermexpiration > '2000-01-01'
       AND accountingtermexpiration < '2001-01-01' 

--set up
INSERT INTO openidl.tmp_auto_ep
(SELECT 3 ggroup,
        Datediff(accountingdate, '2001-01-01') * monthlypremiumamount ep
 FROM   openidl.au_premium
 WHERE  accountingdate > '2000-01-01'
        AND accountingdate < '2001-01-01'
        AND accountingtermexpiration > '2001-01-01') 

--set up      
INSERT INTO openidl.tmp_auto_ep
(SELECT 4                                                           ggroup,
        Datediff('2001-01-01', '2000-01-01') * monthlypremiumamount ep
 FROM   openidl.au_premium
 WHERE  accountingdate < '2000-01-01'
        AND accountingtermexpiration > '2001-01-01') 


--extraction
select sum(ep)
from openidl.tmp_auto_ep


--tear down
drop table openidl.tmp_auto_ep
