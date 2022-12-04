import { divIcon } from "leaflet";
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
        <div style={{ backgroundImage: `url(${campaign.map.link})` }} className="campaigns__campaign" key={campaign.id} onClick={_navigateToCampaign(campaign.id)}>
          {campaign.name}
        </div>
      )}
      <div className="campaigns__createCampaign" onClick={() => setShowForm(true)}>
        <p>+</p>
      </div>
    </div>
    {
      showForm && (
        <div className="input">
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
