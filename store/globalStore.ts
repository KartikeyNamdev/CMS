import { useDataStore } from "./useDataStore";

let globalState;
export default function newGlobalState() {
  const {
    companies,
    chargers,
    stations,
    fetchChargersByStation,
    fetchCompanies,
    fetchStationsByCompany,
  } = useDataStore();
}
