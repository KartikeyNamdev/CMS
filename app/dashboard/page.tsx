"use client";

import Card from "../components/Card";
// NOTE: Assuming all chart components (TransactionDonut, TotalTransactionValue, etc.) exist
import TransactionDonut from "../components/TransactionDonut";

import TransactionRevenue from "../components/TransactionRevenue";

import DropdownFilter from "../components/DropdownFilter";
import { useState } from "react";
import { CalendarIcon } from "@heroicons/react/24/solid";
import TotalTransactionValue from "../components/TotalTransactionChart";
import RevenueDonut from "../components/RevenueDonut";
import UnitDonut from "../components/UnitDonut";
import TransactionUnitChart from "../components/TransactionUnit";

// Options for dropdowns
const stateOptions = [
  { value: "ca", label: "California" },
  { value: "tx", label: "Texas" },
  { value: "ny", label: "New York" },
];

const chargerOptions = [
  { value: "all", label: "All Charger Types" },
  { value: "fast", label: "Fast (DC)" },
  { value: "level2", label: "Level 2 (AC)" },
];

export const Dashboard = () => {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [charger, setCharger] = useState("");
  const [dateRange, setDateRange] = useState("");

  // Standardized height for inputs and buttons
  const ITEM_HEIGHT_CLASS = "h-10"; // Using h-10 for consistency with other inputs
  const INPUT_WIDTH_CLASS = "w-[140px]"; // Consistent width for filter elements

  return (
    // Padding should be uniform (p-6 or lg:p-10)
    <div className="p-6 lg:px-60 ">
      {/* --- FILTER BAR (Responsive) --- */}
      <div className="flex flex-wrap items-end gap-4 mb-8 border-b border-gray-700 pb-4">
        {/* Dropdown Filters (Consistent width and height) */}
        <DropdownFilter
          placeholder="State"
          options={stateOptions}
          selectedValue={state}
          onChange={setState}
          className={`${INPUT_WIDTH_CLASS} ${ITEM_HEIGHT_CLASS}`}
        />
        <DropdownFilter
          placeholder="City"
          options={[{ value: "la", label: "Los Angeles" }]}
          selectedValue={city}
          onChange={setCity}
          className={`${INPUT_WIDTH_CLASS} ${ITEM_HEIGHT_CLASS}`}
        />

        <DropdownFilter
          placeholder="All Charger"
          options={chargerOptions}
          selectedValue={charger}
          onChange={setCharger}
          className={`${INPUT_WIDTH_CLASS} ${ITEM_HEIGHT_CLASS}`}
        />

        {/* Date Input */}
        <div
          className={`relative flex items-center bg-white rounded-xl shadow-md ${INPUT_WIDTH_CLASS} ${ITEM_HEIGHT_CLASS} px-3`}
        >
          <CalendarIcon className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Choose Date"
            value={dateRange}
            onFocus={(e) => (e.target.type = "date")} // Show date picker on focus
            onBlur={(e) => (e.target.type = "text")} // Hide date picker on blur
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full h-full text-black bg-transparent focus:outline-none placeholder-gray-500 text-sm"
          />
        </div>

        {/* Action Buttons */}
        <button
          className={`${ITEM_HEIGHT_CLASS} px-6 rounded-xl text-white font-semibold bg-[#b22828] hover:bg-red-700 transition-colors shadow-md`}
        >
          Search
        </button>

        <button
          className={`${ITEM_HEIGHT_CLASS} px-6 rounded-xl text-black font-semibold bg-white hover:bg-gray-200 transition-colors shadow-md border border-gray-300`}
        >
          Clear
        </button>
      </div>

      {/* --- CHARTS GRID (Responsive Layout) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Transactions (1 Column) */}
        <Card title="Transactions" className="col-span-1">
          <TransactionDonut />
        </Card>

        {/* Total Transaction Value (Spans 2 columns on desktop) */}
        <Card
          title="Total Transaction Value"
          className="col-span-1 lg:col-span-2"
        >
          <TotalTransactionValue />
        </Card>

        {/* Transaction Revenue (Spans 2 columns on desktop) */}
        <Card title="Transaction Revenue" className="col-span-1 lg:col-span-2">
          <TransactionRevenue />
        </Card>

        {/* Revenue (1 Column) */}
        <Card title="Revenue" className="col-span-1">
          <RevenueDonut />
        </Card>

        {/* Units (1 Column) */}
        <Card title="Units" className="col-span-1">
          <UnitDonut />
        </Card>

        {/* Transaction Unit (Spans 2 columns on desktop) */}
        <Card title="Transaction Unit" className="col-span-1 lg:col-span-2">
          <TransactionUnitChart />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
