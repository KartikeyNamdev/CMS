"use client";

import { useEffect, useState, useCallback } from "react";

export type OcpiLog = {
  logId: string;
  requestUrl: string;
  requestPayload: unknown;
  requestTimestamp: string;

  responsePayload: unknown;
  responseTimestamp: string;

  headerToken: string;
  httpStatus: number | string;
  initiatedBy: string;
  initiatedFor: string;
  logType: string;
};

const fallbackLogs: OcpiLog[] = [
  {
    logId: "dummy-log-001",
    requestUrl: "https://dummy.ocpi/request",
    requestPayload: { hello: "world", type: "dummy-request" },
    requestTimestamp: "26/11/2025 19:43:05",

    responsePayload: { ok: true, type: "dummy-response" },
    responseTimestamp: "26/11/2025 19:43:06",

    headerToken: "-",
    httpStatus: 200,
    initiatedBy: "CMS platform",
    initiatedFor: "EVLinq platform",
    logType: "Sessions",
  },
];

export default function useOcpiLogs(stationId?: string) {
  const [logs, setLogs] = useState<OcpiLog[]>(fallbackLogs);
  const [loading, setLoading] = useState(true);

  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true);

      if (!stationId) {
        setLogs(fallbackLogs);
        return;
      }

      const res = await fetch(`/api/ocpi-logs?stationId=${stationId}`);
      const text = await res.text();

      if (!text || text.trim().startsWith("<")) {
        setLogs(fallbackLogs);
        return;
      }

      const json = JSON.parse(text);

      if (!json?.success || !Array.isArray(json?.data)) {
        setLogs(fallbackLogs);
        return;
      }

      const formatted: OcpiLog[] = json.data.map((item: Partial<OcpiLog>) => ({
        logId: item.logId ?? "N/A",
        requestUrl: item.requestUrl ?? "-",
        requestPayload: item.requestPayload ?? {},
        requestTimestamp: item.requestTimestamp ?? "-",

        responsePayload: item.responsePayload ?? {},
        responseTimestamp: item.responseTimestamp ?? "-",

        headerToken: item.headerToken ?? "-",
        httpStatus: item.httpStatus ?? "-",
        initiatedBy: item.initiatedBy ?? "-",
        initiatedFor: item.initiatedFor ?? "-",
        logType: item.logType ?? "-",
      }));

      setLogs(formatted.length ? formatted : fallbackLogs);
    } catch {
      setLogs(fallbackLogs);
    } finally {
      setLoading(false);
    }
  }, [stationId]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return { logs, loading, refresh: fetchLogs };
}
