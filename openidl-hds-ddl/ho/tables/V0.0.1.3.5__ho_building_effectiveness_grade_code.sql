
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ho_building_effectiveness_grade_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ho_building_effectiveness_grade_code) THEN 
    INSERT INTO ho_building_effectiveness_grade_code VALUES(1,'0','Does Not Apply');
    INSERT INTO ho_building_effectiveness_grade_code VALUES(2,'1','Community not graded (excluding communities in the state of Florida declining to participate in the building code process)');
    INSERT INTO ho_building_effectiveness_grade_code VALUES(3,'2','Community declines to participate in the building code process (Florida only)');
    INSERT INTO ho_building_effectiveness_grade_code VALUES(4,'A','Building constructed prior to enforcement of community grading');
    INSERT INTO ho_building_effectiveness_grade_code VALUES(5,'B','1');
    INSERT INTO ho_building_effectiveness_grade_code VALUES(6,'C','2');
    INSERT INTO ho_building_effectiveness_grade_code VALUES(7,'D','3');
    INSERT INTO ho_building_effectiveness_grade_code VALUES(8,'E','4');
    INSERT INTO ho_building_effectiveness_grade_code VALUES(9,'F','5');
    INSERT INTO ho_building_effectiveness_grade_code VALUES(10,'G','6');
    INSERT INTO ho_building_effectiveness_grade_code VALUES(11,'H','7');
    INSERT INTO ho_building_effectiveness_grade_code VALUES(12,'J','8');
    INSERT INTO ho_building_effectiveness_grade_code VALUES(13,'K','9');
    INSERT INTO ho_building_effectiveness_grade_code VALUES(14,'L','10');
    INSERT INTO ho_building_effectiveness_grade_code VALUES(15,'M','1');
    INSERT INTO ho_building_effectiveness_grade_code VALUES(16,'N','2');
    INSERT INTO ho_building_effectiveness_grade_code VALUES(17,'P','3');
    INSERT INTO ho_building_effectiveness_grade_code VALUES(18,'R','4');
    INSERT INTO ho_building_effectiveness_grade_code VALUES(19,'S','5');
    INSERT INTO ho_building_effectiveness_grade_code VALUES(20,'T','6');
    INSERT INTO ho_building_effectiveness_grade_code VALUES(21,'U','7');
    INSERT INTO ho_building_effectiveness_grade_code VALUES(22,'W','8');
    INSERT INTO ho_building_effectiveness_grade_code VALUES(23,'X','9');
    INSERT INTO ho_building_effectiveness_grade_code VALUES(24,'Y','10');
END IF;
END $$;
