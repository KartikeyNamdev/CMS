import { useCallback, useEffect, useState } from "react";

export interface StationType {
  name: string;
  stationId: string;
  source: string;
  locations: string;
  stateCity: string;
  locationType: string;
  numChargers: number;
  emspChargers: string;
  accessType: string;
  openingHours: string;
  visibilityStatus: string;
  url: string;
}

const DUMMY_STATIONS: StationType[] = [
  {
    name: "CyberHub Station",
    stationId: "STN-001",
    source: "Internal",
    locations: "CyberHub, Gurgaon",
    stateCity: "Haryana, Gurgaon",
    locationType: "Commercial",
    numChargers: 6,
    emspChargers: "Tata Power",
    accessType: "Public",
    openingHours: "24/7",
    visibilityStatus: "Visible",
    url: "/charger/station/STN-001",
  },
  {
    name: "DLF Phase 3 Charger",
    stationId: "STN-002",
    source: "Internal",
    locations: "DLF Phase 3",
    stateCity: "Haryana, Gurgaon",
    locationType: "Residential",
    numChargers: 4,
    emspChargers: "Jio BP",
    accessType: "Private",
    openingHours: "6 AM - 11 PM",
    visibilityStatus: "Hidden",
    url: "/charger/station/STN-002",
  },
  {
    name: "Noida Sector 62 EV Hub",
    stationId: "STN-003",
    source: "Partner",
    locations: "Sector 62, Noida",
    stateCity: "UP, Noida",
    locationType: "Commercial",
    numChargers: 8,
    emspChargers: "ChargeZone",
    accessType: "Public",
    openingHours: "24/7",
    visibilityStatus: "Visible",
    url: "/charger/station/STN-003",
  },
];

export const useGellAllChargerStation = () => {
  const [allStations, setAllStations] = useState<StationType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStation = useCallback(async () => {
    try {
      setLoading(true);

      const url = process.env.NEXT_PUBLIC_BE_URL;

      if (!url) throw new Error("No BE URL found");

      const res = await fetch(url);

      if (!res.ok) throw new Error("API returned non-200");

      const data = await res.json();

      if (!Array.isArray(data)) throw new Error("Invalid JSON");

      setAllStations(data);
    } catch (e) {
      console.warn("⚠️ API failed — returning dummy data", e);
      setAllStations(DUMMY_STATIONS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStation();
  }, [fetchStation]);

  return { allStations, loading };
};
