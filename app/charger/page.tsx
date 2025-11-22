"use client";
import { ArrowsUpDownIcon, BoltIcon, SunIcon } from "@heroicons/react/24/solid";
import { StatCard } from "../company/page";
import { useState } from "react";
import DropdownFilter from "../components/DropdownFilter";
import Card from "../components/Card";

import ChargingSessionsChart from "../components/ChargingSessionCard";

const dateRange = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "annually", label: "Annually" },
];
export const Dashboard = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  return (
    <div className="w-full p-6 lg:p-20 lg:px-65 min-h-screen justify-center">
      {/* Header/Status Row */}
      <div className="mb-6 text-gray-400 text-sm">
        Last refreshed at: 19 November 2025, 16:44 | Pluginp:{" "}
        <span className="text-green-400 font-semibold">OPO</span>
      </div>

      {/* --- ROW 1: STATS CARDS (3-COLUMN GRID) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard title="Total Charging Sessions" value="0" icon={SunIcon} />
        <StatCard
          title="Total Ongoing Sessions"
          value="0"
          icon={ArrowsUpDownIcon}
        />
        <StatCard title="Total Chargers" value="0" icon={BoltIcon} />
      </div>
      {/* --- ROW 2: DETAIL CARD (FULL WIDTH) --- */}
      <div className="mb-6 ">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8 text-sm text-gray-300">
          <div className="flex gap-4 flex-col">
            <h1 className="text-xl  text-semibold ">From </h1>
            <div className="relative w-20 p-6 flex items-center h-12 bg-white rounded-xl shadow-md min-w-[200px] text-gray-400">
              <input
                type="date"
                name="from"
                onChange={(e) => {
                  setFrom(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-xl  text-semibold">To </h1>
            <div className="relative w-20 gap-10 p-6  flex items-center h-12 bg-white rounded-xl shadow-md min-w-[200px] text-gray-400">
              <input
                type="date"
                name="to"
                onChange={(e) => {
                  setTo(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex pt-12">
            <div className="relative w-20  flex items-center h-12 bg-white rounded-xl shadow-md min-w-[200px] text-gray-400">
              <DropdownFilter
                placeholder="All Charger"
                options={dateRange}
                selectedValue={from}
                onChange={setFrom}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
      {/* --- ROW 3 --- */}
      <Card title="Units" className="col-span-1 max-w-[800px]">
        <div className="h-72 w-full flex items-center justify-center">
          <ChargingSessionsChart />
        </div>
      </Card>
    </div>
  );
};
export default Dashboard;
