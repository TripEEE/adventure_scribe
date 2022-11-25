const express = require('express');
const router  = express.Router();

router.get('/campaign/:campaign_id/markers/:marker_id', (req, res) => {
  res.json({
    notes: [ { id: "note_id",
    title: "note_title",
    description: "note_description" }],})
});

router.post('/campaign/:campaign_id/markers/:marker_id', (req, res) => {
  res.json({
    notes: [ { id: req.body.note_id,
    title: req.body.note_title,
    description: req.body.note_description }],})
});
