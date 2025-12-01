"use client";

import React, { useMemo, useState } from "react";
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Import CustomCellRendererProps type for correct typing
import type { CustomCellRendererProps } from "ag-grid-react";
import { AgGridReact } from "ag-grid-react";
import { CpuChipIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

// Register necessary modules
ModuleRegistry.registerModules([AllCommunityModule]);

// --- RENDERERS ---

// Renderer for the Connectors column (shows red/green icons)
const ConnectorRenderer = (params: CustomCellRendererProps<IChargerRow>) => {
  const statuses = params.data?.connectorStatuses || [];

  if (statuses.length === 0) return <span className="text-gray-400">--</span>;

  return (
    <div className="flex items-center gap-1 justify-center h-full">
      {statuses.map((status, index) => (
        <span
          key={index}
          className={`
            w-6 h-6 rounded flex items-center justify-center p-1
            ${
              status === "Available"
                ? "bg-green-500/80 text-white"
                : "bg-red-500/80 text-white"
            }
          `}
        >
          <CpuChipIcon className="w-4 h-4" />
        </span>
      ))}
    </div>
  );
};

// Renderer for the Operational Status column
const OperationalStatusRenderer = (
  params: CustomCellRendererProps<IChargerRow>
) => {
  const status = params.value;
  let colorClass = "text-gray-400";
  if (status && status.includes("Commissioned")) colorClass = "text-yellow-400";
  if (status && status.includes("Active")) colorClass = "text-red-300";

  return <span className={colorClass}>{status}</span>;
};

// Custom Cell Renderer for Actions (Placeholder)
const ActionsRenderer = () => (
  <div className="flex items-center justify-center h-full text-white text-sm">
    <span className="text-gray-400">-------</span>
  </div>
);

// --- INTERFACE ---
interface IChargerRow {
  chargerName: string;
  cinSerial: string;
  stationName: string;
  source: string;
  ocppId: string;
  locationStateCity: string;
  accessType: string;
  chargerType: string;
  oem: string;
  emspMapped: string;
  operationalStatus: string; // e.g., 'Static Active', 'Commissioned Testing'
  visibilityStatus: string;
  connectorStatuses: ("Available" | "InUse" | "Unavailable")[]; // Used by ConnectorRenderer
  url: string;
}

// --- MOCK DATA (UPDATED TO MATCH IMAGE) ---
const useMockData = (url: string) => {
  // Mock Row Data structured to match the image
  const mockData: IChargerRow[] = [
    {
      chargerName: "Dabas EV",
      cinSerial: "CIN/OCPP",
      stationName: "Aryan Hotel",
      source: "CSMS",
      ocppId: "Dabas004",
      locationStateCity: "27.35N | Rajasthan, Sikar",
      accessType: "Public",
      chargerType: "DC",
      oem: "Unknown",
      emspMapped: "Statiq",
      operationalStatus: "Commissioned Active",
      visibilityStatus: "Enabled",
      connectorStatuses: ["Available", "Available"],
      url: "/charger/station/Dabas004",
    },
    {
      chargerName: "2C Chargers",
      cinSerial: "CIN/OCPP",
      stationName: "Hotel Poth",
      source: "CSMS",
      ocppId: "Dabas003",
      locationStateCity: "28.7N | Delhi, New Delhi",
      accessType: "Public",
      chargerType: "DC",
      oem: "Unknown",
      emspMapped: "Statiq",
      operationalStatus: "Commissioned Testing",
      visibilityStatus: "Enabled",
      connectorStatuses: ["Available", "Unavailable"],
      url: "/charger/station/Dabas003",
    },
    {
      chargerName: "abc | Dabas",
      cinSerial: "CIN/OCPP",
      stationName: "Dabas EV Charging Station",
      source: "CSMS",
      ocppId: "Dabas001",
      locationStateCity: "31.2N | Haryana, Sonipat",
      accessType: "Public",
      chargerType: "DC",
      oem: "Servotech Power Systems - Dual Gun",
      emspMapped: "Statiq",
      operationalStatus: "Commissioned Active",
      visibilityStatus: "Enabled",
      connectorStatuses: ["Available", "Available"],
      url: "/charger/station/Dabas001",
    },
    {
      chargerName: "Dabas EV",
      cinSerial: "CIN/OCPP",
      stationName: "Avani Resorts",
      source: "CSMS",
      ocppId: "Statiq137",
      locationStateCity: "31.8N | Himachal Pradesh, Kangra",
      accessType: "Public",
      chargerType: "DC",
      oem: "Exicom",
      emspMapped: "Statiq",
      operationalStatus: "Commissioned Active",
      visibilityStatus: "Enabled",
      connectorStatuses: ["Available", "Unavailable"],
      url: "/charger/station/Statiq137",
    },
  ];

  return { data: mockData, loading: false };
};
// 🚨 FIX: New NameRenderer Component
const NameRenderer = (params: CustomCellRendererProps<IChargerRow>) => {
  const name = params.data?.chargerName;
  const url = params.data?.url;

  if (!name || !url) return <span>{name || "--"}</span>;

  return (
    <div className="flex items-center justify-start h-full text-sm text-blue-400">
      <Link
        href={`/charger/chargers/profile/${name}`}
        className="text-blue-400 hover:text-blue-300 underline font-medium transition-colors"
      >
        {name}
      </Link>
    </div>
  );
};

// --- TABLE COMPONENT ---
const ChargerGrid = () => {
  const { data: rowData, loading } = useMockData(
    "https://api.your-dabas-data.com/chargers"
  );

  // Column Definitions
  const [colDefs] = useState<ColDef<IChargerRow>[]>([
    {
      field: "chargerName",
      headerName: "Name",
      width: 120,
      cellRenderer: NameRenderer,
    },
    { field: "cinSerial", headerName: "Serial Number", width: 90 },
    { field: "stationName", headerName: "Station Name", width: 120 },
    { field: "source", headerName: "Source", width: 80 },
    { field: "ocppId", headerName: "OCPP ID", width: 120 },
    {
      field: "locationStateCity",
      headerName: "Location State/City",
      width: 180,
    },
    { field: "accessType", headerName: "Access", width: 90 },
    { field: "chargerType", headerName: "Type", width: 70 },
    { field: "oem", headerName: "OEM", width: 100 },
    { field: "emspMapped", headerName: "EMSP Mapped", width: 100 },
    {
      field: "operationalStatus",
      headerName: "Charger Operational Status",
      width: 180,
      cellRenderer: OperationalStatusRenderer, // Custom status styling
    },
    {
      field: "visibilityStatus",
      headerName: "Station Visibility Status",
      width: 120,
    },
    {
      field: "connectorStatuses",
      headerName: "Connectors",
      cellRenderer: ConnectorRenderer, // Custom icons
      width: 120,
      sortable: false,
      filter: false,
      resizable: false,
    },
    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   cellRenderer: ActionsRenderer,
    //   width: 100,
    //   sortable: false,
    //   filter: false,
    //   resizable: false,
    //   pinned: "right",
    // },
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
        color: "white",
        backgroundColor: "transparent",
      }),
      headerClass: "text-white bg-[#9d3536] font-bold",
    };
  }, []);

  const themeClass = "ag-theme-alpine-dark custom-dabas-theme";

  return (
    <div style={{ height: "261px", width: "100%" }} className="mt-4">
      {/* CSS is retained from previous structure */}
      <style jsx global>{`
        .custom-dabas-theme {
          --ag-background-color: transparent;
          --ag-header-background-color: #6d2021;
          --ag-row-hover-color: rgba(178, 40, 40, 0.7);
          --ag-border-color: #444;
          --ag-foreground-color: white;
          --ag-font-size: 14px;
          --ag-header-foreground-color: white;
          --ag-row-border-color: #333;
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
          color: white;
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
          console.log("Charger Grid Ready with updated data");
        }}
        onSelectionChanged={() => console.log("Row Selection Changed")}
        onCellValueChanged={(event) =>
          console.log(`New Cell Value: ${event.value}`)
        }
      />
      <div className="text-center text-white text-sm mt-3">
        Showing 1 - {rowData.length} of {rowData.length} Items
      </div>
    </div>
  );
};

export default ChargerGrid;
