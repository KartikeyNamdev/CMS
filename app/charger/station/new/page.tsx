"use client";

import React from "react";
// Use the Card component for styling
import Card from "@/app/components/Card";
import FormInput from "@/app/components/FormInput";

const internetOptions = [
  { value: "wifi", label: "Wi-Fi" },
  { value: "ethernet", label: "Ethernet" },
  { value: "cellular", label: "Cellular" },
];

export const AddChargerForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Charger Details Submitted!");
  };

  return (
    <div className="w-full p-6 lg:px-66 min-h-screen">
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
            <FormInput label="Zone" placeholder="Enter Zone" required={true} />
            <FormInput
              label="State"
              placeholder="Enter State"
              required={true}
            />
            <FormInput
              label="Pincode"
              placeholder="Enter Pincode"
              required={true}
              type="number"
            />
            <FormInput label="City" placeholder="City Name" required={true} />
            <div className="md:col-span-1"></div>{" "}
            {/* Placeholder for alignment */}
          </div>

          {/* --- 2. CHARGER ACCESS & VISIBILITY --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pt-8 border-t border-gray-800">
            <h2 className="text-white font-bold text-lg md:col-span-2 border-b border-gray-700 pb-2">
              Access & Operational
            </h2>

            <FormInput
              label="Access Type"
              placeholder="Enter"
              required={true}
            />
            <FormInput
              label="Alternate Access Type"
              placeholder="Enter Type"
              required={false}
            />

            <FormInput label="Amenities" placeholder="Enter" required={false} />
            <FormInput
              label="Station Visibility Status"
              required={true}
              radioName="visibility_status"
            />

            <FormInput
              label="CCTV Availability"
              placeholder="Enter"
              required={false}
            />
            <FormInput
              label="Connection Type"
              placeholder="Enter"
              required={true}
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
            <FormInput
              label="SPOC Number"
              placeholder="Enter"
              required={true}
              type="tel"
            />
          </div>

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
