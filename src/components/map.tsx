"use client";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function Map() {
  useEffect(() => {
    const mapContainer = document.getElementById("map");

    // prevent double init if React Fast Refresh runs
    if (!mapContainer || mapContainer.hasChildNodes()) return;

    // create the map
    const map = L.map(mapContainer).setView([51.505, -0.09], 13);

    // add a tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // example marker
    L.marker([51.505, -0.09]).addTo(map).bindPopup("Hello from Leaflet!");

    // cleanup on unmount
    return () => {
      map.remove();
    };
  }, []);

  return (
    <div
      id="map"
      style={{ height: "500px", width: "100%" }}
      className="rounded-xl shadow-md"
    />
  );
}
