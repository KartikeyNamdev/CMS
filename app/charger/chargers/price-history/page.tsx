import FilterDialog from "@/app/components/FilterDialog";
import ChargerGrid from "@/app/components/ChargerTable";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
const PriceHistoryOptions = [
  {
    label: "Company Type",
  },
  {
    label: "Updated on",
  },
  {
    label: "Updated by Admin",
  },
  {
    label: "Charger Type",
  },
  {
    label: "Charger Commission Date",
  },
  {
    label: "State",
  },
  {
    label: "City",
  },
];
const Home = () => {
  return (
    <div className="p-6 lg:px-58">
      <div className="flex justify-between">
        <h1 className="text-white text-3xl">Price History</h1>
        <div className="flex gap-4">
          <FilterDialog
            onClose={null}
            title="Price History"
            data={PriceHistoryOptions}
          />
          <button
            className={` h-12 w-12 rounded-md bg-white text-black hover:bg-white/90 transition-colors shadow-md border border-white/20 flex items-center justify-center`}
          >
            <ArrowDownTrayIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      <ChargerGrid />
    </div>
  );
};
export default Home;
