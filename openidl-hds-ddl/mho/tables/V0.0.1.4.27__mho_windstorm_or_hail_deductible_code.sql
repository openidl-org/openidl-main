
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS mho_windstorm_or_hail_deductible_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM mho_windstorm_or_hail_deductible_code) THEN 
    INSERT INTO mho_windstorm_or_hail_deductible_code VALUES(1,'0','Does Not Apply','Flat and Percentage');
    INSERT INTO mho_windstorm_or_hail_deductible_code VALUES(2,'1','500','Flat');
    INSERT INTO mho_windstorm_or_hail_deductible_code VALUES(3,'2','1,000','Flat');
    INSERT INTO mho_windstorm_or_hail_deductible_code VALUES(4,'3','2,000','Flat');
    INSERT INTO mho_windstorm_or_hail_deductible_code VALUES(5,'4','5,000','Flat');
    INSERT INTO mho_windstorm_or_hail_deductible_code VALUES(6,'6','1%','Percentage');
    INSERT INTO mho_windstorm_or_hail_deductible_code VALUES(7,'7','2%','Percentage');
    INSERT INTO mho_windstorm_or_hail_deductible_code VALUES(8,'8','5%','Percentage');
    INSERT INTO mho_windstorm_or_hail_deductible_code VALUES(9,'9','10%','Percentage');
    INSERT INTO mho_windstorm_or_hail_deductible_code VALUES(10,'N','Wind/Hail Coverage is Excluded from the Policy','Flat and Percentage');
    INSERT INTO mho_windstorm_or_hail_deductible_code VALUES(11,'A','250 (Where Applicable)','Flat');
    INSERT INTO mho_windstorm_or_hail_deductible_code VALUES(12,'B','2,500','Flat');
    INSERT INTO mho_windstorm_or_hail_deductible_code VALUES(13,'D','3,000','Flat');
    INSERT INTO mho_windstorm_or_hail_deductible_code VALUES(14,'E','4,000','Flat');
    INSERT INTO mho_windstorm_or_hail_deductible_code VALUES(15,'G','7,500','Flat');
    INSERT INTO mho_windstorm_or_hail_deductible_code VALUES(16,'H','10,000','Flat');
    INSERT INTO mho_windstorm_or_hail_deductible_code VALUES(17,'R','25,000','Flat');
    INSERT INTO mho_windstorm_or_hail_deductible_code VALUES(18,'S','50,000','Flat');
    INSERT INTO mho_windstorm_or_hail_deductible_code VALUES(19,'T','75,000','Flat');
    INSERT INTO mho_windstorm_or_hail_deductible_code VALUES(20,'F','All Other Flat Windstorm or Hail Deductibles','Flat');
    INSERT INTO mho_windstorm_or_hail_deductible_code VALUES(21,'C','3%','Percentage');
    INSERT INTO mho_windstorm_or_hail_deductible_code VALUES(22,'J','4%','Percentage');
    INSERT INTO mho_windstorm_or_hail_deductible_code VALUES(23,'K','7%','Percentage');
    INSERT INTO mho_windstorm_or_hail_deductible_code VALUES(24,'P','All Other Percentage Windstorm or Hail Deductibles','Percentage');
END IF;
END $$;
