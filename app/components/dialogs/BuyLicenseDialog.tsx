"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

interface BuyLicenseDialogProps {
  open: boolean;
  data?: any;
  onClose: () => void;
}

export default function BuyLicenseDialog({
  open,
  data,
  onClose,
}: BuyLicenseDialogProps) {
  const [sameAddress, setSameAddress] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[750px] max-h-[92vh] overflow-y-auto rounded-xl bg-white/90 px-8 py-6 shadow-xl">
        <DialogTitle className="text-2xl font-bold mb-6">
          Buy License
        </DialogTitle>

        <div className="grid grid-cols-2 gap-6">
          {/* Type of Charger */}
          <div>
            <label className="font-semibold text-sm">Type of Charger *</label>
            <div className="flex items-center gap-4 mt-2">
              <label className="flex items-center gap-1 text-gray-700">
                <input type="radio" name="chargerType" /> AC
              </label>
              <label className="flex items-center gap-1 text-gray-700">
                <input type="radio" name="chargerType" /> DC
              </label>
            </div>
          </div>

          {/* No. of License */}
          <div>
            <label className="font-semibold text-sm">No. of License *</label>
            <input
              placeholder="No. of License"
              className="w-full mt-2 border rounded-lg px-3 py-2 focus:outline-red-500"
            />
          </div>

          {/* Billing Address */}
          <div className="col-span-2">
            <label className="font-semibold text-sm">Billing Address *</label>
            <input
              placeholder="Billing Address"
              className="w-full mt-2 border rounded-lg px-3 py-2 focus:outline-red-500"
            />
          </div>

          {/* Shipping address */}
          <div>
            <label className="font-semibold text-sm">Shipping Address *</label>
            <input
              placeholder="Shipping Address"
              className="w-full mt-2 border rounded-lg px-3 py-2 focus:outline-red-500"
              disabled={sameAddress}
            />
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-2 text-sm mt-8">
              <input
                type="checkbox"
                onChange={() => setSameAddress(!sameAddress)}
              />
              Same as Billing address
            </label>
          </div>

          {/* Cost */}
          <div>
            <label className="font-semibold text-sm">Cost per Charger *</label>
            <input
              placeholder="Cost per Charger"
              className="w-full mt-2 border rounded-lg px-3 py-2 focus:outline-red-500"
            />
          </div>

          {/* GST No */}
          <div>
            <label className="font-semibold text-sm">GST No.</label>
            <input
              placeholder="00"
              className="w-full mt-2 border rounded-lg px-3 py-2 focus:outline-red-500"
            />
          </div>
        </div>

        {/* GST Type */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <button className="py-2 rounded-lg border font-medium bg-gray-100">
            IGST <span className="text-xs">(18%)</span>
          </button>
          <button className="py-2 rounded-lg border font-medium bg-gray-100">
            SGST <span className="text-xs">(9%)</span>
          </button>
          <button className="py-2 rounded-lg border font-medium bg-gray-100">
            CGST <span className="text-xs">(9%)</span>
          </button>
        </div>

        {/* Total Amount */}
        <div className="mt-6">
          <label className="font-semibold text-sm">Total Amount *</label>
          <input
            placeholder="Total Amount"
            className="w-full mt-2 border rounded-lg px-3 py-2 focus:outline-red-500"
          />
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className="px-6 py-2 font-semibold text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>

          <button className="px-8 py-2 rounded-lg text-white font-semibold bg-[#b22828] hover:bg-red-600">
            Submit
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
