DROP TABLE IF EXISTS campaigns_users CASCADE;
CREATE TABLE campaigns_users (
  id SERIAL PRIMARY KEY NOT NULL,
  campaign_id INTEGER REFERENCES campaigns(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  is_DM BOOLEAN NOT NULL DEFAULT false,
  UNIQUE (campaign_id, user_id)
);
