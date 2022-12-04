import 'bootstrap/dist/css/bootstrap.min.css';
import client from '../../../client';

function Confirm(props) {

  const _deleteNote = async (campaign_id, marker_id, note_id) => {
    const resp = await client.deleteNote(campaign_id, marker_id, note_id);
    console.log(resp);
    props.setNotes(prev => prev.filter(note => note.id !== note_id));
    props.setNoteView(null);
  }

  return(
    <div className="col-md-6 noteDiv">
    <div className="h-100 p-5 text-bg-dark rounded-3">
      <div className="d-flex justify-content-between">
        <h5>Are you sure you want to delete this note?</h5>
      </div>
      <div className="d-flex justify-content-between">
        <button className="btn btn-outline-light" type="button" onClick={() => _deleteNote(props.campaignID, props.currentMarker, props.notes.id)}>Yes</button>
        <button className="btn btn-outline-light" type="button" onClick={() => props.setNoteView("VIEW")}>Cancel</button>
      </div>
    </div>
  </div>
  )
}

export default Confirm;