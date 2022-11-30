
const scribeDb = require('../db/scribe_db')

const getCampaigns = async (req, res) => {
  try {
    const campaigns = await scribeDb.campaigns.getByUserId(
      req.requestUserId
    )
    res.json(campaigns)
  } catch (err) {
    res.status(500).send(err)
  }
}

const getCampaignById = async (req, res) => {

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
}

const inviteToCampaign = async (req, res) => {

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

    // todo: generate some links

  } catch (err) {
    res.status(500).send(err)
  }

  res.status(200).send("OK")
}

const createCampaign = async (req, res) => {

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
}

const editCampaign = async (req, res) => {

  if (!req.params.campaign_id) {
    res.status(400).send("missing campaign id")
    return
  }
  console.log(req.params.campaign_id)

  try {
    const campaignToUpdate = await scribeDb.campaigns.getById(req.params.campaign_id)
    const updatedCampaign = {
      id: req.params.campaign_id,
      name: req.body.name ?? campaignToUpdate.name
    }
    console.log({ updatedCampaign })

    const campaign = await scribeDb.campaigns.updateCampaign(updatedCampaign)
    console.log({ campaign })
    res.json(campaign)
  } catch (err) {
    res.status(500).send(err)
  }

}

exports.getCampaigns = getCampaigns;
exports.getCampaignById = getCampaignById;
exports.inviteToCampaign = inviteToCampaign;
exports.createCampaign = createCampaign;
exports.editCampaign = editCampaign;
