"use client";

import MapWrapper from "@/app/components/MapWrapper";

export default function AllChargers() {
  return (
    <div className="flex flex-col justify-center items-center h-[600px]">
      {/* <h1 className="text-3xl m-10 items-start">All Chargers</h1> */}
      <div className="min-h-50 bg-black text-white w-full max-w-7xl">
        <div className="w-full border border-gray-700 rounded-lg overflow-hidden">
          <MapWrapper />
        </div>
      </div>
    </div>
  );
}
