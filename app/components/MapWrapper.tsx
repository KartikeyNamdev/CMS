"use client";

import dynamic from "next/dynamic";

const Map = dynamic(
  () => import("./Map").then((mod) => ({ default: mod.Map })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-gray-400">Loading map...</p>
      </div>
    ),
  }
);

export default function StationMapPage() {
  return (
    <div className="h-screen w-full">
      <Map />
    </div>
  );
}
