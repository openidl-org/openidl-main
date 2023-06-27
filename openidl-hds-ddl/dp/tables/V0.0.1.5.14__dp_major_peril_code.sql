
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS dp_major_peril_code (
    id INT,
    code VARCHAR,
    type VARCHAR,
    category VARCHAR,
    major_peril VARCHAR,
    major_peril_category VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM dp_major_peril_code) THEN 
    INSERT INTO dp_major_peril_code VALUES(1,'20','Fire Perils','Separate Premium Calculations','Fire','Divisible Premiums');
    INSERT INTO dp_major_peril_code VALUES(2,'25','Extended coverage excluding vandalism','Separate Premium Calculations','EC w/o Vandalism','Divisible Premiums');
    INSERT INTO dp_major_peril_code VALUES(3,'26','Extended coverage including vandalism','Separate Premium Calculations','EC w/ Vandalism','Divisible Premiums');
    INSERT INTO dp_major_peril_code VALUES(4,'28','Extended coverage, vandalism, and broad form perils','Separate Premium Calculations','EC, Vandalism, and Broad','Divisible Premiums');
    INSERT INTO dp_major_peril_code VALUES(5,'29','Extended coverage, vandalism, and special form perils with theft','Separate Premium Calculations','EC, Vandalism, and Special','Divisible Premiums');
    INSERT INTO dp_major_peril_code VALUES(6,'30','Extended coverage, vandalism, and special form perils without theft','Separate Premium Calculations','EC, Vandalism, and Special','Divisible Premiums');
    INSERT INTO dp_major_peril_code VALUES(7,'31','Broad form perils','Separate Premium Calculations','Broad w/o Fire and EC','Divisible Premiums');
    INSERT INTO dp_major_peril_code VALUES(8,'32','Special form perils with theft','Separate Premium Calculations','Special w/o Fire and EC','Divisible Premiums');
    INSERT INTO dp_major_peril_code VALUES(9,'33','Special form perils without theft','Separate Premium Calculations','Special w/o Fire and EC','Divisible Premiums');
    INSERT INTO dp_major_peril_code VALUES(10,'34','Fire and extended coverage excluding vandalism','Indivisible Premium Calculations','Fire and EC (No Vandalism)','Indivisible Premiums');
    INSERT INTO dp_major_peril_code VALUES(11,'35','Fire and extended coverage including vandalism','Indivisible Premium Calculations','Fire, EC, and Vandalism','Indivisible Premiums');
    INSERT INTO dp_major_peril_code VALUES(12,'36','Fire, extended coverage, vandalism, and broad form perils','Indivisible Premium Calculations','Fire, EC, Vandalism, Broad','Indivisible Premiums');
    INSERT INTO dp_major_peril_code VALUES(13,'37','Fire, extended coverage, vandalism, and special form perils with theft','Indivisible Premium Calculations','Fire, EC, Vandalism, Special','Indivisible Premiums');
    INSERT INTO dp_major_peril_code VALUES(14,'38','Fire, extended coverage, vandalism, and special form perils without theft','Indivisible Premium Calculations','Fire, EC, Vandalism, Special','Indivisible Premiums');
    INSERT INTO dp_major_peril_code VALUES(15,'60','All other premium bearing endorsements','Premium Bearing Endorsements','All Other','Endorsements');
    INSERT INTO dp_major_peril_code VALUES(16,'61','Earthquake coverage for the dwelling (including farm dwellings) and related contents','Premium Bearing Endorsements','Earthquake','Endorsements');
    INSERT INTO dp_major_peril_code VALUES(17,'62','Water damage - Back up of sewers, drains, or sumps','Premium Bearing Endorsements','Water Damage - Sewage Backup','Endorsements');
    INSERT INTO dp_major_peril_code VALUES(18,'63','Motorized golf cart - physical damage coverage','Premium Bearing Endorsements','All Other','Endorsements');
    INSERT INTO dp_major_peril_code VALUES(19,'64','Identity fraud expense coverage','Premium Bearing Endorsements','All Other','Endorsements');
    INSERT INTO dp_major_peril_code VALUES(20,'70','Theft of dwelling contents','Premium Bearing Endorsements','Theft of Dwelling Contents','Endorsements');
    INSERT INTO dp_major_peril_code VALUES(21,'71','Earthquake coverage for the farm property','Premium Bearing Endorsements','Earthquake','Endorsements');
    INSERT INTO dp_major_peril_code VALUES(22,'75','Equipment breakdown coverage','Premium Bearing Endorsements','All Other','Endorsements');
    INSERT INTO dp_major_peril_code VALUES(23,'76','Weight of ice, snow, and sleet on farm property','Premium Bearing Endorsements','All Other','Endorsements');
    INSERT INTO dp_major_peril_code VALUES(24,'77','Livestock perils options','Premium Bearing Endorsements','All Other','Endorsements');
    INSERT INTO dp_major_peril_code VALUES(25,'80','Resident of Assisted Living Facility','Premium Bearing Endorsements','All Other','Endorsements');
    INSERT INTO dp_major_peril_code VALUES(26,'90','Certified acts of terrorism covered (coverage not excluded)','Terrorism Coverage','Terrorism Coverage','Terrorism Coverage');
    INSERT INTO dp_major_peril_code VALUES(27,'91','Certified acts of terrorism excluded subject to Standard Fire Policy statutes when applicable, producing fire-only coverage for certified acts of terrorism','Terrorism Coverage','Terrorism Coverage','Terrorism Coverage');
    INSERT INTO dp_major_peril_code VALUES(28,'92','Non-certified acts of terrorism covered (coverage not excluded)','Terrorism Coverage','Terrorism Coverage','Terrorism Coverage');
    INSERT INTO dp_major_peril_code VALUES(29,'93','Non-certified acts of terrorism covered, except acts of terrorism arising out of nuclear, biological or chemical events','Terrorism Coverage','Terrorism Coverage','Terrorism Coverage');
    INSERT INTO dp_major_peril_code VALUES(30,'99','Minimum Premium record subject to SECTION I, PART C, Rule 3.b','Other','Other','Other');
END IF;
END $$;
