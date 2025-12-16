"use client";

import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import Card from "@/app/components/Card";
import FormInput from "@/app/components/FormInput";
import { useDataStore } from "@/store/useDataStore";
import { Charger, Station } from "@/lib/types";
import Link from "next/link";

export default function Step3ChargerForm({
  onSubmitFinal,
  onSkip,
  formOverride,
  setFormOverride,
  selectedStationId, // Pass this from parent component
}: {
  onSubmitFinal: () => void;
  onSkip: () => void;
  formOverride?: Partial<Charger>;
  setFormOverride?: Dispatch<SetStateAction<Partial<Charger>>>;
  selectedStationId?: string; // Station ID from Step 2
}) {
  const companies = useDataStore((s) => s.companies);
  const stations = useDataStore((s) => s.stations);
  const getStationsByCompany = useDataStore((s) => s.getStationsByCompany);
  const createCharger = useDataStore((s) => s.createCharger);

  const [form, setForm] = useState<Partial<Charger>>(
    formOverride || {
      id: "",
      stationId: selectedStationId || "",
      ocppId: "",
      oem: "",
      chargerType: "",
      powerRating: "",
      operationalStatus: "Active",
      firmware: "",
      label: "",
      connector: [{ connectorStatuses: "Available" }],
      numConnectors: 1,
      discountOffer: 0,
    }
  );

  const [selectedCompanyId, setSelectedCompanyId] = useState<string>("");
  const [filteredStations, setFilteredStations] = useState<Station[]>([]);

  // Define updateForm BEFORE it's used in useEffect
  const updateForm = (key: keyof Charger, value: string | number) => {
    if (setFormOverride) {
      setFormOverride((prev) => ({ ...prev, [key]: value }));
    } else {
      setForm((prev) => ({ ...prev, [key]: value }));
    }
  };

  // Load stations when company is selected
  useEffect(() => {
    function load() {
      if (selectedCompanyId) {
        const stationsForCompany = getStationsByCompany(selectedCompanyId);
        setFilteredStations(stationsForCompany);
        console.log(
          `📍 Loaded ${stationsForCompany.length} stations for company`
        );

        // Auto-select first station if available and no station is selected
        if (stationsForCompany.length > 0 && !form.stationId) {
          updateForm("stationId", stationsForCompany[0].id);
        }
      } else {
        setFilteredStations([]);
      }
    }
    load();
  }, [selectedCompanyId, getStationsByCompany, form.stationId]);

  // If selectedStationId is provided, auto-select company and station
  useEffect(() => {
    function load() {
      if (selectedStationId) {
        const station = stations.find((s) => s.id === selectedStationId);
        if (station) {
          setSelectedCompanyId(station.companyId);
          updateForm("stationId", selectedStationId);
        }
      }
    }
    load();
  }, [selectedStationId, stations]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!form.stationId) {
      alert("Please select a station first");
      return;
    }

    if (!form.ocppId || !form.oem || !form.chargerType) {
      alert("Please fill in all required fields");
      return;
    }

    if (formOverride) {
      // Edit mode
      onSubmitFinal();
    } else {
      // Create mode - generate ID if not exists
      const chargerData: Charger = {
        id: form.id || `charger-${Date.now()}`,
        stationId: form.stationId as string,
        ocppId: form.ocppId as string,
        oem: form.oem as string,
        chargerType: form.chargerType as string,
        powerRating: form.powerRating as string,
        operationalStatus: form.operationalStatus as string,
        firmware: form.firmware as string,
        label: form.label as string,
        connector: form.connector || [{ connectorStatuses: "Available" }],
        numConnectors: form.numConnectors || 1,
        discountOffer: form.discountOffer || 0,
      };

      createCharger(chargerData);
      console.log("⚡ Charger created:", chargerData.id);
      onSubmitFinal();
    }
  };

  return (
    <Card className="p-8 bg-white">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Charger Details
        </h2>

        {/* Company Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Select Company <span className="text-red-600">*</span>
          </label>
          <select
            value={selectedCompanyId}
            onChange={(e) => setSelectedCompanyId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            required
            disabled={!!selectedStationId} // Disable if station is pre-selected
          >
            <option value="">Choose a company</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name} ({company.type})
              </option>
            ))}
          </select>
        </div>

        {/* Station Selection */}
        {selectedCompanyId && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Select Station <span className="text-red-600">*</span>
            </label>
            <select
              value={form.stationId}
              onChange={(e) => updateForm("stationId", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
              required
              disabled={!!selectedStationId} // Disable if station is pre-selected
            >
              <option value="">Choose a station</option>
              {filteredStations.map((station) => (
                <option key={station.id} value={station.id}>
                  {station.stationName} - {station.city}
                </option>
              ))}
            </select>
            {filteredStations.length === 0 && (
              <p className="text-sm text-gray-500">
                No stations found for this company
              </p>
            )}
          </div>
        )}

        {/* Charger Details - Only show if station is selected */}
        {form.stationId && (
          <div className="space-y-6 pt-4 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              Charger Information
            </h3>

            <FormInput
              label="OCPP ID"
              value={form.ocppId || ""}
              onChange={(e) => updateForm("ocppId", e.target.value)}
              required
              placeholder="e.g., OCPP-001"
            />

            <FormInput
              label="OEM"
              value={form.oem || ""}
              onChange={(e) => updateForm("oem", e.target.value)}
              required
              placeholder="e.g., Exicom, Servotech"
            />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Charger Type <span className="text-red-600">*</span>
                </label>
                <select
                  value={form.chargerType || ""}
                  onChange={(e) => updateForm("chargerType", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                  required
                >
                  <option value="">Select type</option>
                  <option value="AC">AC</option>
                  <option value="DC">DC</option>
                </select>
              </div>

              <FormInput
                label="Power Rating"
                value={form.powerRating || ""}
                onChange={(e) => updateForm("powerRating", e.target.value)}
                required
                placeholder="e.g., 7.4kW, 60kW"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="Firmware Version"
                value={form.firmware || ""}
                onChange={(e) => updateForm("firmware", e.target.value)}
                placeholder="e.g., 4.0.3"
              />

              <FormInput
                label="Label"
                value={form.label || ""}
                onChange={(e) => updateForm("label", e.target.value)}
                placeholder="e.g., Fast Charger"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Operational Status
                </label>
                <select
                  value={form.operationalStatus || "Active"}
                  onChange={(e) =>
                    updateForm("operationalStatus", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Testing">Testing</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>

              <FormInput
                label="Number of Connectors"
                type="number"
                value={form.numConnectors?.toString() || "1"}
                onChange={(e) =>
                  updateForm("numConnectors", parseInt(e.target.value) || 1)
                }
              />
            </div>

            <FormInput
              label="Discount Offer (%)"
              type="number"
              value={form.discountOffer?.toString() || "0"}
              onChange={(e) =>
                updateForm("discountOffer", parseInt(e.target.value) || 0)
              }
              placeholder="0"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between pt-6 border-t border-gray-200">
          <Link
            href="#"
            onClick={onSkip}
            className="text-sm underline text-gray-500 hover:text-gray-700"
          >
            Skip - add chargers later
          </Link>

          <button
            type="submit"
            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!form.stationId}
          >
            {formOverride ? "Update Charger" : "Create Charger"}
          </button>
        </div>
      </form>
    </Card>
  );
}
