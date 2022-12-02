
const scribeDb = require('../db/scribe_db')

const createMarker = async (req, res) => {

  if (!req.params.campaign_id) {
    res.status(400).send("missing campaign id")
    return
  }

  if (!req.body.name || !req.body.lon || !req.body.lat) {
    res.status(400).send("Invalid request")
    return
  }

  try {
    const map = await scribeDb.maps.getByCampaignId(req.params.campaign_id)
    const marker = await scribeDb.markers.create({
      name: req.body.name,
      lon: req.body.lon,
      lat: req.body.lat,
      map_id: map.id
    })

    res.json(marker)
  } catch (err) {
    res.status(500).send(err)
  }
}

const getMarker = async (req, res) => {

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
}

const editMarker = async (req, res) => {

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
    const markerToUpdate = await scribeDb.markers.getMarkerByMapIdAndId(map.id, req.params.marker_id)
    const updatedMarker = {
      id: markerToUpdate.id,
      map_id: markerToUpdate.map_id,
      name: req.body.name ?? markerToUpdate.name,
      category: req.body.category ?? markerToUpdate.category,
      lon: req.body.lon ?? markerToUpdate.lon,
      lat: req.body.lat ?? markerToUpdate.lat

    }

    const marker = await scribeDb.markers.updateMarker(updatedMarker)
    res.json(marker)
  }
  catch (err) {
    res.status(500).send(err)
  }

}

const deleteMarker = async (req, res) => {

  if (!req.params.campaign_id) {
    res.status(400).send("missing campaign id")
    return
  }

  if (!req.params.marker_id) {
    res.status(400).send("missing marker id")
    return
  }

  try {
    await scribeDb.markers.deleteMarker(req.params.marker_id)
    res.json("Marker Deleted")
  } catch (err) {
    res.status(500).send(err)
  }

}

exports.createMarker = createMarker;
exports.getMarker = getMarker;
exports.editMarker = editMarker;
exports.deleteMarker = deleteMarker;
