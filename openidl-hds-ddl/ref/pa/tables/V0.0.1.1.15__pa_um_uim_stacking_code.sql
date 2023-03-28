
DO $$
BEGIN
CREATE TABLE IF NOT EXISTS pa_um_uim_stacking_code (
    id INT
    code VARCHAR
    description VARCHAR,
    effective_date date not null default '1900-01-01',
    expiration_date date not null default '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM pa_um_uim_stacking_code) THEN 
    INSERT INTO pa_um_uim_stacking_code VALUES(1,'1','UM and/or UIM limits stacked (per vehicle)');
    INSERT INTO pa_um_uim_stacking_code VALUES(2,'2','UM and/or UIM limits non-stacked (per policy)');
END IF;
END $$
