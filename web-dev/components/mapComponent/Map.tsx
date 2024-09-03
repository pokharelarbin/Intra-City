"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import axios from "axios";
import Loading from "./Loader";
import { useStations } from "@/context/StationsContext";
import { Button } from "../ui/button";

const createCustomIcon = (svgContent: string) =>
  new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(svgContent)}`,
    iconSize: [30, 30], // adjust icon size
  });

const pointerIcon = createCustomIcon(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" width="24px" height="24px">
      <path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2C8.13 2 5 5.13 5 9c0 3.93 4.39 9.44 6.33 11.85.38.47 1.03.47 1.41 0C14.61 18.44 19 12.93 19 9c0-3.87-3.13-7-7-7zm0 11.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `);

const FocusMap = ({ handlePoints, setLoading }: any) => {
  const map = useMap();
  const [isMapClickable, setIsMapClickable] = useState(false);

  useEffect(() => {
    if (handlePoints) {
      const onClickHandler = async (event: any) => {
        if (!isMapClickable) return;
        const { lat, lng } = event.latlng;
        setLoading(true); // Show loader
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const locationName = response.data.display_name.split(",").slice(0, 2).join(",");
        handlePoints({ id: `${new Date().toISOString()}-${lat}-${lng}`, lat, lng, locationName });
        setLoading(false); // Hide loader
        setIsMapClickable(false); // Disable map click after handlePoints is invoked
      };

      map.on("click", onClickHandler);
      return () => {
        map.off("click", onClickHandler);
      };
    }
  }, [map, handlePoints, isMapClickable, setLoading]);

  useEffect(() => {
    setIsMapClickable(true); // Enable map click when component mounts
  }, [isMapClickable]);

  return null;
};

const MapComponent = () => {
  const { stations, setStations, polylineCoords,setPolylineCoords } = useStations();
  const [loading, setLoading] = useState(false);
  const handlePoints = (point: any) => {
    const _locations = [...stations, point];
    _locations.sort((a, b) => (a.id < b.id ? 1 : -1)); //sort the locations by id wit latest id first
    setStations(_locations);
  };

    return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 z-[1001] flex justify-center items-center">
          <Loading />
        </div>
      )}
      <MapContainer
        center={[27.709776, 85.314603]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <FocusMap handlePoints={handlePoints} setLoading={setLoading} />
        {stations.map((station: any) => (
          <Marker
            key={station.id}
            position={[station.lat, station.lng]}
            icon={pointerIcon}
          >
            <Popup>{station.locationName}</Popup>
          </Marker>
        ))}
        {
          polylineCoords.length > 0 && polylineCoords?.map((coords, index) => (
          <Polyline           
            key={index}            
            positions={coords?.polylineCoords}
          />
        ))}
      </MapContainer>
      <Button
        onClick={() => {
          setStations([]);
          setPolylineCoords([]);
        }}
        className="absolute top-2 right-2 z-[1001] p-2 bg-slate-300 text-gray-800 hover:bg-gray-300 rounded-md"
      >
        Clear Map
      </Button>
    </div>
  );
};

export default MapComponent;
