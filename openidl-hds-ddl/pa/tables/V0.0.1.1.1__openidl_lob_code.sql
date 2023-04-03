DO $$

BEGIN

CREATE TABLE IF NOT EXISTS openidl_lob_code (
    id INT,
    name VARCHAR,
    code VARCHAR,
    description VARCHAR,
	aais_code varchar,
	aais_subline varchar,
	effective_date date not null default '1900-01-01',
    expiration_date date not null default '9999-12-31'
);
IF NOT EXISTS (SELECT * FROM openidl_lob_code) THEN
    INSERT INTO openidl_lob_code(id,name,aais_code,aais_subline) VALUES(1,'Personal Auto','56','1');
    INSERT INTO openidl_lob_code(id,name,aais_code,aais_subline) VALUES(2,'Commercial Auto','56','2');
END IF;

END $$

