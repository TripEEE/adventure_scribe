import './Mapview.scss';
import { MapContainer, ImageOverlay, Marker, Popup, useMapEvents } from 'react-leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from 'react';
import Note from './Note';
import client from '../../client';

function LocationMarker(props) {
  const [markers, setMarkers] = useState(props.markers || null)
  const [isButtonClicked, setisButtonClicked] = useState(false);

  const markerIconConst = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon,
    iconAnchor: [12, 42],
    popupAnchor: [0, -40],
  })

  const _createMarker = async (campaignID, marker_note) => {
    const resp = await client.createMarker(campaignID, marker_note);
    setMarkers(prev => [...prev, resp]);
  }

  const _deleteMarker = async (campaignID, markerID) => {
    await client.deleteMarker(campaignID, markerID);
    setMarkers(current => current.filter(P => { return P.id !== markerID }));
  }

  const map = useMapEvents({
    click(e) {
      if (!isButtonClicked) {
        
        _createMarker(props.campaignID, {
          lat: e.latlng.lat,
          lon: e.latlng.lng,
          name: "Test"
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
    }
  })

  return markers.map((marker, index) => {
    const position = [marker.lat, marker.lon];
    return (
      <Marker key={index} icon={markerIconConst} position={position} eventHandlers={{
        click: () => {
          props.setCurrentMarker(marker.id);
        }
      }}>
        <Popup>
          <div className="text-center">
            <h4>{marker.name}</h4>
            <button onClick={() => _deleteMarker(props.campaignID, marker.id)}>Remove marker</button>
          </div>
        </Popup>
      </Marker>
    )
  })
}

function Mapview(props) {

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
    </div>
  );
};

export default Mapview;
