"use client";

import React, { useMemo, useState } from "react";
import Card from "@/app/components/Card";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import DropdownFilter from "./DropdownFilter"; // Assuming path is correct
import { EvChargerIcon } from "lucide-react";
import Performance from "./Performance";
import ChargerHealthSection from "./ChargerHealthSection";
import StakeholderInformationSection from "./StakeHolderInfo";
import ChargerLogsSection from "./ChargingLogsSection";

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
  let colorClass = "text-gray-500";
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
      <h1 className="font-bold text-gray-600 text-md text-semibold ">
        {label}
      </h1>
      <p className={`text-gray-100 text-base ${colorClass}`}>{value}</p>
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
        <h3 className="text-gray-700 font-bold">Connector {data.id}</h3>
      </div>

      <div className="grid grid-cols-2 gap-y-2 text-sm">
        <p className="text-gray-400">Power Rating:</p>
        <p className="text-gray-700 font-medium">{data.powerRating} kW</p>

        <p className="text-gray-400">Units Consumed:</p>
        <p className="text-gray-700 font-medium">{data.unitsConsumed} kWh</p>

        <p className="text-gray-400">Info:</p>
        <p
          className={`${
            isError ? "text-red-400" : "text-green-400"
          } font-medium`}
        >
          {data.info}
        </p>

        <p className="text-gray-400">Error Code:</p>
        <p className="text-gray-700 font-medium">{data.errorCode}</p>

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
  switch (title) {
    case "performance":
      return <Performance />;
    case "health":
      return <ChargerHealthSection />;
    case "stakeholder":
      return <StakeholderInformationSection />;
    case "logs":
      return <ChargerLogsSection />;
  }
};
