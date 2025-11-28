"use client";
import Card from "@/app/components/Card";
import StationHealthMonitor from "@/app/components/Heart";
import { ArrowLeftCircleIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import { use } from "react";

export default function StationPage({
  params,
}: {
  params: Promise<{ profile: string }>;
}) {
  const { profile } = use(params);

  return (
    <div className="p-6 lg:px-60">
      <div className="flex gap-6 text-white p-4">
        <ArrowLeftIcon className="w-8 h-8" />
        <p className="text-2xl">Station Profile</p>
      </div>
      <Card>
        <div className="grid grid-cols-4 gap-4">
          <div className="">SOURCE</div>
          <div className="">ADDRESS</div>
          <div className="">LOCATION AXIS</div>
          <div className="">COUNTRY</div>
        </div>
      </Card>
    </div>
  );
}
