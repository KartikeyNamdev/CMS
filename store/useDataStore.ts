import { create } from "zustand";

// --- Type Definitions (Mapping the architecture) ---
type CompanyType = "Host" | "CPO" | "EMSP" | "Investor";

interface Company {
  id: string;
  name: string;
  type: CompanyType;
  taxId?: string;
  pincode: string;
}

interface Station {
  id: string;
  companyId: string; // Foreign Key to Company
  name: string;
  address: string;
}

interface Charger {
  id: string;
  stationId: string; // Foreign Key to Station
  ocppId: string;
  operationalStatus: string;
}

// --- Store State & Actions ---
interface DataStore {
  // Core Data Lists
  companies: Company[];
  stations: Station[];
  chargers: Charger[];
  isLoading: boolean;

  // Selected entities (for global context during navigation)
  selectedCompany: Company | null;
  selectedStation: Station | null;
  selectedCharger: Charger | null;

  // Actions
  fetchCompanies: () => Promise<void>;
  fetchStationsByCompany: (companyId: string) => Promise<void>;
  setSelectedStation: (station: Station | null) => void;
  setSelectedCharger: (charger: Charger | null) => void;
}

// --- Mock Utility Functions (Replace with actual Firestore queries later) ---
const mockFetchCompanies = async (): Promise<Company[]> => {
  // Simulate Firestore fetch with a 500ms delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [
    {
      id: "host-1",
      name: "Aryan Hotel Group",
      type: "Host",
      taxId: "12345",
      pincode: "",
    },
    {
      id: "cpo-2",
      name: "PLUGUP CPO",
      type: "CPO",
      taxId: "67890",
      pincode: "",
    },
  ];
};

const mockFetchStations = async (companyId: string): Promise<Station[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  if (companyId === "host-1") {
    return [
      {
        id: "station-a",
        companyId: "host-1",
        name: "Aryan Hotel Station",
        address: "Jaipur Road",
      },
      {
        id: "station-b",
        companyId: "host-1",
        name: "Avani Resorts Station",
        address: "Kangra Valley",
      },
    ];
  }
  return [];
};

// --- Create the Zustand Store ---
export const useDataStore = create<DataStore>((set, get) => ({
  // Initial State

  companies: [],
  stations: [],
  chargers: [],
  isLoading: false,
  selectedCompany: null,
  selectedStation: null,
  selectedCharger: null,

  // --- Actions ---

  fetchCompanies: async () => {
    set({ isLoading: true });
    try {
      // NOTE: In a production app, you would use 'getDocs' and 'useAppContext' (which contains the firestore instance) here.
      const companies = await mockFetchCompanies();
      set({ companies: companies });
    } catch (error) {
      console.error("Error fetching companies:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchStationsByCompany: async (companyId: string) => {
    set({ isLoading: true });
    try {
      const stations = await mockFetchStations(companyId);
      set({ stations: stations });
    } catch (error) {
      console.error("Error fetching stations:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  setSelectedStation: (station) => {
    set({ selectedStation: station });
  },

  setSelectedCharger: (charger) => {
    set({ selectedCharger: charger });
  },
}));
