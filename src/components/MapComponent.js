import L from "leaflet";
import { useEffect } from "react";
import "leaflet.heat"
// https://github.com/IHKBerlin/IHKBerlin_Gewerbedaten/tree/595d12d0fdc3d94c613411d0742e7efb598ef853
// and some postgres magic
import coordinates from "../coordinates.json"

let initialPosition = [52.5, 13.405]
let initialZoom = 12

export default function MapComponent({ theftsToShow }) {        // [latitude, longitude, intensity]

    const idToCoordinatesMap = new Map()
    const idToNumTheftsMap = new Map()
    coordinates.forEach((object) => {
        idToCoordinatesMap.set(object.planungsraum_id, [object.latitude, object.longitude])
        idToNumTheftsMap.set(object.planungsraum_id, 0)
    })

    theftsToShow.forEach((theft) => {
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
    useEffect(() => {
        var map = L.map("map").setView(initialPosition, initialZoom)
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map)

        if (result !== undefined && result !== null) {
            L.heatLayer(result).addTo(map)
        }

        return () => {
            initialPosition = map.getCenter()
            initialZoom = map.getZoom()
            map.off()
            map.remove()
        }
    })

    return <div id="map" style={{ height: "60vh" }}></div>
}

