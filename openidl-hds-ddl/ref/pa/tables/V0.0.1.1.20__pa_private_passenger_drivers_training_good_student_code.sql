
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS pa_private_passenger_drivers_training_good_student_code (
    id INT,
    code VARCHAR,
    driversTraining VARCHAR,
    goodStudentDiscount VARCHAR,
    effective_date date not null default '1900-01-01',
    expiration_date date not null default '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM pa_private_passenger_drivers_training_good_student_code) THEN 
    INSERT INTO pa_private_passenger_drivers_training_good_student_code VALUES(1,'1','Yes','Yes');
    INSERT INTO pa_private_passenger_drivers_training_good_student_code VALUES(2,'2','Yes','No');
    INSERT INTO pa_private_passenger_drivers_training_good_student_code VALUES(3,'3','No','Yes');
    INSERT INTO pa_private_passenger_drivers_training_good_student_code VALUES(4,'4','No','No');
    INSERT INTO pa_private_passenger_drivers_training_good_student_code VALUES(5,'5','N/A','N/A');
END IF;
END $$;
