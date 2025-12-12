"use client";
import React from "react";
import { create } from "zustand";

/* ----------------------------
   Types
---------------------------- */
export type CompanyType = "Host" | "CPO" | "EMSP" | "Investor";

export interface Company {
  id: string;
  name: string;
  type: CompanyType;
  taxId?: string;
  timezone: string;
  currency: string;
  pincode: string;
}

export interface Station {
  id: string;
  companyId: string;
  stationName: string;
  address: string;
  locationAxis?: string;
  state?: string;
  city?: string;
  pincode?: string;
  accessType?: "Public" | "Private" | string;
  openingHours?: string;
  stationVisibility?: "Enable" | "Disable" | string;
  amenities?: string;
}

export interface Charger {
  id: string;
  stationId: string;
  ocppId: string;
  oem?: string;
  chargerType?: string;
  powerRating?: string;
  numConnectors?: number;
  operationalStatus?: string;
  firmware?: string;
  label?: string;
  typeOfConnector?: string;
}

/* ----------------------------
   Store interface
---------------------------- */
interface DataStore {
  // state
  companies: Company[];
  stations: Station[];
  chargers: Charger[];
  isLoading: boolean;
  isInitialized: boolean;

  // CRUD methods
  fetchCompanies: (force?: boolean) => Promise<void>;
  fetchStationsByCompany: (companyId: string) => Promise<void>;
  fetchChargersByStation: (stationId: string) => Promise<void>;

  createCompany: (c: Partial<Company>) => Promise<Company>;
  updateCompany: (id: string, updates: Partial<Company>) => Promise<Company>;
  deleteCompany: (id: string) => Promise<void>;

  createStation: (s: Partial<Station>) => Promise<Station>;
  updateStation: (id: string, updates: Partial<Station>) => Promise<Station>;
  deleteStation: (id: string) => Promise<void>;

  createCharger: (c: Partial<Charger>) => Promise<Charger>;
  updateCharger: (id: string, updates: Partial<Charger>) => Promise<Charger>;
  deleteCharger: (id: string) => Promise<void>;

  setCompanies: (c: Company[]) => void;
}

/* ----------------------------
   Toggle Mock or Real API
   (For now we use mock provider)
---------------------------- */
const USE_MOCK = true;

/* ----------------------------
   In-memory mock DB (module-level keeps it during session)
---------------------------- */
const mockDB = {
  companies: <Company[]>[
    {
      id: "host-1",
      name: "Aryan Hotel Group",
      type: "Host",
      taxId: "12345",
      pincode: "302020",
      currency: "INR",
      timezone: "IST",
    },
    {
      id: "cpo-2",
      name: "PLUGUP CPO",
      type: "CPO",
      taxId: "67890",
      pincode: "110001",
      currency: "INR",
      timezone: "IST",
    },
  ],
  stations: <Station[]>[
    {
      id: "station-a",
      companyId: "host-1",
      stationName: "Aryan Hotel Station",
      address: "Jaipur Road",
      locationAxis: "123.4546N, 78.9012E",
      state: "Rajasthan",
      city: "Jaipur",
      pincode: "302020",
      accessType: "Public",
      openingHours: "24Hrs",
      stationVisibility: "Enable",
      amenities: "Wifi",
    },
  ],
  chargers: <Charger[]>[
    {
      id: "charger-1",
      stationId: "station-a",
      ocppId: "OCCP-ARYAN-001",
      oem: "Exicom",
      chargerType: "DC",
      powerRating: "60kW",
      numConnectors: 2,
      operationalStatus: "Active",
      firmware: "4.0.3",
      label: "Fast Charger",
      typeOfConnector: "CCS2",
    },
  ],
};

/* ----------------------------
   Helpers (mock provider)
---------------------------- */
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

const mock = {
  async fetchCompanies() {
    await delay();
    // return shallow clone
    return JSON.parse(JSON.stringify(mockDB.companies)) as Company[];
  },
  async fetchStations(companyId?: string) {
    await delay();
    return JSON.parse(
      JSON.stringify(
        companyId
          ? mockDB.stations.filter((s) => s.companyId === companyId)
          : mockDB.stations
      )
    ) as Station[];
  },
  async fetchChargers(stationId?: string) {
    await delay();
    return JSON.parse(
      JSON.stringify(
        stationId
          ? mockDB.chargers.filter((c) => c.stationId === stationId)
          : mockDB.chargers
      )
    ) as Charger[];
  },
  async createCompany(payload: Partial<Company>) {
    await delay();
    const c: Company = {
      id: payload.id ?? `company-${Date.now()}`,
      name: payload.name ?? "Untitled",
      type: payload.type ?? "Host",
      taxId: payload.taxId,
      timezone: payload.timezone ?? "IST",
      currency: payload.currency ?? "INR",
      pincode: payload.pincode ?? "",
    };
    mockDB.companies.push(c);
    return JSON.parse(JSON.stringify(c)) as Company;
  },
  async updateCompany(id: string, updates: Partial<Company>) {
    await delay();
    mockDB.companies = mockDB.companies.map((c) =>
      c.id === id ? { ...c, ...updates } : c
    );
    const updated = mockDB.companies.find((c) => c.id === id)!;
    return JSON.parse(JSON.stringify(updated)) as Company;
  },
  async deleteCompany(id: string) {
    await delay();
    mockDB.companies = mockDB.companies.filter((c) => c.id !== id);
  },

  async createStation(payload: Partial<Station>) {
    await delay();
    const s: Station = {
      id: payload.id ?? `station-${Date.now()}`,
      companyId: payload.companyId ?? "",
      stationName: payload.stationName ?? "Untitled Station",
      address: payload.address ?? "",
      locationAxis: payload.locationAxis,
      state: payload.state,
      city: payload.city,
      pincode: payload.pincode,
      accessType: payload.accessType,
      openingHours: payload.openingHours,
      stationVisibility: payload.stationVisibility,
      amenities: payload.amenities,
    };
    mockDB.stations.push(s);
    return JSON.parse(JSON.stringify(s)) as Station;
  },
  async updateStation(id: string, updates: Partial<Station>) {
    await delay();
    mockDB.stations = mockDB.stations.map((s) =>
      s.id === id ? { ...s, ...updates } : s
    );
    return JSON.parse(
      JSON.stringify(mockDB.stations.find((s) => s.id === id)!)
    ) as Station;
  },
  async deleteStation(id: string) {
    await delay();
    mockDB.stations = mockDB.stations.filter((s) => s.id !== id);
  },

  async createCharger(payload: Partial<Charger>) {
    await delay();
    const c: Charger = {
      id: payload.id ?? `charger-${Date.now()}`,
      stationId: payload.stationId ?? "",
      ocppId: payload.ocppId ?? "",
      oem: payload.oem,
      chargerType: payload.chargerType,
      powerRating: payload.powerRating,
      numConnectors: payload.numConnectors ?? 1,
      operationalStatus: payload.operationalStatus,
      firmware: payload.firmware,
      label: payload.label,
      typeOfConnector: payload.typeOfConnector,
    };
    mockDB.chargers.push(c);
    return JSON.parse(JSON.stringify(c)) as Charger;
  },
  async updateCharger(id: string, updates: Partial<Charger>) {
    await delay();
    mockDB.chargers = mockDB.chargers.map((c) =>
      c.id === id ? { ...c, ...updates } : c
    );
    return JSON.parse(
      JSON.stringify(mockDB.chargers.find((c) => c.id === id)!)
    ) as Charger;
  },
  async deleteCharger(id: string) {
    await delay();
    mockDB.chargers = mockDB.chargers.filter((c) => c.id !== id);
  },
};

/* ----------------------------
   (Optional) real provider template
   Replace methods with fetch()/axios calls when ready
---------------------------- */
const real = {
  async fetchCompanies() {
    throw new Error("Implement real API");
  },
  async fetchStations(companyId?: string) {
    throw new Error("Implement real API");
  },
  async fetchChargers(stationId?: string) {
    throw new Error("Implement real API");
  },
  async createCompany(payload: Partial<Company>) {
    throw new Error("Implement real API");
  },
  async updateCompany(id: string, updates: Partial<Company>) {
    throw new Error("Implement real API");
  },
  // ... and so on
};

/* ----------------------------
   Provider resolves to mock or real
---------------------------- */
const provider: typeof mock = USE_MOCK ? mock : real;

/* ----------------------------
   Zustand store
---------------------------- */
export const useDataStore = create<DataStore>((set, get) => ({
  companies: [],
  stations: [],
  chargers: [],
  isLoading: false,
  isInitialized: false,

  fetchCompanies: async (force = false) => {
    const { isInitialized } = get();
    if (isInitialized && !force) return;
    set({ isLoading: true });
    try {
      const companies = await provider.fetchCompanies();
      set({ companies, isLoading: false, isInitialized: true });
    } catch (e) {
      console.error(e);
      set({ isLoading: false });
    }
  },

  fetchStationsByCompany: async (companyId: string) => {
    set({ isLoading: true });
    try {
      const stations = await provider.fetchStations(companyId);
      set({ stations, isLoading: false });
    } catch (e) {
      console.error(e);
      set({ isLoading: false });
    }
  },

  fetchChargersByStation: async (stationId: string) => {
    set({ isLoading: true });
    try {
      const chargers = await provider.fetchChargers(stationId);
      set({ chargers, isLoading: false });
    } catch (e) {
      console.error(e);
      set({ isLoading: false });
    }
  },

  createCompany: async (payload) => {
    set({ isLoading: true });
    try {
      const created = await provider.createCompany(payload);
      set((s) => ({ companies: [...s.companies, created], isLoading: false }));
      return created;
    } catch (e) {
      set({ isLoading: false });
      throw e;
    }
  },

  updateCompany: async (id, updates) => {
    set({ isLoading: true });
    try {
      const updated = await provider.updateCompany(id, updates);
      // update global state (single source of truth)
      set((s) => ({
        companies: s.companies.map((c) => (c.id === id ? updated : c)),
        isLoading: false,
      }));
      return updated;
    } catch (e) {
      set({ isLoading: false });
      throw e;
    }
  },

  deleteCompany: async (id) => {
    set({ isLoading: true });
    try {
      await provider.deleteCompany(id);
      set((s) => ({
        companies: s.companies.filter((c) => c.id !== id),
        isLoading: false,
      }));
    } catch (e) {
      set({ isLoading: false });
      throw e;
    }
  },

  createStation: async (payload) => {
    set({ isLoading: true });
    try {
      const created = await provider.createStation(payload);
      set((s) => ({ stations: [...s.stations, created], isLoading: false }));
      return created;
    } catch (e) {
      set({ isLoading: false });
      throw e;
    }
  },

  updateStation: async (id, updates) => {
    set({ isLoading: true });
    try {
      const updated = await provider.updateStation(id, updates);
      set((s) => ({
        stations: s.stations.map((st) => (st.id === id ? updated : st)),
        isLoading: false,
      }));
      return updated;
    } catch (e) {
      set({ isLoading: false });
      throw e;
    }
  },

  deleteStation: async (id) => {
    set({ isLoading: true });
    try {
      await provider.deleteStation(id);
      set((s) => ({
        stations: s.stations.filter((st) => st.id !== id),
        isLoading: false,
      }));
    } catch (e) {
      set({ isLoading: false });
      throw e;
    }
  },

  createCharger: async (payload) => {
    set({ isLoading: true });
    try {
      const created = await provider.createCharger(payload);
      set((s) => ({ chargers: [...s.chargers, created], isLoading: false }));
      return created;
    } catch (e) {
      set({ isLoading: false });
      throw e;
    }
  },

  updateCharger: async (id, updates) => {
    set({ isLoading: true });
    try {
      const updated = await provider.updateCharger(id, updates);
      set((s) => ({
        chargers: s.chargers.map((c) => (c.id === id ? updated : c)),
        isLoading: false,
      }));
      return updated;
    } catch (e) {
      set({ isLoading: false });
      throw e;
    }
  },

  deleteCharger: async (id) => {
    set({ isLoading: true });
    try {
      await provider.deleteCharger(id);
      set((s) => ({
        chargers: s.chargers.filter((c) => c.id !== id),
        isLoading: false,
      }));
    } catch (e) {
      set({ isLoading: false });
      throw e;
    }
  },

  setCompanies: (companies) => set({ companies }),
}));

/* ----------------------------
   Hook to initialize once (call in root layout)
---------------------------- */
export const useInitializeStore = () => {
  const fetch = useDataStore((s) => s.fetchCompanies);
  const initialized = useDataStore((s) => s.isInitialized);
  React.useEffect(() => {
    if (!initialized) fetch();
  }, [fetch, initialized]);
};

export default useDataStore;
