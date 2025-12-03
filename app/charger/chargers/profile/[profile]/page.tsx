"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  BoltIcon,
  ClockIcon,
  InformationCircleIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/solid";

import Card from "@/app/components/Card";
import BlurDialog from "@/app/components/Dialog";

import {
  ConnectorBlock,
  InfoCard,
  SubSectionContent,
} from "@/app/components/ChargerProfileComponents";

import { useChargerProfile } from "@/hooks/useChargerProfile";

export default function ChargerProfilePage({
  params,
}: {
  params: Promise<{ profile: string }>;
}) {
  const { profile } = use(params);
  const decodedProfile = decodeURIComponent(profile);

  // Fetch Hook (dummy until API works)
  const { profile: charger, loading } = useChargerProfile(decodedProfile);

  const [dialogOpen, setIsDialogOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("performance");

  const subSections = [
    { id: "performance", name: "Performance", icon: BoltIcon },
    { id: "health", name: "Charger Health", icon: WrenchScrewdriverIcon },
    {
      id: "stakeholder",
      name: "Stakeholder Information",
      icon: InformationCircleIcon,
    },
    { id: "logs", name: "Charger Logs", icon: ClockIcon },
  ];

  const subSectionClasses = (id: string) => `
    px-4 py-2 text-sm font-semibold transition-colors rounded-t-lg
    ${
      activeSection === id
        ? "text-red-600 border-b-2 border-red-600"
        : "text-gray-500 hover:text-gray-300"
    }
  `;

  if (loading || !charger) {
    return (
      <div className="text-center text-gray-700 p-10 text-xl">
        Loading Charger Profile…
      </div>
    );
  }

  // Convert charger profile into InfoCard grid
  const profileFields = [
    { label: "OEM", value: charger.oem },
    { label: "Date of Commissioning", value: charger.dateOfCommissioning },
    { label: "Address", value: charger.address },
    { label: "Access Type", value: charger.accessType },

    { label: "OCPP ID", value: charger.ocppId },
    { label: "Station Name", value: charger.stationName },
    { label: "Source", value: "CSMS" },
    {
      label: "Charger Operational Status",
      value: charger.chargerOperationalStatus,
    },

    {
      label: "Charger Connectivity Status",
      value: charger.chargerConnectivityStatus,
    },
    {
      label: "Station Visibility Status",
      value: charger.stationVisibilityStatus,
    },
    { label: "Firmware", value: charger.firmware },
    { label: "Zone", value: charger.zone },

    { label: "Location Axis", value: charger.locationAxis },
  ];

  return (
    <div className="p-6 lg:px-60 min-h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6 text-gray-700">
        <div className="flex items-center gap-4">
          <Link
            href={"/charger/chargers"}
            className="text-gray-500 hover:text-black"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </Link>

          <h1 className="text-2xl font-bold text-gray-700">Charger Profile</h1>
          <span className="text-sm text-gray-500 hidden sm:block">
            IST +05:30 | INR
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-sm font-semibold text-gray-500 hover:text-black">
            Autocharge
          </button>

          <button
            onClick={() => setIsDialogOpen(true)}
            className="px-4 py-2 rounded-lg text-white font-bold bg-[#b22828] hover:bg-red-500"
          >
            OCPP Commands
          </button>
        </div>
      </div>

      {/* OCPP COMMANDS DIALOG */}
      <BlurDialog
        isOpen={dialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="OCPP Commands"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 bg-white/60">
              OCPP Commands *
            </label>
            <select
              value={""}
              onChange={(e) => console.log(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-gray-900"
            >
              <option value="">Select OCPP Command</option>
              <option value="reset">Reset</option>
              <option value="unlock">Unlock Connector</option>
              <option value="status">Get Status</option>
              <option value="diagnostics">Get Diagnostics</option>
              <option value="configuration">Change Configuration</option>
              <option value="firmware">Update Firmware</option>
            </select>
          </div>
        </div>
      </BlurDialog>

      {/* STATION METADATA */}
      <Card
        title={null}
        className="p-6 mb-8 bg-white text-black border border-gray-200"
      >
        <h2 className="text-xl font-bold mb-4 text-[#b22828]">
          {decodedProfile} (Dabas EV Charge)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4">
          {profileFields.map((field) => (
            <InfoCard
              key={field.label}
              label={field.label}
              value={field.value}
            />
          ))}
        </div>
      </Card>

      {/* CONNECTORS */}
      <h3 className="text-xl font-bold mb-4 text-gray-700">Connectors</h3>

      <div className="flex flex-wrap gap-4 mb-8">
        {charger.connectors.map((connector) => (
          <ConnectorBlock key={connector.id} data={connector} />
        ))}
      </div>

      {/* SUB-SECTIONS */}
      <div className="w-full">
        {/* TABS */}
        <div className="flex space-x-6 border-b border-gray-300 mb-6">
          {subSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={subSectionClasses(section.id)}
            >
              {section.name}
            </button>
          ))}
        </div>

        {/* SECTION CONTENT */}
        <div className="p-2">
          <SubSectionContent title={activeSection} />
        </div>
      </div>
    </div>
  );
}
