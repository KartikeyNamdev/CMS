"use client";

import React, { useState, useMemo } from "react";
// Use the Card component for styling
import Card from "@/app/components/Card";
import FormInput, { MultipeChoosableInput } from "@/app/components/FormInput"; // Assuming FormInput supports the options prop
import { Button } from "@/components/ui/button";

// --- Selected Indian States Data ---
// This data is imported directly from the selected Canvas file structure.
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
// --- END Indian States Data ---

const internetOptions = [
  { value: "wifi", label: "Wi-Fi" },
  { value: "Sim", label: "Sim" },
  { value: "LAN", label: "LAN" },
];

export const AddChargerForm = () => {
  // --- STATE MANAGEMENT FOR CASCADING DROPDOWNS ---
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Use console.log for debugging instead of alert
    console.log("Charger Details Submitted!");
  };

  return (
    <div className="w-full p-16 lg:px-66 min-h-screen">
      <Card title={null} className="p-8 bg-black/30">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* --- 1. CHARGER LOCATION DETAILS --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <h2 className="text-white font-bold text-lg md:col-span-2 border-b border-gray-700 pb-2">
              Location & Address
            </h2>
            <FormInput
              label="Country"
              placeholder="Country Name"
              required={true}
              // defaultValue="India" // Set default value
              options={[{ value: "India", label: "India" }]} // Fixed option
            />
            <FormInput
              label="Street"
              placeholder="Street Name"
              required={true}
            />
            <FormInput label="Area" placeholder="Area Name" required={true} />
            <FormInput
              label="Station/Site ID"
              placeholder="Station Name"
              required={true}
            />
            <FormInput
              label="Landmark"
              placeholder="Enter Landmark"
              required={false}
            />
            <FormInput
              options={[
                {
                  value: "North",
                  label: "North",
                },
                {
                  value: "East",
                  label: "East",
                },
                {
                  value: "West",
                  label: "West",
                },
                {
                  value: "South",
                  label: "South",
                },
              ]}
              label="Zone"
              placeholder="Enter Zone"
              required={true}
            />
            {/* --- STATE DROPDOWN --- */}
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
            />
            {/* --- CITY DROPDOWN (CASCADES) --- */}
            <FormInput
              label="City"
              placeholder={selectedState ? "Select City" : "Select State First"}
              required={true}
              options={cityOptions}
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              // The default state (unselected) causes cityOptions to be empty [],
              // which should render an empty select input ready to be opened.
              // If the City dropdown still doesn't open after selecting a state,
              // the issue is 100% inside the FormInput component's rendering logic.
            />
            <div className="md:col-span-1"></div>{" "}
            {/* Placeholder for alignment */}
          </div>

          {/* --- 2. CHARGER ACCESS & VISIBILITY (Remaining sections untouched) --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pt-8 border-t border-gray-800">
            <h2 className="text-white font-bold text-lg md:col-span-2 border-b border-gray-700 pb-2">
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
            />

            <FormInput
              label="Amenities"
              options={[
                { label: "RestRoom", value: "RestRoom" },
                { label: "Cafe", value: "Cafe" },
                { label: "Store", value: "Store" },
                { label: "Car Care", value: "Car Care" },
                { label: "Lodging", value: "Lodging" },
                { label: "Wifi", value: "Wifi" },
              ]}
              placeholder="Enter"
              required={false}
            />
            <FormInput
              label="Station Visibility Status"
              placeholder="Enter"
              required={true}
              radioName="visibility_status"
            />

            <FormInput
              label="CCTV Availability"
              placeholder="Enter"
              required={false}
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
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
            />

            <div className="flex flex-col gap-1 md:col-span-1">
              <label className="text-gray-400 text-sm font-medium">
                Opening Hours <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4 items-center">
                <label className="flex items-center gap-2 text-white">
                  <input
                    type="radio"
                    name="opening_hours"
                    value="custom"
                    className="form-radio text-red-600 h-4 w-4 bg-gray-700 border-gray-600"
                  />
                  Custom
                </label>
                <label className="flex items-center gap-2 text-white">
                  <input
                    type="radio"
                    name="opening_hours"
                    value="24hours"
                    className="form-radio text-red-600 h-4 w-4 bg-gray-700 border-gray-600"
                    defaultChecked
                  />
                  24 Hours
                </label>
              </div>
            </div>
          </div>

          {/* --- 3. SPOC (Single Point of Contact) DETAILS --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pt-8 border-t border-gray-800">
            <h2 className="text-white font-bold text-lg md:col-span-2 border-b border-gray-700 pb-2">
              SPOC Details
            </h2>

            <FormInput label="SPOC Name" placeholder="Enter" required={true} />
            {/* <div className="flex"> */}
            <FormInput
              label="SPOC Number"
              placeholder="Enter"
              required={true}
              type="tel"
            />
            {/* <Button color="red" title={"Add Spoc Details"} /> */}
          </div>
          {/* </div> */}

          {/* --- 4. GUARD DETAILS --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pt-8 border-t border-gray-800">
            <h2 className="text-white font-bold text-lg md:col-span-2 border-b border-gray-700 pb-2">
              Guard Details
            </h2>

            <FormInput
              label="Guard Name"
              placeholder="Enter"
              required={false}
            />
            <FormInput
              label="Guard Number"
              placeholder="Enter"
              required={false}
              type="tel"
            />
          </div>

          {/* --- 5. PARKING & INTERNET DETAILS --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pt-8 border-t border-gray-800">
            <h2 className="text-white font-bold text-lg md:col-span-2 border-b border-gray-700 pb-2">
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
            />
            <FormInput
              label="Parking Fee Amount"
              placeholder="Enter"
              required={false}
              type="number"
            />

            <FormInput
              label="Internet Connection Type"
              placeholder="Select"
              required={true}
              options={internetOptions}
            />
          </div>

          {/* --- SUBMIT BUTTONS --- */}
          <div className="pt-8 flex justify-end gap-4 border-t border-gray-800">
            <button
              type="button"
              className="px-8 py-3 rounded-xl text-white font-semibold bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              Clear
            </button>
            <button
              type="submit"
              className="px-8 py-3 rounded-xl text-white font-semibold bg-red-700 hover:bg-red-600 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddChargerForm;
