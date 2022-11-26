// PG database client/connection setup
const { Pool } = require('pg')

const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};

const db = new Pool(dbParams);

db.connect();

//create a new campaign
//add a new user to a campaign
//create a new marker
//create a new note
//delete all of the above
//create new user to app (register)
// create a new map

// const addProperty = (property) => {
//   const { query, values } = generateQuery('properties', property)
//   return pool.query(query, values)
//     .then((result) => {
//       console.log(result.rows[0]);
//       return result.rows[0]
//     })
//     .catch((err) => {
//       console.log(err.message)
//       return null
//     })
// }

module.exports = db;

