import "leaflet/dist/leaflet.css";

import "./styles.css";
import React, { useState, useEffect } from "react";
import Map from "./components/Map"
import ControlPanel from "./components/ControlPanel";
import axios from "axios";
import dayjs from "dayjs";

const apiUrl = "https://oberon.yangnet.de/api/BicycleTheft/"


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
  const [maxDamage, setMaxDamage] = useState(100)

  useEffect(() => {
    fetchData({ chosenBikes, startDate, endDate, minDamage, maxDamage })
  }, [chosenBikes, startDate, endDate, minDamage, maxDamage])

  return (
    <div className="App">
      <div className="leftColumn">
        <Map />
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
        />
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


const fetchData = ({ chosenBikes, startDate, endDate, minDamage, maxDamage }) => {
  axios({
    method: "get",
    url: apiUrl,
    params: {
      min_date: `${startDate.year()}-${startDate.month() + 1}-${startDate.date()}`,
      max_date: `${endDate.year()}-${endDate.month() + 1}-${endDate.date()}`,
      // min_damage: min_damage,
      // max_damage: max_damage
    }
  })
    .then(res => {
      const bools = Object.values(chosenBikes)
      let types = Object.keys(chosenBikes)
      types = types.filter((_, index) => bools[index])
      const result = res.data.filter((object) => types.includes(object.bikeType.toLowerCase()))
      console.log(result)
    })
}