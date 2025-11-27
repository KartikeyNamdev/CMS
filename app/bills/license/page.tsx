"use client";

import React, { useState } from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import FilterDialog from "@/app/components/FilterDialog";
import DropdownFilter from "@/app/components/DropdownFilter";

// --- INTERFACES ---
interface ILicenseLog {
  licenseId: string;
  chargerName: string;
  type: "DC" | "AC";
  dateOfIssue: string;
  status: "Active" | "Expired" | "Pending";
  availability: "InUse" | "Available";
  dateOfExpiry: string;
  licenseFee: string;
}

interface IInvoiceLog {
  invoiceId: string;
  clientName: string;
  amount: string;
  date: string;
  status: string;
}

// --- MOCK DATA ---
const mockLicenseData: ILicenseLog[] = [
  {
    licenseId: "2444231",
    chargerName: "Pluguphere360kw",
    type: "DC",
    dateOfIssue: "2025-2-11",
    status: "Active",
    availability: "InUse",
    dateOfExpiry: "2025-2-11",
    licenseFee: "INR 0.0",
  },
  {
    licenseId: "2444232",
    chargerName: "Site101AC",
    type: "AC",
    dateOfIssue: "2025-1-01",
    status: "Active",
    availability: "Available",
    dateOfExpiry: "2026-1-01",
    licenseFee: "INR 500.0",
  },
  {
    licenseId: "2444233",
    chargerName: "ElectraFast",
    type: "DC",
    dateOfIssue: "2024-11-20",
    status: "Expired",
    availability: "InUse",
    dateOfExpiry: "2024-12-20",
    licenseFee: "INR 1000.0",
  },
];

const mockInvoiceData: IInvoiceLog[] = [
  {
    invoiceId: "INV1001",
    clientName: "TeslaSC",
    amount: "INR 1500",
    date: "2025-01-20",
    status: "Paid",
  },
  {
    invoiceId: "INV1002",
    clientName: "PlugUp",
    amount: "INR 500",
    date: "2025-02-15",
    status: "Pending",
  },
  {
    invoiceId: "INV1003",
    clientName: "ChargePoint",
    amount: "INR 2000",
    date: "2025-03-01",
    status: "Paid",
  },
];

// --- LICENSE TABLE COMPONENT ---
const LicenseTable = ({ data }: { data: ILicenseLog[] }) => {
  return (
    <div className="overflow-x-auto rounded-lg">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-red-900/60">
            <th className="px-4 py-3 text-left text-white font-semibold border-r border-red-800">
              License ID
            </th>
            <th className="px-4 py-3 text-left text-white font-semibold border-r border-red-800">
              Charger Name
            </th>
            <th className="px-4 py-3 text-left text-white font-semibold border-r border-red-800">
              Type
            </th>
            <th className="px-4 py-3 text-left text-white font-semibold border-r border-red-800">
              Date Of Issue
            </th>
            <th className="px-4 py-3 text-left text-white font-semibold border-r border-red-800">
              Status
            </th>
            <th className="px-4 py-3 text-left text-white font-semibold border-r border-red-800">
              Availability
            </th>
            <th className="px-4 py-3 text-left text-white font-semibold border-r border-red-800">
              Date Of Expiry
            </th>
            <th className="px-4 py-3 text-left text-white font-semibold">
              License Fee
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={row.licenseId}
              className="bg-red-900/40 hover:bg-red-900/50 transition-colors border-b border-red-800/50"
            >
              <td className="px-4 py-3 text-white border-r border-red-800/50">
                {row.licenseId}
              </td>
              <td className="px-4 py-3 text-white border-r border-red-800/50">
                {row.chargerName}
              </td>
              <td className="px-4 py-3 text-white border-r border-red-800/50">
                {row.type}
              </td>
              <td className="px-4 py-3 text-white border-r border-red-800/50">
                {row.dateOfIssue}
              </td>
              <td className="px-4 py-3 text-white border-r border-red-800/50">
                {row.status}
              </td>
              <td className="px-4 py-3 text-white border-r border-red-800/50">
                {row.availability}
              </td>
              <td className="px-4 py-3 text-white border-r border-red-800/50">
                {row.dateOfExpiry}
              </td>
              <td className="px-4 py-3 text-pink-200">{row.licenseFee}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// --- INVOICE TABLE COMPONENT ---
const InvoiceTable = ({ data }: { data: IInvoiceLog[] }) => {
  return (
    <div className="overflow-x-auto rounded-lg">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-red-900/60">
            <th className="px-4 py-3 text-left text-white font-semibold border-r border-red-800">
              Invoice ID
            </th>
            <th className="px-4 py-3 text-left text-white font-semibold border-r border-red-800">
              Client
            </th>
            <th className="px-4 py-3 text-left text-white font-semibold border-r border-red-800">
              Amount
            </th>
            <th className="px-4 py-3 text-left text-white font-semibold border-r border-red-800">
              Date
            </th>
            <th className="px-4 py-3 text-left text-white font-semibold">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.invoiceId}
              className="bg-red-900/40 hover:bg-red-900/50 transition-colors border-b border-red-800/50"
            >
              <td className="px-4 py-3 text-white border-r border-red-800/50">
                {row.invoiceId}
              </td>
              <td className="px-4 py-3 text-white border-r border-red-800/50">
                {row.clientName}
              </td>
              <td className="px-4 py-3 text-white border-r border-red-800/50">
                {row.amount}
              </td>
              <td className="px-4 py-3 text-white border-r border-red-800/50">
                {row.date}
              </td>
              <td className="px-4 py-3 text-white">{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// --- Main Component ---
export const ProtocolSelector = () => {
  const [choosen, setChoosen] = useState<"License" | "Invoice">("License");

  const buttonClasses = (protocol: "License" | "Invoice") => `
    h-10 px-6 font-semibold transition-colors
    ${
      choosen === protocol
        ? "bg-red-600 text-white z-10"
        : "bg-gray-800 text-gray-400 hover:bg-gray-700"
    }
    ${
      protocol === "License"
        ? "rounded-l-xl border-r border-red-700"
        : "rounded-r-xl"
    }
    border border-red-600 
  `;

  return (
    <div className="p-6 lg:p-10 min-h-screen bg-gradient-to-br from-black via-red-950/20 to-black">
      {/* Header/Actions Container */}
      <div className="flex items-center justify-between mb-6">
        {/* --- SEGMENTED CONTROL BUTTONS --- */}
        <div className="flex shadow-lg rounded-xl overflow-hidden">
          <button
            onClick={() => setChoosen("License")}
            className={buttonClasses("License")}
          >
            License
          </button>
          <button
            onClick={() => setChoosen("Invoice")}
            className={buttonClasses("Invoice")}
          >
            Invoice
          </button>
        </div>

        {/* --- RIGHT ACTION BUTTONS --- */}
        <div className="flex items-center gap-4">
          <FilterDialog
            onClose={() => {}}
            title="Filter"
            data={[
              { label: "Date Range", value: "" },
              { label: "Client ID", value: "" },
            ]}
          />
          <button className="h-10 w-10 rounded-xl text-black font-semibold bg-white hover:bg-gray-100 transition-colors shadow-md border border-gray-300 flex items-center justify-center">
            <ArrowDownTrayIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* --- MASTER FILTER BAR --- */}
      <div className="flex flex-wrap items-center justify-start gap-4 mb-4 border-b border-gray-700 pb-4">
        <input
          type="text"
          placeholder={choosen === "License" ? "License ID" : "Invoice ID"}
          className="h-12 py-2 px-4 text-black bg-white rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#b22828] w-40 transition-all"
        />
        <DropdownFilter
          placeholder="Types"
          options={
            choosen === "License"
              ? [
                  { value: "DC", label: "DC" },
                  { value: "AC", label: "AC" },
                ]
              : [{ value: "no option", label: "no option" }]
          }
          selectedValue=""
          onChange={() => {}}
          className="w-40 h-12"
        />
        <DropdownFilter
          placeholder="Status"
          options={
            choosen === "License"
              ? [
                  { value: "Active", label: "Active" },
                  { value: "Expired", label: "Expired" },
                  { value: "Pending", label: "Pending" },
                ]
              : [
                  { value: "Paid", label: "Paid" },
                  { value: "Pending", label: "Pending" },
                ]
          }
          selectedValue=""
          onChange={() => {}}
          className="w-40 h-12"
        />
        <button className="h-12 px-6 rounded-xl text-white font-semibold bg-[#b22828] hover:bg-red-600 transition-colors shadow-md">
          Search
        </button>
        <button className="h-12 px-6 rounded-xl text-black font-semibold bg-white hover:bg-gray-100 transition-colors shadow-md border border-gray-300">
          Clear
        </button>
      </div>

      {/* --- TABLE RENDERING --- */}
      <div className="mt-4">
        {choosen === "License" ? (
          <LicenseTable data={mockLicenseData} />
        ) : (
          <InvoiceTable data={mockInvoiceData} />
        )}
      </div>
    </div>
  );
};

export default ProtocolSelector;
