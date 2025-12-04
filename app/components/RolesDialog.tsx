"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function RolesDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [permissions, setPermissions] = useState([
    {
      module: "Charger Management",
      enabled: true,
      children: [
        { name: "Overview", perms: ["view"] },
        { name: "Charger", perms: ["view", "download"] },
        { name: "Stations", perms: ["view"] },
        { name: "Charging Logs", perms: ["view", "download"] },
        { name: "Station Map", perms: ["view"] },
      ],
    },
    {
      module: "User Management",
      enabled: true,
      children: [
        { name: "Overview", perms: ["view"] },
        { name: "Admins", perms: ["view", "edit", "add", "download"] },
        { name: "Roles", perms: ["view", "edit", "add", "download"] },
        { name: "Groups", perms: ["view", "edit", "add", "download"] },
      ],
    },
    {
      module: "Company Management",
      enabled: false,
      children: [{ name: "Company Details", perms: ["view"] }],
    },
    {
      module: "Billings & Payments",
      enabled: false,
      children: [
        { name: "Overview", perms: ["view"] },
        { name: "Charging Session", perms: ["view", "download"] },
      ],
    },
    {
      module: "Complaints Management",
      enabled: false,
      children: [{ name: "Overview", perms: ["view"] }],
    },
  ]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-lg w-[850px] max-h-[80vh] overflow-y-auto bg-white/70 backdrop-blur-md border-none shadow-none p-0">
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="text-[22px] font-bold">
            View Custom Role
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* Top 2 Inputs */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Label>Role Name*</Label>
              <input
                className="w-full mt-1 border rounded-md p-2 focus:ring-0"
                defaultValue="Superadmin"
              />
            </div>

            <div>
              <Label>Company*</Label>
              <input
                className="w-full mt-1 border rounded-md p-2 focus:ring-0"
                defaultValue="Sunil Solanki"
              />
            </div>

            <div>
              <Label>Role Template*</Label>
              <input
                className="w-full mt-1 border rounded-md p-2 focus:ring-0"
                defaultValue="Superadmin"
              />
            </div>
          </div>

          <h2 className="text-[18px] font-bold mt-6">
            Permissions and Functionality
          </h2>

          {/* Permissions Mapping */}
          <div className="space-y-5 border rounded-lg p-4 bg-white/60">
            {permissions.map((mod, i) => (
              <div key={i} className="border-b last:border-none pb-5">
                {/* section title row */}
                <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
                  <p className="font-semibold">{mod.module}</p>
                  <Switch checked={mod.enabled} />
                </div>

                {/* child rows */}
                <div className="mt-3 space-y-3">
                  {mod.children.map((row, idx) => (
                    <div key={idx} className="grid grid-cols-4 gap-2">
                      <p>{row.name}</p>

                      <div className="flex gap-4 col-span-3">
                        {["view", "edit", "add", "download"].map((p) => (
                          <label key={p} className="flex items-center gap-2">
                            <Checkbox checked={row.perms.includes(p)} />
                            <span className="text-sm capitalize">{p}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end border-t p-4 gap-3 bg-white/50">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-[#b22828] hover:bg-red-600 text-white">
            Save Role
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
