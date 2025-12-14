"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import React from "react";

import type { Company, Station, Charger } from "../lib/types"; // ⬅ IMPORT TYPES FROM FILE 1

/* --------------------------------------------
   MOCK API (NO DELAYS)
---------------------------------------------*/

const mockFetchCompanies = async (): Promise<Company[]> => [
  {
    id: "host-1",
    clientName: "Aryan",
    name: "Aryan Hotel Group",
    type: "Host",
    taxId: "12345",
    timezone: "IST",
    currency: "INR",
    pincode: "302020",
    country: "India",
    state: "Rajasthan",
    city: "Jaipur",
  },
  {
    id: "cpo-2",
    clientName: "Plugup",
    name: "PLUGUP CPO",
    type: "CPO",
    taxId: "67890",
    timezone: "IST",
    currency: "INR",
    pincode: "110001",
    country: "India",
    state: "Delhi",
    city: "New Delhi",
  },
];

const mockFetchStations = async (companyId: string): Promise<Station[]> => {
  if (companyId === "host-1") {
    return [
      {
        id: "station-a",
        stationName: "Aryan Hotel Station",
        country: "India",
        street: "Jaipur Road",
        area: "Central Jaipur",
        landmark: "Near Civil Lines",
        zone: "North",
        state: "Rajasthan",
        city: "Jaipur",
        pincode: "302020",

        companyId: "host-1",
        accessType: "Public",
        alternateAccessType: "Captive",
        stationVisibility: "Enable",
        amenities: "Wifi,Restroom",

        cctv: "yes",
        connectionType: "EV connection",
        openingHours: "24hours",

        spocName: "Rahul Sharma",
        spocNumber: 9876543210,

        guardName: "Amit",
        guardNumber: 9988771122,

        parkingFee: 1,
        internetConnectionType: "WiFi",
      },
    ];
  }
  return [];
};

const mockFetchChargers = async (stationId: string): Promise<Charger[]> => {
  if (stationId === "station-a") {
    return [
      {
        id: "charger-1",
        stationId: "station-a",
        ocppId: "OCPP-ARYAN-001",
        oem: "Exicom",
        chargerType: "DC",
        powerRating: "60kW",
        operationalStatus: "Active",
        firmware: "4.0.3",
        label: "Fast Charger",
        discountOffer: 20,
        connector: [
          { connectorStatuses: "Available" },
          { connectorStatuses: "Unavailable" },
        ],
        numConnectors: 2,
      },
      {
        id: "charger-2",
        stationId: "station-a",
        ocppId: "OCPP-ARYAN-002",
        oem: "Servotech",
        chargerType: "AC",
        powerRating: "7.4kW",
        operationalStatus: "Available",
        firmware: "4.0.3",
        label: "Slow Charger",
        discountOffer: 0,
        connector: [{ connectorStatuses: "Available" }],
        numConnectors: 1,
      },
    ];
  }
  return [];
};

/* --------------------------------------------
   STORE INTERFACE
---------------------------------------------*/
interface DataStore {
  companies: Company[];
  stations: Station[];
  chargers: Charger[];
  isLoading: boolean;
  isInitialized: boolean;

  selectedCompany: Company | null;
  selectedStation: Station | null;
  selectedCharger: Charger | null;

  fetchCompanies: (forceRefresh?: boolean) => Promise<Company[]>;
  fetchStationsByCompany: (companyId: string) => Promise<Station[]>;
  fetchChargersByStation: (stationId: string) => Promise<Charger[]>;

  createCompany: (company: Company) => Promise<Company>;
  updateCompany: (id: string, updates: Partial<Company>) => Promise<Company>;
  deleteCompany: (id: string) => Promise<boolean>;

  createStation: (station: Station) => Promise<Station>;
  updateStation: (id: string, updates: Partial<Station>) => Promise<Station>;
  deleteStation: (id: string) => Promise<boolean>;

  createCharger: (charger: Charger) => Promise<Charger>;
  updateCharger: (id: string, updates: Partial<Charger>) => Promise<Charger>;
  deleteCharger: (id: string) => Promise<boolean>;

  setSelectedCompany: (company: Company | null) => void;
  setSelectedStation: (station: Station | null) => void;
  setSelectedCharger: (charger: Charger | null) => void;
}

/* --------------------------------------------
   ZUSTAND STORE (PERSISTENT)
---------------------------------------------*/

export const useDataStore = create<DataStore>()(
  persist(
    (set, get) => ({
      companies: [],
      stations: [],
      chargers: [],
      isLoading: false,
      isInitialized: false,

      selectedCompany: null,
      selectedStation: null,
      selectedCharger: null,

      /* FETCH ---------------------------------- */
      fetchCompanies: async (force = false) => {
        if (get().isInitialized && !force) {
          console.log("Companies already initialized");
          return get().companies;
        }

        set({ isLoading: true });
        const companies = await mockFetchCompanies();
        set({ companies, isInitialized: true, isLoading: false });
        console.log("Companies fetched:", companies.length);
        return companies;
      },

      fetchStationsByCompany: async (companyId) => {
        set({ isLoading: true });
        const stations = await mockFetchStations(companyId);
        set({ stations, isLoading: false });
        console.log(`Stations fetched for ${companyId}:`, stations.length);
        return stations;
      },

      fetchChargersByStation: async (stationId) => {
        set({ isLoading: true });
        const chargers = await mockFetchChargers(stationId);
        set({ chargers, isLoading: false });
        console.log(`Chargers fetched for ${stationId}:`, chargers.length);
        return chargers;
      },

      /* COMPANY CRUD ----------------------------- */
      createCompany: async (company) => {
        set((s) => ({ companies: [...s.companies, company] }));
        console.log("Company created:", company.id);
        return company;
      },

      updateCompany: async (id, updates) => {
        let updated!: Company;
        set((s) => ({
          companies: s.companies.map((c) =>
            c.id === id ? (updated = { ...c, ...updates }) : c
          ),
          selectedCompany:
            s.selectedCompany?.id === id
              ? { ...s.selectedCompany, ...updates }
              : s.selectedCompany,
        }));
        console.log("Company updated:", id);
        return updated;
      },

      deleteCompany: async (id) => {
        set((s) => ({
          companies: s.companies.filter((c) => c.id !== id),
          selectedCompany:
            s.selectedCompany?.id === id ? null : s.selectedCompany,
        }));
        console.log("Company deleted:", id);
        return true;
      },

      /* STATION CRUD ------------------------------ */
      createStation: async (station) => {
        set((s) => ({ stations: [...s.stations, station] }));
        console.log("Station created:", station.id);
        return station;
      },

      updateStation: async (id, updates) => {
        let updated!: Station;
        set((s) => ({
          stations: s.stations.map((st) =>
            st.id === id ? (updated = { ...st, ...updates }) : st
          ),
          selectedStation:
            s.selectedStation?.id === id
              ? { ...s.selectedStation, ...updates }
              : s.selectedStation,
        }));
        console.log("Station updated:", id);
        return updated;
      },

      deleteStation: async (id) => {
        set((s) => ({
          stations: s.stations.filter((st) => st.id !== id),
          selectedStation:
            s.selectedStation?.id === id ? null : s.selectedStation,
        }));
        console.log("Station deleted:", id);
        return true;
      },

      /* CHARGER CRUD ------------------------------ */
      createCharger: async (charger) => {
        set((s) => ({ chargers: [...s.chargers, charger] }));
        console.log("Charger created:", charger.id);
        return charger;
      },

      updateCharger: async (id, updates) => {
        let updated!: Charger;
        set((s) => ({
          chargers: s.chargers.map((ch) =>
            ch.id === id ? (updated = { ...ch, ...updates }) : ch
          ),
          selectedCharger:
            s.selectedCharger?.id === id
              ? { ...s.selectedCharger, ...updates }
              : s.selectedCharger,
        }));
        console.log("Charger updated:", id, updates);
        return updated;
      },

      deleteCharger: async (id) => {
        set((s) => ({
          chargers: s.chargers.filter((ch) => ch.id !== id),
          selectedCharger:
            s.selectedCharger?.id === id ? null : s.selectedCharger,
        }));
        console.log("Charger deleted:", id);
        return true;
      },

      /* SELECTORS ---------------------------------- */
      setSelectedCompany: (company) => set({ selectedCompany: company }),
      setSelectedStation: (station) => set({ selectedStation: station }),
      setSelectedCharger: (charger) => set({ selectedCharger: charger }),
    }),

    {
      name: "dabas-data-store",
      partialize: (state) => ({
        companies: state.companies,
        stations: state.stations,
        chargers: state.chargers,
        isInitialized: state.isInitialized,
      }),
    }
  )
);

/* AUTO INIT ----------------------------------*/
export const useInitializeStore = () => {
  const { fetchCompanies, isInitialized } = useDataStore();

  React.useEffect(() => {
    if (!isInitialized) {
      fetchCompanies();
    }
  }, [fetchCompanies, isInitialized]);

  return { isInitialized };
};
