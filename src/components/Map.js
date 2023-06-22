import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const position = [52.52, 13.405]

export default function Map() {

    const DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
    });

    // const customIcon = L.icon({
    //     //iconUrl: "https://cdn-icons-png.flaticon.com/128/149/149059.png",
    //     iconUrl: require("./assets/pin.png"),
    //     iconSize: [38, 38],
    //   });

    L.Marker.prototype.options.icon = DefaultIcon;
    return (
        <div className="mapContainer">
            <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
    )
}