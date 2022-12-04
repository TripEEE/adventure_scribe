DROP TABLE IF EXISTS maps CASCADE;
CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  campaign_id INTEGER REFERENCES campaigns(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  link TEXT NOT NULL
);

CREATE INDEX maps_name_trgm ON maps USING gin (name gin_trgm_ops);

