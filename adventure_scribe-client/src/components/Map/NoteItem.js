import './NoteItem.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function NoteItem(props) {
  return (
      <div onClick={() => {props.setCurrentNote(props.id); props.setNoteView("VIEW")}} className="list-group list-group-flush border-bottom scrollarea clickableNote">
        <div className="list-group-item list-group-item-action py-3 lh-sm" aria-current="true">
          <div className="d-flex w-100 align-items-center justify-content-between">
            <strong className="mb-1">{props.title}</strong>
            <strong className="mb-1">{props.category}</strong>
          </div>
          <div className="col-10 mb-1 small">{props.description}</div>
        </div>
      </div>
  );
};

export default NoteItem;