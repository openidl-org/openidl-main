
DO $$
BEGIN
CREATE TABLE IF NOT EXISTS ca_um_uim_stacking_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_um_uim_stacking_code) THEN 
    INSERT INTO ca_um_uim_stacking_code VALUES(1,'1','UM and/or UIM limits stacked (per vehicle)');
    INSERT INTO ca_um_uim_stacking_code VALUES(2,'2','UM and/or UIM limits non-stacked (per policy)');
END IF;
END $$
