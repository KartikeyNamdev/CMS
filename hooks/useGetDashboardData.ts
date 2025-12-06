// src/hooks/useTopPerformers.ts

import { useState, useEffect, useMemo } from "react";

export interface PerformerType {
  id: number;
  title: string;
  description: string;
  revenue: number;
}

const dummyData: PerformerType[] = [
  {
    id: 1,
    title: "Pearl Charger",
    description: "Fast and Efficient",
    revenue: 2602.12,
  },
  {
    id: 2,
    title: "Shubh Charger",
    description: "Reliable Charging Output",
    revenue: 3602.12,
  },
  {
    id: 3,
    title: "Bamboo Charger",
    description: "Eco Friendly Charger",
    revenue: 4402.12,
  },
];

export default function useTopPerformers() {
  const [chargers, setChargers] = useState<PerformerType[]>([]);
  const [stations, setStations] = useState<PerformerType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API call simulation
    setTimeout(() => {
      setChargers(dummyData);
      setStations(dummyData); // same dummy for now
      setLoading(false);
    }, 500);
  }, []);

  return { chargers, stations, loading };
}
/* -----------------------------------------------
🔌 Dummy Hook for Alerts Section
----------------------------------------------- */
const AlertType = ["All", "user", "payment", "charger", "station", "invoice"];

export interface AlertT {
  id: number;
  status: string;
  type: string;
  title: string;
  description: string;
}

export function useAlerts() {
  const ALL = "All";
  const [activeFilter, setActiveFilter] = useState<string>(ALL);

  const dummyAlerts: AlertT[] = useMemo(
    () => [
      {
        id: 1,
        status: "success",
        title: "New User Added",
        description: "Kartikey has been added.",
        type: "user",
      },
      {
        id: 2,
        status: "failure",
        title: "Payment Failed",
        description: "Transaction for ID 123 failed.",
        type: "payment",
      },
      {
        id: 3,
        status: "failure",
        title: "Station Offline",
        description: "Station XYZ unreachable.",
        type: "station",
      },
      {
        id: 4,
        status: "success",
        title: "User Removed",
        description: "Rishika was removed.",
        type: "user",
      },
      {
        id: 5,
        status: "success",
        title: "Charger Reconnected",
        description: "Charger-5 connected back.",
        type: "charger",
      },
      {
        id: 6,
        status: "failure",
        title: "Invoice Error",
        description: "Invoice could not be created.",
        type: "invoice",
      },
    ],
    []
  );

  const filteredAlerts = useMemo(() => {
    if (activeFilter === ALL) return dummyAlerts;
    return dummyAlerts.filter((a) => a.type === activeFilter);
  }, [activeFilter, dummyAlerts]);

  return { AlertType, activeFilter, setActiveFilter, filteredAlerts };
}

/* -----------------------------------------------
🔋 Hook for Energy Forecast Chart
----------------------------------------------- */
export function useEnergyForecast() {
  const labels = [
    "30 Nov",
    "1 Dec",
    "2 Dec",
    "3 Dec",
    "4 Dec",
    "5 Dec",
    "6 Dec",
  ];

  const dataSets = [
    {
      label: "Actual",
      data: [135, 175, 254.24, 160, null, null, null],
      borderColor: "#3b82f6",
      backgroundColor: "#3b82f6",
      tension: 0.1,
      pointRadius: 5,
    },
    {
      label: "Predicted",
      data: [142, 130, 142.31, 135, 128, 131, 130],
      borderColor: "#10b981",
      backgroundColor: "#10b981",
      tension: 0.1,
      borderDash: [5, 5],
      pointRadius: 0,
    },
  ];

  return { labels, dataSets };
}
