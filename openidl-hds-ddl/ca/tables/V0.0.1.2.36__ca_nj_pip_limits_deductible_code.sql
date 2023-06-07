
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_nj_pip_limits_deductible_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_nj_pip_limits_deductible_code) THEN 
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(1,'25','Basic PIP coverage - Medical expenses only','Driver Only');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(2,'26','PIP coverage for pedestrian only','Driver Only');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(3,'01','Basic PIP coverage only - No added PIP coverage','Driver Only');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(4,'10','Basic PIP coverage with Option 6','Named Insurance Including Spouse');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(5,'11','Basic PIP coverage with Option 7','Named Insurance Including Spouse');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(6,'12','Basic PIP coverage with Option 8','Named Insurance Including Spouse');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(7,'13','Basic PIP coverage with Option 9','Named Insurance Including Spouse');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(8,'14','Basic PIP coverage with Option 10','Named Insurance Including Spouse');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(9,'15','Basic PIP coverage with Option 11','Named Insurance Including Spouse');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(10,'16','Basic PIP coverage with Option 12','Named Insurance Including Spouse');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(11,'17','Basic PIP coverage with Option 13','Named Insurance Including Spouse');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(12,'18','Basic PIP coverage with Option 14','Named Insurance Including Spouse');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(13,'19','Basic PIP coverage with Option 15','Named Insurance Including Spouse');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(14,'20','Basic PIP coverage with Option 16','Named Insurance Including Spouse');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(15,'02','Basic PIP coverage with Option 1','Named Insurance Including Spouse');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(16,'03','Basic PIP coverage with Option 2','Named Insurance Including Spouse');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(17,'04','Basic PIP coverage with Option 3','Named Insurance Including Spouse');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(18,'05','Basic PIP coverage with Option 4','Named Insurance Including Spouse');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(19,'06','Basic PIP coverage with Option 5','Named Insurance Including Spouse');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(20,'09','All Other','Named Insurance Including Spouse');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(21,'07','Three or more cars','Named Insurance Including Spouse');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(22,'08','Named insurance including spouse and resident relatives (if applicable) and other named insureds - Single or multi-car risks','Named Insurance Including Spouse');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(23,'30','Basic PIP coverage with Option 1','Named Insured and One or More Resident Relatives');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(24,'31','Basic PIP coverage with Option 2','Named Insured and One or More Resident Relatives');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(25,'32','Basic PIP coverage with Option 3','Named Insured and One or More Resident Relatives');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(26,'33','Basic PIP coverage with Option 4','Named Insured and One or More Resident Relatives');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(27,'34','Basic PIP coverage with Option 5','Named Insured and One or More Resident Relatives');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(28,'35','Basic PIP coverage with Option 6','Named Insured and One or More Resident Relatives');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(29,'36','Basic PIP coverage with Option 7','Named Insured and One or More Resident Relatives');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(30,'37','Basic PIP coverage with Option 8','Named Insured and One or More Resident Relatives');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(31,'38','Basic PIP coverage with Option 9','Named Insured and One or More Resident Relatives');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(32,'39','Basic PIP coverage with Option 10','Named Insured and One or More Resident Relatives');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(33,'40','Basic PIP coverage with Option 11','Named Insured and One or More Resident Relatives');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(34,'41','Basic PIP coverage with Option 12','Named Insured and One or More Resident Relatives');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(35,'42','Basic PIP coverage with Option 13','Named Insured and One or More Resident Relatives');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(36,'43','Basic PIP coverage with Option 14','Named Insured and One or More Resident Relatives');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(37,'44','Basic PIP coverage with Option 15','Named Insured and One or More Resident Relatives');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(38,'45','Basic PIP coverage with Option 16','Named Insured and One or More Resident Relatives');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(39,'09','All Other','Named Insured and One or More Resident Relatives');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(40,'07','Three or more cars','Named Insured and One or More Resident Relatives');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(41,'08','Named insurance including spouse and resident relatives (if applicable) and other named insureds - Single or multi-car risks','Named Insured and One or More Resident Relatives');
END IF;
END $$;
