export interface ChartDataset {
  label: string;
  data: number[];
  borderColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  barThickness?: number;
  barPercentage?: number;
  categoryPercentage?: number;
  tension?: number;
}

export interface ChartResult {
  labels: string[];
  datasets: ChartDataset[];
}
export interface ChargerLog {
  logId: string;
  ocppId: string;
  connectorName: string;
  action: string;
  requestPayload: object;
  requestTimestamp: string;
  responsePayload: object;
  responseTimestamp: string;
}
export interface ChargingSession {
  bookingId: string;
  chargerName: string;
  platform: string;
  startDate: string;
  stopDate: string;
  updatedAt: string;
  promo: string;
  price: number;
}

export interface ChargingColumn {
  headerName: string;
  field?: string;
  width?: number;
  minWidth?: number;
  cellRenderer?: unknown; // AG Grid only accepts `any` here
}
// TYPES ONLY — NO CODE LOGIC HERE

export type CompanyType = "Host" | "CPO" | "EMSP" | "Investor";

export interface Company {
  type: CompanyType;
  id: string;
  clientName: string;
  name: string;
  taxId?: string;
  timezone: string;
  currency: string;
  pincode: string;
  country?: string;
  area?: string;
  state?: string;
  city?: string;
  stations?: Station[];
}

export interface Station {
  stationName: string;
  country: string;
  street: string;
  area: string;
  id: string;
  landmark: string;
  zone: string;
  state: string;
  pincode: string;
  city: string;
  accessType: "Public" | "Private";
  alternateAccessType: "Captive" | "Label" | "Semi Captive";
  amenities: string;
  companyId: string;
  stationVisibility: "Enable" | "Disable";
  cctv: "yes" | "no";
  connectionType: "EV connection" | "Commercial Connection";
  openingHours: string;
  spocName: string;
  spocNumber: number;
  guardName: string;
  guardNumber: number;
  parkingFee: number;
  internetConnectionType: "WiFi" | "Sim" | "Lan";
  chargers?: Charger[];
}

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
export type connectorType = {
  connectorStatuses: string;
};
export const statesData = [
  {
    state: "Andhra Pradesh",
    cities: [
      "Visakhapatnam",
      "Vijayawada",
      "Guntur",
      "Nellore",
      "Kurnool",
      "Tirupati",
    ],
  },
  {
    state: "Arunachal Pradesh",
    cities: ["Itanagar", "Naharlagun"],
  },
  {
    state: "Assam",
    cities: ["Guwahati", "Jorhat", "Silchar", "Dibrugarh"],
  },
  {
    state: "Bihar",
    cities: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
  },
  {
    state: "Chhattisgarh",
    cities: ["Raipur", "Bhilai", "Bilaspur", "Korba"],
  },
  {
    state: "Goa",
    cities: ["Panaji", "Margao", "Vasco da Gama"],
  },
  {
    state: "Gujarat",
    cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
  },
  {
    state: "Haryana",
    cities: ["Gurugram", "Faridabad", "Panipat", "Hisar", "Ambala"],
  },
  {
    state: "Himachal Pradesh",
    cities: ["Shimla", "Mandi", "Dharamshala", "Solan", "Kullu"],
  },
  {
    state: "Jharkhand",
    cities: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
  },
  {
    state: "Karnataka",
    cities: ["Bengaluru", "Mysuru", "Mangalore", "Hubballi", "Belagavi"],
  },
  {
    state: "Kerala",
    cities: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam"],
  },
  {
    state: "Madhya Pradesh",
    cities: ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain"],
  },
  {
    state: "Maharashtra",
    cities: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
  },
  {
    state: "Manipur",
    cities: ["Imphal"],
  },
  {
    state: "Meghalaya",
    cities: ["Shillong"],
  },
  {
    state: "Mizoram",
    cities: ["Aizawl"],
  },
  {
    state: "Nagaland",
    cities: ["Kohima", "Dimapur"],
  },
  {
    state: "Odisha",
    cities: ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur"],
  },
  {
    state: "Punjab",
    cities: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Mohali"],
  },
  {
    state: "Rajasthan",
    cities: ["Jaipur", "Jodhpur", "Kota", "Udaipur", "Bikaner"],
  },
  {
    state: "Sikkim",
    cities: ["Gangtok"],
  },
  {
    state: "Tamil Nadu",
    cities: [
      "Chennai",
      "Coimbatore",
      "Madurai",
      "Tiruchirappalli",
      "Salem",
      "Erode",
    ],
  },
  {
    state: "Telangana",
    cities: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"],
  },
  {
    state: "Tripura",
    cities: ["Agartala"],
  },
  {
    state: "Uttar Pradesh",
    cities: [
      "Lucknow",
      "Kanpur",
      "Ghaziabad",
      "Agra",
      "Varanasi",
      "Meerut",
      "Noida",
    ],
  },
  {
    state: "Uttarakhand",
    cities: ["Dehradun", "Haridwar", "Roorkee", "Rishikesh"],
  },
  {
    state: "West Bengal",
    cities: ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri"],
  },

  // --- UNION TERRITORIES ---
  {
    state: "Andaman and Nicobar Islands",
    cities: ["Port Blair"],
  },
  {
    state: "Chandigarh",
    cities: ["Chandigarh"],
  },
  {
    state: "Dadra and Nagar Haveli and Daman and Diu",
    cities: ["Daman", "Silvassa"],
  },
  {
    state: "Delhi",
    cities: ["New Delhi", "Dwarka", "Rohini", "Saket"],
  },
  {
    state: "Jammu and Kashmir",
    cities: ["Srinagar", "Jammu"],
  },
  {
    state: "Ladakh",
    cities: ["Leh", "Kargil"],
  },
  {
    state: "Lakshadweep",
    cities: ["Kavaratti"],
  },
  {
    state: "Puducherry",
    cities: ["Puducherry", "Karaikal"],
  },
];
export const timezoneOptions = [
  { value: "IST", label: "IST — Indian Standard Time (UTC+05:30)" },
  { value: "UTC", label: "UTC — Coordinated Universal Time" },
  { value: "GMT", label: "GMT — Greenwich Mean Time" },
  { value: "CET", label: "CET — Central European Time (UTC+1)" },
  { value: "EST", label: "EST — Eastern Standard Time (UTC-5)" },
  { value: "PST", label: "PST — Pacific Standard Time (UTC-8)" },
  { value: "CST", label: "CST — Central Standard Time (UTC-6)" },
  { value: "JST", label: "JST — Japan Standard Time (UTC+9)" },
];
export const currencyOptions = [
  { value: "INR", label: "INR — Indian Rupee ₹" },
  { value: "USD", label: "USD — US Dollar $" },
  { value: "EUR", label: "EUR — Euro €" },
  { value: "GBP", label: "GBP — British Pound £" },
  { value: "AED", label: "AED — UAE Dirham" },
  { value: "CAD", label: "CAD — Canadian Dollar" },
  { value: "AUD", label: "AUD — Australian Dollar" },
  { value: "JPY", label: "JPY — Japanese Yen ¥" },
];
