"use client";

import { useState, useEffect } from "react";

export interface IChargerRow {
  chargerName: string;
  cinSerial: string;
  stationName: string;
  source: string;
  ocppId: string;
  locationStateCity: string;
  accessType: string;
  chargerType: string;
  oem: string;
  emspMapped: string;
  operationalStatus: string;
  visibilityStatus: string;
  connectorStatuses: ("Available" | "Unavailable")[];
  url: string;
}

export const useAllChargers = () => {
  const [data, setData] = useState<IChargerRow[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Dummy data matches perfectly with your previous UI
  const dummyData: IChargerRow[] = [
    {
      chargerName: "Dabas EV",
      cinSerial: "CIN/OCPP",
      stationName: "Aryan Hotel",
      source: "CSMS",
      ocppId: "Dabas004",
      locationStateCity: "27.35N | Rajasthan, Sikar",
      accessType: "Public",
      chargerType: "DC",
      oem: "Unknown",
      emspMapped: "Statiq",
      operationalStatus: "Commissioned Active",
      visibilityStatus: "Enabled",
      connectorStatuses: ["Available", "Available"],
      url: "/charger/station/Dabas004",
    },
    {
      chargerName: "2C Chargers",
      cinSerial: "CIN/OCPP",
      stationName: "Hotel Poth",
      source: "CSMS",
      ocppId: "Dabas003",
      locationStateCity: "28.7N | Delhi, New Delhi",
      accessType: "Public",
      chargerType: "DC",
      oem: "Unknown",
      emspMapped: "Statiq",
      operationalStatus: "Commissioned Testing",
      visibilityStatus: "Enabled",
      connectorStatuses: ["Available", "Unavailable"],
      url: "/charger/station/Dabas003",
    },
    {
      chargerName: "abc | Dabas",
      cinSerial: "CIN/OCPP",
      stationName: "Dabas EV Charging Station",
      source: "CSMS",
      ocppId: "Dabas001",
      locationStateCity: "31.2N | Haryana, Sonipat",
      accessType: "Public",
      chargerType: "DC",
      oem: "Servotech Power Systems - Dual Gun",
      emspMapped: "Statiq",
      operationalStatus: "Commissioned Active",
      visibilityStatus: "Enabled",
      connectorStatuses: ["Available", "Available"],
      url: "/charger/station/Dabas001",
    },
    {
      chargerName: "Dabas EV",
      cinSerial: "CIN/OCPP",
      stationName: "Avani Resorts",
      source: "CSMS",
      ocppId: "Statiq137",
      locationStateCity: "31.8N | Himachal Pradesh, Kangra",
      accessType: "Public",
      chargerType: "DC",
      oem: "Exicom",
      emspMapped: "Statiq",
      operationalStatus: "Commissioned Active",
      visibilityStatus: "Enabled",
      connectorStatuses: ["Available", "Unavailable"],
      url: "/charger/station/Statiq137",
    },
  ];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);

    // Simulate slow BE
    setTimeout(() => {
      setData(dummyData);
      setLoading(false);
    }, 500);
  }, []);

  return { data, loading };
};
