"use client";

import React, { useState, useMemo } from "react";
import Card from "@/app/components/Card";
import { MoveLeftIcon } from "lucide-react";
import FormInput from "@/app/components/FormInput";
import MultipleSelectCheckmarks from "@/app/components/Checkmark";
import Link from "next/link";
import { useRouter } from "next/router";
import { Station, useDataStore } from "@/store/useDataStore";

// --- Selected Indian States Data ---
const statesData = [
  {
    state: "Andhra Pradesh",
    cities: ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool"],
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
    cities: ["Faridabad", "Gurugram", "Panipat", "Ambala", "Hisar"],
  },
  {
    state: "Himachal Pradesh",
    cities: ["Shimla", "Mandi", "Dharamsala", "Solan"],
  },
  {
    state: "Jharkhand",
    cities: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro Steel City"],
  },
  {
    state: "Karnataka",
    cities: ["Bengaluru", "Mysuru", "Hubballi", "Mangaluru", "Belagavi"],
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
    cities: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
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
    cities: ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Meerut"],
  },
  {
    state: "Uttarakhand",
    cities: ["Dehradun", "Haridwar", "Roorkee", "Rishikesh"],
  },
  {
    state: "West Bengal",
    cities: ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri"],
  },
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
    cities: ["New Delhi", "Noida", "Gurugram"],
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

const internetOptions = [
  { value: "wifi", label: "Wi-Fi" },
  { value: "Sim", label: "Sim" },
  { value: "LAN", label: "LAN" },
];

// --- INTERFACE FOR FORM DATA ---
export interface StationFormData {
  // Location & Address
  country: string;
  street: string;
  area: string;
  stationId: string;
  landmark: string;
  zone: string;
  state: string;
  pincode: string;
  city: string;

  // Access & Operational
  accessType: string;
  alternateAccessType: string;
  amenities: string;
  visibilityStatus: string;
  cctvAvailability: string;
  connectionType: string;
  openingHours: string;

  // SPOC Details
  spocName: string;
  spocNumber: string;

  // Guard Details
  guardName: string;
  guardNumber: string;

  // Parking & Internet
  parkingFee: string;
  parkingFeeAmount: string;
  internetConnectionType: string;
}

// --- PROPS INTERFACE ---
interface DynamicStationFormProps {
  showBackButton?: boolean;
  backButtonHref?: string;
  showSubmitButtons?: boolean;
  onSubmit?: (data: StationFormData) => void;
  onClear?: () => void;
  initialData?: Partial<StationFormData>;
  cardClassName?: string;
  containerClassName?: string;
  title?: string | null;
}

export const DynamicStationForm: React.FC<DynamicStationFormProps> = ({
  showBackButton = true,
  backButtonHref = "/charger/station",
  showSubmitButtons = true,
  onSubmit,
  onClear,
  initialData = {},
  cardClassName = "p-8 bg-gray-200",
  containerClassName = "w-full p-16 lg:px-66 min-h-screen",
  title = null,
}) => {
  // --- STATE MANAGEMENT ---
  const [selectedState, setSelectedState] = useState(initialData.state || "");
  const [selectedCity, setSelectedCity] = useState(initialData.city || "");
  const [formData, setFormData] =
    useState<Partial<StationFormData>>(initialData);

  // Convert states data for FormInput consumption
  const stateOptions = statesData.map((s) => ({
    value: s.state,
    label: s.state,
  }));

  // Memoize city options based on selected state
  const cityOptions = useMemo(() => {
    if (!selectedState) return [];
    const stateObj = statesData.find((s) => s.state === selectedState);
    return stateObj
      ? stateObj.cities.map((city) => ({ value: city, label: city }))
      : [];
  }, [selectedState]);

  // Handler for state change
  const handleStateChange = (value: string) => {
    setSelectedState(value);
    setSelectedCity(""); // Reset city when state changes
    setFormData((prev) => ({ ...prev, state: value, city: "" }));
  };

  const handleCityChange = (value: string) => {
    setSelectedCity(value);
    setFormData((prev) => ({ ...prev, city: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit(formData as StationFormData);
    } else {
      console.log("Station Form Data Submitted:", formData);
    }
  };

  const handleClearForm = () => {
    setSelectedState("");
    setSelectedCity("");
    setFormData({});

    if (onClear) {
      onClear();
    }
  };

  return (
    <div className={containerClassName}>
      {showBackButton && (
        <Link href={backButtonHref}>
          <MoveLeftIcon className="mb-4 hover:text-gray-500" />
        </Link>
      )}

      <Card title={title} className={cardClassName}>
        <div>
          <div className="space-y-8">
            {/* --- 1. CHARGER LOCATION DETAILS --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <h2 className="text-gray-700 font-bold text-lg md:col-span-2 pb-4">
                Location & Address
              </h2>
              <FormInput
                label="Country"
                placeholder="Country Name"
                required={true}
                options={[{ value: "India", label: "India" }]}
                value={formData.country}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, country: e.target.value }))
                }
              />
              <FormInput
                label="Street"
                placeholder="Street Name"
                required={true}
                value={formData.street}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, street: e.target.value }))
                }
              />
              <FormInput
                label="Area"
                placeholder="Area Name"
                required={true}
                value={formData.area}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, area: e.target.value }))
                }
              />
              <FormInput
                label="Station/Site ID"
                placeholder="Station Name"
                required={true}
                value={formData.stationId}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    stationId: e.target.value,
                  }))
                }
              />
              <FormInput
                label="Landmark"
                placeholder="Enter Landmark"
                required={false}
                value={formData.landmark}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, landmark: e.target.value }))
                }
              />
              <FormInput
                options={[
                  { value: "North", label: "North" },
                  { value: "East", label: "East" },
                  { value: "West", label: "West" },
                  { value: "South", label: "South" },
                ]}
                label="Zone"
                placeholder="Enter Zone"
                required={true}
                value={formData.zone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, zone: e.target.value }))
                }
              />
              <FormInput
                label="State"
                placeholder="Select State"
                required={true}
                options={stateOptions}
                value={selectedState}
                onChange={(e) => handleStateChange(e.target.value)}
              />
              <FormInput
                label="Pincode"
                placeholder="Enter Pincode"
                required={true}
                type="number"
                value={formData.pincode}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, pincode: e.target.value }))
                }
              />
              <FormInput
                label="City"
                placeholder={
                  selectedState ? "Select City" : "Select State First"
                }
                required={true}
                options={cityOptions}
                value={selectedCity}
                onChange={(e) => handleCityChange(e.target.value)}
              />
              <div className="md:col-span-1"></div>
            </div>

            {/* --- 2. CHARGER ACCESS & VISIBILITY --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pt-8">
              <h2 className="text-gray-700 font-bold text-lg md:col-span-2 pb-2">
                Access & Operational
              </h2>

              <FormInput
                label="Access Type"
                placeholder="Enter"
                required={true}
                options={[
                  { value: "Captive", label: "Captive" },
                  { value: "Label", label: "Label" },
                ]}
                value={formData.accessType}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    accessType: e.target.value,
                  }))
                }
              />
              <FormInput
                label="Alternate Access Type"
                placeholder="Enter Type"
                required={false}
                options={[
                  { value: "Captive", label: "Captive" },
                  { value: "Label", label: "Label" },
                  { value: "Semi Captive", label: "Semi Captive" },
                ]}
                value={formData.alternateAccessType}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    alternateAccessType: e.target.value,
                  }))
                }
              />

              <MultipleSelectCheckmarks
                label="Amenities"
                data={[
                  "RestRoom",
                  "Cafe",
                  "Store",
                  "Car Care",
                  "Lodging",
                  "Wifi",
                ]}
              />
              <FormInput
                label="Station Visibility Status"
                placeholder="Enter"
                required={true}
                radioName="visibility_status"
                value={formData.visibilityStatus}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    visibilityStatus: e.target.value,
                  }))
                }
              />

              <FormInput
                label="CCTV Availability"
                placeholder="Enter"
                required={false}
                options={[
                  { label: "Yes", value: "Yes" },
                  { label: "No", value: "No" },
                ]}
                value={formData.cctvAvailability}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    cctvAvailability: e.target.value,
                  }))
                }
              />
              <FormInput
                label="Connection Type"
                placeholder="Enter"
                required={true}
                options={[
                  { label: "EV connection", value: "EV connection" },
                  {
                    label: "Commercial Connection",
                    value: "Commercial Connection",
                  },
                ]}
                value={formData.connectionType}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    connectionType: e.target.value,
                  }))
                }
              />

              <div className="flex flex-col gap-1 md:col-span-1">
                <label className="text-black text-sm font-medium">
                  Opening Hours <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4 items-center">
                  <label className="flex items-center gap-2 text-gray-700">
                    <input
                      type="radio"
                      name="opening_hours"
                      value="custom"
                      className="form-radio text-red-600 h-4 w-4 bg-gray-700 border-gray-600"
                      checked={formData.openingHours === "custom"}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          openingHours: e.target.value,
                        }))
                      }
                    />
                    Custom
                  </label>
                  <label className="flex items-center gap-2 text-gray-700">
                    <input
                      type="radio"
                      name="opening_hours"
                      value="24hours"
                      className="form-radio text-red-600 h-4 w-4 bg-gray-700 border-gray-600"
                      checked={
                        formData.openingHours === "24hours" ||
                        !formData.openingHours
                      }
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          openingHours: e.target.value,
                        }))
                      }
                    />
                    24 Hours
                  </label>
                </div>
              </div>
            </div>

            {/* --- 3. SPOC DETAILS --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pt-8">
              <h2 className="text-gray-700 font-bold text-lg md:col-span-2 pb-2">
                SPOC Details
              </h2>

              <FormInput
                label="SPOC Name"
                placeholder="Enter"
                required={true}
                value={formData.spocName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, spocName: e.target.value }))
                }
              />
              <FormInput
                label="SPOC Number"
                placeholder="Enter"
                required={true}
                type="tel"
                value={formData.spocNumber}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    spocNumber: e.target.value,
                  }))
                }
              />
            </div>

            {/* --- 4. GUARD DETAILS --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pt-8">
              <h2 className="text-gray-700 font-bold text-lg md:col-span-2 pb-2">
                Guard Details
              </h2>

              <FormInput
                label="Guard Name"
                placeholder="Enter"
                required={false}
                value={formData.guardName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    guardName: e.target.value,
                  }))
                }
              />
              <FormInput
                label="Guard Number"
                placeholder="Enter"
                required={false}
                type="tel"
                value={formData.guardNumber}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    guardNumber: e.target.value,
                  }))
                }
              />
            </div>

            {/* --- 5. PARKING & INTERNET DETAILS --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pt-8">
              <h2 className="text-gray-700 font-bold text-lg md:col-span-2 pb-2">
                Parking & Internet
              </h2>

              <FormInput
                label="Parking Fee"
                placeholder="Enter"
                required={false}
                options={[
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ]}
                value={formData.parkingFee}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    parkingFee: e.target.value,
                  }))
                }
              />
              <FormInput
                label="Parking Fee Amount"
                placeholder="Enter"
                required={false}
                type="number"
                value={formData.parkingFeeAmount}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    parkingFeeAmount: e.target.value,
                  }))
                }
              />

              <FormInput
                label="Internet Connection Type"
                placeholder="Select"
                required={true}
                options={internetOptions}
                value={formData.internetConnectionType}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    internetConnectionType: e.target.value,
                  }))
                }
              />
            </div>

            {/* --- SUBMIT BUTTONS --- */}
            {showSubmitButtons && (
              <div className="pt-8 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleClearForm}
                  className="px-8 py-3 rounded-xl text-white font-semibold bg-gray-700 hover:bg-gray-600 transition-colors"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl text-white font-semibold bg-red-700 hover:bg-red-600 transition-colors"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

// Legacy export for backward compatibility
export function AddStationForm() {
  const router = useRouter();
  const createStation = useDataStore((s) => s.createStation);

  const onSubmit = async (data: StationFormData) => {
    // map partial form to Station model expected
    try {
      const payload: Station = {
        id: "",
        companyId: data["companyId"] ?? "", // if your form collects companyId (ensure)
        stationName: data.stationId ?? "",
        address: `${data.street ?? ""} ${data.area ?? ""}`,
        state: data.state,
        city: data.city,
        pincode: data.pincode,
        accessType: data.accessType,
        openingHours: data.openingHours,
        stationVisibility: "Enable",
        locationAxis: "",
        // convert amenities array to a comma-separated string to match Station.amenities type
        amenities: data.amenities,
      };
      await createStation(payload);
      router.push("/charger/station");
    } catch (err) {
      console.error(err);
      alert("Failed to create station");
    }
  };

  return <DynamicStationForm onSubmit={onSubmit} />;
}

export default DynamicStationForm;
