DROP TABLE IF EXISTS map CASCADE;
CREATE TABLE map (
  id SERIAL PRIMARY KEY NOT NULL,
  campaign_id INTEGER REFERENCES campaign(id)
  map VARCHAR(200) NOT NULL
);