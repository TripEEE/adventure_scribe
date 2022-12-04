import 'bootstrap/dist/css/bootstrap.min.css';
import client from '../../../client';
import { useState } from 'react';

function Create(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const _createNote = async (campaign_id, marker_id, body) => {
    const resp = await client.createNote(campaign_id, marker_id, body);
    props.setNotes(prev => [...prev, resp]);
    props.setNoteView(null);
  }


  return (
    <div className="h-100 p-5 text-bg-dark rounded-3">
      <div className="d-flex flex-row justify-content-between">
        <div className="d-flex flex-column col-4">
          <label htmlFor="Title">Title</label>
          <input type="text" name="Title" placeholder="Title" onChange={(e) => setTitle(e.target.value)}></input>
        </div>
        <div className="d-flex flex-column justify-content-end col-3">
          <label htmlFor="Category">Category</label>
          <input type="text" name="Category" placeholder="Category" onChange={(e) => setCategory(e.target.value)}></input>
        </div>
      </div>
      <div className="d-flex flex-column">
        <label htmlFor="Description">Description</label>
        <textarea name="Description" id="description "placeholder="Description" onChange={(e) => setDescription(e.target.value)}></textarea>
      </div>
      <div className="d-flex justify-content-between">
        <button className="btn btn-outline-light" type="button" onClick={() => _createNote(props.campaignID, props.currentMarker, {
          title: title,
          description: description,
          category: category
        })}>Save</button>
        <button className="btn btn-outline-light" type="button" onClick={() => props.setNoteView(null)}>Close</button>
      </div>
    </div>
  )
}

export default Create;