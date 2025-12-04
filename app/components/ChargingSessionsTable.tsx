"use client";

import { useState } from "react";
import AgDynamicTable from "@/app/components/AgDynamicTable";
import useChargingSessions from "@/hooks/useChargingSessions";
import BookingDialog from "./dialogs/BookingDialog";
import RoundoffDialog from "./dialogs/RoundOffDialog";
import ActionDialog from "./dialogs/ActionsDialog";

// ---------------- CELL RENDERERS ----------------
const bookingLink = (params: any) => {
  console.log("Booking clicked:", params.value);
  const handleClick = () => {
    if (params?.context?.openBooking) {
      params.context.openBooking(params.value);
    }
  };

  return (
    <span
      className="text-blue-500 underline cursor-pointer hover:text-blue-700"
      onClick={handleClick}
    >
      {params?.value || "--"}
    </span>
  );
};

const roundoffLink = (params: any) => {
  console.log("Roundoff clicked:", params.value);
  const handleClick = () => {
    if (params?.context?.openRoundoff) {
      params.context.openRoundoff(params.value);
    }
  };

  return (
    <span
      className="text-blue-500 underline cursor-pointer hover:text-blue-700"
      onClick={handleClick}
    >
      {params?.value || "--"}
    </span>
  );
};

const actionButton = (params: any) => {
  console.log("Action clicked:", params.data);
  const handleClick = () => {
    if (params?.context?.openAction) {
      params.context.openAction(params.data);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="text-gray-600 hover:text-black text-xl"
    >
      ⚙️
    </button>
  );
};

// Export for use in hook
export { bookingLink, roundoffLink, actionButton };

// ---------------- MAIN COMPONENT ----------------
export default function ChargingSessionsTable() {
  const { rows, columns, loading } = useChargingSessions();

  const [openBooking, setOpenBooking] = useState<string | null>(null);
  const [openRoundoff, setOpenRoundoff] = useState<string | null>(null);
  const [openAction, setOpenAction] = useState<string | null>(null);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <>
      <AgDynamicTable
        columns={columns}
        rowData={rows}
        context={{
          openBooking: (id: string) => setOpenBooking(id),
          openRoundoff: (id: string) => setOpenRoundoff(id),
          openAction: (row: string) => setOpenAction(row),
        }}
        gridOptions={{}} // keep custom options if required
      />

      <BookingDialog
        open={!!openBooking}
        id={openBooking}
        onClose={() => setOpenBooking(null)}
      />

      <RoundoffDialog
        open={!!openRoundoff}
        id={openRoundoff}
        onClose={() => setOpenRoundoff(null)}
      />

      <ActionDialog
        open={!!openAction}
        data={openAction}
        onClose={() => setOpenAction(null)}
      />
    </>
  );
}
