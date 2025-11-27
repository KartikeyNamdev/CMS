"use client";

import React from "react";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";

// --- MOCK DATA ---
const mockData = [
  {
    adminName: "Usha",
    companyType: "CPO",
    companyName: "PLUGUP",
    roleType: "Default",
    roleName: "Admin",
    chargerGroup: "No Group Assigned",
    phoneNumber: "6474773447",
    status: "Active",
    email: "Xyz@Gmail.Com",
  },
  {
    adminName: "Kartikey",
    companyType: "EMSP",
    companyName: "Electra",
    roleType: "Custom",
    roleName: "Operator",
    chargerGroup: "West Hub",
    phoneNumber: "9876543210",
    status: "Inactive",
    email: "Kartikey@Dabas.com",
  },
  {
    adminName: "Shubham",
    companyType: "Host",
    companyName: "Site 101",
    roleType: "Custom",
    roleName: "Guard",
    chargerGroup: "South Zone",
    phoneNumber: "8881234567",
    status: "Active",
    email: "Shubham@Site.com",
  },
];

// --- COLUMN DEFINITIONS (used for headers) ---
const headers = [
  { key: "adminName", label: "Admin Name" },
  { key: "companyType", label: "Company Type" },
  { key: "companyName", label: "Company Name" },
  { key: "roleType", label: "Role Type" },
  { key: "roleName", label: "Role Name" },
  { key: "chargerGroup", label: "Assigned Charger Group" },
  { key: "phoneNumber", label: "Phone Number" },
  { key: "status", label: "Status" },
  { key: "email", label: "Email" },
  { key: "actions", label: "Actions" }, // Custom column
];

// --- RENDERERS ---

const renderPhoneNumber = (number: string) => (
  <span className="text-red-300 font-medium hover:underline cursor-pointer">
    {number}
  </span>
);

const renderActions = () => (
  <div className="flex items-center justify-center h-full text-sm">
    <button className="text-red-300 hover:text-white font-medium">Edit</button>
    <span className="text-gray-500 mx-2">|</span>
    <button className="text-red-300 hover:text-white font-medium">
      Suspend
    </button>
  </div>
);

const DynamicTable = () => {
  return (
    <div className="w-full text-white overflow-x-auto rounded-lg shadow-xl border border-gray-700/50">
      <style jsx global>{`
        /* --- Custom Dark Red Table Styling --- */
        .custom-table th {
          background-color: #b22828; /* Header background */
          color: white;
          height: 40px;
          padding: 10px 12px;
          text-align: left;
          font-weight: 600;
          font-size: 14px;
        }

        /* Alternating row colors matching the Ag-Grid theme */
        .custom-table tbody tr:nth-child(odd) {
          background-color: #9d3536; /* Darker Red */
        }
        .custom-table tbody tr:nth-child(even) {
          background-color: #6d2021; /* Deepest Red */
        }
        .custom-table td {
          padding: 8px 12px;
          font-size: 13px;
          height: 40px;
          white-space: nowrap;
        }
        .custom-table tbody tr:hover {
          background-color: rgba(178, 40, 40, 0.7); /* Hover effect */
        }
        .custom-table {
          min-width: 1200px; /* Ensures minimum width for all columns */
          border-collapse: collapse;
        }
      `}</style>
      <table className="custom-table w-full">
        {/* --- Table Header --- */}
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header.key}>
                <div className="flex items-center gap-1">
                  {header.label}
                  {/* Sorting icon placeholder */}
                  {header.key !== "actions" && (
                    <div className="flex flex-col text-gray-300 ml-1">
                      <ArrowUpIcon className="w-3 h-3 -mb-1 cursor-pointer hover:text-white" />
                      <ArrowDownIcon className="w-3 h-3 cursor-pointer hover:text-white" />
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        {/* --- Table Body --- */}
        <tbody>
          {mockData.map((row, index) => (
            <tr key={index} className="text-gray-200">
              {headers.map((header) => (
                <td key={header.key}>
                  {/* Conditional Rendering based on the column key */}
                  {header.key === "phoneNumber"
                    ? renderPhoneNumber(row[header.key])
                    : header.key === "actions"
                    ? renderActions()
                    : // Default rendering for standard fields
                      row[header.key as keyof typeof row]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* --- Footer/Pagination Placeholder --- */}
      <div className="p-3 text-center text-white text-sm bg-transparent rounded-b-lg border border-gray-400/50">
        Showing 1 - {mockData.length} of {mockData.length} Items
      </div>
    </div>
  );
};

export default DynamicTable;
