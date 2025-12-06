import { useEnergyForecast } from "@/hooks/useGetDashboardData";
import Card from "./Card";
import LineChart from "./CustomLineGraph";

/* -----------------------------------------------
📊 Energy Chart Section using Hook
----------------------------------------------- */
export function EnergyForecasting() {
  const { labels, dataSets } = useEnergyForecast();

  return (
    <div className="pt-6">
      <Card>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Energy Forecasting</h2>
          <div className="h-[300px]">
            <LineChart labels={labels} datasets={dataSets} />
          </div>
        </div>
      </Card>
    </div>
  );
}
