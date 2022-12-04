DROP TABLE IF EXISTS notes CASCADE;
CREATE TABLE notes (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(60) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(60) NOT NULL,
  marker_id INTEGER REFERENCES markers(id) ON DELETE CASCADE
);

CREATE INDEX notes_title_trgm ON notes USING gin (title gin_trgm_ops);
CREATE INDEX notes_description_trgm ON notes USING gin (description gin_trgm_ops);
CREATE INDEX notes_category_trgm ON notes USING gin (category gin_trgm_ops);
CREATE INDEX notes_category_btree ON notes USING btree (category);
