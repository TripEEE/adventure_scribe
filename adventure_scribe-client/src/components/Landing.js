import { divIcon } from "leaflet";
import React, { useEffect, useState } from "react";
import client from "../client";
import './Landing.scss';

const Landing = () => {

  const [me, setMe] = useState({})
  const [myCampaigns, setMyCampaigns] = useState([])
  const [showForm, setShowForm] = useState(false)

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
      console.log(campaignId)
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
        <div style={{ backgroundImage: {} }} className="campaigns__campaign" key={campaign.id} onClick={_navigateToCampaign(campaign.id)}>
          {campaign.name}
        </div>
      )}
      <div className="campaigns__createCampaign" onClick={showForm}>
        <p>+</p>
      </div>
    </div>
    {showForm && (
      <form name="newCampaign" onSubmit={(event) => event.preventDefault()} action="http://localhost:3002/api/campaigns" method="POST">
        My Form
        <input
          name="campaignName"
          type="text"
          placeholder="Enter Campaign Name"
        />


      </form>
    )}
  </div>
}

export default Landing;
