"use client";

import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import Card from "@/app/components/Card";
import FormInput from "@/app/components/FormInput";
import { useDataStore } from "@/store/useDataStore";
import { Charger, Station } from "@/lib/types";
import Link from "next/link";

export default function ComprehensiveChargerForm({
  onSubmitFinal,
  onSkip,
  formOverride,
  setFormOverride,
  selectedStationId,
}: {
  onSubmitFinal: () => void;
  onSkip: () => void;
  formOverride?: Partial<Charger>;
  setFormOverride?: Dispatch<SetStateAction<Partial<Charger>>>;
  selectedStationId?: string;
}) {
  const companies = useDataStore((s) => s.companies);
  const stations = useDataStore((s) => s.stations);
  const getStationsByCompany = useDataStore((s) => s.getStationsByCompany);
  const createCharger = useDataStore((s) => s.createCharger);

  const [form, setForm] = useState<Partial<Charger>>(
    formOverride || {
      id: "",
      stationId: selectedStationId || "",
      chargerName: "",
      stationName: "",
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
      autoCharge: false,
    }
  );

  const [selectedCompanyId, setSelectedCompanyId] = useState<string>("");
  const [filteredStations, setFilteredStations] = useState<Station[]>([]);

  const updateForm = (key: keyof Charger, value: string | number | boolean) => {
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

        // Auto-select first station if available
        if (stationsForCompany.length > 0 && !form.stationId) {
          const station = stationsForCompany[0];
          updateForm("stationId", station.id);
          updateForm("stationName", station.stationName);
        }
      } else {
        setFilteredStations([]);
      }
    }
    load();
  }, [selectedCompanyId]);

  // If selectedStationId is provided, auto-select company and station
  useEffect(() => {
    if (selectedStationId) {
      function load() {
        const station = stations.find((s) => s.id === selectedStationId);
        if (station) {
          setSelectedCompanyId(station.companyId);
          updateForm("stationId", selectedStationId);
          updateForm("stationName", station.stationName);
        }
      }
      load();
    }
  }, [selectedStationId, stations]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.stationId || !form.ocppId || !form.oem || !form.chargerType) {
      alert("Please fill in all required fields");
      return;
    }

    if (formOverride) {
      onSubmitFinal();
    } else {
      const chargerData: Charger = {
        ...form,
        id: form.id || `charger-${Date.now()}`,
      } as Charger;

      createCharger(chargerData);
      console.log("⚡ Charger created:", chargerData.id);
      onSubmitFinal();
    }
  };

  return (
    <Card className="p-8 bg-white max-w-7xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            {formOverride ? "Edit Charger" : "Add New Charger"}
          </h2>
        </div>

        {/* Company & Station Selection */}
        <div className="space-y-4 pb-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">
            Company & Station
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Select Company <span className="text-red-600">*</span>
              </label>
              <select
                value={selectedCompanyId}
                onChange={(e) => setSelectedCompanyId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                required
                disabled={!!selectedStationId}
              >
                <option value="">Choose a company</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name} ({company.type})
                  </option>
                ))}
              </select>
            </div>

            {selectedCompanyId && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Select Station <span className="text-red-600">*</span>
                </label>
                <select
                  value={form.stationId}
                  onChange={(e) => {
                    const stationId = e.target.value;
                    const station = filteredStations.find(
                      (s) => s.id === stationId
                    );
                    updateForm("stationId", stationId);
                    if (station) updateForm("stationName", station.stationName);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                  required
                  disabled={!!selectedStationId}
                >
                  <option value="">Choose a station</option>
                  {filteredStations.map((station) => (
                    <option key={station.id} value={station.id}>
                      {station.stationName} - {station.city}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Only show form if station is selected */}
        {form.stationId && (
          <>
            {/* Basic Charger Information */}
            <div className="space-y-4 pb-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">
                Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Charger Name"
                  value={form.chargerName || ""}
                  onChange={(e) => updateForm("chargerName", e.target.value)}
                  required
                  placeholder="Enter charger name"
                />

                <FormInput
                  label="Station Site / Site ID"
                  value={form.stationSiteId || ""}
                  onChange={(e) => updateForm("stationSiteId", e.target.value)}
                  placeholder="Enter site ID"
                />
              </div>
            </div>

            {/* Location Details */}
            <div className="space-y-4 pb-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">
                Location Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <FormInput
                  label="Latitude"
                  value={form.latitude || ""}
                  onChange={(e) => updateForm("latitude", e.target.value)}
                  placeholder="e.g., 28.7041"
                />

                <FormInput
                  label="Longitude"
                  value={form.longitude || ""}
                  onChange={(e) => updateForm("longitude", e.target.value)}
                  placeholder="e.g., 77.1025"
                />

                <FormInput
                  label="Area"
                  value={form.area || ""}
                  onChange={(e) => updateForm("area", e.target.value)}
                  placeholder="Enter area"
                />

                <FormInput
                  label="State"
                  value={form.state || ""}
                  onChange={(e) => updateForm("state", e.target.value)}
                  placeholder="Enter state"
                />

                <FormInput
                  label="City"
                  value={form.city || ""}
                  onChange={(e) => updateForm("city", e.target.value)}
                  placeholder="Enter city"
                />

                <FormInput
                  label="Pincode"
                  value={form.pincode || ""}
                  onChange={(e) => updateForm("pincode", e.target.value)}
                  placeholder="Enter pincode"
                />

                <FormInput
                  label="Street"
                  value={form.street || ""}
                  onChange={(e) => updateForm("street", e.target.value)}
                  placeholder="Enter street"
                />

                <FormInput
                  label="Zone"
                  value={form.zone || ""}
                  onChange={(e) => updateForm("zone", e.target.value)}
                  placeholder="e.g., North, South"
                />
              </div>
            </div>

            {/* Access & Timing */}
            <div className="space-y-4 pb-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">
                Access & Operating Hours
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Opening Time
                  </label>
                  <input
                    type="time"
                    value={form.openingTime || ""}
                    onChange={(e) => updateForm("openingTime", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Closing Time
                  </label>
                  <input
                    type="time"
                    value={form.closingTime || ""}
                    onChange={(e) => updateForm("closingTime", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>

                <FormInput
                  label="Access Type"
                  value={form.accessType || ""}
                  onChange={(e) => updateForm("accessType", e.target.value)}
                  placeholder="e.g., Public, Private"
                />

                <FormInput
                  label="Alternative Access Type"
                  value={form.alternativeAccessType || ""}
                  onChange={(e) =>
                    updateForm("alternativeAccessType", e.target.value)
                  }
                  placeholder="Enter alternative type"
                />
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="space-y-4 pb-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">
                Technical Specifications
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

                <FormInput
                  label="Charger Power Rating"
                  value={form.chargerPowerRating || ""}
                  onChange={(e) =>
                    updateForm("chargerPowerRating", e.target.value)
                  }
                  placeholder="Additional power rating"
                />

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
              </div>
            </div>

            {/* Connector Details */}
            <div className="space-y-4 pb-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">
                Connector Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormInput
                  label="Number of Connectors"
                  type="number"
                  value={form.numConnectors?.toString() || "1"}
                  onChange={(e) =>
                    updateForm("numConnectors", parseInt(e.target.value) || 1)
                  }
                  required
                />

                <FormInput
                  label="Type of Connector"
                  value={form.typeOfConnector || ""}
                  onChange={(e) =>
                    updateForm("typeOfConnector", e.target.value)
                  }
                  placeholder="e.g., CCS, CHAdeMO"
                />

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Auto Charge
                  </label>
                  <div className="flex items-center space-x-4 pt-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={form.autoCharge || false}
                        onChange={(e) =>
                          updateForm("autoCharge", e.target.checked)
                        }
                        className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Enable Auto Charge
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Deal Details */}
            <div className="space-y-4 pb-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">
                Deal Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <FormInput
                  label="Fixed Cost /kWh"
                  type="number"
                  value={form.fixedCostPerKwh?.toString() || ""}
                  onChange={(e) =>
                    updateForm(
                      "fixedCostPerKwh",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  placeholder="0.00"
                />

                <FormInput
                  label="Electricity Connection Owned By"
                  value={form.electricityConnectionOwnedBy || ""}
                  onChange={(e) =>
                    updateForm("electricityConnectionOwnedBy", e.target.value)
                  }
                  placeholder="Enter owner name"
                />

                <FormInput
                  label="Electricity Connection Type"
                  value={form.electricityConnectionType || ""}
                  onChange={(e) =>
                    updateForm("electricityConnectionType", e.target.value)
                  }
                  placeholder="Enter connection type"
                />

                <FormInput
                  label="Meter Type"
                  value={form.meterType || ""}
                  onChange={(e) => updateForm("meterType", e.target.value)}
                  placeholder="Enter meter type"
                />

                <FormInput
                  label="DISCOM ID/Account Number"
                  value={form.discomIdAccountNumber || ""}
                  onChange={(e) =>
                    updateForm("discomIdAccountNumber", e.target.value)
                  }
                  placeholder="Enter account number"
                />

                <FormInput
                  label="Estimated Electricity Charge/kWh"
                  type="number"
                  value={
                    form.estimatedElectricityChargePerKwh?.toString() || ""
                  }
                  onChange={(e) =>
                    updateForm(
                      "estimatedElectricityChargePerKwh",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  placeholder="0.00"
                />

                <FormInput
                  label="Insurance Amount (Annual)"
                  type="number"
                  value={form.insuranceAmountAnnual?.toString() || ""}
                  onChange={(e) =>
                    updateForm(
                      "insuranceAmountAnnual",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  placeholder="0.00"
                />

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
            </div>

            {/* Financial Details */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Financial Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormInput
                  label="Date of Company Mapping"
                  type="date"
                  value={form.dateOfCompanyMapping || ""}
                  onChange={(e) =>
                    updateForm("dateOfCompanyMapping", e.target.value)
                  }
                />

                <FormInput
                  label="Fixed Fee"
                  type="number"
                  value={form.fixedFee?.toString() || ""}
                  onChange={(e) =>
                    updateForm("fixedFee", parseFloat(e.target.value) || 0)
                  }
                  placeholder="0.00"
                />

                <FormInput
                  label="SAAS"
                  type="number"
                  value={form.saas?.toString() || ""}
                  onChange={(e) =>
                    updateForm("saas", parseFloat(e.target.value) || 0)
                  }
                  placeholder="0.00"
                />

                <FormInput
                  label="Profit Share (%)"
                  type="number"
                  value={form.profitShare?.toString() || ""}
                  onChange={(e) =>
                    updateForm("profitShare", parseFloat(e.target.value) || 0)
                  }
                  placeholder="0"
                />

                <FormInput
                  label="Revenue Share (%)"
                  type="number"
                  value={form.revenueShare?.toString() || ""}
                  onChange={(e) =>
                    updateForm("revenueShare", parseFloat(e.target.value) || 0)
                  }
                  placeholder="0"
                />

                <FormInput
                  label="Deal Applicable"
                  value={form.dealApplicable || ""}
                  onChange={(e) => updateForm("dealApplicable", e.target.value)}
                  placeholder="Enter deal details"
                />
              </div>
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onSkip}
            className="px-6 py-3 text-gray-600 hover:text-gray-800 underline transition-colors"
          >
            Skip - Add chargers later
          </button>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={!form.stationId}
            >
              {formOverride ? "Update Charger" : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </Card>
  );
}
