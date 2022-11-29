import './Mapview.scss';
import { MapContainer, ImageOverlay, Marker, Popup, useMapEvent, useMapEvents } from 'react-leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from 'react';

function LocationMarker() {
  const [position, setPosition] = useState([])
  const markerIconConst = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon,
    iconAnchor: [12, 42],
    popupAnchor: [0, -40],
  })

  const map = useMapEvents({
    click(e) {
      console.log(e);
      let markerClick = [e.latlng.lat, e.latlng.lng];
      setPosition(prev => [...prev, markerClick]);
    }
  })

  return position.map ((marker) => {
    return (
    <Marker icon={markerIconConst} position={marker}>
      <Popup>You are here</Popup>
    </Marker>
    )
  })
}

function Mapview() {

  var bounds = [
    [1000, 0],
    [0, 1500],
  ];


  return (
    <MapContainer
      crs={L.CRS.Simple}
      bounds={bounds}
      maxZoom={4.9}
      minZoom={0}
      onzoomstart={(e) => console.log(e)}
      attributionControl={false}
    >
      <ImageOverlay
        url={"https://i.redd.it/a57rfqm9nj071.jpg"}
        bounds={bounds}
      />
      <LocationMarker />
    </MapContainer>
  );
};

// <Marker icon={markerIconConst} position={[500, 750]}>
//   <Popup>
//     Test popup.
//   </Popup>
// </Marker>
export default Mapview;
