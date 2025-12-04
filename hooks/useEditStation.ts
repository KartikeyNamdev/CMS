"use client";
import { useState, useEffect } from "react";

/* ------------------------------------
   FULL STATION DETAIL DATA MODEL
------------------------------------ */

export interface StationDetail {
  // Top Basic
  name: string;
  stationId: string;
  address: string;
  latitude: string;
  longitude: string;

  // Location
  country: string;
  area: string;
  areaName: string;
  street: string;
  state: string;
  city: string;
  pincode: string;
  landmark: string;
  zone: string;

  // Access & Operational
  accessType: string;
  altAccessType: string;
  cctv: "Yes" | "No";
  openingHours: "Custom" | "24 Hours";
  visibilityStatus: "Yes" | "No";
  connectionType: string;
  amenities: string;

  // SPOC
  spocName: string;
  spocNumber: string;

  // Guard
  guardName: string;
  guardNumber: string;

  // Parking & Internet
  parkingFee: "Yes" | "No";
  parkingFeeAmount: string;
  internetType: string;
}

/* ------------------------------------
   DUMMY DATA
------------------------------------ */

const dummyStations: StationDetail[] = [
  {
    name: "CyberHub Static",
    stationId: "STN-001",
    address: "CyberHub, Gurgaon",
    latitude: "28.4711",
    longitude: "77.0726",
    country: "India",
    area: "CyberHub",
    areaName: "Cyber City",
    street: "DLF Cyber City Road",
    state: "Haryana",
    city: "Gurgaon",
    pincode: "122022",
    landmark: "Near One Horizon Center",
    zone: "North",

    accessType: "Captive",
    altAccessType: "Captive",
    cctv: "Yes",
    openingHours: "24 Hours",
    visibilityStatus: "Yes",
    connectionType: "EV Connection",
    amenities: "Washroom, Cafe, Parking",

    spocName: "Rohan Singh",
    spocNumber: "9876543210",

    guardName: "Suresh",
    guardNumber: "9200011123",

    parkingFee: "Yes",
    parkingFeeAmount: "30",
    internetType: "Wi-Fi",
  },
  {
    name: "DLF Phase 3 Ch",
    stationId: "STN-002",
    address: "DLF Phase 3, Gurgaon",
    latitude: "28.5035",
    longitude: "77.0867",
    country: "India",
    area: "DLF Phase 3",
    areaName: "U Block",
    street: "NH-48 Road",
    state: "Haryana",
    city: "Gurgaon",
    pincode: "122016",
    landmark: "Near Metro Station",
    zone: "North",

    accessType: "Private",
    altAccessType: "Private",
    cctv: "No",
    openingHours: "Custom",
    visibilityStatus: "No",
    connectionType: "EV Connection",
    amenities: "Parking",

    spocName: "Akash Kumar",
    spocNumber: "9988776655",

    guardName: "Mahesh",
    guardNumber: "9300040012",

    parkingFee: "No",
    parkingFeeAmount: "",
    internetType: "LAN",
  },
];

/* ------------------------------------
   MAIN EDIT HOOK
------------------------------------ */

export const useEditStationDetails = (stationId: string) => {
  const [station, setStation] = useState<StationDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // fetch later → now dummy load
    const found = dummyStations.find((s) => s.stationId === stationId);
    setTimeout(() => {
      setStation(found ?? dummyStations[0]); // fallback always returns first
      setLoading(false);
    }, 500);
  }, [stationId]);

  const updateField = (field: keyof StationDetail, value: string) => {
    setStation((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  return { station, loading, updateField };
};
