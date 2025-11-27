"use client"; // Corrected directive

import DropdownFilter from "@/app/components/DropdownFilter";
import { AddAdminDialog, AddGroupDialog } from "@/app/components/DynamicDialog";
import DynamicTable from "@/app/components/DynamicTable";
import { Input } from "@/components/ui/input";
import { ArrowDownTrayIcon, PlusIcon } from "@heroicons/react/24/solid";
// --- DIALOG IMPORTS ---

import { useRouter } from "next/navigation";
import React, { useState } from "react";

// Mock Data Options (reused from AdminView, with adjusted focus for Roles)
const StatusTypeOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];
const CompanyTypeOptions = [
  { value: "cpo", label: "CPO" },
  { value: "emsp", label: "EMSP" },
  { value: "host", label: "Host" },
];
const RoleTypeOptions = [
  { value: "default", label: "Default" },
  { value: "custom", label: "Custom" },
];

// --- ADMIN VIEW ---
const AdminView = ({ setAddAdminOpen, isAddAdminOpen }) => {
  const navigate = useRouter();
  const [columnFilter, setColumnFilter] = useState("");
  const [roleType, setRoleType] = useState("");

  // Define the trigger button element for the Add Admin Dialog
  const AddAdminButton = (
    <button
      className={`h-12 px-4 rounded-xl text-white font-semibold bg-[#b22828] hover:bg-red-600 transition-colors shadow-md flex items-center gap-2 w-40`}
      onClick={() => setAddAdminOpen(true)} // <-- OPEN DIALOG
    >
      <PlusIcon className="w-5 h-5" />
      Add Admin
    </button>
  );

  return (
    <div className=" text-gray-400">
      <div className="mb-8 border-b border-gray-700 pb-4">
        {/* ... Filter Row content ... */}
        <div className="flex flex-wrap items-center justify-start gap-4 mb-4">
          {/* Inputs/Dropdowns */}
          <input
            type="text"
            placeholder="Admin Name"
            className={`h-12 py-2 px-4 text-black bg-white rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#b22828] w-40 transition-all`}
          />
          <input
            type="text"
            placeholder="Phone / Email"
            className={`h-12 py-2 px-4 text-black bg-white rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#b22828] w-40 transition-all`}
          />
          <DropdownFilter
            placeholder="Company Type"
            options={CompanyTypeOptions}
            selectedValue={""}
            onChange={() => {}}
            className={`w-42 h-12`}
          />
          <DropdownFilter
            placeholder="Company Name"
            options={CompanyTypeOptions}
            selectedValue={""}
            onChange={() => {}}
            className={`w-40 h-12`}
          />
          <DropdownFilter
            placeholder="Role Type"
            options={RoleTypeOptions}
            selectedValue={roleType}
            onChange={setRoleType}
            className={`w-40 h-12`}
          />
          <input
            type="text"
            placeholder="Role Name"
            className={`h-12 py-2 px-4 text-black bg-white rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#b22828] w-40 transition-all`}
          />
          <DropdownFilter
            placeholder="Status"
            options={StatusTypeOptions}
            selectedValue={""}
            onChange={() => {}}
            className={`w-40 h-12`}
          />
        </div>

        {/* Action Row */}
        <div className="flex flex-wrap items-center justify-Start gap-4 mt-4 pb-2">
          <DropdownFilter
            placeholder="Chat Group Assigned"
            options={CompanyTypeOptions}
            selectedValue={columnFilter}
            onChange={setColumnFilter}
            className={`w-84 h-12`}
          />
          <div className="">
            <button
              className={`h-12 px-2.5 rounded-xl text-white font-semibold bg-[#b22828] hover:bg-red-600 transition-colors shadow-md w-20`}
            >
              Search
            </button>
          </div>
          <button
            className={`h-12 px-4 rounded-xl text-black font-semibold bg-white hover:bg-gray-100 transition-colors shadow-md border border-gray-300`}
          >
            Clear
          </button>

          {/* ADD ADMIN BUTTON TRIGGER */}
          <AddAdminDialog triggerButton={AddAdminButton} />
        </div>
      </div>
      <DynamicTable />

      {/* DIALOG RENDERING */}
      {isAddAdminOpen && (
        <AddAdminDialog
          // Render the full dialog when state is true
          triggerButton={<div />} // Trigger is already rendered
          onClose={() => setAddAdminOpen(false)}
        />
      )}
    </div>
  );
};

// --- ROLES VIEW ---
const RolesView = ({ setAddRoleOpen, isAddRoleOpen }) => {
  const [columnFilter, setColumnFilter] = useState("");
  const [roleType, setRoleType] = useState("");

  const AddRoleButton = (
    <button
      className={`h-12 px-6 rounded-xl text-white font-semibold bg-[#b22828] hover:bg-red-600 transition-colors shadow-md flex items-center gap-2`}
      onClick={() => setAddRoleOpen(true)} // <-- OPEN DIALOG
    >
      <PlusIcon className="w-5 h-5" />
      Add Custom Role
    </button>
  );

  return (
    <div className="text-gray-400">
      <div className="mb-8 border-b border-gray-700 pb-4">
        {/* Filter Row */}
        <div className="flex flex-wrap items-center justify-start gap-4 ">
          {/* Company Type Dropdown */}
          <DropdownFilter
            placeholder="Company Type"
            options={CompanyTypeOptions}
            selectedValue={""}
            onChange={() => {}}
            className={`w-50 h-12`}
          />
          <Input
            placeholder="Company Name"
            onChange={() => {}}
            className={`h-12 py-2 px-4 text-black bg-white rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#b22828] w-40 transition-all`}
          />
          <DropdownFilter
            placeholder="Role Type"
            options={RoleTypeOptions}
            selectedValue={roleType}
            onChange={setRoleType}
            className={`w-40 h-12`}
          />
          <input
            type="text"
            placeholder="Role Name"
            className={`h-12 py-2 px-4 text-black bg-white rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#b22828] w-40 transition-all`}
          />
          <button
            className={`h-12 px-6 rounded-xl text-white font-semibold bg-[#b22828] hover:bg-red-600 transition-colors shadow-md`}
          >
            Search
          </button>
          <button
            className={`h-12 px-6 rounded-xl text-black font-semibold bg-white hover:bg-gray-100 transition-colors shadow-md border border-gray-300`}
          >
            Clear
          </button>
          <div className="ml-auto flex gap-4">
            {/* ADD ROLE BUTTON TRIGGER */}
            <AddAdminDialog triggerButton={AddRoleButton} />
          </div>
        </div>
      </div>
      <DynamicTable />

      {/* DIALOG RENDERING */}
      {isAddRoleOpen && (
        <AddAdminDialog
          title="Add Custom Role" // Reusing Admin dialog structure for role creation
          data={[{ label: "Role Name", placeholder: "Enter Role Name" }]}
          triggerButton={<div />}
          onClose={() => setAddRoleOpen(false)}
        />
      )}
    </div>
  );
};

// --- GROUPS VIEW ---
const GroupsView = ({ setAddGroupOpen, isAddGroupOpen }) => {
  const [groupName, setGroupName] = useState("");
  const [paramFilter, setParamFilter] = useState("");

  const ParameterOptions = [
    { value: "charger_group", label: "Charger Group" },
    { value: "permission", label: "Permission" },
  ];

  // Define the trigger button element for the Add Group Dialog
  const AddGroupButton = (
    <button
      className={`h-12 px-6 rounded-xl text-white font-semibold bg-[#b22828] hover:bg-red-600 transition-colors shadow-md flex items-center gap-2`}
      onClick={() => setAddGroupOpen(true)} // <-- OPEN DIALOG
    >
      <PlusIcon className="w-5 h-5" />
      Add Custom Group
    </button>
  );

  return (
    <div className="text-gray-400">
      {/* 🚨 FIX: MERGE FILTER AND ACTION ROWS INTO A SINGLE FLEX CONTAINER */}
      <div className="mb-8 border-b border-gray-700 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* --- LEFT GROUP: FILTERS + SEARCH/CLEAR --- */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Filter content */}
            <input
              type="text"
              placeholder="Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className={`h-12 py-2 px-4 text-black bg-white rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#b22828] w-40 transition-all`}
            />
            <DropdownFilter
              placeholder="Company Type"
              options={CompanyTypeOptions}
              selectedValue={""}
              onChange={() => {}}
              className={`w-40 h-12`}
            />
            <DropdownFilter
              placeholder="Company Name"
              options={CompanyTypeOptions}
              selectedValue={""}
              onChange={() => {}}
              className={`w-40 h-12`}
            />
            <DropdownFilter
              placeholder="Parameter"
              options={ParameterOptions}
              selectedValue={paramFilter}
              onChange={setParamFilter}
              className={`w-40 h-12`}
            />
            <button
              className={`h-12 px-6 rounded-xl text-white font-semibold bg-[#b22828] hover:bg-red-600 transition-colors shadow-md`}
            >
              Search
            </button>
            <button
              className={`h-12 px-6 rounded-xl text-black font-semibold bg-white hover:bg-gray-100 transition-colors shadow-md border border-gray-300`}
            >
              Clear
            </button>
          </div>

          {/* --- RIGHT GROUP: ACTIONS (Pushed to the far right) --- */}
          <div className="flex gap-4">
            {/* Download Button (Icon Only - placeholder) */}
            <button
              className={`h-12 w-12 rounded-xl text-black font-semibold bg-white hover:bg-gray-100 transition-colors shadow-md border border-gray-300 flex items-center justify-center`}
            >
              <ArrowDownTrayIcon className="w-5 h-5" />
            </button>

            {/* ADD CUSTOM GROUP BUTTON TRIGGER */}
            <AddGroupDialog triggerButton={AddGroupButton} />
          </div>
        </div>
      </div>
      <DynamicTable />

      {/* DIALOG RENDERING */}
      {isAddGroupOpen && (
        <AddGroupDialog
          triggerButton={<div />}
          onClose={() => setAddGroupOpen(false)}
        />
      )}
    </div>
  );
};

// --- MAIN SEGMENTED CONTROL ---
export const UserSegmentedControl = () => {
  // Use three separate state hooks to control the visibility of each dialog
  const [addAdminOpen, setAddAdminOpen] = useState(false);
  const [addRoleOpen, setAddRoleOpen] = useState(false);
  const [addGroupOpen, setAddGroupOpen] = useState(false);

  const [choosen, setChoosen] = useState<"admin" | "roles" | "groups">("admin");
  type Protocol = "admin" | "roles" | "groups";

  const buttonClasses = (protocol: Protocol, index: number) => {
    const isChosen = choosen === protocol;

    let classes = `h-10 px-6 font-semibold transition-colors relative z-10 
                   border border-[#b22828] shadow-md whitespace-nowrap`;

    classes += isChosen
      ? " bg-red-600 text-white"
      : " bg-gray-800 text-gray-400 hover:bg-red-700/50";

    if (index === 0) {
      classes += " rounded-l-xl rounded-r-none";
    } else if (index === 2) {
      classes += " rounded-r-xl rounded-l-none -ml-[1px]";
    } else {
      classes += " rounded-none -ml-[1px]";
    }
    return classes;
  };

  const protocols: { name: string; key: Protocol }[] = [
    { name: "Admin", key: "admin" },
    { name: "Roles", key: "roles" },
    { name: "Groups", key: "groups" },
  ];

  return (
    <div className="p-6 lg:px-55 min-h-screen w-full">
      {/* SEGMENTED CONTROL BUTTONS */}
      <div className="flex justify-start mb-8">
        <div className="flex shadow-lg rounded-xl">
          {protocols.map((protocol, index) => (
            <button
              key={protocol.key}
              onClick={() => setChoosen(protocol.key)}
              className={buttonClasses(protocol.key, index)}
            >
              {protocol.name}
            </button>
          ))}
        </div>
      </div>

      {/* CONDITIONAL CONTENT RENDERING */}
      <div className="mt-4">
        {choosen === "admin" && (
          <AdminView
            setAddAdminOpen={setAddAdminOpen}
            isAddAdminOpen={addAdminOpen}
          />
        )}
        {choosen === "roles" && (
          <RolesView
            setAddRoleOpen={setAddRoleOpen}
            isAddRoleOpen={addRoleOpen}
          />
        )}
        {choosen === "groups" && (
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
