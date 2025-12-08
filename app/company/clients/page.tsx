"use client";

import React, { useState } from "react";
// Import Heroicons for the actions
import { ArrowDownTrayIcon, PlusIcon } from "@heroicons/react/24/solid";
// Assuming DropdownFilter is available
import DropdownFilter from "../../components/DropdownFilter";
import Link from "next/link";
import ZustandTestComponent from "@/app/components/ZustandTestComponent";

// Mock Data for filters
const clientTypeOptions = [
  { value: "large", label: "Large Enterprise" },
  { value: "small", label: "Small Business" },
  { value: "individual", label: "Individual" },
];

const ClientPage = () => {
  const [clientName, setClientName] = useState("");
  const [clientType, setClientType] = useState("");
  // const { stats } = useCompanySectionHooks();

  // State for whether data is loaded (currently false to show "No Data Found!")
  const [hasData] = useState(false);

  return (
    // Use w-full and padding from your standard page layout
    <div className="w-full p-6 lg:px-56 min-h-screen">
      {/* <FilterDialog title="Hello" onClose={() => {}}> */}
      {/* <input type="text" placeholder="helllo" />
      </FilterDialog> */}
      {/* --- ROW 1: HEADER AND STATUS --- */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-gray-400 text-sm">
          <span className="text-gray-700 font-semibold">IST +05:30</span> | INR
        </div>
      </div>

      {/* --- ROW 2: FILTERS AND ACTIONS --- */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        {/* Left Side: Search Filters */}
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
          <button className="h-12 px-4 rounded-xl text-white bg-white/10 hover:bg-white/20 transition-colors shadow-md border border-white/20 flex items-center gap-2">
            <ArrowDownTrayIcon className="w-5 h-5 text-black" />
          </button>

          <Link href={"/company/clients/new"}>
            <button
              className="h-12 px-6 rounded-xl text-white font-semibold bg-red-700 hover:bg-red-600 transition-colors shadow-md flex items-center gap-2"
              onClick={() => {}}
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
          <p className="text-gray-600 text-xl">No Data Found!</p>
        ) : (
          <div className="text-white">
            {/* Client table/grid will go here */}
            Client Table Content
          </div>
        )}
      </div>
      <ZustandTestComponent />
    </div>
  );
};

export default ClientPage;
