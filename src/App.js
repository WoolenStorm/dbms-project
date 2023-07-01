import "leaflet/dist/leaflet.css";

import "./styles.css";
import React, { useState, useEffect, useMemo } from "react";
import MapComponent from "./components/MapComponent"
import ControlPanel from "./components/ControlPanel";
import axios from "axios";
import dayjs from "dayjs";
import { RotatingLines } from "react-loader-spinner";

// https://github.com/IHKBerlin/IHKBerlin_Gewerbedaten/tree/595d12d0fdc3d94c613411d0742e7efb598ef853
// and some postgres magic
import coordinates from "./coordinates.json"

const apiUrl = "https://oberon.yangnet.de/api/BicycleTheft/"

let thefts = []


export default function App() {

  useEffect(() => {
    fetchData(setIsFetched)
  }, [])

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
  const [isFetched, setIsFetched] = useState(false)

  const Map = useMemo(() => <MapComponent theftsToShow={theftsToShow} />, [theftsToShow])

  return (
    <div className="App">
      <div className="leftColumn">
        {isFetched ? Map :
          <div className="loadingSpinnerContainer" >
            <RotatingLines width="280" strokeColor="#36FCC0" animationDuration="0.85" strokeWidth="5" />
          </div>}
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
          setTheftsToShow={setTheftsToShow}
          filterThefts={filterThefts}
        />
      </div>
    </div>
  );
}


const fetchData = (setIsFetched) => {
  axios({
    method: "get",
    url: apiUrl
  })
    .then(res => {
      thefts = res.data
      console.log(thefts)
      setIsFetched(true)
    })
}


const filterThefts = (chosenBikes, startDate, endDate, minDamage, maxDamage) => {

  const idToCoordinatesMap = new Map()
  const idToNumTheftsMap = new Map()
  coordinates.forEach((object) => {
    idToCoordinatesMap.set(object.planungsraum_id, [object.latitude, object.longitude])
    idToNumTheftsMap.set(object.planungsraum_id, 0)
  })

  const bools = Object.values(chosenBikes)
  const types = Object.keys(chosenBikes).filter((_, index) => bools[index])
  const index = types.indexOf("sonstiges")
  types[index] = "diverse fahrräder"

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
      idToNumTheftsMap.set(index, idToNumTheftsMap.get(index) + 1)
    }
  })

  const result = []
  idToNumTheftsMap.forEach((value, key) => {
    if (idToCoordinatesMap.has(key)) {
      const [latitude, longitude] = idToCoordinatesMap.get(key)
      result.push([latitude, longitude, value])
    }
  })

  console.log(theftsFiltered)

  return result
}
