import 'bootstrap/dist/css/bootstrap.min.css';

function Edit(props) {
  return (
    <div className="h-100 p-5 text-bg-dark rounded-3">
      <div className="d-flex flex-row justify-content-between">
        <div className="d-flex flex-column col-4">
          <label htmlFor="Title">Title</label>
          <input type="text" name="Title" placeholder={props.notes.title}></input>
        </div>
        <div className="d-flex flex-column justify-content-end col-3">
          <label htmlFor="Category">Category</label>
          <input type="text" name="Category" placeholder={props.notes.category}></input>
        </div>
      </div>
      <div className="d-flex flex-column">
        <label htmlFor="Description">Description</label>
        <textarea name="Description" id="description " placeholder={props.notes.description}></textarea>
      </div>
      <div className="d-flex justify-content-between">
        <button className="btn btn-outline-light" type="button">Save</button>
        <button className="btn btn-outline-light" type="button" onClick={() => props.setNoteView(null)}>Close</button>
      </div>
    </div>
  )
}

export default Edit;