import "leaflet/dist/leaflet.css";

import "./styles.css";
import React, { useState, useEffect, createContext, useCallback } from "react";
import MapComponent from "./components/MapComponent"
import ControlPanel from "./components/ControlPanel";
import axios from "axios";
import dayjs from "dayjs";
import coordinates from "./coordinates.json"

const apiUrl = "https://oberon.yangnet.de/api/BicycleTheft/"


let thefts = []

export default function App() {

  const [chosenBikes, setChosenBikes] = useState({
    lastenfahrrad: false,
    sonstiges: false,
    fahrrad: false,
    herrenfahrrad: false,
    kinderfahrrad: false,
    mountainbike: false,
    rennrad: false,
    damenfahrrad: false
  })

  const [startDate, setStartDate] = useState(dayjs("2022-01-01"))
  const [endDate, setEndDate] = useState(dayjs("2023-01-01"))
  const [minDamage, setMinDamage] = useState(0)
  const [maxDamage, setMaxDamage] = useState(10000)
  const [theftsToShow, setTheftsToShow] = useState(null)

  useEffect(() => {
    console.log("App")
    if (thefts.length === 0) fetchData()
  })

  return (
    <div className="App">
      <div className="leftColumn">
        <MapComponent theftsToShow={theftsToShow} />
      </div>
      <div className="rightColumn">
        <ControlPanel
          chosenBikes={chosenBikes}
          setChosenBikes={setChosenBikes}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          minDamage={minDamage}
          maxDamage={maxDamage}
          setMinDamage={setMinDamage}
          setMaxDamage={setMaxDamage}
          updateMap={() => setTheftsToShow(filterThefts(chosenBikes, startDate, endDate, minDamage, maxDamage))}
        />
        <button
          className="checkboxContainer"
          onClick={() => setTheftsToShow(filterThefts(chosenBikes, startDate, endDate, minDamage, maxDamage))}
        >
          <label>Aktualisieren</label>
        </button>
      </div>
    </div>
  );
}

const fetchData = () => {
  if (thefts.length === 0) axios({
    method: "get",
    url: apiUrl
  })
    .then(res => {
      thefts = res.data
      console.log(thefts)
    })
}


const filterThefts = (chosenBikes, startDate, endDate, minDamage, maxDamage) => {

  const lors = new Map()
  const lorsCounted = new Map()
  coordinates.forEach((object) => lors.set(object.planungsraum_id, [object.latitude, object.longitude]))
  coordinates.forEach((object) => lorsCounted.set(object.planungsraum_id, 0))

  const bools = Object.values(chosenBikes)
  const types = Object.keys(chosenBikes).filter((_, index) => bools[index])
  const theftsFiltered = thefts.filter(
    (object) => types.includes(object.bikeType.toLowerCase())

      && parseInt(object.damage) <= maxDamage
      && parseInt(object.damage) >= minDamage
      && (new Date(object.theftStart) >= new Date(startDate))
      && (new Date(object.theftStart) <= new Date(endDate))
  )

  theftsFiltered.forEach((theft) => {
    let index = `${theft.lor}`
    if (index.length === 7 || index.length === 8) {
      index = index.length < 8 ? `0${index}` : `${index}`
      lorsCounted.set(index, lorsCounted.get(index) + 1)
    }
  })

  const result = []
  console.log(lorsCounted)
  lorsCounted.forEach((value, key) => {
    if (lors.has(key)) {
      const [latitude, longitude] = lors.get(key)
      result.push([latitude, longitude, value])
    }
  })
  console.log(theftsFiltered)
  console.log(result)

  return result
}
