
DO $$
BEGIN
CREATE TABLE IF NOT EXISTS ho_mold_damage_coverage_code (
    id INT,
    code VARCHAR,
    property VARCHAR,
    liability VARCHAR,
    notes VARCHAR
);

IF NOT EXISTS (SELECT * FROM ho_mold_damage_coverage_code) THEN 
    INSERT INTO ho_mold_damage_coverage_code VALUES(1,'0','Does Not Apply','Does Not Apply','N/A');
    INSERT INTO ho_mold_damage_coverage_code VALUES(2,'1','$10,000 (basic)','$50,000 (basic)','N/A');
    INSERT INTO ho_mold_damage_coverage_code VALUES(3,'2','$10,000 (basic)','$100,000','N/A');
    INSERT INTO ho_mold_damage_coverage_code VALUES(4,'3','$25,000','$50,000 (basic)','N/A');
    INSERT INTO ho_mold_damage_coverage_code VALUES(5,'4','$25,000','$100,000','N/A');
    INSERT INTO ho_mold_damage_coverage_code VALUES(6,'5','$50,000','$50,000 (basic)','N/A');
    INSERT INTO ho_mold_damage_coverage_code VALUES(7,'6','$50,000','$100,000','N/A');
    INSERT INTO ho_mold_damage_coverage_code VALUES(8,'7','All Other Property and Liability Coverage Combinations','All Other Property and Liability Coverage Combinations','N/A');
    INSERT INTO ho_mold_damage_coverage_code VALUES(9,'8','Total exclusion of fungi, wet rot, dry rot or bacteria (mold)','Total exclusion of fungi, wet rot, dry rot or bacteria (mold)','N/A');
    INSERT INTO ho_mold_damage_coverage_code VALUES(10,'9','No exclusion or limitation for fungi, wet rot, dry rot, or bacteria (mold) arising from a peril insured against','No exclusion or limitation for fungi, wet rot, dry rot, or bacteria (mold) arising from a peril insured against','N/A');
    INSERT INTO ho_mold_damage_coverage_code VALUES(11,'A','$20,000 (basic)','policy limit','New York State Only');
    INSERT INTO ho_mold_damage_coverage_code VALUES(12,'B','$50,000','policy limit','New York State Only');
END IF;
END $$;
