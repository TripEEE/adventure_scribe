-- EXTENSION requires labber as a superuser..can be done in PG ADMIN under Groups/Roles,
-- labber, "right click", properties, privileges, and then set superuser to true
-- once this is done, in terminal write npm run db:reset
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
DROP TABLE IF EXISTS campaigns CASCADE;
CREATE TABLE campaigns (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(100) NOT NULL
);

CREATE INDEX campaigns_name_trgm ON campaigns USING gin (name gin_trgm_ops);


