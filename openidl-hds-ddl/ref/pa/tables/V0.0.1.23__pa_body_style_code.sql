DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS pa_body_style_code (
    id INT,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM pa_body_style_code) THEN 
INSERT INTO pa_body_style_code (id, code, description) VALUES( 1,'01','Sedan (2 or 4 door)*' );
INSERT INTO pa_body_style_code VALUES( 2,'02','Station Wagon' );
INSERT INTO pa_body_style_code VALUES( 3,'03','Convertible' );
INSERT INTO pa_body_style_code VALUES( 4,'04','Vans — Passenger' );
INSERT INTO pa_body_style_code VALUES( 5,'05','Vans — Cargo' );
INSERT INTO pa_body_style_code VALUES( 6,'06','Pick-Up or Panel Truck' );
INSERT INTO pa_body_style_code VALUES( 7,'07','Buses' );
INSERT INTO pa_body_style_code VALUES( 8,'08','Truck (Not including Truck Tractors or Dump Trucks)' );
INSERT INTO pa_body_style_code VALUES( 9,'09','Motor Homes and Auto Homes (self-propelled)' );
INSERT INTO pa_body_style_code VALUES( 10,'10','Campers and Travel Trailers' );
INSERT INTO pa_body_style_code VALUES( 11,'11','Dune Buggies' );
INSERT INTO pa_body_style_code VALUES( 12,'12','All Terrain Vehicles' );
INSERT INTO pa_body_style_code VALUES( 13,'13','Antique Autos' );
INSERT INTO pa_body_style_code VALUES( 14,'14','Amphibious Autos' );
INSERT INTO pa_body_style_code VALUES( 15,'15','Snowmobiles' );
INSERT INTO pa_body_style_code VALUES( 16,'16','Golf Carts' );
INSERT INTO pa_body_style_code VALUES( 17,'17','Motorcycles, Motorscooters, Motorbikes, Trail Bikes and Mopeds' );
INSERT INTO pa_body_style_code VALUES( 18,'18','Named Non-owner' );
INSERT INTO pa_body_style_code VALUES( 19,'19','Sedan 2-door' );
INSERT INTO pa_body_style_code VALUES( 20,'20','Sedan 4-door' );
INSERT INTO pa_body_style_code VALUES( 21,'21','Semitrailer' );
INSERT INTO pa_body_style_code VALUES( 22,'22','Trailer' );
INSERT INTO pa_body_style_code VALUES( 23,'23','Trailer - Service or Utility' );
INSERT INTO pa_body_style_code VALUES( 24,'24','Truck Tractor (Including Semitractors)' );
INSERT INTO pa_body_style_code VALUES( 25,'25','Dump Trucks' );
INSERT INTO pa_body_style_code VALUES( 26,'30','Taxis, Limousines or Van Pools' );
INSERT INTO pa_body_style_code VALUES( 27,'99','All Other' );
END IF;

END $$;