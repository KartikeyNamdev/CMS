import { Station } from "@/lib/types";
import { useDataStore } from "@/store/useDataStore";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import DynamicStationForm from "./DynamicStationForm";
import Card from "./Card";

export default function Step2StationForm({
  onNext,
  onSkip,
  formOverride,
  setFormOverride,
}: {
  onNext: () => void;
  onSkip: () => void;
  formOverride?: Partial<Station>;
  setFormOverride?: Dispatch<SetStateAction<Partial<Station>>>;
}) {
  const createStation = useDataStore((s) => s.createStation);

  const [form, setForm] = useState<Partial<Station>>(formOverride || {});

  // overwrite if editing
  useEffect(() => {
    function load() {
      if (formOverride) setForm(formOverride);
    }
    load();
  });
  const handleSubmit = async () => {
    if (formOverride) {
      onNext(); // edit mode handled outside
    } else {
      await createStation(form as Station);
      onNext();
    }
  };

  return (
    <Card className="p-8 bg-gray-900">
      <DynamicStationForm
        formData={form}
        setFormData={setFormOverride || setForm}
      />

      <div className="flex justify-between mt-6">
        <button onClick={onSkip} className="text-sm underline text-gray-700">
          I will do later
        </button>

        <button
          onClick={handleSubmit}
          className="px-8 py-3 bg-red-700 text-white rounded-xl"
        >
          Continue →
        </button>
      </div>
    </Card>
  );
}
