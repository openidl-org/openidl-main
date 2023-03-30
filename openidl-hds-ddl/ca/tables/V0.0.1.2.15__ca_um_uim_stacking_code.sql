
DO $$
BEGIN
CREATE TABLE IF NOT EXISTS ca_um_uim_stacking_code (
    id INT
    code VARCHAR
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM ca_um_uim_stacking_code) THEN 
    INSERT INTO ca_um_uim_stacking_code VALUES(1,'1','UM and/or UIM limits stacked (per vehicle)');
    INSERT INTO ca_um_uim_stacking_code VALUES(2,'2','UM and/or UIM limits non-stacked (per policy)');
END IF;
END $$
