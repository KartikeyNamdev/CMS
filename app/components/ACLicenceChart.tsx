"use client";
import { AgCharts } from "ag-charts-react";
import { useState } from "react";

const ACLicenseChart = () => {
  // Uses similar structure to RevenueChart/UnitsChart for AC License data
  const [chartOptions] = useState({
    background: { visible: false },
    data: [
      { status: "Total AC License", count: 100 },
      { status: "Available AC License", count: 70 },
      { status: "Active AC License", count: 30 },
    ],
    series: [
      {
        type: "donut",
        angleKey: "count",
        legendItemKey: "status",
        innerRadiusRatio: 0.6,
        outerRadiusRatio: 0.9,
        fills: ["#B33C3C", "#FBCED5", "#FFFFFF"],
        strokes: ["#B33C3C", "#B33C3C", "#B33C3C"],
        strokeWidth: 2,
        cornerRadius: 4,
        sectorLabel: { enabled: false },
        calloutLabel: { enabled: false },
      },
    ],
    legend: { enabled: false },
    padding: { top: 50, bottom: 50, left: 50, right: 50 },
  });

  return (
    <div className="h-48 w-full relative flex items-center justify-center">
      <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-500/50 absolute z-0" />
      <AgCharts options={chartOptions} />
    </div>
  );
};
export default ACLicenseChart;
