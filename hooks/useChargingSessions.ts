"use client";

import {
  actionButton,
  bookingLink,
  roundoffLink,
} from "@/app/components/ChargingSessionsTable";
import { ChargingColumn, ChargingSession } from "@/lib/types";
import { useEffect, useState } from "react";

export default function useChargingSessions(stationId?: string) {
  const [columns, setColumns] = useState<ChargingColumn[]>([]);
  const [rows, setRows] = useState<ChargingSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        // AG GRID COLUMN DEFINITIONS (matches UI)
        setColumns([
          {
            field: "bookingId",
            headerName: "Booking ID",
            cellRenderer: bookingLink,
            width: 150,
          },
          {
            field: "roundOff",
            headerName: "Roundoff",
            cellRenderer: roundoffLink,
            width: 120,
          },
          { field: "chargerName", headerName: "Charger Name", minWidth: 200 },
          {
            field: "platform",
            headerName: "eMSP / Platform / Fleet",
            width: 160,
          },
          { field: "startDate", headerName: "Start Date", width: 170 },
          { field: "stopDate", headerName: "Stop Date", width: 170 },
          { field: "updatedAt", headerName: "Updated At", width: 170 },
          { field: "promo", headerName: "Promotion Category", width: 180 },
          {
            headerName: "Actions",
            field: "actions",
            width: 100,
            cellRenderer: actionButton,
          },
        ]);

        // TODO: replace with real API when backend is ready
        const fallback = [
          {
            bookingId: "31007743",
            roundOff: "688", // Added roundOff field
            chargerName: "Aryan Hotel (Dabas EV Charge)",
            platform: "Statiq Platform",
            startDate: "2025-11-26 19:04:29",
            stopDate: "-",
            updatedAt: "2025-11-26 19:56:09",
            promo: "Offers",
            price: 688,
          },
          {
            bookingId: "31006780",
            roundOff: "52", // Added roundOff field
            chargerName: "Aryan Hotel (Dabas EV Charge)",
            platform: "Statiq Platform",
            startDate: "2025-11-26 18:36:47",
            stopDate: "2025-11-26 19:02:27",
            updatedAt: "2025-11-26 19:02:43",
            promo: "Offers",
            price: 52,
          },
        ];

        // fallback usage until API exists
        setRows(fallback);
      } catch (err) {
        console.error("Charging Sessions Hook Error:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [stationId]);

  return { rows, columns, loading };
}
