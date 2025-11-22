"use client";

// Assuming Card is imported from a relative path
import Card from "../components/Card";
// Import chart placeholders

// Import icon for the stats cards
import {
  BoltIcon,
  PaperAirplaneIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import DCLicenseChart from "../components/DCLicenseChart";
import ACLicenseChart from "../components/ACLicenceChart";

// --- Stat Card Component (Internal Helper) ---
export const StatCard = ({ title, value, icon: Icon }) => (
  <Card className="flex flex-col p-4 justify-between min-h-[120px]">
    <p className="text-white text-3xl font-semibold mt-2">{value}</p>
    <div className="flex justify-between items-start">
      <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
      <Icon className="w-6 h-6 text-red-500" />
    </div>
  </Card>
);

// --- Main Company Management Page ---
export const CompanyManagement = () => {
  return (
    <div className="w-full p-6 lg:p-20 lg:px-65 min-h-screen">
      {/* Header/Status Row */}
      <div className="mb-6 text-gray-400 text-sm">
        Last refreshed at: 19 November 2025, 16:44 | Pluginp:{" "}
        <span className="text-green-400 font-semibold">OPO</span>
      </div>

      {/* --- ROW 1: STATS CARDS (3-COLUMN GRID) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard title="Host" value="0" icon={PaperAirplaneIcon} />
        <StatCard title="Investors" value="0" icon={CurrencyDollarIcon} />
        <StatCard title="Total Chargers" value="0" icon={BoltIcon} />
      </div>

      {/* --- ROW 2: DETAIL CARD (FULL WIDTH) --- */}
      <Card title={null} className="mb-6 p-6">
        <h2 className="text-white text-lg font-bold mb-4">
          Address: 51R, CYBERHUB, DLF PHASE 3, GURGAON, HARYANA, 12202
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-8 text-sm text-gray-300">
          <div className="flex flex-col">
            <span className="text-gray-500">Tax ID</span>
            <span className="text-white">132 - 4568 - 90</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">Total Session</span>
            <span className="text-white">0</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">License Cost (DC)</span>
            <span className="text-white">3000</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">License Cost (AC)</span>
            <span className="text-white">3000</span>
          </div>

          <div className="flex flex-col">
            <span className="text-gray-500">Total Admin</span>
            <span className="text-white">2</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">Payout Cycle</span>
            <span className="text-white">Monthly</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">Company Share</span>
            <span className="text-white">0</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">Company PIN</span>
            <span className="text-white">578161</span>
          </div>
        </div>
      </Card>

      {/* --- ROW 3: CHARGER LICENSES (2-COLUMN GRID) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 content-center">
        <Card title="DC Charger License">
          <DCLicenseChart />
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-400 justify-center">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-600"></span> Total DC
              License
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-pink-300"></span>{" "}
              Available DC License
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gray-700"></span> Active
              DC License
            </div>
          </div>
        </Card>

        <Card title="AC Charger License">
          <ACLicenseChart />
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-400 justify-center">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-700"></span> Total AC
              License
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-pink-300"></span>{" "}
              Available AC License
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-white"></span> Active AC
              License
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CompanyManagement;
