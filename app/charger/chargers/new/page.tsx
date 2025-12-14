"use client";

import Step3ChargerForm from "@/app/components/Step3CHargerForm";

export default function CreateChargerPage() {
  return (
    <div className="p-10 lg:px-60">
      <Step3ChargerForm
        onSubmitFinal={() => alert("Charger Created!")}
        onSkip={() => alert("Skipped")}
      />
    </div>
  );
}
