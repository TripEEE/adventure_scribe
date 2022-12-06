import React, { useEffect, useState } from "react";
import client from "../client";
import './Landing.scss';
import { useNavigate } from "react-router-dom";
const Landing = () => {

  const navigate = useNavigate()

  const [me, setMe] = useState({})
  const [myCampaigns, setMyCampaigns] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({})
  const [formErrors, setFormErrors] = useState([])
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const [isEditingCampaign, setIsEditingCampaign] = useState(false);
  const [campaignNameEdit, setCampaignNameEdit] = useState('');

  const _setFormValue = (key) => {
    //takes a key
    return (e) => {
      const { value } = e.target
      //takes an event
      setForm((prevFormState) => {
        //updates form state to the key and value provided
        return { ...prevFormState, [key]: value }
      })
    }
  }


  const _onDeleteCampaign = (campaignId) => async () => {
    await client.deleteCampaign(campaignId)
    setIsDeleteActive(false)
    await _getMyCampaigns()
  }

  const _setIsEditingCampaign = (campaignName) => () => {
    setCampaignNameEdit(campaignName)
    setIsEditingCampaign(true)
  }

  const onEditCampaign = (campaignId) => async (e) => {
    if (e.which === 13) {
      await client.editCampaign({ name: campaignNameEdit, id: campaignId })
      setCampaignNameEdit('')
      setIsEditingCampaign(false)
      await _getMyCampaigns()
    }
  }

  const _submitForm = async () => {
    let errors = []

    if (!form.campaignName) {
      errors.push("Campaign name cannot be empty")
    }
    if (!form.mapName) {
      errors.push("Map name cannot be empty")
    }
    if (!form.mapLink) {
      errors.push("Map link cannot be empty")
    }
    if (errors.length > 0) {
      setFormErrors(errors)
      return
    }

    await client.createCampaign({
      campaign: {
        name: form.campaignName,
        map: {
          name: form.mapName,
          link: form.mapLink
        }
      }
    })
    setForm({})
    setFormErrors([])
    setShowForm(false)
    await _getMyCampaigns()
  }

  const _getMe = async () => {
    const resp = await client.getMe()
    setMe(resp)
  }

  const _getMyCampaigns = async () => {
    const resp = await client.getCampaigns()
    setMyCampaigns(resp)
  }

  const _navigateToCampaign = (campaignId) => {
    if (isEditingCampaign) {
      return;
    }
    return () => {
      navigate(`/campaign/${campaignId}`)
    }
  }

  useEffect(() => {
    _getMe()
    _getMyCampaigns()
  }, [])

  return <div className="wrapper">
    <h1 className="welcome">Welcome, {me.name}!</h1>
    <h2 className="yourCampaigns">Your Campaigns:</h2>
    <div className="campaigns">
      {myCampaigns.map(campaign =>
        <div className="campaigns__campaign">
          <div
            style={{ backgroundImage: `url(${campaign.map.link})` }}
            className="campaigns__campaign__image"
            key={campaign.id}
            onClick={_navigateToCampaign(campaign.campaign_id)}>
            {isEditingCampaign ? <input
              value={campaignNameEdit}
              onChange={(e) => setCampaignNameEdit(e.target.value)}
              onClick={(e) => { e.preventDefault(); e.stopPropagation() }}
              onKeyUp={onEditCampaign(campaign.id)}
            ></input> : campaign.name}
          </div>
          <div className="campaigns__campaign__commands">
            {isDeleteActive ? (
              <>
                <div>
                  Are you sure you want to delete?
                </div>
                <div>
                  <button onClick={_onDeleteCampaign(campaign.id)}>Delete</button>
                </div>
                <div>
                  <button onClick={() => setIsDeleteActive(false)}>Cancel</button>
                </div>
              </>

            ) : (
              !isEditingCampaign &&
              (<>
                <button onClick={_setIsEditingCampaign(campaign.name)}>Change Title</button>
                <button onClick={() => setIsDeleteActive(true)}>Delete</button>
              </>)


            )}

          </div>
        </div>
      )}
      <div className="campaigns__createCampaign" onClick={() => setShowForm(true)}>
        <p>+</p>
      </div>
    </div>
    {
      showForm && (
        <div className="input">
          <div className="input__form">
            <input
              className="input-item"
              name="campaignName"
              type="text"
              placeholder="Enter Campaign Name"
              value={form.campaignName || ""}
              onChange={_setFormValue("campaignName")}
            />
            <input
              className="input-item"
              name="mapName"
              type="text"
              placeholder="Enter Map Name"
              value={form.mapName || ""}
              onChange={_setFormValue("mapName")}
            />
            <input
              className="input-item"
              name="mapLink"
              type="text"
              placeholder="Enter Map Link"
              value={form.mapLink || ""}
              onChange={_setFormValue("mapLink")}
            />
            <button className="input-item" onClick={_submitForm}>
              Create New Campaign
            </button>
            <button className="input-item" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>

          <div>
            {formErrors.map((error) => <div>
              {error}
            </div>)}
          </div>
        </div>
      )
    }
  </div >
}

export default Landing;
