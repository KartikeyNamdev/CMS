"use client";

const themeClass = "ag-theme-alpine-dark custom-dabas-theme";

import React, { useMemo, useState } from "react";
import type { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import type { CustomCellRendererProps } from "ag-grid-react";
import Link from "next/link";
import ConnectorDialog from "./ConnectorDialog";
import { CpuChipIcon } from "@heroicons/react/24/solid";
import { useAllChargers, IChargerRow } from "@/hooks/useAllChargers";

ModuleRegistry.registerModules([AllCommunityModule]);

// -------- RENDERERS ----------
const NameRenderer = (params: CustomCellRendererProps<IChargerRow>) => {
  const name = params.data?.chargerName;
  const url = params.data?.url;
  if (!name || !url) return <span>--</span>;

  return (
    <Link
      href={`/charger/chargers/profile/${name}`}
      className="text-blue-400 hover:text-blue-300 underline"
    >
      {name}
    </Link>
  );
};

// -------- RENDERERS WITH DIALOG OPEN CONTROL ----------
const ConnectorRenderer = (
  params: CustomCellRendererProps<IChargerRow>,
  openDialog: (v: boolean) => void
) => {
  return (
    <div className="flex gap-1 justify-center">
      {params.data?.connectorStatuses?.map((status, i) => (
        <span
          key={i}
          onClick={() => openDialog(true)}
          className={`w-6 h-6 flex items-center justify-center rounded cursor-pointer ${
            status === "Available" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <CpuChipIcon className="w-4 h-4 text-white" />
        </span>
      ))}
    </div>
  );
};

const OperationalStatusRenderer = (
  params: CustomCellRendererProps<IChargerRow>
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
  const { data: rowData, loading } = useAllChargers();
  const [connectorDialog, setConnectorDialog] = useState(false);

  const colDefs: ColDef<IChargerRow>[] = [
    {
      field: "chargerName",
      headerName: "Name",
      cellRenderer: NameRenderer,
      width: 120,
    },
    { field: "cinSerial", headerName: "Serial", width: 90 },
    { field: "stationName", headerName: "Station", width: 120 },
    { field: "source", headerName: "Source", width: 80 },
    { field: "ocppId", headerName: "OCPP ID", width: 120 },
    { field: "locationStateCity", headerName: "Location", width: 170 },
    { field: "accessType", headerName: "Access", width: 90 },
    { field: "chargerType", headerName: "Type", width: 80 },
    { field: "oem", headerName: "OEM", width: 130 },
    { field: "emspMapped", headerName: "EMSP", width: 110 },
    {
      field: "operationalStatus",
      headerName: "Operational Status",
      width: 180,
      cellRenderer: OperationalStatusRenderer,
    },
    { field: "visibilityStatus", headerName: "Visibility", width: 100 },
    {
      field: "connectorStatuses",
      headerName: "Connectors",
      width: 120,
      sortable: false,
      filter: false,
      cellRenderer: (params) => ConnectorRenderer(params, setConnectorDialog),
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
        rowData={rowData}
        loading={loading}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        pagination
        paginationPageSize={10}
        rowSelection="multiple"
        animateRows
      />

      <p className="text-center text-black text-sm mt-2">
        Showing {rowData.length} items
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
