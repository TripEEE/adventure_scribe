const generateInsertQuery = (tableName, obj) => {
  const objectEntries = Object.entries(obj)
  const keysJoined = objectEntries.map((entry) => entry[0]).join(', ')
  const values = objectEntries.map((entry) => entry[1])
  const query = `INSERT INTO ${tableName} (${keysJoined})
  VALUES (${Object.keys(obj).map((key, index) => `$${index + 1}`)})
  RETURNING *`
  return { query, values }
}

const generateSelectQuery = (tableName, queryObj = {}) => {
  let query = `SELECT * from ${tableName}`
  if (!queryObj.where) {
    return { query }
  }

  query += ` WHERE `

  const whereEntries = Object.entries(queryObj.where) // [["id",2]]

  const whereClauses = whereEntries.map((entry, idx) => `${entry[0]} = $${idx + 1}`).join(" AND ")
  const values = whereEntries.map(entry => entry[1])

  query += whereClauses

  return {
    query,
    values
  }
}

exports.generateInsertQuery = generateInsertQuery
exports.generateSelectQuery = generateSelectQuery
