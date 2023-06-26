
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cp_major_peril_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cp_major_peril_code) THEN 
    INSERT INTO cp_major_peril_code VALUES(1,'20','Fire perils excluding vandalism and sprinkler leakage','Not Applicable');
    INSERT INTO cp_major_peril_code VALUES(2,'21','Fire perils including vandalism','Not Applicable');
    INSERT INTO cp_major_peril_code VALUES(3,'22','Fire perils including sprinkler leakage','Not Applicable');
    INSERT INTO cp_major_peril_code VALUES(4,'23','Fire perils including vandalism and sprinkler leakage','Not Applicable');
    INSERT INTO cp_major_peril_code VALUES(5,'25','Extended coverage excluding vandalism','Not Applicable');
    INSERT INTO cp_major_peril_code VALUES(6,'26','Extended coverage including vandalism','Not Applicable');
    INSERT INTO cp_major_peril_code VALUES(7,'28','Extended coverage, vandalism, and broad form perils','NOT For AAIS Program Users');
    INSERT INTO cp_major_peril_code VALUES(8,'29','Extended coverage, vandalism, and special form perils with theft','NOT For AAIS Program Users');
    INSERT INTO cp_major_peril_code VALUES(9,'30','Extended coverage, vandalism, and special form perils without theft','NOT For AAIS Program Users');
    INSERT INTO cp_major_peril_code VALUES(10,'31','Broad form perils','Not Applicable');
    INSERT INTO cp_major_peril_code VALUES(11,'32','Special form perils with theft','Not Applicable');
    INSERT INTO cp_major_peril_code VALUES(12,'33','Special form perils without theft','Not Applicable');
    INSERT INTO cp_major_peril_code VALUES(13,'34','Fire and extended coverage excluding vandalism','NOT For AAIS Program Users');
    INSERT INTO cp_major_peril_code VALUES(14,'35','Fire and extended coverage including vandalism','NOT For AAIS Program Users');
    INSERT INTO cp_major_peril_code VALUES(15,'36','Fire, extended coverage, vandalism, and broad form perils','NOT For AAIS Program Users');
    INSERT INTO cp_major_peril_code VALUES(16,'37','Fire, extended coverage, vandalism, and special form perils with theft','NOT For AAIS Program Users');
    INSERT INTO cp_major_peril_code VALUES(17,'38','Fire, extended coverage, vandalism, and special form perils without theft','NOT For AAIS Program Users');
    INSERT INTO cp_major_peril_code VALUES(18,'61','Earthquake coverage','Premium Bearing Endorsements');
    INSERT INTO cp_major_peril_code VALUES(19,'62','Water damage -- Back up of sewers, drains, or sumps','Premium Bearing Endorsements');
    INSERT INTO cp_major_peril_code VALUES(20,'72','Spoilage coverage','Premium Bearing Endorsements');
    INSERT INTO cp_major_peril_code VALUES(21,'75','Equipment breakdown ','Premium Bearing Endorsements');
    INSERT INTO cp_major_peril_code VALUES(22,'80','Manufacturers Output policy','Special Property');
    INSERT INTO cp_major_peril_code VALUES(23,'81','Commercial Output program / Capital Assets Program','Special Property');
    INSERT INTO cp_major_peril_code VALUES(24,'82','Contractors and Developers Output program','Special Property');
    INSERT INTO cp_major_peril_code VALUES(25,'83','Agricultural Output program / Agricultural Capital Assets Program','Special Property');
    INSERT INTO cp_major_peril_code VALUES(26,'87','Market segments business','Special Property');
    INSERT INTO cp_major_peril_code VALUES(27,'90','Certified acts of terrorism covered (coverage not excluded)','Terrorism Coverage');
    INSERT INTO cp_major_peril_code VALUES(28,'91','Certified acts of terrorism excluded subject to Standard Fire Policy statutes when applicable, producing Fire Only coverage for certified acts of terrorism','Terrorism Coverage');
    INSERT INTO cp_major_peril_code VALUES(29,'92','Non-certified acts of terrorism covered (coverage not excluded)','Terrorism Coverage');
    INSERT INTO cp_major_peril_code VALUES(30,'93','Non-certified acts of terrorism covered, except acts of terrorism arising out of nuclear, biological or chemical events','Terrorism Coverage');
    INSERT INTO cp_major_peril_code VALUES(31,'99','All other allied lines','Terrorism Coverage');
END IF;
END $$;
