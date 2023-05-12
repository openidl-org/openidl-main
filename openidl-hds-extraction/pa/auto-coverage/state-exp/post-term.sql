--get all records for ny record with transaction code in (‘2’,’3’,’6’,’7’)
--, with an accident date during the 3 years, and the accounting date is during the 3 years OR q1 of the next year
-- this finds the block of records outside of the normal bounds. 



select * from pa_stat_vw2020
where accounting_year >= 2018
and accounting_year <= 2020;



--post period accounting, in period accident
select * from pa_stat_vw2020
where fk_transaction_code_id in (2,3,4,5)
and accident_year < 2021 
and accounting_year = 2021
and accounting_month < 4;


