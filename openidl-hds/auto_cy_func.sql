drop function auto_cy;    
CREATE OR replace FUNCTION auto_cy(IN start_date date,IN end_date date)
returns      numeric AS $$DECLARE cy numeric;
BEGIN
    select sum(a.cy)
    from (
        (SELECT 1 ggroup,            
            Datediff(accountingtermexpiration, accountingdate)/12*exposure cy
            FROM   openidl.au_premium
            WHERE  accountingdate >= start_date
            AND accountingtermexpiration =< end_date) 
        union
            (SELECT 2 ggroup,                                                                
            Datediff(accountingtermexpiration, start_date)/12*exposure cy
            FROM   openidl.au_premium
            WHERE  accountingdate < start_date
            and accountingtermexpiration> start_date
            and accountingtermexpiration< end_date)
        union
            (select 3 ggroup,
            Datediff(accountingdate, end_date)/12*exposure cy
            FROM   openidl.au_premium
            WHERE  accountingdate > start_date
            and accountingdate < end_date
            AND accountingtermexpiration > end_date)
        union
            (select 4 ggroup,       
            Datediff(end_date, start_date)/12*exposure cy
            FROM   openidl.au_premium
            WHERE  accountingdate < start_date
            AND accountingtermexpiration > end_date)) a into cy;
    RETURN cy;
END$$ language plpgsql

select auto_cy('2000-01-01'::DATE, '2000-02-01'::DATE);