-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS campaign CASCADE;
CREATE TABLE campaign (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(100) NOT NULL
);
