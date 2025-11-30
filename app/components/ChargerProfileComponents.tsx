"use client";

import React, { useState } from "react";
import Card from "@/app/components/Card";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import DropdownFilter from "./DropdownFilter"; // Assuming path is correct
import { EvChargerIcon } from "lucide-react";

// --- Interfaces for Mock Data ---
interface IConnectorData {
  id: number;
  powerRating: number;
  unitsConsumed: number;
  info: string;
  errorCode: string;
  lastRecordedStatus: string; // Charging, Available, Unavailable
}

export interface IChargerProfile {
  stationName: string;
  stationId: string;
  address: string;
  ocppId: string;
  oem: string;
  dateOfCommissioning: string;
  accessType: string;
  chargerOperationalStatus: string;
  chargerConnectivityStatus: string;
  stationVisibilityStatus: string;
  firmware: string;
  locationAxis: string;
  zone: string;
  connectors: IConnectorData[];
}

// --- 1. Info Card Component (For the 4-column profile data) ---
export const InfoCard: React.FC<{
  label: string;
  value: string;
  className?: string;
}> = ({ label, value, className = "" }) => {
  let colorClass = "text-gray-400";
  if (label.includes("Operational Status") && value.includes("Active")) {
    colorClass = "text-green-500";
  } else if (
    label.includes("Operational Status") &&
    value.includes("Commissioned")
  ) {
    colorClass = "text-yellow-500";
  }

  return (
    <div className={`p-1 ${className}`}>
      <h1 className="font-semibold text-gray-300 text-sm">{label}</h1>
      <p className={`text-white text-base ${colorClass}`}>{value}</p>
    </div>
  );
};

// --- 2. Connector Status Block (Custom Component) ---
export const ConnectorBlock: React.FC<{ data: IConnectorData }> = ({
  data,
}) => {
  const isError = data.info === "Error";
  const isCharging = data.lastRecordedStatus === "Charging";
  const bgColor = isCharging
    ? "bg-red-600/20"
    : isError
    ? "bg-yellow-600/20"
    : "bg-green-600/20";
  const iconColor = isCharging
    ? "text-red-500"
    : isError
    ? "text-yellow-500"
    : "text-green-500";

  return (
    <Card title={null} className={`p-4 ${bgColor} min-w-[280px]`}>
      <div className="flex items-center gap-3 mb-3 border-b border-gray-700 pb-2">
        <EvChargerIcon className={`w-6 h-6 ${iconColor}`} />
        <h3 className="text-white font-bold">Connector {data.id}</h3>
      </div>

      <div className="grid grid-cols-2 gap-y-2 text-sm">
        <p className="text-gray-400">Power Rating:</p>
        <p className="text-white font-medium">{data.powerRating} kW</p>

        <p className="text-gray-400">Units Consumed:</p>
        <p className="text-white font-medium">{data.unitsConsumed} kWh</p>

        <p className="text-gray-400">Info:</p>
        <p
          className={`${
            isError ? "text-red-400" : "text-green-400"
          } font-medium`}
        >
          {data.info}
        </p>

        <p className="text-gray-400">Error Code:</p>
        <p className="text-white font-medium">{data.errorCode}</p>

        <p className="text-gray-400">Last Status:</p>
        <p className={`${iconColor} font-medium col-span-1`}>
          {data.lastRecordedStatus}
        </p>
      </div>
    </Card>
  );
};

// --- 3. Placeholder for Sub-Sections (Performance, Health, etc.) ---
export const SubSectionContent: React.FC<{ title: string }> = ({ title }) => {
  const [dateRange, setDateRange] = useState("Daily");

  return (
    <Card title={title} className="p-4 mt-4 min-h-[300px]">
      {/* Dynamic Filter Row */}
      <div className="flex flex-wrap items-center gap-4 mb-4 border-b border-gray-700 pb-3">
        <h4 className="text-white font-semibold">Performance</h4>
        <div className="flex items-center gap-2 ml-auto">
          <DropdownFilter
            placeholder={dateRange}
            selectedValue={dateRange}
            onChange={setDateRange}
            className="h-10 w-24"
            options={[{ label: "Daily", value: "Daily" }]}
          />
          <button className="h-10 px-4 rounded-xl text-white font-semibold bg-red-700">
            Search
          </button>
          <button className="h-10 w-10 rounded-xl bg-white text-black flex items-center justify-center">
            <ArrowDownTrayIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      <p className="text-gray-500">
        Content for {title} (e.g., Uptime Graphs or Log Table)
      </p>
    </Card>
  );
};
