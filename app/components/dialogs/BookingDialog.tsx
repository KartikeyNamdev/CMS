"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";

interface BookingDialogProps {
  open: boolean;
  id: string | null;
  onClose: () => void;
}

export default function BookingDialog({
  open,
  id,
  onClose,
}: BookingDialogProps) {
  // TODO: Fetch actual data based on booking ID
  const bookingData = {
    bookingId: id || "31006780",
    status: "Completed",
    charging: {
      totalDuration: "0:25:40",
      startDate: "2025-11-26",
      startTime: "18:36:47",
      stopDate: "2025-11-26",
      stopTime: "19:02:27",
      updatedAtDate: "2025-11-26",
      updatedAtTime: "19:02:43",
      startSOC: "13%",
      stopSOC: "16%",
      startMeterValue: "3977007",
      stopMeterValue: "3979472",
      authReference: "-",
    },
    pricing: {
      roundOffPrice: "INR 52",
      chargingCost: "INR 49.3",
      cgst: "INR 0",
      sgst: "INR 0",
      igst: "INR 7.99",
      totalCost: "INR 52.36",
      viewInvoice: "-",
    },
    charger: {
      stationName: "Aryan Hotel (Dabas EV Charge) ...",
      accessType: "public",
      connectorType: "CCS-2",
      connectorId: "1",
    },
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[450px] max-h-[90vh] overflow-y-auto bg-white p-0">
        <DialogHeader className="sticky top-0 bg-white border-b px-6 py-4 flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-bold text-red-500">
            Session Details
          </DialogTitle>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          ></button>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-6">
          {/* Booking ID & Status */}
          <div className="flex justify-between items-start pt-4">
            <div>
              <p className="text-sm text-gray-500">Booking ID</p>
              <p className="text-lg font-semibold">{bookingData.bookingId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-md text-sm font-medium">
                {bookingData.status}
              </span>
            </div>
          </div>

          {/* Charging Details */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Charging Details</h3>
            <div className="space-y-2">
              <DetailRow
                label="Total Duration"
                value={bookingData.charging.totalDuration}
              />
              <DetailRow
                label="Start Date"
                value={bookingData.charging.startDate}
              />
              <DetailRow
                label="Start Time"
                value={bookingData.charging.startTime}
              />
              <DetailRow
                label="Stop Date"
                value={bookingData.charging.stopDate}
              />
              <DetailRow
                label="Stop Time"
                value={bookingData.charging.stopTime}
              />
              <DetailRow
                label="Updated At Date"
                value={bookingData.charging.updatedAtDate}
              />
              <DetailRow
                label="Updated At Time"
                value={bookingData.charging.updatedAtTime}
              />
              <DetailRow
                label="Start SOC"
                value={bookingData.charging.startSOC}
              />
              <DetailRow
                label="Stop SOC"
                value={bookingData.charging.stopSOC}
              />
              <DetailRow
                label="Start Meter Value"
                value={bookingData.charging.startMeterValue}
              />
              <DetailRow
                label="Stop Meter Value"
                value={bookingData.charging.stopMeterValue}
              />
              <DetailRow
                label="Auth Reference"
                value={bookingData.charging.authReference}
              />
            </div>
          </div>

          {/* Pricing Information */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">
              Pricing Information
            </h3>
            <div className="space-y-2">
              <DetailRow
                label="Round off Price"
                value={bookingData.pricing.roundOffPrice}
                info
              />
              <DetailRow
                label="Charging cost"
                value={bookingData.pricing.chargingCost}
              />
              <DetailRow label="CGST" value={bookingData.pricing.cgst} />
              <DetailRow label="SGST" value={bookingData.pricing.sgst} />
              <DetailRow label="IGST" value={bookingData.pricing.igst} />
              <DetailRow
                label="Total Cost"
                value={bookingData.pricing.totalCost}
                bold
              />
            </div>
          </div>

          {/* Charger Details */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Charger Details</h3>
            <div className="space-y-2">
              <DetailRow
                label="Station Name"
                value={bookingData.charger.stationName}
              />
              <DetailRow
                label="Access Type"
                value={bookingData.charger.accessType}
              />
              <DetailRow
                label="Connector Type"
                value={bookingData.charger.connectorType}
              />
              <DetailRow
                label="Connector ID"
                value={bookingData.charger.connectorId}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DetailRow({
  label,
  value,
  bold = false,
  info = false,
}: {
  label: string;
  value: string;
  bold?: boolean;
  info?: boolean;
}) {
  return (
    <div className="flex justify-between items-center py-1">
      <span className="text-sm text-gray-600 flex items-center gap-1">
        {label}
        {info && <span className="text-gray-400 text-xs">ⓘ</span>}
      </span>
      <span
        className={`text-sm text-right ${
          bold ? "font-bold text-gray-900" : "text-gray-900"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
