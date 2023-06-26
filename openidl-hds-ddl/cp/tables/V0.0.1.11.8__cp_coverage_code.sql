
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cp_coverage_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cp_coverage_code) THEN 
    INSERT INTO cp_coverage_code VALUES(1,'11','Building');
    INSERT INTO cp_coverage_code VALUES(2,'12','Personal Property');
    INSERT INTO cp_coverage_code VALUES(3,'13','Building and Personal Property Combined');
    INSERT INTO cp_coverage_code VALUES(4,'35','Fire Peril - Contents Susceptibility Group A - Low');
    INSERT INTO cp_coverage_code VALUES(5,'36','Fire Peril - Contents Susceptibility Group B - High');
    INSERT INTO cp_coverage_code VALUES(6,'37','Fire Peril - Contents Susceptibility Group C - Average');
    INSERT INTO cp_coverage_code VALUES(7,'40','Time Element - All Other');
    INSERT INTO cp_coverage_code VALUES(8,'41','Time Element - Income coverage (earnings and extra expense combined)');
    INSERT INTO cp_coverage_code VALUES(9,'43','Time Element - Extra expense');
    INSERT INTO cp_coverage_code VALUES(10,'44','Time Element - Income coverage (a.k.a. business income with extra expense) options: Earnings including rents and extra expense');
    INSERT INTO cp_coverage_code VALUES(11,'45','Time Element - Income coverage (a.k.a. business income with extra expense) options: Earnings other than rents and extra expense');
    INSERT INTO cp_coverage_code VALUES(12,'46','Time Element - Income coverage (a.k.a. business income with extra expense) options: Rents and extra expense');
    INSERT INTO cp_coverage_code VALUES(13,'47','Time Element - Earnings coverage (a.k.a. business income without extra expense) options: Earnings including rents');
    INSERT INTO cp_coverage_code VALUES(14,'48','Time Element - Earnings coverage (a.k.a. business income without extra expense) options: Earnings other than rents');
    INSERT INTO cp_coverage_code VALUES(15,'49','Time Element - Earnings coverage (a.k.a. business income without extra expense) options: Rents only');
    INSERT INTO cp_coverage_code VALUES(16,'70','Stock');
    INSERT INTO cp_coverage_code VALUES(17,'71','Computers');
    INSERT INTO cp_coverage_code VALUES(18,'72','Mobile Equipment');
    INSERT INTO cp_coverage_code VALUES(19,'73','Hay, Straw, and Fodder Coverage');
    INSERT INTO cp_coverage_code VALUES(20,'74','Livestock Coverage');
    INSERT INTO cp_coverage_code VALUES(21,'75','Poultry Coverage');
    INSERT INTO cp_coverage_code VALUES(22,'99','All Other');
    INSERT INTO cp_coverage_code VALUES(23,'00','Does Not Apply');
END IF;
END $$;
