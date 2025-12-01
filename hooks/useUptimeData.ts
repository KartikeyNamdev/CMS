"use client";

import { useEffect, useState } from "react";

export type UptimeRange = "1M" | "3M" | "6M" | "1Y" | "YTD" | "All";

export type UptimeResult = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension: number;
  }[];
};

// ---------------------------
// DUMMY DATA
// ---------------------------
const uptime2025 = [94, 95, 96, 97, 95, 96, 97, 98, 97, 96, 95, 96];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const lastMonthLabels = ["01", "07", "14", "21", "28"];
const lastMonthValues = [95, 96, 94, 97, 96];

// ------------------------------------------
// ✅ DEFINE fallbackRanges (missing earlier)
// ------------------------------------------
const fallbackRanges: Record<UptimeRange, UptimeResult> = {
  "1M": {
    labels: lastMonthLabels,
    datasets: [
      {
        label: "Uptime %",
        data: lastMonthValues,
        borderColor: "#b22828",
        backgroundColor: "#b22828",
        tension: 0.3,
      },
    ],
  },

  "3M": {
    labels: months.slice(9, 12),
    datasets: [
      {
        label: "Uptime %",
        data: uptime2025.slice(9, 12),
        borderColor: "#b22828",
        backgroundColor: "#b22828",
        tension: 0.3,
      },
    ],
  },

  "6M": {
    labels: months.slice(6, 12),
    datasets: [
      {
        label: "Uptime %",
        data: uptime2025.slice(6, 12),
        borderColor: "#b22828",
        backgroundColor: "#b22828",
        tension: 0.3,
      },
    ],
  },

  "1Y": {
    labels: months,
    datasets: [
      {
        label: "Uptime %",
        data: uptime2025,
        borderColor: "#b22828",
        backgroundColor: "#b22828",
        tension: 0.3,
      },
    ],
  },

  YTD: {
    labels: months.slice(0, 12),
    datasets: [
      {
        label: "Uptime %",
        data: uptime2025.slice(0, 12),
        borderColor: "#b22828",
        backgroundColor: "#b22828",
        tension: 0.3,
      },
    ],
  },

  All: {
    labels: ["2021", "2022", "2023", "2024", "2025"],
    datasets: [
      {
        label: "Uptime %",
        data: [91, 92, 93, 94, 96],
        borderColor: "#b22828",
        backgroundColor: "#b22828",
        tension: 0.35,
      },
    ],
  },
};

// ------------------------------------------
// 🔥 HOOK — with fallback support
// ------------------------------------------
export default function useUptimeData(stationId?: string) {
  const [apiData, setApiData] = useState<Record<string, UptimeResult> | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUptime() {
      try {
        if (!stationId) {
          setLoading(false);
          return;
        }

        const res = await fetch(`/api/uptime?stationId=${stationId}`);
        const json = await res.json();

        if (json?.success && json?.data) {
          setApiData(json.data);
        }
      } catch (err) {
        console.log("Uptime fetch error → Using fallback : ", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUptime();
  }, [stationId]);

  // -----------------------------------------
  // Return API data or fallback data
  // -----------------------------------------
  const getRangeData = (range: UptimeRange): UptimeResult => {
    if (apiData?.[range]) return apiData[range];
    return fallbackRanges[range]; // <-- FIXED
  };

  return { loading, getRangeData };
}
