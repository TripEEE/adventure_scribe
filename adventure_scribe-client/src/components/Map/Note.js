import './Note.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import View from './NoteViews/View';
import Edit from './NoteViews/Edit';
import Create from './NoteViews/Create';
import Confirm from './NoteViews/Confirm';

function Note(props) {
  console.log(props.noteView)
  return (
    <div className="noteDiv">
      {props.noteView === "VIEW" && <View notes={props.notes} setNoteView={props.setNoteView}/>}

      {props.noteView === "EDIT" && <Edit
      currentMarker={props.currentMarker}
      campaignID={props.campaignID} 
      notes={props.notes}
      setNoteView={props.setNoteView} 
      setNotes={props.setNotes}/>}

      {props.noteView === "CREATE" && <Create 
      setNoteView={props.setNoteView} 
      setNotes={props.setNotes} 
      currentMarker={props.currentMarker} 
      campaignID={props.campaignID}/>}

      {props.noteView === "CONFIRM" && <Confirm 
      setNoteView={props.setNoteView} 
      setNotes={props.setNotes}
      campaignID={props.campaignID}
      currentMarker={props.currentMarker}
      notes={props.notes}/>}
    </div>
  )
}

export default Note;