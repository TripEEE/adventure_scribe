import 'bootstrap/dist/css/bootstrap.min.css';

function Edit(props) {
  return (
    <div className="h-100 p-5 text-bg-dark rounded-3">
      <div className="d-flex justify-content-between">
        <input type="text" placeholder={props.notes.title}></input>
        <input type="text" placeholder={props.notes.category}></input>
      </div>
      <input type="text" placeholder={props.notes.description}></input>
      <div className="d-flex justify-content-between">
        <button className="btn btn-outline-light" type="button">Save</button>
        <button className="btn btn-outline-light" type="button" onClick={() => props.setNoteView(null)}>Close</button>
      </div>
    </div>
  )
}

export default Edit;