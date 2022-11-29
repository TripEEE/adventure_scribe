const db = require('./connection')
const { generateInsertQuery, generateSelectQuery } = require('./utils/query_generators');

const scribeDb = {

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
