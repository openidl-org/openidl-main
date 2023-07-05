
DO $$
BEGIN
CREATE TABLE IF NOT EXISTS fo_pool_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM fo_pool_code) THEN 
    INSERT INTO fo_pool_code VALUES(1,'0','Not Written in a Pool or FAIR Plan, and Not a Shared Risk');
    INSERT INTO fo_pool_code VALUES(2,'1','State Approved FAIR Plan');
    INSERT INTO fo_pool_code VALUES(3,'2','Shared Risk or Contributing Insurance Endorsement Attached');
END IF;
END $$;
