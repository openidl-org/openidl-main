create table tmp_auto_factors (
    liability_or_physical_damage varchar,
    year int,
    ldf numeric, --accident year
    ulae_factor numeric --year - set by case statment above
);

insert into tmp_auto_factors values ('Liability', 2020, 1.009, 1.00);
insert into tmp_auto_factors values ('Liability', 2019, 1.031, 1.00);
insert into tmp_auto_factors values ('Liability', 2018, 1.112, 1.00);


insert into tmp_auto_factors values ('Physical Damage', 2020, .999, 1.00);
insert into tmp_auto_factors values ('Physical Damage', 2019, .997, 1.00);
insert into tmp_auto_factors values ('Physical Damage', 2018, .989, 1.00);