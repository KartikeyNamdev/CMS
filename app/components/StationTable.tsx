"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import type { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import type { CustomCellRendererProps } from "ag-grid-react";
import { useGellAllChargerStation } from "@/hooks/useGetAllChargerStation";

// Register AG Grid Modules
ModuleRegistry.registerModules([AllCommunityModule]);

/* -------------------------------------------
   TYPES
------------------------------------------- */
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

/* -------------------------------------------
   CELL RENDERERS
------------------------------------------- */
const NameRenderer = (params: CustomCellRendererProps<IChargerRow>) => {
  const { name } = params.data || {};
  if (!name) return <span>--</span>;

  return (
    <Link
      href={`/charger/station/profile/${name}`}
      className="text-[#1f51ff] hover:text-[#0031e3] hover:underline transition"
    >
      {name}
    </Link>
  );
};

const URLRenderer = (params: CustomCellRendererProps<IChargerRow>) => {
  const url = params.data?.url;
  return url ? (
    <Link
      href={url}
      className="text-[#1f51ff] hover:text-[#002fd8] hover:underline transition"
    >
      View Details
    </Link>
  ) : (
    <span className="text-gray-400">--</span>
  );
};

const ActionsRenderer = (params: CustomCellRendererProps<IChargerRow>) => {
  const id = params.data?.stationId;
  return (
    <div className="flex items-center gap-2 text-sm text-red-500">
      <Link href={id ? `/charger/station/edit/${id}` : "#"}>
        <button className="hover:text-black">Edit</button>
      </Link>
      <span className="text-gray-400">|</span>

      <button>Delete</button>
    </div>
  );
};

/* -------------------------------------------
   MAIN COMPONENT
------------------------------------------- */
const StationTable = () => {
  const { allStations, loading } = useGellAllChargerStation();

  // Transform API data → AG Grid compatible format
  const rowData = useMemo<IChargerRow[]>(() => {
    if (!allStations) return [];

    return allStations.map((s) => ({
      name: s.name,
      stationId: s.stationId,
      source: s.source,
      locations: s.locations,
      stateCity: s.stateCity,
      locationType: s.locationType,
      numChargers: s.numChargers,
      emspChargers: s.emspChargers,
      accessType: s.accessType,
      openingHours: s.openingHours,
      visibilityStatus: s.visibilityStatus,
      url: s.url,
    }));
  }, [allStations]);

  const colDefs: ColDef<IChargerRow>[] = [
    {
      field: "name",
      headerName: "Name",
      width: 120,
      cellRenderer: NameRenderer,
    },
    { field: "stationId", headerName: "Site ID", width: 110 },
    { field: "source", headerName: "Source", width: 100 },
    { field: "locations", headerName: "Locations", width: 150 },
    { field: "stateCity", headerName: "State, City", width: 150 },
    { field: "locationType", headerName: "Location Type", width: 140 },
    { field: "numChargers", headerName: "Chargers", width: 100 },
    { field: "emspChargers", headerName: "EMSP", width: 100 },
    { field: "accessType", headerName: "Access Type", width: 120 },
    { field: "openingHours", headerName: "Hours", width: 120 },
    { field: "visibilityStatus", headerName: "Visibility", width: 130 },
    {
      field: "url",
      headerName: "Details",
      width: 120,
      cellRenderer: URLRenderer,
    },
    {
      field: "name",
      headerName: "Actions",
      width: 150,
      cellRenderer: ActionsRenderer,
    },
  ];

  const defaultColDef: ColDef = {
    filter: true,
    sortable: true,
    resizable: true,
    cellStyle: { color: "black", display: "flex", alignItems: "center" },
  };

  return (
    <div style={{ height: "240px", width: "100%" }} className="mt-4 text-white">
      <style jsx global>{`
        .custom-dabas-theme {
          --ag-background-color: transparent;
          --ag-header-background-color: #b22828;
          --ag-row-hover-color: rgba(255, 142, 142, 0.7);
          --ag-border-color: #8f8e8e;
          --ag-font-size: 14px;
          --ag-header-foreground-color: white;
        }

        .custom-dabas-theme .ag-header-cell {
          font-weight: 700;
          color: white;
        }

        .custom-dabas-theme .ag-row:nth-child(odd) {
          background: #white;
        }

        .custom-dabas-theme .ag-row:nth-child(even) {
          background: #e8e5e6;
        }
      `}</style>

      <AgGridReact
        className="ag-theme-alpine-dark custom-dabas-theme"
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        pagination
        paginationPageSize={10}
        animateRows
        loading={loading}
      />

      <p className="text-center text-black text-sm mt-3">
        Showing {rowData.length} items
      </p>
    </div>
  );
};

export default StationTable;
