"use client";
import { AgCharts } from "ag-charts-react";
import { useState } from "react";

const TotalTransactionValue = () => {
  // Mock Data to match your screenshot (Weeks 31-37)
  const [chartOptions] = useState({
    // 1. Transparent Background
    background: {
      visible: false,
    },
    // 2. Data
    data: [
      { week: "31", value: 3.5, label: "49M" },
      { week: "32", value: 4.1, label: "48M" },
      { week: "33", value: 4.1, label: "47M" },
      { week: "34", value: 7.5, label: "51M" }, // The peak
      { week: "35", value: 5.2, label: "47M" },
      { week: "36", value: 7.2, label: "49M" },
      { week: "37", value: 7.2, label: "30M" },
    ],
    // 3. Series Configuration (Bar Chart)
    series: [
      {
        type: "bar" as const,
        xKey: "week",
        yKey: "value",
        fill: "#b22828", // Red color from screenshot
        strokeWidth: 0,
        cornerRadius: 4, // Rounded tops

        // Labels inside the bars (e.g., "49M")
        label: {
          enabled: true,
          color: "white", // Dark text inside red bars for contrast
          formatter: ({ datum }: { datum: { label: string } }) => datum.label,
          fontSize: 10,
        },

        // Tooltip
        tooltip: {
          renderer: ({
            datum,
          }: {
            datum: { label: string; week: string };
          }) => ({
            title: `Week ${datum.week}`,
            content: `Value: ${datum.label}`,
          }),
        },
      },
    ],
    // 4. Axes Configuration
    axes: [
      {
        type: "category" as const,
        position: "bottom" as const,
        title: {
          text: "week",
          color: "#000000", // Gray text
        },
        label: {
          color: "black",
        },
        line: {
          stroke: "#374151", // Dark gray axis line
        },
        gridLine: {
          style: [{ stroke: "transparent" }], // No vertical grid lines
        },
      },
      {
        type: "number" as const,
        position: "left" as const,
        title: {
          text: "Total transaction value",
          color: "#000000", // Gray text
        },
        label: {
          color: "white",
        },
        line: {
          stroke: "#374151",
        },
        gridLine: {
          style: [{ stroke: "transparent" }], // No horizontal grid lines
        },
      },
    ],
    // Disable legend since it's a simple bar chart
    legend: {
      enabled: false,
    },
  });

  return (
    <div className="h-72 w-full">
      <AgCharts options={chartOptions} />
    </div>
  );
};

export default TotalTransactionValue;
