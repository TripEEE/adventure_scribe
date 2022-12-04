import 'bootstrap/dist/css/bootstrap.min.css';

function Create(props) {

  return (
    <div className="h-100 p-5 text-bg-dark rounded-3">
      <div className="d-flex flex-row justify-content-between">
        <div className="d-flex flex-column col-4">
          <label htmlFor="Title">Title</label>
          <input type="text" name="Title" placeholder="Title"></input>
        </div>
        <div className="d-flex flex-column justify-content-end col-3">
          <label htmlFor="Category">Category</label>
          <input type="text" name="Category" placeholder="Category"></input>
        </div>
      </div>
      <div className="d-flex flex-column">
        <label htmlFor="Description">Description</label>
        <textarea name="Description" id="description "placeholder="Description"></textarea>
      </div>
      <div className="d-flex justify-content-between">
        <button className="btn btn-outline-light" type="button">Save</button>
        <button className="btn btn-outline-light" type="button" onClick={() => props.setNoteView(null)}>Close</button>
      </div>
    </div>
  )
}

export default Create;