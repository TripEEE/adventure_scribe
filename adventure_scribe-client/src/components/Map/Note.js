import './Note.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function Note(props) {
  return (
    <div class="col-md-6 noteDiv">
      <div class="h-100 p-5 text-bg-dark rounded-3">
        <h2>Change the background</h2>
        <p>Swap the background-color utility and add a `.text-*` color utility to mix up the jumbotron look. Then, mix and match with additional component themes and more.</p>
        <button class="btn btn-outline-light" type="button">Save</button>
        <button class="btn btn-outline-light" type="button">Close</button>
      </div>
    </div>
  )
}

export default Note;