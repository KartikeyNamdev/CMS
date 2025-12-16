"use client";
import Amenities from "@/app/components/Amenities";
import Card from "@/app/components/Card";
import ChargerDetails from "@/app/components/ChargerDetails";
import SlideBtn from "@/app/components/SlideBtn";

import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { use, useState, useEffect } from "react";
import { useDataStore } from "@/store/useDataStore";
import { Station } from "@/lib/types";

export const Info = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="">
      <h1 className="font-semibold text-black">{label}</h1>
      <p className="text-gray-700">{value || "--"}</p>
    </div>
  );
};

export default function StationPage({
  params,
}: {
  params: Promise<{ profile: string }>;
}) {
  const { profile } = use(params);
  const [choosen, setChoosen] = useState(1);
  const [station, setStation] = useState<Station | null>(null);
  const [notFound, setNotFound] = useState(false);

  const stations = useDataStore((state) => state.stations);

  // Fetch station details based on profile ID
  useEffect(() => {
    function load() {
      const foundStation = stations.find((s) => s.id === profile);

      if (foundStation) {
        setStation(foundStation);
        setNotFound(false);
        console.log("📍 Station loaded:", foundStation.stationName);
      } else {
        setStation(null);
        setNotFound(true);
        console.warn("⚠️ Station not found with ID:", profile);
      }
    }
    load();
  }, [profile, stations]);

  // 1 is amenities, 2 charger Details
  const buttonClasses = (protocol: 1 | 2) => `
    h-10 px-6 font-semibold transition-colors
    ${
      choosen === protocol
        ? "bg-red-600 text-white z-10"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-black"
    }
    ${protocol === 1 ? "rounded-l-xl border-r border-red-700" : "rounded-r-xl"}
    border border-red-600
  `;

  // Show loading or not found state
  if (notFound) {
    return (
      <div className="p-6 lg:px-60">
        <div className="flex gap-6 items-center p-4">
          <Link href={"/charger/station"}>
            <ArrowLeftIcon className="w-6 h-6 text-gray-600 hover:text-black" />
          </Link>
          <p className="text-2xl text-black">Station Not Found</p>
        </div>
        <Card>
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Station with ID {profile} does not exist.
            </p>
            <Link href="/charger/station">
              <button className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">
                Back to Stations
              </button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  if (!station) {
    return (
      <div className="p-6 lg:px-60">
        <div className="flex gap-6 items-center p-4">
          <Link href={"/charger/station"}>
            <ArrowLeftIcon className="w-6 h-6 text-gray-600 hover:text-black" />
          </Link>
          <p className="text-2xl text-black">Loading...</p>
        </div>
      </div>
    );
  }

  // Build fields array from station data
  const fields = [
    { label: "Station Name", value: station.stationName },
    { label: "Station ID", value: station.id },
    { label: "Street", value: station.street },
    { label: "Area", value: station.area },
    { label: "Country", value: station.country },
    { label: "State", value: station.state },
    { label: "City", value: station.city },
    { label: "Zone", value: station.zone },
    { label: "Landmark", value: station.landmark },
    { label: "Pincode", value: station.pincode },
    { label: "Access Type", value: station.accessType },
    { label: "Alternate Access Type", value: station.alternateAccessType },
    { label: "Station Visibility", value: station.stationVisibility },
    { label: "CCTV", value: station.cctv === "yes" ? "Yes" : "No" },
    { label: "Connection Type", value: station.connectionType },
    { label: "Opening Hours", value: station.openingHours },
    { label: "SPOC Name", value: station.spocName },
    { label: "SPOC Number", value: station.spocNumber?.toString() },
    { label: "Guard Name", value: station.guardName },
    { label: "Guard Number", value: station.guardNumber?.toString() },
    { label: "Parking Fee", value: `₹${station.parkingFee}` },
    { label: "Internet Connection", value: station.internetConnectionType },
    { label: "Amenities", value: station.amenities || "--" },
  ];

  return (
    <div className="p-6 lg:px-60">
      <div className="flex gap-6 text-white p-4 justify-between">
        <div className="flex gap-6">
          <Link href={"/charger/station"}>
            <ArrowLeftIcon className="w-6 h-6 text-gray-600 hover:text-black" />
          </Link>
          <div>
            <p className="text-2xl text-black font-bold">
              {station.stationName}
            </p>
            <p className="text-sm text-gray-600">
              {station.city}, {station.state}
            </p>
          </div>
        </div>
        <div className="flex gap-6 items-center">
          <span className="text-sm font-semibold text-gray-600">
            Hub Visibility
          </span>
          <SlideBtn />
        </div>
      </div>

      <Card>
        <h2 className="text-xl font-bold text-black mb-4">Station Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {fields.map((field) => (
            <Info label={field.label} value={field.value} key={field.label} />
          ))}
        </div>
      </Card>

      <div className="flex shadow-lg rounded-xl overflow-hidden p-6 mt-6">
        <button onClick={() => setChoosen(1)} className={buttonClasses(1)}>
          Amenities
        </button>
        <button onClick={() => setChoosen(2)} className={buttonClasses(2)}>
          Charger Details
        </button>
      </div>

      <Card className="h-100 mt-6">
        {choosen === 1 ? <Amenities /> : <ChargerDetails />}
      </Card>
    </div>
  );
}
