DROP TABLE IF EXISTS markers CASCADE;
CREATE TABLE markers (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(60) NOT NULL,
  lat VARCHAR(20) NOT NULL,
  lon VARCHAR(20) NOT NULL,
  category VARCHAR(200),
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE
);
CREATE INDEX markers_name_trgm ON markers USING gin (name gin_trgm_ops);
CREATE INDEX markers_category_btree ON markers USING btree (category);
