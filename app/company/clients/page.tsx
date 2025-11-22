"use client";

import React, { useState } from "react";
// Import Heroicons for the actions
import { ArrowDownTrayIcon, PlusIcon } from "@heroicons/react/24/solid";
// Assuming DropdownFilter is available
import DropdownFilter from "../../components/DropdownFilter";
import Link from "next/link";

// --- NEW IMPORT ---
import FilterDialog from "@/app/components/FilterDialog"; // Import the dialog

// Mock Data for filters
const clientTypeOptions = [
  { value: "large", label: "Large Enterprise" },
  { value: "small", label: "Small Business" },
  { value: "individual", label: "Individual" },
];

const ClientPage = () => {
  // --- STATE 1: To control the visibility of the new dialog ---
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);

  const [clientName, setClientName] = useState("");
  const [clientType, setClientType] = useState("");

  const [hasData] = useState(false);

  return (
    // Use w-full and padding from your standard page layout
    <div className="w-full p-6 lg:px-56 min-h-screen">
      {/* --- REMOVED: The unconditionally rendered FilterDialog is removed from here --- */}

      {/* --- ROW 1: HEADER AND STATUS --- */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-gray-400 text-sm">
          <span className="text-white font-semibold">IST +05:30</span> | INR
        </div>
      </div>

      {/* --- ROW 2: FILTERS AND ACTIONS --- */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        {/* Left Side: Search Filters (remains the same) */}
        <div className="flex flex-wrap items-center gap-4">
          <input
            type="text"
            placeholder="Client Name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="h-12 py-2 px-4 text-black bg-white rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 min-w-[140px]"
          />

          <DropdownFilter
            placeholder="Client Type"
            options={clientTypeOptions}
            selectedValue={clientType}
            onChange={setClientType}
            className="min-w-[140px]"
          />

          <button className="h-12 px-6 rounded-xl text-white font-semibold bg-red-700 hover:bg-red-600 transition-colors shadow-md">
            Search
          </button>

          <button className="h-12 px-6 rounded-xl text-black font-semibold bg-white hover:bg-gray-100 transition-colors shadow-md border border-gray-300">
            Clear
          </button>
        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex gap-4">
          {/* --- CONNECT THE DOWNLOAD BUTTON TO THE DIALOG --- */}
          <button
            className="h-12 px-4 rounded-xl text-white bg-white/10 hover:bg-white/20 transition-colors shadow-md border border-white/20 flex items-center gap-2"
            onClick={() => setIsExportDialogOpen(true)} // <-- This opens the modal
          >
            <ArrowDownTrayIcon className="w-5 h-5" />
          </button>

          <Link href={"/company/clients/new"}>
            <button
              className="h-12 px-6 rounded-xl text-white font-semibold bg-red-700 hover:bg-red-600 transition-colors shadow-md flex items-center gap-2"
              // Removed onClick logic that did nothing
            >
              <PlusIcon className="w-5 h-5" />
              Add Client
            </button>
          </Link>
        </div>
      </div>

      {/* --- ROW 3: CONTENT AREA --- */}
      <div className="mt-12 text-center">
        {!hasData ? (
          <p className="text-gray-200 text-xl">No Data Found!</p>
        ) : (
          <div className="text-white">
            {/* Client table/grid will go here */}
            Client Table Content
          </div>
        )}
      </div>

      {/* --- DIALOG RENDERING (Conditional) --- */}
      {isExportDialogOpen && (
        <FilterDialog
          title="Export Options"
          onClose={() => setIsExportDialogOpen(false)} // <-- This closes the modal
        >
          {/* Custom content for the dialog */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-medium">
              Select Fields to Export
            </h3>
            <input
              type="text"
              placeholder="File Name (e.g., client_data.csv)"
              className="h-10 w-full bg-black/10 text-white placeholder-gray-600 border border-gray-700 p-3 rounded-lg focus:ring-red-500 focus:border-red-500 focus:outline-none transition-colors"
            />
            {/* The default 'Apply' button in FilterDialog acts as the 'Export' button */}
          </div>
        </FilterDialog>
      )}
    </div>
  );
};

export default ClientPage;
