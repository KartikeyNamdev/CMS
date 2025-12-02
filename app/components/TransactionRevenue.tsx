"use client";
import { AgCharts } from "ag-charts-react";
import { useState } from "react";

const TransactionRevenue = () => {
  const [chartOptions] = useState({
    // 1. Transparent Background
    background: {
      visible: false,
    },
    // 2. Mock Data based on your screenshot (Weeks 31-38)
    data: [
      { week: "31", revenue: 0.5 },
      { week: "32", revenue: 8.5 }, // Peak
      { week: "33", revenue: 4.5 },
      { week: "34", revenue: 5.5 },
      { week: "35", revenue: 3.5 },
      { week: "36", revenue: 1.0 },
      { week: "37", revenue: 1.5 },
      { week: "38", revenue: 0.2 },
    ],
    // 3. Series: Bar (Column) Chart styled like a Histogram
    series: [
      {
        type: "bar" as const,
        xKey: "week",
        yKey: "revenue",
        fill: "#b22828", // Red color
        strokeWidth: 0,
        // Gap between bars (0.1 makes them look like a histogram/connected)
        gapRatio: 0.1,

        tooltip: {
          renderer: ({
            datum,
          }: {
            datum: { week: string; revenue: string };
          }) => ({
            title: `Week ${datum.week}`,
            content: `Revenue: ${datum.revenue}M`,
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
          color: "#000000",
        },
        label: {
          color: "black",
        },
        line: {
          stroke: "#000000",
        },
        // Vertical Grid Lines (visible in your screenshot)
        gridLine: {
          style: [
            {
              stroke: "#000000",
              lineDash: [4, 4],
            },
          ],
        },
      },
      {
        type: "number" as const,
        position: "left" as const,
        title: {
          text: "Total transaction Revenue",
          color: "black",
        },
        label: {
          color: "black",
        },
        line: {
          stroke: "#000000",
        },
        // Hide Horizontal Grid Lines
        gridLine: {
          style: [{ stroke: "transparent" }],
        },
      },
    ],
    legend: {
      enabled: false,
    },
    padding: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    },
  });

  return (
    <div className="h-72 w-full">
      <AgCharts options={chartOptions} />
    </div>
  );
};

export default TransactionRevenue;
