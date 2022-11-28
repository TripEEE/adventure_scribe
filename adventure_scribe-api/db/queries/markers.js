const db = require('../connection');

const getMarkers = () => {
  return db.query('SELECT * FROM markers;')
    .then(data => {
      return data.rows
    })
}

module.exports = { getMarkers }
