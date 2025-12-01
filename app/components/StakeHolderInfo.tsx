import Card from "./Card";
import useStakeholderInfo from "@/hooks/useStakeHolderInfo";

export const StakeholderInformationSection = () => {
  const {
    tabs,
    activeTab,
    setActiveTab,
    rowsPerPage,
    setRowsPerPage,
    page,
    goToPage,
    paginatedRows,
    totalPages,
    totalItems,
    startIndex,
    endIndex,
  } = useStakeholderInfo();

  return (
    <Card className="p-6 mt-6 bg-black/40 border border-gray-800">
      {/* Title */}
      <h2 className="text-xl font-bold text-white mb-6">
        Stakeholder Information
      </h2>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-gray-700 pb-3 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              goToPage(1);
            }}
            className={`pb-2 text-sm font-semibold transition ${
              activeTab === tab
                ? "text-red-500 border-b-2 border-red-500"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}

        {/* Download */}
        <button className="ml-auto bg-white/10 p-2 rounded-lg text-white border border-gray-700 hover:bg-white/20">
          ⬇️
        </button>
      </div>

      {/* No Data */}
      {paginatedRows.length === 0 && (
        <div className="py-20 text-center text-red-500 text-lg font-semibold">
          No Data Found!
        </div>
      )}

      {/* Table */}
      {paginatedRows.length > 0 && (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-gray-300 border-b border-gray-700">
                  <th className="py-3">Company Name</th>
                  <th className="py-3">Type</th>
                  <th className="py-3">Company Mapping Date</th>
                  <th className="py-3">Cost from CPO</th>
                  <th className="py-3">Fixed Fee</th>
                  <th className="py-3">SaaS</th>
                  <th className="py-3">Profit Share</th>
                  <th className="py-3">Revenue Share</th>
                  <th className="py-3">Deal applicable</th>
                </tr>
              </thead>

              <tbody>
                {paginatedRows.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-800 hover:bg-white/5 text-gray-100"
                  >
                    <td className="py-4">{row.name}</td>
                    <td className="py-4">{row.type}</td>
                    <td className="py-4">{row.date}</td>
                    <td className="py-4 whitespace-pre-line">
                      {row.cost.join("\n")}
                    </td>
                    <td className="py-4">{row.fixedFee}</td>
                    <td className="py-4">{row.saas}</td>
                    <td className="py-4">{row.profitShare}</td>
                    <td className="py-4">{row.revenueShare}</td>
                    <td className="py-4">{row.deal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-4 text-gray-300 text-sm">
            {/* Rows per page */}
            <div className="flex items-center gap-2">
              Rows per page
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  goToPage(1);
                }}
                className="bg-white/10 text-white px-3 py-1 rounded border border-gray-700"
              >
                {[5, 10, 15, 20].map((num) => (
                  <option key={num} value={num} className="text-black">
                    {num}
                  </option>
                ))}
              </select>
            </div>

            {/* Showing */}
            <div>
              Showing {startIndex + 1} – {endIndex} of {totalItems} items
            </div>

            {/* Pagination */}
            <div className="flex items-center gap-3">
              <button onClick={() => goToPage(1)} className="px-2 text-xl">
                «
              </button>
              <button
                onClick={() => goToPage(page - 1)}
                className="px-2 text-xl"
              >
                ‹
              </button>

              <span className="px-3 py-1 bg-white/10 rounded border border-gray-700 text-white">
                {page}
              </span>

              <span>of {totalPages}</span>

              <button
                onClick={() => goToPage(page + 1)}
                className="px-2 text-xl"
              >
                ›
              </button>
              <button
                onClick={() => goToPage(totalPages)}
                className="px-2 text-xl"
              >
                »
              </button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
};

export default StakeholderInformationSection;
