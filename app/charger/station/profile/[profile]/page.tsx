"use client";
import Amenities from "@/app/components/Amenities";
import Card from "@/app/components/Card";
import ChargerDetails from "@/app/components/ChargerDetails";

import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { use, useState } from "react";

export const Info = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="">
      <h1 className="font-bold">{label}</h1>
      <p className="text-gray-400">{value}</p>
    </div>
  );
};
const fields = [
  { label: "Source", value: "CMS" },
  { label: "Adress", value: "xxx" },
  { label: "Location Axis", value: "7.0,7.0" },
  { label: "Country", value: "India" },
  { label: "Area", value: "--" },
  { label: "State", value: "Telangana" },
  { label: "City", value: "Delhi" },
  { label: "Zone", value: "South" },
  { label: "Landmark", value: "--" },
  { label: "Pincode", value: "462020" },
  { label: "Acess Type", value: "Captive" },
  { label: "Opening time", value: "00:00" },
  { label: "Station Visibility Status", value: "Enable" },
];
export default function StationPage({
  params,
}: {
  params: Promise<{ profile: string }>;
}) {
  const { profile } = use(params);
  const [choosen, setChoosen] = useState(1);
  // 1 is amenities, 2 charger Details

  const buttonClasses = (protocol: 1 | 2) => `
    h-10 px-6 font-semibold transition-colors
    ${
      // Active state styling (Red background)
      choosen === protocol
        ? "bg-red-600 text-white z-10"
        : "bg-gray-800 text-gray-400 hover:bg-gray-700" // Inactive state (Dark background)
    }
    
    /* Rounded corners and border separation */
    ${protocol === 1 ? "rounded-l-xl border-r border-red-700" : "rounded-r-xl"}
    border border-red-600
  `;

  return (
    <div className="p-6 lg:px-60">
      <div className="flex gap-6 text-white  p-4">
        <Link href={"/charger/station"}>
          <ArrowLeftIcon className="w-6 h-6 hover:text-gray-300" />
        </Link>
        <p className="text-2xl">Station Profile</p>
      </div>
      <Card>
        <div className="grid grid-cols-4 gap-4">
          {fields.map((field) => {
            return (
              <Info label={field.label} value={field.value} key={field.label} />
            );
          })}
        </div>
      </Card>
      <div className="flex shadow-lg rounded-xl overflow-hidden p-6">
        <button
          // FIX 1: Wrap state update in an arrow function
          onClick={() => setChoosen(1)}
          className={buttonClasses(1)}
        >
          Amenities
        </button>
        <button
          // FIX 1: Wrap state update in an arrow function
          onClick={() => setChoosen(2)}
          className={buttonClasses(2)}
        >
          Charger Details
        </button>
      </div>
      <Card className=" h-100 ">
        {choosen === 1 ? <Amenities /> : <ChargerDetails />}
      </Card>
    </div>
  );
}
