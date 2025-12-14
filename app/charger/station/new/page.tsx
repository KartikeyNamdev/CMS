"use client";

import Step2StationForm from "@/app/components/Step2StationForm";
import { useDataStore } from "@/store/useDataStore";

export default function CreateStationPage() {
  const companies = useDataStore((s) => s.companies);
  const selectedCompany = companies[0]; // or dropdown selection
  console.log(selectedCompany);

  return (
    <div className="p-10 lg:px-60">
      <Step2StationForm
        onNext={() => {
          alert("Station Created!");
        }}
        onSkip={() => {
          alert("Skipped");
        }}
      />
    </div>
  );
}
