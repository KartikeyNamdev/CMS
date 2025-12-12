"use client";

import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import AgDynamicTable from "@/app/components/AgDynamicTable";
import { useDataStore, CompanyType } from "@/store/useDataStore";
import { ColumnType } from "@/lib/agGrid";
import { ICellRendererParams } from "ag-grid-community";
import { Edit, Plus } from "lucide-react";

// Extend Company interface to match table requirements
interface CompanyRow {
  id: string;
  name: string;
  type: CompanyType;
  taxId?: string;
  timezone: string;
  currency: string;
  pincode: string;
}

// Action Cell Renderer Component
const ActionCellRenderer = (props: ICellRendererParams<CompanyRow>) => {
  const router = useRouter();

  const handleEdit = () => {
    // Navigate to edit page with company ID
    router.push(`/company/clients/edit/${props.data?.id}`);
  };

  return (
    <div className="flex items-center justify-center h-full gap-2">
      <button
        onClick={handleEdit}
        className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
        title="Edit Company"
      >
        <Edit size={16} className="text-white" />
      </button>
    </div>
  );
};

// Company Type Badge Renderer
const CompanyTypeCellRenderer = (props: ICellRendererParams<CompanyRow>) => {
  const type = props.value as CompanyType;

  const getTypeColor = (type: CompanyType) => {
    switch (type) {
      case "Host":
        return "bg-green-600";
      case "CPO":
        return "bg-blue-600";
      case "EMSP":
        return "bg-purple-600";
      case "Investor":
        return "bg-orange-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="flex items-center h-full">
      <span
        className={`px-3 border-none py-1 rounded-full text-white text-sm font-medium ${getTypeColor(
          type
        )}`}
      >
        {type}
      </span>
    </div>
  );
};

export default function CompanyManagementTable() {
  const router = useRouter();
  const { companies, isLoading, fetchCompanies } = useDataStore();

  // Fetch companies on component mount
  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  // Define AG Grid columns
  const columns: ColumnType[] = useMemo(
    () => [
      {
        headerName: "Company ID",
        field: "id",
        width: 150,
        pinned: "left",
      },
      {
        headerName: "Company Name",
        field: "name",
        width: 250,
        pinned: "left",
        cellStyle: { fontWeight: 600 },
      },
      {
        headerName: "Type",
        field: "type",
        width: 150,
        cellRenderer: CompanyTypeCellRenderer,
      },
      {
        headerName: "Tax ID",
        field: "taxId",
        width: 150,
      },
      {
        headerName: "Timezone",
        field: "timezone",
        width: 150,
      },
      {
        headerName: "Currency",
        field: "currency",
        width: 130,
      },
      {
        headerName: "Pincode",
        field: "pincode",
        width: 130,
      },
      {
        headerName: "Actions",
        field: "actions",
        width: 120,
        cellRenderer: ActionCellRenderer,
        sortable: false,
        filter: false,
        // pinned: "right",
      },
    ],
    []
  );

  // Convert companies to row data
  const rowData: CompanyRow[] = useMemo(() => {
    return companies.map((company) => ({
      id: company.id,
      name: company.name,
      type: company.type,
      taxId: company.taxId,
      timezone: company.timezone,
      currency: company.currency,
      pincode: company.pincode,
    }));
  }, [companies]);

  const handleCreateNew = () => {
    router.push("/company/create");
  };

  return (
    <div className="w-full p-8  bg-transparent">
      <div className=" flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Company Management
          </h1>
          <p className="text-gray-500">Manage all companies in the system</p>
        </div>
        {/* <button
          onClick={handleCreateNew}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors"
        >
          <Plus size={20} />
          Add New Company
        </button> */}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <div className="text-white text-xl">Loading companies...</div>
        </div>
      ) : (
        <AgDynamicTable
          columns={columns}
          rowData={rowData as []}
          gridOptions={{
            animateRows: true,
            enableCellTextSelection: true,
          }}
        />
      )}

      <div className="mt-4 text-gray-400 text-sm">
        Total Companies: {companies.length}
      </div>
    </div>
  );
}
