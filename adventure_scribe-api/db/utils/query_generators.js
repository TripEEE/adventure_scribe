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

const generateUpdateQuery = (tableName, updatedObj = {}, queryObj = {}) => {

  const objectEntries = Object.entries(updatedObj)
  const updateValues = objectEntries.map(entry => entry[1])
  const updateExpression = objectEntries.map((entry, idx) => `${entry[0]} = $${idx + 1}`)

  const whereEntries = Object.entries(queryObj.where) // [["id",2]]
  const whereClauses = whereEntries.map((entry, idx) => `${entry[0]} = $${idx + objectEntries.length + 1}`).join(" AND ")
  const whereValues = whereEntries.map(entry => entry[1])

  const query = `UPDATE ${tableName}
    SET ${updateExpression}
    WHERE ${whereClauses}
    RETURNING *`

  return { query, values: [...updateValues, ...whereValues] }
}

const generateDeleteQuery = (tableName, queryObj = {}) => {

  const whereEntries = Object.entries(queryObj.where)
  const whereClauses = whereEntries.map((entry, idx) => `${entry[0]} = $${idx + 1}`).join(" AND ")
  const whereValues = whereEntries.map(entry => entry[1])

  const query = `DELETE FROM ${tableName} WHERE
  ${whereClauses}`
  return { query, values: whereValues }
}
// SELECT
// notes.id AS note_id,
// notes.title AS note_title,
// notes.description AS note_description,
// notes.category AS note_category,
// markers.id AS marker_id,
// markers.name AS marker_name,
// markers.category AS marker_category,
// maps.name AS map_name,
// campaigns.name AS campaign_name,
// campaigns.id AS campaign_id
// FROM notes
// INNER JOIN markers ON markers.id = notes.marker_id
// INNER JOIN maps ON maps.id = markers.map_id
// INNER JOIN campaigns ON campaigns.id = maps.campaign_id
// WHERE notes.description ilike '%danger%'
// UNION (
// SELECT
// notes.id AS note_id,
// notes.title AS note_title,
// notes.description AS note_description,
// notes.category AS note_category,
// markers.id AS marker_id,
// markers.name AS marker_name,
// markers.category AS marker_category,
// maps.name AS map_name,
// campaigns.name AS campaign_name,
// campaigns.id AS campaign_id
// FROM notes
// INNER JOIN markers ON markers.id = notes.marker_id
// INNER JOIN maps ON maps.id = markers.map_id
// INNER JOIN campaigns ON campaigns.id = maps.campaign_id
// WHERE notes.title ilike '%danger%')
// UNION (
// SELECT
// notes.id AS note_id,
// notes.title AS note_title,
// notes.description AS note_description,
// notes.category AS note_category,
// markers.id AS marker_id,
// markers.name AS marker_name,
// markers.category AS marker_category,
// maps.name AS map_name,
// campaigns.name AS campaign_name,
// campaigns.id AS campaign_id
// FROM notes
// INNER JOIN markers ON markers.id = notes.marker_id
// INNER JOIN maps ON maps.id = markers.map_id
// INNER JOIN campaigns ON campaigns.id = maps.campaign_id
// WHERE notes.category ilike '%danger%')
// UNION (
// SELECT
// notes.id AS note_id,
// notes.title AS note_title,
// notes.description AS note_description,
// notes.category AS note_category,
// markers.id AS marker_id,
// markers.name AS marker_name,
// markers.category AS marker_category,
// maps.name AS map_name,
// campaigns.name AS campaign_name,
// campaigns.id AS campaign_id
// FROM notes
// INNER JOIN markers ON markers.id = notes.marker_id
// INNER JOIN maps ON maps.id = markers.map_id
// INNER JOIN campaigns ON campaigns.id = maps.campaign_id
// WHERE markers.name ilike '%danger%')
// UNION (
// SELECT
// notes.id AS note_id,
// notes.title AS note_title,
// notes.description AS note_description,
// notes.category AS note_category,
// markers.id AS marker_id,
// markers.name AS marker_name,
// markers.category AS marker_category,
// maps.name AS map_name,
// campaigns.name AS campaign_name,
// campaigns.id AS campaign_id
// FROM notes
// INNER JOIN markers ON markers.id = notes.marker_id
// INNER JOIN maps ON maps.id = markers.map_id
// INNER JOIN campaigns ON campaigns.id = maps.campaign_id
// WHERE markers.category ilike '%danger%')
// UNION (
// SELECT
// notes.id AS note_id,
// notes.title AS note_title,
// notes.description AS note_description,
// notes.category AS note_category,
// markers.id AS marker_id,
// markers.name AS marker_name,
// markers.category AS marker_category,
// maps.name AS map_name,
// campaigns.name AS campaign_name,
// campaigns.id AS campaign_id
// FROM notes
// INNER JOIN markers ON markers.id = notes.marker_id
// INNER JOIN maps ON maps.id = markers.map_id
// INNER JOIN campaigns ON campaigns.id = maps.campaign_id
// WHERE campaigns.name ilike '%danger%')

const generateSearchQuery = (term) => {
  const searchableColumns = [
    "notes.description",
    "notes.title",
    "notes.category",
    "markers.name",
    "markers.category",
    "maps.name",
    "campaigns.name"
  ]

  const query = searchableColumns.map((field) => {
    return `SELECT
  notes.id AS note_id,
  notes.title AS note_title,
  notes.description AS note_description,
  notes.category AS note_category,
  markers.id AS marker_id,
  markers.name AS marker_name,
  markers.category AS marker_category,
  maps.name AS map_name,
  campaigns.name AS campaign_name,
  campaigns.id AS campaign_id
  FROM notes
  INNER JOIN markers ON markers.id = notes.marker_id
  INNER JOIN maps ON maps.id = markers.map_id
  INNER JOIN campaigns ON campaigns.id = maps.campaign_id
  WHERE ${field} ilike $1`
  }).join(" UNION ",)
  return {
    query, values: [`%${term}%`]
  }
}
exports.generateInsertQuery = generateInsertQuery
exports.generateSelectQuery = generateSelectQuery
exports.generateUpdateQuery = generateUpdateQuery
exports.generateDeleteQuery = generateDeleteQuery
exports.generateSearchQuery = generateSearchQuery
