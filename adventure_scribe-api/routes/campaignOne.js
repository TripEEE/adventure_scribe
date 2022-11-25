const express = require('express');
const router  = express.Router();

router.get('/campaign/:id', (req, res) => {
  res.json({
    map: {
      image: "map_image",
      title: "map_title" },
      markers: [{
        title: "marker_title", /*{ x: "NUMBER", y: "NUMBER" } */}]
      })
});

router.post('/campaign/:campaign_id/markers', (req, res) => {
  res.json({
     id: req.body.marker_id,
    title: req.body.marker_title,
    location: {x: "NUMBER", y: "NUMBER"}
    })
});
