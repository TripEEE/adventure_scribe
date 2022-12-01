import './Note.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function Note(props) {
  return (
    <div className="col-md-6 noteDiv">
      <div className="h-100 p-5 text-bg-dark rounded-3">
        <div className="d-flex justify-content-between">
          <h2>{props.notes.title}</h2>
          <h5>{props.notes.category}</h5>
        </div>
        <p>{props.notes.description}</p>
        <div className="d-flex justify-content-between">
          <button className="btn btn-outline-light" type="button">Save</button>
          <button className="btn btn-outline-light" type="button" onClick={() => props.setCurrentNote(null)}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default Note;