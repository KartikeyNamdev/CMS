"use client";
import { AgCharts } from "ag-charts-react";
import { useState } from "react";
// Correcting type import path to ag-charts-react
import { type AgChartOptions } from "ag-charts-community";
import Card from "./Card";

// --- MOCK DATA GENERATION ---
// Data generated to closely match the peaks (1, 0, 3, 6, 2, 0) shown in the image over 31 days
const generateComplaintsData = () => {
  const data = [];
  const date = new Date("2025-10-26");
  const complaintValues = [
    0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 1, 3, 0, 1, 1, 3, 4, 4, 6, 3, 3, 3,
    2, 0,
  ]; // 27 points

  for (let i = 0; i < complaintValues.length; i++) {
    data.push({
      date: new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      }),
      complaints: complaintValues[i],
    });
    date.setDate(date.getDate() + 1);
  }
  return data;
};

const complaintsData = generateComplaintsData();

export default function ComplaintsChart() {
  const [chartOptions] = useState<AgChartOptions>({
    // 1. Transparent Background
    background: {
      visible: false,
    },
    // Title is needed here
    title: {
      enabled: true,
      text: "Complaints",
      color: "white", // Assuming the card uses a white background for this chart
      fontWeight: "bold",
      fontFamily: "Inter, sans-serif",
    },
    subtitle: { enabled: false },

    // 2. Data
    data: complaintsData,

    // 3. Series Configuration (Single Line Series)
    series: [
      {
        type: "line", // Line chart type
        xKey: "date",
        yKey: "complaints",
        yName: "Complaints",

        // --- STYLING: Blue Line and Markers ---
        stroke: "#3699FF", // Blue line color
        strokeWidth: 2,
        marker: {
          shape: "circle",
          size: 6,
          fill: "white",
          stroke: "#3699FF", // Blue marker stroke
        },

        // Remove Fill and Label styling from the previous component
        fill: { enabled: false },
        label: { enabled: false },
      },
    ],

    // 4. Axes Configuration
    axes: [
      {
        type: "category",
        position: "bottom",
        title: { text: "Date", color: "white", fontWeight: "bold" },
        label: { color: "white", rotation: 45 }, // Rotate labels for better fit on X-axis
        line: { color: "#E0E0E0" },
        gridLine: { style: [{ stroke: "#E0E0E0", lineDash: [2, 2] }] }, // Subtle gray grid lines
        // Set paddingInner to 1 for category axis lines to start and end neatly
        paddingInner: 0,
      },
      {
        type: "number",
        position: "left",
        title: { text: "Complaints", color: "white", fontWeight: "bold" },
        label: { color: "white" },
        line: { color: "#E0E0E0" },
        // Horizontal Grid Lines (subtle gray)
        gridLine: {
          style: [
            {
              stroke: "#E0E0E0",
              lineDash: [2, 2],
            },
          ],
        },
        // Force integer steps for complaint count
        tick: {
          interval: 1,
        },
      },
    ],

    // 5. Legend (Disabled)
    legend: {
      enabled: false,
    },
    padding: {
      top: 15,
      right: 20,
      bottom: 15,
      left: 20,
    },
  });

  return (
    <Card className="text-white">
      <div className="h-[350px] w-full">
        <AgCharts options={chartOptions} />
      </div>
    </Card>
  );
}
