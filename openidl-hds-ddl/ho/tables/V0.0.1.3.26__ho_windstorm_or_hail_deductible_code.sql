
DO $$
BEGIN
CREATE TABLE IF NOT EXISTS ho_windstorm_or_hail_deductible_code (
    id INT,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM ho_windstorm_or_hail_deductible_code) THEN 
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(1,'0','Does not apply');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(2,'1','500');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(3,'2','1,000');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(4,'3','2,000');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(5,'4','5,000');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(6,'6','1%');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(7,'7','2%');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(8,'8','5%');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(9,'9','10%');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(10,'N','Wind/Hail coverage is excluded from the policy');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(11,'A','250 (where applicable)');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(12,'B','2,500');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(13,'D','3,000');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(14,'E','4,000');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(15,'G','7,500');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(16,'H','10,000');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(17,'R','25,000');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(18,'S','50,000');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(19,'T','75,000');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(20,'F','All other flat windstorm or hail deductibles');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(21,'C','3%');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(22,'J','4%');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(23,'K','7%');
    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(24,'P','All other percentage windstorm or hail deductibles');
END IF;
END $$;
