DROP TABLE IF EXISTS campaigns_users CASCADE;
CREATE TABLE campaigns_users (
  id SERIAL PRIMARY KEY NOT NULL,
  campaign_id INTEGER REFERENCES campaigns(id) NOT NULL,
  user_id VARCHAR(100) REFERENCES users(id) NOT NULL,
  is_DM BOOLEAN DEFAULT false NOT NULL
);
