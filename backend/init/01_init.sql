   -- Ensure the PostGIS extension is enabled
   CREATE EXTENSION IF NOT EXISTS postgis;

   -- Create the campsites table without the location column
   CREATE TABLE IF NOT EXISTS campsites (
       id SERIAL PRIMARY KEY,
       name TEXT NOT NULL
   );

   -- Add the location column with the geometry type
   SELECT AddGeometryColumn('campsites', 'location', 4283, 'POINT', 2);

   -- Insert the CampJS Gold Coast location
   INSERT INTO campsites (name, location) VALUES 
       ('CampJS Gold Coast', ST_GeomFromText('POINT(153.4000 -28.0167)', 4283));
   