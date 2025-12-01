"use client";

import { useMemo, useState } from "react";

export default function useStakeholderInfo() {
  const tabs = ["All", "CPO", "Host", "Investor"];
  const [activeTab, setActiveTab] = useState("All");

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  // TODO: replace with API later
  const tableData = [
    {
      name: "Dabas EV Charge",
      type: "CPO",
      date: "2025-07-02",
      cost: ["Retail - INR 20.0", "Fleet - INR 20.0"],
      fixedFee: "-",
      saas: "1.00 INR/kWh",
      profitShare: "-",
      revenueShare: "-",
      deal: "-",
    },
    {
      name: "UDIT SHARMA",
      type: "Host",
      date: "2025-07-02",
      cost: ["Retail - INR 20.0", "Fleet - INR 20.0"],
      fixedFee: "INR 2.0",
      saas: "1.00 INR/kWh",
      profitShare: "-",
      revenueShare: "15.0 INR/kWh",
      deal: "-",
    },
    {
      name: "Manoj Kumar",
      type: "Host",
      date: "2025-07-02",
      cost: ["Retail - INR 20.0", "Fleet - INR 20.0"],
      fixedFee: "-",
      saas: "1.00 INR/kWh",
      profitShare: "-",
      revenueShare: "-",
      deal: "-",
    },
    {
      name: "Shikha Sengar",
      type: "Host",
      date: "2025-07-02",
      cost: ["Retail - INR 20.0", "Fleet - INR 20.0"],
      fixedFee: "-",
      saas: "1.00 INR/kWh",
      profitShare: "-",
      revenueShare: "-",
      deal: "-",
    },
    {
      name: "Saurabh Kaushik",
      type: "Host",
      date: "2025-07-03",
      cost: ["Retail - INR 20.0", "Fleet - INR 20.0"],
      fixedFee: "INR 2.0",
      saas: "1.00 INR/kWh",
      profitShare: "-",
      revenueShare: "-",
      deal: "-",
    },
  ];

  // FILTER BY ACTIVE TAB
  const filteredData = useMemo(() => {
    if (activeTab === "All") return tableData;
    return tableData.filter((row) => row.type === activeTab);
  }, [activeTab]);

  // PAGINATION
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalItems);

  const paginatedRows = filteredData.slice(startIndex, endIndex);

  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return {
    tabs,
    activeTab,
    setActiveTab,
    rowsPerPage,
    setRowsPerPage,
    page,
    setPage,
    goToPage,
    paginatedRows,
    totalPages,
    totalItems,
    startIndex,
    endIndex,
  };
}
