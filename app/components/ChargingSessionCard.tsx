"use client";
import { AgCharts } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";
import { useState } from "react";

// Mock Data structure based on the chart shape (Weeks 31-36)
const chartData = [
  { date: "31", sessions: 0.2 },
  { date: "32", sessions: 5 },
  { date: "33", sessions: 10 },
  { date: "34", sessions: 16 },
  { date: "35", sessions: 1 },
  { date: "36", sessions: 20 },
  { date: "37", sessions: 23 },
  { date: "38", sessions: 25 },
];

const ChargingSessionsChart = () => {
  const [chartOptions] = useState<AgChartOptions>({
    // 1. Transparent Background
    background: {
      visible: false,
    },
    title: { enabled: false },
    subtitle: { enabled: false },

    // 2. Data
    data: chartData,

    // 3. Series Configuration (Using Area for the filled effect)
    series: [
      {
        type: "area",
        xKey: "date",
        yKey: "sessions",
        yName: "No. of Charging Sessions",
        stroke: "#b22828",
        strokeWidth: 2,
        marker: { enabled: false },
        fill: "rgba(178, 40, 40, 0.4)",
        fillOpacity: 0.8,
        label: { enabled: false },
      },
    ],

    // 4. Axes Configuration
    axes: [
      {
        type: "category",
        position: "bottom",
        title: { text: "Date", color: "black" },
        label: { color: "black" },
        line: { stroke: "#374151" },
        gridLine: { style: [{ stroke: "transparent" }] },
      },
      {
        type: "number",
        position: "left",
        title: { text: "No. of Charging Sessions", color: "black" },
        label: { color: "black" },
        line: { stroke: "#374151" },
        gridLine: {
          style: [
            {
              stroke: "#374151",
              lineDash: [4, 4],
            },
          ],
        },
      },
    ],
    legend: { enabled: false },
    padding: { top: 20, right: 20, bottom: 20, left: 20 },
  });

  return (
    <div className="h-72 w-full">
      <AgCharts options={chartOptions} />
    </div>
  );
};
export default ChargingSessionsChart;
