"use client";

import { useEffect, useState } from "react";

const fallbackHours = Array.from(
  { length: 24 },
  (_, i) => `${String(i).padStart(2, "0")}:00`
);

const fallbackValues = [
  1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1,
];

const toBinary = (v: unknown) => (Number(v) >= 1 ? 1 : 0);

export type ConnectionStatusResult = {
  loading: boolean;
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderRadius: number;
    barThickness: number;
    barPercentage: number;
    categoryPercentage: number;
  }[];
};

export default function useConnectionStatus(
  stationId?: string
): ConnectionStatusResult {
  const [labels, setLabels] = useState(fallbackHours);
  const [values, setValues] = useState(fallbackValues);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStatus() {
      try {
        if (!stationId) return setLoading(false);

        const res = await fetch(
          `/api/connection-status?stationId=${stationId}`
        );
        const json = await res.json();

        if (json?.success && json?.data) {
          setLabels(json.data.map((x) => x.time) ?? fallbackHours);
          setValues(json.data.map((x) => toBinary(x.state)) ?? fallbackValues);
        }
      } catch {
        setLabels(fallbackHours);
        setValues(fallbackValues);
      } finally {
        setLoading(false);
      }
    }

    fetchStatus();
  }, [stationId]);

  return {
    loading,
    labels,
    datasets: [
      {
        label: "Connection Status",
        data: values.map(toBinary),
        backgroundColor: "#ff7b2c",
        borderRadius: 6,
        barThickness: 18,
        barPercentage: 0.55,
        categoryPercentage: 0.55,
      },
    ],
  };
}
