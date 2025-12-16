"use client";

import React, { useState } from "react";
import Card from "@/app/components/Card";
import FormInput from "@/app/components/FormInput";

import { UserIcon, XMarkIcon } from "@heroicons/react/24/solid";
import {
  CompanyType,
  Company,
  timezoneOptions,
  currencyOptions,
} from "@/lib/types";
import { useDataStore } from "@/store/useDataStore";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Props {
  onNext: () => void;
  onSkip: () => void;
}

export default function Step1CompanyForm({ onNext, onSkip }: Props) {
  const createCompany = useDataStore((s) => s.createCompany);

  const [category, setCategory] = useState<CompanyType>("Host");
  const [form, setForm] = useState<Partial<Company>>({ type: "Host" });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const verify = ({ form }: { form: Partial<Company> }) => {
    if (!form.clientName) return "Client Name required !";
    if (!form.currency) return "Currency required !";
    if (!form.name) return "Company Name required !";
    if (!form.pincode) return "Pincode required !";
    if (!form.timezone) return "Time zone required !";

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const verified = verify({ form: form });
    if (verified == true) {
      await createCompany({ ...(form as Company), type: category });
      console.log("Company created : ", form);
      onNext();
    }
    alert(`${verified}`);
  };

  return (
    <Card className="p-8 bg-gray-900  ">
      <form onSubmit={handleSubmit} className="space-y-8 ">
        <div className="flex justify-around">
          <h2 className="text-xl font-bold text-gray-700">Company Details</h2>
          <XMarkIcon
            className="w-7 h-7 hover:text-red-500 hover:animate-ping"
            onClick={() => {
              redirect("/company/clients");
            }}
          />
        </div>
        <div className="mx-100 space-y-8 ">
          {/* Category Buttons */}
          <div className="flex gap-3 mb-4">
            {["Host", "CPO", "EMSP", "Investor"].map((type) => (
              <button
                type="button"
                key={type}
                onClick={() => setCategory(type as CompanyType)}
                className={`px-4 py-2 rounded-xl flex items-center gap-2 ${
                  category === type
                    ? "bg-red-600 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                <UserIcon className="w-5 h-5" /> {type}
              </button>
            ))}
          </div>

          {/* Company Info Fields */}
          <FormInput
            label="ID "
            value={form.id ?? ""}
            onChange={(e) => update("id", e.target.value)}
          />
          <FormInput
            label="Client Name"
            value={form.clientName ?? ""}
            onChange={(e) => update("clientName", e.target.value)}
          />

          <FormInput
            label="Company Name"
            value={form.name ?? ""}
            onChange={(e) => update("name", e.target.value)}
          />

          <FormInput
            label="Tax ID"
            value={form.taxId ?? ""}
            onChange={(e) => update("taxId", e.target.value)}
          />

          <FormInput
            label="Timezone"
            placeholder="Select Timezone"
            options={timezoneOptions}
            value={form.timezone ?? ""}
            onChange={(e) => update("timezone", e.target.value)}
          />

          <FormInput
            label="Currency"
            placeholder="Select Currency"
            options={currencyOptions}
            value={form.currency ?? ""}
            onChange={(e) => update("currency", e.target.value)}
          />

          <FormInput
            label="Pincode"
            value={form.pincode ?? ""}
            onChange={(e) => update("pincode", e.target.value)}
          />

          <div className="flex justify-between items-center">
            <Link
              href="#"
              onClick={onSkip}
              className="text-sm hover:underline text-gray-700"
            >
              I will do later
            </Link>

            <button className="px-8 py-3 bg-red-700 text-white rounded-xl">
              Continue →
            </button>
          </div>
        </div>
      </form>
    </Card>
  );
}
