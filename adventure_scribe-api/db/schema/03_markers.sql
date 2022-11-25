DROP TABLE IF EXISTS markers CASCADE;
CREATE TABLE markers (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(60) NOT NULL,
  location VARCHAR(100) NOT NULL,
  map_id INTEGER REFERENCES maps(id) NOT NULL
);