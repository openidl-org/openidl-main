drop function autoep;    
CREATE OR replace FUNCTION autoep(IN start_date date,IN end_date date)
returns      numeric AS $$DECLARE ep numeric;
BEGIN
    select sum(a.ep)
    from (
        (SELECT 1 ggroup,
            Datediff(accountingtermexpiration, accountingdate) * monthlypremiumamount ep
        FROM   openidl.au_premium
        WHERE  accountingdate >= start_date
            AND accountingtermexpiration < end_date) 
        union
        (SELECT 2 ggroup,                                                      
            Datediff(accountingtermexpiration, start_date) * monthlypremiumamount  ep
        FROM   openidl.au_premium
        WHERE  accountingdate < start_date)
        union
        (select 3 ggroup,
            Datediff(accountingdate, end_date) * monthlypremiumamount ep
        FROM   openidl.au_premium
        WHERE  accountingdate > start_date
        AND accountingtermexpiration > end_date)
        union
        (select 4 ggroup,       
        Datediff(end_date, start_date) *monthlypremiumamount ep
        FROM   openidl.au_premium
        WHERE  accountingdate < start_date
        AND accountingtermexpiration > end_date)) a into ep;
    RETURN ep;
END$$ language plpgsql

select autoep('2000-01-01'::DATE, '2000-02-01'::DATE);
