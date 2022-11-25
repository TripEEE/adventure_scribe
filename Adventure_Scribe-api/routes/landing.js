const express = require('express');
const router  = express.Router();

router.get('/campaigns', (req, res) => {
  res.json(
    { campaigns: [{ id: "id" /*unique value title: "campaign_name"*/ }
  ]})
});

router.post('/campaign/:campaign_id/markers', (req, res) => {
  res.json({
    id: "marker_id",
    title: "marker_title",
    location: { x: "NUMBER", y: "NUMBER" }
  })
});
