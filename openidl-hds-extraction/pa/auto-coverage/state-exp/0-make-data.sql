--create data for more years
select count(1), max(accounting_year), min(accounting_year)
from pa_stat_vw;  -- 110916, 2020, 2020

-- create 2021 set
drop table tmp_2021_pa;
create table tmp_2021_pa as select * from pa_stat_vw;
update tmp_2021_pa set accounting_year = (accounting_year + 1);

--create 2020set
drop table tmp_2020_pa;
create table tmp_2020_pa as select * from pa_stat_vw;

-- create 2019 set
drop table tmp_2019_pa;
create table tmp_2019_pa as select * from pa_stat_vw;
update tmp_2019_pa set accounting_year = (accounting_year - 1);
update tmp_2019_pa set accident_year = (accident_year - 1);

-- create 2018 set
drop table tmp_2018_pa;
create table tmp_2018_pa as select * from pa_stat_vw;
update tmp_2018_pa set accounting_year = (accounting_year - 2);
update tmp_2018_pa set accident_year = (accident_year - 2);


-- create master set
drop table pa_stat_vw2020;
create table pa_stat_vw2020 as select * from tmp_2020_pa;
insert into pa_stat_vw2020 select * from tmp_2019_pa;
insert into pa_stat_vw2020 select * from tmp_2018_pa;
insert into pa_stat_vw2020 select * from tmp_2021_pa;


--rough test
select count(1), max(accounting_year), min(accounting_year)
from pa_stat_vw2020;  -- 443664, 2021, 2018