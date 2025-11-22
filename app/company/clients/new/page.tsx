"use client";

import React, { useState } from "react";
// Assuming Card is available at this path
import Card from "@/app/components/Card";
import { XMarkIcon, UserIcon, BriefcaseIcon } from "@heroicons/react/24/solid";
import { redirect, useRouter } from "next/navigation";

// --- Helper Components (Internal) ---

interface FormInputProps {
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  placeholder,
  type = "text",
  required = true,
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-gray-200 text-sm font-medium">
      {label} {required && <span className="text-[#b22828]">*</span>}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      required={required}
      className="h-10 text-white placeholder-gray-600 border border-gray-700 p-3 rounded-lg focus:ring-[#b22828] focus:border-[#b22828] focus:outline-none transition-colors"
    />
  </div>
);

// --- Client Form Component ---

export const ClientForm: React.FC = () => {
  const router = useRouter();
  // State to track form step: 'client' (Step 1) or 'admin' (Step 2)
  const [currentStep, setCurrentStep] = useState("client");
  // State for category selection
  const [category, setCategory] = useState<"host" | "investor">("host");
  const [activeTab] = useState("details");

  // Tabs for the top progress bar/indicator
  const tabs = [
    { id: "client", name: "Client Details" },
    { id: "admin", name: "Admin Details" },
    { id: "access", name: "Access Details" },
  ];

  // Renders the Client Details tab content (Step 1)
  const renderClientDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
      {/* Category Section (Spans 2 columns) */}
      <div className="md:col-span-2">
        <label className="text-gray-200 text-sm font-medium block mb-2">
          Category <span className="text-[#b22828]">*</span>
        </label>
        <div className="flex gap-4">
          {/* Host Button */}
          <button
            type="button"
            onClick={() => setCategory("host")}
            className={`flex items-center gap-2 p-3 rounded-xl text-white text-sm font-semibold shadow-lg transition-colors ${
              category === "host"
                ? "bg-[#b22828] hover:bg-red-600"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            <UserIcon className="w-5 h-5" /> Host
          </button>
          {/* Investor Button */}
          <button
            type="button"
            onClick={() => setCategory("investor")}
            className={`flex items-center gap-2 p-3 rounded-xl text-white text-sm font-semibold shadow-lg transition-colors ${
              category === "investor"
                ? "bg-[#b22828] hover:bg-red-600"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            <BriefcaseIcon className="w-5 h-5" /> Investor
          </button>
        </div>
      </div>

      <FormInput label="Client Name" placeholder="Enter Name" />
      <FormInput label="Country" placeholder="Country" />
      <FormInput label="Timezone" placeholder="User Timezone" />
      <FormInput label="Currency" placeholder="User Currency" />
      <FormInput label="Company Name" placeholder="User Company Name" />
      <FormInput label="Tax ID" placeholder="Tax ID" />
      <FormInput label="Area" placeholder="Area" />
      <FormInput label="Pincode" placeholder="User Pincode" />
      <FormInput label="State" placeholder="Enter State" />
      <FormInput label="City" placeholder="Enter City" />
    </div>
  );

  // Renders the Admin Details content (Step 2)
  const renderAdminDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
      {/* Category Section (Spans 2 columns) - Shows selected category */}
      <div className="md:col-span-2">
        <label className="text-gray-200 text-sm font-medium block mb-2">
          Category <span className="text-[#b22828]">*</span>
        </label>
        <div className="flex gap-4">
          <span className="flex items-center gap-2 p-3 rounded-xl bg-[#b22828]/50 text-white text-sm font-semibold">
            {category === "host" ? (
              <>
                <UserIcon className="w-5 h-5" /> Host
              </>
            ) : (
              <>
                <BriefcaseIcon className="w-5 h-5" /> Investor
              </>
            )}
          </span>
        </div>
      </div>

      <FormInput label="Admin Name" placeholder="Enter Admin Name" />
      <FormInput label="Country" placeholder="Country" />
      <FormInput label="Timezone" placeholder="Admin Timezone" />
      <FormInput label="Currency" placeholder="Admin Currency" />
      <FormInput label="Company Name" placeholder="Admin Company Name" />
      <FormInput label="Tax ID" placeholder="Admin Tax ID" />
      <FormInput label="Area" placeholder="Admin Area" />
      <FormInput label="Pincode" placeholder="Admin Pincode" />
      <FormInput label="State" placeholder="Admin State" />
      <FormInput label="City" placeholder="Admin City" />
    </div>
  );

  // Function to move to the next step
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple logic to move between steps
    if (currentStep === "client") {
      // In a real app, you would validate the form data here
      setCurrentStep("admin");
    } else if (currentStep === "admin") {
      // Final submit and close the modal
      router.push("/company/clients");
      alert("Client and Admin details submitted!");
    }
  };

  return (
    // Modal Overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-70 backdrop-blur-xs p-4">
      <Card
        className="w-full max-w-3xl mx-auto min-h-[500px] max-h-[90vh] overflow-y-auto"
        title={null}
      >
        {/* NEW HEADER DESIGN */}
        <div className="border-b border-gray-700 pb-6 mb-6">
          {/* Title with Close Button */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[#b22828] text-2xl font-bold pl-70">
              Add New Client
            </h2>
            <button
              onClick={() => {
                redirect("/company/clients");
              }}
              className="p-2 rounded-full bg-gray-700 hover:bg-[#b22828] transition-colors text-white"
              type="button"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Stepper Progress Indicator */}
          <div className="flex flex-col items-center gap-4">
            {/* Circle Stepper */}
            <div className="flex items-center gap-3">
              {/* Step 1 Circle */}
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep === "client"
                    ? "bg-[#b22828] text-white"
                    : "bg-gray-600 text-white"
                } font-semibold text-lg`}
              >
                1
              </div>

              {/* Connecting Line */}
              <div className="w-20 h-0.5 bg-gray-600"></div>

              {/* Step 2 Circle */}
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep === "admin"
                    ? "bg-[#b22828] text-white"
                    : "bg-gray-600 text-white"
                } font-semibold text-lg`}
              >
                2
              </div>
            </div>

            {/* Step Labels */}
            <div className="flex items-center gap-8">
              <span
                className={`text-base font-medium ${
                  currentStep === "client" ? "text-white" : "text-gray-200"
                }`}
              >
                Client Details
              </span>
              <span
                className={`text-base font-medium ${
                  currentStep === "admin" ? "text-white" : "text-gray-200"
                }`}
              >
                Admin Details
              </span>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleNext}>
          {currentStep === "client" && renderClientDetails()}
          {currentStep === "admin" && renderAdminDetails()}

          {/* Footer Button */}
          <div className="mt-8 pt-4 border-t border-gray-700/50 flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 rounded-xl text-white font-semibold bg-[#b22828] hover:bg-red-600 transition-colors"
            >
              {currentStep === "client" ? "Next" : "Submit"}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ClientForm;
