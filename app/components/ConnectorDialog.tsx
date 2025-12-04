"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { X, Link as LinkIcon } from "lucide-react";

type Connector = {
  id: number;
  type: string;
  label: string;
  status: "Available" | "Unavailable";
  error: string;
  power: number;
};

export default function ConnectorDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [connectors, setConnectors] = useState<Connector[]>([
    {
      id: 1,
      type: "CCS-2",
      label: "Connector 1",
      status: "Available",
      error: "No error",
      power: 60,
    },
    {
      id: 2,
      type: "CCS-2",
      label: "Connector 2",
      status: "Available",
      error: "No error",
      power: 60,
    },
  ]);

  const [addMode, setAddMode] = useState(false);
  const [newConnector, setNewConnector] = useState({
    type: "",
    label: "",
    power: "",
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="
    sm:max-w-[725px] 
    flex flex-col 
    bg-gray-200 backdrop-filter backdrop-blur-md 

    border-none shadow-none outline-none ring-0 
    rounded-lg    "
      >
        <DialogHeader className="flex flex-row justify-between items-center">
          <DialogTitle className="text-[22px] font-bold">
            Connectors
          </DialogTitle>
        </DialogHeader>

        {/* TOP — Charger Power Rating */}
        <div className="flex items-center gap-2 my-4">
          <Label className="font-semibold text-gray-700">
            Charger Power Rating
          </Label>
          <div className="flex items-center gap-2  px-2 py-1 rounded-lg w-full">
            <Input defaultValue="60" className="-none focus:ring-0 p-0" />
            <LinkIcon size={16} className="text-red-500" />
          </div>
        </div>

        {/* TABLE LIKE UI */}
        <div className=" rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Id</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Connector Label</th>
                <th className="p-3 text-left">Last Recorded Status</th>
                <th className="p-3 text-left">Error</th>
                <th className="p-3 text-left">Power Rating</th>
              </tr>
            </thead>

            <tbody>
              {connectors.map((c) => (
                <tr key={c.id}>
                  <td className="p-3">{c.id}</td>
                  <td className="p-3 text-gray-700">{c.type}</td>
                  <td className="p-3">
                    <Input defaultValue={c.label} className="w-24 " />
                  </td>
                  <td className="p-3 text-green-600 font-medium">{c.status}</td>
                  <td className="p-3 text-gray-500">{c.error}</td>
                  <td className="p-3">
                    <div className="flex items-center  rounded-lg px-2 py-1 gap-2 w-24">
                      <Input defaultValue={c.power} className="p-0" />
                      <LinkIcon size={16} className="text-red-500" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ADD CONNECTOR BUTTON */}
        {!addMode && (
          <button
            onClick={() => setAddMode(true)}
            className="text-blue-600 font-semibold mt-3"
          >
            + Add Connectors
          </button>
        )}

        {/* ADD CONNECTOR FORM */}
        {addMode && (
          <div className="  rounded-lg mt-5 p-4">
            <h3 className="font-bold text-gray-800 mb-3">Connector details</h3>

            <div className="relative grid grid-cols-3 gap-4">
              {/* Type dropdown */}
              <div>
                <Label className="text-gray-700 font-medium text-sm">
                  Connector Type*
                </Label>
                <Select
                  onValueChange={(v) =>
                    setNewConnector({ ...newConnector, type: v })
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Connector Type" />
                  </SelectTrigger>

                  {/* FIX APPLIED HERE */}
                  <SelectContent className="z-9999 bg-white relative">
                    {[
                      "CCS-2",
                      "CHAdeMO",
                      "Type-2",
                      "Wall",
                      "GBT",
                      "Type-6",
                    ].map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Connector Label</Label>
                <Input
                  placeholder="Label"
                  className="mt-1 focus:border-red-600"
                  onChange={(e) =>
                    setNewConnector({ ...newConnector, label: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Power Rating*</Label>
                <Input
                  placeholder="Rating"
                  className="mt-1"
                  onChange={(e) =>
                    setNewConnector({ ...newConnector, power: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end gap-6 mt-4">
              <DialogClose className="">
                <Button
                  className="pr-4 border-gray-300"
                  variant="outline"
                  onClick={() => setAddMode(false)}
                >
                  Cancel
                </Button>
                <Button className="bg-[#b22828] hover:bg-red-700 text-white">
                  Save
                </Button>
              </DialogClose>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
