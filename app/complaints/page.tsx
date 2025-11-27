"use client";
import {
  CalendarIcon,
  CheckBadgeIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import Card from "../components/Card";
import { useState } from "react";
import DropdownFilter from "../components/DropdownFilter";
import ComplaintsChart from "../components/ComplaintsChart";
import TransactionDonut from "../components/TransactionDonut";
import ComplaintsDonut from "../components/ComplaintsDonut";

export const Dashboard = () => {
  const [range, setRange] = useState("Daily");
  const [from, setFrom] = useState("");
  return (
    <div className="p-6 lg:px-55 ">
      <h1 className="text-gray-300 text-md p-4">Last refreshed</h1>
      <div className="flex gap-4">
        <Card className="min-w-70">
          <div className="flex justify-between">
            <h1 className="text-2xl">453</h1>
            <ExclamationCircleIcon className="max-w-7 text-yellow-300" />
          </div>
          <p>Complaints</p>
        </Card>
        <Card className="min-w-70">
          <div className="flex justify-between">
            <h1 className="text-2xl">388</h1>
            <CheckBadgeIcon className="max-w-7 text-green-300" />
          </div>
          <p>Complaints Solved </p>
        </Card>
      </div>
      <div className="flex gap-6 py-8 text-white">
        <p className="pt-2">From</p>
        <div
          className={`relative flex items-center bg-white rounded-xl shadow-md h-12 w-42 px-3`}
        >
          <CalendarIcon className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Choose Date"
            value={from}
            onFocus={(e) => (e.target.type = "date")} // Show date picker on focus
            onBlur={(e) => (e.target.type = "text")} // Hide date picker on blur
            onChange={(e) => setFrom(e.target.value)}
            className="w-full h-full text-black bg-transparent focus:outline-none placeholder-gray-500 text-sm"
          />
        </div>
        <p className="pt-2">To</p>
        <div
          className={`relative flex items-center bg-white rounded-xl shadow-md h-12 w-42 px-3`}
        >
          <CalendarIcon className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Choose Date"
            value={from}
            onFocus={(e) => (e.target.type = "date")} // Show date picker on focus
            onBlur={(e) => (e.target.type = "text")} // Hide date picker on blur
            onChange={(e) => setFrom(e.target.value)}
            className="w-full h-full text-black bg-transparent focus:outline-none placeholder-gray-500 text-sm"
          />
        </div>
        <DropdownFilter
          placeholder={range}
          selectedValue=""
          className="h-10 w-52"
          onChange={(e) => {
            setRange(e);
          }}
          options={[
            { label: "Daily", value: "Daily" },
            { label: "Weekly", value: "Weekly" },
            { label: "Monthly", value: "Monthly" },
          ]}
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <ComplaintsChart />
        </div>
        <div className="">
          <ComplaintsDonut />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
