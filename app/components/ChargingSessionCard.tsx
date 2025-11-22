"use client";
import { AgCharts } from "ag-charts-react";
import { useState } from "react";

// Mock Data structure based on the chart shape (Weeks 31-36)
const chartData = [
  { date: "31", sessions: 0.2 },
  { date: "32", sessions: 2.5 },
  { date: "33", sessions: 3.0 },
  { date: "34", sessions: 4.5 },
  { date: "35", sessions: 6.0 },
  { date: "36", sessions: 7.5 },
  // Adding more data points for the second area in the screenshot
  { date: "37", sessions: 7.8 },
  { date: "38", sessions: 8.0 },
];

const ChargingSessionsChart = () => {
  const [chartOptions] = useState({
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

        // Line styling
        stroke: "#b22828", // Solid red line for the top edge
        strokeWidth: 2,
        marker: { enabled: false }, // Markers disabled for this style

        // Area Fill with Red Gradient
        fill: {
          type: "gradient",
          colorStops: [
            { offset: 0, color: "rgba(178, 40, 40, 0.8)" }, // Start with opaque red (#b22828)
            { offset: 1, color: "rgba(178, 40, 40, 0.0)" }, // Fade to transparent red
          ],
        },

        // Labels (disabled unless specific points are needed)
        label: { enabled: false },
      },
      // You would add the second area (pink/white) as a separate series here
      // if your data supported two distinct stacking layers, but focusing on the requested gradient.
    ],

    // 4. Axes Configuration
    axes: [
      {
        type: "category",
        position: "bottom",
        title: { text: "Date", color: "white" },
        label: { color: "white" },
        line: { color: "#374151" },
        gridLine: { style: [{ stroke: "transparent" }] },
        // Use visible_range to zoom in on data area if needed
      },
      {
        type: "number",
        position: "left",
        title: { text: "No. of Charging Sessions", color: "white" },
        label: { color: "white" },
        line: { color: "#374151" },
        // Horizontal Grid Lines (subtle gray)
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
