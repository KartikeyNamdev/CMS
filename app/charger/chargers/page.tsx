"use client";

import React, { useState } from "react";
// Assuming paths:
import DropdownFilter from "@/app/components/DropdownFilter";
// Renamed the imported table component to ChargerGrid for clarity
import ChargerGrid from "@/app/components/Table";

import { ArrowDownTrayIcon, PlusIcon } from "@heroicons/react/24/solid";

import FilterDialog from "@/app/components/FilterDialog";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Mock Data Options (Updated to match screenshot needs)
const ChargerFilterTypes = [
  { label: "Connector" },
  { label: "Charger Connectivity Status" },
  { label: "Last Record Charger Status" },
  { label: "Charger Operational Status" },
  { label: "State" },
  { label: "City" },
  { label: "Zone" },
  { label: "OEM" },
  { label: "Access Type" },
  { label: "Charger Type" },
  { label: "Charger Power Rating" },
  { label: "Auto Charger Enable" },
];
const EMSPOptions = [{ value: "no options", label: "No Options" }];
const SourceTypeOptions = [
  { value: "csms", label: "CSMS" },
  { value: "ocpi", label: "OCPI" },
];
const ClientOptions = [
  { value: "client", label: "Client" },
  { value: "rishika", label: "Kartikey Namdev" },
];

const ColumnOptions = [
  { value: "select all", label: "Select All" },
  { value: "zone", label: "Zone" },
  { value: "spoc details", label: "SPOC Details" },
  { value: "guard details", label: "Guard Details" },
  { value: "cctv", label: "CCTV" },
  { value: "parking fees", label: "Parking Fees" },
];

// --- STANDARDIZED HEIGHT ---
const ITEM_HEIGHT_CLASS = "h-12";
const INPUT_WIDTH_CLASS = "w-[140px]";

export const ChargersPage = () => {
  const navigate = useRouter();
  // State placeholders for filters
  const [client, setClient] = useState("");
  const [columnFilter, setColumnFilter] = useState("");

  return (
    <div className="w-full p-6 lg:px-40 min-h-screen">
      {/* --- PAGE TITLE & STATUS --- */}

      <div className="flex justify-between items-center mb-6">
        {/* Status Line */}
        <div className="text-gray-400 text-sm">
          <span className="text-white font-semibold">IST +05:30</span> | INR
        </div>
      </div>

      {/* --- ROW 3: FILTERS AND ACTIONS --- */}
      <div className="mb-8 border-b border-gray-700 pb-4">
        {/* Filter Row (Bottom Row): Inputs and Dropdowns */}
        <div className="flex flex-wrap items-center justify-start gap-4 mb-4">
          {/* Charger Name Input */}
          <input
            type="text"
            placeholder="Charger Name"
            className={`${ITEM_HEIGHT_CLASS} py-2 px-4 text-black bg-white rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#b22828] ${INPUT_WIDTH_CLASS} transition-all`}
          />

          {/* Station Input */}
          <input
            type="text"
            placeholder="Station"
            className={`${ITEM_HEIGHT_CLASS} py-2 px-4 text-black bg-white rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#b22828] ${INPUT_WIDTH_CLASS} transition-all`}
          />

          {/* CIN/OCPP ID Input */}
          <input
            type="text"
            placeholder="CIN/OCPP ID"
            className={`${ITEM_HEIGHT_CLASS} py-2 px-4 text-black bg-white rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#b22828] ${INPUT_WIDTH_CLASS} transition-all`}
          />

          {/* EMSP Dropdown */}
          <DropdownFilter
            placeholder="EMSP"
            options={EMSPOptions}
            selectedValue={""}
            onChange={() => {}}
            className={`${INPUT_WIDTH_CLASS} ${ITEM_HEIGHT_CLASS}`}
          />

          {/* Source Dropdown */}
          <DropdownFilter
            placeholder="Source"
            options={SourceTypeOptions}
            selectedValue={""}
            onChange={() => {}}
            className={`${INPUT_WIDTH_CLASS} ${ITEM_HEIGHT_CLASS}`}
          />

          {/* Client Dropdown */}
          <DropdownFilter
            placeholder="Client"
            options={ClientOptions}
            selectedValue={"Client"}
            onChange={setClient}
            className={`${INPUT_WIDTH_CLASS} ${ITEM_HEIGHT_CLASS}`}
          />

          {/* Search Button */}
          <div className="pl-3">
            <button
              className={`${ITEM_HEIGHT_CLASS} px-2.5 rounded-xl text-white font-semibold bg-[#b22828] hover:bg-red-600 transition-colors shadow-md`}
            >
              Search
            </button>
          </div>

          {/* Clear Button */}
          <button
            className={`${ITEM_HEIGHT_CLASS} px-4 rounded-xl text-black font-semibold bg-white hover:bg-gray-100 transition-colors shadow-md border border-gray-300`}
          >
            Clear
          </button>
        </div>

        {/* Action Row (Top Row): Buttons on the right */}
        <div className="flex flex-wrap items-center justify-end gap-4 mt-4 pb-2">
          {/* Right Side Actions */}
          <div className="flex gap-4">
            {/* Price History Button */}
            {/* <button
            onClick={()=>{

            }}
              className={`${ITEM_HEIGHT_CLASS} px-8 rounded-xl text-white font-semibold bg-[#b22828] hover:bg-red-600 transition-colors shadow-md`}
            >
              Price History
            </button> */}

            {/* Columns Dropdown */}
            <DropdownFilter
              placeholder="Columns"
              options={ColumnOptions}
              selectedValue={columnFilter}
              onChange={setColumnFilter}
              className={`${INPUT_WIDTH_CLASS} ${ITEM_HEIGHT_CLASS}`}
            />

            {/* Settings Button (Icon Only) */}
            <div className="">
              <FilterDialog
                onClose={() => navigate.push("/charger/chargers/price-history")}
                data={ChargerFilterTypes}
                title="Charger Filter"
              />
            </div>

            {/* Download Button (Icon Only) */}
            <button
              className={`h-12 w-12 rounded-md bg-white text-black hover:bg-white/90 transition-colors shadow-md border border-white/20 flex items-center justify-center`}
            >
              <ArrowDownTrayIcon className="w-5 h-5" />
            </button>

            <Link href={"/charger/chargers/new"}>
              <button
                className={`${ITEM_HEIGHT_CLASS} px-4 rounded-xl text-white font-semibold bg-[#b22828] hover:bg-red-600 transition-colors shadow-md flex items-center gap-2`}
              >
                <PlusIcon className="w-5 h-5" />
                Add Charger
              </button>
            </Link>
          </div>
        </div>
      </div>

      <ChargerGrid />
    </div>
  );
};
export default ChargersPage;
