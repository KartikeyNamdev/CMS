"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Card from "@/app/components/Card";
import FormInput from "@/app/components/FormInput";
import useDataStore, { Company } from "@/store/useDataStore";
import { Save } from "lucide-react";

export default function CompanyEditPage() {
  const params = useParams();
  const companyId = params?.companyId as string;
  const router = useRouter();

  const companies = useDataStore((s) => s.companies);
  const updateCompany = useDataStore((s) => s.updateCompany);
  const [form, setForm] = useState<Partial<Company> | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const c = companies.find((x) => x.id === companyId);
    if (!c) {
      // If companies not loaded yet, don't redirect immediately (store initialization should be called globally)
      setForm(null);
      return;
    }
    setForm(c);
  }, [companyId, companies]);

  const handleChange = (k: keyof Company, v: string) =>
    setForm((p) => (p ? { ...p, [k]: v } : p));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setLoading(true);
    try {
      await updateCompany(companyId, form);
      router.push("/company");
    } catch (err) {
      console.error(err);
      alert("Failed to update");
    } finally {
      setLoading(false);
    }
  };

  if (!form) return <p className="p-8">Loading…</p>;

  return (
    <div className="p-8">
      <Card title={`Edit ${form.name}`}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput label="Company ID" value={form.id} disabled />
          <FormInput
            label="Name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />
          <FormInput
            label="Type"
            options={[
              { value: "Host", label: "Host" },
              { value: "CPO", label: "CPO" },
              { value: "EMSP", label: "EMSP" },
              { value: "Investor", label: "Investor" },
            ]}
            value={form.type as string}
            onChange={(e) => handleChange("type", e.target.value as string)}
          />
          <FormInput
            label="Tax ID"
            value={form.taxId}
            onChange={(e) => handleChange("taxId", e.target.value)}
          />
          <FormInput
            label="Timezone"
            value={form.timezone}
            onChange={(e) => handleChange("timezone", e.target.value)}
          />
          <FormInput
            label="Currency"
            value={form.currency}
            onChange={(e) => handleChange("currency", e.target.value)}
          />
          <FormInput
            label="Pincode"
            value={form.pincode}
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
                "Saving…"
              ) : (
                <>
                  <Save size={16} /> Update
                </>
              )}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
