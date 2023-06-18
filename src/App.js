import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./styles.css";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import React, { useState, useEffect } from "react";
import axios from "axios"

const baseUrl = "http://localhost:8080/http://localhost:3001/"

export default function App() {

  useEffect(() => {
    getByMonths(1, 12)
  })

  const [position, setPosition] = useState([52.52, 13.405]);
  // console.log(position)
  const markers = [
    {
      geocode: [48.86, 2.3522],
      popUp: "I am popup 1",
    },
    {
      geocode: [48.85, 2.3522],
      popUp: "I am popup 2",
    },
    {
      geocode: [48.855, 2.34],
      popUp: "I am popup 3",
    },
  ];

  const customIcon = L.icon({
    //iconUrl: "https://cdn-icons-png.flaticon.com/128/149/149059.png",
    iconUrl: require("./assets/pin.png"),
    iconSize: [38, 38],
  });

  const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  return (
    <div className="App">
      <div className="Container">
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers.map((marker) => (
            <Marker position={marker.geocode} icon={customIcon}>
              <Popup>{marker.popUp}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
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
