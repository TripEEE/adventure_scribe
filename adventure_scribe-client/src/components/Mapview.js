import './Mapview.scss';
import { MapContainer, ImageOverlay, Marker, Popup } from 'react-leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function Mapview() {
  var bounds = [
    [1000, 0],
    [0, 1500],
  ];

  const markerIconConst = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
  })

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
          bounds={[
            [1000, 0],
            [0, 1500],
          ]}
        />
        <Marker icon={markerIconConst} position={[500, 750]}>
          <Popup>
            Test popup.
          </Popup>
        </Marker>
      </MapContainer>
  );
};

export default Mapview;
