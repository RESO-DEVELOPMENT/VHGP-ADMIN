import "./Map.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";
import { useState, useEffect } from "react";

export default function BasicMap() {
  const [shippers, setShippers] = useState([
    {
      shipperlocation: [10.8387503, 106.8347127],
    },
    {
      shipperlocation: [10.8376756, 106.832719],
    },
  ]);
  const customIcon = new Icon({
    iconUrl: require("./icon/Shipper.png"),
    iconSize: [30, 30],
  });

  const createClusterCustomIcon = function (cluster) {
    return new divIcon({
      html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true),
    });
  };

  const newShipper = {
    shipperlocation: [10.8391301, 106.8304881],
  };

  setShippers([...shippers, newShipper]);

  console.log(shippers);

  return (
    <>
      <MapContainer center={[10.8387503, 106.8347127]} zoom={13}>
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
        >
          {shippers.map((shipper) => (
            <Marker position={shipper.shipperlocation} icon={customIcon}>
              <Popup>{shipper.popUp}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </>
  );
}
