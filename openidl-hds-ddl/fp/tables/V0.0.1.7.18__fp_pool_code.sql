
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS fp_pool_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM fp_pool_code) THEN 
    INSERT INTO fp_pool_code VALUES(1,'0','Not written in a pool or FAIR plan, and not a shared risk OR Does Not Apply');
    INSERT INTO fp_pool_code VALUES(2,'1','State approved FAIR plan');
    INSERT INTO fp_pool_code VALUES(3,'2','Shared risk or Contributing Insurance endorsement attached - AAIS Endorsement FL-14 or equivalent');
END IF;
END $$;
