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

import { useDataStore } from "@/store/useDataStore";

ModuleRegistry.registerModules([AllCommunityModule]);
import { Edit } from "lucide-react";
import { ICellRendererParams } from "ag-grid-community";
import { useRouter } from "next/navigation";
import { Charger } from "@/lib/types";

const ActionCellRenderer = (props: ICellRendererParams<Charger>) => {
  const router = useRouter();

  const handleEdit = () => {
    // Navigate to edit page with company ID
    router.push(`/charger/chargers/edit/${props.data?.ocppId}`);
  };

  return (
    <div className="flex items-center justify-center h-full gap-2">
      <button
        onClick={handleEdit}
        className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
        title="Edit Charger"
      >
        <Edit size={16} className="text-white" />
      </button>
    </div>
  );
};

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
      width: 140,
      cellRenderer: NameRenderer,
    },
    { field: "id", headerName: "ID", width: 90 },
    { field: "stationId", headerName: "Station ID", width: 120 },
    { field: "oem", headerName: "OEM", width: 100 },

    { field: "chargerType", headerName: "Type", width: 100 },
    { field: "powerRating", headerName: "Power Rating", width: 140 },
    {
      field: "operationalStatus",
      headerName: " Status",
      width: 100,
      cellRenderer: OperationalStatusRenderer,
    },
    { field: "firmware", headerName: "Firmware", width: 100 },

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
      width: 100,
      cellRenderer: DiscountRenderer,
    },
    {
      headerName: "Actions",
      colId: "actions",
      width: 120,
      cellRenderer: ActionCellRenderer,
      sortable: false,
      filter: false,
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
    <div style={{ height: 260, width: "98%" }} className="mt-4">
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
        /**************************************
  1️⃣ TRANSPARENT TABLE BACKGROUND
***************************************/
        .ag-theme-alpine-dark.custom-dabas-theme {
          --ag-background-color: transparent !important;
          --ag-row-background-color: transparent !important;
          --ag-odd-row-background-color: transparent !important;
          --ag-even-row-background-color: transparent !important;
        }

        /**************************************
  2️⃣ HEADER BACKGROUND = DABAS RED
***************************************/
        .custom-dabas-theme .ag-header,
        .custom-dabas-theme .ag-header-row {
          background-color: #b22828 !important;
          color: white !important;
        }

        /**************************************
  3️⃣ WHITE DROPDOWNS (FILTER POPUPS)
***************************************/
        .ag-theme-alpine-dark.custom-dabas-theme .ag-popup,
        .ag-theme-alpine-dark.custom-dabas-theme .ag-menu,
        .ag-theme-alpine-dark.custom-dabas-theme .ag-filter-toolpanel,
        .ag-theme-alpine-dark.custom-dabas-theme .ag-menu-option {
          background: #ffffff !important; /* ✔ white popup */
          color: #000000 !important; /* ✔ dark text */
          border: 1px solid #d0d0d0 !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        /**************************************
  4️⃣ WHITE SELECT DROPDOWN LIST
***************************************/
        .ag-rich-select,
        .ag-rich-select-list,
        .ag-rich-select-list-item {
          background-color: #ffffff !important;
          color: #000000 !important;
        }

        .ag-rich-select-list-item:hover {
          background-color: #f2f2f2 !important;
        }

        /**************************************
  5️⃣ FILTER INPUT FIELD = WHITE
***************************************/
        .ag-input-field-input,
        .ag-filter-body input {
          background: #ffffff !important;
          color: #000000 !important;
          border: 1px solid #ccc !important;
        }

        /**************************************
  6️⃣ ROWS STAY TRANSPARENT
***************************************/
        .custom-dabas-theme .ag-row {
          background-color: transparent !important;
        }

        .custom-dabas-theme .ag-row:hover {
          background-color: rgba(255, 255, 255, 0.05) !important;
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
