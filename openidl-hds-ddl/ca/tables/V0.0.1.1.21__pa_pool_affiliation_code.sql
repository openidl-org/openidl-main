
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS pa_pool_affiliation_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM pa_pool_affiliation_code) THEN 
    INSERT INTO pa_pool_affiliation_code VALUES(1,'1','Preferred Risk');
    INSERT INTO pa_pool_affiliation_code VALUES(2,'3','Standard risk not written in a pool, JUA or assigned risk facility, etc., and not shared with another company.');
    INSERT INTO pa_pool_affiliation_code VALUES(3,'4','Standard risk written in a pool, JUA or assigned risk facility, etc.');
    INSERT INTO pa_pool_affiliation_code VALUES(4,'5','Substandard risk not written in a pool, JUA or assigned risk facility, etc., and not shared with another company.');
    INSERT INTO pa_pool_affiliation_code VALUES(5,'6','Substandard risk written in a pool, JUA or assigned risk facility, etc.');
    INSERT INTO pa_pool_affiliation_code VALUES(6,'7','Servicing carrier');
END IF;
END $$;
