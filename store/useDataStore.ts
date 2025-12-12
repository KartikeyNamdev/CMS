import React from "react";
import { create } from "zustand";

// --- Type Definitions ---
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
  locationAxis: string;
  state: string;
  city: string;
  pincode: string;
  accessType: "Public" | "Private";
  openingHours: string;
  stationVisibility: "Enable" | "Disable";
  amenities: string;
}
type connectorType = {
  connectorStatuses: string;
};
export interface Charger {
  id: string;
  stationId: string;
  ocppId: string;
  oem: string;
  chargerType: string;
  powerRating: string;
  operationalStatus: string;
  firmware: string;
  label: string;
  connector: connectorType[];
  numConnectors: number;
  discountOffer: number;
}

// --- Store Interface ---
interface DataStore {
  companies: Company[];
  stations: Station[];
  chargers: Charger[];
  isLoading: boolean;
  isInitialized: boolean; // Flag to track if data has been loaded
  selectedCompany: Company | null;
  selectedStation: Station | null;
  selectedCharger: Charger | null;

  fetchCompanies: (forceRefresh?: boolean) => Promise<void>;
  fetchStationsByCompany: (companyId: string) => Promise<void>;
  fetchChargersByStation: (stationId: string) => Promise<void>;
  createCompany: (company: Company) => Promise<void>;
  updateCompany: (
    companyId: string,
    updates: Partial<Company>
  ) => Promise<void>;
  deleteCompany: (companyId: string) => Promise<void>;
  setSelectedCompany: (company: Company | null) => void;
  setSelectedStation: (station: Station | null) => void;
  setSelectedCharger: (charger: Charger | null) => void;
}

// --- Mock API Functions ---

const mockFetchCompanies = async (): Promise<Company[]> => {
  return [
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
  ];
};

const mockFetchStations = async (companyId: string): Promise<Station[]> => {
  if (companyId === "host-1") {
    return [
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
      {
        id: "station-b",
        companyId: "host-1",
        stationName: "Avani Resorts Station",
        address: "Kangra Valley",
        locationAxis: "32.1234N, 76.5678E",
        state: "Himachal Pradesh",
        city: "Kangra",
        pincode: "176001",
        accessType: "Public",
        openingHours: "24Hrs",
        stationVisibility: "Enable",
        amenities: "Wifi",
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
        ocppId: "OCCP-ARYAN-001",
        oem: "Exicom",
        chargerType: "DC",
        powerRating: "60kW",
        numConnectors: 2,
        operationalStatus: "Active",
        firmware: "4.0.3",
        label: "Fast Charger",
        discountOffer: 20,
        connector: [
          {
            connectorStatuses: "Available",
          },
          {
            connectorStatuses: "UnAvailable",
          },
        ],
      },
      {
        id: "charger-2",
        stationId: "station-a",
        ocppId: "OCCP-ARYAN-002",
        oem: "Servotech",
        chargerType: "AC",
        powerRating: "7.4kW",
        numConnectors: 1,
        operationalStatus: "Available",
        firmware: "4.0.3",
        label: "Slow Charger",
        discountOffer: 20,
        connector: [
          {
            connectorStatuses: "UnAvailable",
          },
          {
            connectorStatuses: "Available",
          },
        ],
      },
    ];
  }
  return [];
};

const mockCreateCompany = async (company: Company): Promise<Company> => {
  console.log("API: Creating company", company);
  return company;
};

const mockUpdateCompany = async (
  companyId: string,
  updates: Partial<Company>
): Promise<Partial<Company>> => {
  console.log("API: Updating company", companyId, updates);
  return updates;
};

const mockDeleteCompany = async (companyId: string): Promise<void> => {
  console.log("API: Deleting company", companyId);
};

// --- Zustand Store ---
export const useDataStore = create<DataStore>((set, get) => ({
  // Initial State
  companies: [],
  stations: [],
  chargers: [],
  isLoading: false,
  isInitialized: false, // Track initialization
  selectedCompany: null,
  selectedStation: null,
  selectedCharger: null,

  // Fetch Methods
  fetchCompanies: async (forceRefresh: boolean = false) => {
    const { isInitialized } = get();

    // Only fetch if not already initialized OR if force refresh is requested
    if (isInitialized && !forceRefresh) {
      console.log("Companies already initialized, skipping fetch");
      return;
    }

    set({ isLoading: true });
    try {
      const companies = await mockFetchCompanies();
      set({ companies, isLoading: false, isInitialized: true });
      console.log(
        forceRefresh
          ? "Companies refreshed"
          : "Companies fetched and initialized"
      );
    } catch (error) {
      console.error("Error fetching companies:", error);
      set({ isLoading: false });
    }
  },

  fetchStationsByCompany: async (companyId: string) => {
    set({ isLoading: true });
    try {
      const stations = await mockFetchStations(companyId);
      set({ stations, isLoading: false });
    } catch (error) {
      console.error("Error fetching stations:", error);
      set({ isLoading: false });
    }
  },

  fetchChargersByStation: async (stationId: string) => {
    set({ isLoading: true });
    try {
      const chargers = await mockFetchChargers(stationId);
      set({ chargers, isLoading: false });
    } catch (error) {
      console.error(`Error fetching chargers for station ${stationId}:`, error);
      set({ isLoading: false });
    }
  },

  // Company CRUD
  createCompany: async (company: Company) => {
    set({ isLoading: true });
    try {
      const newCompany = await mockCreateCompany(company);
      set((state) => ({
        companies: [...state.companies, newCompany],
        isLoading: false,
      }));
      console.log("Company created successfully");
    } catch (error) {
      console.error("Error creating company:", error);
      set({ isLoading: false });
      throw error;
    }
  },

  updateCompany: async (companyId: string, updates: Partial<Company>) => {
    set({ isLoading: true });
    try {
      // Call the API
      await mockUpdateCompany(companyId, updates);

      // Option 1: Optimistic update (update state immediately)
      set((state) => {
        const updatedCompanies = state.companies.map((company) =>
          company.id === companyId ? { ...company, ...updates } : company
        );

        const updatedSelectedCompany =
          state.selectedCompany?.id === companyId
            ? { ...state.selectedCompany, ...updates }
            : state.selectedCompany;

        console.log("Company updated successfully (optimistic)");

        return {
          companies: updatedCompanies,
          selectedCompany: updatedSelectedCompany,
          isLoading: false,
        };
      });

      // Option 2: Refetch from server to get the latest data
      await get().fetchCompanies(true); // Force refresh

      console.log("Companies refetched after update");
    } catch (error) {
      console.error("Error updating company:", error);
      set({ isLoading: false });
      throw error;
    }
  },

  deleteCompany: async (companyId: string) => {
    set({ isLoading: true });
    try {
      await mockDeleteCompany(companyId);
      set((state) => ({
        companies: state.companies.filter(
          (company) => company.id !== companyId
        ),
        selectedCompany:
          state.selectedCompany?.id === companyId
            ? null
            : state.selectedCompany,
        isLoading: false,
      }));
      console.log("Company deleted successfully");
    } catch (error) {
      console.error("Error deleting company:", error);
      set({ isLoading: false });
      throw error;
    }
  },

  // Selection Methods
  setSelectedCompany: (company) => set({ selectedCompany: company }),
  setSelectedStation: (station) => set({ selectedStation: station }),
  setSelectedCharger: (charger) => set({ selectedCharger: charger }),
}));

// Helper hook for initializing data once in the app
export const useInitializeStore = () => {
  const { fetchCompanies, isInitialized } = useDataStore();

  React.useEffect(() => {
    if (!isInitialized) {
      fetchCompanies();
    }
  }, [fetchCompanies, isInitialized]);
};

// Usage in React components:
// In your main App or layout component (run once):
// useInitializeStore();

// In other components:
// const { companies, isLoading, updateCompany } = useDataStore();

// To manually force refresh:
// fetchCompanies(true);
