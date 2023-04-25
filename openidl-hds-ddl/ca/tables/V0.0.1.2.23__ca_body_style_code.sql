
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_body_style_code (
    id INT,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM ca_body_style_code) THEN 
    INSERT INTO ca_body_style_code VALUES(1,'10','Campers and Travel Trailers');
    INSERT INTO ca_body_style_code VALUES(2,'11','Dune Buggies');
    INSERT INTO ca_body_style_code VALUES(3,'12','All Terrain Vehicles');
    INSERT INTO ca_body_style_code VALUES(4,'13','Antique Autos');
    INSERT INTO ca_body_style_code VALUES(5,'14','Amphibious Autos');
    INSERT INTO ca_body_style_code VALUES(6,'15','Snowmobiles');
    INSERT INTO ca_body_style_code VALUES(7,'16','Golf Carts');
    INSERT INTO ca_body_style_code VALUES(8,'17','Motorcycles, Motorscooters, Motorbikes, Trail Bikes and Mopeds');
    INSERT INTO ca_body_style_code VALUES(9,'18','Named Non-owner');
    INSERT INTO ca_body_style_code VALUES(10,'19','Sedan 2-door');
    INSERT INTO ca_body_style_code VALUES(11,'20','Sedan 4-door');
    INSERT INTO ca_body_style_code VALUES(12,'21','Semitrailer');
    INSERT INTO ca_body_style_code VALUES(13,'22','Trailer');
    INSERT INTO ca_body_style_code VALUES(14,'23','Trailer - Service or Utility');
    INSERT INTO ca_body_style_code VALUES(15,'24','Truck Tractor (Including Semitractors)');
    INSERT INTO ca_body_style_code VALUES(16,'25','Dump Trucks');
    INSERT INTO ca_body_style_code VALUES(17,'30','Taxis, Limousines or Van Pools');
    INSERT INTO ca_body_style_code VALUES(18,'99','All Other');
    INSERT INTO ca_body_style_code VALUES(19,'01','Sedan (2 or 4 door)*');
    INSERT INTO ca_body_style_code VALUES(20,'02','Station Wagon');
    INSERT INTO ca_body_style_code VALUES(21,'03','Convertible');
    INSERT INTO ca_body_style_code VALUES(22,'04','Vans — Passenger');
    INSERT INTO ca_body_style_code VALUES(23,'05','Vans — Cargo');
    INSERT INTO ca_body_style_code VALUES(24,'06','Pick-Up or Panel Truck');
    INSERT INTO ca_body_style_code VALUES(25,'07','Buses');
    INSERT INTO ca_body_style_code VALUES(26,'08','Truck (Not including Truck Tractors or Dump Trucks)');
    INSERT INTO ca_body_style_code VALUES(27,'09','Motor Homes and Auto Homes (self-propelled)');
END IF;
END $$;
