"use client";

import "@/lib/agGrid";

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
  className,
}: {
  columns: ColumnType[];
  // FIX: Accept multiple row data types
  rowData: RowType[] | ILicenseLog[] | IInvoiceLog[];
  className?: string;
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
      className={`${className}border border-gray-300 rounded-xl mt-6`}
      style={{ height: 500, width: "100%" }}
    >
      <style jsx global>{`
        .custom-dabas-theme {
          --ag-background-color: transparent;
          --ag-header-background-color: #b22828;
          --ag-row-hover-color: rgba(255, 142, 142, 0.7);
          --ag-border-color: #8f8e8e;
          --ag-font-size: 14px;
          --ag-header-foreground-color: white;
        }

        .custom-dabas-theme .ag-header-cell {
          font-weight: 700;
          color: white;
        }

        .custom-dabas-theme .ag-row:nth-child(odd) {
          background: #white;
        }

        .custom-dabas-theme .ag-row:nth-child(even) {
          /* background: #b06e6e; */

          /* color: white; */
        }
      `}</style>

      <AgGridReact
        // FIX 3: Replace `as unknown` with a specific type assertion
        // to satisfy the AgGridReact overload expecting ColDef or ColGroupDef.
        className="ag-theme-alpine-dark custom-dabas-theme"
        columnDefs={columns as AgGridColumnDef}
        rowData={rowData}
        defaultColDef={defaultColDef}
        pagination
        animateRows
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
