import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function View(props) {
  return (
    <div className="col-md-6 noteDiv">
      <div className="h-100 p-5 text-bg-dark rounded-3">
        <div className="d-flex justify-content-between">
          <h2>{props.notes?.title}</h2>
          <h5>{props.notes?.category}</h5>
        </div>
        <p>{props.notes?.description}</p>
        <div className="d-flex justify-content-between">
          <button className="btn btn-outline-light" type="button" onClick={() => props.setNoteView("EDIT")}>Edit</button>
          <button className="btn btn-outline-light" type="button" onClick={() => props.setNoteView("CONFIRM")}><FontAwesomeIcon icon={faTrash} /></button>
          <button className="btn btn-outline-light" type="button" onClick={() => props.setNoteView(null)}>Close</button>
        </div>
      </div>
    </div>
  )

}

export default View;