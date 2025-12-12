"use client";
import React, { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { Station, useDataStore } from "@/store/useDataStore";
import DynamicStationForm, {
  StationFormData,
} from "@/app/charger/station/new/page";

export default function StationEditPage() {
  const { stationId } = useParams();
  const router = useRouter();

  const stations = useDataStore((s) => s.stations);
  const updateStation = useDataStore((s) => s.updateStation);
  const initial = useMemo<Station | null>(() => {
    return stations.find((x) => x.id === stationId) ?? null;
  }, [stations, stationId]);

  const onSubmit = async (data: StationFormData) => {
    try {
      await updateStation(stationId as string, data as Partial<Station>);

      router.push("/charger/station");
    } catch (err) {
      console.error(err);
      alert("Failed to update station");
    }
  };

  if (!initial) return <div className="p-8">Loading…</div>;

  return <DynamicStationForm initialData={initial} onSubmit={onSubmit} />;
}
