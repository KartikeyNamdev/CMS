"use client";

import React, { useEffect, useMemo } from "react";
import Link from "next/link";
import AgDynamicTable from "@/app/components/AgDynamicTable";
import { ColumnType } from "@/lib/agGrid";
import { useDataStore } from "@/store/useDataStore";
import { Station } from "@/lib/types";

/* -------------------------------------------
   CELL RENDERERS
------------------------------------------- */

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

const ActionRenderer = ({
  data,
}: {
  data: { id: string; stationName: string };
}) => {
  return (
    <div className="flex items-center gap-3 text-red-600 text-sm">
      <Link href={`/charger/station/edit/${data.id}`}>
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

/* -------------------------------------------
   MAIN PAGE COMPONENT
------------------------------------------- */

export default function StationTablePage() {
  const stations = useDataStore((s) => s.stations);
  const fetchStationsByCompany = useDataStore((s) => s.fetchStationsByCompany);

  // Hard-coded company for demo — replace with selected company if needed
  const companyId = "host-1";

  /* Load stations once */
  useEffect(() => {
    fetchStationsByCompany(companyId);
  }, [companyId, fetchStationsByCompany]);

  /* Convert Zustand stations → Table rows */
  const rowData = useMemo(() => {
    return stations.map((s: Station) => ({
      id: s.id,
      stationName: s.stationName,
      stationId: s.id,
      accessType: s.accessType,
      stateCity: `${s.state}, ${s.city}`,
      locationType: s.alternateAccessType,
      openingHours: s.openingHours,
      visibilityStatus: s.stationVisibility,
      numChargers: "--", // You can replace when you fetch chargers
      url: `/charger/station/profile/${s.id}`,
    }));
  }, [stations]);

  /* COLUMN DEFINITIONS (AgDynamicTable format) */
  const columns: ColumnType[] = [
    {
      field: "stationName",
      headerName: "Station Name",
      width: 160,
      cellRenderer: NameRenderer,
    },
    {
      field: "stationId",
      headerName: "Site ID",
      width: 110,
    },
    {
      field: "stateCity",
      headerName: "State, City",
      width: 150,
    },
    {
      field: "locationType",
      headerName: "Location Type",
      width: 140,
    },
    {
      field: "accessType",
      headerName: "Access Type",
      width: 110,
    },
    {
      field: "openingHours",
      headerName: "Opening Hours",
      width: 140,
    },
    {
      field: "visibilityStatus",
      headerName: "Visibility",
      width: 120,
    },
    {
      field: "numChargers",
      headerName: "Chargers",
      width: 100,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 160,
      cellRenderer: ActionRenderer,
    },
  ];

  return (
    <div className="mt-6 p-6 text-black">
      <h1 className="text-2xl font-semibold mb-4">All Stations</h1>

      <AgDynamicTable
        columns={columns}
        rowData={rowData as []}
        className="bg-white"
        gridOptions={{
          pagination: true,
          domLayout: "normal",
        }}
      />
    </div>
  );
}
