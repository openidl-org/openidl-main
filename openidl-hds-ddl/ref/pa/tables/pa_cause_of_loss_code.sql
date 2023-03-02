DO $$
BEGIN 

CREATE TABLE IF NOT EXISTS pa_cause_of_loss (
    id INT,
    fk_coverage_code_id INT,
    loss_code VARCHAR,
    description varchar
);

IF NOT EXISTS (select * from pa_cause_of_loss) THEN
    INSERT INTO pa_cause_of_loss VALUES (1,1,2,'Death Limit Claim (New York only)');
    INSERT INTO pa_cause_of_loss VALUES (2,1,13,'Bodily Injury');
    INSERT INTO pa_cause_of_loss VALUES (3,2,2,'Property Damage');
    INSERT INTO pa_cause_of_loss VALUES (4,3,1,'Bodily Injury');
    INSERT INTO pa_cause_of_loss VALUES (5,3,2,'Property Damage');
    INSERT INTO pa_cause_of_loss VALUES (6,4,1,'Medical Expenses — Basic');
    INSERT INTO pa_cause_of_loss VALUES (7,4,2,'Loss of Income — Basic');
    INSERT INTO pa_cause_of_loss VALUES (8,4,3,'Survivors Benefits — Basic');
    INSERT INTO pa_cause_of_loss VALUES (9,4,4,'Funeral Expenses — Basic');
    INSERT INTO pa_cause_of_loss VALUES (10,4,5,'Medical Expenses — Excess');
    INSERT INTO pa_cause_of_loss VALUES (11,4,6,'Loss of Income — Excess');
    INSERT INTO pa_cause_of_loss VALUES (12,4,8,'All Other — Excess');
    INSERT INTO pa_cause_of_loss VALUES (13,4,9,'All Other — Basic');
    INSERT INTO pa_cause_of_loss VALUES (14,5,1,'Medical Payments');
    INSERT INTO pa_cause_of_loss VALUES (15,6,1,'Bodily Injury');
    INSERT INTO pa_cause_of_loss VALUES (16,6,2,'Property Damage');
    INSERT INTO pa_cause_of_loss VALUES (17,6,3,'Bodily Injury');
    INSERT INTO pa_cause_of_loss VALUES (18,6,4,'Property Damage');
    INSERT INTO pa_cause_of_loss VALUES (19,6,5,'Other than death limit claims (New York only)');
    INSERT INTO pa_cause_of_loss VALUES (20,6,6,'Death limit claims (New York only)');
    INSERT INTO pa_cause_of_loss VALUES (21,6,7,'Voluntary Coverage (Risk state = NY) (NY only)');
    INSERT INTO pa_cause_of_loss VALUES (22,6,8,'All Other');
    INSERT INTO pa_cause_of_loss VALUES (23,6,9,'All Other');
    INSERT INTO pa_cause_of_loss VALUES (24,9,1,'Collision');
    INSERT INTO pa_cause_of_loss VALUES (25,10,0,'Personal Effects');
    INSERT INTO pa_cause_of_loss VALUES (26,10,1,'Fire');
    INSERT INTO pa_cause_of_loss VALUES (27,10,2,'Theft');
    INSERT INTO pa_cause_of_loss VALUES (28,10,3,'Vandalism');
    INSERT INTO pa_cause_of_loss VALUES (29,10,4,'Glass Breakage');
    INSERT INTO pa_cause_of_loss VALUES (30,10,5,'Wind and Hail');
    INSERT INTO pa_cause_of_loss VALUES (31,10,6,'Earthquake');
    INSERT INTO pa_cause_of_loss VALUES (32,10,7,'Water');
    INSERT INTO pa_cause_of_loss VALUES (33,10,8,'Towing and Labor or Other Transportation');
    INSERT INTO pa_cause_of_loss VALUES (34,10,9,'All Other');
    INSERT INTO pa_cause_of_loss VALUES (35,12,9,'Any Cause of Loss for Coverage Code 9');
    INSERT INTO pa_cause_of_loss VALUES (36,7,1,'Bodily Injury');
    INSERT INTO pa_cause_of_loss VALUES (37,7,2,'Property Damage');
    INSERT INTO pa_cause_of_loss VALUES (38,7,5,'Other than death limit claims (New York only)');
    INSERT INTO pa_cause_of_loss VALUES (39,7,6,'Death limit claims (New York only)');
    INSERT INTO pa_cause_of_loss VALUES (40,7,7,'Voluntary Coverage (Risk state = NY) (NY only)');
    INSERT INTO pa_cause_of_loss VALUES (41,7,8,'All Other');
    INSERT INTO pa_cause_of_loss VALUES (42,8,3,'Bodily Injury');
    INSERT INTO pa_cause_of_loss VALUES (43,8,4,'Property Damage');
    INSERT INTO pa_cause_of_loss VALUES (44,8,9,'All Other');
    INSERT INTO pa_cause_of_loss VALUES (45,11,0,'Personal Effects');
    INSERT INTO pa_cause_of_loss VALUES (46,11,1,'Fire');
    INSERT INTO pa_cause_of_loss VALUES (47,11,2,'Theft');
    INSERT INTO pa_cause_of_loss VALUES (48,11,3,'Vandalism');
    INSERT INTO pa_cause_of_loss VALUES (49,11,4,'Glass Breakage');
    INSERT INTO pa_cause_of_loss VALUES (50,11,5,'Wind and Hail');
    INSERT INTO pa_cause_of_loss VALUES (51,11,6,'Earthquake');
    INSERT INTO pa_cause_of_loss VALUES (52,11,7,'Water');
    INSERT INTO pa_cause_of_loss VALUES (53,11,8,'Towing and Labor or Other Transportation');
    INSERT INTO pa_cause_of_loss VALUES (54,11,9,'All Other');
    INSERT INTO pa_cause_of_loss VALUES (55,19,1,'Medical Expenses');
    INSERT INTO pa_cause_of_loss VALUES (56,19,2,'Loss of Income');
    INSERT INTO pa_cause_of_loss VALUES (57,19,3,'Survivors Benefits');
    INSERT INTO pa_cause_of_loss VALUES (58,19,4,'Funeral Expenses');
    INSERT INTO pa_cause_of_loss VALUES (59,20,1,'Medical Expenses');
    INSERT INTO pa_cause_of_loss VALUES (60,20,2,'Loss of Income');
    INSERT INTO pa_cause_of_loss VALUES (61,20,3,'Survivors Benefits');
    INSERT INTO pa_cause_of_loss VALUES (62,20,4,'Funeral Expenses');
    INSERT INTO pa_cause_of_loss VALUES (63,21,1,'Medical Expenses');
    INSERT INTO pa_cause_of_loss VALUES (64,21,2,'Loss of Income');
    INSERT INTO pa_cause_of_loss VALUES (65,21,3,'Survivors Benefits');
    INSERT INTO pa_cause_of_loss VALUES (66,21,4,'Funeral Expenses');
    INSERT INTO pa_cause_of_loss VALUES (67,22,1,'Medical Expenses');
    INSERT INTO pa_cause_of_loss VALUES (68,22,2,'Loss of Income');
    INSERT INTO pa_cause_of_loss VALUES (69,22,3,'Survivors Benefits');
    INSERT INTO pa_cause_of_loss VALUES (70,22,4,'Funeral Expenses');
    INSERT INTO pa_cause_of_loss VALUES (71,23,1,'Medical Expenses');
    INSERT INTO pa_cause_of_loss VALUES (72,23,2,'Loss of Income');
    INSERT INTO pa_cause_of_loss VALUES (73,23,3,'Survivors Benefits');
    INSERT INTO pa_cause_of_loss VALUES (74,23,4,'Funeral Expenses');
    INSERT INTO pa_cause_of_loss VALUES (75,24,1,'Medical Expenses');
    INSERT INTO pa_cause_of_loss VALUES (76,24,2,'Loss of Income');
    INSERT INTO pa_cause_of_loss VALUES (77,24,3,'Survivors Benefits');
    INSERT INTO pa_cause_of_loss VALUES (78,24,4,'Funeral Expenses');
    INSERT INTO pa_cause_of_loss VALUES (79,25,1,'Medical Expenses');
    INSERT INTO pa_cause_of_loss VALUES (80,25,2,'Loss of Income');
    INSERT INTO pa_cause_of_loss VALUES (81,25,3,'Survivors Benefits');
    INSERT INTO pa_cause_of_loss VALUES (82,25,4,'Funeral Expenses');
    INSERT INTO pa_cause_of_loss VALUES (83,26,1,'Medical Expenses');
    INSERT INTO pa_cause_of_loss VALUES (84,26,2,'Loss of Income');
    INSERT INTO pa_cause_of_loss VALUES (85,26,3,'Survivors Benefits');
    INSERT INTO pa_cause_of_loss VALUES (86,26,4,'Funeral Expenses');
    INSERT INTO pa_cause_of_loss VALUES (87,27,1,'Medical Expenses');
    INSERT INTO pa_cause_of_loss VALUES (88,27,2,'Loss of Income');
    INSERT INTO pa_cause_of_loss VALUES (89,27,3,'Survivors Benefits');
    INSERT INTO pa_cause_of_loss VALUES (90,27,4,'Funeral Expenses');
    INSERT INTO pa_cause_of_loss VALUES (91,28,1,'Medical Expenses');
    INSERT INTO pa_cause_of_loss VALUES (92,28,2,'Loss of Income');
    INSERT INTO pa_cause_of_loss VALUES (93,28,3,'Survivors Benefits');
    INSERT INTO pa_cause_of_loss VALUES (94,28,4,'Funeral Expenses');
    INSERT INTO pa_cause_of_loss VALUES (95,29,1,'Medical Expenses');
    INSERT INTO pa_cause_of_loss VALUES (96,29,2,'Loss of Income');
    INSERT INTO pa_cause_of_loss VALUES (97,29,3,'Survivors Benefits');
    INSERT INTO pa_cause_of_loss VALUES (98,29,4,'Funeral Expenses');
    INSERT INTO pa_cause_of_loss VALUES (99,30,1,'Medical Expenses');
    INSERT INTO pa_cause_of_loss VALUES (100,30,2,'Loss of Income');
    INSERT INTO pa_cause_of_loss VALUES (101,30,3,'Survivors Benefits');
    INSERT INTO pa_cause_of_loss VALUES (102,30,4,'Funeral Expenses');
    INSERT INTO pa_cause_of_loss VALUES (103,31,1,'Medical Expenses');
    INSERT INTO pa_cause_of_loss VALUES (104,31,2,'Loss of Income');
    INSERT INTO pa_cause_of_loss VALUES (105,31,3,'Survivors Benefits');
    INSERT INTO pa_cause_of_loss VALUES (106,31,4,'Funeral Expenses');
    INSERT INTO pa_cause_of_loss VALUES (107,32,1,'Medical Expenses');
    INSERT INTO pa_cause_of_loss VALUES (108,32,2,'Loss of Income');
    INSERT INTO pa_cause_of_loss VALUES (109,32,3,'Survivors Benefits');
    INSERT INTO pa_cause_of_loss VALUES (110,32,4,'Funeral Expenses');
END IF;

END $$
