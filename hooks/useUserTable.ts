"use client";

// Assuming RowType is defined in ../user/admin/page as a union of the specific row types below
import { RowType } from "@/app/user/admin/page";
import { ColumnType } from "@/lib/agGrid";
import { useEffect, useState } from "react";

// --- Defining specific Row Types to resolve object literal type errors ---
// This ensures that the data objects being created match their intended schema,
// and that they are compatible with the general 'RowType' union.
const AgGridRowDefs = [];
export interface AdminRow {
  adminName: string;
  companyType: string;
  companyName: string;
  roleType: string;
  roleName: string;
  chargerGroup: string;
  phoneNumber: string;
  status: string;
  email: string;
}

export interface RoleRow {
  roleType: string;
  roleName: string;
  companyType: string;
  companyName: string;
  active: string; // Corresponds to "No. of active Admins"
}

export interface GroupRow {
  groupName: string;
  companyType: string;
  companyName: string;
  parameter: string;
  value: string;
}

// --------------------------------------------------------------------------

type TableType = "admin" | "roles" | "groups";

export default function useUserTables(type: TableType) {
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [rows, setRows] = useState<RowType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        // -------------------------------------------
        // 🔥 You can plug real APIs here later
        // -------------------------------------------

        if (type === "admin") {
          setColumns([
            { headerName: "Admin Name", field: "adminName", width: 160 },
            { headerName: "Company Type", field: "companyType", width: 140 },
            { headerName: "Company Name", field: "companyName", width: 160 },
            { headerName: "Role Type", field: "roleType", width: 140 },
            { headerName: "Role Name", field: "roleName", width: 160 },
            { headerName: "Assigned Group", field: "chargerGroup", width: 180 },
            { headerName: "Phone", field: "phoneNumber", width: 130 },
            { headerName: "Status", field: "status", width: 120 },
            { headerName: "Email", field: "email", width: 200 },
          ]);

          // Cleaned up the type assertion to a single cast to RowType[]
          setRows([
            {
              adminName: "Usha",
              companyType: "CPO",
              companyName: "PLUGUP",
              roleType: "Default",
              roleName: "Admin",
              chargerGroup: "No Group Assigned",
              phoneNumber: "6474773447",
              status: "Active",
              email: "usha@plugup.com",
            }, // Asserting individual object to AdminRow first
          ] as typeof AgGridRowDefs);
        }

        if (type === "roles") {
          setColumns([
            { headerName: "Role Type", field: "roleType", width: 140 },
            { headerName: "Role Name", field: "roleName", width: 160 },
            { headerName: "Company Type", field: "companyType", width: 140 },
            { headerName: "Company Name", field: "companyName", width: 160 },
            {
              headerName: "No. of active Admins",
              field: "active",
            },
          ]);

          // Cleaned up the type assertion to a single cast to RowType[]
          setRows([
            {
              roleType: "Default",
              roleName: "Admin",
              companyType: "CPO",
              companyName: "PLUGUP",
              active: "0",
            }, // Asserting individual object to RoleRow first
          ] as typeof AgGridRowDefs);
        }

        if (type === "groups") {
          setColumns([
            { headerName: "Group Name", field: "groupName", width: 180 },
            { headerName: "Company Type", field: "companyType", width: 140 },
            { headerName: "Company Name", field: "companyName", width: 160 },
            { headerName: "Parameter", field: "parameter", width: 150 },
            { headerName: "Value", field: "value" },
          ]);

          // Cleaned up the type assertion to a single cast to RowType[]
          setRows([
            {
              groupName: "West Hub",
              companyType: "CPO",
              companyName: "PLUGUP",
              parameter: "Permission",
              value: "Read / Write",
            } as GroupRow, // Asserting individual object to GroupRow first
          ] as typeof AgGridRowDefs);
        }
      } catch (err) {
        console.error("User table hook error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [type]);

  return { columns, rows, loading };
}
