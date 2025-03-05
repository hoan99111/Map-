import React, { useRef, useEffect } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
// import leafIcon from "../assets/leaf-solid.svg";
import "./map.css";

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  //,
  const Danang = { lng: 108.20251573786985, lat: 16.057196900232977 };
  const zoom = 14;
  maptilersdk.config.apiKey = "T5qroqMas9wqNzGvQu8O";

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

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
    // customIcon.style.backgroundImage = `url(${leafIcon})`; // URL hình ảnh
    customIcon.style.backgroundSize = "contain";
    customIcon.style.backgroundRepeat = "no-repeat";
    customIcon.style.cursor = "pointer";

    new maptilersdk.Marker({ element: customIcon })
      .setLngLat([108.223477, 16.058496]) // Văn Miếu
      .setPopup(new maptilersdk.Popup().setHTML("<h3>Bệnh viện</h3>"))
      .addTo(map.current);
  }, [Danang.lng, Danang.lat, zoom]);
  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}
