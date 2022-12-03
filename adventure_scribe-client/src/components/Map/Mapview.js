import './Mapview.scss';
import { MapContainer, ImageOverlay, Marker, Popup, useMapEvents } from 'react-leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from 'react';
import Note from './Note';

function LocationMarker(props) {
  const [markers, setMarkers] = useState(props.markers)
  const [isButtonClicked, setisButtonClicked] = useState(false);

  const markerIconConst = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon,
    iconAnchor: [12, 42],
    popupAnchor: [0, -40],
  })



  const map = useMapEvents({
    click(e) {
      if (!isButtonClicked) {
        let markerClick = { name: "Test", lat: e.latlng.lat, lon: e.latlng.lng };
        setMarkers(prev => [...prev, markerClick]);
      }
    },
    popupopen() {
      setisButtonClicked(true);
    },
    popupclose() {
      setisButtonClicked(false);
      props.setCurrentMarker(0);
    }
  })

  const removeMarker = (pos) => {
    setMarkers(current => current.filter(P => { return P.lat !== pos[0] && P.lon !== pos[1] }));
  }

  return markers.map((marker, index) => {
    const position = [marker.lat, marker.lon];
    return (
      <Marker key={index} icon={markerIconConst} position={position} eventHandlers={{
        click: () => {
          props.setCurrentMarker(marker.id);
        }
      }}>
        <Popup>
          <h4>{marker.name}</h4>
          <button onClick={() => removeMarker(position)}>Remove marker</button>
        </Popup>
      </Marker>
    )
  })
}

function Mapview(props) {

  var bounds = [
    [1000, 0],
    [0, 1500],
  ];

  console.log(props, "HERE!!!!!!!!!!!!!!");

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
        <LocationMarker markers={props.campaign.markers} setCurrentMarker={props.setCurrentMarker} />
      </MapContainer>
      {props.noteView ? <Note notes={props.notes} 
      noteView={props.noteView}
      setNoteView={props.setNoteView}/> : null}
    </div>
  );
};

export default Mapview;
