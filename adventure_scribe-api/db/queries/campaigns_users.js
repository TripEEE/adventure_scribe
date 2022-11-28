const db = require('../connection');

const getCampaignsUsers = () => {
  return db.query('SELECT * FROM campaigns_users;')
    .then(data => {
      return data.rows
    })
}

module.exports = { getCampaignsUsers }
