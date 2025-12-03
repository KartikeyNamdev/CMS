"use client";

import React, { useState } from "react";
// Import Card to wrap content for visual consistency

import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import FilterDialog from "@/app/components/FilterDialog";

import DropdownFilter from "@/app/components/DropdownFilter";

import OcpiLogsTable from "@/app/components/AdminAgTable";
import OcppLogsTable from "@/app/components/OCPPLogsTable";

// --- Placeholder Components ---
// These components will render conditionally based on the 'choosen' state.
const ChargerFilter = [
  {
    label: "Initiated By",
  },
  {
    label: "Initiated For",
  },
  {
    label: "Log Type",
  },
  {
    label: "Timestamp",
  },
];
const OCPPLogs = () => (
  <div className="min-h-80 flex flex-col items-center justify-center text-gray-400">
    <OcppLogsTable />
  </div>
);

const OCPILogs = () => (
  <div className="min-h-80 flex flex-col items-center justify-center text-gray-400">
    <OcpiLogsTable />
  </div>
);

// --- Main Component ---

export const ProtocolSelector = () => {
  // Use a union type for better TypeScript support
  const [choosen, setChoosen] = useState<"OCPP" | "OCPI">("OCPP");

  // Dynamic CSS helper function
  const buttonClasses = (protocol: "OCPP" | "OCPI") => `
    h-10 px-6 font-semibold transition-colors
    ${
      // Active state styling (Red background)
      choosen === protocol
        ? "bg-red-600 text-white z-10"
        : "bg-gray-200 text-gray-700 hover:bg-gray-400 hover:text-white" // Inactive state (Dark background)
    }
    
    /* Rounded corners and border separation */
    ${
      protocol === "OCPP"
        ? "rounded-l-xl border-r border-red-700"
        : "rounded-r-xl"
    }
    border border-red-600 
  `;

  return (
    <div className="p-6 lg:px-60 min-h-screen">
      {/* Page Title */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          {/* --- SEGMENTED CONTROL BUTTONS --- */}
          <div className="flex shadow-lg rounded-xl overflow-hidden">
            <button
              // FIX 1: Wrap state update in an arrow function
              onClick={() => setChoosen("OCPP")}
              className={buttonClasses("OCPP")}
            >
              OCPP
            </button>
            <button
              // FIX 1: Wrap state update in an arrow function
              onClick={() => setChoosen("OCPI")}
              className={buttonClasses("OCPI")}
            >
              OCPI
            </button>
          </div>

          {/* Right Side Actions (Download Button) */}
          <div className="flex gap-4">
            <DropdownFilter
              placeholder="Search Charger"
              options={[
                { value: "Plughere 60KW", label: "Plughere 60KW" },
                { value: "PLUGUP 240", label: "PLUGUP 240" },
                { value: "ELTRAX101", label: "ELTRAX101" },
              ]}
              selectedValue=""
              onChange={() => {}}
            />
            <FilterDialog
              onClose={() => {}}
              data={ChargerFilter}
              title="Charger Log Filter"
            />
            <button className="h-12 w-12 rounded-md bg-white text-black hover:bg-gray-100 transition-colors flex items-center justify-center">
              <ArrowDownTrayIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* --- CONDITIONAL CONTENT RENDERING --- */}
        <div className="mt-4">
          {choosen === "OCPP" && <OCPPLogs />}
          {choosen === "OCPI" && <OCPILogs />}
        </div>
      </div>
    </div>
  );
};
export default ProtocolSelector;
