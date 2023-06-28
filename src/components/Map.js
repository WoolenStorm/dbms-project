import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// https://github.com/IHKBerlin/IHKBerlin_Gewerbedaten/tree/595d12d0fdc3d94c613411d0742e7efb598ef853
// and some postgres magic
import coordinates from "../coordinates.json"

const position = [52.5, 13.405]

export default function Map(geodata) {

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
            <MapContainer center={position} zoom={11} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    // just to check if coordinates are fine
                    coordinates.map((object) =>
                        <Marker position={[object.latitude, object.longitude]}>
                            <Popup>{`(${object.latitude}, ${object.longitude})`}</Popup>
                        </Marker>
                    )}
            </MapContainer>
        </div>
    )
}