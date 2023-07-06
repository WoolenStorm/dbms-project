import "leaflet/dist/leaflet.css";

import "./styles.css";
import React, { useState, useEffect, useMemo } from "react";
import MapComponent from "./components/MapComponent"
import ControlPanel from "./components/ControlPanel";
import axios from "axios";
import dayjs from "dayjs";
import { RotatingLines } from "react-loader-spinner";
import PieChartDiagram from "./components/PieChartDiagram";

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


  const MapDiv = useMemo(
    () => <MapComponent theftsToShow={theftsToShow} />,
    [theftsToShow]
  )

  const PieChart = useMemo(
    () => {
      if (theftsToShow === null || theftsToShow.size === 0) return <></>
      else return <PieChartDiagram theftsToShow={theftsToShow} />
    },
    [theftsToShow]
  )

  return (
    <div className="App">
      <div className="leftColumn">
        {isFetched ?
          <div>
            {MapDiv}
          </div> :
          <div className="loadingSpinnerContainer" >
            <RotatingLines width="280" strokeColor="#36FCC0" animationDuration="0.85" strokeWidth="5" />
          </div>}
        {PieChart}
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
          enabled={isFetched}
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
  return theftsFiltered
}
