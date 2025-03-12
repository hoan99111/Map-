// Map.jsx
import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import locations from "../data/data.json"
import Sidebar from "./Sidebar/Sidebar"; // Import Sidebar
import "./map.css";

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const Danang = { lng: 108.20251573786985, lat: 16.057196900232977 };
  const zoom = 14;
 
  maptilersdk.config.apiKey = "T5qroqMas9wqNzGvQu8O";

  useEffect(() => {
    if (map.current) return;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.BASIC,
      center: [Danang.lng, Danang.lat],
      zoom: zoom,
    });

    new maptilersdk.Marker({ color: "#FF0000" })
      .setLngLat([Danang.lng, Danang.lat])
      .addTo(map.current);

    new maptilersdk.Marker({ color: "#FF0000", draggable: true })
      .setLngLat([108.223477, 16.058496])
      .setPopup(new maptilersdk.Popup().setHTML("<p>Xanh</p>"))
      .addTo(map.current);

    const customIcon = document.createElement("div");
    customIcon.style.width = "40px";
    customIcon.style.height = "40px";
    customIcon.style.backgroundImage = `url('https://cdn-icons-png.flaticon.com/512/616/616408.png')`;
    customIcon.style.backgroundSize = "contain";
    customIcon.style.backgroundRepeat = "no-repeat";
    customIcon.style.cursor = "pointer";

    locations.forEach((location) => {
      const iconElement = customIcon.cloneNode(true);
      customIcon.backgroundImage = `url(${location.image})`
      const marker = new maptilersdk.Marker({ element: iconElement })
        .setLngLat(location.coordinates)
        .setPopup(new maptilersdk.Popup().setHTML(`<h3>${location.name}</h3>`))
        .addTo(map.current);

      iconElement.addEventListener("click", () => {
        setSelectedLocation(location);
        setIsSidebarOpen(true);
      });
    });
  }, [Danang.lng, Danang.lat, zoom]);

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    setSelectedLocation(null);
  };

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
      {isSidebarOpen && (
        <Sidebar location={selectedLocation} onClose={handleCloseSidebar} />
      )}
    </div>
  );
}