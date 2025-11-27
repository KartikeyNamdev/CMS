"use client";
import { AgCharts } from "ag-charts-react";
import { useState } from "react";
import { type AgChartOptions } from "ag-charts-community";

// Mock Data Structure (Months JAN to JUN)
const chartData = [
  { month: "JAN", public: 1.0, captive: 0.5 },
  { month: "FEB", public: 2.8, captive: 2.0 },
  { month: "MAR", public: 4.5, captive: 2.4 }, // 4.5 is the public value where the label is shown in the image
  { month: "APR", public: 6.0, captive: 5.0 },
  { month: "MAY", public: 4.0, captive: 4.8 },
  { month: "JUN", public: 7.0, captive: 5.5 },
];

const chartData2 = [
  { month: "JAN", public: 3.0, captive: 3.5 },
  { month: "FEB", public: 1.8, captive: 1.0 },
  { month: "MAR", public: 6.5, captive: 6.4 }, // 4.5 is the public value where the label is shown in the image
  { month: "APR", public: 3.0, captive: 3.0 },
  { month: "MAY", public: 8.0, captive: 8.8 },
  { month: "JUN", public: 4.0, captive: 4.5 },
];
export default function TransactionUnitChart() {
  const [chartOptions] = useState<AgChartOptions>({
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
        type: "area",
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
            // Logic to show label only on a specific point (e.g., peak/latest)
            if (datum.month === "MAR") {
              return `$${datum.public.toFixed(1)}`;
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
        type: "line",
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
      },
    ],
    // 4. Axes Configuration
    axes: [
      {
        type: "category",
        position: "bottom",
        title: { text: "Month", color: "#9CA3AF" },
        label: { color: "white" },
        line: { color: "#374151" },
        gridLine: { style: [{ stroke: "transparent" }] },
        paddingInner: 0.4, // Add padding to make bars wider
      },
      {
        type: "number",
        position: "left",
        title: { text: "", color: "white" }, // Title is often omitted on line charts
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
}
export const TransactionUnitChart2 = () => {
  const [chartOptions] = useState<AgChartOptions>({
    // 1. Transparent Background
    background: {
      visible: false,
    },
    title: { enabled: true },
    subtitle: { enabled: false },

    // 2. Data
    data: chartData2,

    // 3. Series Configuration
    series: [
      // Series 1: Public (Line + Area Fill)
      {
        type: "area",
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
            // Logic to show label only on a specific point (e.g., peak/latest)
            if (datum.month === "MAR") {
              return `$${datum.public.toFixed(1)}`;
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
        type: "line",
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
      },
    ],
    // 4. Axes Configuration
    axes: [
      {
        type: "category",
        position: "bottom",
        title: { text: "Month", color: "#9CA3AF" },
        label: { color: "white" },
        line: { color: "#374151" },
        gridLine: { style: [{ stroke: "transparent" }] },
        paddingInner: 0.4, // Add padding to make bars wider
      },
      {
        type: "number",
        position: "left",
        title: { text: "", color: "white" }, // Title is often omitted on line charts
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
