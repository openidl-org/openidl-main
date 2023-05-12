--standard records
create table pa_stat_exp_raw as 
    select * from pa_stat_vw2020
    where accounting_year >= 2018
    and accounting_year <= 2020;

--post period accounting, in period accident
insert into pa_stat_exp_raw
select * from pa_stat_vw2020
where fk_transaction_code_id in (2,3,4,5)
and accident_year < 2021 
and accounting_year = 2021
and accounting_month < 4;


