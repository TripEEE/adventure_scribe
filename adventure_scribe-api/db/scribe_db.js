const db = require('./connection')
const { generateInsertQuery, generateSelectQuery } = require('./utils/query_generators');

const scribeDb = {

  //create a new campaign
  campaigns: {
    create: async (campaign) => {
      const { query, values } = generateInsertQuery('campaigns', campaign)
      try {
        const result = await db.query(query, values)
        return result.rows[0]
      }
      catch (err) {
        throw err
      }
    },

    //get all campaigns a user is participating in
    getByUserId: async (userId) => {
      const query = `
        SELECT
          *
        FROM
          campaigns
        INNER JOIN campaigns_users ON campaigns.id = campaigns_users.campaign_id
        WHERE campaigns_users.user_id = $1
      `

      try {
        const result = await db.query(query, [userId])
        return result.rows
      }
      catch (err) {
        throw err
      }
    },

    //get a single campaign
    getById: async (campaignId) => {
      const { query, values } = generateSelectQuery("campaigns", {
        where: {
          id: campaignId
        }
      })

      try {
        const result = await db.query(query, values)
        return result.rows[0]
      }
      catch (err) {
        throw err
      }
    },

    //get all campaigns a user is participating in -- NOT WORKING PROPERLY!! -> see getByUserId
    getByUser: async () => {
      const { query } = generateSelectQuery("campaigns")

      try {
        const result = await db.query(query)
        return result.rows
      }
      catch (err) {
        throw err
      }
    },
  },

  //create a single map
  maps: {
    create: async (map = {}) => {
      const { query, values } = generateInsertQuery('maps', map)

      try {
        const result = await db.query(query, values)
        return result.rows[0]
      }
      catch (err) {
        throw err
      }
    },

    //get a single campaign
    getByCampaignId: async (campaignId) => {
      const { query, values } = generateSelectQuery("maps", {
        where: {
          campaign_id: campaignId
        }
      })

      try {
        const result = await db.query(query, values)
        return result.rows[0]
      }
      catch (err) {
        throw err
      }
    },
  },

  //get a single marker
  markers: {
    create: async (marker = {}) => {
      const { query, values } = generateInsertQuery('markers', marker)

      try {
        const result = await db.query(query, values)

        return result.rows[0]
      }
      catch (err) {
        throw err
      }
    },

    //get a single marker on a map
    getMarkerByMapIdAndId: async (mapId, markerId) => {
      const { query, values } = generateSelectQuery("markers", {
        where: {
          map_id: mapId,
          id: markerId,
        }
      })

      try {
        const result = await db.query(query, values)
        return result.rows[0]
      }
      catch (err) {
        throw err
      }
    },

    //get all markers on a map
    getMarkersByMapId: async (mapId) => {
      const { query, values } = generateSelectQuery("markers", {
        where: {
          map_id: mapId,
        }
      })

      try {
        const result = await db.query(query, values)
        return result.rows
      }
      catch (err) {
        throw err
      }
    },

  },

  //create a new note in a marker
  notes: {
    create: async (note = {}) => {
      const { query, values } = generateInsertQuery('notes', note)

      try {
        const result = await db.query(query, values)
        return result.rows[0]
      }
      catch (err) {
        throw err
      }
    },

    //get all notes in a marker
    getByMarkerId: async (markerId) => {
      const { query, values } = generateSelectQuery("notes", {
        where: {
          marker_id: markerId,
        }
      })

      try {
        const result = await db.query(query, values)
        return result.rows
      }
      catch (err) {
        throw err
      }
    },
  },

  //create a new user
  users: {
    create: async (user) => {
      const { query, values } = generateInsertQuery('users', user)

      try {
        const result = await db.query(query, values)
        return result.rows[0]
      }
      catch (err) {
        throw err
      }
    },

    //get a single user
    getById: async (id) => {
      const { query, values } = generateSelectQuery("users", {
        where: {
          id
        }
      })

      try {
        const result = await db.query(query, values)
        return result.rows[0]
      }
      catch (err) {
        throw err
      }
    },

    //user creating a campaign is added to the campaign as a user, default DM=true
    addUserToCampaign: async (userId, campaignId, isDM) => {
      const { query, values } = generateInsertQuery('campaigns_users', {
        campaign_id: campaignId,
        user_id: userId,
        is_DM: isDM,
      })

      try {
        const result = await db.query(query, values)
        return result.rows[0]
      }
      catch (err) {
        throw err
      }
    },

    //get a user by email
    getByEmail: async (email) => {
      const { query, values } = generateSelectQuery("users", {
        where: {
          email
        }
      })

      try {
        const result = await db.query(query, values)
        return result.rows[0]
      }
      catch (err) {
        throw err
      }
    },

    //get all users in a campaign
    getIsInCampaign: async (userId, campaignId) => {
      const { query, values } = generateSelectQuery("campaigns_users", {
        where: {
          user_id: userId,
          campaign_id: campaignId,
        }
      })

      try {
        const result = await db.query(query, values)

        return !!result.rows.length
      }
      catch (err) {
        throw err
      }
    },
  },
}

module.exports = scribeDb