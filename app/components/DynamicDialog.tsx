"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"; // Assuming this is available
import { Label } from "@/components/ui/label";

// Define a type for the data structure being passed
type DialogField = {
  label: string;
  type?: string;
  placeholder: string;
};

// Reusable wrapper function for the dialog structure
const BaseDialog = ({
  title,
  data,
  onClose,
  triggerButton,
}: {
  title: string;
  data: DialogField[];
  onClose?: () => void;
  triggerButton?: React.ReactNode;
}) => (
  <Dialog>
    <form className="h-full" onSubmit={onClose}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent
        className="
            sm:max-w-md rounded-lg shadow-xl text-white border border-gray-300 border-opacity-30 
            flex flex-col max-h-[90vh] 
            /* Custom dark background styles */
            bg-white/30 backdrop-filter backdrop-blur-md 
          "
      >
        <DialogHeader className="flex justify-between items-center pr-4">
          <DialogTitle className="text-white text-xl">{title}</DialogTitle>
          <DialogClose asChild>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-red-700/50"
            />
          </DialogClose>
        </DialogHeader>
        <DialogDescription className="border-b border-gray-300 pb-2"></DialogDescription>

        {/* --- SCROLLABLE CONTENT AREA --- */}
        <div className="grid gap-4 grow overflow-y-auto pr-2 pt-4">
          {data?.map((field, idx) => {
            const uniqueId = `${title.replace(/\s/g, "")}-${idx}`;
            return (
              <div className="grid gap-2" key={uniqueId}>
                <Label
                  htmlFor={uniqueId}
                  className="text-white text-md font-bold"
                >
                  {field.label}
                </Label>
                <Input
                  id={uniqueId}
                  type={field.type || "text"}
                  placeholder={field.placeholder}
                  className="h-10 bg-gray-100 border border-gray-300 text-black placeholder-gray-400 "
                />
              </div>
            );
          })}
        </div>

        <DialogFooter className="mt-4 pt-4 border-t border-gray-700/50">
          <Button
            onClick={onClose}
            type="submit"
            className="bg-[#b22828] hover:bg-red-800 w-full text-white"
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </form>
  </Dialog>
);

// --- 2. Add Admin Dialog ---
const ADD_ADMIN_FIELDS: DialogField[] = [
  { label: "Admin Name", placeholder: "Enter Full Name" },
  { label: "Email Address", placeholder: "Enter Email", type: "email" },
  { label: "Phone Number", placeholder: "Enter Phone Number", type: "tel" },
  { label: "Role Name", placeholder: "e.g., Super Admin" },
  { label: "Company Type", placeholder: "e.g., CPO / EMSP" },
  { label: "Company Name", placeholder: "e.g., PLUGUP" },
  {
    label: "Charger Group Assigned",
    placeholder: "Yes or No",
    type: "boolean",
  },
];

export const AddAdminDialog = ({
  triggerButton,
  open,
  onClose,
}: {
  triggerButton: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
}) => (
  <BaseDialog
    title="Add New Administrator"
    data={ADD_ADMIN_FIELDS}
    onClose={onClose}
    triggerButton={triggerButton}
  />
);

// --- 3. Add Group Dialog ---
const ADD_Roles_FIELDS: DialogField[] = [
  { label: "Role Name", placeholder: "e.g., Admin / User" },
  { label: "Company", placeholder: "e.g., Available companies" },
  { label: "Role Template", placeholder: "Select role from template" },
];

export const AddRolesDialog = ({
  triggerButton,
  open,
  onClose,
}: {
  triggerButton: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
}) => (
  <BaseDialog
    title="Add New Role"
    data={ADD_Roles_FIELDS}
    onClose={onClose}
    triggerButton={triggerButton}
  />
);
