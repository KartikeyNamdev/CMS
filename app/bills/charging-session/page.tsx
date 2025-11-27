"use client";
import { ColumnOptions } from "@/app/charger/chargers/page"; // Assuming this array is available
import DropdownFilter from "@/app/components/DropdownFilter";
import { AddAdminDialog } from "@/app/components/DynamicDialog"; // Assuming this is available
import DynamicTable from "@/app/components/DynamicTable";
import { useState } from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid"; // Import for download icon
import FilterDialog from "@/app/components/FilterDialog";
export const DownloadButton = (
  <button
    className={`h-12 w-12 rounded-xl text-black font-semibold bg-white hover:bg-gray-100 transition-colors shadow-md border border-gray-300 flex items-center justify-center`}
  >
    <ArrowDownTrayIcon className="w-5 h-5" />
  </button>
);
const Home = () => {
  const [columnFilter, setColumnFilter] = useState("");

  // Placeholder button for potential dialog trigger

  return (
    <div className="text-gray-400 p-6 lg:px-55">
      {/* --- FIX: MERGED FILTER AND ACTION INTO ONE FLEX ROW --- */}
      <div className="mb-8 border-b border-gray-700 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* --- LEFT GROUP: FILTERS (Wraps on small screens) --- */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Booking ID Input */}
            <input
              type="text"
              placeholder="Booking ID"
              className={`h-12 py-2 px-4 text-black bg-white rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#b22828] w-40 transition-all`}
            />

            {/* Status Dropdown */}
            <DropdownFilter
              placeholder="Status"
              options={[
                {
                  value: "no option",
                  label: "no option",
                },
              ]}
              selectedValue={""}
              onChange={() => {}}
              className={`w-40 h-12`}
            />

            {/* Search Button */}
            <button
              className={`h-12 px-6 rounded-xl text-white font-semibold bg-[#b22828] hover:bg-red-600 transition-colors shadow-md`}
            >
              Search
            </button>

            {/* Clear Button */}
            <button
              className={`h-12 px-6 rounded-xl text-black font-semibold bg-white hover:bg-gray-100 transition-colors shadow-md border border-gray-300`}
            >
              Clear
            </button>
          </div>

          {/* --- RIGHT GROUP: ACTIONS (Pushed to the end using ml-auto) --- */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Columns Dropdown (H-12 size for uniformity) */}

            <DropdownFilter
              placeholder="Columns"
              options={ColumnOptions}
              selectedValue={columnFilter}
              onChange={setColumnFilter}
              className={`h-12 w-40`} /* Corrected height to h-12 */
            />
            <FilterDialog
              onClose={() => {}}
              title="Filter"
              data={[
                {
                  label: "",
                  value: "",
                },
              ]}
            />
            {DownloadButton}

            {/* Download Button */}
            {/* Render trigger button directly */}

            {/* Note: AddAdminDialog is commented out in original, so we keep it out here */}
          </div>
        </div>

        <DynamicTable />
      </div>
    </div>
  );
};

export default Home;
