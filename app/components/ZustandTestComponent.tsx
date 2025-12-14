"use client";

import React, { useEffect, useState } from "react";
// Adjust path as needed
import { BoltIcon } from "@heroicons/react/24/solid";
import { useDataStore } from "@/store/useDataStore";

const ZustandTestComponent = () => {
  // 1. Accessing State and Actions
  const {
    companies,
    stations,
    chargers,
    isLoading,
    fetchCompanies,
    fetchStationsByCompany,
    selectedStation,
    setSelectedStation,
    fetchChargersByStation,
  } = useDataStore();

  // Local state to track which company we are viewing stations for
  const [targetCompanyId, setTargetCompanyId] = useState<string | null>(null);
  const [targetStationId, setTargetStationId] = useState<string | null>(null);

  // 2. Fetch companies on mount
  useEffect(() => {
    fetchCompanies();
    console.log(companies);
  }, []);

  // 3. Fetch stations when a company is selected
  useEffect(() => {
    if (targetCompanyId) {
      fetchStationsByCompany(targetCompanyId);
      console.log(stations);
    }
  }, [targetCompanyId, fetchStationsByCompany]);

  useEffect(() => {
    if (targetStationId) {
      fetchChargersByStation(targetStationId);
      console.log(chargers);
    }
  }, [targetStationId, fetchChargersByStation]);

  // --- Render Logic ---

  return (
    <div className="p-8 bg-transparent text-gray-800 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-red-500">
        DABAS Host Station Charger Management
      </h1>

      {isLoading && <p className="text-green-500">Loading data...</p>}

      {/* SECTION 1: Company List (Host Level) */}
      <div className="mb-8 p-4 border border-gray-700 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">
          1. Companies (Hosts/CPOs)
        </h2>
        <div className="space-y-3">
          {companies.map((company) => (
            <div
              key={company.name}
              className={`flex justify-between items-center p-3 rounded-md cursor-pointer transition-colors ${
                targetCompanyId === company.id
                  ? "bg-[#b22828] hover:bg-red-600 text-white"
                  : "bg-white/40 hover:bg-white/80"
              }`}
              onClick={() => setTargetCompanyId(company.id)}
              //   const colors = ["#CD2C58", "#E06B80", "#FFC69D", "#FFE6D4"];
            >
              <span>
                {company.name} ({company.type}) - {company.taxId}
              </span>
              <BoltIcon className="w-5 h-5" />
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: Station List (Child of Host) */}
      {targetCompanyId && (
        <div className="mb-8 p-4 border border-gray-700 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">
            2. Stations for{" "}
            {companies.find((c) => c.id === targetCompanyId)?.name}
          </h2>
          <div className="space-y-3">
            {stations.length > 0 ? (
              stations.map((station) => (
                <div
                  key={station.id}
                  className={`p-3 rounded-md cursor-pointer transition-colors ${
                    selectedStation?.id === station.id
                      ? "bg-[#b22828] hover:bg-red-600 text-white"
                      : "bg-white/40 hover:bg-white/80"
                  }`}
                  onClick={() => {
                    setSelectedStation(station);
                    setTargetStationId(station.id);
                  }}
                >
                  <p className="font-medium">{station.stationName}</p>
                  <p
                    className={`text-sm ${
                      selectedStation?.id === station.id
                        ? "text-white"
                        : "text-black"
                    }`}
                  >
                    {
                      (station.state,
                      station.city,
                      station.street,
                      station.area)
                    }
                  </p>
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

      {/* SECTION 3: Global Selection State */}
      <div className="p-4 border border-gray-700 rounded-lg bg-gray-200">
        <h2 className="text-xl font-semibold mb-3">
          3. Available Charger for {selectedStation?.stationName}
        </h2>
        {selectedStation ? (
          <div>
            <p className="text-lg text-green-500 font-bold">
              ✅ Station Selected:
            </p>
            <p>
              {selectedStation.stationName} (ID: {selectedStation.stationName})
            </p>
            {chargers.map((charger) => {
              return (
                <div
                  key={charger.id}
                  className="p-6 m-2 relative rounded-xl shadow-xl overflow-hidden
   bg-white/50 content-center justify-center hover:bg-[#FFE6D4]
backdrop-filter backdrop-blur-md
border border-gray-300 border-opacity-30 "
                >
                  {charger.ocppId}
                </div>
              );
            })}
            <button
              onClick={() => setSelectedStation(null)}
              className="mt-2 text-sm bg-[#b22828] hover:bg-red-600 px-3 py-3  text-white rounded-lg p-4"
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
