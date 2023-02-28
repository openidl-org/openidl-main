do $$ 
begin
create table if not exists pa_anti_lock_brakes_discount_code (
    id int,
    fk_state_id int,
    code varchar,
    description varchar
);

if not exists (select * from pa_anti_lock_brakes_discount_code) then 
insert into pa_anti_lock_brakes_discount_code (id, code, description) values( 1,'1','Anti-Lock Braking System discount applied to this coverage.' );
insert into pa_anti_lock_brakes_discount_code values( 2,'2','Program offers an Anti-Lock Braking System discount on this coverage, but the vehicle does not qualify for the discount.' );
insert into pa_anti_lock_brakes_discount_code values( 3,'9','Not Applicable -Program does not offer an Anti-Lock Braking System discount on this coverage.' );
end if;

end $$