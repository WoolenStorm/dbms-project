import "leaflet/dist/leaflet.css";

import "./styles.css";
import React, { useState } from "react";
import Map from "./components/Map"
import ControlPanel from "./components/ControlPanel";


const baseUrl = "http://localhost:8080/http://localhost:3001/"

export default function App() {

  const [isChecked, setChecked] = useState(false)

  return (
    <div className="App">
      <div className="leftColumn">
        <Map />
      </div>
      <div className="rightColumn">
        <ControlPanel />
      </div>
    </div >
  );
}

const Fahrrad_type = {
  Lastenfahrrad: "Lastenfahrrad",
  sonstiges: "diverse Fahrräder",
  fahrrad: "Fahrrad",
  herrenfahrrad: "Herrenfahrrad",
  kinderfahrrad: "Kinderfahrrad",
  mountainbike: "Mountainbike",
  rennrad: "Rennrad",
  damenfahrrad: "Damenfahrrad"
}
