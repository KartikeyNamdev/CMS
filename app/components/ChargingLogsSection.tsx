"use client";

import { useState, useMemo } from "react";
import Card from "@/app/components/Card";
import { JsonDrawer } from "./JsonDrawer";
import useChargerLogs, { ChargerLog } from "@/hooks/useChargerLogs";

export const ChargerLogsSection = () => {
  const { logs, loading } = useChargerLogs("60683");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerData, setDrawerData] = useState(null);

  // --- Date Filters ---
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  const openDrawer = (rawJson: object) => {
    setDrawerData(rawJson);
    setDrawerOpen(true);
  };

  // --- Filtered Logs (Memoized) ---
  const filteredLogs = useMemo(() => {
    return logs.filter((log: ChargerLog) => {
      const requestTime = new Date(log.requestTimestamp).getTime();

      if (fromDate) {
        const from = new Date(fromDate).getTime();
        if (requestTime < from) return false;
      }

      if (toDate) {
        const to = new Date(toDate).getTime();
        if (requestTime > to) return false;
      }

      return true;
    });
  }, [logs, fromDate, toDate]);

  return (
    <>
      {/* JSON Drawer */}
      <JsonDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Raw JSON Payload"
        json={drawerData}
      />

      <Card className="p-6 mt-6 bg-black/40 border border-gray-300">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-700">Charger Logs</h2>

          <div className="flex items-center gap-3">
            <button className="bg-white/10 p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-white/20">
              ↻
            </button>
            <button className="bg-white/10 p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-white/20">
              ⚙️
            </button>
            <button className="bg-white/10 p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-white/20">
              ⬇️
            </button>
          </div>
        </div>

        {/* --- DATE FILTER BAR --- */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex flex-col text-gray-600">
            <label className="text-sm mb-1">From Date</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="px-3 py-2 bg-white/10 border border-gray-300 rounded-lg text-gray-600"
            />
          </div>

          <div className="flex flex-col text-gray-600">
            <label className="text-sm mb-1">To Date</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="px-3 py-2 bg-white/10 border border-gray-300 rounded-lg text-gray-600"
            />
          </div>

          {(fromDate || toDate) && (
            <button
              onClick={() => {
                setFromDate("");
                setToDate("");
              }}
              className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-20 text-center text-gray-600">Loading logs…</div>
        )}

        {/* Table */}
        {!loading && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-600 border-b border-gray-300">
                  <th className="py-3">Log ID</th>
                  <th className="py-3">OCPP ID</th>
                  <th className="py-3">Connector Name</th>
                  <th className="py-3">Action</th>
                  <th className="py-3">Request Payload</th>
                  <th className="py-3">Request Timestamp</th>
                  <th className="py-3">Response Payload</th>
                  <th className="py-3">Response Timestamp</th>
                </tr>
              </thead>

              <tbody>
                {filteredLogs.map((log: ChargerLog, index: number) => (
                  <tr
                    key={index}
                    className="border-b border-gray-300 hover:bg-white/5 text-gray-600"
                  >
                    <td className="py-4">{log.logId}</td>
                    <td className="py-4">{log.ocppId}</td>
                    <td className="py-4">{log.connectorName}</td>
                    <td className="py-4">{log.action}</td>

                    <td
                      className="py-4 text-blue-400 hover:underline cursor-pointer"
                      onClick={() => openDrawer(log.requestPayload)}
                    >
                      View
                    </td>

                    <td className="py-4">{log.requestTimestamp}</td>

                    <td
                      className="py-4 text-blue-400 hover:underline cursor-pointer"
                      onClick={() => openDrawer(log.responsePayload)}
                    >
                      View
                    </td>

                    <td className="py-4">{log.responseTimestamp}</td>
                  </tr>
                ))}

                {filteredLogs.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="py-8 text-center text-gray-500 italic"
                    >
                      No logs match your date range.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </>
  );
};

export default ChargerLogsSection;
