import "leaflet/dist/leaflet.css";

import "./styles.css";
import React, { useState, useEffect } from "react";
import axios from "axios"
import Checkbox from "./components/Checkbox";
import Map from "./components/Map"
import Date from "./components/Date"


const baseUrl = "http://localhost:8080/http://localhost:3001/"

export default function App() {

  const [isChecked, setChecked] = useState(false)

  useEffect(() => {
    getByMonths(1, 1)
  }, [])


  return (
    <div className="App">
      <div className="leftColumn">
        <Map />
      </div>
      <div className="rightColumn">
        <Checkbox label="Hi there" isChecked={isChecked} setChecked={setChecked} />
        <Date />
      </div>
    </div>
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

const getByMonths = async (startMonth, endMonth) => {

  console.log(`getByMonths(${startMonth}, ${endMonth})`)
  const url = baseUrl + "get-by-months"

  if (!Number.isInteger(startMonth) || !Number.isInteger(endMonth))
    throw console.error("Invalid arguments: two integers expected")
  if (startMonth > 12 || startMonth < 1 || endMonth > 12 || endMonth < 1)
    throw console.error("Arguments out of range: arguments have to be between 1 and 12")
  if (startMonth > endMonth) {
    const temp = startMonth
    startMonth = endMonth
    endMonth = temp
  }
  axios.get(url, {
    params: {
      startMonth: startMonth,
      endMonth: endMonth
    }
  }).then((response) => {
    console.log(response.status)
  }).catch((error) => {
    console.log(error)
  })
}
