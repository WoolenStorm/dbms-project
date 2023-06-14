import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./styles.css";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

export default function App() {
  const position = [48.856, 2.3522];
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
      <h1>Hello CodeSandbox</h1>
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
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
