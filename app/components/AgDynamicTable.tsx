"use client";

import "@/lib/agGrid";
import { themeDabas } from "@/lib/agGridTheme";

import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";

export default function AgDynamicTable({ columns, rowData }) {
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
    }),
    []
  );

  return (
    <div style={{ height: 500, width: "100%" }}>
      <AgGridReact
        theme={themeDabas} // ⭐ NEW WAY
        columnDefs={columns}
        rowData={rowData}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
}
