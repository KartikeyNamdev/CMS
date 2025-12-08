import { create } from "zustand";

// --- Type Definitions (Mapping the architecture) ---
type CompanyType = "Host" | "CPO" | "EMSP" | "Investor";

interface Company {
  id: string;
  name: string;
  type: CompanyType;
  taxId?: string;
  timezone: string;
  currency: string;
  pincode: string;
}

interface Station {
  id: string;
  companyId: string; // Foreign Key to Company
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

interface Charger {
  id: string;
  stationId: string; // Foreign Key to Station
  ocppId: string;
  oem: string;
  chargerType: string; // AC or DC
  powerRating: string;
  numConnectors: number;
  operationalStatus: string;
  firmware: string;
  // Additional fields from Charger Details Form (Step 3)
  label: string;
  typeOfConnector: string;
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
  // The fetch action that was missing implementation
  fetchChargersByStation: (stationId: string) => Promise<void>;
}

// --- Mock Utility Functions ---
const mockFetchCompanies = async (): Promise<Company[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
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
  await new Promise((resolve) => setTimeout(resolve, 500));
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
  await new Promise((resolve) => setTimeout(resolve, 500));
  // This logic returns mock chargers only if the specific stationId is 'station-a'
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
        typeOfConnector: "CCS2",
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
        typeOfConnector: "Type 2",
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

  // 🔥 IMPLEMENTATION OF THE MISSING ACTION 🔥
  fetchChargersByStation: async (stationId: string) => {
    set({ isLoading: true });
    try {
      // 1. Call the mock data function
      const chargers = await mockFetchChargers(stationId);
      // 2. Update the global 'chargers' state list
      set({ chargers: chargers });
      // NOTE: In a real app, you would not typically return data here if you set it globally,
      // but the function signature in the type definition requires a Promise<void> (which is implicitly fulfilled)
    } catch (error) {
      console.error(`Error fetching chargers for station ${stationId}:`, error);
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
