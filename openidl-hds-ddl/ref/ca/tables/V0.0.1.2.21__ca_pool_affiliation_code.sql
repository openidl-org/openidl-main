
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_pool_affiliation_code (
    id INT,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM ca_pool_affiliation_code) THEN 
    INSERT INTO ca_pool_affiliation_code VALUES(1,'1','Preferred Risk');
    INSERT INTO ca_pool_affiliation_code VALUES(2,'3','Standard risk not written in a pool, JUA or assigned risk facility, etc., and not shared with another company.');
    INSERT INTO ca_pool_affiliation_code VALUES(3,'4','Standard risk written in a pool, JUA or assigned risk facility, etc.');
    INSERT INTO ca_pool_affiliation_code VALUES(4,'5','Substandard risk not written in a pool, JUA or assigned risk facility, etc., and not shared with another company.');
    INSERT INTO ca_pool_affiliation_code VALUES(5,'6','Substandard risk written in a pool, JUA or assigned risk facility, etc.');
    INSERT INTO ca_pool_affiliation_code VALUES(6,'7','Servicing carrier');
END IF;
END $$;
