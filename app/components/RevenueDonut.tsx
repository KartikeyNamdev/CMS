"use client";
import { AgCharts } from "ag-charts-react";
import { useState } from "react";
import type { AgChartOptions } from "ag-charts-community";

const RevenueDonut = () => {
  const [chartOptions] = useState<AgChartOptions>({
    // 1. Transparent Background
    background: {
      visible: false,
    },
    // 2. Mock Data (Matches screenshot: 60% Public, 40% Captive)
    data: [
      { type: "Public", count: 60 },
      { type: "Captive", count: 40 },
    ],
    // 3. Series Configuration
    series: [
      {
        type: "donut" as const,
        angleKey: "count",
        calloutLabelKey: "type",
        sectorLabelKey: "count",

        // Inner Radius to make it a ring (Donut)
        innerRadiusRatio: 0.6,
        outerRadiusRatio: 0.9,

        // Colors from your screenshot
        fills: [
          "#C83B3B", // Public (Red)
          "#FBCED5", // Captive (Light Pink)
        ],
        // Stroke (Border) colors
        strokes: [
          "white", // White border around segments
          "white",
        ],
        strokeWidth: 2,

        // Labels inside the segments (e.g., "40%", "60%")
        sectorLabel: {
          enabled: true,
          color: "#C83B3B", // Red text for 60%
          fontWeight: "bold",
          fontSize: 14,
          formatter: ({ datum }: { datum: { count: string } }) => {
            // Custom logic to match screenshot colors per label if needed
            // For now, we just return the value + %
            return `${datum.count}%`;
          },
        },

        // Remove callout lines and labels (handled by legend/inner labels)
        calloutLabel: {
          enabled: false,
        },

        // Tooltip
        tooltip: {
          renderer: ({
            datum,
          }: {
            datum: { type: string; count: string };
          }) => ({
            title: datum.type,
            content: `${datum.count}%`,
          }),
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
          shape: "circle" as const,
          size: 10,
        },
        paddingX: 20, // Spacing between items
      },
    },
  });

  return (
    <div className="h-72 w-full relative">
      {/* 5. Dotted Circle Overlay (CSS) 
          The screenshot has a dotted circle INSIDE the donut.
          We can achieve this with a simple absolute positioned div.
      */}
      {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-500/50" />
      </div> */}

      <AgCharts options={chartOptions} />
    </div>
  );
};

export default RevenueDonut;
