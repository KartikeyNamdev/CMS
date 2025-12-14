"use client";

import { useParams } from "next/navigation";
import { useDataStore } from "@/store/useDataStore";

import { useState } from "react";
import Step3ChargerForm from "@/app/components/Step3CHargerForm";

export default function EditChargerPage() {
  const { chargerId } = useParams();
  const { chargers, updateCharger } = useDataStore();
  const existing = chargers.find((c) => c.id === chargerId);

  const [form, setForm] = useState(existing || {});

  if (existing) setForm(existing);

  const handleSave = async () => {
    await updateCharger(chargerId as string, form);
    alert("Charger Updated!");
  };

  return (
    <div className="p-10 lg:px-60">
      <Step3ChargerForm
        onSubmitFinal={handleSave}
        onSkip={() => history.back()}
        formOverride={form} // ⬅ NEW
        setFormOverride={setForm} // ⬅ NEW
      />
    </div>
  );
}
