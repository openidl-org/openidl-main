
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cp_windstorm_or_hail_deductible_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cp_windstorm_or_hail_deductible_code) THEN 
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(1,'0','Does Not Apply','Does Not Apply');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(2,'1','$500','Flat');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(3,'2','$1,000','Flat');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(4,'3','$2,000','Flat');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(5,'4','$5,000','Flat');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(6,'6','1%','Percentage');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(7,'7','2%','Percentage');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(8,'8','5%','Percentage');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(9,'9','10%','Percentage');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(10,'N','Wind/Hail coverage exclusion - Total (Loss caused by the peril of windstorm or hail can be excluded under Coverages A, B, and C)','Does Not Apply');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(11,'M','Wind/Hail coverage exclusion - Direct Damage (Loss caused by the peril of windstorm or hail can be excluded under Coverages A and B)','Does Not Apply');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(12,'R','$250','Flat');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(13,'S','$2,500','Flat');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(14,'A','$3,000','Flat');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(15,'T','$4,000','Flat');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(16,'G','$7,500','Flat');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(17,'B','$10,000','Flat');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(18,'C','$25,000','Flat');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(19,'D','$50,000','Flat');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(20,'E','$75,000','Flat');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(21,'H','All Other Flat Windstorm or Hail Deductibles','Flat');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(22,'F','3%','Percentage');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(23,'J','4%','Percentage');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(24,'K','7%','Percentage');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(25,'P','All Other Percentage Windstorm or Hail Deductibles','Percentage');
END IF;
END $$;
