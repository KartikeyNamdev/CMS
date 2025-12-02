"use client";

import {
  BoltIcon,
  PaperAirplaneIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";

export const useCompanySectionHooks = () => {
  /* -------------------------------
   🌟 1. STAT CARDS SECTION
  --------------------------------*/
  const stats = [
    {
      title: "Host",
      value: "0",
      icon: PaperAirplaneIcon,
    },
    {
      title: "Investors",
      value: "0",
      icon: CurrencyDollarIcon,
    },
    {
      title: "Total Chargers",
      value: "0",
      icon: BoltIcon,
    },
  ];

  /* -------------------------------
   🌟 2. COMPANY DETAILS SECTION
  --------------------------------*/
  const companyDetails = [
    { label: "Tax ID", value: "132 - 4568 - 90" },
    { label: "Total Session", value: "0" },
    { label: "License Cost (DC)", value: "3000" },
    { label: "License Cost (AC)", value: "3000" },
    { label: "Total Admin", value: "2" },
    { label: "Payout Cycle", value: "Monthly" },
    { label: "Company Share", value: "0" },
    { label: "Company PIN", value: "578161" },
  ];

  /* -------------------------------
   🌟 3. LICENSE CHARTS SECTION
  --------------------------------*/
  const licenseCharts = {
    dc: {
      title: "DC Charger License",
      legend: [
        { label: "Total DC License", color: "bg-red-600" },
        { label: "Available DC License", color: "bg-pink-300" },
        { label: "Active DC License", color: "bg-gray-700" },
      ],
    },
    ac: {
      title: "AC Charger License",
      legend: [
        { label: "Total AC License", color: "bg-red-700" },
        { label: "Available AC License", color: "bg-pink-300" },
        { label: "Active AC License", color: "bg-black" },
      ],
    },
  };

  return {
    stats,
    companyDetails,
    licenseCharts,
  };
};
