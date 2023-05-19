
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ho_number_of_families_code (
    id INT,
    policy_form_code VARCHAR,
    code VARCHAR,
    description VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ho_number_of_families_code) THEN 
    INSERT INTO ho_number_of_families_code VALUES (1, '84', '0', 'Does Not Apply', 'Does Not Apply');
    INSERT INTO ho_number_of_families_code VALUES (2, '84', '1', 'One through Four Families', 'Number of Families');
    INSERT INTO ho_number_of_families_code VALUES (3, '84', '2', 'Five or More Families', 'Number of Families');
    INSERT INTO ho_number_of_families_code VALUES (4, '86', '0', 'Does Not Apply', 'Does Not Apply');
    INSERT INTO ho_number_of_families_code VALUES (5, '86', '1', 'One through Four Families', 'Number of Families');
    INSERT INTO ho_number_of_families_code VALUES (6, '86', '2', 'Five or More Families', 'Number of Families');
    INSERT INTO ho_number_of_families_code VALUES (7, '01', '0', 'Does Not Apply', 'Does Not Apply');
    INSERT INTO ho_number_of_families_code VALUES (8, '01', '1', 'One Family', 'Not a Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (9, '01', '2', 'Two Families', 'Not a Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (10, '01', '3', 'Three Families', 'Not a Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (11, '01', '4', 'Four Families', 'Not a Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (12, '01', '5', 'One Unit', 'Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (13, '01', '6', 'Two Units', 'Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (14, '01', '7', 'Three/Four Units', 'Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (15, '01', '8', 'Five through Eight Units', 'Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (16, '01', '9', 'Nine or More Units', 'Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (17, '02', '0', 'Does Not Apply', 'Does Not Apply');
    INSERT INTO ho_number_of_families_code VALUES (18, '02', '1', 'One Family', 'Not a Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (19, '02', '2', 'Two Families', 'Not a Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (20, '02', '3', 'Three Families', 'Not a Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (21, '02', '4', 'Four Families', 'Not a Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (22, '02', '5', 'One Unit', 'Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (23, '02', '6', 'Two Units', 'Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (24, '02', '7', 'Three/Four Units', 'Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (25, '02', '8', 'Five through Eight Units', 'Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (26, '02', '9', 'Nine or More Units', 'Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (27, '03', '0', 'Does Not Apply', 'Does Not Apply');
    INSERT INTO ho_number_of_families_code VALUES (28, '03', '1', 'One Family', 'Not a Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (29, '03', '2', 'Two Families', 'Not a Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (30, '03', '3', 'Three Families', 'Not a Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (31, '03', '4', 'Four Families', 'Not a Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (32, '03', '5', 'One Unit', 'Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (33, '03', '6', 'Two Units', 'Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (34, '03', '7', 'Three/Four Units', 'Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (35, '03', '8', 'Five through Eight Units', 'Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (36, '03', '9', 'Nine or More Units', 'Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (37, '05', '0', 'Does Not Apply', 'Does Not Apply');
    INSERT INTO ho_number_of_families_code VALUES (38, '05', '1', 'One Family', 'Not a Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (39, '05', '2', 'Two Families', 'Not a Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (40, '05', '3', 'Three Families', 'Not a Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (41, '05', '4', 'Four Families', 'Not a Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (42, '05', '5', 'One Unit', 'Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (43, '05', '6', 'Two Units', 'Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (44, '05', '7', 'Three/Four Units', 'Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (45, '05', '8', 'Five through Eight Units', 'Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (46, '05', '9', 'Nine or More Units', 'Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (47, '08', '0', 'Does Not Apply', 'Does Not Apply');
    INSERT INTO ho_number_of_families_code VALUES (48, '08', '1', 'One Family', 'Not a Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (49, '08', '2', 'Two Families', 'Not a Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (50, '08', '3', 'Three Families', 'Not a Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (51, '08', '4', 'Four Families', 'Not a Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (52, '08', '5', 'One Unit', 'Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (53, '08', '6', 'Two Units', 'Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (54, '08', '7', 'Three/Four Units', 'Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (55, '08', '8', 'Five through Eight Units', 'Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (56, '08', '9', 'Nine or More Units', 'Townhouse');
    INSERT INTO ho_number_of_families_code VALUES (57, '04', '0', 'Does Not Apply', 'Does Not Apply');
    INSERT INTO ho_number_of_families_code VALUES (58, '04', '1', 'One through Four Families', 'Number of Families');
    INSERT INTO ho_number_of_families_code VALUES (59, '04', '2', 'Five or More Families', 'Number of Families');
    INSERT INTO ho_number_of_families_code VALUES (60, '06', '0', 'Does Not Apply', 'Does Not Apply');
    INSERT INTO ho_number_of_families_code VALUES (61, '06', '1', 'One through Four Families', 'Number of Families');
    INSERT INTO ho_number_of_families_code VALUES (62, '06', '2', 'Five or More Families', 'Number of Families');
END IF;
END $$;
