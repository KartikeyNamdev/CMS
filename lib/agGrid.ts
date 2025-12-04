import { RolesType } from "@/app/user/admin/page";
import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
import React from "react";

ModuleRegistry.registerModules([AllCommunityModule]);

// Optional: export for use/debug
export const registerAgGrid = true;
export interface GridContext {
  openRole?: (row: unknown) => void;
  openBooking?: (id: string) => void;
  openRoundoff?: (id: string) => void;
  openAction?: (row: unknown) => void;
}
// Ag-Grid cell params generic
export interface GridCellParams<T = unknown> {
  value: string;
  data: T;
  context: {
    openBooking?: (id: string) => void;
    openRoundoff?: (id: string) => void;
    openAction?: (row: string) => void;
  };
}

export interface ColumnType {
  headerName: string;
  field?: string;
  width?: number;
  cellRenderer?: (params: unknown) => React.ReactNode;
}
// Permissions structure -----------------------------------------
export interface PermissionItem {
  title: string;
  view?: boolean;
  edit?: boolean;
  add?: boolean;
  download?: boolean;
}

export interface PermissionSection {
  name: string;
  enabled: boolean;
  items: PermissionItem[];
}

// Extend RolesType used in dialog -------------------------------
export interface RoleDetails extends RolesType {
  permissions: PermissionSection[];
}
