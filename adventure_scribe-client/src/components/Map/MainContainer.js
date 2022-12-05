import NoteItem from "./NoteItem";
import Mapview from "./Mapview";
import { useEffect, useState } from "react";
import client from "../../client";
import { useSearchParams, useParams } from "react-router-dom";

function MainContainer() {
  const { campaignId } = useParams()

  let [searchParams, setSearchParams] = useSearchParams();



  const [currentMarker, setCurrentMarker] = useState(null);
  const [currentNote, setCurrentNote] = useState(null);

  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  const [notes, setNotes] = useState(null);
  const [noteView, setNoteView] = useState(null);

  const _getCampaign = async (id) => {
    const resp = await client.getCampaignById(id);
    setCampaign(resp);
    setLoading(false);
  }

  const _getMarker = async (campaignID, markerID) => {
    const resp = await client.getMarker(campaignID, markerID);
    setNotes(resp.notes);
  }

  useEffect(() => {
    if (!!currentMarker || !!currentNote) {
      return;
    }

    const openMarkerId = parseInt(searchParams.get("markerId"))
    const openNoteId = parseInt(searchParams.get("noteId"))

    if (openMarkerId) {
      setCurrentMarker(openMarkerId)
    }

    if (openNoteId) {
      setCurrentNote(openNoteId)
      setNoteView("VIEW")
    }

    setSearchParams({})

  }, [])

  useEffect(() => {
    _getCampaign(campaignId);
    if (currentMarker) {
      _getMarker(campaignId, currentMarker,);
    }
  }, [currentMarker, currentNote]);

  const displayNotes = notes?.map((note) => {
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

  return (
    <div>
      {!loading ? <div>
      {campaign ? <div className="d-flex">
        {currentMarker ? <div className="col-3 align-items-stretch flex-shrink-0 bg-white">
          <div className="align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
            <svg className="bi pe-none me-2" width="30" height="24"></svg>
            <span className="fs-5 fw-semibold">Notes</span>
          </div>
          <div className="parentDiv">
            {displayNotes}
          </div>
          <div className="text-center">
            <button type="button" className="btn btn-outline-success newNoteButton" onClick={() => setNoteView("CREATE")}>Add New Note</button>
          </div>
        </div> : null}
        <Mapview campaign={campaign}
          currentNote={currentNote}
          currentMarker={currentMarker}
          setCurrentMarker={setCurrentMarker}
          noteView={noteView}
          setNotes={setNotes}
          setNoteView={setNoteView}
          notes={notes?.find(x => x.id === currentNote)}
        />
      </div> : <div className="alert alert-danger alert-dismissible fade show">You do not have permission to access this campaign or it is not yet created</div>}
      </div> : "Loading..."}
    </div>
  )
}

export default MainContainer;