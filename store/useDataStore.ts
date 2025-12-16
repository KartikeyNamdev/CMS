"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Company, Station, Charger } from "../lib/types";

/* --------------------------------------------
   INITIAL DUMMY DATA
---------------------------------------------*/

const initialCompanies: Company[] = [
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

const initialStations: Station[] = [
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

const initialChargers: Charger[] = [
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

/* --------------------------------------------
   STORE INTERFACE
---------------------------------------------*/
interface DataStore {
  companies: Company[];
  stations: Station[];
  chargers: Charger[];
  isLoading: boolean;

  selectedCompany: Company | null;
  selectedStation: Station | null;
  selectedCharger: Charger | null;

  // Getters
  getCompanies: () => Company[];
  getStationsByCompany: (companyId: string) => Station[];
  getChargersByStation: (stationId: string) => Charger[];

  // Company CRUD
  createCompany: (company: Company) => void;
  updateCompany: (id: string, updates: Partial<Company>) => void;
  deleteCompany: (id: string) => void;

  // Station CRUD
  createStation: (station: Station) => void;
  updateStation: (id: string, updates: Partial<Station>) => void;
  deleteStation: (id: string) => void;

  // Charger CRUD
  createCharger: (charger: Charger) => void;
  updateCharger: (id: string, updates: Partial<Charger>) => void;
  deleteCharger: (id: string) => void;

  // Selectors
  setSelectedCompany: (company: Company | null) => void;
  setSelectedStation: (station: Station | null) => void;
  setSelectedCharger: (charger: Charger | null) => void;

  // Reset
  resetStore: () => void;
}

/* --------------------------------------------
   ZUSTAND STORE (PERSISTENT)
---------------------------------------------*/

export const useDataStore = create<DataStore>()(
  persist(
    (set, get) => ({
      companies: initialCompanies,
      stations: initialStations,
      chargers: initialChargers,
      isLoading: false,

      selectedCompany: null,
      selectedStation: null,
      selectedCharger: null,

      /* GETTERS ---------------------------------- */
      getCompanies: () => {
        return get().companies;
      },
      getStationsByCompany: (companyId: string) => {
        return get().stations.filter((s) => s.companyId === companyId);
      },

      getChargersByStation: (stationId: string) => {
        return get().chargers.filter((c) => c.stationId === stationId);
      },

      /* COMPANY CRUD ----------------------------- */
      createCompany: (company: Company) => {
        set((state) => ({
          companies: [...state.companies, company],
        }));
        console.log("✅ Company created:", company.id);
      },

      updateCompany: (id: string, updates: Partial<Company>) => {
        set((state) => ({
          companies: state.companies.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
          selectedCompany:
            state.selectedCompany?.id === id
              ? { ...state.selectedCompany, ...updates }
              : state.selectedCompany,
        }));
        console.log("✅ Company updated:", id);
      },

      deleteCompany: (id: string) => {
        set((state) => ({
          companies: state.companies.filter((c) => c.id !== id),
          stations: state.stations.filter((s) => s.companyId !== id),
          selectedCompany:
            state.selectedCompany?.id === id ? null : state.selectedCompany,
        }));
        console.log("✅ Company deleted:", id);
      },

      /* STATION CRUD ------------------------------ */
      createStation: (station: Station) => {
        if (!station.id || !station.companyId) {
          console.error("❌ Station ID and Company ID are required");
          return;
        }

        set((state) => ({
          stations: [...state.stations, station],
        }));
        console.log("✅ Station created:", station.id);
      },

      updateStation: (id: string, updates: Partial<Station>) => {
        set((state) => ({
          stations: state.stations.map((s) =>
            s.id === id ? { ...s, ...updates } : s
          ),
          selectedStation:
            state.selectedStation?.id === id
              ? { ...state.selectedStation, ...updates }
              : state.selectedStation,
        }));
        console.log("✅ Station updated:", id);
      },

      deleteStation: (id: string) => {
        set((state) => ({
          stations: state.stations.filter((s) => s.id !== id),
          chargers: state.chargers.filter((c) => c.stationId !== id),
          selectedStation:
            state.selectedStation?.id === id ? null : state.selectedStation,
        }));
        console.log("✅ Station deleted:", id);
      },

      /* CHARGER CRUD ------------------------------ */
      createCharger: (charger: Charger) => {
        if (!charger.id || !charger.stationId) {
          console.error("❌ Charger ID and Station ID are required");
          return;
        }

        set((state) => ({
          chargers: [...state.chargers, charger],
        }));
        console.log("✅ Charger created:", charger.id);
      },

      updateCharger: (id: string, updates: Partial<Charger>) => {
        set((state) => ({
          chargers: state.chargers.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
          selectedCharger:
            state.selectedCharger?.id === id
              ? { ...state.selectedCharger, ...updates }
              : state.selectedCharger,
        }));
        console.log("✅ Charger updated:", id);
      },

      deleteCharger: (id: string) => {
        set((state) => ({
          chargers: state.chargers.filter((c) => c.id !== id),
          selectedCharger:
            state.selectedCharger?.id === id ? null : state.selectedCharger,
        }));
        console.log("✅ Charger deleted:", id);
      },

      /* SELECTORS ---------------------------------- */
      setSelectedCompany: (company) => set({ selectedCompany: company }),
      setSelectedStation: (station) => set({ selectedStation: station }),
      setSelectedCharger: (charger) => set({ selectedCharger: charger }),

      /* RESET --------------------------------------- */
      resetStore: () => {
        set({
          companies: initialCompanies,
          stations: initialStations,
          chargers: initialChargers,
          selectedCompany: null,
          selectedStation: null,
          selectedCharger: null,
        });
        console.log("🔄 Store reset to initial state");
      },
    }),

    {
      name: "dabas-data-store",
      partialize: (state) => ({
        companies: state.companies,
        stations: state.stations,
        chargers: state.chargers,
      }),
    }
  )
);

/* USAGE EXAMPLE ----------------------------------

// Get all companies
const companies = useDataStore((state) => state.companies);

// Get stations for a specific company
const getStationsByCompany = useDataStore((state) => state.getStationsByCompany);
const stations = getStationsByCompany("host-1");

// Get chargers for a specific station
const getChargersByStation = useDataStore((state) => state.getChargersByStation);
const chargers = getChargersByStation("station-a");

// Create new company
const createCompany = useDataStore((state) => state.createCompany);
createCompany({
  id: "new-company-1",
  clientName: "New Client",
  name: "New Company",
  type: "CPO",
  timezone: "IST",
  currency: "INR",
  pincode: "123456",
  country: "India",
  state: "Maharashtra",
  city: "Mumbai",
});

// Update company
const updateCompany = useDataStore((state) => state.updateCompany);
updateCompany("host-1", { name: "Updated Hotel Group" });

// Delete company (also deletes associated stations)
const deleteCompany = useDataStore((state) => state.deleteCompany);
deleteCompany("host-1");

*/
