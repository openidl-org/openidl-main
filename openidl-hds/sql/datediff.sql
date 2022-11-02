-- drop function dateDiff;
create or replace function datediff(IN recentDT date,IN oldDT date) returns numeric as $$
declare diff numeric ;
begin
    select 
    (DATE_PART('month', recentDT::date) - DATE_PART('month', oldDT::date)) 
    + ((DATE_PART('year', recentDT::date) - DATE_PART('year', oldDT::date))*12) into diff;
    return diff;
end 
$$ language plpgsql