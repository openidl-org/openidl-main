
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS mho_ordinance_or_law_coverage_code (
    id INT,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM mho_ordinance_or_law_coverage_code) THEN 
    INSERT INTO mho_ordinance_or_law_coverage_code VALUES(1,'0','Does Not Apply');
    INSERT INTO mho_ordinance_or_law_coverage_code VALUES(2,'1','No Ordinance or Law Coverage is provided within the basic form used to write the policy AND/OR increased costs resulting from ordinance or law are excluded and NO optional ordinance or law endorsement is attached to the policy');
    INSERT INTO mho_ordinance_or_law_coverage_code VALUES(3,'2','Ordinance or Law Coverage is provided within the basic form used to write the policy, but an optional ordinance or law endorsement is NOT attached to the policy');
    INSERT INTO mho_ordinance_or_law_coverage_code VALUES(4,'3','An ordinance or law endorsement has been attached to the policy that provides Ordinance or Law Coverage within the policy limits (not a separate additional limit)');
    INSERT INTO mho_ordinance_or_law_coverage_code VALUES(5,'4','An ordinance or law endorsement has been attached to the policy bringing TOTAL Ordinance or Law Limit Equal to 10% of Coverage A# amount');
    INSERT INTO mho_ordinance_or_law_coverage_code VALUES(6,'5','An ordinance or law endorsement has been attached to the policy bringing TOTAL Ordinance or Law Limit Equal to 25% of Coverage A# amount');
    INSERT INTO mho_ordinance_or_law_coverage_code VALUES(7,'6','An ordinance or law endorsement has been attached to the policy bringing TOTAL Ordinance or Law Limit Equal to 50% of Coverage A# amount');
    INSERT INTO mho_ordinance_or_law_coverage_code VALUES(8,'7','An ordinance or law endorsement has been attached to the policy bringing TOTAL Ordinance or Law Limit Equal to 75% of Coverage A# amount');
    INSERT INTO mho_ordinance_or_law_coverage_code VALUES(9,'8','An ordinance or law endorsement has been attached to the policy bringing TOTAL Ordinance or Law Limit Equal to 100% of Coverage A# amount');
    INSERT INTO mho_ordinance_or_law_coverage_code VALUES(10,'9','An ordinance or law endorsement has been attached to the policy bringing TOTAL Ordinance or Law Limit Greater Than 100% of Coverage A# amount');
    INSERT INTO mho_ordinance_or_law_coverage_code VALUES(11,'A','Any level of Ordinance or Law Coverage which includes coverage for increased costs to respond to pollutants');
END IF;
END $$;
