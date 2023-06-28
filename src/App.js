import "leaflet/dist/leaflet.css";

import "./styles.css";
import React, { useState, useEffect } from "react";
import Map from "./components/Map"
import ControlPanel from "./components/ControlPanel";
import axios from "axios";


const apiUrl = "https://oberon.yangnet.de/api/BicycleTheft/"

export default function App() {

  useEffect(() => {
    // fetchData()
  }, [])

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

// const Fahrrad_type = {
//   lastenfahrrad: "Lastenfahrrad",
//   sonstiges: "diverse Fahrräder",
//   fahrrad: "Fahrrad",
//   herrenfahrrad: "Herrenfahrrad",
//   kinderfahrrad: "Kinderfahrrad",
//   mountainbike: "Mountainbike",
//   rennrad: "Rennrad",
//   damenfahrrad: "Damenfahrrad"
// }


const fetchData = (params) => {
  axios({
    method: "get",
    url: apiUrl,
    params: params
  })
    .then(res => {
      console.log("data")
      console.log(res.data)
    })
}