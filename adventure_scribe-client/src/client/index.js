import axios from 'axios';
import { createCampaign, getCampaignById, getCampaigns, inviteUserToCampaign, deleteCampaign, editCampaign } from './campaigns';

//each method corresponds to a route in the API

//cookie helper
export const getCookie = (key) => {
  const cookie = document.cookie.split(';').find((cookie) => {
    const cookieKey = cookie.split('=')[0]
    return cookieKey.trim() === key
  })

  if (!cookie) {
    return
  }

  return cookie.split("=")[1]
}

const client = {

  login: async (email, password) => {
    console.log('login')
    try {
      const response = await axios.post(
        'http://localhost:3002/login', {
        email,
        password
      },
      );

      document.cookie = `auth_token=${response.data}`
    } catch (err) {
      console.error(err);
    }
  },

  getMe: async () => {
    try {
      const response = await axios.get(
        'http://localhost:3002/me', {
        headers: {
          authorization: `Bearer ${getCookie('auth_token')}`
        }
      }
      );

      console.log(response.data)

      return response.data
    } catch (err) {
      console.error(err);
    }
  },

  getCampaigns: getCampaigns,
  createCampaign: createCampaign,
  getCampaignById: getCampaignById,
  inviteUserToCampaign: inviteUserToCampaign,
  editCampaign: editCampaign,
  deleteCampaign: deleteCampaign,


}

export default client;