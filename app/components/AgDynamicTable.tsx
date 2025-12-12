"use client";

import "@/lib/agGrid";
import { themeDabas } from "@/lib/agGridTheme";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
// Import necessary AgGrid types for correct prop definitions and type assertions
import { ColDef, ColGroupDef, GridOptions } from "ag-grid-community";

import { RowType } from "../user/admin/page";
import { ColumnType } from "@/lib/agGrid";
import { IInvoiceLog, ILicenseLog } from "../bills/license/page";

export interface RoleItem {
  roleName: string;
  company: string;
  template: string;
  permissions: PermissionSection[];
}
export interface PermissionSection {
  name: string;
  enabled: boolean;
  items: {
    title: string;
    view?: boolean;
    edit?: boolean;
    add?: boolean;
    download?: boolean;
  }[];
}

export default function AgDynamicTable({
  columns,
  rowData,
  gridOptions,
  context,
}: {
  columns: ColumnType[];
  // FIX: Accept multiple row data types
  rowData: RowType[] | ILicenseLog[] | IInvoiceLog[];
  // FIX 1: Change type from `[]` (empty array) to the correct AgGrid type (GridOptions)
  gridOptions?: GridOptions;
  // FIX 2: Change type from `[]` (empty array) to the correct AgGrid context type
  context?: Record<string, unknown>;
}) {
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
    }),
    []
  );

  // Define the expected type for AgGrid column definitions to use in the type assertion
  type AgGridColumnDef = (ColDef<RowType> | ColGroupDef<RowType>)[];

  return (
    <div
      className=" border border-gray-300 rounded-xl mt-6"
      style={{ height: 500, width: "100%" }}
    >
      <AgGridReact
        theme={themeDabas}
        // FIX 3: Replace `as unknown` with a specific type assertion
        // to satisfy the AgGridReact overload expecting ColDef or ColGroupDef.
        columnDefs={columns as AgGridColumnDef}
        rowData={rowData}
        defaultColDef={defaultColDef}
        pagination
        paginationPageSize={10}
        rowHeight={45}
        headerHeight={48}
        // context is now correctly typed as Record<string, any>
        context={context}
        // gridOptions is now correctly typed as GridOptions
        {...gridOptions}
      />
    </div>
  );
}
