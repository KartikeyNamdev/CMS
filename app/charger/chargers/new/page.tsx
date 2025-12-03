"use client";

import React, { useState } from "react";
// Use the Card component for styling
import Card from "@/app/components/Card";
import MultipeChoosableInput from "@/app/components/FormInput"; // Assuming FormInput supports the options prop
import { Label } from "@/components/ui/label";
import SlideBtn from "@/app/components/SlideBtn";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

// --- Mock Data ---
const internetOptions = [
  { value: "wifi", label: "Wi-Fi" },
  { value: "ethernet", label: "Ethernet" },
  { value: "cellular", label: "Cellular" },
];
// Note: Assuming a similar structure for other complex dropdowns (e.g., Access Type, Charger Type, etc.)

// --- Step 1: Charger Details Form Content ---
const renderStepOne = (handleNext: () => void) => (
  <>
    <h3 className="text-black text-xl font-bold mb-4  pb-2">List A Charger</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
      {/* 1. First Column */}
      <div className="space-y-6">
        <MultipeChoosableInput
          label="Fill The Form"
          placeholder="Enter Details"
          required={true}
        />
        <MultipeChoosableInput
          label="Opening Times"
          placeholder="To be chosen"
          required={true}
        />
        <MultipeChoosableInput
          label="Pincode"
          placeholder="Enter Pincode"
          required={true}
        />
        <MultipeChoosableInput
          label="Street"
          placeholder="Street Name"
          required={true}
        />
        <MultipeChoosableInput
          label="Access Type"
          placeholder="Enter Access Type"
          required={true}
        />
        <MultipeChoosableInput
          label="OCPP ID"
          placeholder="Enter OCPP ID"
          required={true}
        />
        <MultipeChoosableInput
          label="Label"
          placeholder="Enter Label"
          required={true}
        />
        <MultipeChoosableInput
          label="Power Rating"
          placeholder="Enter Power Rating"
          required={true}
        />
      </div>

      {/* 2. Second Column */}
      <div className="space-y-6">
        <MultipeChoosableInput
          label="Station Name"
          placeholder="Enter Station Name"
          required={true}
        />
        <MultipeChoosableInput
          label="Area"
          placeholder="Enter Area Name"
          required={true}
        />
        <MultipeChoosableInput
          label="State"
          placeholder="Enter State"
          required={true}
        />
        <MultipeChoosableInput
          label="Station Site / Site ID"
          placeholder="Enter Site ID"
          required={true}
        />
        <MultipeChoosableInput
          label="Alternate Access Type"
          placeholder="Enter Alternate Type"
          required={false}
        />
        <MultipeChoosableInput
          label="Number Of Connectors"
          placeholder="Enter Count"
          required={true}
        />

        {/* Toggle 1: Auto Charge */}
        <div className="flex justify-between pt-2 gap-3 items-center">
          <Label className="text-gray-700">Auto Charge</Label>
          <SlideBtn />
        </div>
        <MultipeChoosableInput
          label="Charger Power Rating"
          placeholder="Enter Rating"
          required={true}
        />
      </div>

      {/* 3. Third Row (Partial) */}
      <div className="space-y-6">
        <MultipeChoosableInput
          label="Latitude"
          placeholder="Enter Latitude"
          required={true}
        />
        <MultipeChoosableInput
          label="Longitude"
          placeholder="Enter Longitude"
          required={true}
        />
        <MultipeChoosableInput
          label="City"
          placeholder="Enter City Name"
          required={true}
        />
        <MultipeChoosableInput
          label="Zone"
          placeholder="Enter Zone"
          required={true}
        />
        <MultipeChoosableInput
          label="OEM"
          placeholder="Enter OEM"
          required={true}
        />
        <MultipeChoosableInput
          label="Charger Type"
          placeholder="Enter Charger Type"
          required={true}
        />
        <MultipeChoosableInput
          label="Type Of Connector"
          placeholder="Enter Connector Type"
          required={true}
        />
      </div>
    </div>

    {/* Navigation Button */}
    <div className="flex justify-end pt-8  mt-8">
      <button
        type="button"
        onClick={handleNext}
        className="px-8 py-3 rounded-xl text-white font-semibold bg-red-700 hover:bg-red-600 transition-colors w-full md:w-auto md:min-w-[150px]"
      >
        Next
      </button>
    </div>
  </>
);

// --- Step 2: Deal Details Form Content ---
const renderStepTwo = (
  handleBack: () => void,
  handleSubmit: (e: React.FormEvent) => void
) => (
  <>
    <h3 className="text-black text-xl font-bold mb-4  pb-2">Deal Details</h3>
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Pricing and Ownership */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <MultipeChoosableInput
          label="Fixed Cost / kWh"
          placeholder="Enter Fixed Cost"
          required={true}
        />
        <MultipeChoosableInput
          label="Electricity Connection Owned By"
          placeholder="Enter Owner Name"
          required={true}
        />
        <MultipeChoosableInput
          label="Estimated Electricity by Charge (kWh)"
          placeholder="Enter Estimate"
          required={true}
        />
        <MultipeChoosableInput
          label="Insurance Amount (Annual)"
          placeholder="Enter Amount"
          required={true}
        />
        <MultipeChoosableInput
          label="Electricity Connection Type"
          placeholder="Enter Type"
          required={true}
        />
        <MultipeChoosableInput
          label="Meter Type"
          placeholder="Enter Meter Type"
          required={true}
        />
        <MultipeChoosableInput
          label="DISCOM Account Number"
          placeholder="Enter Account Number"
          required={true}
        />
        <div className="md:col-span-1"></div>
      </div>

      {/* Financial Structure */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6 pt-8 ">
        <MultipeChoosableInput
          label="Type Of Company Mapping"
          placeholder="Enter Type"
          required={false}
        />
        <MultipeChoosableInput
          label="Cost From CPO"
          placeholder="Enter Cost"
          required={false}
        />
        <MultipeChoosableInput
          label="Fixed Fee"
          placeholder="Enter Fee"
          required={false}
        />
        <MultipeChoosableInput
          label="SAAS"
          placeholder="Enter SAAS Fee"
          required={false}
        />
        <MultipeChoosableInput
          label="Profit Share"
          placeholder="Enter Share"
          required={false}
        />
        <MultipeChoosableInput
          label="Revenue Share"
          placeholder="Enter Share"
          required={false}
        />
        <MultipeChoosableInput
          label="Deal Applicable"
          placeholder="Enter Yes/No"
          required={false}
        />
      </div>

      {/* Navigation Buttons (Back & Submit) */}
      <div className="flex justify-between pt-8 ">
        <button
          type="button"
          onClick={handleBack}
          className="px-6 py-3 rounded-xl text-white font-semibold bg-gray-700 hover:bg-gray-600 transition-colors flex items-center gap-2"
        >
          <ArrowLeftIcon className="w-5 h-5 text-white" />
          Back
        </button>
        <button
          type="submit"
          className="px-8 py-3 rounded-xl text-white font-semibold bg-red-700 hover:bg-red-600 transition-colors w-full md:w-auto md:min-w-[150px]"
        >
          Submit
        </button>
      </div>
    </form>
  </>
);

// --- Main Component ---
export const AddChargerForm = () => {
  const [currentStep, setCurrentStep] = useState(1); // 1 for Charger Details, 2 for Deal Details

  const handleNext = () => {
    // In a real app, you would validate Step 1 here
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Charger and Deal Details Submitted!");
    // Show confirmation message
  };

  return (
    <div className="w-full p-6 lg:px-72 min-h-screen">
      <h1 className="text-black text-2xl font-bold mb-6 flex items-center justify-center flex-col gap-4">
        Add New Charger
        {/* Step Indicator */}
        <div className="flex items-center ml-4 text-sm text-gray-400">
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${
              currentStep === 1 ? "bg-red-600 text-white" : "bg-gray-300"
            }`}
          >
            1
          </span>
          <span className="w-8 h-px bg-gray-700 mx-2"></span>
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${
              currentStep === 2
                ? "bg-red-600 text-white"
                : "bg-gray-400 text-white"
            }`}
          >
            2
          </span>
        </div>
      </h1>

      <Card title={null} className="p-8 bg-black/30">
        {currentStep === 1
          ? renderStepOne(handleNext)
          : renderStepTwo(handleBack, handleSubmit)}
      </Card>
    </div>
  );
};

export default AddChargerForm;
