"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { useDataStore } from "@/store/useDataStore";
import { Station } from "@/lib/types";
import AgDynamicTable from "./AgDynamicTable";
import { ColumnType } from "@/lib/agGrid";

// Register AG Grid Modules
ModuleRegistry.registerModules([AllCommunityModule]);

/* -------------------------------------------
   CELL RENDERERS
------------------------------------------- */
const ActionRenderer = ({
  data,
}: {
  data: { id: string; stationName: string };
}) => {
  return (
    <div className="flex items-center gap-3 text-red-600 text-sm">
      <Link href={data.id ? `/charger/station/edit/${data.id}` : "#"}>
        <span className="hover:text-black cursor-pointer">Edit</span>
      </Link>
      <span className="text-gray-400">|</span>
      <button
        onClick={() => alert("Delete API: " + data.id)}
        className="hover:text-black"
      >
        Delete
      </button>
    </div>
  );
};

const NameRenderer = ({
  data,
}: {
  data: { id: string; stationName: string };
}) => {
  if (!data?.stationName) return <span>--</span>;
  return (
    <Link
      href={`/charger/station/profile/${data.id}`}
      className="text-blue-600 hover:underline"
    >
      {data.stationName}
    </Link>
  );
};

/* -------------------------------------------
   MAIN PAGE COMPONENT
------------------------------------------- */
export default function StationTablePage() {
  const companies = useDataStore((state) => state.companies);
  const getStationsByCompany = useDataStore(
    (state) => state.getStationsByCompany
  );

  const [selectedCompanyId, setSelectedCompanyId] = useState<string>("");
  const [stations, setStations] = useState<Station[]>([]);

  // Auto-select first company on mount
  useEffect(() => {
    function load() {
      if (companies.length > 0 && !selectedCompanyId) {
        setSelectedCompanyId(companies[0].id);
      }
    }
    load();
  }, [companies, selectedCompanyId]);

  // Fetch stations whenever selectedCompanyId changes
  useEffect(() => {
    function load() {
      if (selectedCompanyId) {
        const filteredStations = getStationsByCompany(selectedCompanyId);
        setStations(filteredStations);
        console.log(
          `📍 Loaded ${filteredStations.length} stations for company: ${selectedCompanyId}`
        );
      } else {
        setStations([]);
      }
    }
    load();
  }, [selectedCompanyId, getStationsByCompany]);

  // Convert stations to table rows
  const rowData = useMemo(() => {
    return stations.map((s: Station) => ({
      id: s.id,
      stationName: s.stationName,
      stationId: s.id,
      accessType: s.accessType,
      stateCity: `${s.state}, ${s.city}`,
      locationType: s.alternateAccessType || "--",
      openingHours: s.openingHours,
      visibilityStatus: s.stationVisibility,
      numChargers: "--",
      url: `/charger/station/profile/${s.id}`,
    }));
  }, [stations]);

  // Column definitions
  const columns: ColumnType[] = [
    {
      field: "stationName",
      headerName: "Station Name",
      width: 160,
      cellRenderer: NameRenderer,
    },
    { field: "stationId", headerName: "Site ID", width: 110 },
    { field: "stateCity", headerName: "State, City", width: 150 },
    { field: "locationType", headerName: "Location Type", width: 140 },
    { field: "accessType", headerName: "Access Type", width: 110 },
    { field: "openingHours", headerName: "Opening Hours", width: 140 },
    { field: "visibilityStatus", headerName: "Visibility", width: 120 },
    { field: "numChargers", headerName: "Chargers", width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      width: 160,
      cellRenderer: ActionRenderer,
    },
  ];

  // Get selected company details
  const selectedCompany = companies.find((c) => c.id === selectedCompanyId);

  return (
    <div className="mt-6 p-6 text-black">
      <h1 className="text-2xl font-semibold mb-6">All Stations</h1>

      {/* COMPANY SELECTOR */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="flex items-center gap-4">
          <label className="text-gray-700 font-medium min-w-[140px]">
            Choose Company:
          </label>
          <select
            value={selectedCompanyId}
            onChange={(e) => setSelectedCompanyId(e.target.value)}
            className="flex-1 max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Select a company</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name} ({company.type})
              </option>
            ))}
          </select>

          {selectedCompany && (
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold">{stations.length}</span>{" "}
              stations for:{" "}
              <span className="font-semibold">{selectedCompany.name}</span>
            </div>
          )}
        </div>
      </div>

      {/* STATIONS TABLE */}
      {selectedCompanyId ? (
        stations.length > 0 ? (
          <AgDynamicTable
            columns={columns}
            rowData={rowData as []}
            className="bg-white"
            gridOptions={{
              pagination: true,
              domLayout: "normal",
            }}
          />
        ) : (
          <div className="bg-white p-8 rounded-lg shadow text-center text-gray-500">
            No stations found for this company
          </div>
        )
      ) : (
        <div className="bg-white p-8 rounded-lg shadow text-center text-gray-500">
          Please select a company to view stations
        </div>
      )}
    </div>
  );
}
