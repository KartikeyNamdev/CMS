"use client";
import { AgCharts } from "ag-charts-react";
import { useState } from "react";

// Mock Data Structure
const chartData = [
  { month: "JAN", public: 1.0, captive: 0.5 },
  { month: "FEB", public: 4.5, captive: 2.5 },
  { month: "MAR", public: 6.2, captive: 2.3 }, // Peak label is here (public 6.2)
  { month: "APR", public: 5.0, captive: 4.5 },
  { month: "MAY", public: 7.5, captive: 4.0 },
  { month: "JUN", public: 8.1, captive: 5.5 },
];

const TransactionUnit = () => {
  const [chartOptions] = useState({
    // 1. Transparent Background
    background: {
      visible: false,
    },
    title: { enabled: false },
    subtitle: { enabled: false },

    // 2. Data
    data: chartData,

    // 3. Series Configuration
    series: [
      // Series 1: Public (Line + Area Fill)
      {
        type: "area", // Use 'area' for the Public series to get the fill effect
        xKey: "month",
        yKey: "public",
        yName: "Public",

        // Red Line and Area Fill
        stroke: "#C83B3B",
        strokeWidth: 2,
        marker: {
          shape: "circle",
          size: 6,
          fill: "white",
          stroke: "#C83B3B",
        },
        // Area fill with gradient from red to white/transparent
        fill: {
          type: "gradient",
          colorStops: [
            { offset: 0, color: "rgba(200, 59, 59, 0.4)" }, // Red-tinted start
            { offset: 1, color: "rgba(255, 255, 255, 0.0)" }, // Transparent end
          ],
        },

        // Data label for the peak point (MAR in mock data)
        label: {
          enabled: true,
          formatter: ({ datum }) => {
            // Only show the label for the highest point in our mock data
            if (datum.month === "MAR") {
              return `$${datum.public}`;
            }
            return "";
          },
          // Custom label styling to match the red box in the screenshot
          color: "white",
          backgroundColor: "#C83B3B",
          borderColor: "#C83B3B",
          borderWidth: 1,
          padding: { top: 4, bottom: 4, left: 8, right: 8 },
          minSpacing: 20,
        },
      },
      // Series 2: Captive (Line Only)
      {
        type: "line", // Use 'line' for Captive (no fill needed)
        xKey: "month",
        yKey: "captive",
        yName: "Captive",

        stroke: "#FBCED5", // Light pink line
        strokeWidth: 2,
        marker: {
          shape: "circle",
          size: 6,
          fill: "white",
          stroke: "#FBCED5",
        },
        fill: "transparent", // Ensure no area fill
      },
    ],
    // 4. Axes Configuration
    axes: [
      {
        type: "category",
        position: "bottom",
        title: { text: "week", color: "#9CA3AF" },
        label: { color: "white" },
        line: { color: "#374151" },
        gridLine: { style: [{ stroke: "transparent" }] },
      },
      {
        type: "number",
        position: "left",
        title: { text: "Total transaction unit", color: "white" },
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
    // 5. Legend
    legend: {
      enabled: true,
      position: "top-right",
      item: {
        label: {
          color: "white",
          fontSize: 14,
        },
        marker: {
          shape: "square",
        },
      },
    },
    padding: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    },
  });

  return (
    <div className="h-72 w-full">
      <AgCharts options={chartOptions} />
    </div>
  );
};
export default TransactionUnit;
