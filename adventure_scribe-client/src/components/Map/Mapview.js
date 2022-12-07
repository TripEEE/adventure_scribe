import './Mapview.scss';
import { MapContainer, ImageOverlay, Marker, Popup, useMapEvents } from 'react-leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from 'react';
import Note from './Note';
import client from '../../client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import Invite from './Invite';

function LocationMarker(props) {
  const [markers, setMarkers] = useState(props.markers || null)
  const [isButtonClicked, setisButtonClicked] = useState(false);
  const [editMarkerTitle, setEditMarkerTitle] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState({});
  const [title, setTitle] = useState(null);

  const markerIconConst = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon,
    iconAnchor: [12, 42],
    popupAnchor: [0, -40],
  })

  console.log(markers, editMarkerTitle);
  const _editMarker = async (campaign_id, marker_id, body) => {
    const resp = await client.editMarker(campaign_id, marker_id, body);
    setMarkers(prev => {
      let newMarkerName = prev;
      let marker = newMarkerName.find(n => n.id === marker_id);
      Object.assign(marker, resp);
      return newMarkerName;
    });
    setEditMarkerTitle({ id: null, edit: false });
  }

  const _createMarker = async (campaignID, marker_note) => {
    const resp = await client.createMarker(campaignID, marker_note);
    setMarkers(prev => [...prev, resp]);
  }

  const _deleteMarker = async (campaignID, markerID) => {
    await client.deleteMarker(campaignID, markerID);
    setMarkers(current => current.filter(P => { return P.id !== markerID }));
    setDeleteConfirm({ id: null, delete: false });
    map.closePopup();
  }

  const editCheck = (id, name) => {
    if (editMarkerTitle.id !== props.currentMarker || !editMarkerTitle.edit) {
      return (<h4 className="clickableHeader" onClick={(e) => { e.stopPropagation(); setEditMarkerTitle({ id: id, edit: true }); }}>{name}</h4>)
    } else {
      return (<div className="d-flex align-items-center justify-content-center">
        <input type="text" className="editTitleField" placeholder={name} onChange={(e) => setTitle(e.target.value)}></input>
        <button type="button" className="btn btn-sm btn-light" onClick={() => _editMarker(props.campaignID, id, { name: title })}><FontAwesomeIcon icon={faCheck} /></button>
        <button type="button" className="btn btn-sm btn-light" onClick={() => _editMarker(props.campaignID, id)}><FontAwesomeIcon icon={faXmark} /></button>
      </div>)
    }
  }

  const deleteCheck = (id) => {
    if (deleteConfirm.id !== props.currentMarker || !deleteConfirm.delete) {
      return (<button className="btn btn-danger" onClick={(e) => { e.stopPropagation(); setDeleteConfirm({ id: id, delete: true }); }}>Remove marker</button>)
    } else {
      return (<div className="d-flex align-items-center justify-content-center">
        <h6 className="deleteMarkerConfirmation">Are you sure?</h6>
        <button type="button" className="btn btn-sm btn-light" onClick={() => _deleteMarker(props.campaignID, id)}><FontAwesomeIcon icon={faCheck} /></button>
        <button type="button" className="btn btn-sm btn-light" onClick={(e) => { e.stopPropagation(); setDeleteConfirm({ id: null, delete: false }); }}><FontAwesomeIcon icon={faXmark} /></button>
      </div>)
    }
  }

  const map = useMapEvents({
    click(e) {
      if (!isButtonClicked) {
        _createMarker(props.campaignID, {
          lat: e.latlng.lat,
          lon: e.latlng.lng,
          name: "Click to Edit Title"
        })
      }
    },
    popupopen() {
      setisButtonClicked(true);
    },
    popupclose() {
      setisButtonClicked(false);
      props.setCurrentMarker(null);
      props.setNoteView(null);
      setEditMarkerTitle({ id: null, edit: false });
      setDeleteConfirm({ id: null, delete: false });
    }
  })

  return markers.map((marker, index) => {
    const position = [marker.lat, marker.lon];
    return (
      <Marker
        draggable={true}
        key={index}
        icon={markerIconConst}
        position={position}
        eventHandlers={{
          click: () => {
            props.setCurrentMarker(marker.id);
          },
          dragend: (e) => {
            _editMarker(props.campaignID, marker.id, { lat: e.target._latlng.lat, lon: e.target._latlng.lng })
          }
        }}>
        <Popup>
          <div className="text-center">
            {editCheck(marker.id, marker.name)}
            {deleteCheck(marker.id)}
          </div>
        </Popup>
      </Marker>
    )
  })
}

function Mapview(props) {
  const [invite, setInvite] = useState(false);
  const [successTracker, setSuccessTracker] = useState(false);

  var bounds = [
    [1000, 0],
    [0, 1500]
  ];

  return (
    <div className="mapDiv">
      <MapContainer
        crs={L.CRS.Simple}
        bounds={bounds}
        maxZoom={4.9}
        minZoom={0}
        onzoomstart={(e) => console.log(e)}
        attributionControl={false}
      >
        <ImageOverlay
          url={props.campaign.map.link}
          bounds={bounds}
        />
        <LocationMarker campaignID={props.campaign.id}
          currentMarker={props.currentMarker}
          setNoteView={props.setNoteView}
          markers={props.campaign.markers}
          setCurrentMarker={props.setCurrentMarker} />
      </MapContainer>
      {props.noteView ? <Note notes={props.notes}
        campaignID={props.campaign.id}
        currentMarker={props.currentMarker}
        setNotes={props.setNotes}
        noteView={props.noteView}
        setNoteView={props.setNoteView} /> : null}
      {invite ? <Invite setInvite={setInvite} campaignID={props.campaign.id} setSuccessTracker={setSuccessTracker} /> :
        <div className="invDiv">
          <button type="button" className="btn btn-success" onClick={() => setInvite(true)}>Invite Player to Campaign</button>
          {successTracker ? <h6 className="text-center successMessage">User Invited Successfully</h6> : null}
        </div>}
    </div>
  );
};

export default Mapview;
