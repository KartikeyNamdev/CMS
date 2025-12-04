"use client";

import { useState } from "react";
import AgDynamicTable from "@/app/components/AgDynamicTable";
import useChargingSessions from "@/hooks/useChargingSessions";
import BookingDialog from "./dialogs/BookingDialog";
import RoundoffDialog from "./dialogs/RoundOffDialog";
import ActionDialog from "./dialogs/ActionsDialog";
import { ColumnType, GridCellParams } from "@/lib/agGrid";

import { RowType } from "../user/admin/page";
import { ChargingColumn, ChargingSession } from "@/lib/types";

// ---------------- CELL RENDERERS ----------------
const bookingLink = (params: GridCellParams) => {
  return (
    <span onClick={() => params.context?.openBooking?.(params.value)}>
      {params.value || "--"}
    </span>
  );
};

const roundoffLink = (params: GridCellParams) => {
  return (
    <span onClick={() => params.context?.openRoundoff?.(params.value)}>
      {params.value || "--"}
    </span>
  );
};

const actionButton = (params: GridCellParams) => {
  return (
    <button onClick={() => params.context?.openAction?.(params.data as string)}>
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
        columns={columns as ColumnType[]}
        rowData={rows as []}
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
