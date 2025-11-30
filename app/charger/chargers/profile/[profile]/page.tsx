"use client";

import React, { useState, use, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  BoltIcon,
  Cog6ToothIcon,
  ClockIcon,
  InformationCircleIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/solid";
import Card from "@/app/components/Card";
import {
  ConnectorBlock,
  IChargerProfile,
  InfoCard,
  SubSectionContent,
} from "@/app/components/ChargerProfileComponents"; // New components
import { Dialog } from "@/components/ui/dialog";
import BlurDialog from "@/app/components/Dialog";

// Mock Data for the Profile Page
const mockProfileData: IChargerProfile = {
  stationName: "Aryan Hotel",
  stationId: "Dabas004",
  address: "Sikar Road, Near T Point Khatu Mod, Sikar, Rajasthan, 332404",
  ocppId: "Dabas004",
  oem: "Unknown",
  dateOfCommissioning: "2023-01-15",
  accessType: "Public",
  chargerOperationalStatus: "Commissioned - Active",
  chargerConnectivityStatus: "Connected",
  stationVisibilityStatus: "Enabled",
  firmware: "4.0.3-3.0.5",
  locationAxis: "27.359102N, 75.589821E",
  zone: "North-West",
  connectors: [
    {
      id: 1,
      powerRating: 60.0,
      unitsConsumed: 6172.3,
      info: "Error",
      errorCode: "OtherError",
      lastRecordedStatus: "Charging",
    },
    {
      id: 2,
      powerRating: 60.0,
      unitsConsumed: 5628.34,
      info: "No Error",
      errorCode: "OtherError",
      lastRecordedStatus: "Available",
    },
    {
      id: 3,
      powerRating: 0.0,
      unitsConsumed: 11800.65,
      info: "No Error",
      errorCode: "NoError",
      lastRecordedStatus: "Available",
    },
  ],
};

// Map Profile data to the 4-column grid (mimicking the top half of the image)
const profileFields = [
  { label: "OEM", value: mockProfileData.oem },
  {
    label: "Date of Commissioning",
    value: mockProfileData.dateOfCommissioning,
  },
  { label: "Address", value: mockProfileData.address },
  { label: "Access Type", value: mockProfileData.accessType },

  { label: "OCPP ID", value: mockProfileData.ocppId },
  { label: "Station Name", value: mockProfileData.stationName },
  { label: "Source", value: "CSMS" },
  {
    label: "Charger Operational Status",
    value: mockProfileData.chargerOperationalStatus,
  },

  {
    label: "Charger Connectivity Status",
    value: mockProfileData.chargerConnectivityStatus,
  },
  {
    label: "Station Visibility Status",
    value: mockProfileData.stationVisibilityStatus,
  },
  { label: "Firmware", value: mockProfileData.firmware },
  { label: "Zone", value: mockProfileData.zone },

  { label: "Location Axis", value: mockProfileData.locationAxis },
  // Placeholder for other custom fields
];

// Sub-Section Tabs
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

export default function ChargerProfilePage({
  params,
}: {
  params: Promise<{ profile: string }>;
}) {
  const { profile } = use(params);
  const decodedProfile = decodeURIComponent(profile);

  const [dialogOpen, setIsDialogOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(subSections[0].id);

  // Dynamic class generator for the segmented control (buttons at the bottom)
  const subSectionClasses = (id: string) => `
        px-4 py-2 text-sm font-semibold transition-colors rounded-t-lg
        ${
          activeSection === id
            ? "text-red-600 border-b-2 border-red-600"
            : "text-gray-500 hover:text-gray-300"
        }
    `;

  // Final Rendering
  return (
    <div className="p-6 lg:px-60 min-h-screen  ">
      {/* --- HEADER ROW --- */}
      <div className="flex items-center justify-between mb-6 text-black">
        <div className="flex items-center gap-4">
          <Link
            href={"/charger/chargers"}
            className="text-gray-500 hover:text-black"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold text-white">Charger Profile</h1>
          <span className="text-sm text-gray-500 hidden sm:block">
            IST+05:30 | INR
          </span>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          <button className="text-sm font-semibold text-gray-300 hover:text-white">
            Autocharge
          </button>
          <button
            onClick={() => {
              setIsDialogOpen(true);
            }}
            className="px-4 py-2 rounded-lg text-white font-bold bg-[#b22828] hover:bg-red-700"
          >
            OCPP Commands
          </button>
        </div>
      </div>
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

      {/* --- CARD 1: STATION METADATA --- */}
      <Card
        title={null}
        className="p-6 mb-8 bg-white text-black border border-gray-200"
      >
        <h2 className="text-xl font-bold mb-4 text-[#b22828]">
          {decodedProfile} (Dabas EV Charge)
        </h2>

        {/* 4-Column Data Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4">
          {profileFields.map((field) => (
            <InfoCard
              label={field.label}
              value={field.value}
              key={field.label}
            />
          ))}
        </div>
      </Card>

      {/* --- CONNECTORS SECTION --- */}
      <h3 className="text-xl font-bold mb-4 text-white">Connectors</h3>
      <div className="flex flex-wrap gap-4 mb-8">
        {mockProfileData.connectors.map((connector) => (
          <ConnectorBlock data={connector} key={connector.id} />
        ))}
      </div>

      {/* --- TABBED SUB-SECTIONS (Performance, Health, Logs) --- */}
      <div className="w-full">
        {/* Tab Controls */}
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

        {/* Content Rendering */}
        <div className="p-2">
          <SubSectionContent title={activeSection} />
        </div>
      </div>
    </div>
  );
}
