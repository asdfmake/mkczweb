"use client";
import { MapProvider } from "@/lib/map-provider";
import React from "react";
import { MapComponent } from "./MapComponent";

function Map() {
  return (
    <MapProvider>
      <MapComponent />
    </MapProvider>
  );
}

export default Map;
