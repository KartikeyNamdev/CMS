"use client";

import React from "react";
// Use the Card component for styling
import Card from "@/app/components/Card";
import FormInput from "@/app/components/FormInput";
import { Label } from "@/components/ui/label";
import SlideBtn from "@/app/components/SlideBtn";

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
    <div className="w-full p-6 lg:px-72 min-h-screen">
      <Card title={null} className="p-8 bg-black/30">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* --- 1. CHARGER LOCATION DETAILS --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
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
            <FormInput
              label="State"
              placeholder="Enter State"
              required={true}
            />
            <FormInput label="City" placeholder="City Name" required={true} />
            <FormInput label="Area" placeholder="Area Name" required={true} />
            <FormInput
              label="Station Name"
              placeholder="Station Name"
              required={true}
            />
            <FormInput label="Zone" placeholder="Enter Zone" required={true} />
            <FormInput
              label="Landmark"
              placeholder="Enter Landmark"
              required={false}
            />
            <FormInput
              label="Pincode"
              placeholder="Enter Pincode"
              required={true}
              type="number"
            />
            <div className="md:col-span-1"></div>{" "}
            {/* Placeholder for alignment */}
          </div>

          {/* --- 2. CHARGER ACCESS & VISIBILITY --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pt-8 border-t border-gray-800">
            <FormInput label="Source" placeholder="Enter" required={true} />
            <FormInput label="OCPP ID" placeholder="OCPP" required={true} />
            <FormInput
              label="Access Type"
              placeholder="Enter"
              required={true}
            />
            <div className="flex justify-between pt-2 gap-3">
              <Label className="text-gray-200">Station Visibility status</Label>
              <SlideBtn />
            </div>
            <FormInput label="OEM" placeholder="Enter Type" required={false} />
            <FormInput
              label="Charger Type"
              placeholder="Enter"
              required={false}
            />
            <FormInput
              label="Charger Operational Status"
              placeholder="Enter"
              required={false}
            />
            <FormInput
              label="Charger Power Rating"
              placeholder="Enter"
              required={false}
            />
            <div className="flex justify-between pt-2 gap-3">
              <Label className="text-gray-200">Auto Charge</Label>
              <SlideBtn />
            </div>
            <FormInput
              label="Connector"
              placeholder="Visible"
              required={true}
            />
          </div>

          {/* Submit Button - Centered */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="px-8 py-3 rounded-xl text-white font-semibold bg-red-700 hover:bg-red-600 transition-colors w-full md:w-auto md:min-w-[200px]"
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
