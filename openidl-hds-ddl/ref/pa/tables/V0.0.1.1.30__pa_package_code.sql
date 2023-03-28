
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS pa_package_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date date not null default '1900-01-01',
    expiration_date date not null default '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM pa_package_code) THEN 
    INSERT INTO pa_package_code VALUES(1,'0','Auto coverage written as a separate policy and not an endorsement to another policy.');
    INSERT INTO pa_package_code VALUES(2,'7','Auto coverage written as an endorsement to a CMP, CPP or BOP policy.');
    INSERT INTO pa_package_code VALUES(3,'9','Auto coverage written as an endorsement to any other type of policy.');
END IF;
END $$;
