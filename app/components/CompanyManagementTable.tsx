"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import AgDynamicTable from "@/app/components/AgDynamicTable";
import { useDataStore } from "@/store/useDataStore";
import { ColumnType } from "@/lib/agGrid";
import { ICellRendererParams } from "ag-grid-community";

import { CompanyType } from "@/lib/types";

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
  const deleteCompany = useDataStore((s) => s.deleteCompany);

  const handleEdit = () => {
    router.push(`/company/clients/edit/${props.data?.id}`);
  };

  const handleDelete = () => {
    if (!props.data?.id) return;

    if (
      confirm(
        `Are you sure you want to delete "${props.data.name}"? This will also delete all associated stations and chargers.`
      )
    ) {
      deleteCompany(props.data.id);
      alert("Company and all associated data removed!");
    }
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      <button
        onClick={handleEdit}
        className="p-2 rounded-lg hover:text-red-600 transition-colors"
        title="Edit Company"
      >
        <p>Edit</p>
      </button>
      <span className="text-gray-700">|</span>
      <button
        onClick={handleDelete}
        className="p-2 rounded-lg hover:text-red-600 transition-colors"
        title="Delete Company"
      >
        Delete
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
    <div className="flex items-center h-full mt-2 justify-center">
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
  const companies = useDataStore((state) => state.companies);

  // Define AG Grid columns
  const columns: ColumnType[] = useMemo(
    () => [
      {
        headerName: "Company ID",
        field: "id",
        width: 150,
      },
      {
        headerName: "Company Name",
        field: "name",
        width: 250,
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
        width: 150,
      },
      {
        headerName: "Pincode",
        field: "pincode",
        width: 150,
      },
      {
        headerName: "Actions",
        field: "actions",
        cellRenderer: ActionCellRenderer,
        sortable: false,
        filter: false,
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
    <div className="w-full p-8 bg-transparent">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Company Management
          </h1>
          <p className="text-gray-500">Manage all companies in the system</p>
        </div>
        {/* <button
          onClick={handleCreateNew}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
        >
          + Create New Company
        </button> */}
      </div>

      {companies.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-96 bg-white rounded-lg shadow mt-6">
          <p className="text-gray-500 text-xl mb-4">No companies found</p>
          <button
            onClick={handleCreateNew}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
          >
            Create Your First Company
          </button>
        </div>
      ) : (
        <div style={{ width: "100%" }} className="mt-4 text-white">
          <AgDynamicTable
            className="border border-gray-500 mt-4"
            columns={columns}
            rowData={rowData as []}
            gridOptions={{
              animateRows: true,
              enableCellTextSelection: true,
              pagination: true,
              paginationPageSize: 10,
            }}
          />
        </div>
      )}

      <div className="mt-4 text-gray-600 text-sm flex justify-between items-center">
        <span>
          Total Companies: <strong>{companies.length}</strong>
        </span>
        {companies.length > 0 && (
          <span className="text-xs text-gray-500">
            💡 Deleting a company will remove all its stations and chargers
          </span>
        )}
      </div>
    </div>
  );
}
