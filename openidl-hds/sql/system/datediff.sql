-- drop function dateDiff;
drop function dateDiff;

create or replace function datediff(IN start_date date,IN end_date date) returns numeric as $$
declare diff numeric ;
begin
    select 
    (DATE_PART('month', end_date::date) - DATE_PART('month', start_date::date)) 
    + ((DATE_PART('year', end_date::date) - DATE_PART('year', start_date::date))*12) into diff;
    return diff;
end 
$$ language plpgsql;