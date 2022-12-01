import { divIcon } from "leaflet";
import React, { useEffect, useState } from "react";
import client from "../client";
import './Landing.scss';

const Landing = () => {

  const [me, setMe] = useState({})
  const [myCampaigns, setMyCampaigns] = useState([])

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

  console.log(me)

  return <div>
    Hello {me.name}
    <div>
      {myCampaigns.map(campaign =>
        <div onClick={_navigateToCampaign(campaign.id)}>
          {campaign.name}
        </div>
      )}
    </div>
  </div>
}



export default Landing;
