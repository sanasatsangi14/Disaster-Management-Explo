import MapComponent from "./MapComponent.jsx";
import Sidebar from "./Sidebar.jsx";
import { useState } from "react";
import "./App.css"; 

function App() {
  const [selectedData, setSelectedData] = useState(null);

  return (
    <div className="app-container">
      <Sidebar data={selectedData} />
      <div className="map-container">
        <MapComponent setSelectedData={setSelectedData} />
      </div>
    </div>
  );
}

export default App;

