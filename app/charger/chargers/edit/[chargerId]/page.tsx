"use client";

import { useParams, useRouter } from "next/navigation";
import { useDataStore } from "@/store/useDataStore";
import { useState, useEffect, use } from "react";
import Card from "@/app/components/Card";
import FormInput from "@/app/components/FormInput";
import { Charger } from "@/lib/types";

export default function EditChargerPage({
  params,
}: {
  params: Promise<{ chargerId: string }>;
}) {
  const { chargerId } = use(params);

  const router = useRouter();

  const chargers = useDataStore((s) => s.chargers);
  const updateCharger = useDataStore((s) => s.updateCharger);
  const stations = useDataStore((s) => s.stations);
  const companies = useDataStore((s) => s.companies);

  const [form, setForm] = useState<Partial<Charger> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Load charger data on mount
  useEffect(() => {
    function load() {
      // Decode the URL-encoded charger ID
      const decodedChargerId = decodeURIComponent(chargerId);

      console.log("🔍 Looking for charger (decoded):", decodedChargerId);
      console.log("🔍 Original URL param:", chargerId);

      const existing = chargers.find(
        (c) =>
          String(c.id) === decodedChargerId ||
          String(c.ocppId) === decodedChargerId
      );

      if (existing) {
        setForm(existing);
        setIsLoading(false);
        console.log("⚡ Charger loaded for editing:", existing.id);
      } else {
        setNotFound(true);
        setIsLoading(false);
        console.warn("⚠️ Charger not found:", decodedChargerId);
      }
    }
    load();
  }, [chargerId, chargers]);
  const updateForm = (key: keyof Charger, value: string | number | boolean) => {
    setForm((prev) => (prev ? { ...prev, [key]: value } : null));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form || !form.id) {
      alert("Invalid charger data");
      return;
    }

    if (!form.ocppId || !form.oem || !form.chargerType) {
      alert("Please fill in all required fields");
      return;
    }

    updateCharger(form.id, form);
    alert("✅ Charger updated successfully!");
    console.log("⚡ Charger updated:", form.id);
    router.push("/charger/chargers");
  };

  const handleCancel = () => {
    router.back();
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="p-10 lg:px-60">
        <Card className="p-8 bg-white">
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Loading charger data...</p>
          </div>
        </Card>
      </div>
    );
  }

  // Not found state
  if (notFound || !form) {
    return (
      <div className="p-10 lg:px-60">
        <Card className="p-8 bg-white">
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">Charger not found</p>
            <button
              onClick={() => router.push("/charger/chargers")}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
            >
              Back to Chargers
            </button>
          </div>
        </Card>
      </div>
    );
  }

  // Get station and company info
  const station = stations.find((s) => s.id === form.stationId);
  const company = station
    ? companies.find((c) => c.id === station.companyId)
    : null;

  return (
    <div className="p-10 lg:px-60">
      <Card className="p-8 bg-white max-w-7xl mx-auto">
        <form onSubmit={handleSave} className="space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-200">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Edit Charger</h2>
              <p className="text-sm text-gray-600 mt-1">
                Charger ID: {form.id}
              </p>
            </div>
          </div>

          {/* Company & Station Info (Read-only) */}
          <div className="space-y-4 pb-6 border-b border-gray-200 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800">
              Company & Station (Cannot be changed)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Company
                </label>
                <p className="text-gray-900 font-medium">
                  {company?.name || "N/A"} ({company?.type || "N/A"})
                </p>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Station
                </label>
                <p className="text-gray-900 font-medium">
                  {station?.stationName || "N/A"} - {station?.city || "N/A"}
                </p>
              </div>
            </div>
          </div>

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
                onChange={(e) => updateForm("typeOfConnector", e.target.value)}
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
                  updateForm("fixedCostPerKwh", parseFloat(e.target.value) || 0)
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
                value={form.estimatedElectricityChargePerKwh?.toString() || ""}
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

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
            >
              Update Charger
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
