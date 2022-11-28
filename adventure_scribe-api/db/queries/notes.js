const db = require('../connection');

const getNotes = () => {
  return db.query('SELECT * FROM notes;')
    .then(data => {
      return data.rows
    })
}

module.exports = { getNotes }
