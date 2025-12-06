import useTopPerformers, { PerformerType } from "@/hooks/useGetDashboardData";
import Card from "./Card";

const PerformerCard = ({ item }: { item: PerformerType }) => (
  <div
    className="relative p-6 rounded-xl shadow-sm overflow-hidden
      content-center justify-center backdrop-filter backdrop-blur-md
      border border-gray-300 border-opacity-30 hover:shadow-xl transition"
  >
    <div className="flex justify-between">
      <div className="text-xl font-bold">{item.title}</div>
      <div className="text-red-500">₹{item.revenue}</div>
    </div>
    <p className="text-sm">{item.description}</p>
  </div>
);

export default function DynamicTopPerformers() {
  const { chargers, stations, loading } = useTopPerformers();

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <Card className="mt-6">
      <div className="grid grid-cols-2">
        <div className="justify-between flex p-4 items-center">
          <div className="text-xl flex flex-col w-full gap-4">
            <h1 className="font-semibold">Top Performing Charger</h1>
            {chargers.map((item) => (
              <PerformerCard item={item} key={item.id} />
            ))}
          </div>
        </div>

        <div className="justify-between flex p-4 items-center">
          <div className="text-xl flex flex-col w-full gap-4">
            <h1 className="font-semibold">Top Performing Station</h1>
            {stations.map((item) => (
              <PerformerCard item={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
