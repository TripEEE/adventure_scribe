const express = require('express');
const router = express.Router();
const scribeDb = require('../db/scribe_db')

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

// POST to api/campaigns

router.post('/', async (req, res) => {
  console.log("api/campaigns")


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
      // todo: pass user_id
    )
    res.json(campaigns)
  } catch (err) {
    res.status(500).send(err)
  }
});

module.exports = router;
