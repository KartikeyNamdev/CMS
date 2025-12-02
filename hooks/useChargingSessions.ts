"use client";

import {
  actionButton,
  bookingLink,
  priceLink,
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
            headerName: "Booking ID",
            field: "bookingId",
            width: 150,
            cellRenderer: bookingLink,
          },
          { headerName: "Charger Name", field: "chargerName", minWidth: 200 },
          {
            headerName: "eMSP / Platform / Fleet",
            field: "platform",
            minWidth: 160,
          },
          { headerName: "Start Date", field: "startDate", width: 180 },
          { headerName: "Stop Date", field: "stopDate", width: 180 },
          { headerName: "Updated At", field: "updatedAt", width: 180 },
          { headerName: "Promotion Category", field: "promo", width: 180 },
          {
            headerName: "Round Off Price",
            field: "price",
            width: 150,
            cellRenderer: priceLink,
          },
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

// --- Cell Renderers ---
