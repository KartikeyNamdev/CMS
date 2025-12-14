"use client";

import React, { useState, useMemo, useEffect } from "react";
import FormInput from "@/app/components/FormInput";
import MultipleSelectCheckmarks from "@/app/components/Checkmark";
import { statesData, Station } from "@/lib/types";

/* ---------------------------
   STATE → CITY MAPPING
---------------------------- */

interface Props {
  formData: Partial<Station>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Station>>>;
}

export default function DynamicStationForm({ formData, setFormData }: Props) {
  /* LOCAL STATE WITH DEFAULT VALUES */
  const [selectedState, setSelectedState] = useState(formData.state || "");
  const [selectedCity, setSelectedCity] = useState(formData.city || "");

  /* ---------------------------
     STATE OPTIONS
  ---------------------------- */
  const stateOptions = statesData.map((s) => ({
    value: s.state,
    label: s.state,
  }));

  /* ---------------------------
     CITY OPTIONS (Dynamic)
  ---------------------------- */
  const cityOptions = useMemo(() => {
    if (!selectedState) return [];
    const match = statesData.find((s) => s.state === selectedState);
    return match ? match.cities.map((c) => ({ value: c, label: c })) : [];
  }, [selectedState]);

  /* Auto-reset city when state changes */
  useEffect(() => {
    if (!cityOptions.some((c) => c.value === selectedCity)) {
      setFormData((f) => ({ ...f, city: "" }));
    }
  }, [selectedState, cityOptions, selectedCity, setFormData]);

  /* Shared update function */
  const update = (field: keyof Station, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <h2 className="text-xl text-gray-700 font-bold md:col-span-2">
        Station Details
      </h2>

      {/* BASIC INFORMATION */}
      <FormInput
        label="ID"
        placeholder="Enter Station ID"
        value={formData.id || ""}
        onChange={(e) => update("id", e.target.value)}
      />
      <FormInput
        label="Station Name"
        placeholder="Enter station name"
        value={formData.stationName || ""}
        onChange={(e) => update("stationName", e.target.value)}
      />

      <FormInput
        label="Street"
        placeholder="Street"
        value={formData.street || ""}
        onChange={(e) => update("street", e.target.value)}
      />

      <FormInput
        label="Area"
        placeholder="Area"
        value={formData.area || ""}
        onChange={(e) => update("area", e.target.value)}
      />

      <FormInput
        label="Landmark"
        placeholder="Landmark"
        value={formData.landmark || ""}
        onChange={(e) => update("landmark", e.target.value)}
      />

      {/* STATE DROPDOWN */}
      <FormInput
        label="State"
        options={stateOptions}
        placeholder="Select state"
        value={selectedState}
        onChange={(e) => {
          const st = e.target.value;
          setSelectedState(st);
          update("state", st);
        }}
      />

      {/* CITY DROPDOWN (DYNAMIC) */}
      <FormInput
        label="City"
        options={cityOptions}
        placeholder="Select city"
        value={selectedCity}
        disabled={!selectedState}
        onChange={(e) => {
          const c = e.target.value;
          setSelectedCity(c);
          update("city", c);
        }}
      />

      {/* PINCODE */}
      <FormInput
        label="Pincode"
        placeholder="Pincode"
        type="number"
        value={formData.pincode || ""}
        onChange={(e) => update("pincode", e.target.value)}
      />

      {/* ACCESS TYPE */}
      <FormInput
        label="Access Type"
        options={[
          { value: "Public", label: "Public" },
          { value: "Private", label: "Private" },
        ]}
        value={formData.accessType || ""}
        onChange={(e) => update("accessType", e.target.value)}
      />

      {/* AMENITIES MULTI-SELECT */}
      <MultipleSelectCheckmarks
        label="Amenities"
        data={["RestRoom", "Cafe", "Wifi", "Store", "Lodging"]}
        selected={formData.amenities?.split(",") || []}
        onChange={(vals) => update("amenities", vals.join(","))}
      />

      {/* OPENING HOURS */}
      <FormInput
        label="Opening Hours"
        placeholder="24Hrs or custom"
        value={formData.openingHours || ""}
        onChange={(e) => update("openingHours", e.target.value)}
      />

      {/* CCTV */}
      <FormInput
        label="CCTV Availability"
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
        value={formData.cctv || ""}
        onChange={(e) => update("cctv", e.target.value)}
      />

      {/* CONNECTION TYPE */}
      <FormInput
        label="Connection Type"
        options={[
          { value: "EV connection", label: "EV Connection" },
          { value: "Commercial Connection", label: "Commercial Connection" },
        ]}
        value={formData.connectionType || ""}
        onChange={(e) => update("connectionType", e.target.value)}
      />

      {/* SPOC DETAILS */}
      <FormInput
        label="SPOC Name"
        value={formData.spocName || ""}
        onChange={(e) => update("spocName", e.target.value)}
      />

      <FormInput
        label="SPOC Number"
        type="tel"
        value={formData.spocNumber || ""}
        onChange={(e) => update("spocNumber", e.target.value)}
      />

      {/* GUARD */}
      <FormInput
        label="Guard Name"
        value={formData.guardName || ""}
        onChange={(e) => update("guardName", e.target.value)}
      />

      <FormInput
        label="Guard Number"
        type="tel"
        value={formData.guardNumber || ""}
        onChange={(e) => update("guardNumber", e.target.value)}
      />

      {/* PARKING FEE */}
      <FormInput
        label="Parking Fee"
        options={[
          { value: "1", label: "Yes" },
          { value: "0", label: "No" },
        ]}
        value={formData.parkingFee || ""}
        onChange={(e) => update("parkingFee", e.target.value)}
      />

      {/* INTERNET TYPE */}
      <FormInput
        label="Internet Connection Type"
        options={[
          { value: "WiFi", label: "WiFi" },
          { value: "Sim", label: "SIM" },
          { value: "Lan", label: "LAN" },
        ]}
        value={formData.internetConnectionType || ""}
        onChange={(e) => update("internetConnectionType", e.target.value)}
      />
    </div>
  );
}
