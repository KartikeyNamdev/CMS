// /app/components/AgDynamicTable.tsx
"use client";

import "@/lib/agGrid";
import { themeDabas } from "@/lib/agGridTheme";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";

export default function AgDynamicTable({
  columns,
  rowData,
  gridOptions,
  context,
}) {
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
    }),
    []
  );

  return (
    <div
      className="ag-theme-quartz-dark border border-gray-700 rounded-xl mt-6"
      style={{ height: 500, width: "100%" }}
    >
      <AgGridReact
        theme={themeDabas}
        columnDefs={columns}
        rowData={rowData}
        defaultColDef={defaultColDef}
        pagination
        paginationPageSize={10}
        rowHeight={45}
        headerHeight={48}
        context={context} // <-- REQUIRED !!!
        {...gridOptions}
      />
    </div>
  );
}
