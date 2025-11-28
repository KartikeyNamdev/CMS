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
  ChartOptions,
} from "chart.js";
import Card from "./Card";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// --- MOCK DATA GENERATION (Keep this logic) ---
const generateComplaintsData = () => {
  const date = new Date("2025-10-26");
  const complaintValues = [
    0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 1, 3, 0, 1, 1, 3, 4, 4, 6, 3, 3, 3,
    2, 0,
  ]; // 27 points
  const dates = [];

  for (let i = 0; i < complaintValues.length; i++) {
    // Collect date labels
    dates.push(
      new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      })
    );
    // Move to the next day
    date.setDate(date.getDate() + 1);
  }
  return { labels: dates, values: complaintValues };
};

const chartData = generateComplaintsData();

export default function ComplaintsChart() {
  // 2. Data structure conversion for Chart.js
  const data = useMemo(() => {
    return {
      labels: chartData.labels,
      datasets: [
        {
          label: "Complaints",
          data: chartData.values,
          borderColor: "#3699FF", // Blue Line
          backgroundColor: "rgba(54, 153, 255, 0.2)", // Optional subtle fill
          borderWidth: 2,
          pointBackgroundColor: "white",
          pointBorderColor: "#3699FF",
          pointBorderWidth: 2,
          pointRadius: 4, // Marker size
          tension: 0.1, // Slight curve in line
          fill: false, // No area fill
        },
      ],
    };
  }, []);

  // 3. Options structure conversion for Chart.js
  const options: ChartOptions<"line"> = useMemo(() => {
    // Dark theme axis styling
    const axisStyle = {
      color: "white",
      font: { weight: "bold" as const },
    };
    const gridStyle = {
      color: "rgba(224, 224, 224, 0.2)", // Subtle gray grid lines
      borderDash: [5, 5],
      drawTicks: false,
    };

    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }, // Disabled
        title: {
          display: true,
          text: "Complaints",
          color: "white",
          font: { size: 18, weight: "bold" },
          padding: { top: 10, bottom: 20 },
        },
        tooltip: {
          mode: "index" as const,
          intersect: false,
        },
      },
      scales: {
        x: {
          type: "category" as const,
          title: { display: true, text: "Date", ...axisStyle },
          labels: chartData.labels,
          ticks: {
            color: "white",
            maxRotation: 45,
            minRotation: 45,
          },
          grid: { ...gridStyle, drawOnChartArea: true },
          border: { color: "#E0E0E0" },
        },
        y: {
          type: "linear" as const,
          title: { display: true, text: "Complaints", ...axisStyle },
          min: 0,
          max: 6, // Based on mock data peak
          beginAtZero: true,
          ticks: {
            color: "white",
            stepSize: 1, // Force integer steps
          },
          grid: { ...gridStyle, drawOnChartArea: true },
          border: { color: "#E0E0E0" },
        },
      },
    };
  }, []);

  return (
    <Card className="text-white">
      <div className="h-[350px] w-full p-4">
        {/* 4. Render the Line Chart */}
        <Line data={data} options={options} />
      </div>
    </Card>
  );
}
