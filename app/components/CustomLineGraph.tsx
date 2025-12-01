"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface LineChartProps {
  labels: string[];
  className?: string;
  datasets: Array<{
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
    tension?: number;
  }>;
}

export default function LineChart({
  labels,
  datasets,
  className,
}: LineChartProps) {
  const chartData = {
    labels,

    datasets: datasets.map((ds) => ({
      fill: false,
      tension: ds.tension ?? 0.1,
      borderColor: ds.borderColor ?? "#b22828",
      backgroundColor: ds.backgroundColor ?? "rgba(255, 99, 132, 0.5)",
      ...ds,
    })),
  };

  const config = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className={`w-full h-[300px] ${className}`}>
      <Line data={chartData} options={config} />
    </div>
  );
}
