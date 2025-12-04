"use client";

import { useEffect, useState } from "react";

type TableType = "admin" | "roles" | "groups";

export default function useUserTables(type: TableType) {
  const [columns, setColumns] = useState<unknown[]>([]);
  const [rows, setRows] = useState<unknown[]>([]);
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
            },
          ]);
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
              flex: 1,
            },
          ]);

          setRows([
            {
              roleType: "Default",
              roleName: "Admin",
              companyType: "CPO",
              companyName: "PLUGUP",
              active: "0",
            },
          ]);
        }

        if (type === "groups") {
          setColumns([
            { headerName: "Group Name", field: "groupName", width: 180 },
            { headerName: "Company Type", field: "companyType", width: 140 },
            { headerName: "Company Name", field: "companyName", width: 160 },
            { headerName: "Parameter", field: "parameter", width: 150 },
            { headerName: "Value", field: "value", flex: 1 },
          ]);

          setRows([
            {
              groupName: "West Hub",
              companyType: "CPO",
              companyName: "PLUGUP",
              parameter: "Permission",
              value: "Read / Write",
            },
          ]);
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
