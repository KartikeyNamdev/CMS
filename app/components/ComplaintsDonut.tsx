"use client";
import { AgCharts } from "ag-charts-react";
import { useState } from "react";
// Correcting type import path to ag-charts-react
import { type AgChartOptions } from "ag-charts-community";
import Card from "./Card";

// --- MOCK DATA FOR DONUT CHART ---
const SOLVED_COUNT = 388;
const ACTIVE_COUNT = 65;
const TOTAL_COMPLAINTS = SOLVED_COUNT + ACTIVE_COUNT;

const complaintsData = [
  { status: "Solved", count: SOLVED_COUNT, color: "#3699FF" }, // Blue
  { status: "Active", count: ACTIVE_COUNT, color: "#FF5733" }, // Orange/Red
];

export default function ComplaintsDonut() {
  const [chartOptions] = useState<AgChartOptions>({
    // 1. Transparent Background
    background: {
      visible: false,
    },
    // Title positioned correctly for a card component
    // title: {
    //   enabled: true,
    //   text: "Complaints",

    //   color: "white", // <--- FIX: Set title color to white for visibility on dark background
    //   fontWeight: "bold",
    //   fontFamily: "Inter, sans-serif",
    // },
    subtitle: { enabled: false },

    // 2. Data
    data: complaintsData,

    // 3. Series Configuration (Donut Chart)
    series: [
      {
        type: "donut" as const,
        angleKey: "count",
        legendItemKey: "status",

        // Donut dimensions
        innerRadiusRatio: 0.7, // Wider hole for inner labels
        outerRadiusRatio: 1.0,

        // Colors based on the image (Blue and Orange/Red)
        fills: complaintsData.map((d) => d.color),
        strokes: ["white", "white"], // White stroke for clean separation
        strokeWidth: 4,

        // Remove individual segment labels
        sectorLabel: { enabled: false },
        calloutLabel: { enabled: false },

        // Center Labels (Total Count)
        innerLabels: [
          {
            text: "Total",
            fontSize: 16,
            color: "gray",
            fontWeight: "normal",
          },
          {
            text: TOTAL_COMPLAINTS.toString(),
            fontSize: 32,
            color: "white", // <--- FIX: Center label must also be white
            fontWeight: "bold",
            spacing: 5,
          },
        ],
      },
    ],

    // 4. Axes Configuration (Removed as it's a donut chart)
    axes: [],

    // 5. Legend (Configured for bottom display)
    legend: {
      enabled: true,
      position: "bottom" as const,
      item: {
        label: {
          color: "white", // <--- FIX: Legend labels must be white
        },
        marker: {
          shape: "circle" as const, // Circular markers
        },
      },
    },
    padding: {
      top: 5,
      right: 20,
      bottom: 20,
      left: 20,
    },
  });

  return (
    <Card title="Complaints" className="h-full w-full">
      <AgCharts options={chartOptions} />
    </Card>
  );
}
