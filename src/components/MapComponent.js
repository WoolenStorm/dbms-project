import { MapContainer, Marker, TileLayer, Popup, useMap } from "react-leaflet";
import { } from "react-leaflet"
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useEffect } from "react";
import "leaflet.heat"

// https://github.com/IHKBerlin/IHKBerlin_Gewerbedaten/tree/595d12d0fdc3d94c613411d0742e7efb598ef853
// and some postgres magic
import coordinates from "../coordinates.json"

const position = [52.5, 13.405]

export default function MapComponent({ theftsToShow }) {        // [latitude, longitude, intensity]

    console.log(theftsToShow)
    useEffect(() => {
        var container = L.DomUtil.get('map')
        if (container != null) container._leaflet_id = null

        var map = L.map("map").setView(position, 12)
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map)

        console.log(theftsToShow)

        if (theftsToShow !== null) {
            L.heatLayer(theftsToShow).addTo(map)
        }
    }, [theftsToShow])

    return <div id="map" style={{ height: "60vh" }}></div>

    // useEffect(() => {
    //     console.log("MapComponent")
    //     if (theftsToShow !== null) L.heatLayer(theftsToShow).addTo(L.map);
    // });

    // const DefaultIcon = L.icon({
    //     iconUrl: icon,
    //     shadowUrl: iconShadow,
    // });

    // // const customIcon = L.icon({
    // //     //iconUrl: "https://cdn-icons-png.flaticon.com/128/149/149059.png",
    // //     iconUrl: require("./assets/pin.png"),
    // //     iconSize: [38, 38],
    // //   });

    // L.Marker.prototype.options.icon = DefaultIcon;
    // return (
    //     <div className="mapContainer">
    //         <MapContainer center={position} zoom={11} scrollWheelZoom={false}>
    //             <HeatLayer data={theftsToShow} />
    //             <TileLayer
    //                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //             />
    //             {
    //                 // just to check if coordinates are fine
    //                 // coordinates.map((object) =>
    //                 //     <Marker position={[object.latitude, object.longitude]}>
    //                 //         <Popup>{`(${object.latitude}, ${object.longitude})`}</Popup>
    //                 //     </Marker>
    //                 // )
    //             }
    //         </MapContainer>
    //     </div>
    // )
}
