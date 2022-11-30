import './NotesList.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function NotesList(props) {
  return (
      <div class="list-group list-group-flush border-bottom scrollarea clickableNote">
        <a class="list-group-item list-group-item-action py-3 lh-sm" aria-current="true">
          <div class="d-flex w-100 align-items-center justify-content-between">
            <strong class="mb-1">{props.title}</strong>
            <strong class="mb-1">{props.category}</strong>
          </div>
          <div class="col-10 mb-1 small">{props.description}</div>
        </a>
      </div>
  );
};

export default NotesList;