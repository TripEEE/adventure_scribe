import 'bootstrap/dist/css/bootstrap.min.css';

function Confirm(props) {
  return(
    <div className="col-md-6 noteDiv">
    <div className="h-100 p-5 text-bg-dark rounded-3">
      <div className="d-flex justify-content-between">
        <h5>Are you sure you want to delete this note?</h5>
      </div>
      <div className="d-flex justify-content-between">
        <button className="btn btn-outline-light" type="button" onClick={() => props.setNoteView(null)}>Yes</button>
        <button className="btn btn-outline-light" type="button" onClick={() => props.setNoteView("VIEW")}>Cancel</button>
      </div>
    </div>
  </div>
  )
}

export default Confirm;