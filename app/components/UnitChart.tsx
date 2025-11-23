"use client";
import { AgChartOptions } from "ag-charts-community";
import { AgCharts } from "ag-charts-react";
import { useState } from "react";

const UnitsChart = () => {
  const [chartOptions] = useState<AgChartOptions>({
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
        type: "donut" as const,
        angleKey: "count",
        calloutLabelKey: "type",
        sectorLabelKey: "count",

        // Donut dimensions
        innerRadiusRatio: 0.6,
        outerRadiusRatio: 0.9,

        // Colors
        fills: [
          "#b22828", // Public (Darker Red/Brown)
          "#fbced5", // Captive (Light Pink)
        ],
        // Stroke (Border) colors
        strokes: ["#fbced5", "#fbced5"],

        strokeWidth: 4, // Increased stroke width to create the visual separation

        // Labels inside the segments (e.g., "80%", "20%")
        sectorLabel: {
          enabled: true,
          color: "white", // White text for 80% and 20%
          fontWeight: "bold",
          fontSize: 16,
          formatter: ({ datum }: { datum: { count: string } }) => {
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
      position: "bottom" as const,
      item: {
        label: {
          color: "white", // White text
          fontSize: 14,
        },
        marker: {
          shape: "square" as const, // Using square markers for visual distinction
        },
        paddingX: 20,
      },
    },
  });

  return (
    <div className="h-72 w-full">
      <AgCharts options={chartOptions} />
    </div>
  );
};

export default UnitsChart;
