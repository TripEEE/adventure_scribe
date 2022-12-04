import axios from 'axios';
import { getCookie } from './index'

export const createNote = async (campaign_id, marker_id, body) => {
  try {
    const response = await axios.post(
      `http://localhost:3002/api/campaigns/${campaign_id}/markers/${marker_id}/notes`, 
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