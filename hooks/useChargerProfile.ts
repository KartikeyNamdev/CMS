"use client";

import { useEffect, useState } from "react";

export interface IConnector {
  id: number;
  powerRating: number;
  unitsConsumed: number;
  info: string;
  errorCode: string;
  lastRecordedStatus: string;
}

export interface IChargerProfile {
  stationName: string;
  stationId: string;
  address: string;
  ocppId: string;
  oem: string;
  dateOfCommissioning: string;
  accessType: string;
  chargerOperationalStatus: string;
  chargerConnectivityStatus: string;
  stationVisibilityStatus: string;
  firmware: string;
  locationAxis: string;
  zone: string;
  connectors: IConnector[];
}

/* ------------------------------------------
   DUMMY DATA (Returned when API fails)
------------------------------------------- */
const DUMMY_PROFILE: IChargerProfile = {
  stationName: "Aryan Hotel",
  stationId: "Dabas004",
  address: "Sikar Road, Near T Point Khatu Mod, Sikar, Rajasthan, 332404",
  ocppId: "Dabas004",
  oem: "Unknown",
  dateOfCommissioning: "2023-01-15",
  accessType: "Public",
  chargerOperationalStatus: "Commissioned - Active",
  chargerConnectivityStatus: "Connected",
  stationVisibilityStatus: "Enabled",
  firmware: "4.0.3-3.0.5",
  locationAxis: "27.359102N, 75.589821E",
  zone: "North-West",
  connectors: [
    {
      id: 1,
      powerRating: 60.0,
      unitsConsumed: 6172.3,
      info: "Error",
      errorCode: "OtherError",
      lastRecordedStatus: "Charging",
    },
    {
      id: 2,
      powerRating: 60.0,
      unitsConsumed: 5628.34,
      info: "No Error",
      errorCode: "OtherError",
      lastRecordedStatus: "Available",
    },
    {
      id: 3,
      powerRating: 0.0,
      unitsConsumed: 11800.65,
      info: "No Error",
      errorCode: "NoError",
      lastRecordedStatus: "Available",
    },
  ],
};

/* ------------------------------------------
   HOOK: Returns Profile Data
------------------------------------------- */
export const useChargerProfile = (profileId: string) => {
  const [profile, setProfile] = useState<IChargerProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);

        // 🔥 Replace this with real API later
        const url = process.env.NEXT_PUBLIC_PROFILE_API;

        if (!url) throw new Error("API not defined");

        const res = await fetch(`${url}/${profileId}`);

        if (!res.ok) throw new Error("API error");

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.warn("⚠️ API failed — using dummy profile data");
        setProfile(DUMMY_PROFILE);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [profileId]);

  return { profile, loading };
};
