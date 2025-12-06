import Card from "./Card";
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import { useAlerts } from "@/hooks/useGetDashboardData";

// Define the available filter types

export interface AlertT {
  id: number;
  status: string;
  type: string;
  title: string;
  description: string;
}

// ⚠️ Note: I'm assuming 'Card' and 'AlertCard' components are defined correctly
// and their implementation (AlertCard) is correct as provided in the prompt.
// I'm using the provided AlertCard implementation here for completeness.

export const AlertCard = ({ Alert }: { Alert: AlertT }) => (
  <div
    className={`relative p-6 rounded-xl shadow-xl overflow-hidden 
    border border-gray-300/30 backdrop-blur-md 
    ${Alert.status === "success" ? "bg-green-100/70" : "bg-red-100/70"}`}
  >
    <div className="flex gap-4 text-xl font-semibold">
      {Alert.status === "success" ? (
        <CheckCircleIcon className="w-7 h-7 text-green-500" />
      ) : (
        <ExclamationTriangleIcon className="w-7 h-7 text-red-500" />
      )}
      {Alert.title}
    </div>
    <p className="font-medium p-2">{Alert.description}</p>
  </div>
);

// ---

/* -----------------------------------------------
🚨 Alerts Section using Hook
----------------------------------------------- */
export function DynamicAlertSection() {
  const { AlertType, activeFilter, setActiveFilter, filteredAlerts } =
    useAlerts();

  return (
    <div className="pt-6">
      <Card>
        <div className="flex justify-between p-4 items-center">
          <h1 className="text-xl font-semibold">
            Alerts ({filteredAlerts.length})
          </h1>

          <div className="flex gap-2 text-sm">
            {AlertType.map((type) => (
              <button
                key={type}
                className={`px-4 py-2 rounded-full font-medium transition
                ${
                  activeFilter === type
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => setActiveFilter(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 p-4">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => (
              <AlertCard key={alert.id} Alert={alert} />
            ))
          ) : (
            <p className="text-center text-gray-500">
              No alerts of type {activeFilter} found.
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}
