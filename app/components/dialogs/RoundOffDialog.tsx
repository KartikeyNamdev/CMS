"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function RoundoffDialog({ open, id, onClose }: any) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[600px] rounded-xl bg-white shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Pricing Information
          </DialogTitle>
        </DialogHeader>

        <table className="w-full mt-4 text-sm">
          <tbody>
            <tr>
              <td className="py-2">Charging Cost</td>
              <td className="py-2">674.8</td>
            </tr>
            <tr>
              <td className="py-2">Discount</td>
              <td className="py-2">67.48</td>
            </tr>
            <tr>
              <td className="py-2">Subtotal</td>
              <td className="py-2">607.32</td>
            </tr>
            <tr>
              <td className="py-2">Total Tax</td>
              <td className="py-2">109.32</td>
            </tr>
            <tr className="font-bold text-lg border-t pt-2">
              <td className="py-2">Roundoff</td>
              <td className="py-2">{id}</td>
            </tr>
          </tbody>
        </table>
      </DialogContent>
    </Dialog>
  );
}
