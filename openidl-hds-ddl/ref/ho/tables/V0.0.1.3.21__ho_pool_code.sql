
DO $$
BEGIN
CREATE TABLE IF NOT EXISTS ho_pool_code (
    id INT,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM ho_pool_code) THEN 
    INSERT INTO ho_pool_code VALUES(1,'0','Not written in a pool or FAIR plan, and not a shared risk OR Does Not Apply');
    INSERT INTO ho_pool_code VALUES(2,'1','State approved FAIR plan');
    INSERT INTO ho_pool_code VALUES(3,'2','Shared risk or Contributing Insurance endorsement attached: -AAIS Endorsement ML-178, HO 0178, or equivalent  -ISO Endorsement HO 04 78 or equivalent');
END IF;
END $$;