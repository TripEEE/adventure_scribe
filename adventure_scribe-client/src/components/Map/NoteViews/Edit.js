import 'bootstrap/dist/css/bootstrap.min.css';
import client from '../../../client';
import { useState } from 'react';

function Edit(props) {
  const [title, setTitle] = useState(props.notes.title);
  const [description, setDescription] = useState(props.notes.description);
  const [category, setCategory] = useState(props.notes.category);

  const _editNote = async (campaign_id, marker_id, note_id, body) => {
    const resp = await client.editNote(campaign_id, marker_id, note_id, body);
    props.setNotes(prev => {
      let newNoteState = prev;
      let note = newNoteState.find(n => n.id === note_id);
      Object.assign(note, resp);
      return newNoteState;
    });
    props.setNoteView(null);
  }

  return (
    <div className="h-100 p-5 text-bg-dark rounded-3">
      <div className="d-flex flex-row justify-content-between">
        <div className="d-flex flex-column col-4">
          <label htmlFor="Title">Title</label>
          <input type="text" name="Title" onChange={(e) => setTitle(e.target.value)} defaultValue={props.notes.title}></input>
        </div>
        <div className="d-flex flex-column justify-content-end col-3">
          <label htmlFor="Category">Category</label>
          <input type="text" name="Category" onChange={(e) => setCategory(e.target.value)} defaultValue={props.notes.category}></input>
        </div>
      </div>
      <div className="d-flex flex-column">
        <label htmlFor="Description">Description</label>
        <textarea name="Description" id="description" onChange={(e) => setDescription(e.target.value)} defaultValue={props.notes.description}></textarea>
      </div>
      <div className="d-flex justify-content-between">
        <button className="btn btn-outline-light" type="button" onClick={() => _editNote(props.campaignID, props.currentMarker, props.notes.id, {
            title: title,
            description: description,
            category: category
        })}>Save</button>
        <button className="btn btn-outline-light" type="button" onClick={() => props.setNoteView("VIEW")}>Cancel</button>
      </div>
    </div>
  )
}

export default Edit;