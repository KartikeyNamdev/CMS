"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import Card from "@/app/components/Card";
import FormInput from "@/app/components/FormInput";
import { useDataStore } from "@/store/useDataStore";
import { Charger } from "@/lib/types";
import Link from "next/link";

export default function Step3ChargerForm({
  onSubmitFinal,
  onSkip,
  formOverride,
  setFormOverride,
}: {
  onSubmitFinal: () => void;
  onSkip: () => void;
  formOverride?: Partial<Charger>;
  setFormOverride?: Dispatch<SetStateAction<Partial<Charger>>>;
}) {
  const createCharger = useDataStore((s) => s.createCharger);

  const [form, setForm] = useState<Partial<Charger>>(formOverride || {});

  if (formOverride) setForm(formOverride);

  const update = (key: keyof Charger, value: string) =>
    (setFormOverride || setForm)((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formOverride) {
      onSubmitFinal(); // edit mode
    } else {
      await createCharger(form as Charger);
      onSubmitFinal();
    }
  };

  return (
    <Card className="p-8 bg-gray-900">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-xl font-bold text-gray-700">
          Step 3: Charger Details
        </h2>

        <FormInput
          label="OCPP ID"
          value={form.ocppId}
          onChange={(e) => update("ocppId", e.target.value)}
        />
        <FormInput
          label="OEM"
          value={form.oem}
          onChange={(e) => update("oem", e.target.value)}
        />
        <FormInput
          label="Charger Type"
          value={form.chargerType}
          onChange={(e) => update("chargerType", e.target.value)}
        />
        <FormInput
          label="Power Rating"
          value={form.powerRating}
          onChange={(e) => update("powerRating", e.target.value)}
        />
        <FormInput
          label="Firmware"
          value={form.firmware}
          onChange={(e) => update("firmware", e.target.value)}
        />
        <FormInput
          label="Label"
          value={form.label}
          onChange={(e) => update("label", e.target.value)}
        />

        <div className="flex justify-between pt-4">
          <Link
            href="#"
            onClick={onSkip}
            className="text-sm underline text-gray-400"
          >
            I will do later
          </Link>

          <button className="px-8 py-3 bg-red-700 text-white rounded-xl">
            Finish
          </button>
        </div>
      </form>
    </Card>
  );
}
