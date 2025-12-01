"use client";

import { useEffect, useState, useCallback } from "react";

export type OcppLog = {
  logId: string;
  ocppId: string;
  connectorName: string;
  action: string;

  requestPayload: unknown;
  requestTimestamp: string;

  responsePayload: unknown;
  responseTimestamp: string;

  headerToken: string;
  httpStatus: string;
  logType: string;
};

const fallbackOcppLogs: OcppLog[] = [
  {
    logId: "dummy-ocpp-001",
    ocppId: "dabas004",
    connectorName: "CCS-2",
    action: "Heartbeat",

    requestPayload: { msg: "dummy-request", connector: 1 },
    requestTimestamp: "2025-11-26 20:04:52",

    responsePayload: { msg: "dummy-response", status: "OK" },
    responseTimestamp: "2025-11-26 20:04:52",

    headerToken: "-",
    httpStatus: "200",
    logType: "StatusNotification",
  },
];

export default function useOcppLogs(stationId?: string) {
  const [logs, setLogs] = useState<OcppLog[]>(fallbackOcppLogs);
  const [loading, setLoading] = useState(true);

  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true);

      if (!stationId) {
        setLogs(fallbackOcppLogs);
        return;
      }

      const res = await fetch(`/api/ocpp-logs?stationId=${stationId}`);
      const text = await res.text();

      if (!text || text.trim().startsWith("<")) {
        setLogs(fallbackOcppLogs);
        return;
      }

      const json = JSON.parse(text);

      if (!json?.success || !Array.isArray(json?.data)) {
        setLogs(fallbackOcppLogs);
        return;
      }

      const formatted: OcppLog[] = json.data.map((item: Partial<OcppLog>) => ({
        logId: item.logId ?? "-",
        ocppId: item.ocppId ?? "-",
        connectorName: item.connectorName ?? "-",
        action: item.action ?? "-",

        requestPayload: item.requestPayload ?? {},
        requestTimestamp: item.requestTimestamp ?? "-",

        responsePayload: item.responsePayload ?? {},
        responseTimestamp: item.responseTimestamp ?? "-",

        headerToken: item.headerToken ?? "-",
        httpStatus: item.httpStatus ?? "-",
        logType: item.logType ?? "-",
      }));

      setLogs(formatted.length ? formatted : fallbackOcppLogs);
    } catch {
      setLogs(fallbackOcppLogs);
    } finally {
      setLoading(false);
    }
  }, [stationId]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return { logs, loading, refresh: fetchLogs };
}
