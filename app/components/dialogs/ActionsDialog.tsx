"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";

interface ActionDialogProps {
  open: boolean;
  data: any;
  onClose: () => void;
}

export default function ActionDialog({
  open,
  data,
  onClose,
}: ActionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Session Actions</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {data && (
            <>
              <div>
                <p className="text-sm text-gray-500">Booking ID</p>
                <p className="text-lg font-semibold">{data.bookingId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Charger</p>
                <p>{data.chargerName}</p>
              </div>
              <div className="flex gap-2 mt-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Edit
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                  Delete
                </button>
                <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
                  Export
                </button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
