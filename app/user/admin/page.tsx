"use client"; // Corrected directive

import React, { useState } from "react";
import DropdownFilter from "@/app/components/DropdownFilter";
// Corrected dialog import
import AgDynamicTable from "@/app/components/AgDynamicTable"; // Assuming this is AgDynamicTable
import DynamicTable from "@/app/components/DynamicTable"; // Assuming this is DynamicTable
import { Input } from "@/components/ui/input";
import { ArrowDownTrayIcon, PlusIcon } from "@heroicons/react/24/solid";
import useUserTables from "@/hooks/useUserTable";
import RoleDetailsDialog from "@/app/components/dialogs/RoleDetailsDialog";
import { AddAdminDialog, AddGroupDialog } from "@/app/components/DynamicDialog";

/* ---------------------------------------------------
   Mock Filter Options (RETAINED)
--------------------------------------------------- */
const StatusTypeOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];
const CompanyTypeOptions = [
  { value: "cpo", label: "CPO" },
  { value: "Host", label: "Host" },
  { value: "Investor", label: "Investor" },
];
const RoleTypeOptions = [
  { value: "default", label: "Default" },
  { value: "custom", label: "Custom" },
];
export function RoleActionsRenderer(params: any) {
  return (
    <button
      onClick={() => params.context.openRole(params.data)}
      className="px-3 py-1 rounded-lg bg-[#b22828] text-white text-sm"
    >
      View Role
    </button>
  );
}

/* ---------------------------------------------------
   ADMIN VIEW (RETAINED)
--------------------------------------------------- */
const AdminView = ({ setAddAdminOpen, isAddAdminOpen }) => {
  const [columnFilter, setColumnFilter] = useState("");
  const [roleType, setRoleType] = useState("");
  const { columns, rows, loading } = useUserTables("admin");

  const AddAdminButton = (
    <button
      className="h-12 px-4 rounded-xl text-white font-semibold bg-[#b22828] hover:bg-red-600 transition shadow-md flex items-center gap-2 w-40"
      onClick={() => setAddAdminOpen(true)}
    >
      <PlusIcon className="w-5 h-5" />
      Add Admin
    </button>
  );

  return (
    <div className="text-gray-400">
      <div className="mb-8 border-b border-gray-700 pb-4">
        {/* FILTERS ROW (RETAINED) */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Admin Name"
            className="h-12 px-4 bg-white text-black border border-gray-300 rounded-xl shadow-md w-40"
          />
          <input
            type="text"
            placeholder="Phone / Email"
            className="h-12 px-4 bg-white text-black border border-gray-300 rounded-xl shadow-md w-40"
          />
          <DropdownFilter
            placeholder="Company Type"
            options={CompanyTypeOptions}
            selectedValue=""
            onChange={() => {}}
            className="w-42 h-12"
          />
          <Input
            placeholder="Company Name"
            onChange={() => {}}
            className="w-40 h-12 bg-white"
          />
          <DropdownFilter
            placeholder="Role Type"
            options={RoleTypeOptions}
            selectedValue={roleType}
            onChange={setRoleType}
            className="w-40 h-12"
          />
          <input
            type="text"
            placeholder="Role Name"
            className="h-12 px-4 bg-white text-black border border-gray-300 rounded-xl shadow-md w-40"
          />
          <DropdownFilter
            placeholder="Status"
            options={StatusTypeOptions}
            selectedValue=""
            onChange={() => {}}
            className="w-40 h-12"
          />
        </div>

        {/* ACTION ROW (RETAINED) */}
        <div className="flex flex-wrap items-center gap-4">
          <DropdownFilter
            placeholder="Charger Group Assigned"
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
            selectedValue={columnFilter}
            onChange={setColumnFilter}
            className="w-84 h-12"
          />
          <button className="h-12 px-4 bg-[#b22828] text-white rounded-xl shadow-md hover:bg-red-600">
            Search
          </button>
          <button className="h-12 px-4 bg-white text-black border border-gray-300 rounded-xl shadow-md">
            Clear
          </button>

          {/* Dialog Trigger - FIXED: open prop should be boolean, not function */}
          <AddAdminDialog
            triggerButton={AddAdminButton}
            open={isAddAdminOpen}
            onClose={() => setAddAdminOpen(false)}
          />
        </div>
      </div>

      {/* {loading ? ... } */}
    </div>
  );
};

/* ---------------------------------------------------
   ROLES VIEW
--------------------------------------------------- */
const RolesView = ({ setAddRoleOpen, isAddRoleOpen }) => {
  const { columns, rows } = useUserTables("roles");
  const [openRoleData, setOpenRoleData] = useState<any | null>(null);

  const updatedColumns = [
    ...columns,
    {
      headerName: "Actions",
      width: 140,
      cellRenderer: RoleActionsRenderer,
    },
  ];

  // 1. Define the button used to trigger the Add Role Dialog
  const AddRoleButton = (
    <button
      className="h-12 px-6 rounded-xl text-white font-semibold bg-[#b22828] hover:bg-red-600 transition shadow-md flex items-center gap-2"
      onClick={() => setAddRoleOpen(true)} // <-- This is the crucial trigger
    >
      <PlusIcon className="w-5 h-5" />
      Add Custom Role
    </button>
  );

  return (
    <div className="text-gray-400">
      {/* filters remain same */}

      <AgDynamicTable
        columns={updatedColumns}
        rowData={rows}
        context={{ openRole: (row) => setOpenRoleData(row) }}
      />

      <RoleDetailsDialog
        open={!!openRoleData}
        data={openRoleData}
        onClose={() => setOpenRoleData(null)}
      />

      {/* Filters/Actions section is missing but assumed to be here */}
      <div className="flex flex-wrap items-center justify-end gap-4 mt-4 pb-2">
        {/* FIX: Replacing Link/Button combination with the Dialog Component */}
        <AddAdminDialog
          triggerButton={AddRoleButton} // Uses the button defined above
          open={isAddRoleOpen}
          onClose={() => setAddRoleOpen(false)}
        />
      </div>
    </div>
  );
};

/* ---------------------------------------------------
   GROUPS VIEW (RETAINED)
--------------------------------------------------- */
const GroupsView = ({ setAddGroupOpen, isAddGroupOpen }) => {
  const [groupName, setGroupName] = useState("");
  const [paramFilter, setParamFilter] = useState("");

  const ParameterOptions = [
    { value: "charger_group", label: "Charger Group" },
    { value: "permission", label: "Permission" },
  ];

  const AddGroupButton = (
    <button
      className="h-12 px-6 bg-[#b22828] text-white rounded-xl shadow-md hover:bg-red-600 flex items-center gap-2"
      onClick={() => setAddGroupOpen(true)}
    >
      <PlusIcon className="w-5 h-5" />
      Add Custom Group
    </button>
  );

  return (
    <div className="text-gray-600">
      <div className="mb-8 border-b border-gray-700 pb-4 flex flex-wrap justify-between gap-4">
        <div className="flex flex-wrap gap-4">
          <input
            placeholder="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="h-12 w-40 bg-white text-black border border-gray-300 rounded-xl shadow-md px-4"
          />

          <DropdownFilter
            placeholder="Company Type"
            options={CompanyTypeOptions}
            selectedValue=""
            onChange={() => {}}
            className="w-40 h-12"
          />

          <DropdownFilter
            placeholder="Company Name"
            options={CompanyTypeOptions}
            selectedValue=""
            onChange={() => {}}
            className="w-40 h-12"
          />

          <DropdownFilter
            placeholder="Parameter"
            options={ParameterOptions}
            selectedValue={paramFilter}
            onChange={setParamFilter}
            className="w-40 h-12"
          />

          <button className="h-12 px-6 bg-[#b22828] text-white rounded-xl shadow-md">
            Search
          </button>

          <button className="h-12 px-6 bg-white border border-gray-300 rounded-xl shadow-md text-black">
            Clear
          </button>
        </div>

        <div className="flex gap-4">
          <button className="h-12 w-12 bg-white border border-gray-300 rounded-xl shadow-md flex items-center justify-center">
            <ArrowDownTrayIcon className="w-5 h-5" />
          </button>

          {/* FIXED: open prop should be boolean, not function */}
          <AddGroupDialog
            triggerButton={AddGroupButton}
            open={isAddGroupOpen}
            onClose={() => setAddGroupOpen(false)}
          />
        </div>
      </div>

      <DynamicTable />
    </div>
  );
};

/* ---------------------------------------------------
   MAIN SEGMENTED CONTROL (RETAINED)
--------------------------------------------------- */
export const UserSegmentedControl = () => {
  const [addAdminOpen, setAddAdminOpen] = useState(false);
  const [addRoleOpen, setAddRoleOpen] = useState(false);
  const [addGroupOpen, setAddGroupOpen] = useState(false);

  // FIXED: Renamed 'choosen' to 'chosen' (proper spelling)
  const [chosen, setChosen] = useState<"admin" | "roles" | "groups">("admin");

  const buttonClasses = (key: "admin" | "roles" | "groups", index: number) => {
    const isActive = chosen === key;

    let base =
      "h-10 px-6 font-semibold border border-[#b22828] shadow-md transition-colors";

    base += isActive
      ? " bg-red-600 text-white"
      : " bg-gray-200 text-black hover:bg-gray-400 hover:text-white";

    if (index === 0) base += " rounded-l-xl";
    else if (index === 1) base += " rounded-r-xl -ml-[1px]";
    else base += " rounded-none -ml-[1px]";

    return base;
  };

  const protocols: { name: string; key: "admin" | "roles" | "groups" }[] = [
    { name: "Admin", key: "admin" },
    { name: "Roles", key: "roles" },
    // { name: "Groups", key: "groups" },
  ];

  return (
    <div className="p-6 lg:px-55 min-h-screen w-full">
      {/* SEGMENTED CONTROL */}
      <div className="flex justify-start mb-8">
        <div className="flex shadow-lg rounded-xl">
          {protocols.map((p, i) => (
            <button
              key={p.key}
              onClick={() => setChosen(p.key)}
              className={buttonClasses(p.key, i)}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* CONDITIONAL RENDERING */}
      <div className="mt-4">
        {chosen === "admin" && (
          <AdminView
            setAddAdminOpen={setAddAdminOpen}
            isAddAdminOpen={addAdminOpen}
          />
        )}

        {chosen === "roles" && (
          <RolesView
            setAddRoleOpen={setAddRoleOpen}
            isAddRoleOpen={addRoleOpen}
          />
        )}

        {chosen === "groups" && (
          <GroupsView
            setAddGroupOpen={setAddGroupOpen}
            isAddGroupOpen={addGroupOpen}
          />
        )}
      </div>
    </div>
  );
};

export default UserSegmentedControl;
