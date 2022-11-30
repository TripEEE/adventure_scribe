const express = require('express');
const router = express.Router();
const scribeDb = require('../db/scribe_db')


// Authorization middleware for campaigns
router.use('/:id', async (req, res, next) => {
  if (!req.params.id) {
    res.status(400).send("missing campaign id")
    return
  }

  try {
    const isUserInCampaign = await scribeDb.users.getIsInCampaign(
      req.requestUserId,
      req.params.id
    )

    if (!isUserInCampaign) {
      res.status(403).send("you do not have permission to access this resource")
      return
    }
  }
  catch (err) {
    res.status(500).send(err)
  }

  next()
})

// GET to api/campaigns/:id
router.get('/:id', async (req, res) => {

  if (!req.params.id) {
    res.status(400).send("missing campaign id")
    return
  }

  try {
    const campaign = await scribeDb.campaigns.getById(req.params.id)
    const map = await scribeDb.maps.getByCampaignId(req.params.id)
    const markers = await scribeDb.markers.getMarkersByMapId(map.id)
    res.json({ id: campaign.id, name: campaign.name, map, markers })
  }
  catch (err) {
    res.status(500).send(err)
  }
});

// POST to api/campaigns/:id/invite
router.post('/:id/invite', async (req, res) => {

  if (!req.params.id) {
    res.status(400).send("missing campaign id")
    return
  }

  const { emails = [] } = req.body;

  try {
    let newUsers = [];

    for (const email of emails) {
      let user = await scribeDb.users.getByEmail(email)
      if (!user) {
        user = await scribeDb.users.create(
          {
            name: "<system generated>",
            password: "<system generated>",
            email: email,
          }
        )
        newUsers.push(user)
      }

      const isUserInCampaign = await scribeDb.users.getIsInCampaign(user.id, req.params.id)
      if (isUserInCampaign) {
        continue
      }

      await scribeDb.users.addUserToCampaign(user.id, req.params.id, false)
    }

    // generate some links
  } catch (err) {
    res.status(500).send(err)
  }

  res.status(200).send("OK")
})

// POST to api/campaigns

router.post('/', async (req, res) => {

  const { campaign = {} } = req.body;
  const { map = {} } = campaign
  // if campaign title is not defined, throw error
  if (!campaign.name || !map.name || !map.link) {
    res.status(400).send("invalid request")
    return
  }

  try {
    const newCampaignReq = {
      name: campaign.name,
    }

    const newCampaign = await scribeDb.campaigns.create(newCampaignReq)

    const newMapReq = {
      name: map.name,
      link: map.link,
      campaign_id: newCampaign.id,
    }
    const newMap = await scribeDb.maps.create(newMapReq)
    // the creator of the campaign is added to the campaign as a DM
    await scribeDb.users.addUserToCampaign(req.requestUserId, newCampaign.id, true)

    res.json({ id: newCampaign.id, title: newCampaign.name, map: newMap })
  }
  catch (err) {
    res.status(500).send(err)
  }
});



// POST to api/campaigns/:campaign_id/markers'

router.post('/:campaign_id/markers', async (req, res) => {

  if (!req.params.campaign_id) {
    res.status(400).send("missing campaign id")
    return
  }

  if (!req.body.name || !req.body.location) {
    res.status(400).send("invalid request")
    return
  }

  try {
    const map = await scribeDb.maps.getByCampaignId(req.params.campaign_id)
    const marker = await scribeDb.markers.create({
      name: req.body.name,
      location: req.body.location,
      map_id: map.id
    })

    res.json(marker)
  } catch (err) {
    res.status(500).send(err)
  }
});


// GET to api/campaigns/:campaign_id/markers/:marker_id

router.get('/:campaign_id/markers/:marker_id', async (req, res) => {

  if (!req.params.campaign_id) {
    res.status(400).send("missing campaign id")
    return
  }

  if (!req.params.marker_id) {
    res.status(400).send("missing marker id")
    return
  }

  try {
    const map = await scribeDb.maps.getByCampaignId(req.params.campaign_id)
    const marker = await scribeDb.markers.getMarkerByMapIdAndId(map.id, req.params.marker_id)
    const notes = await scribeDb.notes.getByMarkerId(marker.id)
    res.json({ marker, notes })
  }
  catch (err) {
    res.status(500).send(err)
  }
});

// POST to api/campaigns/:campaign_id/markers/:marker_id/notes'
router.post('/:campaign_id/markers/:marker_id/notes', async (req, res) => {

  if (!req.params.campaign_id) {
    res.status(400).send("missing campaign id")
    return
  }

  if (!req.params.marker_id) {
    res.status(400).send("missing marker id")
    return
  }

  if (!req.body.title || !req.body.description || !req.body.category) {
    res.status(400).send("invalid request")
    return
  }

  try {
    const note = await scribeDb.notes.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      marker_id: req.params.marker_id,
    })
    res.json(note)
  }
  catch (err) {
    res.status(500).send(err)
  }

});

// GET to api/campaigns

router.get('/', async (req, res) => {
  try {
    const campaigns = await scribeDb.campaigns.getByUserId(
      req.requestUserId
    )
    res.json(campaigns)
  } catch (err) {
    res.status(500).send(err)
  }
});

module.exports = router;
