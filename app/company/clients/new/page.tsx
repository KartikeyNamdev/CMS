"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";
import Step1CompanyForm from "@/app/components/Step1CompanyForm";
import Step2StationForm from "@/app/components/Step2StationForm";
import Step3ChargerForm from "@/app/components/Step3CHargerForm";

export default function ClientForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const goHome = () => router.push("/company/clients");

  return (
    <div className="w-full p-6 lg:px-72 min-h-screen">
      {step === 1 && (
        <Step1CompanyForm onNext={() => setStep(2)} onSkip={goHome} />
      )}
      {step === 2 && (
        <Step2StationForm onNext={() => setStep(3)} onSkip={goHome} />
      )}
      {step === 3 && (
        <Step3ChargerForm onSubmitFinal={goHome} onSkip={goHome} />
      )}
    </div>
  );
}
