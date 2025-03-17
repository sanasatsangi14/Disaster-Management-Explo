import { MapContainer, TileLayer } from "react-leaflet";
import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import fetchData from "./api";
import "./App.css"; 

const MapComponent = ({ setSelectedData }) => {
  const handleCreated = async (e) => {
    const { layer } = e;
    const { _latlngs } = layer;
    if (_latlngs.length > 0) {
      const lat = _latlngs[0][0].lat;
      const lon = _latlngs[0][0].lng;
      const data = await fetchData(lat, lon);
      setSelectedData(data);
    }
  };

  return (
    <MapContainer
      center={[22.9734, 78.6569]} //india ka centre
      zoom={5} 
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={handleCreated}
          draw={{
            rectangle: false,
            circle: false,
            marker: false,
            polyline: false,
            polygon: true, //enablingselection
          }}
        />
      </FeatureGroup>
    </MapContainer>
  );
};

export default MapComponent;

