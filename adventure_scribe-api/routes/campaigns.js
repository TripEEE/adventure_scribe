const express = require('express');
const router = express.Router();
const { getCampaignById, inviteToCampaign, createCampaign, editCampaign, getCampaigns } = require('../handlers/campaigns');
const { createMarker, getMarker, editMarker } = require('../handlers/markers');
const { createNote, editNote } = require("../handlers/notes");
const { authorizeCampaign } = require("../middleware/middleware")

// Apply middleware on api/campaigns/:id
router.use('/:id', authorizeCampaign)

// GET api/campaigns
router.get('/', getCampaigns);

// GET api/campaigns/:id
router.get('/:id', getCampaignById);

// POST api/campaigns/:id/invite
router.post('/:id/invite', inviteToCampaign)

// POST api/campaigns
router.post('/', createCampaign);

// POST api/campaigns/:campaign_id/markers
router.post('/:campaign_id/markers', createMarker);

// GET api/campaigns/:campaign_id/markers/:marker_id
router.get('/:campaign_id/markers/:marker_id', getMarker);

// POST api/campaigns/:campaign_id/markers/:marker_id/notes
router.post('/:campaign_id/markers/:marker_id/notes', createNote);

// PUT api/campaigns/:campaign_id
router.put('/:campaign_id', editCampaign);

// PUT api/campaigns/:campaign_id/markers/:marker_id
router.put('/:campaign_id/markers/:marker_id', editMarker);

// PUT api/campaigns/:campaign_id/markers/:marker_id/notes/:note_id
router.put('/:campaign_id/markers/:marker_id/notes/:note_id', editNote);

module.exports = router;
