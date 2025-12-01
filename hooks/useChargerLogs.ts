"use client";

import { useEffect, useState, useCallback } from "react";

export interface ChargerLog {
  logId: string;
  ocppId: string;
  connectorName: string;
  action: string;
  requestPayload: object;
  responsePayload: object;
  requestTimestamp: string;
  responseTimestamp: string;
}

const fallbackLogs: ChargerLog[] = [
  {
    logId: "fallback-log-001",
    ocppId: "DUMMY001",
    connectorName: "1",
    action: "MeterValues",
    requestPayload: {
      context: "Sample.Periodic",
      format: "Raw",
      location: "Cable",
      measurand: "Voltage",
      unit: "V",
      value: "401",
    },
    responsePayload: {
      accepted: true,
      timestamp: "2025-11-26T19:41:32Z",
    },
    requestTimestamp: "2025-11-26 19:41:32",
    responseTimestamp: "2025-11-26 19:41:32",
  },
];

export default function useChargerLogs(stationId?: string) {
  const [logs, setLogs] = useState<ChargerLog[]>(fallbackLogs);
  const [loading, setLoading] = useState(true);

  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true);

      if (!stationId) {
        setLogs(fallbackLogs);
        return;
      }

      const res = await fetch(`/api/charger-logs?stationId=${stationId}`);
      const text = await res.text();

      if (!text || text.trim().startsWith("<")) {
        console.warn("⚠️ API returned HTML → Using fallback logs");
        setLogs(fallbackLogs);
        return;
      }

      let json;
      try {
        json = JSON.parse(text);
      } catch {
        console.warn("⚠️ Invalid JSON → Using fallback logs");
        setLogs(fallbackLogs);
        return;
      }

      if (!json?.success || !Array.isArray(json?.data)) {
        console.warn("⚠️ Unexpected API structure → fallback");
        setLogs(fallbackLogs);
        return;
      }

      const formatted: ChargerLog[] = json.data.map((item: ChargerLog) => ({
        logId: item.logId ?? "N/A",
        ocppId: item.ocppId ?? "--",
        connectorName: item.connectorName ?? "--",
        action: item.action ?? "--",
        requestPayload: item.requestPayload ?? {},
        responsePayload: item.responsePayload ?? {},
        requestTimestamp: item.requestTimestamp ?? "--",
        responseTimestamp: item.responseTimestamp ?? "--",
      }));

      setLogs(formatted.length ? formatted : fallbackLogs);
    } catch (err) {
      console.error("❌ Error fetching logs:", err);
      setLogs(fallbackLogs);
    } finally {
      setLoading(false);
    }
  }, [stationId]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return {
    logs,
    loading,
    refresh: fetchLogs,
  };
}
