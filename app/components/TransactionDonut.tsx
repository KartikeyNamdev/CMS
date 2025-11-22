"use client";
import { AgCharts } from "ag-charts-react";

// 1. Data to match the image
const chartData = [
  { status: "Completed", count: 40 },
  { status: "In-Review", count: 10 },
  { status: "Failed", count: 50 },
];

const TransactionDonut = () => {
  const options = {
    // 2. Set background to transparent
    background: {
      visible: false,
    },
    // 3. Remove chart title (the card provides the title)
    title: {
      enabled: false,
    },
    subtitle: {
      enabled: false,
    },
    series: [
      {
        data: chartData,
        type: "pie",
        // 4. Keys for the new data
        angleKey: "count",
        legendItemKey: "status",

        // 5. Colors to match the image
        fills: [
          "#2E2E2E", // Completed (Dark Gray)
          "#FBCED5", // In-Review (Light Pink)
          "#b22828", // Failed (Red)
        ],
        // 6. Strokes (outlines) to match image
        strokes: [
          "#2E2E2E", // Completed (match fill)
          "white", // In-Review (white)
          "#b22828", // Failed (match fill)
        ],
        strokeWidth: 2,

        // 7. Remove all labels from the pie itself
        sectorLabel: {
          enabled: false,
        },
        calloutLabel: {
          enabled: false,
        },

        // 8. Simple tooltip on hover
        tooltip: {
          renderer: ({ datum }) => ({
            title: datum.status,
            content: `Value: ${datum.count}`,
          }),
        },
      },
    ],
    // 9. Configure the legend to match the image
    legend: {
      enabled: true,
      position: "bottom", // At the bottom
      item: {
        label: {
          color: "white", // White text
        },
        marker: {
          shape: "circle", // Circular markers
        },
      },
    },
  };

  return (
    <div className="h-72 w-full">
      <AgCharts options={options} />
    </div>
  );
};
export default TransactionDonut;
