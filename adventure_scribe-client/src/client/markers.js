import axios from 'axios';
import { getCookie } from './index'

export const getMarker = async (campaign_id, marker_id) => {
  try {
    const response = await axios.get(
      `http://localhost:3002/api/campaigns/${campaign_id}/markers/${marker_id}`, {
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

export const createMarker = async (campaign_id, body) => {
  try {
    const response = await axios.post(
      `http://localhost:3002/api/campaigns/${campaign_id}/markers`,
      body,
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

export const deleteMarker = async (campaign_id, marker_id) => {
  try {
    const response = await axios.delete(
      `http://localhost:3002/api/campaigns/${campaign_id}/markers/${marker_id}`, {
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

export const editMarker = async (campaign_id, marker_id, body) => {
  try {
    const response = await axios.put(
      `http://localhost:3002/api/campaigns/${campaign_id}/markers/${marker_id}`,
      body,
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