select sum(a.cy)
from 
((SELECT 1 ggroup,
            Datediff(accountingtermexpiration, accountingdate)/12*exposure cy
            FROM   openidl.au_premium
            WHERE  accountingdate >= '2000-01-01'
            AND accountingtermexpiration <= '2001-01-01') 
        union
            (SELECT 2 ggroup,                                                      
            Datediff(accountingtermexpiration, '2000-01-01')/12*exposure cy  
            FROM   openidl.au_premium
            WHERE  accountingdate < '2000-01-01'
            and accountingtermexpiration > '2000-01-01'
            and accountingtermexpiration < '2001-01-1')
            
        union
            (select 3 ggroup,
            Datediff(accountingdate, '2001-01-01')/12*exposure cy
            FROM   openidl.au_premium
            WHERE  accountingdate > '2000-01-01'
            and accountingdate < '2001-01-01'
            AND accountingtermexpiration > '2001-01-01')
        union
            (select 4 ggroup,       
            Datediff('2002-01-01', '2001-01-01')/12*exposure cy
            FROM   openidl.au_premium
            WHERE  accountingdate < '2001-01-01'
            AND accountingtermexpiration > '2002-01-01')) a