"use client";

import React from "react";
import Card from "../components/Card";
import DCLicenseChart from "../components/DCLicenseChart";
import ACLicenseChart from "../components/ACLicenceChart";
import { useCompanySectionHooks } from "@/hooks/useCompanySection";

// --- StatCard Component ---
export const StatCard = ({ title, value, icon: Icon }) => (
  <Card className="flex flex-col p-4 justify-between min-h-[120px]">
    <p className="text-black text-3xl font-semibold mt-2">{value}</p>
    <div className="flex justify-between items-start">
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <Icon className="w-6 h-6 text-red-500" />
    </div>
  </Card>
);

export const CompanyManagement = () => {
  const { stats, companyDetails, licenseCharts } = useCompanySectionHooks();

  return (
    <div className="w-full p-6 lg:p-20 lg:px-65 min-h-screen">
      {/* Header */}
      <div className="mb-6 text-gray-700 text-sm">
        Last refreshed at: 19 November 2025, 16:44 | Pluginp:
        <span className="text-green-500 font-semibold"> OPO</span>
      </div>

      {/* --- STATS CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {stats.map((s) => (
          <StatCard key={s.title} {...s} />
        ))}
      </div>

      {/* --- DETAILS CARD --- */}
      <Card title={null} className="mb-6 p-6">
        <h2 className="text-black text-lg font-bold mb-4">
          Address: 51R, CYBERHUB, DLF PHASE 3, GURGAON, HARYANA, 12202
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-8 text-sm text-gray-300">
          {companyDetails.map((d) => (
            <div key={d.label} className="flex flex-col">
              <span className="text-black font-bold">{d.label}</span>
              <span className="text-gray-500">{d.value}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* --- LICENSE CHARTS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* DC */}
        <Card title={licenseCharts.dc.title}>
          <DCLicenseChart />
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-400 justify-center">
            {licenseCharts.dc.legend.map((l) => (
              <div key={l.label} className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${l.color}`} />
                {l.label}
              </div>
            ))}
          </div>
        </Card>

        {/* AC */}
        <Card title={licenseCharts.ac.title}>
          <ACLicenseChart />
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-400 justify-center">
            {licenseCharts.ac.legend.map((l) => (
              <div key={l.label} className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${l.color}`} />
                {l.label}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CompanyManagement;
