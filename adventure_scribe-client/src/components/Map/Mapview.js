import './Mapview.scss';
import { MapContainer, ImageOverlay, Marker, Popup, useMapEvents } from 'react-leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from 'react';

function LocationMarker() {
  const [position, setPosition] = useState([])
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
        console.log(e);
        let markerClick = [e.latlng.lat, e.latlng.lng];
        setPosition(prev => [...prev, markerClick]);
      }
    },
    popupopen() {
      setisButtonClicked(true);
      console.log(isButtonClicked);
    },
    popupclose() {
      setisButtonClicked(false);
      console.log(isButtonClicked);
    }
  })

  const removeMarker = (pos) => {
    console.log(pos, position, isButtonClicked);
    setPosition(current => current.filter(P => { return P !== pos }));
  }

  return position.map((marker) => {
    return (
      <Marker icon={markerIconConst} position={marker}>
        <Popup>
          <button onClick={() => removeMarker(marker)}>Remove marker</button>
        </Popup>
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

export default Mapview;
