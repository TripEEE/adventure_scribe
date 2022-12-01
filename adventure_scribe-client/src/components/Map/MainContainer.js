import NoteItem from "./NoteItem";
import Mapview from "./Mapview";
import { useState } from "react";

function MainContainer(props) {
  const [campaign, setCampaign] = useState({
    map: {
      id: "1",
      name: "Barovia",
      link: "https://i.redd.it/a57rfqm9nj071.jpg"
    },
    markers: [
      {
        name: "Location 1",
        lat: "350.25",
        lon: "500"
      },
      {
        name: "Location 2",
        lat: "600",
        lon: "800"
      },
      {
        name: "Location 3",
        lat: "700",
        lon: "900"
      }
    ]
  })

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
      <NoteItem key={note.id}
        title={note.title}
        description={note.description}
        category={note.category} />
    )
  })

  // use link element from react router DOM instead of anchor href
  return (
    <div className="d-flex">
      <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
        <div className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
          <svg className="bi pe-none me-2" width="30" height="24"></svg>
          <span className="fs-5 fw-semibold">Notes</span>
        </div>
        {displayNotes}
        <button type="button" className="btn btn-outline-success newNoteButton">Add New Note</button>
      </div>
      <Mapview campaign={campaign}/>
    </div>
  )
}

export default MainContainer;