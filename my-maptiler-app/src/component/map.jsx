import React, { useRef, useEffect } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
// import leafIcon from "../assets/leaf-solid.svg";
import "./map.css";

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const Danang = { lng: 108.20251573786985, lat: 16.057196900232977 };
  const zoom = 14;

  maptilersdk.config.apiKey = "T5qroqMas9wqNzGvQu8O";

  useEffect(() => {
    if (map.current) return; // stops map from initializing more than once

    // Khởi tạo map
    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.BASIC,
      center: [Danang.lng, Danang.lat],
      zoom: zoom,
    });

    // Marker trung tâm
    new maptilersdk.Marker({ color: "#FF0000" })
      .setLngLat([Danang.lng, Danang.lat])
      .addTo(map.current);

    // Marker kéo thả mẫu
    new maptilersdk.Marker({ color: "#FF0000", draggable: true })
      .setLngLat([108.223477, 16.058496])
      .setPopup(new maptilersdk.Popup().setHTML("<p>Xanh</p>"))
      .addTo(map.current);

    // Tạo custom icon
    const customIcon = document.createElement("div");
    customIcon.style.width = "40px";
    customIcon.style.height = "40px";
    // customIcon.style.backgroundImage = `url(${leafIcon})`; // Nếu có icon thì mở ra
    customIcon.style.backgroundImage = `url('https://cdn-icons-png.flaticon.com/512/616/616408.png')`; // Tạm thời dùng icon này
    customIcon.style.backgroundSize = "contain";
    customIcon.style.backgroundRepeat = "no-repeat";
    customIcon.style.cursor = "pointer";

    // Danh sách địa điểm (lng, lat)
    const locations = [
      {
        name: "Nhà vọng cảnh",
        coordinates: [108.24571881014124, 16.13699881038354],
      },
      {
        name: "Chùa Linh Ứng",
        coordinates: [108.27746272331284, 16.10277679843931],
      },
      {
        name: "InterContinental Danang Sun Peninsula Resort",
        coordinates: [108.3080838614205, 16.122683157400715],
      },
      {
        name: "Hải đăng Sa Tiên",
        coordinates: [108.32278200771216, 16.142097286225404],
      },
      {
        name: "Mũi Nghê",
        coordinates: [108.33594909709848, 16.12072202850415],
      },
    ];

    // Thêm marker cho từng địa điểm
    locations.forEach((location) => {
      const iconElement = customIcon.cloneNode(true); // clone icon cho từng marker
      new maptilersdk.Marker({ element: iconElement })
        .setLngLat(location.coordinates)
        .setPopup(new maptilersdk.Popup().setHTML(`<h3>${location.name}</h3>`))
        .addTo(map.current);
    });
  }, [Danang.lng, Danang.lat, zoom]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}