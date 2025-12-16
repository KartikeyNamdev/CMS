"use client";

import React, { useEffect, useState } from "react";
import { BoltIcon } from "@heroicons/react/24/solid";
import { useDataStore } from "@/store/useDataStore";
import { Charger, Station } from "@/lib/types";

const ZustandTestComponent = () => {
  const companies = useDataStore((state) => state.companies);
  const getStationsByCompany = useDataStore(
    (state) => state.getStationsByCompany
  );
  const getChargersByStation = useDataStore(
    (state) => state.getChargersByStation
  );
  const selectedStation = useDataStore((state) => state.selectedStation);
  const setSelectedStation = useDataStore((state) => state.setSelectedStation);

  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(
    null
  );
  const [selectedStationId, setSelectedStationId] = useState<string | null>(
    null
  );
  const [stations, setStations] = useState<Station[]>([]);
  const [chargers, setChargers] = useState<Charger[]>([]);

  // Fetch stations when company changes
  useEffect(() => {
    function load() {
      if (selectedCompanyId) {
        const filteredStations = getStationsByCompany(selectedCompanyId);
        setStations(filteredStations);
        console.log(
          `📍 Loaded ${filteredStations.length} stations for company: ${selectedCompanyId}`
        );

        // Reset station and charger selection when company changes
        setSelectedStationId(null);
        setSelectedStation(null);
        setChargers([]);
      } else {
        setStations([]);
        setChargers([]);
      }
    }
    load();
  }, [selectedCompanyId, getStationsByCompany, setSelectedStation]);

  // Fetch chargers when station changes
  useEffect(() => {
    function load() {
      if (selectedStationId) {
        const filteredChargers = getChargersByStation(selectedStationId);
        setChargers(filteredChargers);
        console.log(
          `⚡ Loaded ${filteredChargers.length} chargers for station: ${selectedStationId}`
        );
      } else {
        setChargers([]);
      }
    }
    load();
  }, [selectedStationId, getChargersByStation]);

  const handleCompanyClick = (companyId: string) => {
    setSelectedCompanyId(companyId);
  };

  const handleStationClick = (station: Station) => {
    setSelectedStation(station);
    setSelectedStationId(station.id);
  };

  const handleClearSelection = () => {
    setSelectedStation(null);
    setSelectedStationId(null);
    setChargers([]);
  };

  return (
    <div className="p-8 bg-transparent text-gray-800 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-red-500/80">
        DABAS Host Station Charger Management
      </h1>

      {/* SECTION 1: Company List */}
      <div className="mb-8 p-4 border border-gray-700 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">
          1. Companies (Hosts/CPOs)
        </h2>
        <div className="space-y-3">
          {companies.map((company) => (
            <div
              key={company.id}
              className={`flex justify-between items-center p-3 rounded-md cursor-pointer transition-colors ${
                selectedCompanyId === company.id
                  ? "bg-[#b22828] hover:bg-[#f7d0d0] text-white hover:text-black"
                  : "hover:bg-red-200/40 bg-gray-200/20 border border-gray-300"
              }`}
              onClick={() => handleCompanyClick(company.id)}
            >
              <span>
                {company.name} ({company.type}) - {company.taxId}
              </span>
              <BoltIcon className="w-5 h-5" />
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: Station List */}
      {selectedCompanyId && (
        <div className="mb-8 p-4 border border-gray-700 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">
            2. Stations for{" "}
            {companies.find((c) => c.id === selectedCompanyId)?.name}
          </h2>
          <div className="space-y-3">
            {stations.length > 0 ? (
              stations.map((station) => (
                <div
                  key={station.id}
                  className={`p-3 rounded-md cursor-pointer transition-colors ${
                    selectedStation?.id === station.id
                      ? "bg-[#b22828] hover:bg-[#f7d0d0] text-white hover:text-black"
                      : "hover:bg-red-200/40 bg-gray-200/20 border border-gray-300"
                  }`}
                  onClick={() => handleStationClick(station)}
                >
                  <p className="font-medium">{station.stationName}</p>
                  <p
                    className={`text-sm ${
                      selectedStation?.id === station.id
                        ? "text-white"
                        : "text-black"
                    }`}
                  ></p>
                </div>
              ))
            ) : (
              <p className="text-gray-800">
                No stations found for this company.
              </p>
            )}
          </div>
        </div>
      )}

      {/* SECTION 3: Chargers */}
      <div className="p-4 border border-gray-700 rounded-lg bg-gray-200">
        <h2 className="text-xl font-semibold mb-3">
          3. Available Chargers for {selectedStation?.stationName || "..."}
        </h2>
        {selectedStation ? (
          <div>
            <p className="text-lg text-green-500 font-bold">
              ✅ Station Selected:
            </p>
            <p>
              {selectedStation.stationName} (ID: {selectedStation.id})
            </p>

            {chargers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {chargers.map((charger) => (
                  <div
                    key={charger.id}
                    className="p-6 relative rounded-xl shadow-xl overflow-hidden
                      bg-white/50 hover:bg-[#FFE6D4]
                      backdrop-filter backdrop-blur-md
                      border border-gray-300 border-opacity-30"
                  >
                    <p className="font-semibold">{charger.ocppId}</p>
                    <p className="text-sm text-gray-600">
                      {charger.chargerType} - {charger.powerRating}
                    </p>
                    <p className="text-xs text-gray-500">
                      Status: {charger.operationalStatus}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Connectors: {charger.numConnectors}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 mt-4">
                No chargers found for this station.
              </p>
            )}

            <button
              onClick={handleClearSelection}
              className="mt-4 text-sm bg-[#b22828] hover:bg-[#f7d0d0] px-4 py-2 text-white rounded-lg hover:text-black"
            >
              Clear Selection
            </button>
          </div>
        ) : (
          <p className="text-gray-500">
            No station is currently selected (Simulating profile navigation
            context).
          </p>
        )}
      </div>
    </div>
  );
};

export default ZustandTestComponent;
