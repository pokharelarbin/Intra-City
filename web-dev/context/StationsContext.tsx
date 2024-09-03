import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

type Station = {
  id: string;
  locationName: string;
  lat: number;
  lng: number;
};

type StationsContextType = {
  stations: Station[];
  setStations: React.Dispatch<React.SetStateAction<Station[]>>;
  polylineCoords: any[];
  setPolylineCoords: React.Dispatch<React.SetStateAction<Station[]>>
};

const StationsContext = createContext<StationsContextType | undefined>(undefined);

export const StationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stations, setStations] = useState<Station[]>([]);
  const [polylineCoords, setPolylineCoords] = useState<any[]>([]);

  const getPossibleRoutes = async (initial_coordinates: Station, final_coordinates: Station) => {
    const allCoordinates = [
      initial_coordinates,
      ...stations,
      final_coordinates,
    ];
    const pointsParam = allCoordinates
      .map((coord) => `${coord.lat},${coord.lng}`)
      .join('&point=');
    const url = `http://gotoapp.net:8989/route?profile=car&point=${pointsParam}&points_encoded=false`;
    let alternative_routes_data: any;
    try {
      alternative_routes_data = await axios.get(url);
    } catch (e) {
      console.log('error', e);
    }

    const routeCoords:any = alternative_routes_data?.data.paths;
    const reversedPolylineCoords = Array.isArray(routeCoords) 
  ? routeCoords.map((polyline: any) => ({
      polylineCoords: polyline?.points?.coordinates.map((coord: any) => ({
        lat: coord[1],
        lng: coord[0],
      })),
    }))
  : [];
    setPolylineCoords(reversedPolylineCoords);
  };

  useEffect(() => {
    if (stations.length > 1) {
      getPossibleRoutes(stations[0], stations[stations.length - 1]);
    }
  }, [stations]);

  return (
    <StationsContext.Provider value={{ stations, setStations, polylineCoords,setPolylineCoords }}>
      {children}
    </StationsContext.Provider>
  );
};

export const useStations = () => {
  const context = useContext(StationsContext);
  if (!context) {
    throw new Error("useStations must be used within a StationsProvider");
  }
  return context;
};