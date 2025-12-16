"use client";

import { useParams } from "next/navigation";
import { useDataStore } from "@/store/useDataStore";
import Step2StationForm from "@/app/components/Step2StationForm";
import { useState, useEffect } from "react";
import { Station } from "@/lib/types";

export default function EditStationPage() {
  const { stationId } = useParams();
  const { stations, updateStation } = useDataStore();

  const existing = stations.find((s) => s.id === stationId);

  const [form, setForm] = useState<Partial<Station>>({});
  // setForm(existing);
  // ✅ FIX: Initialize the form ONCE using useEffect
  useEffect(() => {
    function load() {
      if (existing) {
        setForm(existing);
      }
    }
    load();
  }, [existing]);

  const handleSave = async () => {
    await updateStation(stationId as string, form);
    alert("Station updated!");
  };

  return (
    <div className="p-10 lg:px-60">
      <Step2StationForm
        onNext={handleSave}
        onSkip={() => history.back()}
        formOverride={form}
        setFormOverride={setForm}
      />
    </div>
  );
}
