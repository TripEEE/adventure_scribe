const generateQuery = (tableName, obj) => {
  const objectEntries = Object.entries(obj)
  const keysJoined = objectEntries.map((entry) => entry[0]).join(', ')
  const values = objectEntries.map((entry) => entry[1])
  const query = `INSERT INTO ${tableName} (${keysJoined})
  VALUES (${Object.keys(obj).map((key, index) => `$${index + 1}`)})
  RETURNING *`
  return { query, values }
}

exports.generateQuery = generateQuery
