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
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";

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
    <DialogTrigger asChild>{triggerButton}</DialogTrigger>

    <form className="h-full" onSubmit={onClose}>
      <DialogContent
        className="
            sm:max-w-md rounded-lg shadow-xl text-white border border-gray-600 border-opacity-30 
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
        <DialogDescription className="border-b border-gray-400 pb-2"></DialogDescription>

        {/* --- SCROLLABLE CONTENT AREA --- */}
        <div className="grid gap-4 grow overflow-y-auto pr-2 pt-4">
          {data?.map((field, idx) => {
            const uniqueId = `${title.replace(/\s/g, "")}-${idx}`;
            return (
              <div className="grid gap-2" key={uniqueId}>
                <Label htmlFor={uniqueId} className="text-gray-200 text-sm">
                  {field.label}
                </Label>
                <Input
                  id={uniqueId}
                  type={field.type || "text"}
                  placeholder={field.placeholder}
                  className="h-10 bg-black/50 text-white placeholder-gray-300 border border-gray-500 focus:ring-red-500 focus:border-red-500"
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
];

export const AddAdminDialog = ({
  triggerButton,
}: {
  triggerButton: React.ReactNode;
}) => (
  <BaseDialog
    title="Add New Administrator"
    data={ADD_ADMIN_FIELDS}
    onClose={() => {}}
    triggerButton={triggerButton}
  />
);

// --- 3. Add Group Dialog ---
const ADD_GROUP_FIELDS: DialogField[] = [
  { label: "Group Name", placeholder: "e.g., West Coast Chargers" },
  { label: "Role Type", placeholder: "e.g., Custom / Default" },
  { label: "Permission Template", placeholder: "e.g., Operator-Level Access" },
  { label: "Description", placeholder: "Optional details" },
];

export const AddGroupDialog = ({
  triggerButton,
}: {
  triggerButton: React.ReactNode;
}) => (
  <BaseDialog
    title="Add New Charger Group"
    data={ADD_GROUP_FIELDS}
    onClose={() => {}}
    triggerButton={triggerButton}
  />
);
