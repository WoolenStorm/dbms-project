import "leaflet/dist/leaflet.css";

import "./styles.css";
import React, { useState, useEffect, useMemo } from "react";
import MapComponent from "./components/MapComponent"
import ControlPanel from "./components/ControlPanel";
import axios from "axios";
import dayjs from "dayjs";
import { RotatingLines } from "react-loader-spinner";
import PieChartDiagram from "./components/PieChartDiagram";
import LineChartByDate from "./components/LineChartByDate";

const apiUrl = "https://uj11w15qwc.execute-api.eu-north-1.amazonaws.com/test/theftspy"

let thefts = []

export default function App() {

  useEffect(() => {
    console.log("useEffect")
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

  const LineChart = useMemo(
    () => {
      if (theftsToShow === null || theftsToShow.size === 0) return <></>
      else return <LineChartByDate theftsToShow={theftsToShow} />
    }, [theftsToShow])

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
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
          {PieChart}
          {LineChart}
        </div>
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
        <div className="glitching">
          <div className="signature">
            Created by Ihar Brandes, Long Yang Paffrath, Jesse Wollatz FU Berlin SoSe 2023
          </div>
        </div>
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
      setIsFetched(true)
      let result = []

      const dateStartIndex = 1 
      const lorIndex = 5
      const damageIndex = 6 
      const typeIndex = 8 
      const lines = res.data.split("\n")

      lines.forEach(line => {
        const values = line.split(",")
        if (values[dateStartIndex] !== undefined) {
          const theft = {
            theftstart: `${values[dateStartIndex].slice(6, 10)}-${values[dateStartIndex].slice(3, 5)}-${values[dateStartIndex].slice(0, 2)}`,
            lor: values[lorIndex],
            damage: values[damageIndex],
            biketype: values[typeIndex],
          }
        thefts.push(theft)
        }
      })
      thefts = thefts.slice(1, result.length - 1)
      console.log(thefts)
    })
    .catch(err => {
      console.log(err)
    })
}


const filterThefts = (chosenBikes, startDate, endDate, minDamage, maxDamage) => {

  const bools = Object.values(chosenBikes)
  const types = Object.keys(chosenBikes).filter((_, index) => bools[index])
  const index = types.indexOf("sonstiges")
  types[index] = "diverse fahrräder"

  const theftsFiltered = thefts.filter(
    (object) => types.includes(object.biketype.toLowerCase())
      && parseInt(object.damage) <= maxDamage
      && parseInt(object.damage) >= minDamage
      && (new Date(object.theftstart) >= new Date(startDate))
      && (new Date(object.theftstart) <= new Date(endDate))
  )
  console.log(new Date("2023-05-11"))
  console.log(theftsFiltered)
  return theftsFiltered
}

