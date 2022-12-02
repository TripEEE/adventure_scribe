import NoteItem from "./NoteItem";
import Mapview from "./Mapview";
import { useEffect, useState } from "react";
import Note from "./Note";

function MainContainer(props) {
  const [currentMarker, setCurrentMarker] = useState(null);
  const [currentNote, setCurrentNote] = useState(null);
  const [noteView, setNoteView] = useState(null);
  const [campaign, setCampaign] = useState({
    map: {
      id: "1",
      name: "Barovia",
      link: "https://i.redd.it/a57rfqm9nj071.jpg"
    },
    markers: [
      {
        id: 1,
        name: "Location 1",
        lat: "350.25",
        lon: "500"
      },
      {
        id: 2,
        name: "Location 2",
        lat: "600",
        lon: "800"
      },
      {
        id: 3,
        name: "Location 3",
        lat: "700",
        lon: "900"
      }
    ]
  })

  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Big Bad Monster",
      description: "here is a description of the location",
      category: "Bestiary"
    },
    {
      id: 2,
      title: "Barovia",
      description: "here is a description of the location that is more decriptive or something",
      category: "Location"
    }
  ]
  );

  useEffect(() => {
    console.log(currentMarker, currentNote, notes, noteView);
  })

  const displayNotes = notes.map((note) => {
    return (
      <NoteItem key={note.id}
        id={note.id}
        title={note.title}
        description={note.description}
        category={note.category}
        setCurrentNote={setCurrentNote}
        setNoteView={setNoteView} />
    )
  })

  // use link element from react router DOM instead of anchor href
  return (
    <div>
      <div className="d-flex">
        {currentMarker ? <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
          <div className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
            <svg className="bi pe-none me-2" width="30" height="24"></svg>
            <span className="fs-5 fw-semibold">Notes</span>
          </div>
          {displayNotes}
          <button type="button" className="btn btn-outline-success newNoteButton" onClick={() => setNoteView("CREATE")}>Add New Note</button>
        </div> : null}
      <Mapview campaign={campaign}
        setCurrentMarker={setCurrentMarker}
        noteView={noteView}
        setNoteView={setNoteView}
        notes={notes.find(x => x.id === currentNote)}
      />
      </div>
    </div>
  )
}

export default MainContainer;