import { useStations } from "@/context/StationsContext";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";

export const Stations = () => {
  const { stations, setStations } = useStations();
  const [editingStationId, setEditingStationId] = useState<string | null>(null);
  const [newLocationName, setNewLocationName] = useState<string>("");

  const handleEditClick = (stationId: string, currentName: string) => {
    setEditingStationId(stationId);
    setNewLocationName(currentName);
  };

  const handleSaveClick = (stationId: string) => {
    setStations((prevStations) =>
      prevStations.map((station) =>
        station.id === stationId
          ? { ...station, locationName: newLocationName }
          : station
      )
    );
    setEditingStationId(null);
  };

  const handleDeleteClick = (stationId: string) => {
    setStations((prevStations) =>
      prevStations.filter((station) => station.id !== stationId)
    );
  };

  return (
    <div className="overflow-y-auto h-[600px]">
      {stations.length > 0 &&
        stations.map((busStation) => (
          <div
            key={busStation.id}
            className="px-4 py-2 bg-white shadow-md rounded-lg mb-2"
          >
            <div className="mb-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {editingStationId === busStation.id ? (
                  <input
                    type="text"
                    value={newLocationName}
                    onChange={(e) => setNewLocationName(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1"
                  />
                ) : (
                  busStation.locationName
                )}
              </h3>
              <div className="flex justify-between items-end gap-y-1">
                <div className="flex flex-col text-gray-600">
                  <p>Lat: {busStation.lat}</p>
                  <p>Lng: {busStation.lng}</p>
                </div>
                <div className="flex justify-end space-x-2">
                  {editingStationId === busStation.id ? (
                    <Button
                      onClick={() => handleSaveClick(busStation.id)}
                      className="text-green-500 bg-slate-200 hover:bg-slate-300"
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      onClick={() =>
                        handleEditClick(busStation.id, busStation.locationName)
                      }
                      className="bg-whi text-green-500 hover:bg-slate-300 px-2 py-2 rounded-md"
                    >
                      <Image
                        src="/edit.svg"
                        alt="edit"
                        width={20}
                        height={20}
                      />
                    </Button>
                  )}
                  <Button
                    onClick={() => handleDeleteClick(busStation.id)}
                    className="bg-white text-red-500 hover:bg-slate-300 px-2 py-2 rounded-md"
                  >
                    <Image src="/bin.svg" alt="bin" width={20} height={20} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
