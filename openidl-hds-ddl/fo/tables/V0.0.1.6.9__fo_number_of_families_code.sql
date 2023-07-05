
DO $$
BEGIN
CREATE TABLE IF NOT EXISTS fo_number_of_families_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM fo_number_of_families_code) THEN 
    INSERT INTO fo_number_of_families_code VALUES(1, '0', 'Does Not Apply');
    INSERT INTO fo_number_of_families_code VALUES(2, '1', 'One Family');
    INSERT INTO fo_number_of_families_code VALUES(3, '2', 'Two Families');
    INSERT INTO fo_number_of_families_code VALUES(4, '3', 'Three Families');
    INSERT INTO fo_number_of_families_code VALUES(5, '4', 'Four Families');
    INSERT INTO fo_number_of_families_code VALUES(6, '5', 'Five or More Families');
END IF;
END $$;
