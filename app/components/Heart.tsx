"use client";

import React from "react";
import Card from "@/app/components/Card";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { useGetHeartbeat } from "@/hooks/useGetHeartBeat";

export default function StationHealthMonitor({
  stationId,
}: {
  stationId: string;
}) {
  const { response, loading } = useGetHeartbeat({ stationId: stationId });

  return (
    <div className="w-full p-6 lg:p-10 min-h-[500px] flex items-center justify-center bg-transparent">
      {/* --- Inner Container for reduced width and centering --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-3xl lg:max-w-4xl mx-auto">
        {/* --- LEFT SECTION: HEART VISUAL --- */}
        <div className="flex flex-col items-center justify-center p-4">
          {response?.visibilityStatus ? (
            <Image
              src="/tb1.png"
              alt="Beating Heart"
              className="w-full max-w-sm h-auto heart-beat-animation"
              width={100}
              height={100}
            />
          ) : (
            <Image
              src="/tb2.jpg"
              alt="Stopped Heart"
              className="w-full max-w-sm h-auto heart-beat-animation"
              width={100}
              height={100}
            />
          )}

          {/* Title below heart */}
          <h1 className="mt-6 text-xl lg:text-3xl font-extrabold tracking-tight bg-linear-to-tr from-gray-300 to-red-500 bg-clip-text text-transparent">
            {response?.visibilityStatus ? "System Connected" : "Disconnected"}
          </h1>
        </div>

        {/* --- RIGHT SECTION: DETAILS AND STATUS --- */}
        <div className="flex flex-col justify-center space-y-6">
          <h2 className="text-3xl font-bold text-black border-b border-gray-700 pb-3 mb-4">
            Station ID: <span className="text-red-500">{stationId}</span>
          </h2>

          {/* Status Card 1: Connection */}
          <Card title="Connection Status" className="p-4">
            <div className="flex items-center gap-4">
              <CheckCircleIcon className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-lg font-semibold text-black">
                  Live & Stable
                </p>
                <p className="text-sm text-gray-600">
                  Last heartbeat received 1 second ago.
                </p>
              </div>
            </div>
          </Card>

          {/* Status Card 2: Latency */}
          <Card title="Data Latency" className="p-4">
            <div className="flex items-center gap-4">
              <ExclamationTriangleIcon className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-lg font-semibold text-black">
                  Warning: High Latency
                </p>
                <p className="text-sm text-gray-600">
                  Average data processing time: 500ms.
                </p>
              </div>
            </div>
          </Card>

          {/* Status Card 3: Last Sync */}
          <Card title="Synchronization" className="p-4">
            <div className="flex items-center gap-4">
              <CheckCircleIcon className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-lg font-semibold text-black">In Sync</p>
                <p className="text-sm text-gray-600">
                  Full synchronization complete at 12:00 AM.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* CSS animation as inline style tag */}
      <style jsx>{`
        @keyframes beat {
          0% {
            transform: scale(1);
            filter: drop-shadow(0 0 10px rgba(255, 40, 60, 0.35));
          }
          50% {
            transform: scale(1.07);
            filter: drop-shadow(0 0 35px rgba(253, 7, 31, 0.9));
          }
          100% {
            transform: scale(1);
            filter: drop-shadow(0 0 10px rgba(255, 40, 60, 0.35));
          }
        }
        :global(.heart-beat-animation) {
          animation: beat 1.8s infinite ease-in-out;
          filter: drop-shadow(0 0 12px rgba(255, 0, 50, 0.55));
        }
      `}</style>
    </div>
  );
}
