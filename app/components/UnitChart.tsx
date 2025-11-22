"use client";
import { AgCharts } from "ag-charts-react";
import { useState } from "react";

const UnitsChart = () => {
  const [chartOptions] = useState({
    // 1. Transparent Background
    background: {
      visible: false,
    },
    // 2. Data (Matches screenshot: 80% Public, 20% Captive)
    data: [
      { type: "Public", count: 80 },
      { type: "Captive", count: 20 },
    ],
    // 3. Series Configuration
    series: [
      {
        type: "donut",
        angleKey: "count",
        calloutLabelKey: "type",
        sectorLabelKey: "count",

        // Donut dimensions
        innerRadiusRatio: 0.6,
        outerRadiusRatio: 0.9,
        corner: 4,
        // Colors
        fills: [
          "#fbced5", // Captive (White)
          "#b22828", // Public (Darker Red/Brown)
        ],
        // Stroke (Border) colors - Match the outer red segment
        strokes: ["#fbced5", "#fbced5"],

        strokeWidth: 4, // Increased stroke width to create the visual separation

        // Labels inside the segments (e.g., "80%", "20%")
        sectorLabel: {
          enabled: true,
          color: "white", // White text for 80% and 20%
          fontWeight: "bold",
          fontSize: 16,
          offset: 10, // Push label slightly away from the center
          formatter: ({ datum }) => {
            return `${datum.count}%`;
          },
        },

        calloutLabel: {
          enabled: false,
        },
      },
    ],
    // 4. Legend Configuration (Bottom)
    legend: {
      enabled: true,
      position: "bottom",
      item: {
        label: {
          color: "white", // White text
          fontSize: 14,
        },
        marker: {
          shape: "square", // Using square markers for visual distinction
          fill: ({ legendItem }) => {
            // Match legend marker color to series fill color
            return legendItem.label === "Captive" ? "white" : "#b22828";
          },
          stroke: "transparent",
        },
        paddingX: 20,
      },
    },
    // Inner text configuration (Optional: if you want a total count in the center)
    innerLabels: [
      // Example: Placeholder for Total Units
      // { text: "100", fontSize: 24, color: "white" },
      // { text: "Total Units", spacing: 5, color: "gray" },
    ],
  });

  return (
    <div className="h-72 w-full">
      <AgCharts options={chartOptions} />
    </div>
  );
};

export default UnitsChart;
