"use client";

import "@/lib/agGrid";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { useMemo, useState } from "react";
import { themeDabas } from "@/lib/agGridTheme";

import "@/lib/agGridTheme";
import useOcpiLogs from "@/hooks/useOCPILogs";
import { JsonDrawer } from "./JsonDrawer";

type OcpiLog = {
  logId: string;
  requestUrl: string;
  requestPayload: unknown;
  requestTimestamp: string;
  responsePayload: unknown;
  responseTimestamp: string;
  headerToken: string;
  httpStatus: string;
  initiatedBy: string;
  initiatedFor: string;
  logType: string;
};

export default function OcpiLogsTable({ rowData }: { rowData?: OcpiLog[] }) {
  const { logs } = useOcpiLogs("123423");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerData, setDrawerData] = useState<unknown>(null);

  const openDrawer = (payload: unknown) => {
    setDrawerData(payload);
    setDrawerOpen(true);
  };

  const colDefs: ColDef<OcpiLog>[] = useMemo(
    () => [
      { headerName: "Log ID", field: "logId", minWidth: 220 },

      {
        headerName: "Request Url",
        field: "requestUrl",
        cellRenderer: (params: ICellRendererParams<OcpiLog, string>) => (
          <a
            href={params.value ?? "#"}
            target="_blank"
            className="text-blue-400 underline"
          >
            {params.value}
          </a>
        ),
        minWidth: 300,
        flex: 1,
      },

      {
        headerName: "Request Payload",
        field: "requestPayload",
        width: 140,
        cellRenderer: (params: ICellRendererParams<OcpiLog>) => (
          <span
            className="text-blue-400 underline cursor-pointer"
            onClick={() => openDrawer(params.data?.requestPayload)}
          >
            View
          </span>
        ),
      },

      {
        headerName: "Request Timestamp",
        field: "requestTimestamp",
        width: 180,
      },

      {
        headerName: "Response Payload",
        field: "responsePayload",
        width: 160,
        cellRenderer: (params: ICellRendererParams<OcpiLog>) => (
          <span
            className="text-blue-400 underline cursor-pointer"
            onClick={() => openDrawer(params.data?.responsePayload)}
          >
            View
          </span>
        ),
      },

      {
        headerName: "Response Timestamp",
        field: "responseTimestamp",
        width: 180,
      },

      {
        headerName: "Header Token",
        field: "headerToken",
        width: 140,
      },

      {
        headerName: "Http Status Code",
        field: "httpStatus",
        width: 150,
      },

      {
        headerName: "Initiated By",
        field: "initiatedBy",
        width: 200,
      },

      {
        headerName: "Initiated For",
        field: "initiatedFor",
        width: 200,
      },

      {
        headerName: "Log Type",
        field: "logType",
        width: 140,
      },
    ],
    []
  );

  return (
    <div className="w-full flex">
      <div
        className="ag-theme-quartz-dark border border-gray-700 rounded-lg overflow-hidden w-full"
        style={{ height: 600 }}
      >
        <JsonDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title="Raw JSON Payload"
          json={drawerData}
        />

        <AgGridReact<OcpiLog>
          theme={themeDabas}
          rowData={(logs as OcpiLog[]) ?? rowData}
          columnDefs={colDefs}
          defaultColDef={{
            sortable: true,
            resizable: true,
            filter: true,
          }}
          rowHeight={44}
          headerHeight={48}
        />
      </div>
    </div>
  );
}
