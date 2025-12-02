"use client";
import MultipleSelectCheckmarks from "@/app/components/Checkmark";
import DropdownFilter from "@/app/components/DropdownFilter";
import FilterDialog from "@/app/components/FilterDialog";
import StationTable from "@/app/components/StationTable";

import { ArrowDownTrayIcon, PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const EMSPOptions = [{ value: "no options", label: "no options" }];
const filterOptions = [
  { label: "Station Visibility status" },
  { label: "State" },
  { label: "City" },
  { label: "Zone" },
  { label: "Access Type" },
];
const ColumnOptions = [
  {
    value: "select all",
    label: "Select All",
  },
  {
    value: "zone",
    label: "Zone",
  },
  {
    value: "spoc details",
    label: "Spoc Details",
  },
  {
    value: "guard details",
    label: "Guard Details",
  },
  {
    value: "cctv",
    label: "CCTV",
  },
  {
    value: "parking fees",
    label: "Parking Fees",
  },
];
// select all, zone, Spoc details, Guard Details,CCTV, Parking fees
const SourceTypeOptions = [
  {
    value: "csms",
    label: "CSMS",
  },
  {
    value: "ocpi",
    label: "OCPI",
  },
];
export const Home = () => {
  return (
    <div className="w-full p-6 lg:px-40 min-h-screen">
      {/* --- ROW 2: FILTERS AND ACTIONS --- */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        {/* Left Side: Search Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <input
            type="text"
            placeholder="Station Name"
            // value={"clientName"}
            // onChange={(e) => setClientName(e.target.value)}
            className="h-12 py-2 px-4 text-black bg-white rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 min-w-[140px]"
          />

          <input
            type="text"
            placeholder="Station id"
            // value={"clientName"}
            // onChange={(e) => setClientName(e.target.value)}
            className="h-12 py-2 px-4 text-black bg-white rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 min-w-[140px]"
          />

          <DropdownFilter
            placeholder="EMSP"
            options={EMSPOptions}
            selectedValue={""}
            onChange={() => {}}
            className="min-w-[140px]"
          />
          <DropdownFilter
            placeholder="Source"
            options={SourceTypeOptions}
            selectedValue={""}
            onChange={() => {}}
            className="min-w-[140px]"
          />

          <button className="h-12 px-6 rounded-xl text-white font-semibold bg-[#b22828] hover:bg-red-600 transition-colors shadow-md">
            Search
          </button>

          <button className="h-12 px-6 rounded-xl text-black font-semibold bg-white hover:bg-gray-100 transition-colors shadow-md border border-gray-300">
            Clear
          </button>
        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex gap-4">
          <FilterDialog
            data={filterOptions}
            title={"Station Filter"}
            onClose={() => {}}
          />
          <button className="h-12 px-4 rounded-xl text-white bg-white/10 hover:bg-white/20 transition-colors shadow-md border border-white/20 flex items-center gap-2">
            <ArrowDownTrayIcon className="w-5 h-5 text-black" />
          </button>
          <div className="border border-gray-400 rounded-2xl">
            <MultipleSelectCheckmarks
              label="Column"
              data={[
                "Spoc details",
                "Parking fees",
                "Connection Type",
                "Zone",
                "Guard details",
                "CCTV",
                "Internet Connection Type",
              ]}
            />
          </div>

          <Link href={"/charger/station/new"}>
            <button
              className="h-12 px-6 rounded-xl text-sm text-white font-semibold bg-[#b22828] hover:bg-red-600 transition-colors shadow-md flex items-center gap-2"
              onClick={() => {}}
            >
              <PlusIcon className="w-5 h-5" />
              Add Station
            </button>
          </Link>
        </div>
      </div>
      <StationTable />
      {/* </Card> */}
    </div>
  );
};
export default Home;
