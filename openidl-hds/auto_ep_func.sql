drop function auto_ep;    

CREATE OR replace FUNCTION auto_ep(IN start_date date,IN end_date date, IN coverage_code VARCHAR)
returns      numeric AS $$DECLARE ep numeric;
BEGIN
    select sum(a.ep)
    from (
        (SELECT 1 ggroup,
            Datediff(accountingtermexpiration, accountingdate) * monthlypremiumamount ep
            FROM   openidl.au_premium
            WHERE  accountingdate >= start_date
            AND accountingtermexpiration < end_date
            and transactioncode = '1'
            and coveragecode = coverage_code) 
        union all 
            (SELECT 2 ggroup,                                                      
            Datediff(accountingtermexpiration, start_date) * monthlypremiumamount  ep   
            FROM   openidl.au_premium
            WHERE  accountingdate < start_date
            and accountingtermexpiration> start_date
            and accountingtermexpiration< end_date
            and transactioncode = '1'
            and coveragecode = coverage_code
            )
        union all 
            (select 3 ggroup,
            Datediff(accountingdate, end_date) * monthlypremiumamount ep
            FROM   openidl.au_premium
            WHERE  accountingdate > start_date
            and accountingdate < end_date
            AND accountingtermexpiration > end_date
            and transactioncode = '1'
            and coveragecode = coverage_code)
        union all
            (select 4 ggroup,       
            Datediff(end_date, start_date) *monthlypremiumamount ep
            FROM   openidl.au_premium
            WHERE  accountingdate < start_date
            AND accountingtermexpiration > end_date
            and transactioncode = '1'
            and coveragecode = coverage_code)) a into ep;
    RETURN ep;
END$$ language plpgsql

select auto_ep('2000-01-01'::DATE, '2002-01-01'::DATE), auto_cy..... ;
