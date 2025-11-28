"use client";

import React from "react";
import Card from "@/app/components/Card"; // Custom dark Card component
// Import icons for the stat cards and charts
import { ChartBarIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import TransactionUnit, {
  TransactionUnitChart2,
} from "../components/TransactionUnit";
import UnitsChart from "../components/UnitDonut";

// --- Internal Helper Components ---

// Reused Stat Card for key metrics
const StatCard = ({
  title,
  value,
  icon: Icon,
  valueClass = "",
}: {
  title: string;
  value: string;
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & { title?: string }
  >;
  valueClass?: string;
}) => (
  <Card className="flex flex-col p-4 justify-between min-h-[120px]">
    <div className="flex justify-between items-start">
      <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
      <Icon className="w-6 h-6 text-red-500" />
    </div>
    <p className={`text-white text-3xl font-semibold mt-2 ${valueClass}`}>
      {value}
    </p>
  </Card>
);

// Placeholder for the line chart (reusing TransactionUnit styling)
const UserTrendChart = ({ title }: { title: string }) => (
  <Card title={title} className="col-span-1 lg:col-span-2">
    <TransactionUnit />
  </Card>
);

// Placeholder for the Donut chart
const UserRatioChart = ({
  title,
  legend,
}: {
  title: string;
  legend: Array<{
    color: string;
    label: string;
  }>;
}) => (
  <Card title={title} className="col-span-1">
    {/* <div className="h-48 w-full flex items-center justify-center"> */}
    {/* Placeholder for the donut chart component */}

    {/* </div> */}
    <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-400 justify-center">
      {/* {legend.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${item.color}`}></span>
          {item.label}
        </div>
      ))} */}
      <UnitsChart />
    </div>
  </Card>
);

// --- Main Component ---

export const UserManagementOverview = () => {
  return (
    <div className="w-full p-6 lg:px-50 min-h-screen">
      {/* Header/Status Row */}
      <div className="mb-6 text-gray-400 text-sm">
        Last refreshed at: 07/10/23, 16:44 | Pluginp:{" "}
        <span className="text-green-400 font-semibold">OPO</span>
      </div>

      {/* --- ROW 1: STATS CARDS (3-COLUMN GRID) --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Booking"
          value="0"
          icon={UserGroupIcon}
          valueClass=""
        />
        <StatCard
          title="Completed Booking"
          value="0"
          icon={ChartBarIcon}
          valueClass=""
        />
        <StatCard
          title="Total Revenue"
          value="0"
          icon={UserGroupIcon}
          valueClass=""
        />
        <StatCard
          title="Units Consumed"
          value="0"
          icon={UserGroupIcon}
          valueClass=""
        />
      </div>

      {/* --- ROW 2: LINE CHART + RATIO CHARTS (4-COLUMN SPAN) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 w-full">
        {/* User Trend Chart (Spans 2 columns) */}

        <UserTrendChart title="User Graph" />

        {/* Existing/New Users Ratio Chart */}
        <UserRatioChart
          title="Existing/New Users"
          legend={[
            { label: "Existing Users", color: "bg-red-600" },
            { label: "New Users", color: "bg-gray-400" },
          ]}
        />

        {/* Active/Inactive Users Ratio Chart */}
      </div>

      {/* --- ROW 3: LINE CHART (FULL WIDTH) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <UserRatioChart
          title="Active/Inactive Users"
          legend={[
            { label: "Active Users", color: "bg-red-600" },
            { label: "Inactive Users", color: "bg-gray-400" },
          ]}
        />
        <Card title="Transaction Unit" className="col-span-1 lg:col-span-2">
          <TransactionUnitChart2 />
        </Card>
      </div>
    </div>
  );
};

export default UserManagementOverview;
