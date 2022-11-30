import NotesList from "./NotesList";
import Mapview from "./Mapview";
import { useState } from "react";

function MainContainer(props) {
  const [notes, setNotes] = useState([
    {
      id: "1",
      title: "Big Bad Monster",
      description: "here is a description of the location",
      category: "Bestiary"
    },
    {
      id: "2",
      title: "Barovia",
      description: "here is a description of the location that is more decriptive or something",
      category: "Location"
    }
  ]
  );

  const displayNotes = notes.map((note) => {
    return (
      <NotesList key={note.id}
        title={note.title}
        description={note.description}
        category={note.category} />
    )
  })

  return (
    <div class="d-flex">
      <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
        <a href="/" class="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
          <svg class="bi pe-none me-2" width="30" height="24"></svg>
          <span class="fs-5 fw-semibold">Notes</span>
        </a>
        {displayNotes}
        <button type="button" class="btn btn-outline-success newNoteButton">Add New Note</button>
      </div>
      <Mapview />
    </div>
  )
}

export default MainContainer;