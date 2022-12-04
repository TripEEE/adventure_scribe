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

export const editNote = async (campaign_id, marker_id, note_id, body) => {
  try {
    const response = await axios.put(
      `http://localhost:3002/api/campaigns/${campaign_id}/markers/${marker_id}/notes/${note_id}`, 
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

export const deleteNote = async (campaign_id, marker_id, note_id) => {
  try {
    const response = await axios.delete(
      `http://localhost:3002/api/campaigns/${campaign_id}/markers/${marker_id}/notes/${note_id}`,{
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