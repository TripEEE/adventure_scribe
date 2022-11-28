const db = require('../connection');

const getCampaigns = () => {
  return db.query('SELECT * FROM campaigns;')
    .then(data => {
      return data.rows
    })
}

module.exports = { getCampaigns }
