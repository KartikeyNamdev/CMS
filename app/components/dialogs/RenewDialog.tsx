"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RenewLicenseDialog({ open, onClose, data }: any) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-6 rounded-xl bg-white/90">
        <DialogTitle className="text-xl font-bold mb-2">
          Renew License
        </DialogTitle>

        {/* UI same layout as image */}

        <div className="grid grid-cols-3 gap-4 mt-4">
          <Input placeholder="No. of AC License*" />
          <Input placeholder="No. of DC License*" />
          <Input placeholder="Cost Per Charger*" />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-[#b22828] hover:bg-red-600 text-white">
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
