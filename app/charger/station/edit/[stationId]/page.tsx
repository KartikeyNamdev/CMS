"use client";
import { StationDetail, useEditStationDetails } from "@/hooks/useEditStation";
import { useParams } from "next/navigation";
import Link from "next/link";
import Card from "@/app/components/Card";
import { MoveLeftIcon } from "lucide-react";

export default function EditStationPage() {
  const { stationId } = useParams();
  const { station, updateField } = useEditStationDetails(stationId as string);

  if (!station) return <p className="text-black p-10">Loading... </p>;

  return (
    <div className="max-w-4xl mx-auto p-8 text-black">
      <Card>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Link href="/charger/station" className="text-black ">
            <MoveLeftIcon />
          </Link>
          <p className="text-bold  text-2xl text-red-500">
            {station.stationId}
          </p>
        </div>

        {/* Editable Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {Object.entries(station).map(
            ([key, value]) =>
              key !== "url" && (
                <div key={key} className="flex flex-col">
                  <label className="text-gray-700 font-medium capitalize mb-1">
                    {key.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    value={value as string}
                    onChange={(e) =>
                      updateField(key as keyof StationDetail, e.target.value)
                    }
                    className="border p-2 rounded-lg border-gray-400 bg-gray-100 "
                  />
                </div>
              )
          )}
        </div>

        {/* Save Button */}
        <button
          onClick={() => alert("Changes saved (dummy)")}
          className="mt-6 px-5 py-2  bg-red-600 text-white hover:bg-red-700 rounded-lg"
        >
          Save Changes
        </button>
      </Card>
    </div>
  );
}
