"use client";

const themeClass = "ag-theme-alpine-dark custom-dabas-theme";

import React, { useEffect, useMemo, useState } from "react";
import type { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import type { CustomCellRendererProps } from "ag-grid-react";
import Link from "next/link";
import ConnectorDialog from "./ConnectorDialog";
import { CpuChipIcon } from "@heroicons/react/24/solid";

import { Charger, useDataStore } from "@/store/useDataStore";

ModuleRegistry.registerModules([AllCommunityModule]);

// -------- RENDERERS ----------
const NameRenderer = (params: CustomCellRendererProps<Charger>) => {
  const name = params.data?.ocppId;

  if (!name) return <span>--</span>;

  return (
    <Link
      href={`/charger/chargers/profile/${name}`}
      className="text-blue-400 hover:text-blue-300 underline"
    >
      {name}
    </Link>
  );
};
const DiscountRenderer = (params: CustomCellRendererProps<Charger>) => {
  const name = params.data?.discountOffer;

  if (!name) return <span>--</span>;

  return (
    <Link
      href={`/charger/chargers/profile/${name}`}
      className="text-green-500 hover:text-green-700 "
    >
      {name}%
    </Link>
  );
};

// -------- RENDERERS WITH DIALOG OPEN CONTROL ----------
const ConnectorRenderer = (
  params: CustomCellRendererProps<Charger>,
  openDialog: (v: boolean) => void
) => {
  return (
    <div className="flex gap-1 justify-center">
      {params.data?.connector.map((c, i) => (
        <span
          key={i}
          onClick={() => openDialog(true)}
          className={`w-6 h-6 flex items-center justify-center rounded cursor-pointer ${
            c.connectorStatuses === "Available" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <CpuChipIcon className="w-4 h-4 text-white" />
        </span>
      ))}
    </div>
  );
};

const OperationalStatusRenderer = (
  params: CustomCellRendererProps<Charger>
) => {
  const status = params.value;
  return (
    <span
      className={
        status.includes("Active")
          ? "text-green-500"
          : status.includes("Testing")
          ? "text-yellow-500"
          : "text-gray-500"
      }
    >
      {status}
    </span>
  );
};

// -------- UI COMPONENT ----------
const AllChargersTable = () => {
  // 🔥 FIX 1: Access state and actions directly from Zustand
  const { chargers, fetchChargersByStation } = useDataStore();

  // 🔥 FIX 2: Trigger fetching only on mount using useEffect
  useEffect(() => {
    fetchChargersByStation("station-a"); // Start loading company data
  }, [fetchChargersByStation]);

  // Use existing hook for row data (assumed to work independently for now)

  const [connectorDialog, setConnectorDialog] = useState(false);

  // Debugging console log is now clean and reflects state
  console.log("Current Companies State:", chargers);

  const colDefs: ColDef<Charger>[] = [
    {
      field: "ocppId",
      headerName: "OCPP ID",
      width: 120,
      cellRenderer: NameRenderer,
    },
    { field: "id", headerName: "ID", width: 90 },
    { field: "stationId", headerName: "Station ID", width: 120 },
    { field: "oem", headerName: "OEM", width: 80 },

    { field: "chargerType", headerName: "Type", width: 80 },
    { field: "powerRating", headerName: "Power Rating", width: 170 },
    {
      field: "operationalStatus",
      headerName: "Operational Status",
      width: 180,
      cellRenderer: OperationalStatusRenderer,
    },
    { field: "firmware", headerName: "Firmware", width: 90 },

    { field: "label", headerName: "Label", width: 110 },
    { field: "firmware", headerName: "Firmware", width: 110 },

    {
      field: "numConnectors",
      headerName: "Connectors",
      width: 120,
      sortable: false,
      filter: false,
      cellRenderer: (params) => ConnectorRenderer(params, setConnectorDialog),
    },
    {
      field: "discountOffer",
      headerName: "Discount",
      width: 80,
      cellRenderer: DiscountRenderer,
    },
  ];

  const defaultColDef = useMemo(
    () => ({
      filter: true,
      resizable: true,
      sortable: true,
      cellStyle: {
        color: "black",
        display: "flex",
        alignItems: "center",
      },
    }),
    []
  );

  return (
    <div style={{ height: 260, width: "100%" }} className="mt-4">
      {/* 🔥 YOUR ORIGINAL CSS THEME INSERTED */}
      <style jsx global>{`
        /* Fix AG Grid dropdown/filter menu transparency */
        .ag-theme-alpine-dark.custom-dabas-theme .ag-menu,
        .ag-theme-alpine-dark.custom-dabas-theme .ag-filter-toolpanel,
        .ag-theme-alpine-dark.custom-dabas-theme .ag-rich-select,
        .ag-theme-alpine-dark.custom-dabas-theme .ag-popup {
          background-color: #2b2b2b !important; /* dark grey background */
          color: white !important;
          border: 1px solid #555 !important;
        }

        /* Fix select dropdown list items */
        .ag-rich-select-list {
          background-color: #2b2b2b !important;
        }

        .ag-rich-select-list-item {
          background-color: #2b2b2b !important;
          color: white !important;
        }

        .ag-rich-select-list-item:hover {
          background-color: #444 !important;
        }

        /* Ensure text inside filter input is visible */
        .ag-filter-body {
          --ag-background-color: transparent;
        }
        ,
        .ag-input-field-input {
          color: white !important;
        }

        /* Restore missing row color — your line had invalid CSS */
        .custom-dabas-theme .ag-row {
          background-color: transparent !important;
        }
      `}</style>

      <AgGridReact
        className={themeClass}
        rowData={chargers as []}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        pagination
        paginationPageSize={10}
        rowSelection="multiple"
        animateRows
      />

      <p className="text-center text-black text-sm mt-2">
        Showing {chargers.length} items
      </p>
      {connectorDialog && (
        <ConnectorDialog
          onClose={() => setConnectorDialog(false)}
          open={connectorDialog}
        />
      )}
    </div>
  );
};

export default AllChargersTable;
