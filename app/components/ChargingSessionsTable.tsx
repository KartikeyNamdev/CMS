"use client";

import AgDynamicTable from "@/app/components/AgDynamicTable";
import useChargingSessions from "@/hooks/useChargingSessions";
import Link from "next/link";

export function bookingLink({ params }: { params: { value?: string } }) {
  return (
    <a
      className="text-blue-500 underline"
      target="_blank"
      // href={`https://cms.statiq.in/billing/booking/${params.value}`}
    >
      {params?.value}
    </a>
  );
}

export function priceLink({ params }: { params: { value: string } }) {
  return (
    <Link className="text-blue-500 underline" href={`#price-${params?.value}`}>
      {params?.value}
    </Link>
  );
}

export function actionButton() {
  return <button className="text-gray-300 hover:text-white text-xl">⚙️</button>;
}

export default function ChargingSessionsTable() {
  const { rows, columns, loading } = useChargingSessions();

  if (loading)
    return (
      <div className="text-gray-400 py-10 text-center">Loading sessions…</div>
    );

  return <AgDynamicTable columns={columns} rowData={rows} />;
}
