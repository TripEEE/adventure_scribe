import axios from 'axios';
import { createCampaign, getCampaignById, getCampaigns, inviteUserToCampaign, deleteCampaign, editCampaign } from './campaigns';
import { createMarker, deleteMarker, editMarker, getMarker } from './markers';
import { createNote, deleteNote, editNote } from './notes';

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

const deleteCookie = (name) => {
  if (getCookie(name)) {
    console.log("deleting cookie")
    document.cookie = name + "=" +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
}

const client = {

  search: async (term) => {
    try {
      const response = await axios.get(
        'http://localhost:3002/api/campaigns/search', {
        params: { term },
        headers: {
          authorization: `Bearer ${getCookie('auth_token')}`
        }

      })

      return response.data

    } catch (err) {
      console.log(err)
    }
  },

  register: async (username, email, password) => {
    try {
      const response = await axios.post(
        'http://localhost:3002/register', {
        username,
        email,
        password
      },
      );

      return response.data
    } catch (err) {
      console.error(err);
    }
  },

  login: async (email, password) => {
    try {
      const response = await axios.post(
        'http://localhost:3002/login', {
        email,
        password
      },
      );
      localStorage.setItem("user", '{}')
      document.cookie = `auth_token=${response.data}`
      return document.cookie;
    } catch (err) {
      console.error(err);
    }
  },

  logout: () => {
    deleteCookie("auth_token")
    localStorage.removeItem("user")
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
  getMarker: getMarker,
  createMarker: createMarker,
  deleteMarker: deleteMarker,
  createNote: createNote,
  editNote: editNote,
  deleteNote: deleteNote,
  editMarker: editMarker

}

export default client;