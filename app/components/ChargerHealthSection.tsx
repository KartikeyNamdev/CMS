import useConnectionStatus from "@/hooks/useConnectionStatus";
import Card from "./Card";
import CustomBarChart from "./CustomBarChart";

export const ChargerHealthSection = () => {
  const { labels, datasets, loading } = useConnectionStatus("60683");

  return (
    <Card className="p-6  mt-6 bg-black/40 border border-gray-800">
      {/* Title */}
      <h2 className="text-xl font-bold text-white mb-6">Charger Health</h2>

      {/* ---- TOP HEALTH CARDS ---- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Charger Age */}
        <div className="bg-white/10 rounded-xl p-5 border border-gray-800 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <span className="text-white text-xl">🔌</span>
          </div>
          <div>
            <p className="text-gray-300 text-sm">Charger Age</p>
            <p className="text-xl text-white font-semibold mt-1">
              4 months, 24 days
            </p>
          </div>
        </div>

        {/* Warranty Status */}
        <div className="bg-white/10 rounded-xl p-5 border border-gray-800 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
            <span className="text-yellow-400 text-xl">🏅</span>
          </div>
          <div>
            <p className="text-gray-300 text-sm">Warranty Status</p>
            <p className="text-white font-semibold">--</p>
            <p className="text-gray-400 text-sm mt-1">Exp. Date: --</p>
          </div>
        </div>

        {/* Insurance Status */}
        <div className="bg-white/10 rounded-xl p-5 border border-gray-800 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <span className="text-gray-300 text-xl">✔️</span>
          </div>
          <div>
            <p className="text-gray-300 text-sm">Insurance Status</p>
            <p className="text-white font-semibold">--</p>
            <p className="text-gray-400 text-sm mt-1">Exp. Date: --</p>
          </div>
        </div>
      </div>

      {/* ---- CONNECTION STATUS SECTION ---- */}
      <div className="bg-white/5 rounded-xl p-6 border border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white text-lg font-semibold">
            Connection Status
          </h3>

          {/* Date Display */}
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg border border-gray-700">
            <span className="text-xl">📅</span>
            <span className="text-gray-200 text-sm">26 November 2025</span>
          </div>
        </div>

        {/* GRAPH AREA */}

        <div className="w-full bg-black/30 border border-gray-800 rounded-lg p-4 flex flex-col">
          {/* Chart */}
          <div className="w-full rounded-xl p-2 h-80">
            {loading ? (
              <span className="text-gray-400">Loading...</span>
            ) : (
              <CustomBarChart
                labels={labels}
                datasets={datasets}
                className="w-full h-90 items-center justify-center"
              />
            )}
          </div>

          {/* Legend */}
          <div className="flex justify-end gap-6 mt-4 text-gray-300 text-sm">
            <span>00 – Disconnected</span>
            <span>01 – Connected</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
export default ChargerHealthSection;
