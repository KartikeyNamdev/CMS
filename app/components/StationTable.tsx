"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Import CustomCellRendererProps type for correct typing
import type { CustomCellRendererProps } from "ag-grid-react";
import { AgGridReact } from "ag-grid-react";

// Register necessary modules
ModuleRegistry.registerModules([AllCommunityModule]);

const useMockData = (url: string) => {
  // Mock Row Data with URL field added
  const mockData = [
    {
      name: "PlugUp",
      stationId: "PLUGUPOO3",
      source: "CSMS",
      locations: "30.658007N, 76.72946E",
      stateCity: "Chandigarh",
      locationType: "--",
      numChargers: 2,
      emspChargers: "--",
      accessType: "Public",
      openingHours: "24 Hours",
      visibilityStatus: "Enabled",
      url: "/charger/station/PLUGUPOO3",
    },
    {
      name: "Electra",
      stationId: "ELTRAX101",
      source: "CSMS",
      locations: "28.5834N, 77.1006E",
      stateCity: "Delhi",
      locationType: "Mall",
      numChargers: 4,
      emspChargers: "3",
      accessType: "Private",
      openingHours: "08:00 - 22:00",
      url: "/charger/station/ELTRAX101",
    },
    {
      name: "ChargePoint",
      stationId: "CPX200A",
      source: "CSMS",
      locations: "34.0522N, 118.2437W",
      stateCity: "Los Angeles",
      locationType: "Street",
      numChargers: 1,
      emspChargers: "1",
      accessType: "Public",
      openingHours: "24 Hours",
      url: "/charger/station/CPX200A",
    },
    {
      name: "TeslaSC",
      stationId: "TSLX990",
      source: "CSMS",
      locations: "37.7749N, 122.4194W",
      stateCity: "San Francisco",
      locationType: "Highway",
      numChargers: 8,
      emspChargers: "0",
      accessType: "Private",
      openingHours: "24 Hours",
      url: "/charger/station/TSLX990",
    },
  ];

  return { data: mockData, loading: false };
};

// 🚨 FIX: Correctly receive 'params' and extract 'data' and 'url'
const URLRenderer = (params: CustomCellRendererProps<IChargerRow>) => {
  // Use optional chaining for safety, and access 'data' which holds the whole row
  const url = params.data?.url;

  if (!url) return <span className="text-gray-400">--</span>;

  return (
    <Link
      href={url}
      className="text-[#1f51ff] hover:text-[#002fd8] hover:underline font-medium transition-colors"
    >
      View Details
    </Link>
  );
};

// Custom Cell Renderer for Actions (Placeholder)
const ActionsRenderer = () => (
  <div className="flex items-center justify-center h-full text-black text-sm">
    <button
      className="text-red-500 hover:to-black font-medium"
      onClick={() => {
        console.log("Hello");
      }}
    >
      Edit
    </button>
    <span className="text-gray-500 mx-2">|</span>
    <button className="text-red-500 hover:to-black font-medium">Delete</button>
  </div>
);

// 🚨 FIX: New NameRenderer Component
const NameRenderer = (params: CustomCellRendererProps<IChargerRow>) => {
  const name = params.data?.name;
  const url = params.data?.url;

  if (!name || !url) return <span>{name || "--"}</span>;

  return (
    <div className="flex items-center justify-start h-full text-sm text-blue-400">
      <Link
        href={`/charger/station/profile/${name}`}
        className="text-[#1f51ff] hover:text-[#0031e3] hover:underline font-medium transition-colors"
      >
        {name}
      </Link>
    </div>
  );
};

// Row Data Interface with URL field added
interface IChargerRow {
  name: string;
  stationId: string;
  source: string;
  locations: string;
  stateCity: string;
  locationType: string;
  numChargers: number;
  emspChargers: string;
  accessType: string;
  openingHours: string;
  visibilityStatus: string;
  url: string;
}

const StationTable = () => {
  const { data: rowData, loading } = useMockData(
    "https://api.your-dabas-data.com/chargers"
  );

  // Column Definitions with URL field added
  const [colDefs] = useState<ColDef<IChargerRow>[]>([
    {
      field: "name",
      headerName: "Name",
      width: 100,
      cellRenderer: NameRenderer, // <-- Used the new renderer here
    },
    { field: "stationId", headerName: "Stations/Site ID", width: 100 },
    { field: "source", headerName: "Source", width: 100 },
    { field: "locations", headerName: "Locations", width: 150 },
    { field: "stateCity", headerName: "State, City", width: 150 },
    { field: "locationType", headerName: "Location Type", width: 130 },
    { field: "numChargers", headerName: "Chargers", width: 80 },
    { field: "emspChargers", headerName: "EMSP", width: 80 },
    { field: "accessType", headerName: "Access Type", width: 110 },
    { field: "openingHours", headerName: "Opening Hours", width: 130 },
    { field: "visibilityStatus", headerName: "Visibility Status", width: 130 },
    {
      field: "url",
      headerName: "Details",
      cellRenderer: URLRenderer,
      width: 120,
      editable: false,
      sortable: false,
      filter: false,
      resizable: false,
    },
    {
      field: "name",
      headerName: "Actions",
      cellRenderer: ActionsRenderer,
      width: 150,
      editable: false,
      sortable: false,
      filter: false,
      resizable: false,
    },
  ]);

  // Apply settings across all columns
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      filter: true,
      editable: false,
      sortable: true,
      resizable: true,
      cellStyle: () => ({
        display: "flex",
        alignItems: "center",
        color: "black",
        backgroundColor: "transparent",
      }),
      headerClass: "text-white bg-[#9d3536] font-bold",
    };
  }, []);

  const themeClass = "ag-theme-alpine-dark custom-dabas-theme";

  return (
    <div style={{ height: "261px", width: "100%" }} className="mt-4">
      <style jsx global>{`
        .custom-dabas-theme {
          --ag-background-color: transparent;
          --ag-header-background-color: #6d2021;
          --ag-row-hover-color: rgba(255, 142, 142, 0.7);
          --ag-border-color: #8f8e8e;
          --ag-foreground-color: black;
          --ag-font-size: 14px;
          --ag-header-foreground-color: black;
          --ag-row-border-color: #7d7d7d;
          --ag-row-border-style: none;
        }

        .custom-dabas-theme .ag-header-cell {
          padding-left: 10px;
          padding-right: 10px;
          font-weight: 600;
        }

        .custom-dabas-theme .ag-header-row {
          background-color: #b22828;
          height: 40px;
        }

        .custom-dabas-theme .ag-row-odd {
          background: #9d3536;
        }

        .custom-dabas-theme .ag-row-even {
          background: #6d2021;
        }

        .custom-dabas-theme .ag-row {
          background-color: transparent !important;
        }

        .custom-dabas-theme .ag-row-selected {
          background: rgba(255, 0, 0, 0.4) !important;
        }

        .custom-dabas-theme .ag-paging-panel {
          color: black;
          background-color: transparent;
        }
      `}</style>

      <AgGridReact
        className={themeClass}
        rowData={rowData}
        loading={loading}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
        rowSelection="multiple"
        animateRows={true}
        onGridReady={() => {
          console.log("Grid Ready with Dabas Theme");
        }}
        onSelectionChanged={() => console.log("Row Selection Changed")}
        onCellValueChanged={(event) =>
          console.log(`New Cell Value: ${event.value}`)
        }
      />
      <div className="text-center text-black text-sm mt-3">
        Showing 1 - {rowData.length} of {rowData.length} Items
      </div>
    </div>
  );
};

export default StationTable;
