import L from "leaflet";
import { useEffect } from "react";
import "leaflet.heat"
// https://github.com/IHKBerlin/IHKBerlin_Gewerbedaten/tree/595d12d0fdc3d94c613411d0742e7efb598ef853
// and some postgres magic

const position = [52.5, 13.405]

export default function MapComponent({ theftsToShow }) {        // [latitude, longitude, intensity]
    useEffect(() => {

        var map = L.map("map", { dragging: true }).setView(position, 12)
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map)

        if (theftsToShow !== undefined && theftsToShow !== null) {
            L.heatLayer(theftsToShow).addTo(map)
        }

        return () => {
            map.remove()
        }
    })

    return <div id="map" style={{ height: "60vh" }}></div>
}
