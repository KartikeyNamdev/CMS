"use client";

import { useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import "@/lib/agGrid";
import { themeDabas } from "@/lib/agGridTheme";
import useOcppLogs from "@/hooks/useOcppLogs";
import { JsonDrawer } from "@/app/components/JsonDrawer";

type OcppLog = {
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

export default function OcppLogsTable() {
  const { logs } = useOcppLogs("123423");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerData, setDrawerData] = useState<unknown>(null);

  const openDrawer = (payload: unknown) => {
    setDrawerData(payload);
    setDrawerOpen(true);
  };

  const colDefs: ColDef<OcppLog>[] = useMemo(
    () => [
      { headerName: "Log ID", field: "logId", minWidth: 200 },

      { headerName: "OCPP ID", field: "ocppId", width: 120 },

      { headerName: "Connector Name", field: "connectorName", width: 140 },

      { headerName: "Action", field: "action", width: 160 },

      {
        headerName: "Request Payload",
        field: "requestPayload",
        width: 140,
        cellRenderer: (params: ICellRendererParams<OcppLog>) => (
          <span
            onClick={() => openDrawer(params.data?.requestPayload)}
            className="text-blue-400 underline cursor-pointer"
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
        width: 150,
        cellRenderer: (params: ICellRendererParams<OcppLog>) => (
          <span
            onClick={() => openDrawer(params.data?.responsePayload)}
            className="text-blue-400 underline cursor-pointer"
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

      { headerName: "Header Token", field: "headerToken", width: 140 },

      { headerName: "Http Status Code", field: "httpStatus", width: 160 },

      { headerName: "Log Type", field: "logType", width: 160 },
    ],
    []
  );

  return (
    <>
      <JsonDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Raw JSON"
        json={drawerData}
      />

      <div
        className="ag-theme-quartz-dark border border-gray-700 rounded-lg overflow-hidden w-full"
        style={{ height: 600 }}
      >
        <AgGridReact<OcppLog>
          theme={themeDabas}
          rowData={logs as OcppLog[]}
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
    </>
  );
}
