"use client";

import { useParams } from "next/navigation";
import { useDataStore } from "@/store/useDataStore";
import Step2StationForm from "@/app/components/Step2StationForm";
import { useState } from "react";

export default function EditStationPage() {
  const { stationId } = useParams();
  const { stations, updateStation } = useDataStore();

  const existing = stations.find((s) => s.id === stationId);

  const [form, setForm] = useState(existing || {});

  if (existing) setForm(existing);

  const handleSave = async () => {
    await updateStation(stationId as string, form);
    alert("Station updated!");
  };

  return (
    <div className="p-10 lg:px-60">
      <Step2StationForm
        onNext={handleSave}
        onSkip={() => history.back()}
        formOverride={form} // ⬅ NEW PROP
        setFormOverride={setForm} // ⬅ NEW PROP
      />
    </div>
  );
}
