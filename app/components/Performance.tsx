"use client";

import { useState } from "react";
import Card from "./Card";
import LineChart from "./CustomLineGraph";
import useUptimeData, { type UptimeRange } from "@/hooks/useUptimeData";

const Performance = () => {
  const [dateRange, setDateRange] = useState<UptimeRange>("1M");

  const { loading, getRangeData } = useUptimeData("60683"); // Station ID
  const selectedChart = getRangeData(dateRange);

  const ranges: UptimeRange[] = ["1M", "3M", "6M", "1Y", "YTD", "All"];

  return (
    <Card title={null} className="p-6 mt-6 bg-black/40 border border-gray-800">
      {/* TOP TABS */}
      <div className="flex items-center gap-6 border-b border-gray-700 pb-3">
        <button className="text-[#b22828] font-semibold border-b-2 border-red-500 pb-2">
          Uptime
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* LEFT STATS */}
        <div className="space-y-4">
          <div className="bg-white/10 rounded-xl p-4">
            <p className="text-gray-300 text-sm">Avg Uptime</p>
            <h1 className="text-3xl font-bold text-white mt-2">96.21%</h1>
          </div>

          <div className="bg-white/10 rounded-xl p-4">
            <p className="text-gray-300 text-sm">Revenue</p>
            <h1 className="text-2xl font-bold text-white mt-2">INR 45658.50</h1>
          </div>

          <div className="bg-white/10 rounded-xl p-4">
            <p className="text-gray-300 text-sm">No. of Transactions</p>
            <h1 className="text-2xl font-bold text-white mt-2">225</h1>
          </div>
        </div>

        {/* RIGHT CHART */}
        <div className="col-span-3 bg-white/5 rounded-xl p-6 border border-gray-800">
          {/* FILTERS */}
          <div className="flex items-center gap-3 justify-end mb-6 flex-wrap">
            <div className="flex gap-1 bg-white/10 px-2 py-1 rounded-lg">
              {ranges.map((r) => (
                <button
                  key={r}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
                    dateRange === r
                      ? "bg-[#b22828] text-white"
                      : "text-gray-300 hover:text-white"
                  }`}
                  onClick={() => setDateRange(r)}
                >
                  {r}
                </button>
              ))}
            </div>

            <input
              type="text"
              placeholder="01/01/2020 - 30/01/2020"
              className="bg-white/10 text-gray-200 px-3 py-2 rounded-lg w-48 border border-gray-700"
            />

            <button className="bg-[#b22828] hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-lg">
              Search
            </button>

            <button className="bg-white text-black font-semibold px-5 py-2 rounded-lg">
              Clear
            </button>
          </div>

          {/* TITLE */}
          <h2 className="text-lg font-semibold text-white mb-4">
            Charger Uptime Graph ({dateRange})
          </h2>

          {/* CHART */}
          <div className="w-full h-[280px] bg-black/30 border border-gray-800 rounded-lg flex items-center justify-center">
            {loading ? (
              <span className="text-gray-400">Loading...</span>
            ) : (
              <LineChart
                labels={selectedChart.labels}
                datasets={selectedChart.datasets}
              />
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Performance;
