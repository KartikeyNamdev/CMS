"use client";

import ChargingSessionsTable from "@/app/components/ChargingSessionsTable";
import DropdownFilter from "@/app/components/DropdownFilter";
import FilterDialog from "@/app/components/FilterDialog";

import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export const DownloadButton = (
  <button className="h-12 w-12 rounded-xl text-black font-semibold bg-white hover:bg-gray-100 transition-colors shadow-md border border-gray-300 flex items-center justify-center">
    <ArrowDownTrayIcon className="w-5 h-5" />
  </button>
);

const Home = () => {
  const [columnFilter, setColumnFilter] = useState("");

  return (
    <div className="text-gray-400 p-6 lg:px-55">
      <div className="mb-8 border-b border-gray-700 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* --- LEFT FILTERS --- */}
          <div className="flex flex-wrap items-center gap-4">
            <input
              type="text"
              placeholder="Booking ID"
              className="h-12 py-2 px-4 text-black bg-white rounded-xl border border-gray-300 shadow-md w-40"
            />

            <DropdownFilter
              placeholder="Status"
              options={[{ value: "-", label: "No Option" }]}
              selectedValue={""}
              onChange={() => {}}
              className="h-12 w-40"
            />

            <button className="h-12 px-6 rounded-xl text-white font-semibold bg-[#b22828] hover:bg-red-600 shadow-md">
              Search
            </button>

            <button className="h-12 px-6 rounded-xl text-black font-semibold bg-white hover:bg-gray-100 border border-gray-300 shadow-md">
              Clear
            </button>
          </div>

          {/* --- RIGHT ACTIONS --- */}
          <div className="flex items-center gap-4 ml-auto">
            <DropdownFilter
              placeholder="Columns"
              options={[
                { value: "price", label: "Price" },
                { value: "promo", label: "Promotion" },
              ]}
              selectedValue={columnFilter}
              onChange={setColumnFilter}
              className="h-12 w-40"
            />

            <FilterDialog
              title="Filter"
              data={[{ label: "", value: "" }]}
              onClose={() => {}}
            />

            {DownloadButton}
          </div>
        </div>
      </div>

      {/* --- THE TABLE --- */}
      <ChargingSessionsTable />
    </div>
  );
};

export default Home;
