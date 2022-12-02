import axios from 'axios';
import { getCookie } from './index'


export const getCampaigns = async () => {
  try {
    const response = await axios.get(
      'http://localhost:3002/api/campaigns', {
      headers: {
        authorization: `Bearer ${getCookie('auth_token')}`
      }
    }
    );
    return response.data
  } catch (err) {
    console.error(err);
  }
}

export const getCampaignById = async (campaignId) => {
  try {
    const response = await axios.get(
      `http://localhost:3002/api/campaigns/${campaignId}`, {
      headers: {
        authorization: `Bearer ${getCookie('auth_token')}`
      }
    }
    );

    return response.data
  } catch (err) {
    console.error(err);
  }
}

// export const getMap = async (mapId) => {
//   try {
//     const response = await axios.get(
//       `http://localhost:3002/api/`
//     )
//   }
// }

export const inviteUserToCampaign = async (campaignId, emails = []) => {
  try {
    const response = await axios.post(
      `http://localhost:3002/api/campaigns/${campaignId}/invite`,
      {
        emails,
      },
      {
        headers: {
          authorization: `Bearer ${getCookie('auth_token')}`
        }
      }
    );

    return response.data
  } catch (err) {
    console.error(err);
  }
}

export const createCampaign = async (campaign = {}) => {
  try {
    const response = await axios.post(
      `http://localhost:3002/api/campaigns`,
      campaign,
      {
        headers: {
          authorization: `Bearer ${getCookie('auth_token')}`
        }
      }
    );

    return response.data
  } catch (err) {
    console.error(err);
  }
}

export const editCampaign = async (campaign = {}) => {
  try {
    const response = await axios.put(
      `http://localhost:3002/api/campaigns/${campaign.id}`,
      campaign,
      {
        headers: {
          authorization: `Bearer ${getCookie('auth_token')}`
        }
      }
    );

    return response.data
  } catch (err) {
    console.error(err);
  }
}

export const deleteCampaign = async (campaignId) => {
  try {
    const response = await axios.delete(
      `http://localhost:3002/api/campaigns/${campaignId}`,
      {
        headers: {
          authorization: `Bearer ${getCookie('auth_token')}`
        }
      }
    );

    return response.data
  } catch (err) {
    console.error(err);
  }
}