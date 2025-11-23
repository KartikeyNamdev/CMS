"use client";

import Card from "../components/Card";
import TransactionDonut from "../components/TransactionDonut";
import TotalTransactionValue from "../components/TotalTransactionChart";
import TransactionRevenue from "../components/TransactionRevenue";
import RevenueDonut from "../components/RevenueDonut";
import UnitsChart from "../components/UnitChart";
import TransactionUnit from "../components/TransactionUnit";
import DropdownFilter from "../components/DropdownFilter";
import { useState } from "react";

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
  return (
    <div className="p-6 lg:px-65 w-full">
      <div className=" font-bold mb-6 content-center flex gap-6">
        <DropdownFilter
          placeholder="State"
          options={stateOptions}
          selectedValue={state}
          onChange={setState}
          className="min-w-[140px]"
        />
        <DropdownFilter
          placeholder="City"
          // Note: In a real app, this list would be filtered by the 'state' value
          options={[{ value: "la", label: "Los Angeles" }]}
          selectedValue={city}
          onChange={setCity}
          className="min-w-[140px]"
        />

        {/* 3. Charger Type Dropdown */}
        <DropdownFilter
          placeholder="All Charger"
          options={chargerOptions}
          selectedValue={charger}
          onChange={setCharger}
          className="min-w-[140px]"
        />
        <div className="relative flex items-center h-12 bg-white rounded-xl shadow-md min-w-[140px] text-gray-500 p-6">
          <input
            type="date"
            name="bday"
            onChange={(e) => {
              setDateRange(e.target.value);
            }}
          />
        </div>

        {/* 5. Action Buttons */}
        <button className="h-12 px-6 rounded-xl text-white font-semibold bg-[#b22828] hover:bg-red-700 transition-colors shadow-md">
          Search
        </button>

        <button className="h-12 px-6 rounded-xl text-black font-semibold bg-white hover:bg-gray-200 transition-colors shadow-md border border-gray-300">
          Clear
        </button>
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Transactions" className="col-span-1">
          <div className="">
            <TransactionDonut />
          </div>
        </Card>

        <Card
          title="Total Transaction Value"
          className="col-span-1 lg:col-span-2"
        >
          <div className="px-10">
            <TotalTransactionValue />
          </div>
        </Card>
        <Card title="Transaction Revenue" className="col-span-1 lg:col-span-2">
          <div className="px-10">
            <TransactionRevenue />
          </div>
        </Card>

        <Card title="Revenue" className="col-span-1">
          <div className="h-48 w-full flex items-center justify-center">
            <RevenueDonut />
          </div>
        </Card>

        {/* --- ROW 3 --- */}
        <Card title="Units" className="col-span-1">
          <div className="h-72 w-full flex items-center justify-center">
            <UnitsChart />
          </div>
        </Card>

        <Card title="Transaction Unit" className="col-span-1 lg:col-span-2">
          {/* Replace with your Line Chart component */}
          <div className="h-48 w-full flex items-center justify-center">
            <TransactionUnit />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
