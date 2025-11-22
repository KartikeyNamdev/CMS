"use client";
import { AgCharts } from "ag-charts-react";
import { useState } from "react";

const DCLicenseChart = () => {
  // Uses similar structure to TransactionDonut for DC License data
  const [chartOptions] = useState({
    background: { visible: false },
    data: [
      { status: "Total DC License", count: 40 },
      { status: "Available DC License", count: 30 },
      { status: "Active DC License", count: 30 },
    ],
    series: [
      {
        type: "pie",
        angleKey: "count",
        legendItemKey: "status",
        innerRadiusRatio: 0.5,
        outerRadiusOffset: -10,
        fills: ["#E53935", "#FBCED5", "#2E2E2E"],
        strokes: ["white", "white", "white"],
        strokeWidth: 2,
        sectorLabel: { enabled: false },
        calloutLabel: { enabled: false },
      },
    ],
    legend: { enabled: false },
    padding: { top: 50, bottom: 50, left: 50, right: 50 },
  });

  return (
    <div className="h-48 w-full flex items-center justify-center">
      <AgCharts options={chartOptions} />
    </div>
  );
};
export default DCLicenseChart;
