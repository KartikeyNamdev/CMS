"use client";
import StationHealthMonitor from "@/app/components/Heart";
import { use } from "react";

export default function StationPage({
  params,
}: {
  params: Promise<{ stationId: string }>;
}) {
  const { stationId } = use(params);

  return (
    <div className="w-full min-h-screen">
      <StationHealthMonitor stationId={stationId} />
    </div>
  );
}
