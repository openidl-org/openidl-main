DO $$ 
BEGIN

CREATE TABLE IF NOT EXISTS pa_coverage_category (
    id INT
    name VARCHAR,
    description VARCHAR,
);


CREATE TABLE IF NOT EXISTS pa_coverage_code (
    id INT
    code VARCHAR,
    name VARCHAR,
    fk_coverage_category_id VARCHAR,
    fk_state_id int, 
);


CREATE TABLE IF NOT EXISTS pa_state_coverage_code (
    id INT
    fk_coverage_code int,
    fk_state_id INT
);


INSERT INTO pa_coverage_category (id, name) VALUES (1, 'Liability');
INSERT INTO pa_coverage_category (id, name) VALUES (2, 'Physical Damage Coverages');
INSERT INTO pa_coverage_category (id, name) VALUES (3, 'All Other Property and Liability Coverages');
INSERT INTO pa_coverage_category (id, name) VALUES (4, 'Penn Policies Not Subject to Workers Compensation First Party Benefits Coverage');
INSERT INTO pa_coverage_category (id, name) VALUES (5, 'Penn Policies Subject to Workers Compensation First Party Benefits Coverage');

INSERT INTO pa_coverage_code VALUES (1,'1','Bodily Injury Liability',1);
INSERT INTO pa_coverage_code VALUES (2,'2','Property Damage Liability',1);
INSERT INTO pa_coverage_code VALUES (3,'3','Bodily Injury and Property Damage Liability — Indivisible Premium',1);
INSERT INTO pa_coverage_code VALUES (4,'4','Personal Injury Protection',1);
INSERT INTO pa_coverage_code VALUES (5,'5','Medical Payments',1);
INSERT INTO pa_coverage_code VALUES (6,'6','Uninsured/Underinsured Motorists — Indivisible Premium',1);
INSERT INTO pa_coverage_code VALUES (7,'X','Uninsured Motorist',1);
INSERT INTO pa_coverage_code VALUES (8,'Y','Underinsured Motorist',1);
INSERT INTO pa_coverage_code VALUES (9,'7','Physical Damage — Collision',2);
INSERT INTO pa_coverage_code VALUES (10,'8','Physical Damage — Other Than Collision',2);
INSERT INTO pa_coverage_code VALUES (11,'T','Physical Damage — Other Than Collision — Additional Coverage Records',2); 
INSERT INTO pa_coverage_code VALUES (12,'9','All Other Property and Liability Coverages',3);

--AR
INSERT INTO pa_coverage_code VALUES (13,'3','Bodily Injury and Property Damage Liability Combined',1,3);
INSERT INTO pa_coverage_code VALUES (14,'S','Medical Benefits',1,3);
INSERT INTO pa_coverage_code VALUES (15,'U','Loss of Income',3,3);
INSERT INTO pa_coverage_code VALUES (16,'V','Accidental Death',3,3);

-- Penn
INSERT INTO pa_coverage_code VALUES (17,'3','Bodily Injury and Property Damage Liability Combined',1,37);
INSERT INTO pa_coverage_code VALUES (18,'5',' Extraordinary Medical Payments',1,37);

INSERT INTO pa_coverage_code VALUES (19,'A','Medical Benefits',4);
INSERT INTO pa_coverage_code VALUES (20,'B','Medical Benefits plus any Funeral Benefits Limit',4,37);
INSERT INTO pa_coverage_code VALUES (21,'C','Loss of Income',4,37);
INSERT INTO pa_coverage_code VALUES (22,'D','Death Benefit',4,37);
INSERT INTO pa_coverage_code VALUES (23,'E','Funeral Benefit',4,37);
INSERT INTO pa_coverage_code VALUES (24,'F','Combined First Party Benefits',4,37);
INSERT INTO pa_coverage_code VALUES (25,'G','Combined First Party Benefits - Indivisible Premium Policies',4,37);

INSERT INTO pa_coverage_code VALUES (26,'J','Medical Benefits',5,37);
INSERT INTO pa_coverage_code VALUES (27,'K','Medical Benefits plus any Funeral Benefits Limit',5,37);
INSERT INTO pa_coverage_code VALUES (28,'L','Loss of Income',5,37);
INSERT INTO pa_coverage_code VALUES (29,'M','Death Benefit',5,37);
INSERT INTO pa_coverage_code VALUES (30,'N','Funeral Benefit',5,37);
INSERT INTO pa_coverage_code VALUES (31,'P','Combined First Party Benefits',5,37);
INSERT INTO pa_coverage_code VALUES (32,'R','Combined First Party Benefits - Indivisible Premium Policies',5,37);