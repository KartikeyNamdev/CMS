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
import { Charger, Station } from "@/lib/types";

const ActionCellRenderer = (props: ICellRendererParams<Charger>) => {
  const router = useRouter();

  const handleEdit = () => {
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
    // <Link
    //   href={`/charger/chargers/profile/${name}`}
    //   className="text-green-500 hover:text-green-700 "
    // >
    <p>{name}%</p>
    // </Link>
  );
};

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
  const companies = useDataStore((state) => state.companies);
  const stations = useDataStore((state) => state.stations);
  const getStationsByCompany = useDataStore(
    (state) => state.getStationsByCompany
  );
  const getChargersByStation = useDataStore(
    (state) => state.getChargersByStation
  );

  const [selectedCompanyId, setSelectedCompanyId] = useState<string>("");
  const [selectedStationId, setSelectedStationId] = useState<string>("");
  const [filteredStations, setFilteredStations] = useState<Station[]>([]);
  const [chargers, setChargers] = useState<Charger[]>([]);
  const [connectorDialog, setConnectorDialog] = useState(false);

  // Auto-select first company on mount
  useEffect(() => {
    const load = () => {
      if (companies.length > 0 && !selectedCompanyId) {
        setSelectedCompanyId(companies[0].id);
      }
    };
    load();
  }, [companies, selectedCompanyId]);

  // Fetch stations when company changes
  useEffect(() => {
    const load = () => {
      if (selectedCompanyId) {
        const stationsForCompany = getStationsByCompany(selectedCompanyId);
        setFilteredStations(stationsForCompany);
        console.log(
          `📍 Loaded ${stationsForCompany.length} stations for company: ${selectedCompanyId}`
        );

        // Auto-select first station if available
        if (stationsForCompany.length > 0) {
          setSelectedStationId(stationsForCompany[0].id);
        } else {
          setSelectedStationId("");
          setChargers([]);
        }
      } else {
        setFilteredStations([]);
        setSelectedStationId("");
        setChargers([]);
      }
    };
    load();
  }, [selectedCompanyId, getStationsByCompany]);

  // Fetch chargers when station changes
  useEffect(() => {
    const load = () => {
      if (selectedStationId) {
        const chargersForStation = getChargersByStation(selectedStationId);
        setChargers(chargersForStation);
        console.log(
          `⚡ Loaded ${chargersForStation.length} chargers for station: ${selectedStationId}`
        );
      } else {
        setChargers([]);
      }
    };
    load();
  }, [selectedStationId, getChargersByStation]);

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
      headerName: "Status",
      width: 100,
      cellRenderer: OperationalStatusRenderer,
    },
    { field: "firmware", headerName: "Firmware", width: 100 },
    { field: "label", headerName: "Label", width: 110 },
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

  const selectedCompany = companies.find((c) => c.id === selectedCompanyId);
  const selectedStation = filteredStations.find(
    (s) => s.id === selectedStationId
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-black mb-6">All Chargers</h1>

      {/* COMPANY & STATION SELECTOR */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow space-y-4">
        {/* Company Selector */}
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
              <span className="font-semibold">{filteredStations.length}</span>{" "}
              stations
            </div>
          )}
        </div>

        {/* Station Selector */}
        {selectedCompanyId && filteredStations.length > 0 && (
          <div className="flex items-center gap-4">
            <label className="text-gray-700 font-medium min-w-[140px]">
              Choose Station:
            </label>
            <select
              value={selectedStationId}
              onChange={(e) => setSelectedStationId(e.target.value)}
              className="flex-1 max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select a station</option>
              {filteredStations.map((station) => (
                <option key={station.id} value={station.id}>
                  {station.stationName} - {station.city}
                </option>
              ))}
            </select>
            {selectedStation && (
              <div className="text-sm text-gray-600">
                Showing <span className="font-semibold">{chargers.length}</span>{" "}
                chargers
              </div>
            )}
          </div>
        )}
      </div>

      {/* TABLE */}
      {selectedStationId ? (
        chargers.length > 0 ? (
          <div style={{ height: 500, width: "100%" }}>
            <style jsx global>{`
              /* Fix AG Grid dropdown/filter menu transparency */
              .ag-theme-alpine-dark.custom-dabas-theme .ag-menu,
              .ag-theme-alpine-dark.custom-dabas-theme .ag-filter-toolpanel,
              .ag-theme-alpine-dark.custom-dabas-theme .ag-rich-select,
              .ag-theme-alpine-dark.custom-dabas-theme .ag-popup {
                background-color: #2b2b2b !important;
                color: white !important;
                border: 1px solid #555 !important;
              }

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

              .ag-theme-alpine-dark.custom-dabas-theme {
                --ag-background-color: transparent !important;
                --ag-row-background-color: transparent !important;
                --ag-odd-row-background-color: transparent !important;
                --ag-even-row-background-color: transparent !important;
              }

              .custom-dabas-theme .ag-header,
              .custom-dabas-theme .ag-header-row {
                background-color: #b22828 !important;
                color: white !important;
              }

              .ag-theme-alpine-dark.custom-dabas-theme .ag-popup,
              .ag-theme-alpine-dark.custom-dabas-theme .ag-menu,
              .ag-theme-alpine-dark.custom-dabas-theme .ag-filter-toolpanel,
              .ag-theme-alpine-dark.custom-dabas-theme .ag-menu-option {
                background: #ffffff !important;
                color: #000000 !important;
                border: 1px solid #d0d0d0 !important;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
              }

              .ag-rich-select,
              .ag-rich-select-list,
              .ag-rich-select-list-item {
                background-color: #ffffff !important;
                color: #000000 !important;
              }

              .ag-rich-select-list-item:hover {
                background-color: #f2f2f2 !important;
              }

              .ag-input-field-input,
              .ag-filter-body input {
                background: #ffffff !important;
                color: #000000 !important;
                border: 1px solid #ccc !important;
              }

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
              Showing {chargers.length} chargers
            </p>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow text-center text-gray-500">
            No chargers found for this station
          </div>
        )
      ) : (
        <div className="bg-white p-8 rounded-lg shadow text-center text-gray-500">
          {selectedCompanyId
            ? "Please select a station to view chargers"
            : "Please select a company first"}
        </div>
      )}

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
