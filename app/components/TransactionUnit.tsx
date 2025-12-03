"use client";

import React, { useMemo } from "react";
// 1. Chart.js Imports
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Mock Data Structure (Months JAN to JUN)
const chartData = [
  { month: "JAN", public: 1.0, captive: 0.5 },
  { month: "FEB", public: 2.8, captive: 2.0 },
  { month: "MAR", public: 4.5, captive: 2.4 }, // Peak for label placement
  { month: "APR", public: 6.0, captive: 5.0 },
  { month: "MAY", public: 4.0, captive: 4.8 },
  { month: "JUN", public: 7.0, captive: 5.5 },
];

const chartData2 = [
  { month: "JAN", public: 3.0, captive: 3.5 },
  { month: "FEB", public: 1.8, captive: 1.0 },
  { month: "MAR", public: 6.5, captive: 6.4 }, // Peak for label placement
  { month: "APR", public: 3.0, captive: 3.0 },
  { month: "MAY", public: 8.0, captive: 8.8 },
  { month: "JUN", public: 4.0, captive: 4.5 },
];

// --- Reusable Options Generator ---
const generateChartConfig = (data: typeof chartData, titleEnabled: boolean) => {
  const labels = data.map((d) => d.month);

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
        labels: {
          color: "black",
          usePointStyle: true,
          boxWidth: 10,
        },
      },
      // title: {
      //   display: titleEnabled,
      //   text: "Transaction Unit",
      //   color: "black",
      //   font: { size: 18, weight: "bold" },
      //   padding: { top: 10, bottom: 20 },
      // },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        type: "category" as const,
        ticks: { color: "black" },
        grid: { display: false },
        title: { display: true, text: "Month", color: "#9CA3AF" },
        border: { color: "#374151" },
      },
      y: {
        type: "linear" as const,
        min: 0,
        max: 9,
        ticks: {
          color: "black",
        },
        grid: {
          color: "rgba(55, 65, 81, 0.5)",
          lineWidth: 1,
        },
        border: { color: "#374151" },
      },
    },
  };

  const datasets = [
    // Series 1: Public (Area Fill)
    {
      label: "Public",
      data: data.map((d) => d.public),
      borderColor: "#C83B3B",
      backgroundColor: (context) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(
          0,
          0,
          0,
          context.chart.height
        );
        gradient.addColorStop(0, "rgba(200, 59, 59, 0.7)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0.0)");
        return gradient;
      },
      borderWidth: 2,
      pointBackgroundColor: "white",
      pointBorderColor: "#C83B3B",
      pointBorderWidth: 2,
      pointRadius: 4,
      fill: "start" as const,
      tension: 0.2,
      order: 1,
    },
    // Series 2: Captive (Line Only)
    {
      label: "Captive",
      data: data.map((d) => d.captive),
      borderColor: "#FBCED5",
      backgroundColor: "transparent",
      borderWidth: 2,
      pointBackgroundColor: "white",
      pointBorderColor: "#FBCED5",
      pointBorderWidth: 2,
      pointRadius: 4,
      fill: false,
      tension: 0.2,
      order: 0,
    },
  ];

  return {
    data: { labels: labels, datasets: datasets },
    options: options,
  };
};

// --- Component 1: Default Transaction Unit Chart ---
export default function TransactionUnitChart() {
  const { data, options } = useMemo(
    () => generateChartConfig(chartData, false),
    []
  );

  return (
    <div className="h-72 w-full">
      <Line data={data} options={options} />
    </div>
  );
}

// --- Component 2: Second Transaction Unit Chart ---
export const TransactionUnitChart2 = () => {
  const { data, options } = useMemo(
    () => generateChartConfig(chartData2, true),
    []
  );

  return (
    <div className="h-72 w-full">
      <Line data={data} options={options} />
    </div>
  );
};
