"use client";

import React, { useMemo, useState } from "react";

import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import type { CustomCellRendererProps } from "ag-grid-react";
import { AgGridReact } from "ag-grid-react";

// Register necessary modules
ModuleRegistry.registerModules([AllCommunityModule]);
type DataType = {
  adminName: string;
  companyName: string;
  roleType: string;
  roleName: string;
  chargerGroup: string;
  phoneNumber: number;
  status: string;
  actions: string; // Placeholder
  email: string;
  companyType: string;
};

// --- Mock Data ---
const useMockData = () => {
  // Mock Row Data based on the user management table screenshot
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
      actions: ".......", // Placeholder
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
      actions: ".......",
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
      actions: ".......",
      email: "Shubham@Site.com",
    },
  ];

  return { data: mockData, loading: false };
};

// Custom Cell Renderer for Phone Number (Styling to match the image)
const PhoneRenderer = (params: CustomCellRendererProps<IAdminRow>) => {
  return (
    <span className="text-red-300 font-medium hover:underline cursor-pointer">
      {params.value}
    </span>
  );
};

// Custom Cell Renderer for Actions
const ActionsRenderer = () => (
  <div className="flex items-center justify-center h-full text-white text-sm">
    <button className="text-red-300 hover:text-white font-medium">Edit</button>
    <span className="text-gray-500 mx-2">|</span>
    <button className="text-red-300 hover:text-white font-medium">
      Suspend
    </button>
  </div>
);

// Row Data Interface
interface IAdminRow {
  adminName: string;
  companyType: string;
  companyName: string;
  roleType: string;
  roleName: string;
  chargerGroup: string;
  phoneNumber: string;
  status: string;
  actions: string;
  email: string;
}

const DynamicTable = ({ newData }: { newData?: DataType[] }) => {
  const { data: rowData, loading } = useMockData();

  // Column Definitions
  const [colDefs] = useState<ColDef<IAdminRow>[]>([
    { field: "adminName", headerName: "Admin Name", width: 120 },
    { field: "companyType", headerName: "Company Type", width: 130 },
    { field: "companyName", headerName: "Company Name", width: 150 },
    { field: "roleType", headerName: "Role Type", width: 120 },
    { field: "roleName", headerName: "Role Name", width: 120 },
    { field: "chargerGroup", headerName: "Assigned Charger Group", width: 200 },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 150,
      cellRenderer: PhoneRenderer, // Using custom styling
    },
    { field: "status", headerName: "Status", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      cellRenderer: ActionsRenderer,
    },
    { field: "email", headerName: "Email", width: 200 },
  ]);

  // Apply settings across all columns
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      filter: true,
      editable: false,
      sortable: true,
      resizable: true,
      cellStyle: () => ({
        display: "flex",
        alignItems: "center",
        color: "white",
        backgroundColor: "transparent",
      }),
      headerClass: "text-white bg-[#9d3536] font-bold",
    };
  }, []);

  const themeClass = "ag-theme-alpine-dark custom-dabas-theme";

  return (
    <div style={{ height: "219px", width: "100%" }} className="mt-4">
      {/* Retain the CSS styling from the previous table for visual consistency */}
      <style jsx global>{`
        .custom-dabas-theme {
          --ag-background-color: transparent;
          --ag-header-background-color: #6d2021;
          --ag-row-hover-color: rgba(178, 40, 40, 0.7);
          --ag-border-color: #444;
          --ag-foreground-color: white;
          --ag-font-size: 14px;
          --ag-header-foreground-color: white;
          --ag-row-border-color: #333;
          --ag-row-border-style: none;
        }

        .custom-dabas-theme .ag-header-cell {
          padding-left: 10px;
          padding-right: 10px;
          font-weight: 600;
        }

        .custom-dabas-theme .ag-header-row {
          background-color: #b22828;
          height: 40px;
        }

        /* Alternating dark and light red rows */
        .custom-dabas-theme .ag-row-odd {
          background: #9d3536;
        }

        .custom-dabas-theme .ag-row-even {
          background: #6d2021;
        }

        .custom-dabas-theme .ag-row {
          background-color: transparent !important;
        }

        .custom-dabas-theme .ag-row-selected {
          background: rgba(255, 0, 0, 0.4) !important;
        }

        .custom-dabas-theme .ag-paging-panel {
          color: white;
          background-color: transparent;
        }
      `}</style>

      <AgGridReact
        className={themeClass}
        rowData={rowData}
        loading={loading}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
        rowSelection="multiple"
        animateRows={true}
        onGridReady={() => {
          console.log("Admin Grid Ready");
        }}
      />
      <div className="text-center text-white text-sm mt-3">
        Showing 1 - {rowData.length} of {rowData.length} Items
      </div>
    </div>
  );
};

export default DynamicTable;
