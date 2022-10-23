drop function auto_cy;    
CREATE OR replace FUNCTION auto_cy(IN start_date date,IN end_date date)
returns      numeric AS $$DECLARE cy numeric;
BEGIN
    select sum(e.cy)
    from (
        (select sum(a.cy) cy
        (SELECT 1 ggroup,            
            Datediff(accountingtermexpiration, accountingdate)/12*exposure cy
            FROM   openidl.au_premium
            WHERE  accountingdate >= start_date
            AND accountingtermexpiration =< end_date) a)
        union
            (select sum(b.cy) cy
            (SELECT 2 ggroup,                                                                
            Datediff(accountingtermexpiration, start_date)/12*exposure cy
            FROM   openidl.au_premium
            WHERE  accountingdate < start_date
            and accountingtermexpiration> start_date
            and accountingtermexpiration< end_date) b)
        union
            (select sum(c.cy)
            (select 3 ggroup,
            Datediff(accountingdate, end_date)/12*exposure cy
            FROM   openidl.au_premium
            WHERE  accountingdate > start_date
            and accountingdate < end_date
            AND accountingtermexpiration > end_date) c)
        union
            (select sum(d.cy)
            (select 4 ggroup,       
            Datediff(end_date, start_date)/12*exposure cy
            FROM   openidl.au_premium
            WHERE  accountingdate < start_date
            AND accountingtermexpiration > end_date) d)) e
    RETURN cy;
END$$ language plpgsql

select auto_cy('2000-01-01'::DATE, '2000-02-01'::DATE);