import { Company, Station, Charger } from "@/lib/types";

export class GameManager {
  public companies: Company[] = [];
  public stations: Station[] = [];
  public chargers: Charger[] = [];
  public isLoading = false;

  constructor() {}

  /* ---------------------------------------------------
      SAFELY MERGE DATA (PREVENT “DELETE EXISTING” BUG)
  ----------------------------------------------------*/

  public mergeStations(companyId: string, fetched: Station[]) {
    if (fetched.length === 0) return; // 🔥 Do NOT clear existing stations

    this.stations = [
      ...this.stations.filter((s) => s.companyId !== companyId),
      ...fetched,
    ];
  }

  public mergeChargers(stationId: string, fetched: Charger[]) {
    if (fetched.length === 0) return; // 🔥 Do NOT clear existing chargers

    this.chargers = [
      ...this.chargers.filter((c) => c.stationId !== stationId),
      ...fetched,
    ];
  }

  /* ---------------------------------------------------
      COMPANY CRUD
  ----------------------------------------------------*/

  public createCompany(c: Company) {
    this.companies.push(c);
    return c;
  }

  public updateCompany(id: string, updates: Partial<Company>) {
    this.companies = this.companies.map((c) =>
      c.id === id ? { ...c, ...updates } : c
    );
    return this.companies.find((c) => c.id === id)!;
  }

  public deleteCompany(id: string) {
    this.companies = this.companies.filter((c) => c.id !== id);
    this.stations = this.stations.filter((s) => s.companyId !== id);
  }

  /* ---------------------------------------------------
      STATION CRUD
  ----------------------------------------------------*/

  public createStation(s: Station) {
    this.stations.push(s);
    return s;
  }

  public updateStation(id: string, updates: Partial<Station>) {
    this.stations = this.stations.map((s) =>
      s.id === id ? { ...s, ...updates } : s
    );
    return this.stations.find((s) => s.id === id)!;
  }

  public deleteStation(id: string) {
    this.stations = this.stations.filter((s) => s.id !== id);
    this.chargers = this.chargers.filter((c) => c.stationId !== id);
  }

  /* ---------------------------------------------------
      CHARGER CRUD
  ----------------------------------------------------*/

  public createCharger(c: Charger) {
    this.chargers.push(c);
    return c;
  }

  public updateCharger(id: string, updates: Partial<Charger>) {
    this.chargers = this.chargers.map((c) =>
      c.id === id ? { ...c, ...updates } : c
    );
    return this.chargers.find((c) => c.id === id)!;
  }

  public deleteCharger(id: string) {
    this.chargers = this.chargers.filter((c) => c.id !== id);
  }

  /* ---------------------------------------------------
      RELATION HELPERS
  ----------------------------------------------------*/

  public getStations(companyId: string) {
    return this.stations.filter((s) => s.companyId === companyId);
  }

  public getChargers(stationId: string) {
    return this.chargers.filter((c) => c.stationId === stationId);
  }

  public getCompanyTree(companyId: string) {
    const company = this.companies.find((c) => c.id === companyId);
    if (!company) return null;

    return {
      ...company,
      stations: this.getStations(companyId).map((st) => ({
        ...st,
        chargers: this.getChargers(st.id),
      })),
    };
  }

  /* ---------------------------------------------------
      FETCHERS (SAFE MERGE)
  ----------------------------------------------------*/

  public async fetchCompanies(apiFn: () => Promise<Company[]>) {
    const fetched = await apiFn();
    this.companies = fetched;
    return fetched;
  }

  public async fetchStationsByCompany(
    companyId: string,
    apiFn: (id: string) => Promise<Station[]>
  ) {
    const fetched = await apiFn(companyId);
    this.mergeStations(companyId, fetched);
    return this.getStations(companyId);
  }

  public async fetchChargersByStation(
    stationId: string,
    apiFn: (id: string) => Promise<Charger[]>
  ) {
    const fetched = await apiFn(stationId);
    this.mergeChargers(stationId, fetched);
    return this.getChargers(stationId);
  }
}
