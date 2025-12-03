"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { ChartDataset } from "@/lib/types";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      min: 0,
      max: 1,
      ticks: {
        stepSize: 1,
        callback: (value: number) => (value === 1 ? "1" : "0"),
      },
      grid: { color: "rgba(255, 250, 250, 0.1)" },
    },
    x: {
      grid: { display: false },
      ticks: { maxRotation: 90, minRotation: 45 },
    },
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx) =>
          `State: ${ctx.raw === 1 ? "Connected" : "Disconnected"}`,
      },
    },
  },
};

export default function CustomBarChart({
  labels,
  datasets,
  className,
}: {
  labels: string[];
  datasets: ChartDataset[];
  className?: string;
}) {
  return (
    <div className={className}>
      <Bar className="bg-white" data={{ labels, datasets }} options={options} />
    </div>
  );
}
