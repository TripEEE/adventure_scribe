-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS campaigns CASCADE;
CREATE TABLE campaigns (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(100) NOT NULL
);
