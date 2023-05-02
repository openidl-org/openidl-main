
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ho_windstorm_or_hail_deductible_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ho_windstorm_or_hail_deductible_code) THEN 
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(1,'0','Does Not Apply','Flat');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(2,'1','500','Flat');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(3,'2','1,000','Flat');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(4,'3','2,000','Flat');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(5,'4','5,000','Flat');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(6,'N','Wind/Hail Coverage is Excluded from the Policy','Flat');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(7,'A','250 (Where Applicable)','Flat');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(8,'B','2,500','Flat');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(9,'D','3,000','Flat');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(10,'E','4,000','Flat');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(11,'G','7,500','Flat');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(12,'H','10,000','Flat');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(13,'R','25,000','Flat');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(14,'S','50,000','Flat');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(15,'T','75,000','Flat');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(16,'F','All Other Flat Windstorm or Hail Deductibles','Flat');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(17,'0','Does not apply','Percentage');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(18,'6','1%','Percentage');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(19,'7','2%','Percentage');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(20,'8','5%','Percentage');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(21,'9','10%','Percentage');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(22,'N','Wind/Hail Coverage is Excluded from the Policy','Percentage');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(23,'C','3%','Percentage');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(24,'J','4%','Percentage');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(25,'K','7%','Percentage');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(26,'P','All Other Percentage Windstorm or Hail Deductibles','Percentage');
END IF;
END $$;
