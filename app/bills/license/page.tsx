"use client";

import React, { useState, useMemo } from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import AgDynamicTable from "@/app/components/AgDynamicTable";

// --- INTERFACES ---
export interface ILicenseLog {
  licenseId: string;
  chargerName: string;
  type: "DC" | "AC";
  dateOfIssue: string;
  status: "Active" | "Expired" | "Pending";
  availability: "InUse" | "Available";
  dateOfExpiry: string;
  licenseFee: string;
}

export interface IInvoiceLog {
  invoiceId: string;
  clientName: string;
  amount: string;
  date: string;
  status: string;
}

// --- BUY/RENEW renderer ---
import { CustomCellRendererProps } from "ag-grid-react";
import BuyLicenseDialog from "@/app/components/dialogs/BuyLicenseDialog";
import RenewLicenseDialog from "@/app/components/dialogs/RenewDialog";

const BuyOrRenewRenderer = (params: CustomCellRendererProps<ILicenseLog>) => {
  const isPurchased = params.data?.availability === "InUse";

  return (
    <button
      onClick={() => {
        if (!params.context) return console.warn("AG Context Missing!");
        else
          return isPurchased
            ? params.context.openRenew(params.data)
            : params.context.openBuy(params.data);
      }}
      className={`px-3 py-1 rounded-lg text-sm font-semibold 
      ${
        isPurchased
          ? "bg-yellow-100 text-yellow-700"
          : "bg-green-600 text-white"
      } 
      hover:opacity-80 transition`}
    >
      {isPurchased ? "Renew License" : "Buy License"}
    </button>
  );
};

// --- MOCK DATA ---
const mockLicenseData: ILicenseLog[] = [
  {
    licenseId: "LIC_12127123000",
    chargerName: "Avani Resort (Dabas EV Charge)...",
    type: "DC",
    dateOfIssue: "2023-12-28",
    status: "Active",
    availability: "InUse",
    dateOfExpiry: "2024-12-27",
    licenseFee: "INR 0.0",
  },
  {
    licenseId: "LIC_12127123001",
    chargerName: "Aryan Hotel (Dabas EV Charge) ...",
    type: "DC",
    dateOfIssue: "2023-12-28",
    status: "Active",
    availability: "InUse",
    dateOfExpiry: "2024-12-27",
    licenseFee: "INR 0.0",
  },
  {
    licenseId: "LIC_12127123002",
    chargerName: "Mitran Da Dhaba (Dabas EV Char...",
    type: "DC",
    dateOfIssue: "2023-12-28",
    status: "Active",
    availability: "InUse",
    dateOfExpiry: "2024-12-27",
    licenseFee: "INR 0.0",
  },
  {
    licenseId: "LIC_12127123003",
    chargerName: "Hotel S.Rattan (Dabas EV Charg...",
    type: "DC",
    dateOfIssue: "2025-03-20",
    status: "Active",
    availability: "InUse",
    dateOfExpiry: "2026-03-20",
    licenseFee: "INR 0.0",
  },
  {
    licenseId: "LIC_12127123004",
    chargerName: "-",
    type: "DC",
    dateOfIssue: "-",
    status: "Active",
    availability: "Available",
    dateOfExpiry: "2024-12-27",
    licenseFee: "INR 0.0",
  },
  {
    licenseId: "LIC_12127123005",
    chargerName: "-",
    type: "DC",
    dateOfIssue: "-",
    status: "Active",
    availability: "Available",
    dateOfExpiry: "2024-12-27",
    licenseFee: "INR 0.0",
  },
  {
    licenseId: "LIC_12127123006",
    chargerName: "Aryan Hotel (Dabas EV Charge) ...",
    type: "DC",
    dateOfIssue: "2025-07-03",
    status: "Active",
    availability: "InUse",
    dateOfExpiry: "2026-07-03",
    licenseFee: "INR 0.0",
  },
  {
    licenseId: "LIC_12127123007",
    chargerName: "Pooth Haveli DC Charger Phone-...",
    type: "DC",
    dateOfIssue: "2025-05-05",
    status: "Active",
    availability: "InUse",
    dateOfExpiry: "2026-05-05",
    licenseFee: "INR 0.0",
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

// --- Main Component ---
export default function LicensePage() {
  const [choosen, setChoosen] = useState<"License" | "Invoice">("License");
  const [licenseIdFilter, setLicenseIdFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [openBuy, setOpenBuy] = useState<ILicenseLog | null>(null);
  const [openRenew, setOpenRenew] = useState<ILicenseLog | null>(null);

  // License columns for AG Grid
  const licenseColumns = useMemo(
    () => [
      { field: "licenseId", headerName: "License ID", width: 180 },
      { field: "chargerName", headerName: "Charger Name", width: 260 },
      { field: "type", headerName: "Type", width: 100 },
      { field: "dateOfIssue", headerName: "Date of Issue", width: 130 },
      { field: "status", headerName: "Status", width: 120 },
      { field: "availability", headerName: "Availability", width: 130 },
      { field: "dateOfExpiry", headerName: "Date of Expiry", width: 130 },
      { field: "licenseFee", headerName: "License Fee", width: 120 },
      {
        field: "action",
        headerName: "Buy / Renew",
        width: 160,
        cellRenderer: BuyOrRenewRenderer,
      },
    ],
    []
  );

  // Invoice columns for AG Grid
  const invoiceColumns = useMemo(
    () => [
      {
        field: "invoiceId",
        headerName: "Invoice ID",
        width: 180,
      },
      {
        field: "clientName",
        headerName: "Client",
        width: 250,
      },
      {
        field: "amount",
        headerName: "Amount",
        width: 150,
      },
      {
        field: "date",
        headerName: "Date",
        width: 150,
      },
      {
        field: "status",
        headerName: "Status",
        width: 120,
      },
    ],
    []
  );

  const buttonClasses = (protocol: "License" | "Invoice") => `
    h-10 px-6 font-semibold transition-colors
    ${
      choosen === protocol
        ? "bg-red-600 text-white z-10"
        : "bg-white text-gray-700 hover:bg-gray-100"
    }
    ${protocol === "License" ? "rounded-l-xl" : "rounded-r-xl"}
    border border-gray-300
  `;

  // Calculate totals
  const totalLicenseAC = mockLicenseData.filter((l) => l.type === "AC").length;
  const totalLicenseDC = mockLicenseData.filter((l) => l.type === "DC").length;

  return (
    <div className="p-6 lg:px-40 min-h-screen bg-transparent">
      {/* Stats Cards */}
      <div className="flex gap-4 mb-6">
        <div className="bg-white/70 rounded-xl shadow-md px-6 py-4 border border-gray-200">
          <div className="text-sm text-gray-500">Total License AC</div>
          <div className="text-2xl font-bold">{totalLicenseAC}</div>
        </div>
        <div className="bg-white/70 rounded-xl shadow-md px-6 py-4 border border-gray-200">
          <div className="text-sm text-gray-500">Total License DC</div>
          <div className="text-2xl font-bold">{totalLicenseDC}</div>
        </div>
      </div>

      {/* Header/Actions Container */}
      <div className="flex items-center justify-between mb-6">
        {/* --- SEGMENTED CONTROL BUTTONS --- */}
        <div className="flex shadow-md rounded-xl overflow-hidden">
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
          <button className="h-10 w-10 rounded-xl text-black font-semibold bg-white hover:bg-gray-100 transition-colors shadow-md border border-gray-300 flex items-center justify-center">
            📋
          </button>
          <button className="h-10 w-10 rounded-xl text-black font-semibold bg-white hover:bg-gray-100 transition-colors shadow-md border border-gray-300 flex items-center justify-center">
            <ArrowDownTrayIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* --- FILTER BAR --- */}
      <div className="flex flex-wrap items-center justify-start gap-4 mb-4">
        <input
          type="text"
          placeholder={choosen === "License" ? "License Id" : "Invoice ID"}
          value={licenseIdFilter}
          onChange={(e) => setLicenseIdFilter(e.target.value)}
          className="h-12 py-2 px-4 text-black bg-white rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 w-48 transition-all"
        />

        {choosen === "License" && (
          <>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="h-12 py-2 px-4 text-gray-700 bg-white rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 w-48 transition-all"
            >
              <option value="">Type of License</option>
              <option value="DC">DC</option>
              <option value="AC">AC</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-12 py-2 px-4 text-gray-700 bg-white rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 w-48 transition-all"
            >
              <option value="">Status</option>
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
              <option value="Pending">Pending</option>
            </select>

            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="h-12 py-2 px-4 text-gray-700 bg-white rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 w-48 transition-all"
            >
              <option value="">Availability</option>
              <option value="InUse">In Use</option>
              <option value="Available">Available</option>
            </select>
          </>
        )}

        <button className="h-12 px-6 rounded-xl text-white font-semibold bg-red-600 hover:bg-red-700 transition-colors shadow-md">
          Search
        </button>
        <button
          onClick={() => {
            setLicenseIdFilter("");
            setTypeFilter("");
            setStatusFilter("");
            setAvailabilityFilter("");
          }}
          className="h-12 px-6 rounded-xl text-black font-semibold bg-white hover:bg-gray-100 transition-colors shadow-md border border-gray-300"
        >
          Clear
        </button>
      </div>

      {/* --- AG GRID TABLE --- */}
      <div className="mt-4 bg-transparent rounded-xl shadow-md p-4">
        <AgDynamicTable
          columns={choosen === "License" ? licenseColumns : invoiceColumns}
          rowData={choosen === "License" ? mockLicenseData : mockInvoiceData}
          context={{
            openBuy: (row: ILicenseLog) => setOpenBuy(row),
            openRenew: (row: ILicenseLog) => setOpenRenew(row),
          }}
          gridOptions={{
            rowSelection: "multiple",
            suppressRowClickSelection: true,
          }}
        />

        {/* Dialog Mount */}
        <BuyLicenseDialog
          open={!!openBuy}
          data={openBuy}
          onClose={() => setOpenBuy(null)}
        />

        <RenewLicenseDialog
          open={!!openRenew}
          data={openRenew}
          onClose={() => setOpenRenew(null)}
        />
      </div>
    </div>
  );
}
