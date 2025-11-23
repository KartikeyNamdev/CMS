"use client";

import React, { useMemo, useState } from "react";
// Core AG-Grid imports
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

// Register necessary modules
ModuleRegistry.registerModules([AllCommunityModule]);
const useMockData = (url: string) => {
  // Mock Row Data based on the screenshot columns
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
      visibilityStatus: "Disabled",
    },
    // Adding more rows for visible alternation
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
      visibilityStatus: "Enabled",
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
      visibilityStatus: "Enabled",
    },
  ];

  return { data: mockData, loading: false };
};

// Custom Cell Renderer for Actions (Placeholder)
const ActionsRenderer = () => (
  <div className="flex items-center justify-center h-full text-white text-sm">
    <button className="text-red-300 hover:text-white font-medium">Edit</button>
    <span className="text-gray-500 mx-2">|</span>
    <button className="text-red-300 hover:text-white font-medium">
      Delete
    </button>
  </div>
);

// Row Data Interface based on new columns
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
}

const ChargerGrid = () => {
  const { data: rowData, loading } = useMockData(
    // Placeholder URL
    "https://api.your-dabas-data.com/chargers"
  );

  // Column Definitions: Defines & controls grid columns.
  const [colDefs] = useState<ColDef<IChargerRow>[]>([
    { field: "name", headerName: "Name", width: 100 },
    { field: "stationId", headerName: "Stations/Site ID", width: 150 },
    { field: "source", headerName: "Source", width: 100 },
    { field: "locations", headerName: "Locations", width: 150 },
    { field: "stateCity", headerName: "State, City", width: 150 },
    { field: "locationType", headerName: "Location Type", width: 130 },
    { field: "numChargers", headerName: "No. Of Chargers", width: 130 },
    { field: "emspChargers", headerName: "EMSP Chargers", width: 130 },
    { field: "accessType", headerName: "Access Type", width: 110 },
    { field: "openingHours", headerName: "Opening Hours", width: 130 },
    { field: "visibilityStatus", headerName: "Visibility Status", width: 130 },
    {
      field: "name",
      headerName: "Actions",
      cellRenderer: ActionsRenderer,
      width: 150,
      editable: false,
      sortable: false,
      filter: false,
      resizable: false,
      pinned: "right",
    },
  ]);

  // Apply settings across all columns
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      filter: true,
      editable: false,
      sortable: true,
      resizable: true,
      // Default cell style to match dark theme
      cellStyle: (i) => ({
        display: "flex",
        alignItems: "center",
        color: "white",
        // Background color is handled by row CSS now
        backgroundColor: `bg-black/20`,
      }),
      headerClass: "text-white bg-[#9d3536] font-bold",
    };
  }, []);

  // Custom theme classes for the dark red look
  const themeClass = "ag-theme-alpine-dark custom-dabas-theme";

  return (
    // Container: Defines the grid's theme & dimensions.
    <div style={{ height: "261px", width: "100%" }} className="mt-4">
      {/* 1. Custom CSS for the dark red theme (Placed inline for single-file solution) */}
      <style jsx global>{`
        .custom-dabas-theme {
          --ag-background-color: bg-black/20;
          --ag-header-background-color: #6d2021; /* Deep red for header */
          --ag-row-hover-color: rgba(
            178,
            40,
            40,
            0.7
          ); /* Slightly darker red hover */
          --ag-border-color: #444;
          --ag-foreground-color: white;
          --ag-font-size: 14px;
          --ag-header-foreground-color: white;
          --ag-row-border-color: #333;
          --ag-row-border-style: none; /* Removed row borders for cleaner look */
        }

        /* Customize Header cell padding/styling */
        .custom-dabas-theme .ag-header-cell {
          padding-left: 10px;
          padding-right: 10px;
          font-weight: 600;
        }

        /* Ensure header background fills correctly */
        .custom-dabas-theme .ag-header-row {
          background-color: #b22828;
          height: 40px; /* Adjust header height */
        }

        /* 🚨 FIX: Target ag-row-odd and ag-row-even for alternating colors */

        /* Light Red Row (Odd) */
        .custom-dabas-theme .ag-row-odd {
          background: #9d3536; /* Base Red */
        }

        /* Darker Red Row (Even) */
        .custom-dabas-theme .ag-row-even {
          background: #6d2021; /* Slightly darker shade of red */
        }

        /* Set default row background to bg-black/20 so the theme takes over */
        .custom-dabas-theme .ag-row {
          background-color: bg-black/20 !important;
        }

        /* Fix selected row color */
        .custom-dabas-theme .ag-row-selected {
          background: rgba(255, 0, 0, 0.4) !important;
        }

        /* Footer styling for pagination/status */
        .custom-dabas-theme .ag-paging-panel {
          color: white;
          background-color: bg-black/20;
        }
      `}</style>

      <AgGridReact
        className={themeClass}
        rowData={rowData}
        loading={loading}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        // Grid Features
        pagination={true}
        paginationPageSize={10}
        rowSelection="multiple"
        animateRows={true}
        // 🚨 REMOVED: getRowStyle which was overriding alternation

        // Events
        onGridReady={() => {
          console.log("Grid Ready with Dabas Theme");
        }}
        onSelectionChanged={() => console.log("Row Selection Changed")}
        onCellValueChanged={(event) =>
          console.log(`New Cell Value: ${event.value}`)
        }
      />
      {/* Manual status bar, as seen in your screenshot */}
      <div className="text-center text-white text-sm mt-3">
        Showing 1 - {rowData.length} of {rowData.length} Items
      </div>
    </div>
  );
};

export default ChargerGrid;
