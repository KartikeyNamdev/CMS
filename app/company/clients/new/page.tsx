"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/app/components/Card";
import FormInput from "@/app/components/FormInput";
import { Save } from "lucide-react";
import { CompanyType, useDataStore } from "@/store/useDataStore";

export default function CompanyNewPage() {
  const router = useRouter();
  const createCompany = useDataStore((s) => s.createCompany);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    type: "Host" as CompanyType,
    taxId: "",
    timezone: "IST",
    currency: "INR",
    pincode: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (k: string, v: string) =>
    setFormData((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Basic validation
      if (!formData.id || !formData.name) {
        alert("id and name required");
        setLoading(false);
        return;
      }
      await createCompany(formData);
      router.push("/company");
    } catch (err) {
      console.error(err);
      alert("Failed to create");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <Card title="Create Company">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Company ID"
            value={formData.id}
            onChange={(e) => handleChange("id", e.target.value)}
            required
          />
          <FormInput
            label="Name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />
          <FormInput
            label="Type"
            options={[
              { value: "Host", label: "Host" },
              { value: "CPO", label: "CPO" },
            ]}
            value={formData.type}
            onChange={(e) => handleChange("type", e.target.value)}
          />
          <FormInput
            label="Tax ID"
            value={formData.taxId}
            onChange={(e) => handleChange("taxId", e.target.value)}
          />
          <FormInput
            label="Timezone"
            value={formData.timezone}
            onChange={(e) => handleChange("timezone", e.target.value)}
          />
          <FormInput
            label="Currency"
            value={formData.currency}
            onChange={(e) => handleChange("currency", e.target.value)}
          />
          <FormInput
            label="Pincode"
            value={formData.pincode}
            onChange={(e) => handleChange("pincode", e.target.value)}
          />
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push("/company")}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded"
              disabled={loading}
            >
              {loading ? (
                "Creating…"
              ) : (
                <>
                  <Save size={16} /> Create
                </>
              )}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
