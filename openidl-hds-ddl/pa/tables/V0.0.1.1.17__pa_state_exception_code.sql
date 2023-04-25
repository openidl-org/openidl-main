DO $$
BEGIN 

CREATE TABLE IF NOT EXISTS pa_state_exception_category_code (
    id int,
    name VARCHAR,
    description VARCHAR,
	effective_date date not null default '1900-01-01',
    expiration_date date not null default '9999-12-31'
);
    
CREATE TABLE IF NOT EXISTS pa_state_exception_code (
    id int,
    fk_state_exception_category_id int,
    fk_state_id int,
    code varchar,
    name varchar, 
    description varchar,
	effective_date date not null default '1900-01-01',
    expiration_date date not null default '9999-12-31'
    );
    
IF NOT EXISTS (SELECT * FROM pa_state_exception_category_code) THEN
   INSERT INTO pa_state_exception_category_code (id, name) values (1,'stateExceptionA');
   INSERT INTO pa_state_exception_category_code (id, name) values (2,'stateExceptionB');
   INSERT INTO pa_state_exception_category_code (id, name) values (3,'stateExceptionC');
   INSERT INTO pa_state_exception_category_code (id, name) values (4,'stateExceptionCCWIP');
END IF;

IF NOT EXISTS (SELECT * FROM pa_state_exception_code) THEN
   INSERT INTO pa_state_exception_code VALUES (1,1,16,'01','Tort Limitation','No rejection of tort limitation - Residual Bodily Injury record only');
   INSERT INTO pa_state_exception_code VALUES (2,1,16,'02','Tort Limitation','All other liability records');
   INSERT INTO pa_state_exception_code VALUES (3,1,21,'03','Intrastate Interstate','Vehicles written on an intrastate basis');
   INSERT INTO pa_state_exception_code VALUES (4,1,21,'04','Intrastate Interstate','Vehicles written on an interstate basis');
   INSERT INTO pa_state_exception_code VALUES (5,1,29,'99','Threshold Tort Limitation','Liability with Unknown Threshold/Tort Limitation');
   INSERT INTO pa_state_exception_code VALUES (6,1,29,'04','Threshold Tort Limitation','No Threshold/No Tort Limitation');
   INSERT INTO pa_state_exception_code VALUES (7,1,29,'05','Threshold Tort Limitation','Verbal Threshold/Tort Limitation');
   INSERT INTO pa_state_exception_code VALUES (8,1,29,'06','Threshold Tort Limitation','No Threshold/No Tort Limitation');
   INSERT INTO pa_state_exception_code VALUES (9,1,29,'08','Threshold Tort Limitation','Verbal Threshold/Tort Limitation');
   INSERT INTO pa_state_exception_code VALUES (10,1,29,'07','Threshold Tort Limitation','No Threshold/No Tort Limitation');
   INSERT INTO pa_state_exception_code VALUES (11,1,29,'09','Threshold Tort Limitation','Verbal Threshold/Tort Limitation');
   INSERT INTO pa_state_exception_code VALUES (12,1,31,'01','Accident Prevention Credit','Vehicle with accident prevention credit');
   INSERT INTO pa_state_exception_code VALUES (13,1,31,'02','Accident Prevention Credit','Vehicle without accident prevention credit');
   INSERT INTO pa_state_exception_code VALUES (14,1,37,'04','Tort Limitation','Full Tort selected by the insured');
   INSERT INTO pa_state_exception_code VALUES (15,1,37,'05','Tort Limitation','Limited Tort selected by insured');
   INSERT INTO pa_state_exception_code VALUES (16,1,39,'01','SC Reinsurance Facility','Business written under the S.C.R.F. and ceded to S.C.R.F.');
   INSERT INTO pa_state_exception_code VALUES (17,1,39,'02','SC Reinsurance Facility','Business written under the S.C.R.F. and retained by the company');
   INSERT INTO pa_state_exception_code VALUES (18,1,39,'09','SC Reinsurance Facility','Business not written under the S.C.R.F.');
   INSERT INTO pa_state_exception_code VALUES (19,2,29,'17','Multi Car Risks','Principal Automobile - Not Discounted');
   INSERT INTO pa_state_exception_code VALUES (20,2,29,'27','Multi Car Risks','Additional Automobile(s) - Discounted');
   INSERT INTO pa_state_exception_code VALUES (21,2,29,'37','Multi Car Risks','All Other Automobiles');
   INSERT INTO pa_state_exception_code VALUES (22,2,29,'47','Multi Car Risks','The number of automobiles insured by the same insurer exceeds the number of licensed drivers customarily operating such automobiles.');
   INSERT INTO pa_state_exception_code VALUES (23,2,31,'99','Primary No Fault Health Plan','Unknown');
   INSERT INTO pa_state_exception_code VALUES (24,2,31,'01','Primary No Fault Health Plan','Employer s work loss plan primary');
   INSERT INTO pa_state_exception_code VALUES (25,2,31,'02','Primary No Fault Health Plan','Medicare primary');
   INSERT INTO pa_state_exception_code VALUES (26,2,31,'03','Primary No Fault Health Plan','No basic PIP medical expense because medical coverage is provided under an approved health plan');
   INSERT INTO pa_state_exception_code VALUES (27,2,31,'04','Primary No Fault Health Plan','Employer s work loss plan and medicare coordination, both primary');
   INSERT INTO pa_state_exception_code VALUES (28,2,31,'05','Primary No Fault Health Plan','Employer s work loss plan primary with no basic PIP medical expense because medical coverage is provided under an approved health plan');
   INSERT INTO pa_state_exception_code VALUES (29,2,31,'09','Primary No Fault Health Plan','PIP is primary insurance');
   INSERT INTO pa_state_exception_code VALUES (30,2,37,'00','55 And Over Discount','Not Applicable');
   INSERT INTO pa_state_exception_code VALUES (31,2,37,'05','55 And Over Discount',' 55 & Over  discount for successful completion of PA certified training course.');
   INSERT INTO pa_state_exception_code VALUES (32,3,29,'01','Engine Size','0 - 50 cc');
   INSERT INTO pa_state_exception_code VALUES (33,3,29,'02','Engine Size','51 - 100 cc');
   INSERT INTO pa_state_exception_code VALUES (34,3,29,'03','Engine Size','101 - 200 cc');
   INSERT INTO pa_state_exception_code VALUES (35,3,29,'04','Engine Size','201 - 360 cc');
   INSERT INTO pa_state_exception_code VALUES (36,3,29,'05','Engine Size','361 - 500 cc');
   INSERT INTO pa_state_exception_code VALUES (37,3,29,'06','Engine Size','501 - 800 cc');
   INSERT INTO pa_state_exception_code VALUES (38,3,29,'07','Engine Size','801 -1000 cc');
   INSERT INTO pa_state_exception_code VALUES (39,3,29,'08','Engine Size','Over 1000 cc Passenger');
   INSERT INTO pa_state_exception_code VALUES (40,3,29,'09','Engine Size','Hazard excluded');
END IF; 

END $$
