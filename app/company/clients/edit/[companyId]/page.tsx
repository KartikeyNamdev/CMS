"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Card from "@/app/components/Card";
import { MoveLeftIcon, Save } from "lucide-react";
import Link from "next/link";
import { useDataStore } from "@/store/useDataStore"; // Ensure correct imports
import { Company, CompanyType } from "@/lib/types";

// --- Form Data Type based on Company Interface ---
interface CompanyFormData {
  id: string;
  name: string;
  type: CompanyType;
  taxId: string;
  timezone: string;
  currency: string;
  pincode: string;
  country: string;
  state: string;
  city: string;
}

// --- Mock Options ---
const companyTypeOptions = [
  { value: "Host", label: "Host" },
  { value: "CPO", label: "CPO" },
  { value: "EMSP", label: "EMSP" },
  { value: "Investor", label: "Investor" },
];
const timezoneOptions = [
  { value: "IST", label: "IST (Indian Standard Time)" },
  { value: "UTC", label: "UTC" },
];
const currencyOptions = [
  { value: "INR", label: "INR (₹)" },
  { value: "USD", label: "USD ($)" },
];

export default function CompanyEditPage() {
  // Zustand State and Actions
  // 🔥 FIX: Directly extracting all necessary state and actions from the hook
  const { companies, updateCompany, isLoading: storeLoading } = useDataStore();

  const router = useRouter();
  const params = useParams();
  const companyId = params?.companyId as string;

  const [formData, setFormData] = useState<Partial<CompanyFormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [errors, setErrors] = useState<
    Partial<Record<keyof CompanyFormData, string>>
  >({});

  // 1. Initial Data Loading (Fetch companies if store is empty)
  useEffect(() => {
    const initializeData = async () => {
      // Ensure companies are loaded (handles initial fetch if needed)
      if (companies.length === 0) {
        console.log("Companies are 0");
      }
      setIsInitializing(false);
    };

    initializeData();
  }, [companies.length]);

  // 2. Load and Map Company Data to Form State
  useEffect(() => {
    if (isInitializing) return;

    const company = companies.find((c) => c.id === companyId);

    if (!company) {
      if (companies.length > 0) {
        console.error(`Company ID ${companyId} not found in store.`);
        // Redirect only if the store has loaded and the company is genuinely missing
        router.push("/company/clients");
      }
      return;
    }

    // Map existing Company entity to Form Data structure
    const mappedData: CompanyFormData = {
      id: company.id,
      name: company.name,
      type: company.type,
      taxId: company.taxId ?? "",
      timezone: company.timezone,
      currency: company.currency,
      pincode: company.pincode,
      country: company.country,
      state: company.state,
      city: company.city,
    };

    setFormData(mappedData);
  }, [companyId, companies, router, isInitializing]);

  // Input Change Handler
  const handleInputChange = (
    field: keyof CompanyFormData,
    value: string | CompanyType
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [field as keyof typeof errors]: undefined,
      }));
    }
  };

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CompanyFormData, string>> = {};

    if (!formData.name?.trim()) newErrors.name = "Company name is required";
    if (!formData.type) newErrors.type = "Company type is required";
    if (!formData.taxId?.trim()) newErrors.taxId = "Tax ID is required";
    if (!formData.pincode?.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !formData.id) return;

    setIsLoading(true);
    try {
      // Prepare updates (omit ID as it's the key)
      const updates: Partial<Company> = {
        name: formData.name!,
        type: formData.type!,
        taxId: formData.taxId,
        timezone: formData.timezone,
        currency: formData.currency,
        pincode: formData.pincode,
        country: formData.country,
        state: formData.state,
        city: formData.city,
      };

      // 🔥 Call the extracted updateCompany action
      await updateCompany(formData.id, updates);

      // Navigate back after successful update
      router.push("/company/clients");
    } catch (error) {
      console.error("Error updating company:", error);
      alert("Failed to update company. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while fetching initial data
  if (isInitializing || storeLoading || !companyId || companies.length === 0) {
    return (
      <div className="w-full p-8 lg:px-16 min-h-screen bg-transparent flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b22828] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading company details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-8 lg:px-16 min-h-screen bg-transparent">
      <Link href="/company">
        <MoveLeftIcon className="mb-4 hover:text-gray-500 text-black" />
      </Link>

      <Card title={null} className="p-8 bg-gray-100/20">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Edit Company
          </h1>
          <p className="text-gray-600">Update company information</p>
        </div>

        {/* Use key on form to force re-render if company ID changes (though unlikely here) */}
        <form onSubmit={handleSubmit} key={formData.id}>
          <div className="space-y-8">
            {/* Company Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company ID
                </label>
                <input
                  type="text"
                  value={formData.id || ""}
                  disabled
                  className="w-full px-4 py-2 bg-gray-300 border border-gray-300 rounded-lg text-gray-800 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-gray-200  border border-gray-300 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">{errors.name}</span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.type || ""}
                  onChange={(e) =>
                    handleInputChange("type", e.target.value as CompanyType)
                  }
                  required
                  className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {companyTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.type && (
                  <span className="text-red-500 text-sm">{errors.type}</span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax ID / GST Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.taxId || ""}
                  onChange={(e) => handleInputChange("taxId", e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                {errors.taxId && (
                  <span className="text-red-500 text-sm">{errors.taxId}</span>
                )}
              </div>
            </div>

            {/* Regional Settings */}
            <h2 className="text-gray-700 font-bold text-lg  pb-2">
              Regional Settings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Country & Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <input
                  type="text"
                  value={formData.country || "India"}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <input
                  type="text"
                  value={formData.state || ""}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city || ""}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pincode <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.pincode || ""}
                  onChange={(e) => handleInputChange("pincode", e.target.value)}
                  maxLength={6}
                  required
                  className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                {errors.pincode && (
                  <span className="text-red-500 text-sm">{errors.pincode}</span>
                )}
              </div>

              {/* Timezone and Currency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.timezone || "IST"}
                  onChange={(e) =>
                    handleInputChange("timezone", e.target.value)
                  }
                  required
                  className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {timezoneOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.currency || "INR"}
                  onChange={(e) =>
                    handleInputChange("currency", e.target.value)
                  }
                  required
                  className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {currencyOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4  pt-8">
              <button
                type="button"
                onClick={() => router.push("/company")}
                className="px-8 py-3 rounded-xl bg-gray-200 text-gray-600 hover:bg-gray-600"
                disabled={isLoading}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 rounded-xl bg-[#b22828] text-gray-600 hover:bg-red-700 flex items-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={20} className="text-white" />
                    <p className="text-white">Update Company</p>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
